// "use client";
// import React, { useEffect } from 'react';

// const RefundPolicies = () => {
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

//   const sections = [
//     {
//       id: 1,
//       title: "Order Cancellation Policy",
//       icon: "fa-regular fa-rectangle-xmark",
//       content: [
//         { type: "sub", text: "1.1 Cancellation Before Restaurant Confirmation" },
//         { type: "desc", text: "Customers may cancel the order before the restaurant accepts or starts preparing the order. Full refund will be provided. Refund will be processed to the original payment method." },
//         { type: "sub", text: "1.2 Cancellation After Restaurant Confirmation" },
//         { type: "desc", text: "Once the restaurant begins preparing the order: Cancellation may not be allowed. Partial cancellation charges or full cancellation charges may apply. Refund eligibility depends on preparation status and delivery assignment." },
//         { type: "sub", text: "1.3 Cancellation Due to Delivery Delay" },
//         { type: "desc", text: "If the delivery is excessively delayed due to restaurant or delivery partner issues, customers may request cancellation and compensation subject to review." }
//       ]
//     },
//     {
//       id: 2,
//       title: "Eligible Refund Situations",
//       icon: "fa-regular fa-circle-check",
//       content: [
//         { type: "desc", text: "Refunds or replacements may be approved in the following cases:" },
//         { type: "list", items: [
//           "Order not delivered",
//           "Wrong item delivered",
//           "Missing items",
//           "Damaged or spilled food",
//           "Spoiled or unsafe food",
//           "Incorrect customization",
//           "Duplicate payment deduction",
//           "Restaurant unable to fulfill the order",
//           "Order marked delivered but not received"
//         ]},
//         { type: "desc", text: "Customers may be required to provide: Photos/videos of the issue, Order details, Packaging images where applicable" }
//       ]
//     },
//     {
//       id: 3,
//       title: "Partial Refunds",
//       icon: "fa-regular fa-chart-simple",
//       content: [
//         { type: "desc", text: "Partial refunds may be provided when:" },
//         { type: "list", items: [
//           "Only specific items are missing",
//           "One or more items are incorrect",
//           "Quality issues affect only part of the order"
//         ]},
//         { type: "desc", text: "The refund amount will be limited to the affected items only." }
//       ]
//     },
//     {
//       id: 4,
//       title: "Non-Refundable Situations",
//       icon: "fa-regular fa-ban",
//       content: [
//         { type: "desc", text: "Refunds will generally NOT be provided in the following situations:" },
//         { type: "list", items: [
//           "Change of mind after order confirmation",
//           "Incorrect address provided by customer",
//           "Customer unavailable at delivery location",
//           "Minor delays caused by traffic, weather, or external conditions",
//           "Taste preferences or personal dislike",
//           "Orders refused at the time of delivery",
//           "Failure to answer delivery calls/messages"
//         ]}
//       ]
//     },
//     {
//       id: 5,
//       title: "Failed Payments",
//       icon: "fa-regular fa-credit-card",
//       content: [
//         { type: "desc", text: "If payment is deducted but the order is not successfully placed:" },
//         { type: "list", items: [
//           "The amount will usually be auto-reversed by the bank/payment gateway.",
//           "Processing time may take 5–7 business days depending on the bank.",
//           "If refund is not received within the expected timeline, customers may contact support."
//         ]}
//       ]
//     },
//     {
//       id: 6,
//       title: "Refund Processing Timeline",
//       icon: "fa-regular fa-clock",
//       content: [
//         { type: "table", headers: ["Payment Method", "Expected Refund Time"], rows: [
//           ["UPI", "2–5 Business Days"],
//           ["Debit/Credit Card", "5–7 Business Days"],
//           ["Net Banking", "3–7 Business Days"],
//           ["COD Orders", "Bank Transfer (if applicable)"]
//         ]},
//         { type: "desc", text: "Actual timelines may vary based on banking partners." }
//       ]
//     },
//     {
//       id: 7,
//       title: "Reporting an Issue",
//       icon: "fa-regular fa-envelope",
//       content: [
//         { type: "desc", text: "Customers must report issues within:" },
//         { type: "list", items: [
//           "24 hours for food delivery complaints",
//           "Immediately upon delivery for missing or incorrect items where possible"
//         ]},
//         { type: "desc", text: "Issues can be reported through:" },
//         { type: "list", items: [
//           "In-app Support",
//           "Order Help Section",
//           "Customer Care Email",
//           "WhatsApp Support"
//         ]}
//       ]
//     },
//     {
//       id: 8,
//       title: "Fraud Prevention",
//       icon: "fa-regular fa-shield",
//       content: [
//         { type: "desc", text: "Bollineni Ventures reserves the right to:" },
//         { type: "list", items: [
//           "Reject fraudulent refund claims",
//           "Suspend accounts involved in abuse or repeated false complaints",
//           "Verify complaints using order history, GPS logs, call records, and submitted evidence"
//         ]}
//       ]
//     },
//     {
//       id: 9,
//       title: "Force Majeure",
//       icon: "fa-regular fa-cloud",
//       content: [
//         { type: "desc", text: "Refunds may not be guaranteed during events beyond reasonable control, including:" },
//         { type: "list", items: [
//           "Natural disasters",
//           "Government restrictions",
//           "Severe weather conditions",
//           "Internet/payment gateway failures",
//           "Public emergencies"
//         ]}
//       ]
//     }
//   ];

//   return (
//     <main className="refund-policy-page bg-white overflow-hidden">
//       {/* Page Banner */}
//       <section className="page-banner relative h-[300px] md:h-[350px] bg-[#121212] flex items-center overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=400&fit=crop')" }} />
//         <div className="container relative z-10 mx-auto px-4 md:px-8">
//           <div className="max-w-3xl">
//             <div className="eyebrow flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Refund & Cancellation
//             </div>
//             <h2 className="section-heading text-4xl md:text-5xl font-black text-white mb-4" data-aos="fade-up" data-aos-delay="100">
//               Our <span className="text-[#ff581b] font-title">Commitment</span> to Fairness
//             </h2>
//             <p className="text-white/70 text-base md:text-lg" data-aos="fade-up" data-aos-delay="200">
//               Food Side App by Bollineni Ventures — Effective Date: June 2026
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="intro-section py-16 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="policy-intro bg-[#121212] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-[#ff581b]/20" data-aos="fade-up">
//             <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[#ff581b]/20 blur-3xl pointer-events-none" />
//             <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-[#ff581b]/10 blur-2xl pointer-events-none" />
//             <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
//               <div className="w-14 h-14 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-2xl flex-shrink-0">
//                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-white text-xl md:text-2xl font-black mb-2">Customer Satisfaction Is Our Priority</div>
//                 <p className="text-white/50 text-sm md:text-base leading-relaxed">
//                   At <strong className="text-[#ff581b]">Bollineni Ventures</strong>, customer satisfaction is our priority. This Refund &amp; Cancellation Policy explains the conditions under which cancellations, refunds, replacements, or compensation may be provided for orders placed through the Food Side App. Due to the perishable nature of food products, refunds are evaluated carefully and may vary depending on the issue reported.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Policy Sections Grid */}
//       <section className="policy-sections py-20 bg-white">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Policy Details
//             </div>
//             <h2 className="text-3xl md:text-5xl font-black text-[#121212] mb-6">
//               Refund & Cancellation <span className="text-[#ff581b] font-title">Guidelines</span>
//             </h2>
//             <p className="text-[#555555] text-lg">
//               Clear, fair, and transparent policies to protect both customers and restaurant partners.
//             </p>
//           </div>

//           <div className="space-y-6">
//             {sections.map((section, idx) => (
//               <div 
//                 key={section.id}
//                 className="policy-block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#ff581b]/30 transition-all duration-300 hover:shadow-xl"
//                 data-aos="fade-up"
//                 data-aos-delay={idx * 50}
//               >
//                 <div className="policy-block-bar h-1 w-full bg-[#ff581b]" />
//                 <div className="p-6 md:p-8">
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="w-12 h-12 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 flex items-center justify-center text-[#ff581b] text-xl flex-shrink-0">
//                       <i className={`${section.icon} text-lg`}></i>
//                     </div>
//                     <div>
//                       <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">
//                         Section {String(section.id).padStart(2, '0')}
//                       </div>
//                       <h3 className="text-xl md:text-2xl font-black text-[#121212]">
//                         {section.title}
//                       </h3>
//                     </div>
//                   </div>
//                   <div className="policy-divider h-px bg-gradient-to-r from-[#ff581b]/30 to-transparent my-4" />
//                   <div className="space-y-4">
//                     {section.content.map((item, itemIdx) => {
//                       if (item.type === 'sub') {
//                         return (
//                           <h4 key={itemIdx} className="text-lg font-bold text-[#121212] mt-4 first:mt-0">
//                             {item.text}
//                           </h4>
//                         );
//                       } else if (item.type === 'desc') {
//                         return (
//                           <p key={itemIdx} className="text-[#555555] leading-relaxed">
//                             {item.text}
//                           </p>
//                         );
//                       } else if (item.type === 'list') {
//                         return (
//                           <ul key={itemIdx} className="space-y-2 ml-6">
//                             {item.items.map((listItem, listIdx) => (
//                               <li key={listIdx} className="flex items-start gap-2 text-[#555555]">
//                                 <span className="text-[#ff581b] mt-1.5">•</span>
//                                 <span>{listItem}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         );
//                       } else if (item.type === 'table') {
//                         return (
//                           <div key={itemIdx} className="overflow-x-auto mt-4">
//                             <table className="w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-[#f8f8f8]">
//                                   {item.headers.map((header, hidx) => (
//                                     <th key={hidx} className="text-left p-3 font-bold text-[#121212] border border-gray-200">
//                                       {header}
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {item.rows.map((row, ridx) => (
//                                   <tr key={ridx} className="hover:bg-[#f8f8f8]">
//                                     {row.map((cell, cidx) => (
//                                       <td key={cidx} className="p-3 text-[#555555] border border-gray-200">
//                                         {cell}
//                                       </td>
//                                     ))}
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
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

//       {/* Contact Section */}
//       <section className="contact-policy-section py-20 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Need Help?
//             </div>
//             <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-6">
//               Have Questions About <span className="text-[#ff581b] font-title">Refunds?</span>
//             </h2>
//             <p className="text-[#555555] text-lg mb-8">
//               For any refund-related support, please reach out to our customer support team.
//             </p>
//             <div className="grid md:grid-cols-3 gap-6 mt-8">
//               <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="0">
//                 <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-bold text-[#121212] mb-2">Email Support</h3>
//                 <p className="text-[#555555] text-sm">support@foodside.in</p>
//               </div>
//               <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="100">
//                 <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-bold text-[#121212] mb-2">Phone Support</h3>
//                 <p className="text-[#555555] text-sm">+91-86880 43861</p>
//                 <p className="text-[#555555] text-sm text-xs mt-1">9:00 AM – 10:00 PM</p>
//               </div>
//               <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="200">
//                 <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-bold text-[#121212] mb-2">In-App Support</h3>
//                 <p className="text-[#555555] text-sm">Order Help Section</p>
//                 <p className="text-[#555555] text-sm">WhatsApp Support</p>
//               </div>
//             </div>
//             <div className="mt-10">
//               <a 
//                 href="/contact_us" 
//                 className="btn-default bg-[#ff581b] text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#e04e12] transition-all"
//               >
//                 Report an Issue
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
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
        
//         @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Yesteryear&display=swap');
        
//         .refund-policy-page {
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
        
//         .policy-block-bar {
//           width: 0;
//           transition: width 0.4s ease;
//         }
        
//         .policy-block:hover .policy-block-bar {
//           width: 100%;
//         }
        
//         table {
//           border-radius: 12px;
//           overflow: hidden;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default RefundPolicies;



"use client";
import React, { useEffect, useState, useRef } from "react";

const RefundPolicies = () => {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef({});

  const sections = [
    {
      id: 1,
      number: "01",
      title: "Order Cancellation Policy",
      description: "1.1 Cancellation Before Restaurant Confirmation\nCustomers may cancel the order before the restaurant accepts or starts preparing the order. Full refund will be provided. Refund will be processed to the original payment method.\n\n1.2 Cancellation After Restaurant Confirmation\nOnce the restaurant begins preparing the order: Cancellation may not be allowed. Partial cancellation charges or full cancellation charges may apply. Refund eligibility depends on preparation status and delivery assignment.\n\n1.3 Cancellation Due to Delivery Delay\nIf the delivery is excessively delayed due to restaurant or delivery partner issues, customers may request cancellation and compensation subject to review."
    },
    {
      id: 2,
      number: "02",
      title: "Eligible Refund Situations",
      description: "Refunds or replacements may be approved in the following cases:\n\n• Order not delivered\n• Wrong item delivered\n• Missing items\n• Damaged or spilled food\n• Spoiled or unsafe food\n• Incorrect customization\n• Duplicate payment deduction\n• Restaurant unable to fulfill the order\n• Order marked delivered but not received\n\nCustomers may be required to provide: Photos/videos of the issue, Order details, Packaging images where applicable"
    },
    {
      id: 3,
      number: "03",
      title: "Partial Refunds",
      description: "Partial refunds may be provided when:\n\n• Only specific items are missing\n• One or more items are incorrect\n• Quality issues affect only part of the order\n\nThe refund amount will be limited to the affected items only."
    },
    {
      id: 4,
      number: "04",
      title: "Non-Refundable Situations",
      description: "Refunds will generally NOT be provided in the following situations:\n\n• Change of mind after order confirmation\n• Incorrect address provided by customer\n• Customer unavailable at delivery location\n• Minor delays caused by traffic, weather, or external conditions\n• Taste preferences or personal dislike\n• Orders refused at the time of delivery\n• Failure to answer delivery calls/messages"
    },
    {
      id: 5,
      number: "05",
      title: "Failed Payments",
      description: "If payment is deducted but the order is not successfully placed:\n\n• The amount will usually be auto-reversed by the bank/payment gateway.\n• Processing time may take 5–7 business days depending on the bank.\n• If refund is not received within the expected timeline, customers may contact support."
    },
    {
      id: 6,
      number: "06",
      title: "Refund Processing Timeline",
      description: "Payment Method: UPI — Expected Refund Time: 2–5 Business Days\nPayment Method: Debit/Credit Card — Expected Refund Time: 5–7 Business Days\nPayment Method: Net Banking — Expected Refund Time: 3–7 Business Days\nPayment Method: COD Orders — Expected Refund Time: Bank Transfer (if applicable)\n\nActual timelines may vary based on banking partners."
    },
    {
      id: 7,
      number: "07",
      title: "Reporting an Issue",
      description: "Customers must report issues within:\n\n• 24 hours for food delivery complaints\n• Immediately upon delivery for missing or incorrect items where possible\n\nIssues can be reported through:\n\n• In-app Support\n• Order Help Section\n• Customer Care Email\n• WhatsApp Support"
    },
    {
      id: 8,
      number: "08",
      title: "Fraud Prevention",
      description: "Bollineni Ventures reserves the right to:\n\n• Reject fraudulent refund claims\n• Suspend accounts involved in abuse or repeated false complaints\n• Verify complaints using order history, GPS logs, call records, and submitted evidence"
    },
    {
      id: 9,
      number: "09",
      title: "Force Majeure",
      description: "Refunds may not be guaranteed during events beyond reasonable control, including:\n\n• Natural disasters\n• Government restrictions\n• Severe weather conditions\n• Internet/payment gateway failures\n• Public emergencies"
    }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
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
  }, [activeSection, sections]);

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

  // Helper function to format description with line breaks and bullet points
  const formatDescription = (text) => {
    const lines = text.split('\n');
    const formattedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        formattedLines.push(<div key={i} className="h-2"></div>);
      } else if (line.startsWith('•')) {
        formattedLines.push(
          <div key={i} className="flex items-start gap-2 mt-2">
            <span className="text-[#ff581b] mt-1">•</span>
            <span className="text-gray-600">{line.substring(1).trim()}</span>
          </div>
        );
      } else if (line.match(/^\d+\.\d/)) {
        // Handle numbered subsections like "1.1"
        formattedLines.push(
          <h4 key={i} className="font-bold text-[#121212] text-base mt-4 first:mt-0">
            {line}
          </h4>
        );
      } else if (line.startsWith('Payment Method:')) {
        // Handle table-like data as formatted text
        formattedLines.push(
          <div key={i} className="text-gray-600 mt-2">
            {line}
          </div>
        );
      } else {
        formattedLines.push(
          <p key={i} className="text-gray-600 leading-relaxed mt-2">
            {line}
          </p>
        );
      }
    }
    
    return formattedLines;
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[380px] bg-[#0a0a0a] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=500&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <div className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Refund & Cancellation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Food Side
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              Our <strong className="text-[#ff581b]">Commitment</strong> to Fairness
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
                At <strong className="text-[#ff581b]">Bollineni Ventures</strong>, customer satisfaction is our priority. 
                This Refund & Cancellation Policy explains the conditions under which cancellations, refunds, 
                replacements, or compensation may be provided for orders placed through the Food Side App.
              </p>
              <p className="text-gray-400 text-sm mt-3 italic">
                Due to the perishable nature of food products, refunds are evaluated carefully and may vary depending on the issue reported.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8" data-aos="fade-up" data-aos-delay="200">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          <strong className="text-[#121212]">Food Side</strong> App by
          <strong className="text-[#ff581b]"> Bollineni Ventures</strong> — Effective Date: June 2026
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
                    All Policies
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {sections.length} refund guidelines
                </p>
              </div>
              <nav className="p-3 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {sections.map((section) => (
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

          {/* Right Content - Refund Policies Document */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id.toString()}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className={`scroll-mt-24 p-6 md:p-8 ${index !== sections.length - 1 ? "border-b border-gray-100" : ""}`}
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
                    Clear, fair, and transparent policies to protect both customers and restaurant partners.
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
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Need Help?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
              Have Questions About{" "}
              <span className="text-[#ff581b]">Refunds?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              For any refund-related support, please reach out to our customer support team.
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
                Email Support
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
              <h3 className="font-bold text-[#121212] text-lg mb-2">Phone Support</h3>
              <a
                href="tel:+918688043861"
                className="text-[#ff581b] hover:underline"
              >
                +91 86880 43861
              </a>
              <p className="text-gray-400 text-sm mt-1">Mon-Sat: 9AM - 7PM</p>
            </div>

            {/* In-App Support Card */}
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
                In-App Support
              </h3>
              <p className="text-gray-600 text-sm">Order Help Section</p>
              <p className="text-gray-500 text-sm mt-1">WhatsApp Support</p>
            </div>
          </div>

          {/* Grievance Officer Note */}
          <div
            className="mt-8 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            
          </div>

          {/* Report Issue Button */}
          <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="300">
            <a
              href="/contact_us"
              className="inline-flex items-center gap-2 bg-[#ff581b] text-white rounded-full py-3 px-8 hover:bg-[#e04e12] transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Report an Issue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
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

export default RefundPolicies;