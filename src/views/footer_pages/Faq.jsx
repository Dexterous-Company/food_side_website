"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const FAQPage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRefs = useRef({});

  const faqSections = [
    {
      id: 1,
      number: "01",
      title: "Ordering & Placing Orders",
      questions: [
        {
          q: "How do I place an order on Food Side?",
          a: "Placing an order on Food Side is easy! Simply browse our menu, select your favorite dishes, add them to your cart, proceed to checkout, enter your delivery details, choose your payment method, and confirm your order. You'll receive a confirmation email and SMS with your order details."
        },
        {
          q: "Can I schedule an order for later delivery?",
          a: "Yes! You can schedule your order for later delivery up to 7 days in advance. During checkout, simply select 'Schedule for Later' and choose your preferred date and time slot for delivery."
        },
        {
          q: "How do I modify or cancel my order?",
          a: "You can modify or cancel your order within 5 minutes of placing it. Go to 'My Orders' section, select the order you want to modify, and click on 'Modify Order' or 'Cancel Order'. For any assistance, contact our customer support at +91 8688043861."
        }
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Payments & Billing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept multiple payment methods including: Credit Cards (Visa, MasterCard, Amex), Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), Digital Wallets, and Cash on Delivery (COD) is also available for orders under ₹5000."
        },
        {
          q: "Is it safe to pay online on Food Side?",
          a: "Absolutely! We use industry-standard SSL encryption to protect your payment information. All transactions are processed through secure payment gateways that are PCI-DSS compliant. Your financial data is never stored on our servers."
        },
        {
          q: "How do I apply a coupon or promo code?",
          a: "You can apply a promo code during checkout. Look for the 'Apply Coupon' or 'Promo Code' field, enter your code, and click 'Apply'. The discount will be reflected in your order total immediately. Please note that each code has its own terms and conditions."
        },
        {
          q: "What happens if my payment fails but money is deducted?",
          a: "If payment is deducted but the order is not successfully placed, the amount will usually be auto-reversed by the bank/payment gateway within 5–7 business days. If you don't receive the refund within the expected timeline, please contact our support team."
        }
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Delivery & Tracking",
      questions: [
        {
          q: "How long does delivery take?",
          a: "Standard delivery typically takes 30-45 minutes depending on your location and restaurant preparation time. During peak hours (12 PM - 2 PM and 7 PM - 9 PM), delivery might take 45-60 minutes. You can track your order in real-time through our app or website."
        },
        {
          q: "Do you deliver to my area?",
          a: "We currently deliver to most major cities and suburbs. Simply enter your delivery address on the homepage, and our system will automatically check if we deliver to your location. If we don't deliver to your area yet, we'll notify you when we expand our services!"
        },
        {
          q: "What if my order is delayed?",
          a: "If your order is delayed beyond the estimated delivery time, please contact our customer support. We take delays seriously and will investigate the issue. In case of significant delays (30+ minutes beyond estimate), we may offer a discount on your next order as compensation."
        },
        {
          q: "Can I change my delivery address after placing the order?",
          a: "Address changes may be possible only if the restaurant hasn't started preparing your order. Contact support immediately at +91 8688043861 to request an address change. Additional charges may apply if the new address is outside the delivery zone."
        }
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Returns, Refunds & Cancellations",
      questions: [
        {
          q: "What is your refund and cancellation policy?",
          a: "If you're unsatisfied with your order due to quality issues, incorrect items, or missing items, please contact us within 30 minutes of delivery. We'll investigate and offer either a full refund, replacement, or discount on your next order. Refunds are processed within 5-7 business days."
        },
        {
          q: "How do I report a problem with my order?",
          a: "You can report an issue by going to 'My Orders', selecting the order, and clicking 'Report a Problem'. Alternatively, call our customer support at +91 8688043861 or email us at info@foodside.co.in with your order number and photos of the issue (if applicable)."
        },
        {
          q: "When are refunds NOT provided?",
          a: "Refunds are generally not provided in cases of change of mind after order confirmation, incorrect address provided by customer, customer unavailable at delivery location, minor delays caused by traffic/weather, taste preferences, or orders refused at the time of delivery."
        }
      ]
    },
    {
      id: 5,
      number: "05",
      title: "Account & Profile Management",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on the 'Sign Up' button at the top right corner of our website. Enter your name, email address, phone number, and create a password. You can also sign up using your Google or Facebook account for quicker access."
        },
        {
          q: "How do I reset my password?",
          a: "Click on 'Login' then 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. Click the link in the email and follow the instructions to create a new password. The link expires within 24 hours for security reasons."
        },
        {
          q: "How can I earn rewards or loyalty points?",
          a: "Every time you order, you earn loyalty points! You get 5 points for every ₹100 spent. Points can be redeemed for discounts on future orders. Additionally, refer friends to earn bonus points, and follow us on social media for exclusive promo codes and double-points events!"
        },
        {
          q: "How do I delete my account?",
          a: "To delete your account, go to Profile Settings > Account Management > Delete Account. Please note that this action is irreversible and will remove all your order history, saved addresses, and loyalty points. Contact support if you need assistance."
        }
      ]
    },
    {
      id: 6,
      number: "06",
      title: "Food Quality & Dietary Preferences",
      questions: [
        {
          q: "Are your ingredients fresh and high-quality?",
          a: "Absolutely! We partner with local suppliers and farms to ensure the freshest ingredients. All our dishes are prepared daily with premium quality meats, vegetables, and spices. We never use frozen ingredients for our core menu items. Quality and freshness are our top priorities!"
        },
        {
          q: "Do you have vegetarian and vegan options?",
          a: "Yes, we have a wide range of vegetarian and vegan options clearly marked on our menu with 'Veg' and 'Vegan' labels. We also offer gluten-free and allergen-friendly options. You can filter the menu by dietary preferences to easily find dishes that suit your needs."
        },
        {
          q: "Can I request customizations to my order?",
          a: "Yes! Most restaurants allow customizations like spice level, extra toppings, or removing specific ingredients. Use the 'Special Instructions' box during checkout to add your preferences. However, customizations depend on the restaurant's policy."
        }
      ]
    },
    {
      id: 7,
      number: "07",
      title: "Catering & Bulk Orders",
      questions: [
        {
          q: "Do you offer catering services for events?",
          a: "Yes! Food Side offers premium catering services for weddings, corporate events, parties, and private gatherings. Contact our catering team at +91 8688043861 or email catering@foodside.co.in for a customized menu and quote based on your event size and preferences."
        },
        {
          q: "How far in advance should I book catering?",
          a: "We recommend booking catering at least 7-14 days in advance for small events and 3-4 weeks for large events. Last-minute catering may be available subject to chef availability and kitchen capacity."
        }
      ]
    },
    {
      id: 8,
      number: "08",
      title: "Technical Issues & App Support",
      questions: [
        {
          q: "The app is not loading or crashing. What should I do?",
          a: "Try these steps: 1) Clear app cache and data, 2) Update to the latest version, 3) Restart your device, 4) Check your internet connection. If the issue persists, uninstall and reinstall the app. Contact support if you still face issues."
        },
        {
          q: "I'm not receiving order confirmation emails/SMS. Why?",
          a: "Check your spam/junk folder first. Ensure your email and phone number are correct in your profile. Add info@foodside.co.in to your contacts. If still not receiving, contact support to verify your contact details."
        }
      ]
    },
    {
      id: 9,
      number: "09",
      title: "Business & Partnership",
      questions: [
        {
          q: "How can I become a restaurant partner?",
          a: "We're always looking for great restaurant partners! Visit our website and click on 'Become a Partner' or email partnership@foodside.co.in. Our team will reach out with details about onboarding, commission structure, and requirements."
        },
        {
          q: "How can I become a delivery partner?",
          a: "Join our delivery fleet! Download the 'Food Side Delivery Partner' app, complete the registration process, submit required documents (license, insurance, Aadhar), and attend a brief orientation. Flexible hours and competitive earnings await!"
        }
      ]
    }
  ];

  // Flatten questions for search functionality
  const getAllQuestions = () => {
    const flatList = [];
    faqSections.forEach((section, sectionIdx) => {
      section.questions.forEach((qItem, qIdx) => {
        flatList.push({
          id: `${section.id}-${qIdx}`,
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          question: qItem.q,
          answer: qItem.a
        });
      });
    });
    return flatList;
  };

  const allQuestions = getAllQuestions();

  // Filtered questions based on search
  const filteredQuestions = searchTerm.trim() === "" 
    ? allQuestions 
    : allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Group filtered questions by section
  const getGroupedFilteredQuestions = () => {
    const grouped = {};
    filteredQuestions.forEach(q => {
      if (!grouped[q.sectionId]) {
        grouped[q.sectionId] = {
          sectionNumber: q.sectionNumber,
          sectionTitle: q.sectionTitle,
          questions: []
        };
      }
      grouped[q.sectionId].questions.push(q);
    });
    return grouped;
  };

  const groupedFilteredQuestions = getGroupedFilteredQuestions();

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of faqSections) {
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
  }, [activeSection, faqSections]);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // State for expanded FAQs within each section
  const [expandedFAQs, setExpandedFAQs] = useState({});

  const toggleFAQ = (sectionId, questionId) => {
    const key = `${sectionId}-${questionId}`;
    setExpandedFAQs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isFAQExpanded = (sectionId, questionId) => {
    return expandedFAQs[`${sectionId}-${questionId}`] || false;
  };

  // Helper to format answer text with proper styling
  const formatAnswer = (text) => {
    return text;
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[380px] bg-[#0a0a0a] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1920&h=500&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <div className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Knowledge Base
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Frequently Asked
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              Find answers to common questions about <strong className="text-[#ff581b]">ordering, payments, delivery</strong> and more
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Welcome to the <strong className="text-[#ff581b]">Food Side FAQ Center</strong>. 
                Here you'll find answers to the most common questions about our service. 
                If you can't find what you're looking for, our support team is always ready to help.
              </p>
              <p className="text-gray-400 text-sm mt-3 italic">
                Browse by category or use the search bar to find specific answers quickly.
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
                    FAQ Categories
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {faqSections.length} main categories
                </p>
              </div>
              <nav className="p-3 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {faqSections.map((section) => (
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

          {/* Right Content - FAQ Sections */}
          <div className="flex-1 min-w-0">
            {searchTerm === "" ? (
              // Show all sections when no search
              <div className="space-y-6">
                {faqSections.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    id={section.id.toString()}
                    ref={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                    className="scroll-mt-24 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={sectionIndex * 50}
                  >
                    <div className="p-6 md:p-8 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ff581b] font-bold text-sm">
                            {section.number}
                          </span>
                        </div>
                        <div>
                          <h2 className=" md:text-2xl text-md font-bold text-[#121212]">
                            {section.title}
                          </h2>
                          <p className="text-gray-500 text-sm mt-1">
                            {section.questions.length} questions
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {section.questions.map((item, qIndex) => (
                        <div key={qIndex} className="p-6 md:p-8">
                          <button
                            onClick={() => toggleFAQ(section.id, qIndex)}
                            className="w-full text-left flex justify-between items-center gap-4 group"
                          >
                            <span className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-[#ff581b] transition-colors pr-4">
                              {item.q}
                            </span>
                            <span className="text-[#ff581b] flex-shrink-0">
                              {isFAQExpanded(section.id, qIndex) ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                            </span>
                          </button>
                          {isFAQExpanded(section.id, qIndex) && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">
                                {formatAnswer(item.a)}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show filtered results
              <div className="space-y-6">
                {Object.entries(groupedFilteredQuestions).map(([sectionId, sectionData], idx) => (
                  <div
                    key={sectionId}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                  >
                    <div className="p-6 md:p-8 bg-gradient-to-r from-[#ff581b]/5 to-transparent border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#ff581b]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ff581b] font-bold text-sm">
                            {sectionData.sectionNumber}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-[#121212]">
                            {sectionData.sectionTitle}
                          </h2>
                          <p className="text-gray-500 text-sm mt-1">
                            {sectionData.questions.length} matching {sectionData.questions.length === 1 ? "result" : "results"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {sectionData.questions.map((item, qIndex) => (
                        <div key={qIndex} className="p-6 md:p-8">
                          <button
                            onClick={() => toggleFAQ(parseInt(sectionId), qIndex)}
                            className="w-full text-left flex justify-between items-center gap-4 group"
                          >
                            <span className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-[#ff581b] transition-colors pr-4">
                              {item.question}
                            </span>
                            <span className="text-[#ff581b] flex-shrink-0">
                              {isFAQExpanded(parseInt(sectionId), qIndex) ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                            </span>
                          </button>
                          {isFAQExpanded(parseInt(sectionId), qIndex) && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">
                                {formatAnswer(item.answer)}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredQuestions.length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 text-lg">No questions found matching "{searchTerm}"</p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 text-[#ff581b] hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Still Have Questions Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" /> Still Need Help?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-4">
              Can't Find Your{" "}
              <span className="text-[#ff581b]">Answer?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions
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

            {/* Live Chat Card */}
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#121212] text-lg mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 text-sm">Available 24/7</p>
              <button className="text-[#ff581b] hover:underline mt-2">
                Start Live Chat
              </button>
            </div>
          </div>

          {/* Report Issue Button */}
          <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="200">
            <Link
              href="/contact_us"
              className="inline-flex items-center gap-2 bg-[#ff581b] text-white rounded-full py-3 px-8 hover:bg-[#e04e12] transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Contact Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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

export default FAQPage;