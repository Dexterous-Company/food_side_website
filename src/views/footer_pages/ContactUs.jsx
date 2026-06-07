// // "use client";
// // import React, { useEffect, useState } from 'react';

// // const ContactUs = () => {
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     phone: '',
// //     subject: '',
// //     message: ''
// //   });
// //   const [selectedSubject, setSelectedSubject] = useState('general');

// //   useEffect(() => {
// //     const animatedElements = document.querySelectorAll("[data-aos]");
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             const delay = entry.target.getAttribute('data-aos-delay') || 0;
// //             setTimeout(() => {
// //               entry.target.classList.add('aos-animate');
// //             }, parseInt(delay));
// //             observer.unobserve(entry.target);
// //           }
// //         });
// //       },
// //       { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
// //     );
// //     animatedElements.forEach((el) => observer.observe(el));
// //     return () => observer.disconnect();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Form submitted:', { ...formData, subject: selectedSubject });
// //     alert('Thank you for reaching out! We will get back to you within 24 hours.');
// //     setFormData({
// //       firstName: '',
// //       lastName: '',
// //       email: '',
// //       phone: '',
// //       subject: '',
// //       message: ''
// //     });
// //     setSelectedSubject('general');
// //   };

// //   const subjectOptions = [
// //     { value: 'general', label: '💬 General Inquiry', icon: 'fa-regular fa-comment' },
// //     { value: 'partnership', label: '🤝 Partnership', icon: 'fa-regular fa-handshake' },
// //     { value: 'support', label: '🛠️ Technical Support', icon: 'fa-regular fa-headset' },
// //     { value: 'feedback', label: '⭐ Feedback', icon: 'fa-regular fa-star' },
// //     { value: 'restaurant', label: '🍽️ Restaurant Partner', icon: 'fa-regular fa-utensils' },
// //     { value: 'careers', label: '💼 Careers', icon: 'fa-regular fa-briefcase' },
// //   ];

// //   return (
// //     <main className="contact-page bg-white overflow-hidden">
// //       {/* Page Banner */}
// //       <section className="page-banner relative h-[300px] md:h-[350px] bg-[#121212] flex items-center overflow-hidden">
// //         <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=400&fit=crop')" }} />
// //         <div className="container relative z-10 mx-auto px-4 md:px-8">
// //           <div className="max-w-3xl">
// //             <div className="eyebrow flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
// //               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Contact Us
// //             </div>
// //             <h2 className="section-heading text-4xl md:text-5xl font-black text-white mb-4" data-aos="fade-up" data-aos-delay="100">
// //               We'd Love To Hear <span className="text-[#ff581b] font-title">From You</span>
// //             </h2>
// //             <p className="text-white/70 text-base md:text-lg" data-aos="fade-up" data-aos-delay="200">
// //               Partnerships, support, feedback or just a hello — we're always here and happy to talk.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Contact Main Section */}
// //       <div className="contact-main">
// //         {/* Left Panel - Brand Info */}
// //         <div className="contact-left bg-[#121212] relative overflow-hidden">
// //           <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop')" }} />
          
// //           {/* Decorative Rings */}
// //           <div className="absolute w-[280px] h-[280px] rounded-full border border-[#ff581b]/20 top-[-80px] right-[-80px] animate-float" />
// //           <div className="absolute w-[160px] h-[160px] rounded-full border border-[#ff581b]/20 top-[30%] left-[-60px] animate-float-delayed" />
// //           <div className="absolute w-[80px] h-[80px] rounded-full border border-dashed border-[#ff581b]/20 bottom-[25%] right-[10%] animate-float-slow" />
          
// //           <div className="absolute font-heading text-[150px] font-black text-white/5 right-0 bottom-[-25px] pointer-events-none select-none">
// //             FOODSIDE
// //           </div>

// //           <div className="relative z-10 flex flex-col justify-between min-h-screen p-8 md:p-16">
// //             <div>
// //               <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-right">
// //                 <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Get In Touch
// //               </div>
// //               <h1 className="text-4xl md:text-6xl font-black text-white mb-6" data-aos="fade-right" data-aos-delay="100">
// //                 Let's Talk <span className="text-[#ff581b] font-title">Food & Travel.</span>
// //               </h1>
// //               <p className="text-white/45 text-base max-w-md mb-12 leading-relaxed" data-aos="fade-right" data-aos-delay="200">
// //                 Partnerships, restaurant onboarding, technical support or simply sharing your experience — our team is here and always happy to hear from you.
// //               </p>
// //             </div>

// //             {/* Contact Info Cards */}
// //             <div className="space-y-5 mb-12" data-aos="fade-right" data-aos-delay="300">
// //               {/* Address */}
// //               <div className="flex items-center gap-4 group cursor-default">
// //                 <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/25 flex items-center justify-center text-[#ff581b] text-base transition-all duration-300 group-hover:bg-[#ff581b] group-hover:text-white group-hover:rotate-[-8deg] group-hover:scale-110">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">Our Office</div>
// //                   <div className="font-heading text-white font-bold">Chittepalli Village, Podalakur Mandal,</div>
// //                   <div className="text-white/70 text-sm">Nellore, Andhra Pradesh - 524345, India</div>
// //                 </div>
// //               </div>

// //               {/* Phone */}
// //               <div className="flex items-center gap-4 group cursor-default">
// //                 <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/25 flex items-center justify-center text-[#ff581b] text-base transition-all duration-300 group-hover:bg-[#ff581b] group-hover:text-white group-hover:rotate-[-8deg] group-hover:scale-110">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">Phone</div>
// //                   <div className="font-heading text-white font-bold">+91 86880 43861</div>
// //                 </div>
// //               </div>

// //               {/* Email 1 */}
// //               <div className="flex items-center gap-4 group cursor-default">
// //                 <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/25 flex items-center justify-center text-[#ff581b] text-base transition-all duration-300 group-hover:bg-[#ff581b] group-hover:text-white group-hover:rotate-[-8deg] group-hover:scale-110">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">Email (General)</div>
// //                   <div className="font-heading text-white font-bold">info@foodside.co.in</div>
// //                 </div>
// //               </div>

// //               {/* Email 2 */}
// //               <div className="flex items-center gap-4 group cursor-default">
// //                 <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/25 flex items-center justify-center text-[#ff581b] text-base transition-all duration-300 group-hover:bg-[#ff581b] group-hover:text-white group-hover:rotate-[-8deg] group-hover:scale-110">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                 </div>
// //                 <div>
// //                   <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">Email (Support)</div>
// //                   <div className="font-heading text-white font-bold">admin@foodside.co.in</div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Business Hours */}
// //             <div className="flex items-center justify-between border-t border-white/10 pt-6" data-aos="fade-right" data-aos-delay="400">
// //               <span className="text-white/20 text-xs">© 2026 Bollineni Ventures. All rights reserved.</span>
// //               <div className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2">
// //                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
// //                 <span className="text-white/50 text-xs font-semibold">Support: 24/7</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Panel - Contact Form */}
// //         <div className="contact-right bg-white relative overflow-hidden">
// //           {/* Background Pattern */}
// //           <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(18,18,18,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
// //           <div className="absolute w-[180px] h-[180px] bottom-0 right-0 bg-gradient-to-tl from-[#ff581b]/5 to-transparent pointer-events-none" />

// //           <div className="max-w-2xl mx-auto p-8 md:p-16">
// //             <div className="mb-8" data-aos="fade-left">
// //               <h3 className="text-3xl md:text-4xl font-black text-[#121212] mb-2">
// //                 Send Us a <span className="text-[#ff581b]">Message</span>
// //               </h3>
// //               <p className="text-[#555555]">We'll reply within 24 hours during working days.</p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* Name Fields Row */}
// //               <div className="grid md:grid-cols-2 gap-4">
// //                 <div className="field">
// //                   <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-2">
// //                     <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                     </svg>
// //                     First Name
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type="text"
// //                       name="firstName"
// //                       value={formData.firstName}
// //                       onChange={handleInputChange}
// //                       className="w-full bg-[#f8f8f8] border border-[#121212]/10 rounded-xl py-3 px-4 pl-11 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
// //                       placeholder="John"
// //                       required
// //                     />
// //                     <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //                 <div className="field">
// //                   <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-2">
// //                     <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                     </svg>
// //                     Last Name
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type="text"
// //                       name="lastName"
// //                       value={formData.lastName}
// //                       onChange={handleInputChange}
// //                       className="w-full bg-[#f8f8f8] border border-[#121212]/10 rounded-xl py-3 px-4 pl-11 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
// //                       placeholder="Doe"
// //                     />
// //                     <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Email Field */}
// //               <div className="field">
// //                 <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-2">
// //                   <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                   Email Address
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     className="w-full bg-[#f8f8f8] border border-[#121212]/10 rounded-xl py-3 px-4 pl-11 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
// //                     placeholder="you@example.com"
// //                     required
// //                   />
// //                   <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                 </div>
// //               </div>

// //               {/* Phone Field */}
// //               <div className="field">
// //                 <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-2">
// //                   <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                   </svg>
// //                   Phone Number
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="tel"
// //                     name="phone"
// //                     value={formData.phone}
// //                     onChange={handleInputChange}
// //                     className="w-full bg-[#f8f8f8] border border-[#121212]/10 rounded-xl py-3 px-4 pl-11 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
// //                     placeholder="+91 86880 43861"
// //                   />
// //                   <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                   </svg>
// //                 </div>
// //               </div>

// //               {/* Subject Chips */}
// //               <div className="field">
// //                 <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-3">
// //                   <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
// //                   </svg>
// //                   What's This About?
// //                 </label>
// //                 <div className="flex flex-wrap gap-2">
// //                   {subjectOptions.map((subject) => (
// //                     <button
// //                       key={subject.value}
// //                       type="button"
// //                       onClick={() => setSelectedSubject(subject.value)}
// //                       className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
// //                         selectedSubject === subject.value
// //                           ? 'bg-[#ff581b] text-white shadow-lg shadow-[#ff581b]/30'
// //                           : 'bg-[#f8f8f8] border border-[#121212]/10 text-[#555555] hover:border-[#ff581b] hover:text-[#ff581b]'
// //                       }`}
// //                     >
// //                       {subject.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Message Field */}
// //               <div className="field">
// //                 <label className="flex items-center gap-2 text-[#121212]/60 text-xs font-bold uppercase tracking-wider mb-2">
// //                   <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
// //                   </svg>
// //                   Your Message
// //                 </label>
// //                 <div className="relative">
// //                   <textarea
// //                     name="message"
// //                     value={formData.message}
// //                     onChange={handleInputChange}
// //                     rows={5}
// //                     className="w-full bg-[#f8f8f8] border border-[#121212]/10 rounded-xl py-3 px-4 pl-11 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)] resize-none"
// //                     placeholder="Tell us how we can help you..."
// //                     required
// //                   />
// //                   <svg className="absolute left-4 top-5 w-4 h-4 text-[#121212]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
// //                   </svg>
// //                 </div>
// //               </div>

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 className="btn-default bg-[#ff581b] text-white rounded-full py-4 px-8 relative overflow-hidden group inline-flex items-center gap-2 transition-all hover:bg-[#ff581b]/90 w-full justify-center"
// //               >
// //                 <span>Send Message</span>
// //                 <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                 </svg>
// //               </button>

// //               {/* Privacy Note */}
// //               <p className="text-center text-xs text-[#555555] mt-4 flex items-center justify-center gap-2">
// //                 <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //                 </svg>
// //                 We respect your privacy. Your information is safe with us.
// //               </p>
// //             </form>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Google Map Section */}
// //       <div className="map-section h-[320px] md:h-[400px] overflow-hidden relative">
// //         <iframe
// //           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.602863484285!2d79.901234!3d14.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c5d8e2f1a2b3d%3A0x7e8f9a0b1c2d3e4f!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
// //           className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
// //           allowFullScreen
// //           loading="lazy"
// //           title="FoodSide Office Location Map"
// //         />
// //       </div>

// //       <style jsx>{`
// //         @keyframes float {
// //           0%, 100% { transform: translateY(0); }
// //           50% { transform: translateY(-12px); }
// //         }
// //         @keyframes float-delayed {
// //           0%, 100% { transform: translateY(0); }
// //           50% { transform: translateY(-15px); }
// //         }
// //         @keyframes float-slow {
// //           0%, 100% { transform: translateY(0); }
// //           50% { transform: translateY(-8px); }
// //         }
// //         .animate-float { animation: float 6s ease-in-out infinite; }
// //         .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 2s; }
// //         .animate-float-slow { animation: float-slow 5s ease-in-out infinite 4s; }
        
// //         [data-aos] {
// //           opacity: 0;
// //           transform: translateY(20px);
// //           transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
// //         }
// //         [data-aos].aos-animate {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }
// //         [data-aos="fade-right"] {
// //           transform: translateX(-20px);
// //         }
// //         [data-aos="fade-right"].aos-animate {
// //           transform: translateX(0);
// //         }
// //         [data-aos="fade-left"] {
// //           transform: translateX(20px);
// //         }
// //         [data-aos="fade-left"].aos-animate {
// //           transform: translateX(0);
// //         }
        
// //         .contact-main {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           min-height: 100vh;
// //         }
        
// //         @media (max-width: 992px) {
// //           .contact-main {
// //             grid-template-columns: 1fr;
// //           }
// //         }
        
// //         @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Yesteryear&display=swap');
        
// //         .contact-page {
// //           font-family: 'Plus Jakarta Sans', sans-serif;
// //         }
// //         .font-heading {
// //           font-family: 'Raleway', sans-serif;
// //         }
// //         .font-title {
// //           font-family: 'Yesteryear', cursive;
// //         }
// //       `}</style>
// //     </main>
// //   );
// // };

// // export default ContactUs;

// "use client";
// import React, { useEffect, useState, useRef } from "react";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [selectedSubject, setSelectedSubject] = useState('general');

//   const subjectOptions = [
//     { value: 'general', label: '💬 General Inquiry' },
//     { value: 'partnership', label: '🤝 Partnership' },
//     { value: 'support', label: '🛠️ Technical Support' },
//     { value: 'feedback', label: '⭐ Feedback' },
//     { value: 'restaurant', label: '🍽️ Restaurant Partner' },
//     { value: 'careers', label: '💼 Careers' },
//   ];

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', { ...formData, subject: selectedSubject });
//     alert('Thank you for reaching out! We will get back to you within 24 hours.');
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       subject: '',
//       message: ''
//     });
//     setSelectedSubject('general');
//   };

//   // Animation on scroll effect
//   useEffect(() => {
//     const animatedElements = document.querySelectorAll("[data-aos]");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const delay = entry.target.getAttribute("data-aos-delay") || "0";
//             setTimeout(() => {
//               entry.target.classList.add("aos-animate");
//             }, parseInt(delay));
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
//     );
//     animatedElements.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <main className="bg-white min-h-screen">
//       {/* Hero Banner */}
//       <section className="relative h-[300px] md:h-[380px] bg-[#0a0a0a] flex items-center overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-20"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=500&fit=crop')",
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
//         <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
//           <div className="max-w-2xl" data-aos="fade-up">
//             <div className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
//               <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Get in Touch
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
//               Contact Us
//             </h1>
//             <p className="text-white/80 text-base md:text-lg max-w-xl">
//               We'd Love To Hear{" "}
//               <strong className="text-[#ff581b]">From You</strong>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Introduction Card */}
//       <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-12 relative z-20">
//         <div
//           className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           <div className="flex flex-col md:flex-row gap-6 items-start">
//             <div className="w-14 h-14 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
//               <svg
//                 className="w-7 h-7 text-[#ff581b]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//                 Partnerships, support, feedback or just a hello — we're always here and happy to talk.
//                 Our team is committed to responding to all inquiries within 24 hours.
//               </p>
//               <p className="text-gray-400 text-sm mt-3 italic">
//                 For urgent matters, please call our support line directly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - Two Column Layout */}
//       <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 lg:py-16">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Left Sidebar - Contact Information */}
//           <aside className="lg:w-96 xl:w-96 flex-shrink-0">
//             <div className="sticky top-24">
//               {/* Contact Info Card */}
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6">
//                 <div className="p-5 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-[#ff581b]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       />
//                     </svg>
//                     <h3 className="font-bold text-[#121212] text-lg">
//                       Contact Information
//                     </h3>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Reach out through any channel
//                   </p>
//                 </div>
//                 <div className="p-5 space-y-5">
//                   {/* Address */}
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-[#121212] text-sm mb-1">Our Office</h4>
//                       <p className="text-gray-500 text-sm">Chittepalli Village, Podalakur Mandal,</p>
//                       <p className="text-gray-500 text-sm">Nellore, Andhra Pradesh - 524345, India</p>
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-[#121212] text-sm mb-1">Phone</h4>
//                       <a href="tel:+918688043861" className="text-[#ff581b] text-sm hover:underline">+91 86880 43861</a>
//                       <p className="text-gray-400 text-xs mt-1">Mon-Sat: 9AM - 7PM</p>
//                     </div>
//                   </div>

//                   {/* Email General */}
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-[#121212] text-sm mb-1">Email (General)</h4>
//                       <a href="mailto:info@foodside.co.in" className="text-[#ff581b] text-sm hover:underline">info@foodside.co.in</a>
//                     </div>
//                   </div>

//                   {/* Email Support */}
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-[#121212] text-sm mb-1">Email (Support)</h4>
//                       <a href="mailto:admin@foodside.co.in" className="text-[#ff581b] text-sm hover:underline">admin@foodside.co.in</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Business Hours Card */}
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
//                 <div className="p-5 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-[#ff581b]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <h3 className="font-bold text-[#121212] text-lg">
//                       Business Hours
//                     </h3>
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-600 text-sm">Monday - Saturday</span>
//                     <span className="text-[#121212] font-semibold text-sm">9:00 AM - 10:00 PM</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-gray-600 text-sm">Sunday</span>
//                     <span className="text-[#121212] font-semibold text-sm">10:00 AM - 6:00 PM</span>
//                   </div>
//                   <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                     <span className="text-gray-500 text-xs">Support Available 24/7</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Right Content - Contact Form */}
//           <div className="flex-1 min-w-0">
//             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//               <div className="p-6 md:p-8">
//                 <div className="mb-8" data-aos="fade-up">
//                   <h2 className="text-2xl md:text-3xl font-bold text-[#121212] mb-2">
//                     Send Us a <span className="text-[#ff581b]">Message</span>
//                   </h2>
//                   <p className="text-gray-500">We'll reply within 24 hours during working days.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Name Fields Row */}
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
//                         placeholder="John"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
//                         placeholder="Doe"
//                       />
//                     </div>
//                   </div>

//                   {/* Email Field */}
//                   <div>
//                     <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
//                       placeholder="you@example.com"
//                       required
//                     />
//                   </div>

//                   {/* Phone Field */}
//                   <div>
//                     <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
//                       placeholder="+91 86880 43861"
//                     />
//                   </div>

//                   {/* Subject Chips */}
//                   <div>
//                     <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-3">
//                       What's This About?
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {subjectOptions.map((subject) => (
//                         <button
//                           key={subject.value}
//                           type="button"
//                           onClick={() => setSelectedSubject(subject.value)}
//                           className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//                             selectedSubject === subject.value
//                               ? 'bg-[#ff581b] text-white shadow-lg shadow-[#ff581b]/30'
//                               : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#ff581b] hover:text-[#ff581b]'
//                           }`}
//                         >
//                           {subject.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Message Field */}
//                   <div>
//                     <label className="block text-[#121212]/60 text-xs font-semibold uppercase tracking-wider mb-2">
//                       Your Message
//                     </label>
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows={5}
//                       className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)] resize-none"
//                       placeholder="Tell us how we can help you..."
//                       required
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-[#ff581b] text-white rounded-xl py-4 px-8 font-semibold transition-all duration-300 hover:bg-[#e04e12] hover:shadow-lg hover:shadow-[#ff581b]/30 flex items-center justify-center gap-2 group"
//                   >
//                     <span>Send Message</span>
//                     <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>

//                   {/* Privacy Note */}
//                   <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
//                     <svg className="w-3 h-3 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                     We respect your privacy. Your information is safe with us.
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Google Map Section */}
//       <section className="py-12 lg:py-16 bg-gray-50">
//         <div className="container mx-auto px-4 md:px-8 max-w-7xl">
//           <div className="text-center mb-8" data-aos="fade-up">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
//               <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Find Us
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
//               Visit Our <span className="text-[#ff581b]">Location</span>
//             </h2>
//           </div>
//           <div className="rounded-2xl overflow-hidden shadow-xl" data-aos="fade-up" data-aos-delay="100">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.602863484285!2d79.901234!3d14.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c5d8e2f1a2b3d%3A0x7e8f9a0b1c2d3e4f!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//               className="w-full h-[320px] md:h-[400px] border-0"
//               allowFullScreen
//               loading="lazy"
//               title="FoodSide Office Location Map"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Footer Note */}
//       <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-12">
//         <div className="bg-gradient-to-r from-[#ff581b]/5 to-transparent rounded-2xl p-6 border border-gray-100">
//           <div className="flex items-center gap-3">
//             <svg
//               className="w-5 h-5 text-[#ff581b]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <p className="text-gray-500 text-sm">
//               © 2026 Bollineni Ventures. All rights reserved. | Grievance Officer: <strong className="text-[#121212]">Mr. Bollineni</strong> | Available Mon-Sat (9 AM - 10 PM)
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         [data-aos] {
//           opacity: 0;
//           transform: translateY(20px);
//           transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         [data-aos].aos-animate {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }

//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default ContactUs;


"use client";
import React, { useEffect, useState, useRef } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [selectedSubject, setSelectedSubject] = useState('general');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, subject: selectedSubject });
    alert('Thank you for reaching out! We will get back to you within 24 hours.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setSelectedSubject('general');
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
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[380px] bg-[#0a0a0a] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=500&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
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
                        placeholder="John"
                        required
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
                        placeholder="Doe"
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
                      placeholder="you@example.com"
                      required
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
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-[#121212] outline-none transition-all focus:border-[#ff581b] focus:bg-[#ff581b]/5 focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)]"
                      placeholder="+91 86880 43861"
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
        onClick={() => setSelectedSubject(subject.value)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
          selectedSubject === subject.value
            ? "bg-[#ff581b] !text-white shadow-lg shadow-[#ff581b]/30"
            : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#ff581b] hover:text-[#ff581b]"
        }`}
      >
        <span
          className={
            selectedSubject === subject.value
              ? "!text-white"
              : "text-gray-600"
          }
        >
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
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#ff581b] text-white rounded-xl py-4 px-8 font-semibold transition-all duration-300 hover:bg-[#e04e12] hover:shadow-lg hover:shadow-[#ff581b]/30 flex items-center justify-center gap-2 group"
                  >
                    <span className="text-white">Send Message</span>
                    <svg className="w-4 h-4 transition-transform  text-white group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

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

      {/* Footer Note */}
      {/* <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-12">
        <div className="bg-gradient-to-r from-[#ff581b]/5 to-transparent rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
           
          </div>
        </div>
      </div> */}

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
      `}</style>
    </main>
  );
};

export default ContactUs;