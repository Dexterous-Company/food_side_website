"use client";
import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
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

  const policies = [
    {
      id: 1,
      title: "Customer Service Policy",
      icon: "fa-regular fa-headset",
      description: "Food Side is committed to providing reliable and timely customer support. Customer queries and complaints will be addressed through official support channels within reasonable timelines.",
      color: "orange"
    },
    {
      id: 2,
      title: "Refund and Cancellation Policy",
      icon: "fa-regular fa-credit-card",
      description: "Refunds will only be processed in cases of failed transactions, cancelled orders, duplicate payments, or valid customer complaints approved by the Company. Orders may not be cancelled once preparation begins.",
      color: "dark"
    },
    {
      id: 3,
      title: "Delivery Policy",
      icon: "fa-regular fa-truck",
      description: "Delivery partners must ensure timely and safe delivery of orders. Estimated delivery timelines may vary due to traffic, weather, or operational issues.",
      color: "light"
    },
    {
      id: 4,
      title: "Vendor Partnership Policy",
      icon: "fa-regular fa-handshake",
      description: "All restaurant and vendor partners must comply with food safety regulations, hygiene standards, and legal licensing requirements applicable under Indian law.",
      color: "orange"
    },
    {
      id: 5,
      title: "Privacy and Data Protection Policy",
      icon: "fa-regular fa-shield-halved",
      description: "Food Side collects and stores user data solely for operational and service purposes. User information will not be sold or misused and will be protected using appropriate security measures.",
      color: "dark"
    },
    {
      id: 6,
      title: "Employee Conduct Policy",
      icon: "fa-regular fa-users",
      description: "Employees and representatives of Bollineni Ventures are expected to maintain professionalism, integrity, and ethical conduct while representing the Company.",
      color: "light"
    },
    {
      id: 7,
      title: "Anti-Fraud Policy",
      icon: "fa-regular fa-shield",
      description: "Any fraudulent activities, fake orders, payment manipulation, or misuse of promotional offers may result in suspension or permanent termination of accounts.",
      color: "orange"
    },
    {
      id: 8,
      title: "Payment Policy",
      icon: "fa-regular fa-wallet",
      description: "Payments may be accepted through UPI, net banking, debit cards, credit cards, wallets, and cash on delivery where applicable.",
      color: "dark"
    },
    {
      id: 9,
      title: "Food Safety Policy",
      icon: "fa-regular fa-apple",
      description: "Food quality and hygiene are monitored through vendor compliance standards. Vendors are responsible for maintaining food safety certifications and proper handling procedures.",
      color: "light"
    },
    {
      id: 10,
      title: "Platform Usage Policy",
      icon: "fa-regular fa-mobile-screen",
      description: "Users shall not misuse the application, attempt unauthorized access, upload harmful content, or interfere with platform operations.",
      color: "orange"
    },
    {
      id: 11,
      title: "Promotional and Offer Policy",
      icon: "fa-regular fa-tag",
      description: "Discounts, promotional codes, and offers are subject to validity periods and specific terms decided by the Company.",
      color: "dark"
    },
    {
      id: 12,
      title: "Intellectual Property Policy",
      icon: "fa-regular fa-copyright",
      description: "All logos, branding, designs, software, and platform content associated with Food Side are owned by Bollineni Ventures and protected by applicable intellectual property laws.",
      color: "light"
    },
    {
      id: 13,
      title: "Compliance Policy",
      icon: "fa-regular fa-file-lines",
      description: "Food Side and its partners shall comply with all applicable Indian laws, food regulations, taxation laws, and digital payment regulations.",
      color: "orange"
    },
    {
      id: 14,
      title: "Modification Policy",
      icon: "fa-regular fa-pen-to-square",
      description: "Bollineni Ventures reserves the right to modify company policies at any time based on operational, legal, or regulatory requirements.",
      color: "dark"
    },
    {
      id: 15,
      title: "Contact and Grievance Policy",
      icon: "fa-regular fa-envelope",
      description: "Users, vendors, and partners may contact Food Side through official communication channels for support, grievances, or legal matters.",
      color: "light"
    }
  ];

  return (
    <main className="policies-page bg-white overflow-hidden">
      {/* Page Banner */}
      <section className="page-banner relative h-[300px] md:h-[350px] bg-[#121212] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=400&fit=crop')" }} />
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Company Policies
            </div>
            <h2 className="section-heading text-4xl md:text-5xl font-black text-white mb-4" data-aos="fade-up" data-aos-delay="100">
              Our <span className="text-[#ff581b] font-title">Commitment</span> to You
            </h2>
            <p className="text-white/70 text-base md:text-lg" data-aos="fade-up" data-aos-delay="200">
              Owned and Operated by Bollineni Ventures — These policies outline our operational standards, customer commitments, and platform guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section py-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="policy-intro bg-[#121212] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-[#ff581b]/20" data-aos="fade-up">
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-[#ff581b]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full bg-[#ff581b]/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-2xl flex-shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-xl md:text-2xl font-black mb-2">Policies Overview – Food Side App</div>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  Owned and Operated by <strong className="text-[#ff581b]">Bollineni Ventures</strong>. This document outlines the operational, customer, employee, and platform policies of Food Side, a food delivery and ordering platform operated by Bollineni Ventures.
                </p>
                <p className="text-white/40 text-xs mt-3 italic">
                  These policies are effective immediately and apply to all users, vendors, employees, and partners associated with Food Side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Grid Section */}
      <section className="policies-grid-section py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Policies
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#121212] mb-6">
              Company <span className="text-[#ff581b] font-title">Guidelines</span>
            </h2>
            <p className="text-[#555555] text-lg">
              These policies ensure transparency, safety, and reliability for all Food Side stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, idx) => (
              <div 
                key={policy.id}
                className={`policy-card rounded-2xl overflow-hidden border transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl ${
                  policy.color === 'orange' ? 'bg-[#ff581b] border-transparent hover:shadow-[#ff581b]/30' :
                  policy.color === 'dark' ? 'bg-[#121212] border-white/10 hover:border-[#ff581b]/30' :
                  'bg-white border-gray-200 hover:border-[#ff581b]/30'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <div className="policy-block-bar h-1 w-full bg-[#ff581b] rounded-t-2xl" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      policy.color === 'orange' ? 'bg-white/20 text-white' :
                      policy.color === 'dark' ? 'bg-[#ff581b]/15 text-[#ff581b] border border-[#ff581b]/20' :
                      'bg-[#ff581b]/10 text-[#ff581b] border border-[#ff581b]/20'
                    }`}>
                      <i className={`${policy.icon} text-lg`}></i>
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        policy.color === 'orange' ? 'text-white/70' : 'text-[#ff581b]'
                      }`}>
                        Policy {String(policy.id).padStart(2, '0')}
                      </div>
                      <h3 className={`text-xl font-black ${
                        policy.color === 'orange' ? 'text-white' : 'text-[#121212]'
                      }`}>
                        {policy.title}
                      </h3>
                    </div>
                  </div>
                  <div className="policy-divider h-px bg-gradient-to-r from-[#ff581b]/30 to-transparent my-4" />
                  <p className={`text-sm leading-relaxed ${
                    policy.color === 'orange' ? 'text-white/80' : 
                    policy.color === 'dark' ? 'text-white/60' : 'text-[#555555]'
                  }`}>
                    {policy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-policy-section py-20 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Need Help?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-6">
              Have Questions About Our <span className="text-[#ff581b] font-title">Policies?</span>
            </h2>
            <p className="text-[#555555] text-lg mb-8">
              For any questions, grievances, or legal matters, please reach out to our support team.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="0">
                <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[#121212] mb-2">Email Us</h3>
                <p className="text-[#555555] text-sm">info@foodside.co.in</p>
                <p className="text-[#555555] text-sm">admin@foodside.co.in</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="100">
                <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[#121212] mb-2">Call Us</h3>
                <p className="text-[#555555] text-sm">+91 86880 43861</p>
                <p className="text-[#555555] text-sm">Mon-Sat: 9AM - 7PM</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="200">
                <div className="w-14 h-14 rounded-full bg-[#ff581b]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[#121212] mb-2">Visit Us</h3>
                <p className="text-[#555555] text-sm">Chittepalli Village</p>
                <p className="text-[#555555] text-sm">Podalakur Mandal, Nellore, AP - 524345</p>
              </div>
            </div>
            <div className="mt-10">
              <a 
                href="/contact_us" 
                className="btn-default bg-[#ff581b] text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#e04e12] transition-all"
              >
                Contact Support
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Yesteryear&display=swap');
        
        .policies-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-heading {
          font-family: 'Raleway', sans-serif;
        }
        .font-title {
          font-family: 'Yesteryear', cursive;
        }
        
        .policy-card {
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease, border-color 0.3s;
        }
        
        .policy-block-bar {
          width: 0;
          transition: width 0.4s ease;
        }
        
        .policy-card:hover .policy-block-bar {
          width: 100%;
        }
      `}</style>
    </main>
  );
};

export default PrivacyPolicy;