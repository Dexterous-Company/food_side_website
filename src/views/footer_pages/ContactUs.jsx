
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { submitContactForm, resetContact } from "@/redux/slices/contactSlice";
import { submitContactForm,resetContact } from "@/redux/contact/contactSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const subjectOptions = [
    { value: 'general', label: '💬 General Inquiry' },
    { value: 'partnership', label: '🤝 Partnership' },
    { value: 'support', label: '🛠️ Technical Support' },
    { value: 'feedback', label: '⭐ Feedback' },
    { value: 'restaurant', label: '🍽️ Restaurant Partner' },
    { value: 'careers', label: '💼 Careers' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.email || !formData.phone || !formData.message) {
      setAlertMessage("Please fill in all required fields.");
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertMessage("Please enter a valid email address.");
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    // Phone validation (basic)
    if (!formData.phone || formData.phone.length < 10) {
      setAlertMessage("Please enter a valid phone number.");
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    
    const submitData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      subject: selectedSubject,
      message: formData.message
    };
    
    const result = await dispatch(submitContactForm(submitData));
    
    if (result.payload?.success) {
      setAlertMessage(result.payload.message || "Thank you for reaching out! We will get back to you within 24 hours.");
      setAlertType('success');
      setShowAlert(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setSelectedSubject('general');
      
      // Reset Redux state after 3 seconds
      setTimeout(() => {
        dispatch(resetContact());
      }, 3000);
    } else if (result.error) {
      setAlertMessage(result.payload || "Something went wrong. Please try again.");
      setAlertType('error');
      setShowAlert(true);
    }
    
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Animation on scroll effect
  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-aos-delay") || "0";
            setTimeout(() => {
              entry.target.classList.add("aos-animate");
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Alert Message Popup */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`rounded-lg shadow-lg p-4 min-w-[300px] ${
            alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center gap-3">
              {alertType === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="text-sm font-medium">{alertMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[380px] bg-[#0a0a0a] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=500&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r  to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <div className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              We'd Love To Hear{" "}
              <strong className="text-[#ff581b]">From You</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Card */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-12 relative z-20">
        <div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 text-[#ff581b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Partnerships, support, feedback or just a hello — we're always here and happy to talk.
                Our team is committed to responding to all inquiries within 24 hours.
              </p>
              <p className="text-gray-400 text-sm mt-3 italic">
                For urgent matters, please call our support line directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Contact Information */}
          <aside className="lg:w-96 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6">
                <div className="p-5 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#ff581b]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <h3 className="font-bold text-[#121212] text-lg">
                      Contact Information
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Reach out through any channel
                  </p>
                </div>
                <div className="p-5 space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#121212] text-sm mb-1">Our Office</h4>
                      <p className="text-gray-500 text-sm">Chittepalli Village, Podalakur Mandal,</p>
                      <p className="text-gray-500 text-sm">Nellore, Andhra Pradesh - 524345, India</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#121212] text-sm mb-1">Phone</h4>
                      <a href="tel:+918688043861" className="text-[#ff581b] text-sm hover:underline">+91 86880 43861</a>
                      <p className="text-gray-400 text-xs mt-1">Mon-Sat: 9AM - 7PM</p>
                    </div>
                  </div>

                  {/* Email General */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#121212] text-sm mb-1">Email (General)</h4>
                      <a href="mailto:info@foodside.co.in" className="text-[#ff581b] text-sm hover:underline">info@foodside.co.in</a>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#121212] text-sm mb-1">Email (Support)</h4>
                      <a href="mailto:admin@foodside.co.in" className="text-[#ff581b] text-sm hover:underline">admin@foodside.co.in</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#ff581b]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-bold text-[#121212] text-lg">
                      Business Hours
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 text-sm">Monday - Saturday</span>
                    <span className="text-[#121212] font-semibold text-sm">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 text-sm">Sunday</span>
                    <span className="text-[#121212] font-semibold text-sm">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-gray-500 text-xs">Support Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content - Contact Form */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <div className="mb-8" data-aos="fade-up">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#121212] mb-2">
                    Send Us a <span className="text-[#ff581b]">Message</span>
                  </h2>
                  <p className="text-gray-500">We'll reply within 24 hours during working days.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
                        placeholder="Enter your First Name"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
                        placeholder="Enter your Last Name"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                   <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({
      ...formData,
      phone: value,
    });
  }}
  maxLength={10}
  pattern="[0-9]{10}"
  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
  placeholder="Enter your phone number"
  required
  disabled={loading}
/>
                  </div>

                  {/* Subject Chips */}
                  <div>
                    <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-3">
                      What's This About?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subjectOptions.map((subject) => (
                        <button
                          key={subject.value}
                          type="button"
                          onClick={() => !loading && setSelectedSubject(subject.value)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                            selectedSubject === subject.value
                              ? "bg-[#ff581b] !text-white shadow-lg shadow-[#ff581b]/30"
                              : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#ff581b] hover:text-[#ff581b]"
                          }`}
                          disabled={loading}
                        >
                          <span className={selectedSubject === subject.value ? "!text-white" : "text-gray-600"}>
                            {subject.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)] resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <div
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#ff581b] text-white rounded-xl py-4 px-8 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                      loading 
                        ? "opacity-70 cursor-not-allowed" 
                        : "hover:bg-[#e04e12] hover:shadow-lg hover:shadow-[#ff581b]/30"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </div>

                  {/* Privacy Note */}
                  <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                    <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    We respect your privacy. Your information is safe with us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-8" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Find Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
              Visit Our <span className="text-[#ff581b]">Location</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl" data-aos="fade-up" data-aos-delay="100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.602863484285!2d79.901234!3d14.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c5d8e2f1a2b3d%3A0x7e8f9a0b1c2d3e4f!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-[320px] md:h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              title="FoodSide Office Location Map"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        [data-aos] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default ContactUs;