// "use client";
// import React, { useEffect } from 'react';

// const TermsAndCondtion = () => {
//   useEffect(() => {
//     const animatedElements = document.querySelectorAll("[data-aos]");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const delay = entry.target.getAttribute('data-aos-delay') || 0;
//             setTimeout(() => {
//               entry.target.classList.add('aos-animate');
//             }, parseInt(delay));
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
//     );
//     animatedElements.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   const termsSections = [
//     {
//       id: 1,
//       title: "Introduction and Definitions",
//       icon: "fa-regular fa-circle-info",
//       content: [
//         "These Terms and Conditions (\"Terms\") govern the use of the Food Side mobile application, website, and related services (\"Platform\"), owned and operated by Bollineni Ventures (\"Company\"). By accessing or using the Platform, users agree to comply with and be bound by these Terms.",
//         { type: "definition", text: "Definitions:" },
//         { type: "list", items: [
//           "User — Any individual accessing or using the Platform.",
//           "Vendor — Restaurants, food stalls, cloud kitchens, or food providers listed on the Platform.",
//           "Company — Bollineni Ventures, the owner and operator of Food Side."
//         ]}
//       ]
//     },
//     {
//       id: 2,
//       title: "Eligibility and User Accounts",
//       icon: "fa-regular fa-user-check",
//       content: [
//         "Users must be at least 18 years old or use the Platform under supervision of a parent or legal guardian.",
//         "Users are responsible for maintaining confidentiality of account credentials and all activities performed through their accounts.",
//         { type: "tip", text: "You are solely responsible for any activity that occurs under your account. Please keep your login details secure." }
//       ]
//     },
//     {
//       id: 3,
//       title: "Services and Orders",
//       icon: "fa-regular fa-bag-shopping",
//       content: [
//         "Food Side provides an online platform enabling users to browse, order, purchase, and receive food and related services from listed vendors.",
//         "All orders placed through the Platform are subject to acceptance and availability by vendors.",
//         "Payments may be processed through UPI, debit/credit cards, wallets, net banking, or cash on delivery where available.",
//         "Prices displayed on the Platform may vary and are subject to change without prior notice. Applicable taxes, delivery charges, packaging fees, and service charges may apply."
//       ]
//     },
//     {
//       id: 4,
//       title: "Cancellation and Refund Policy",
//       icon: "fa-regular fa-rotate-left",
//       content: [
//         "Orders may only be cancelled before preparation begins.",
//         "Refunds, if applicable, will be processed according to the Company's refund and cancellation policy.",
//         "Delivery timelines are estimated and may vary due to traffic conditions, weather, vendor delays, or unforeseen circumstances.",
//         { type: "tip", text: "If you need to cancel your order, please do so immediately. Once preparation starts, cancellations cannot be processed." }
//       ]
//     },
//     {
//       id: 5,
//       title: "Vendor Responsibility",
//       icon: "fa-regular fa-utensils",
//       content: [
//         "Food quality, preparation standards, hygiene, safety, and packaging are solely the responsibility of the respective vendor.",
//         "The Company acts as an intermediary platform connecting users with vendors and does not directly prepare or handle food items.",
//         { type: "warning", text: "Any issues regarding food quality or preparation should be directed to the respective vendor through the Platform." }
//       ]
//     },
//     {
//       id: 6,
//       title: "User Conduct",
//       icon: "fa-regular fa-gavel",
//       content: [
//         "Users shall not misuse the Platform, attempt unauthorized access, engage in fraudulent transactions, or violate any applicable laws or regulations.",
//         "Prohibited activities include, but are not limited to:",
//         { type: "list", items: [
//           "Using automated scripts or bots to interact with the Platform",
//           "Posting false, misleading, or harmful content",
//           "Interfering with Platform security features",
//           "Engaging in price manipulation or fake orders"
//         ]}
//       ]
//     },
//     {
//       id: 7,
//       title: "Intellectual Property Rights",
//       icon: "fa-regular fa-copyright",
//       content: [
//         "All logos, trademarks, branding materials, application designs, software, and content associated with Food Side are the intellectual property of Bollineni Ventures.",
//         "Users may not copy, reproduce, distribute, modify, or create derivative works of any Platform content without explicit written permission from the Company.",
//         { type: "tip", text: "Food Side and its logo are registered trademarks of Bollineni Ventures. Unauthorized use is strictly prohibited." }
//       ]
//     },
//     {
//       id: 8,
//       title: "Limitation of Liability",
//       icon: "fa-regular fa-shield",
//       content: [
//         "Bollineni Ventures and Food Side shall not be liable for indirect, incidental, or consequential damages arising from use of the Platform or services provided by vendors.",
//         "The Company's total liability, if any, shall be limited to the amount paid by the user for the specific transaction giving rise to the claim.",
//         { type: "warning", text: "The Platform is provided \"as is\" without warranties of any kind, express or implied." }
//       ]
//     },
//     {
//       id: 9,
//       title: "Privacy Policy",
//       icon: "fa-regular fa-lock",
//       content: [
//         "User information shall be collected, stored, and processed in accordance with the Company's Privacy Policy.",
//         "By using Food Side, users consent to the collection and use of their information as described in the Privacy Policy.",
//         "Refer to our Privacy Policy for detailed information on data handling practices.",
//         { type: "link", text: "Read Privacy Policy", href: "/privacy-policy" }
//       ]
//     },
//     {
//       id: 10,
//       title: "Suspension, Termination and Modifications",
//       icon: "fa-regular fa-pen-to-square",
//       content: [
//         "The Company reserves the right to suspend or terminate any account found violating these Terms or engaging in unlawful activities.",
//         "Bollineni Ventures may modify these Terms at any time without prior notice. Continued use of the Platform constitutes acceptance of the revised Terms.",
//         "Users are encouraged to review these Terms periodically for updates.",
//         { type: "tip", text: "Last updated: January 2026" }
//       ]
//     },
//     {
//       id: 11,
//       title: "Governing Law and Contact Information",
//       icon: "fa-regular fa-building",
//       content: [
//         "These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of competent courts.",
//         "For support, complaints, or legal communication, users may contact Food Side through the official communication channels provided within the application.",
//         "",
//         { type: "contact", items: [
//           { icon: "fa-regular fa-envelope", text: "Email: info@foodside.co.in" },
//           { icon: "fa-regular fa-envelope", text: "Support: admin@foodside.co.in" },
//           { icon: "fa-regular fa-phone", text: "Phone: +91 86880 43861" },
//           { icon: "fa-regular fa-location-dot", text: "Address: Chittepalli Village, Podalakur Mandal, Nellore, Andhra Pradesh - 524345" }
//         ]}
//       ]
//     }
//   ];

//   return (
//     <main className="terms-page bg-white overflow-hidden">
//       {/* Page Banner */}
//       <section className="page-banner relative h-[300px] md:h-[350px] bg-[#121212] flex items-center overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=400&fit=crop')" }} />
//         <div className="container relative z-10 mx-auto px-4 md:px-8">
//           <div className="max-w-3xl">
//             <div className="eyebrow flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Terms & Conditions
//             </div>
//             <h2 className="section-heading text-4xl md:text-5xl font-black text-white mb-4" data-aos="fade-up" data-aos-delay="100">
//               Our <span className="text-[#ff581b] font-title">Policies</span> for a Smooth Experience
//             </h2>
//             <p className="text-white/70 text-base md:text-lg" data-aos="fade-up" data-aos-delay="200">
//               Owned and Operated by Bollineni Ventures — Please read these terms carefully before using Food Side.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="intro-section py-16 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="policy-intro bg-[#121212] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-[#ff581b]/20" data-aos="fade-up">
//             <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[#ff581b]/20 blur-3xl pointer-events:none" />
//             <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-[#ff581b]/10 blur-2xl pointer-events:none" />
//             <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
//               <div className="w-14 h-14 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-2xl flex-shrink-0">
//                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-white text-xl md:text-2xl font-black mb-2">Terms and Conditions – Food Side App</div>
//                 <p className="text-white/50 text-sm md:text-base leading-relaxed">
//                   Owned and Operated by <strong className="text-[#ff581b]">Bollineni Ventures</strong>. These Terms and Conditions govern the use of the Food Side mobile application, website, and related services. By accessing or using the Platform, users agree to comply with and be bound by these Terms.
//                 </p>
//                 <p className="text-white/40 text-xs mt-3 italic">
//                   By using Food Side, users acknowledge that they have read, understood, and agreed to these Terms and Conditions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Terms Sections Grid */}
//       <section className="terms-grid-section py-20 bg-white">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Legal Agreement
//             </div>
//             <h2 className="text-3xl md:text-5xl font-black text-[#121212] mb-6">
//               Terms <span className="text-[#ff581b] font-title">& Conditions</span>
//             </h2>
//             <p className="text-[#555555] text-lg">
//               These terms apply to all users, vendors, and partners of the Food Side Platform.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {termsSections.map((section, idx) => (
//               <div 
//                 key={section.id}
//                 className="policy-block bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-[#ff581b]/30 hover:shadow-xl"
//                 data-aos="fade-up"
//                 data-aos-delay={(idx % 2) * 100 + Math.floor(idx / 2) * 50}
//               >
//                 <div className="policy-block-bar h-1 w-full bg-[#ff581b] rounded-t-2xl" />
//                 <div className="p-6 md:p-8">
//                   <div className="flex items-start gap-4 mb-5">
//                     <div className="w-12 h-12 rounded-xl bg-[#ff581b]/10 text-[#ff581b] border border-[#ff581b]/20 flex items-center justify-center text-xl flex-shrink-0">
//                       <i className={`${section.icon} text-lg`}></i>
//                     </div>
//                     <div>
//                       <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">
//                         Section {String(section.id).padStart(2, '0')}
//                       </div>
//                       <h3 className="text-xl font-black text-[#121212]">{section.title}</h3>
//                     </div>
//                   </div>
//                   <div className="policy-divider h-px bg-gradient-to-r from-[#ff581b]/30 to-transparent my-4" />
//                   <div className="policy-body space-y-3">
//                     {section.content.map((item, i) => {
//                       if (typeof item === 'string') {
//                         return <p key={i} className="text-[#555555] text-sm leading-relaxed">{item}</p>;
//                       } else if (item.type === 'definition') {
//                         return <h4 key={i} className="font-heading font-bold text-[#121212] mt-4 mb-2">{item.text}</h4>;
//                       } else if (item.type === 'list') {
//                         return (
//                           <ul key={i} className="space-y-2 mt-3 mb-3">
//                             {item.items.map((listItem, j) => (
//                               <li key={j} className="flex items-start gap-2 text-[#555555] text-sm">
//                                 <span className="text-[#ff581b] mt-1">•</span>
//                                 <span>{listItem}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         );
//                       } else if (item.type === 'tip') {
//                         return (
//                           <div key={i} className="flex items-start gap-3 bg-[#ff581b]/5 border border-[#ff581b]/20 rounded-xl p-4 mt-4">
//                             <svg className="w-5 h-5 text-[#ff581b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                             </svg>
//                             <p className="text-[#555555] text-sm">{item.text}</p>
//                           </div>
//                         );
//                       } else if (item.type === 'warning') {
//                         return (
//                           <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
//                             <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                             </svg>
//                             <p className="text-[#555555] text-sm">{item.text}</p>
//                           </div>
//                         );
//                       } else if (item.type === 'link') {
//                         return (
//                           <a key={i} href={item.href} className="inline-flex items-center gap-2 text-[#ff581b] font-semibold text-sm mt-3 hover:gap-3 transition-all">
//                             {item.text}
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </a>
//                         );
//                       } else if (item.type === 'contact') {
//                         return (
//                           <div key={i} className="space-y-3 mt-4 pt-2">
//                             {item.items.map((contact, j) => (
//                               <div key={j} className="flex items-center gap-3 text-sm text-[#555555]">
//                                 <i className={`${contact.icon} w-4 text-[#ff581b]`}></i>
//                                 <span>{contact.text}</span>
//                               </div>
//                             ))}
//                           </div>
//                         );
//                       }
//                       return null;
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Acceptance Footer */}
//       <section className="acceptance-section py-16 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200" data-aos="zoom-in">
//               <div className="w-16 h-16 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-6">
//                 <svg className="w-8 h-8 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-black text-[#121212] mb-4">Acknowledgment of Terms</h3>
//               <p className="text-[#555555] text-base leading-relaxed">
//                 By using Food Side, users acknowledge that they have read, understood, and agreed to these Terms and Conditions.
//               </p>
//               <p className="text-[#555555] text-sm mt-4 italic">
//                 For any questions or concerns regarding these Terms, please contact our support team.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center mt-8">
//                 <a href="/contact" className="bg-[#ff581b] text-white rounded-full py-3 px-6 hover:bg-[#e04e12] transition-all inline-flex items-center gap-2">
//                   Contact Support
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </a>
//                 <a href="/privacy-policy" className="border-2 border-[#ff581b] text-[#ff581b] rounded-full py-3 px-6 hover:bg-[#ff581b] hover:text-white transition-all">
//                   Read Privacy Policy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
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
//         [data-aos="zoom-in"] {
//           transform: scale(0.95);
//           opacity: 0;
//         }
//         [data-aos="zoom-in"].aos-animate {
//           transform: scale(1);
//           opacity: 1;
//         }
        
//         @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Yesteryear&display=swap');
        
//         .terms-page {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//         }
//         .font-heading {
//           font-family: 'Raleway', sans-serif;
//         }
//         .font-title {
//           font-family: 'Yesteryear', cursive;
//         }
        
//         .policy-block {
//           transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease, border-color 0.3s;
//         }
        
//         .policy-block:hover {
//           transform: translateY(-6px);
//         }
        
//         .policy-block-bar {
//           width: 0;
//           transition: width 0.4s ease;
//         }
        
//         .policy-block:hover .policy-block-bar {
//           width: 100%;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default TermsAndCondtion;


"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const TermsAndCondtion = () => {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef({});

  const termsSections = [
    {
      id: 1,
      number: "01",
      title: "Introduction and Definitions",
      description: "These Terms and Conditions (\"Terms\") govern the use of the Food Side mobile application, website, and related services (\"Platform\"), owned and operated by Bollineni Ventures (\"Company\"). By accessing or using the Platform, users agree to comply with and be bound by these Terms.\n\nDefinitions:\n• User — Any individual accessing or using the Platform.\n• Vendor — Restaurants, food stalls, cloud kitchens, or food providers listed on the Platform.\n• Company — Bollineni Ventures, the owner and operator of Food Side."
    },
    {
      id: 2,
      number: "02",
      title: "Eligibility and User Accounts",
      description: "Users must be at least 18 years old or use the Platform under supervision of a parent or legal guardian.\n\nUsers are responsible for maintaining confidentiality of account credentials and all activities performed through their accounts.\n\nTip: You are solely responsible for any activity that occurs under your account. Please keep your login details secure."
    },
    {
      id: 3,
      number: "03",
      title: "Services and Orders",
      description: "Food Side provides an online platform enabling users to browse, order, purchase, and receive food and related services from listed vendors.\n\nAll orders placed through the Platform are subject to acceptance and availability by vendors.\n\nPayments may be processed through UPI, debit/credit cards, wallets, net banking, or cash on delivery where available.\n\nPrices displayed on the Platform may vary and are subject to change without prior notice. Applicable taxes, delivery charges, packaging fees, and service charges may apply."
    },
    {
      id: 4,
      number: "04",
      title: "Cancellation and Refund Policy",
      description: "Orders may only be cancelled before preparation begins.\n\nRefunds, if applicable, will be processed according to the Company's refund and cancellation policy.\n\nDelivery timelines are estimated and may vary due to traffic conditions, weather, vendor delays, or unforeseen circumstances.\n\nTip: If you need to cancel your order, please do so immediately. Once preparation starts, cancellations cannot be processed."
    },
    {
      id: 5,
      number: "05",
      title: "Vendor Responsibility",
      description: "Food quality, preparation standards, hygiene, safety, and packaging are solely the responsibility of the respective vendor.\n\nThe Company acts as an intermediary platform connecting users with vendors and does not directly prepare or handle food items.\n\nWarning: Any issues regarding food quality or preparation should be directed to the respective vendor through the Platform."
    },
    {
      id: 6,
      number: "06",
      title: "User Conduct",
      description: "Users shall not misuse the Platform, attempt unauthorized access, engage in fraudulent transactions, or violate any applicable laws or regulations.\n\nProhibited activities include, but are not limited to:\n• Using automated scripts or bots to interact with the Platform\n• Posting false, misleading, or harmful content\n• Interfering with Platform security features\n• Engaging in price manipulation or fake orders"
    },
    {
      id: 7,
      number: "07",
      title: "Intellectual Property Rights",
      description: "All logos, trademarks, branding materials, application designs, software, and content associated with Food Side are the intellectual property of Bollineni Ventures.\n\nUsers may not copy, reproduce, distribute, modify, or create derivative works of any Platform content without explicit written permission from the Company.\n\nTip: Food Side and its logo are registered trademarks of Bollineni Ventures. Unauthorized use is strictly prohibited."
    },
    {
      id: 8,
      number: "08",
      title: "Limitation of Liability",
      description: "Bollineni Ventures and Food Side shall not be liable for indirect, incidental, or consequential damages arising from use of the Platform or services provided by vendors.\n\nThe Company's total liability, if any, shall be limited to the amount paid by the user for the specific transaction giving rise to the claim.\n\nWarning: The Platform is provided \"as is\" without warranties of any kind, express or implied."
    },
    {
      id: 9,
      number: "09",
      title: "Privacy Policy",
      description: "User information shall be collected, stored, and processed in accordance with the Company's Privacy Policy.\n\nBy using Food Side, users consent to the collection and use of their information as described in the Privacy Policy.\n\nRefer to our Privacy Policy for detailed information on data handling practices."
    },
    {
      id: 10,
      number: "10",
      title: "Suspension, Termination and Modifications",
      description: "The Company reserves the right to suspend or terminate any account found violating these Terms or engaging in unlawful activities.\n\nBollineni Ventures may modify these Terms at any time without prior notice. Continued use of the Platform constitutes acceptance of the revised Terms.\n\nUsers are encouraged to review these Terms periodically for updates.\n\nTip: Last updated: January 2026"
    },
    {
      id: 11,
      number: "11",
      title: "Governing Law and Contact Information",
      description: "These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of competent courts.\n\nFor support, complaints, or legal communication, users may contact Food Side through the official communication channels provided within the application.\n\n• Email: info@foodside.co.in\n• Support: admin@foodside.co.in\n• Phone: +91 86880 43861\n• Address: Chittepalli Village, Podalakur Mandal, Nellore, Andhra Pradesh - 524345"
    }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of termsSections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, termsSections]);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
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

  // Helper function to format description with line breaks
  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <div key={index} className="flex items-start gap-2 mt-2">
            <span className="text-[#ff581b] mt-1">•</span>
            <span className="text-gray-600">{line.substring(1).trim()}</span>
          </div>
        );
      }
      if (line.startsWith('Tip:')) {
        return (
          <div key={index} className="flex items-start gap-3 bg-[#ff581b]/5 border border-[#ff581b]/20 rounded-xl p-4 mt-4">
            <svg className="w-5 h-5 text-[#ff581b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-gray-600 text-sm">{line.substring(4).trim()}</p>
          </div>
        );
      }
      if (line.startsWith('Warning:')) {
        return (
          <div key={index} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-gray-600 text-sm">{line.substring(8).trim()}</p>
          </div>
        );
      }
      if (line.trim() === '') return <div key={index} className="h-2"></div>;
      return line.trim() ? <p key={index} className="text-gray-600 leading-relaxed mt-2">{line.trim()}</p> : null;
    });
  };

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
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Terms & Conditions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Food Side
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              Owned and Operated by{" "}
              <strong className="text-[#ff581b]">Bollineni Ventures</strong>
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
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                These Terms and Conditions govern the use of the Food Side mobile application, website, and related services (Platform), owned and operated by{" "}
                <strong className="text-[#121212]">Bollineni Ventures</strong>.
              </p>
              <p className="text-gray-400 text-sm mt-3 italic">
                By accessing or using the Platform, users agree to comply with and be bound by these Terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8" data-aos="fade-up" data-aos-delay="200">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          <strong className="text-[#121212]">Food Side</strong> is a food
          ordering, transportation, logistics, and highway pickup platform
          operated by
          <strong className="text-[#ff581b]"> Bollineni Ventures</strong>. These
          Terms and Conditions apply to all users, vendors, and partners of the
          Food Side Platform.
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 md:px-8 max-w-8xl py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Table of Contents */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
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
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  <h3 className="font-bold text-[#121212] text-lg">
                    All Sections
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {termsSections.length} legal sections
                </p>
              </div>
              <nav className="p-3 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {termsSections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
                          activeSection === section.id
                            ? "bg-[#ff581b]/10 text-[#ff581b] border-l-2 border-[#ff581b]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#ff581b]"
                        }`}
                      >
                        <span
                          className={`text-xs w-7 ${
                            activeSection === section.id
                              ? "text-[#ff581b] font-bold"
                              : "text-gray-400 group-hover:text-[#ff581b]"
                          }`}
                        >
                          {section.number}
                        </span>
                        <span className="flex-1 truncate">{section.title}</span>
                        {activeSection === section.id && (
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Right Content - Terms Document */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {termsSections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id.toString()}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className={`scroll-mt-24 p-6 md:p-8 ${index !== termsSections.length - 1 ? "border-b border-gray-100" : ""}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 30}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#ff581b] font-bold text-sm">
                        {section.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-[#121212] mb-3">
                        {section.title}
                      </h2>
                      <div className="text-gray-600 leading-relaxed">
                        {formatDescription(section.description)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer Note */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-t border-gray-100">
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
                  <p className="text-gray-500 text-sm">
                    By using Food Side, users acknowledge that they have read, understood, and agreed to these Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Get in
              Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
              Have Questions About Our{" "}
              <span className="text-[#ff581b]">Terms?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              For any questions, grievances, or legal matters, please reach out
              to our support team.
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
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
              <h3 className="font-bold text-[#121212] text-lg mb-2">
                Email Us
              </h3>
              <a
                href="mailto:info@foodside.co.in"
                className="text-[#ff581b] hover:underline block"
              >
                info@foodside.co.in
              </a>
              <a
                href="mailto:admin@foodside.co.in"
                className="text-gray-500 text-sm hover:text-[#ff581b] block mt-1"
              >
                admin@foodside.co.in
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">Call Us</h3>
              <a
                href="tel:+918688043861"
                className="text-[#ff581b] hover:underline"
              >
                +91 86880 43861
              </a>
              <p className="text-gray-400 text-sm mt-1">Mon-Sat: 9AM - 7PM</p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600 text-sm">Chittepalli Village</p>
              <p className="text-gray-600 text-sm">Podalakur Mandal</p>
              <p className="text-gray-600 text-sm">
                Nellore, Andhra Pradesh - 524345
              </p>
            </div>
          </div>

          {/* Grievance Officer Note */}
          <div
            className="mt-8 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <svg
                className="w-4 h-4 text-[#ff581b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                Grievance Officer:{" "}
                <strong className="text-[#121212]">Mr. Bollineni</strong> |
                Available Mon-Sat (9 AM - 10 PM)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8" data-aos="fade-up" data-aos-delay="300">
            <Link href="/contact_us" className="bg-[#ff581b] text-white rounded-full py-3 px-8 hover:bg-[#e04e12] transition-all inline-flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
              Contact Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/privacypolicy" className="border-2 border-[#ff581b] text-[#ff581b] rounded-full py-3 px-8 hover:bg-[#ff581b] hover:text-white transition-all font-semibold">
              Read Privacy Policy
            </Link>
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

        [data-aos] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff581b;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e04e12;
        }
      `}</style>
    </main>
  );
};

export default TermsAndCondtion;