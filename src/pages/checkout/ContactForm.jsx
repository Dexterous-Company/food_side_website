// components/Checkout/ContactForm.jsx
"use client";
import React from "react";
import { FaUser, FaCheckCircle } from "react-icons/fa";

const ContactForm = ({ 
  isDesktop, 
  firstName, lastName, email, phone,
  errors, isSubmitted, onSubmit,
  onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange,
  isFormValid 
}) => {
  
  if (isDesktop) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaUser className="text-[#ff581b]" />
            Contact Information
          </h2>
          {isSubmitted && (
            <span className="text-xs text-gray-400">
              <FaCheckCircle className="text-emerald-500 text-xs inline mr-1" /> Details saved
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={onFirstNameChange}
              disabled={isSubmitted}
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${errors.firstName && !isSubmitted ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.firstName && !isSubmitted && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={onLastNameChange}
              disabled={isSubmitted}
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${errors.lastName && !isSubmitted ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.lastName && !isSubmitted && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            disabled={isSubmitted}
            className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${errors.email && !isSubmitted ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.email && !isSubmitted && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            disabled={isSubmitted}
            placeholder="Enter 10 digit mobile number"
            className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff581b] bg-gray-50 ${errors.phone && !isSubmitted ? 'border-red-500' : 'border-gray-200'}`}
          />
          {errors.phone && !isSubmitted && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        {!isSubmitted && (
          <button onClick={onSubmit} disabled={!isFormValid} className={`bg-[#ff581b] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-900 transition mt-2 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Save & Continue
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3">Contact Information</h2>
      <div className="space-y-3">
        <div>
          <input type="text" placeholder="First Name" value={firstName} onChange={onFirstNameChange} 
            className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input type="text" placeholder="Last Name" value={lastName} onChange={onLastNameChange}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email Address" value={email} onChange={onEmailChange}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${errors.email ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <input type="tel" placeholder="10 digit mobile number" value={phone} onChange={onPhoneChange}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <button onClick={onSubmit} disabled={!isFormValid} 
          className={`w-full bg-[#ff581b] text-white font-semibold py-2 rounded-xl hover:bg-gray-900 transition ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ContactForm;