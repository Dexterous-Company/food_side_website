"use client";
import React, { useEffect, useState, useRef } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('customer-service');
  const sectionRefs = useRef({});

  const policies = [
    { id: "customer-service", number: "01", title: "Customer Service Policy", description: "Food Side is committed to providing reliable and timely customer support. Customer queries and complaints will be addressed through official support channels within reasonable timelines." },
    { id: "refund-cancellation", number: "02", title: "Refund and Cancellation Policy", description: "Refunds will only be processed in cases of failed transactions, cancelled orders, duplicate payments, or valid customer complaints approved by the Company. Orders may not be cancelled once preparation begins." },
    { id: "delivery", number: "03", title: "Delivery Policy", description: "Delivery partners must ensure timely and safe delivery of orders. Estimated delivery timelines may vary due to traffic, weather, or operational issues." },
    { id: "vendor-partnership", number: "04", title: "Vendor Partnership Policy", description: "All restaurant and vendor partners must comply with food safety regulations, hygiene standards, and legal licensing requirements applicable under Indian law." },
    { id: "privacy-data", number: "05", title: "Privacy and Data Protection Policy", description: "Food Side collects and stores user data solely for operational and service purposes. User information will not be sold or misused and will be protected using appropriate security measures." },
    { id: "employee-conduct", number: "06", title: "Employee Conduct Policy", description: "Employees and representatives of Bollineni Ventures are expected to maintain professionalism, integrity, and ethical conduct while representing the Company." },
    { id: "anti-fraud", number: "07", title: "Anti-Fraud Policy", description: "Any fraudulent activities, fake orders, payment manipulation, or misuse of promotional offers may result in suspension or permanent termination of accounts." },
    { id: "payment", number: "08", title: "Payment Policy", description: "Payments may be accepted through UPI, net banking, debit cards, credit cards, wallets, and cash on delivery where applicable." },
    { id: "food-safety", number: "09", title: "Food Safety Policy", description: "Food quality and hygiene are monitored through vendor compliance standards. Vendors are responsible for maintaining food safety certifications and proper handling procedures." },
    { id: "platform-usage", number: "10", title: "Platform Usage Policy", description: "Users shall not misuse the application, attempt unauthorized access, upload harmful content, or interfere with platform operations." },
    { id: "promotional-offer", number: "11", title: "Promotional and Offer Policy", description: "Discounts, promotional codes, and offers are subject to validity periods and specific terms decided by the Company." },
    { id: "intellectual-property", number: "12", title: "Intellectual Property Policy", description: "All logos, branding, designs, software, and platform content associated with Food Side are owned by Bollineni Ventures and protected by applicable intellectual property laws." },
    { id: "compliance", number: "13", title: "Compliance Policy", description: "Food Side and its partners shall comply with all applicable Indian laws, food regulations, taxation laws, and digital payment regulations." },
    { id: "modification", number: "14", title: "Modification Policy", description: "Bollineni Ventures reserves the right to modify company policies at any time based on operational, legal, or regulatory requirements." },
    { id: "contact-grievance", number: "15", title: "Contact and Grievance Policy", description: "Users, vendors, and partners may contact Food Side through official communication channels for support, grievances, or legal matters." }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (const policy of policies) {
        const element = sectionRefs.current[policy.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (activeSection !== policy.id) {
              setActiveSection(policy.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, policies]);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
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
            const delay = entry.target.getAttribute('data-aos-delay') || '0';
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=500&fit=crop')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <div className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Company Policies
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Food Side <span className="text-[#ff581b]">App</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              Owned and Operated by <strong className="text-[#ff581b]">Bollineni Ventures</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Card */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                This document outlines the operational, customer, employee, and platform policies of <strong className="text-[#121212]">Food Side</strong>, a food delivery and ordering platform operated by <strong className="text-[#ff581b]">Bollineni Ventures</strong>.
              </p>
              <p className="text-gray-400 text-sm mt-3 italic">
                These policies are effective immediately and apply to all users, vendors, employees, and partners associated with Food Side.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 md:px-8 max-w-8xl py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Table of Contents */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <h3 className="font-bold text-[#121212] text-lg">All Policies</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">15 company guidelines</p>
              </div>
              <nav className="p-3 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {policies.map((policy) => (
                    <li key={policy.id}>
                      <button
                        onClick={() => scrollToSection(policy.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
                          activeSection === policy.id
                            ? 'bg-[#ff581b]/10 text-[#ff581b] border-l-2 border-[#ff581b]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#ff581b]'
                        }`}
                      >
                        <span className={`text-xs w-7 ${
                          activeSection === policy.id ? 'text-[#ff581b] font-bold' : 'text-gray-400 group-hover:text-[#ff581b]'
                        }`}>
                          {policy.number}
                        </span>
                        <span className="flex-1 truncate">{policy.title}</span>
                        {activeSection === policy.id && (
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Right Content - Policies Document */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {policies.map((policy, index) => (
                <div 
                  key={policy.id}
                  id={policy.id}
                  ref={(el) => { sectionRefs.current[policy.id] = el; }}
                  className={`scroll-mt-24 p-6 md:p-8 ${index !== policies.length - 1 ? 'border-b border-gray-100' : ''}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 30}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#ff581b] font-bold text-sm">{policy.number}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-[#121212] mb-3">
                        {policy.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer Note */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    These policies are effective immediately and apply to all users, vendors, employees, and partners associated with Food Side.
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
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
              Have Questions About Our <span className="text-[#ff581b]">Policies?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              For any questions, grievances, or legal matters, please reach out to our support team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">Email Us</h3>
              <a href="mailto:info@foodside.co.in" className="text-[#ff581b] hover:underline block">info@foodside.co.in</a>
              <a href="mailto:admin@foodside.co.in" className="text-gray-500 text-sm hover:text-[#ff581b] block mt-1">admin@foodside.co.in</a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">Call Us</h3>
              <a href="tel:+918688043861" className="text-[#ff581b] hover:underline">+91 86880 43861</a>
              <p className="text-gray-400 text-sm mt-1">Mon-Sat: 9AM - 7PM</p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">Chittepalli Village</p>
              <p className="text-gray-600 text-sm">Podalakur Mandal</p>
              <p className="text-gray-600 text-sm">Nellore, Andhra Pradesh - 524345</p>
            </div>
          </div>

          {/* Grievance Officer Note */}
          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <svg className="w-4 h-4 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-sm text-gray-600">Grievance Officer: <strong className="text-[#121212]">Mr. Bollineni</strong> | Available Mon-Sat (9 AM - 10 PM)</span>
            </div>
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

export default PrivacyPolicy;