import axios from 'axios';
import {baseUrl} from '../../config/BaseUrl';

const REQUEST_TIMEOUT = 10000;

const USER_CREATE_PATHS = ['/api/v1/user/users', '/api/v1/user/new'];
const MOBILE_CHECK_PATHS = [
  mobile => `/api/v1/user/users/check/mobile/${mobile}`,
  mobile => `/api/v1/user/mobile/${mobile}`,
];
const EMAIL_CHECK_PATHS = [
  email => `/api/v1/user/users/check/email/${encodeURIComponent(email)}`,
  email => `/api/v1/user/email/${encodeURIComponent(email)}`,
];
const OTP_SEND_PATHS = [
  '/api/v1/sendotp/send-otp',
  '/api/v1/user/send-otp',
  '/api/v1/admin/send-otp',
];
const OTP_VERIFY_PATHS = [
  '/api/v1/sendotp/verify-otp',
  '/api/v1/user/verify-otp',
  '/api/v1/admin/verify-otp',
];
const OTP_RESEND_PATHS = [
  '/api/v1/sendotp/resend-otp',
  '/api/v1/user/resend-otp',
  '/api/v1/admin/resend-otp',
];

const buildUrl = path => `${baseUrl}${path}`;

const getMessage = payload =>
  payload?.message || payload?.error || 'Something went wrong. Please try again.';

const isUnsupportedOtpResponse = payload => {
  const message = String(payload?.message || '').toLowerCase();

  return (
    message.includes('invalid user type') ||
    message.includes('cannot post') ||
    message.includes('not found')
  );
};

const requestWithFallback = async configs => {
  let lastError;

  for (const config of configs) {
    try {
      return await axios({
        timeout: REQUEST_TIMEOUT,
        ...config,
      });
    } catch (error) {
      if (error?.response) {
        if ([404, 405].includes(error.response.status)) {
          lastError = error;
          continue;
        }

        return error.response;
      }

      lastError = error;
    }
  }

  throw lastError || new Error('Unable to reach server.');
};

const normalizeExistsResponse = response => {
  const payload = response?.data || {};
  const message = String(payload?.message || '').toLowerCase();

  if (payload?.success === true) {
    return {
      exists: true,
      message: getMessage(payload),
      user: payload?.userData || payload?.user || null,
    };
  }

  if (
    message.includes('new mobile') ||
    message.includes('new email') ||
    response?.status === 404
  ) {
    return {
      exists: false,
      message: payload?.message || '',
      user: null,
    };
  }

  throw new Error(getMessage(payload));
};

const createOtpPayloads = mobile => [
  {mobKey: mobile, userType: 'user'},
  {mobKey: mobile, userType: 'customer'},
  {mobKey: mobile, userType: 'website'},
  {mobile},
  {phone: mobile},
];

const requestOtpAction = async (paths, mobile, otp) => {
  for (const path of paths) {
    for (const payload of createOtpPayloads(mobile)) {
      const body = otp ? {...payload, otp} : payload;

      try {
        const response = await axios.post(buildUrl(path), body, {
          headers: {'Content-Type': 'application/json'},
          timeout: REQUEST_TIMEOUT,
        });
        const data = response?.data || {};

        if (data?.success === true) {
          return {
            success: true,
            live: true,
            message: getMessage(data),
            data: data?.data || null,
          };
        }

        if (isUnsupportedOtpResponse(data)) {
          continue;
        }

        return {
          success: false,
          live: true,
          message: getMessage(data),
          data: data?.data || null,
        };
      } catch (error) {
        const data = error?.response?.data;

        if (data && !isUnsupportedOtpResponse(data)) {
          return {
            success: false,
            live: true,
            message: getMessage(data),
            data: data?.data || null,
          };
        }
      }
    }
  }

  return {
    success: false,
    live: false,
    message: 'OTP service for user accounts is not available on the current API.',
    data: null,
  };
};

export const checkUserByMobile = async mobile => {
  const response = await requestWithFallback(
    MOBILE_CHECK_PATHS.map(pathBuilder => ({
      method: 'get',
      url: buildUrl(pathBuilder(mobile)),
    })),
  );

  return normalizeExistsResponse(response);
};

export const checkUserByEmail = async email => {
  const response = await requestWithFallback(
    EMAIL_CHECK_PATHS.map(pathBuilder => ({
      method: 'get',
      url: buildUrl(pathBuilder(email)),
    })),
  );

  return normalizeExistsResponse(response);
};

export const createUserAccount = async payload => {
  const response = await requestWithFallback(
    USER_CREATE_PATHS.map(path => ({
      method: 'post',
      url: buildUrl(path),
      data: payload,
      headers: {'Content-Type': 'application/json'},
    })),
  );
  const data = response?.data || {};

  if (data?.success === false) {
    throw new Error(getMessage(data));
  }

  return {
    message: getMessage(data),
    user: data?.user || null,
  };
};

export const sendUserOtp = async mobile => requestOtpAction(OTP_SEND_PATHS, mobile);

export const resendUserOtp = async mobile =>
  requestOtpAction(OTP_RESEND_PATHS, mobile);

export const verifyUserOtp = async (mobile, otp) =>
  requestOtpAction(OTP_VERIFY_PATHS, mobile, otp);
