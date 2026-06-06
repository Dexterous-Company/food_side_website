"use client"; 

import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight, FaUser, FaFire, FaClock, FaFireFlameCurved, FaUsers, FaPepperHot, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLink, FaChartPie, FaTriangleExclamation, FaCircleCheck, FaUtensils, FaCalendarCheck, FaBagShopping, FaCamera, FaBookOpen, FaPhone, FaMagnifyingGlass, FaCartShopping, FaArrowRight, FaXmark, FaBowlFood, FaPhoneAlt, FaEnvelope, FaLocationDot, FaArrowLeft, FaPlus, FaMinus, FaCopy, FaShareAlt } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { SiMastercard, SiVisa, SiPaypal, SiAmericanexpress } from 'react-icons/si';

const RestaurantDetails = () => {
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const galleryImages = [
    { src: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pizza Diavola - Main" },
    { src: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pizza Diavola - Side" },
    { src: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pizza Diavola - Detail" },
    { src: "https://images.pexels.com/photos/4109138/pexels-photo-4109138.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pizza Diavola - Closeup" }
  ];

  // Related products
  const relatedProducts = [
    {
      id: 1,
      name: "Pizza Diavola",
      category: "Neapolitan Pizza",
      price: 22,
      rating: 4.9,
      reviews: 189,
      spice: 3,
      time: "15 min",
      calories: 720,
      tags: ["Calabrian Salami", "Fior di Latte", "Chilli Oil"],
      image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: { text: "Wood-Fired", icon: "pizza", color: "dark" },
      badge2: { text: "Spicy", icon: "pepper", color: "red" }
    },
    {
      id: 2,
      name: "Classic Tiramisù",
      category: "Heritage Dessert",
      price: 12,
      rating: 5.0,
      reviews: 431,
      spice: 0,
      time: "Ready",
      calories: 380,
      tags: ["Mascarpone", "Espresso", "Valrhona Cocoa"],
      image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: { text: "Since 1984", icon: "user", color: "primary" },
      badge2: null
    },
    {
      id: 3,
      name: "Truffle Mushroom Velouté",
      category: "Soup",
      price: 14,
      rating: 4.7,
      reviews: 142,
      spice: 1,
      time: "10 min",
      calories: 180,
      tags: ["Truffle Oil", "Wild Mushroom", "Crème Fraîche"],
      image: "https://images.pexels.com/photos/1887233/pexels-photo-1887233.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: { text: "Trending", icon: "fire", color: "dark" },
      badge2: null
    }
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "James K.",
      initials: "JK",
      date: "March 12, 2025",
      rating: 5,
      text: "Genuinely the best steak I've ever had. The dry-aging makes an extraordinary difference — the flavour is so concentrated and complex. The truffle butter melting over the crust at the table was a theatrical moment I'll remember. The bone marrow was the icing on the cake. Worth every penny.",
      verified: true
    },
    {
      id: 2,
      name: "Sofia R.",
      initials: "SR",
      date: "February 28, 2025",
      rating: 5,
      text: "My husband and I visited for our anniversary and ordered this. The presentation was stunning — the cast iron plate, the tableside jus, the theatre of it all. The steak itself was cooked flawlessly medium-rare, deeply crusted on the outside and blush pink within. A true celebration dish.",
      verified: true
    },
    {
      id: 3,
      name: "Ahmed L.",
      initials: "AL",
      date: "February 14, 2025",
      rating: 5,
      text: "Exceptional quality beef and a wonderful preparation. I asked for mine medium and the kitchen nailed it. The fries were perfectly crispy — I asked the server and apparently they triple-cook them in duck fat. Everything about this dish shows serious craft and attention to detail.",
      verified: true
    }
  ];

  // Handle quantity change
  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  // Navigation functions
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Star rating component
  const StarRating = ({ rating, size = "sm" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`${i < fullStars ? 'text-yellow-500' : 'text-gray-300'} ${starSize}`} />
        ))}
      </div>
    );
  };

  // Spice level component
  const SpiceLevel = ({ level }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <FaPepperHot key={i} className={`text-xs ${i <= level ? 'text-red-500' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-600 bg-white overflow-x-hidden">
      {/* Breadcrumb Section */}
      <section className="relative bg-black min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center opacity-40"></div>
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-primary text-lg font-title mb-4">
              <span className="w-8 h-0.5 bg-primary rounded-full"></span>
              <span className="font-['Yesteryear',cursive]">Shop Details</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-['Raleway',sans-serif]">
              Explore Our Culinary Creations <span className="text-primary font-['Yesteryear',cursive]">From Farm to Table</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto md:mx-0">
              Discover the art of fine dining with our carefully crafted dishes, made from the freshest ingredients sourced locally.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-6 text-sm font-semibold">
              <a href="#" className="text-white/80 hover:text-primary transition">Home</a>
              <FaChevronRight className="text-white/50 text-xs" />
              <span className="text-primary">Shop Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* LEFT: GALLERY */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-[320px] md:h-[480px] group">
                <img 
                  src={galleryImages[activeImageIndex].src} 
                  alt={galleryImages[activeImageIndex].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaChevronRight />
                </button>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                    <FaUser className="text-xs" /> Chef's Pick
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-black/80 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <FaFire className="text-xs" /> Best Seller
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xs" />
                  ))}
                  <span className="text-xs font-bold text-gray-800 ml-1">5.0</span>
                  <small className="text-gray-500 text-[10px]">(125 reviews)</small>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 h-20 md:h-24 ${
                      activeImageIndex === idx ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-red-400 to-primary mt-4"></div>
            </div>

            {/* RIGHT: INFO PANEL */}
            <div>
              <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-primary rounded-full"></span>
                Wood Fire Grill · Neapolitan Pizza
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-['Raleway',sans-serif]">Pizza Diavola</h1>
              
              <div className="flex flex-wrap items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-sm" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">5.0 (125)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaClock className="text-primary text-xs" /> 15 min
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaFireFlameCurved className="text-primary text-xs" /> 820 kcal
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaUsers className="text-primary text-xs" /> Serves 1–2
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                800g dry-aged Chianina ribeye grilled over applewood fire until perfectly medium-rare. Served with silky truffle compound butter melting into the crust, roasted bone marrow, hand-cut triple-cooked fries and a rich red wine reduction. A masterpiece of fire and patience.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-gray-800">Spice Level</span>
                <SpiceLevel level={2} />
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              
              <div className="flex items-end gap-3 pb-6 mb-6 border-b border-gray-100">
                <div>
                  <div className="text-5xl font-black text-gray-900 leading-none">
                    <sup className="text-2xl text-primary">$</sup>22
                  </div>
                  <div className="text-sm text-gray-400 line-through">Was $34</div>
                </div>
                <span className="bg-orange-50 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary/20 mb-2">
                  Save 12%
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-bold text-gray-800 min-w-[70px]">Quantity</span>
                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                  <button 
                    onClick={() => handleQuantityChange('decrement')}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-800">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('increment')}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#" className="relative inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-full overflow-hidden group flex-1 text-center">
                  <span className="relative z-10">Add to Cart</span>
                  <div className="absolute inset-0 bg-black transition-all duration-300 -translate-x-full group-hover:translate-x-0"></div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                    <FaArrowRight className="text-primary text-xs transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Share</span>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <FaFacebookF className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <FaTwitter className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <FaInstagram className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <FaWhatsapp className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <FaLink className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="py-0 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-0 border-b border-gray-100 mb-12 overflow-x-auto">
            {['description', 'ingredients', 'preparation', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold text-sm uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-primary border-b-3 border-primary' 
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && <span className="text-primary ml-1">(125)</span>}
              </button>
            ))}
          </div>

          {/* DESCRIPTION TAB */}
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 font-['Raleway',sans-serif]">The Art of Fire & Patience</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Ribeye Fiorentina is our crown jewel — a 800g masterpiece of 28-day dry-aged Chianina beef, sourced exclusively from a single farm in Tuscany. The dry-aging process concentrates the natural flavours, creating an intensity of taste that simply cannot be rushed.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our chefs grill it over seasoned applewood at precisely controlled temperatures, developing a deep mahogany crust while keeping the centre a perfect blush of medium-rare. The truffle compound butter is made fresh daily — black truffle, unsalted butter, shallots and herbs folded together and chilled until service.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <FaFireFlameCurved />
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-800">Applewood Grilled</div>
                      <p className="text-sm text-gray-500">Cooked over real applewood logs for a subtle sweet smoke that complements the beef's natural richness.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <FaUtensils />
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-800">28-Day Dry Aged</div>
                      <p className="text-sm text-gray-500">Aged in our custom dry-age cabinet at controlled humidity, developing unmatched depth of flavour.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <FaLocationDot />
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-800">Single-Origin Beef</div>
                      <p className="text-sm text-gray-500">Every cut comes from the same Chianina cattle farm in Val di Chiana, Tuscany — a guarantee of provenance and quality.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2 font-extrabold text-gray-800 mb-4">
                    <FaChartPie className="text-primary" /> Nutrition Facts
                  </div>
                  <table className="w-full">
                    <tbody>
                      {[
                        ['Calories', '820 kcal'],
                        ['Protein', '68g'],
                        ['Total Fat', '56g'],
                        ['Saturated Fat', '22g'],
                        ['Carbohydrates', '18g'],
                        ['Sodium', '840mg']
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-gray-100 last:border-0">
                          <td className="py-2 text-gray-600">{label}</td>
                          <td className="py-2 text-right font-bold text-gray-800">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2 font-extrabold text-gray-800 mb-4">
                    <FaTriangleExclamation className="text-primary" /> Allergens
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200">
                      <FaTriangleExclamation className="text-xs" /> Dairy
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200">
                      <FaTriangleExclamation className="text-xs" /> Gluten
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200">
                      <FaTriangleExclamation className="text-xs" /> Sulphites
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Please inform your server of any dietary requirements or allergies before ordering.</p>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <div className="flex items-center gap-2 font-extrabold text-primary mb-4">
                    <FaUser className="text-white" /> <span>Chef's Note</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">"I recommend asking for medium-rare. Let the butter melt naturally over the steak at the table — don't rush it. That's when the magic happens."</p>
                  <p className="text-primary text-sm font-bold mt-3">— Chef Marco Valenti, Head Chef</p>
                </div>
              </div>
            </div>
          )}

          {/* INGREDIENTS TAB */}
          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
              {[
                { icon: "🥩", name: "Chianina Ribeye", qty: "800g per serve", origin: "Val di Chiana, Tuscany" },
                { icon: "🧈", name: "Truffle Butter", qty: "40g compound", origin: "House-made daily" },
                { icon: "🦴", name: "Bone Marrow", qty: "2 roasted halves", origin: "Locally sourced" },
                { icon: "🥔", name: "Maris Piper Potato", qty: "220g triple-cooked", origin: "British Isles" },
                { icon: "🍷", name: "Red Wine Jus", qty: "80ml reduced", origin: "Chianti Classico base" },
                { icon: "🧄", name: "Roasted Garlic", qty: "1 whole head", origin: "Spanish season" },
                { icon: "🫒", name: "Extra Virgin Olive Oil", qty: "2 tbsp finishing", origin: "Puglia, Italy" },
                { icon: "🌿", name: "Fresh Rosemary", qty: "2 sprigs", origin: "Garden grown" },
                { icon: "🧂", name: "Maldon Sea Salt", qty: "Flakes to finish", origin: "Essex, England" }
              ].map((ing, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                  <div className="text-3xl mb-2">{ing.icon}</div>
                  <div className="font-extrabold text-gray-800 text-sm">{ing.name}</div>
                  <div className="text-primary text-xs font-semibold mt-1">{ing.qty}</div>
                  <div className="text-gray-400 text-[10px] mt-1">{ing.origin}</div>
                </div>
              ))}
            </div>
          )}

          {/* PREPARATION TAB */}
          {activeTab === 'preparation' && (
            <div className="space-y-0 animate-fadeIn">
              {[
                { num: 1, title: "Temper the Steak", text: "Remove the ribeye from the dry-age cabinet 90 minutes before cooking. Allow it to come to room temperature. Pat completely dry with kitchen paper — moisture is the enemy of crust formation.", tip: "Never salt too early — season generously just before the grill." },
                { num: 2, title: "Prepare the Applewood Grill", text: "Light the applewood and allow the grill to reach 280–300°C. The grate must be clean and lightly oiled. You need two heat zones — direct high heat for searing, indirect medium heat for resting on the grill.", tip: "Listen for an immediate aggressive sizzle when the steak hits the grate. If there's no sizzle, the grill isn't hot enough." },
                { num: 3, title: "Sear & Develop the Crust", text: "Season liberally with sea salt and cracked black pepper. Place over direct heat — do not move the steak. Sear for 4 minutes until a deep mahogany crust forms. Flip once, sear 4 minutes on the second side, then stand on its fat cap for 2 minutes.", tip: null },
                { num: 4, title: "Rest & Finish", text: "Transfer to indirect heat at 120°C and cook until internal temperature reaches 52°C (medium-rare). Remove, tent loosely with foil and rest for 10 full minutes. This step is non-negotiable — cutting too early loses all the juices.", tip: "The internal temp will rise 3–4°C during rest. Pull at 52°C, serve at 56°C." },
                { num: 5, title: "Plate & Serve", text: "Slice against the grain. Place on a warmed cast-iron plate. Crown with a generous disc of truffle compound butter and arrange the roasted bone marrow alongside. Pour the reduced red wine jus tableside. Finish with Maldon sea salt flakes and a drizzle of Puglian olive oil.", tip: null }
              ].map((step) => (
                <div key={step.num} className="relative grid grid-cols-[60px_1fr] gap-4 pb-8 last:pb-0 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/30 z-10">
                      {step.num}
                    </div>
                    {step.num < 5 && <div className="absolute left-[28px] top-12 bottom-0 w-0.5 bg-gray-200 group-last:hidden"></div>}
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-800 text-lg mb-2">{step.title}</div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-3">{step.text}</p>
                    {step.tip && (
                      <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg">
                        <FaFireFlameCurded /> {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="animate-fadeIn">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 pb-8 mb-8 border-b border-gray-100">
                <div className="text-center">
                  <div className="text-7xl font-black text-gray-900 leading-none mb-2">5.0</div>
                  <div className="flex justify-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-xl" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Based on 125 reviews</div>
                </div>
                <div className="space-y-2">
                  {[
                    { stars: 5, percent: 87, count: 271 },
                    { stars: 4, percent: 9, count: 28 },
                    { stars: 3, percent: 3, count: 9 },
                    { stars: 2, percent: 1, count: 3 },
                    { stars: 1, percent: 0, count: 1 }
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-3 text-sm">
                      <span className="w-10 font-semibold text-gray-700">{item.stars} ★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <span className="w-10 text-right text-gray-500">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Review Cards */}
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-black">
                          {review.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{review.name}</div>
                          <div className="text-xs text-gray-400">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 text-xs" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-green-600 text-xs font-semibold">
                      <FaCircleCheck /> Verified Diner
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RELATED DISHES SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-lg font-title mb-2">
                <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                You May Also Like
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-['Raleway',sans-serif]">
                More from <span className="text-primary font-['Yesteryear',cursive]">Our Grill</span>
              </h2>
              <p className="text-gray-500 max-w-lg mt-2">Discover the art of fine dining with our carefully crafted dishes, made from the freshest ingredients sourced locally.</p>
            </div>
            <a href="#" className="relative inline-flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-full overflow-hidden group">
              <span className="relative z-10">View Full Menu</span>
              <div className="absolute inset-0 bg-black transition-all duration-300 -translate-x-full group-hover:translate-x-0"></div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaArrowRight className="text-primary text-xs transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.badge && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full ${
                        product.badge.color === 'primary' ? 'bg-primary text-white' : 'bg-black/80 text-white backdrop-blur-sm'
                      }`}>
                        {product.badge.icon === 'pizza' && <FaUtensils className="text-xs" />}
                        {product.badge.icon === 'user' && <FaUser className="text-xs" />}
                        {product.badge.icon === 'fire' && <FaFire className="text-xs" />}
                        {product.badge.text}
                      </span>
                    )}
                    {product.badge2 && (
                      <span className="inline-flex items-center gap-1 bg-white/90 text-red-600 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">
                        <FaPepperHot className="text-xs" /> {product.badge2.text}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                    <FaStar className="text-yellow-500 text-[10px]" /> {product.rating} <small className="text-gray-500">({product.reviews})</small>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-red-400 to-primary"></div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider">{product.category}</span>
                    {product.spice > 0 && (
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <FaPepperHot key={i} className={`text-[10px] ${i < product.spice ? 'text-red-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                    800g dry-aged ribeye grilled over applewood fire. Served with truffle butter, roasted bone marrow and triple-cooked fries.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><FaClock className="text-primary text-[10px]" /> {product.time}</span>
                    <span className="flex items-center gap-1"><FaFireFlameCurved className="text-primary text-[10px]" /> {product.calories} kcal</span>
                  </div>
                  <div className="h-px bg-gray-100 mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-gray-900">${product.price}</div>
                    <a href="#" className="relative inline-flex items-center justify-center bg-primary text-white font-bold text-xs py-2.5 px-5 rounded-full overflow-hidden group">
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 bg-black transition-all duration-300 -translate-x-full group-hover:translate-x-0"></div>
                      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <FaArrowRight className="text-primary text-[8px] transition-transform duration-300 group-hover:rotate-45" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add custom animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RestaurantDetails;