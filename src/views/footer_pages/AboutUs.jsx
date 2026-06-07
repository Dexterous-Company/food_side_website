// "use client";
// import Link from 'next/link';
// import React, { useEffect, useRef, useState } from 'react';

// const Counter = ({ target, suffix = '', duration = 2000 }) => {
//   const [count, setCount] = useState(0);
//   const counterRef = useRef(null);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !hasAnimated) {
//           setHasAnimated(true);
//           let start = 0;
//           const step = target / (duration / 16);
//           const timer = setInterval(() => {
//             start += step;
//             if (start >= target) {
//               setCount(target);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 16);
//           return () => clearInterval(timer);
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (counterRef.current) observer.observe(counterRef.current);
//     return () => observer.disconnect();
//   }, [target, duration, hasAnimated]);

//   return (
//     <span ref={counterRef} className="font-heading text-5xl md:text-7xl font-black text-white leading-none">
//       {count}{suffix}
//     </span>
//   );
// };

// const AboutUs = () => {
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

//   const tickerItems = [
//     "Highway Food Delivery", "50+ Highway Partners", "5000+ Meals Delivered", 
//     "24/7 Support", "Fresh & Hygienic", "Real-time Tracking", "PAN India Network", "Trusted by Travelers"
//   ];

//   return (
//     <main className="about-us-page bg-white overflow-hidden">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-end overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop" 
//             alt="Highway Food Delivery"
//             className="w-full h-full object-cover animate-bgIn"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
//         </div>
        
//         <div className="container relative z-20 w-full mx-auto px-4 md:px-8 pb-20 md:pb-28">
//           <div 
//             className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4 opacity-0 translate-y-5"
//             data-aos="fade-up"
//             data-aos-delay="100"
//           >
//             <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" />
//             Bollineni Ventures
//           </div>
//           <h1 
//             className="text-white text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8 opacity-0 translate-y-5"
//             data-aos="fade-up"
//             data-aos-delay="180"
//           >
//             <em className="not-italic text-transparent [-webkit-text-stroke:1px_white]">Powering</em><br />
//             <span className="text-[#ff581b] font-title">FoodSide.</span>
//           </h1>
//           <div 
//             className="flex flex-col md:flex-row justify-between gap-8 opacity-0 translate-y-5"
//             data-aos="fade-up"
//             data-aos-delay="260"
//           >
//             <p className="text-white/70 max-w-lg text-base md:text-lg leading-relaxed">
//               Redefining highway food delivery — connecting travelers with trusted restaurants along major highways, making quality meals accessible wherever the journey takes them.
//             </p>
//             <div className="flex gap-4 flex-wrap">
//               <a 
//                 href="#story" 
//                 className="bg-[#ff581b] text-white rounded-full py-4 px-8 relative overflow-hidden group inline-flex items-center gap-2 transition-all hover:bg-[#ff581b]/90"
//               >
//                 Our Story
//                 <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//               <a 
//                 href="#values" 
//                 className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full py-4 px-8 hover:bg-[#ff581b] hover:border-[#ff581b] transition-all inline-flex items-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 Our Values
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Hint */}
//         <div 
//           className="absolute bottom-20 right-8 md:right-16 z-20 flex flex-col items-center gap-2 opacity-0"
//           data-aos="fade-up"
//           data-aos-delay="450"
//         >
//           <div className="w-px h-12 bg-white/20 rounded-full overflow-hidden">
//             <div className="w-full h-2/5 bg-[#ff581b] animate-scroll" />
//           </div>
//           <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Scroll</span>
//         </div>
//       </section>

//       {/* Ticker */}
//       <div className="bg-[#ff581b] py-3 overflow-hidden">
//         <div className="flex gap-12 animate-ticker w-max">
//           {[...Array(2)].map((_, i) => (
//             <div key={i} className="flex gap-12">
//               {tickerItems.map((text) => (
//                 <span key={text} className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-12">
//                   {text}
//                   <span className="text-black">✦</span>
//                 </span>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Story Section - About Bollineni Ventures & FoodSide */}
//       <section id="story" className="py-24 md:py-32 relative overflow-hidden bg-[#121212]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="grid md:grid-cols-2 border border-white/10 rounded-3xl overflow-hidden bg-[#121212]">
//             <div className="p-8 md:p-16 bg-white/5 border-r border-white/10 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
//                   <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> About Us
//                 </div>
//                 <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-aos="fade-up" data-aos-delay="100">
//                   Bollineni Ventures<br /><span className="text-[#ff581b] font-title">Powering FoodSide</span>
//                 </h2>
//                 <p className="text-white/80 mb-6 text-base md:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="150">
//                   <strong>Bollineni Ventures</strong> is a technology-driven company committed to transforming the travel experience through innovative digital solutions. As the creator of <strong className="text-[#ff581b]">FoodSide</strong>, our flagship highway food delivery platform, we connect travelers with trusted restaurants and food partners along major highways, making quality meals accessible wherever the journey takes them.
//                 </p>
//                 <p className="text-white/70 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
//                   What started as a vision to solve a common traveler's pain point has grown into a reliable network of highway food partners across the country. We believe that no journey should be compromised by hunger or lack of food choices.
//                 </p>
//               </div>
//               <div className="border-l-4 border-[#ff581b] pl-6 mt-4" data-aos="zoom-in" data-aos-delay="250">
//                 <div className="text-white text-lg md:text-xl italic font-bold mb-2">
//                   "Transforming highway travel through seamless food delivery — one meal at a time."
//                 </div>
//                 <div className="text-white/40 text-xs uppercase tracking-wider">
//                   — <span className="text-[#ff581b]">Bollineni Ventures</span> Team
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <div className="relative h-64 md:h-[385px] overflow-hidden border-b border-white/5 group">
//                 <img 
//                   src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop" 
//                   alt="Highway Restaurant" 
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <span className="absolute bottom-4 left-4 z-10 text-white text-xs font-bold uppercase tracking-wider bg-[#ff581b] px-3 py-1.5 rounded-full">
//                   Highway Food Partners
//                 </span>
//               </div>
//               <div className="relative h-64 md:h-[385px] overflow-hidden group">
//                 <img 
//                   src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop" 
//                   alt="Food Delivery" 
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <span className="absolute bottom-4 left-4 z-10 text-white text-xs font-bold uppercase tracking-wider bg-[#ff581b] px-3 py-1.5 rounded-full">
//                   Real-time Tracking
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision Section */}
//       <section className="py-20 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100" data-aos="fade-right">
//               <div className="w-16 h-16 rounded-xl bg-[#ff581b]/10 flex items-center justify-center mb-6">
//                 <svg className="w-8 h-8 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl md:text-3xl font-black text-[#121212] mb-4">Our Mission</h3>
//               <p className="text-[#555555] text-lg leading-relaxed">
//                 To make highway travel more convenient and enjoyable by providing seamless access to fresh, safe, and delicious food through a reliable technology platform.
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100" data-aos="fade-left" data-aos-delay="100">
//               <div className="w-16 h-16 rounded-xl bg-[#ff581b]/10 flex items-center justify-center mb-6">
//                 <svg className="w-8 h-8 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl md:text-3xl font-black text-[#121212] mb-4">Our Vision</h3>
//               <p className="text-[#555555] text-lg leading-relaxed">
//                 To become the most trusted and widely used highway food delivery network, enhancing travel experiences while empowering local restaurants and food businesses.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Do Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> What We Do
//             </div>
//             <h2 className="text-3xl md:text-5xl font-black text-[#121212] mb-6">
//               How <span className="text-[#ff581b] font-title">FoodSide</span> Works
//             </h2>
//             <p className="text-[#555555] text-lg">
//               FoodSide enables travelers to discover nearby highway restaurants, place orders in advance, and receive freshly prepared meals at convenient pickup or delivery points along their route.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "🔍",
//                 title: "Discover",
//                 description: "Find verified restaurants and food partners along your highway route with real-time availability."
//               },
//               {
//                 icon: "📱",
//                 title: "Order in Advance",
//                 description: "Place your order before you reach the location and save valuable travel time."
//               },
//               {
//                 icon: "🍔",
//                 title: "Pickup or Delivery",
//                 description: "Receive freshly prepared meals at convenient pickup points or direct delivery on the highway."
//               }
//             ].map((item, idx) => (
//               <div key={idx} className="text-center p-8 rounded-2xl bg-[#f8f8f8] hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
//                 <div className="text-5xl mb-4">{item.icon}</div>
//                 <h3 className="text-xl font-black text-[#121212] mb-3">{item.title}</h3>
//                 <p className="text-[#555555]">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Counters Section */}
//       <div className="bg-[#ff581b] relative z-10">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4">
//             {[
//               { icon: "fa-regular fa-building", target: 50, suffix: "+", label: "Highway Partners" },
//               { icon: "fa-regular fa-utensils", target: 5000, suffix: "+", label: "Meals Delivered" },
//               { icon: "fa-regular fa-road", target: 25, suffix: "+", label: "Highway Corridors" },
//               { icon: "fa-regular fa-star", target: 4.8, suffix: "★", label: "Customer Rating" },
//             ].map((item, idx) => (
//               <div 
//                 key={idx} 
//                 className="text-center py-12 md:py-16 relative border-r border-white/20 last:border-r-0 transition-all hover:bg-black/10"
//                 data-aos="zoom-in"
//                 data-aos-delay={idx * 80}
//               >
//                 <i className={`${item.icon} text-white/30 text-2xl mb-4 block`} />
//                 <Counter target={typeof item.target === 'number' ? item.target : 0} suffix={item.suffix} />
//                 <div className="text-white/60 text-xs font-bold uppercase tracking-wider mt-2">{item.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Values Section */}
//       <section id="values" className="py-24 md:py-32 bg-[#f8f8f8]">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
//             <div>
//               <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-2">
//                 <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Core Values
//               </div>
//               <h2 className="text-3xl md:text-5xl font-black text-[#121212]">
//                 What <span className="text-[#ff581b] font-title">We Stand For</span>
//               </h2>
//             </div>
//             <p className="text-[#555555] max-w-md">
//               These values guide everything we do at Bollineni Ventures — from product development to customer service and partner relationships.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[100px]">
//             {/* Card 1 - Customer First */}
//             <div className="relative col-span-1 md:col-span-4 row-span-4 rounded-2xl overflow-hidden group" data-aos="fade-up">
//               <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" alt="Customer First" className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" />
//               <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                 <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider">Value 01</div>
//                 <div className="text-xl md:text-2xl font-black">Customer First</div>
//                 <div className="text-white/80 text-sm mt-2">Delivering convenience, quality, and satisfaction at every step.</div>
//               </div>
//             </div>

//             {/* Card 2 - Innovation */}
//             <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-[#121212] p-6 flex flex-col justify-center" data-aos="fade-up" data-aos-delay="80">
//               <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-lg mb-4">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </div>
//               <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Value 02</div>
//               <div className="text-xl md:text-2xl font-black text-white mb-2">Innovation</div>
//               <div className="text-white/60 text-sm">Leveraging technology to solve real-world travel challenges.</div>
//             </div>

//             {/* Card 3 - Reliability */}
//             <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-[#ff581b] p-6 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="160">
//               <div className="text-6xl md:text-7xl font-black text-white leading-none">24/7</div>
//               <div className="text-white/70 text-xs font-bold uppercase tracking-wider mt-2">Value 03</div>
//               <div className="text-white/80 text-sm mt-2">Ensuring dependable service for travelers and partners.</div>
//             </div>

//             {/* Card 4 - Quality & Safety */}
//             <div className="col-span-1 md:col-span-3 row-span-2 rounded-2xl bg-white border border-gray-100 p-6" data-aos="fade-up" data-aos-delay="240">
//               <div className="w-11 h-11 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 flex items-center justify-center text-[#ff581b] text-lg mb-4">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">Value 04</div>
//               <div className="text-xl md:text-2xl font-black text-[#121212] mb-2">Quality & Safety</div>
//               <div className="text-[#555555] text-sm">Promoting hygienic and high-quality food experiences.</div>
//             </div>

//             {/* Card 5 - Partnership */}
//             <div className="col-span-1 md:col-span-5 row-span-2 rounded-2xl bg-[#121212] p-6" data-aos="fade-up" data-aos-delay="320">
//               <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-lg mb-4">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Value 05</div>
//               <div className="text-xl md:text-2xl font-black text-white mb-2">Partnership</div>
//               <div className="text-white/60 text-sm">Building strong relationships with restaurants and local businesses.</div>
//             </div>

//             {/* Card 6 - Growth */}
//             <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-white border border-gray-100 p-6" data-aos="fade-up" data-aos-delay="400">
//               <div className="w-11 h-11 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 flex items-center justify-center text-[#ff581b] text-lg mb-4">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                 </svg>
//               </div>
//               <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">Value 06</div>
//               <div className="text-xl md:text-2xl font-black text-[#121212] mb-2">Sustainable Growth</div>
//               <div className="text-[#555555] text-sm">Creating sustainable value for customers, partners, and communities.</div>
//             </div>

//             {/* Card 7 - Commitment Image */}
//             <div className="col-span-1 md:col-span-8 row-span-2 rounded-2xl overflow-hidden relative group" data-aos="fade-up" data-aos-delay="480">
//               <img src="https://images.unsplash.com/photo-1523895665936-7bfe172b757d?w=1200&h=400&fit=crop" alt="Team Commitment" className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" />
//               <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-end p-6 text-white">
//                 <div>
//                   <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider">Our Commitment</div>
//                   <div className="text-xl md:text-2xl font-black">Building a smarter travel ecosystem where great food is always within reach.</div>
//                 </div>
//                 <a href="/contact" className="bg-[#ff581b] text-white rounded-full py-3 px-6 hover:bg-white hover:text-[#ff581b] transition-all inline-flex items-center gap-2 mt-4 md:mt-0">
//                   Partner With Us
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Commitment Statement Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
//               <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Promise
//             </div>
//             <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-6">
//               Committed to <span className="text-[#ff581b]">Transforming</span> Highway Dining
//             </h2>
//             <p className="text-[#555555] text-lg leading-relaxed mb-8">
//               At Bollineni Ventures, we are dedicated to building a smarter travel ecosystem where great food is always within reach. Through continuous innovation and customer-focused solutions, we aim to transform highway dining and make every journey a delicious experience.
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center">
//               <a href="/contact" className="bg-[#ff581b] text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#e04e12] transition-all">
//                 Become a Partner
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//               <Link href="/contact_us" className="bg-transparent border-2 border-[#ff581b] text-[#ff581b] rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#ff581b] hover:text-white transition-all">
//                 Contact Us
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <div className="cta">
//         <div className="grid md:grid-cols-2 min-h-[540px]">
//           <div className="bg-[#ff581b] p-8 md:p-16 relative overflow-hidden flex flex-col justify-center">
//             <div className="relative z-10">
//               <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">Download FoodSide</div>
//               <h2 className="text-white text-4xl md:text-7xl font-black leading-none mb-6">Order Food<br />On The Go.</h2>
//               <p className="text-white/70 text-base max-w-md mb-8">Never let hunger interrupt your journey. Order from highway restaurants with just a few taps.</p>
//               <a href="/app" className="bg-black text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-white hover:text-black transition-all">
//                 Get the App
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <div className="relative overflow-hidden group">
//             <img 
//               src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop" 
//               alt="Highway Food" 
//               className="w-full h-full object-cover brightness-50 transition-transform duration-1000 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 md:p-16">
//               <div className="mb-6" data-aos="zoom-in" data-aos-delay="160">
//                 <div className="text-white text-6xl md:text-8xl font-black leading-none">5000+</div>
//                 <div className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">Happy Customers</div>
//               </div>
//               <div className="w-12 h-0.5 bg-[#ff581b] my-6" />
//               <div data-aos="zoom-in" data-aos-delay="240">
//                 <div className="text-white text-6xl md:text-8xl font-black leading-none">50+</div>
//                 <div className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">Restaurant Partners</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes bgIn {
//           from { transform: scale(1.12); }
//           to { transform: scale(1.04); }
//         }
//         @keyframes scrollAnim {
//           0% { transform: translateY(0); }
//           100% { transform: translateY(250%); }
//         }
//         @keyframes tickerScroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
//         .animate-bgIn { animation: bgIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
//         .animate-scroll { animation: scrollAnim 1.8s ease-in-out infinite; }
//         .animate-ticker { animation: tickerScroll 26s linear infinite; }
        
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
        
//         .about-us-page {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//         }
//         .font-heading {
//           font-family: 'Raleway', sans-serif;
//         }
//         .font-title {
//           font-family: 'Yesteryear', cursive;
//         }
//       `}</style>
//     </main>
//   );
// };

// export default AboutUs;


"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={counterRef} className="font-heading text-5xl md:text-7xl font-black text-white leading-none">
      {count}{suffix}
    </span>
  );
};

const AboutUs = () => {
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

  const tickerItems = [
    "Highway Food Delivery", "50+ Highway Partners", "5000+ Meals Delivered", 
    "24/7 Support", "Fresh & Hygienic", "Real-time Tracking", "PAN India Network", "Trusted by Travelers"
  ];

  return (
    <main className="about-us-page bg-white overflow-hidden">
      {/* Hero Section - Same design as ContactUs page */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-[#0a0a0a] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div 
              className="flex items-center gap-2 text-[#ff581b] text-sm font-semibold uppercase tracking-wider mb-4 opacity-0 translate-y-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="w-8 h-0.5 bg-[#ff581b] rounded-full" />
              Bollineni Ventures
            </div>
            <h1 
              className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 opacity-0 translate-y-5"
              data-aos="fade-up"
              data-aos-delay="180"
            >
              <em className="not-italic text-transparent [-webkit-text-stroke:1px_white]">Powering</em><br />
              <span className="text-[#ff581b] font-title">FoodSide.</span>
            </h1>
            <div 
              className="flex flex-col md:flex-row justify-between gap-8 opacity-0 translate-y-5"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <p className="text-white/80 max-w-lg text-base md:text-lg leading-relaxed">
                Redefining highway food delivery — connecting travelers with trusted restaurants along major highways, making quality meals accessible wherever the journey takes them.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a 
                  href="#story" 
                  className="bg-[#ff581b] text-white rounded-full py-3 px-6 md:py-4 md:px-8 relative overflow-hidden group inline-flex items-center gap-2 transition-all hover:bg-[#ff581b]/90"
                >
                  Our Story
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="#values" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full py-3 px-6 md:py-4 md:px-8 hover:bg-[#ff581b] hover:border-[#ff581b] transition-all inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Our Values
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div 
          className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-2 opacity-0"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <div className="w-px h-12 bg-white/20 rounded-full overflow-hidden">
            <div className="w-full h-2/5 bg-[#ff581b] animate-scroll" />
          </div>
          <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Ticker - Made scrollable for mobile while preserving design */}
      <div className="bg-[#ff581b] py-3 overflow-hidden">
        {/* Desktop: Auto-scrolling ticker / Mobile: Horizontal scrollable */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex gap-12 animate-ticker w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12">
                {tickerItems.map((text) => (
                  <span key={text} className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-12 whitespace-nowrap">
                    {text}
                    <span className="text-black">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Scrollable horizontal bar (user-controlled) */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-12 w-max px-4">
            {tickerItems.map((text) => (
              <span key={text} className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-8 whitespace-nowrap">
                {text}
                <span className="text-black">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section - About Bollineni Ventures & FoodSide */}
      <section id="story" className="py-24 md:py-32 relative overflow-hidden bg-[#121212]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 border border-white/10 rounded-3xl overflow-hidden bg-[#121212]">
            <div className="p-8 md:p-16 bg-white/5 border-r border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-4" data-aos="fade-up">
                  <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> About Us
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-aos="fade-up" data-aos-delay="100">
                  Bollineni Ventures<br /><span className="text-[#ff581b] font-title">Powering FoodSide</span>
                </h2>
                <p className="text-white/80 mb-6 text-base md:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="150">
                  <strong>Bollineni Ventures</strong> is a technology-driven company committed to transforming the travel experience through innovative digital solutions. As the creator of <strong className="text-[#ff581b]">FoodSide</strong>, our flagship highway food delivery platform, we connect travelers with trusted restaurants and food partners along major highways, making quality meals accessible wherever the journey takes them.
                </p>
                <p className="text-white/70 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                  What started as a vision to solve a common traveler's pain point has grown into a reliable network of highway food partners across the country. We believe that no journey should be compromised by hunger or lack of food choices.
                </p>
              </div>
              <div className="border-l-4 border-[#ff581b] pl-6 mt-4" data-aos="zoom-in" data-aos-delay="250">
                <div className="text-white text-lg md:text-xl italic font-bold mb-2">
                  "Transforming highway travel through seamless food delivery — one meal at a time."
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wider">
                  — <span className="text-[#ff581b]">Bollineni Ventures</span> Team
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative h-64 md:h-[385px] overflow-hidden border-b border-white/5 group">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop" 
                  alt="Highway Restaurant" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 z-10 text-white text-xs font-bold uppercase tracking-wider bg-[#ff581b] px-3 py-1.5 rounded-full">
                  Highway Food Partners
                </span>
              </div>
              <div className="relative h-64 md:h-[385px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop" 
                  alt="Food Delivery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 z-10 text-white text-xs font-bold uppercase tracking-wider bg-[#ff581b] px-3 py-1.5 rounded-full">
                  Real-time Tracking
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100" data-aos="fade-right">
              <div className="w-16 h-16 rounded-xl bg-[#ff581b]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#121212] mb-4">Our Mission</h3>
              <p className="text-[#555555] text-lg leading-relaxed">
                To make highway travel more convenient and enjoyable by providing seamless access to fresh, safe, and delicious food through a reliable technology platform.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100" data-aos="fade-left" data-aos-delay="100">
              <div className="w-16 h-16 rounded-xl bg-[#ff581b]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff581b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#121212] mb-4">Our Vision</h3>
              <p className="text-[#555555] text-lg leading-relaxed">
                To become the most trusted and widely used highway food delivery network, enhancing travel experiences while empowering local restaurants and food businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> What We Do
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#121212] mb-6">
              How <span className="text-[#ff581b] font-title">FoodSide</span> Works
            </h2>
            <p className="text-[#555555] text-lg">
              FoodSide enables travelers to discover nearby highway restaurants, place orders in advance, and receive freshly prepared meals at convenient pickup or delivery points along their route.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Discover",
                description: "Find verified restaurants and food partners along your highway route with real-time availability."
              },
              {
                icon: "📱",
                title: "Order in Advance",
                description: "Place your order before you reach the location and save valuable travel time."
              },
              {
                icon: "🍔",
                title: "Pickup or Delivery",
                description: "Receive freshly prepared meals at convenient pickup points or direct delivery on the highway."
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-[#f8f8f8] hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-black text-[#121212] mb-3">{item.title}</h3>
                <p className="text-[#555555]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <div className="bg-[#ff581b] relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: "fa-regular fa-building", target: 50, suffix: "+", label: "Highway Partners" },
              { icon: "fa-regular fa-utensils", target: 5000, suffix: "+", label: "Meals Delivered" },
              { icon: "fa-regular fa-road", target: 25, suffix: "+", label: "Highway Corridors" },
              { icon: "fa-regular fa-star", target: 4.8, suffix: "★", label: "Customer Rating" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="text-center py-12 md:py-16 relative border-r border-white/20 last:border-r-0 transition-all hover:bg-black/10"
                data-aos="zoom-in"
                data-aos-delay={idx * 80}
              >
                <i className={`${item.icon} text-white/30 text-2xl mb-4 block`} />
                <Counter target={typeof item.target === 'number' ? item.target : 0} suffix={item.suffix} />
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section id="values" className="py-24 md:py-32 bg-[#f8f8f8]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-2">
                <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Core Values
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#121212]">
                What <span className="text-[#ff581b] font-title">We Stand For</span>
              </h2>
            </div>
            <p className="text-[#555555] max-w-md">
              These values guide everything we do at Bollineni Ventures — from product development to customer service and partner relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[100px]">
            {/* Card 1 - Customer First */}
            <div className="relative col-span-1 md:col-span-4 row-span-4 rounded-2xl overflow-hidden group" data-aos="fade-up">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" alt="Customer First" className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider">Value 01</div>
                <div className="text-xl md:text-2xl font-black">Customer First</div>
                <div className="text-white/80 text-sm mt-2">Delivering convenience, quality, and satisfaction at every step.</div>
              </div>
            </div>

            {/* Card 2 - Innovation */}
            <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-[#121212] p-6 flex flex-col justify-center" data-aos="fade-up" data-aos-delay="80">
              <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-lg mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Value 02</div>
              <div className="text-xl md:text-2xl font-black text-white mb-2">Innovation</div>
              <div className="text-white/60 text-sm">Leveraging technology to solve real-world travel challenges.</div>
            </div>

            {/* Card 3 - Reliability */}
            <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-[#ff581b] p-6 flex flex-col justify-between" data-aos="fade-up" data-aos-delay="160">
              <div className="text-6xl md:text-7xl font-black text-white leading-none">24/7</div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-wider mt-2">Value 03</div>
              <div className="text-white/80 text-sm mt-2">Ensuring dependable service for travelers and partners.</div>
            </div>

            {/* Card 4 - Quality & Safety */}
            <div className="col-span-1 md:col-span-3 row-span-2 rounded-2xl bg-white border border-gray-100 p-6" data-aos="fade-up" data-aos-delay="240">
              <div className="w-11 h-11 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 flex items-center justify-center text-[#ff581b] text-lg mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">Value 04</div>
              <div className="text-xl md:text-2xl font-black text-[#121212] mb-2">Quality & Safety</div>
              <div className="text-[#555555] text-sm">Promoting hygienic and high-quality food experiences.</div>
            </div>

            {/* Card 5 - Partnership */}
            <div className="col-span-1 md:col-span-5 row-span-2 rounded-2xl bg-[#121212] p-6" data-aos="fade-up" data-aos-delay="320">
              <div className="w-11 h-11 rounded-xl bg-[#ff581b]/15 border border-[#ff581b]/30 flex items-center justify-center text-[#ff581b] text-lg mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Value 05</div>
              <div className="text-xl md:text-2xl font-black text-white mb-2">Partnership</div>
              <div className="text-white/60 text-sm">Building strong relationships with restaurants and local businesses.</div>
            </div>

            {/* Card 6 - Growth */}
            <div className="col-span-1 md:col-span-4 row-span-2 rounded-2xl bg-white border border-gray-100 p-6" data-aos="fade-up" data-aos-delay="400">
              <div className="w-11 h-11 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 flex items-center justify-center text-[#ff581b] text-lg mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider mb-1">Value 06</div>
              <div className="text-xl md:text-2xl font-black text-[#121212] mb-2">Sustainable Growth</div>
              <div className="text-[#555555] text-sm">Creating sustainable value for customers, partners, and communities.</div>
            </div>

            {/* Card 7 - Commitment Image */}
            <div className="col-span-1 md:col-span-8 row-span-2 rounded-2xl overflow-hidden relative group" data-aos="fade-up" data-aos-delay="480">
              <img src="https://images.unsplash.com/photo-1523895665936-7bfe172b757d?w=1200&h=400&fit=crop" alt="Team Commitment" className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-end p-6 text-white">
                <div>
                  <div className="text-[#ff581b] text-xs font-bold uppercase tracking-wider">Our Commitment</div>
                  <div className="text-xl md:text-2xl font-black">Building a smarter travel ecosystem where great food is always within reach.</div>
                </div>
                <a href="/contact" className="bg-[#ff581b] text-white rounded-full py-3 px-6 hover:bg-white hover:text-[#ff581b] transition-all inline-flex items-center gap-2 mt-4 md:mt-0">
                  Partner With Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Promise
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#121212] mb-6">
              Committed to <span className="text-[#ff581b]">Transforming</span> Highway Dining
            </h2>
            <p className="text-[#555555] text-lg leading-relaxed mb-8">
              At Bollineni Ventures, we are dedicated to building a smarter travel ecosystem where great food is always within reach. Through continuous innovation and customer-focused solutions, we aim to transform highway dining and make every journey a delicious experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="bg-[#ff581b] text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#e04e12] transition-all">
                Become a Partner
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link href="/contact_us" className="bg-transparent border-2 border-[#ff581b] text-[#ff581b] rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-[#ff581b] hover:text-white transition-all">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="cta">
        <div className="grid md:grid-cols-2 min-h-[540px]">
          <div className="bg-[#ff581b] p-8 md:p-16 relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10">
              <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">Download FoodSide</div>
              <h2 className="text-white text-4xl md:text-7xl font-black leading-none mb-6">Order Food<br />On The Go.</h2>
              <p className="text-white/70 text-base max-w-md mb-8">Never let hunger interrupt your journey. Order from highway restaurants with just a few taps.</p>
              <a href="/app" className="bg-black text-white rounded-full py-4 px-8 inline-flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                Get the App
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop" 
              alt="Highway Food" 
              className="w-full h-full object-cover brightness-50 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 md:p-16">
              <div className="mb-6" data-aos="zoom-in" data-aos-delay="160">
                <div className="text-white text-6xl md:text-8xl font-black leading-none">5000+</div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">Happy Customers</div>
              </div>
              <div className="w-12 h-0.5 bg-[#ff581b] my-6" />
              <div data-aos="zoom-in" data-aos-delay="240">
                <div className="text-white text-6xl md:text-8xl font-black leading-none">50+</div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">Restaurant Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollAnim {
          0% { transform: translateY(0); }
          100% { transform: translateY(250%); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scrollAnim 1.8s ease-in-out infinite; }
        .animate-ticker { animation: tickerScroll 26s linear infinite; }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
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
        [data-aos="zoom-in"] {
          transform: scale(0.95);
          opacity: 0;
        }
        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
          opacity: 1;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Yesteryear&display=swap');
        
        .about-us-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-heading {
          font-family: 'Raleway', sans-serif;
        }
        .font-title {
          font-family: 'Yesteryear', cursive;
        }

        /* Mobile-specific responsive fixes - preserves desktop design */
        @media (max-width: 768px) {
          .grid.auto-rows-[100px] {
            grid-auto-rows: minmax(100px, auto);
            gap: 1rem;
          }
          [data-aos] {
            transition-duration: 0.6s;
          }
          .cta .grid {
            min-height: auto;
          }
          .cta .bg-[#ff581b] {
            padding: 3rem 1.5rem;
          }
          .cta .relative.overflow-hidden {
            min-height: 300px;
          }
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutUs;