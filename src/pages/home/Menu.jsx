// components/Menu.jsx

"use client";
import React, { useState, useEffect } from 'react';
import AOS from '../../../utils/aos';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    AOS.init();
  }, []);

  const tabs = [
    { id: 'all', label: 'All Items', icon: 'fa-border-all', count: 6 },
    { id: 'starter', label: 'Starters', icon: 'fa-leaf', count: 5 },
    { id: 'mains', label: 'Mains', icon: 'fa-fire-flame-curved', count: 5 },
    { id: 'pizza', label: 'Pizza', icon: 'fa-pizza-slice', count: 3 },
    { id: 'pasta', label: 'Pasta', icon: 'fa-bowl-food', count: 3 },
    { id: 'dessert', label: 'Desserts', icon: 'fa-cake-candles', count: 3 },
    { id: 'drinks', label: 'Drinks', icon: 'fa-wine-glass', count: 3 }
  ];

  const menuItems = {
    all: [
      { name: "Fresh Burrata Classica", cat: "starter", price: "$18", oldPrice: "$22", rating: 4.9, reviews: 218, time: "8 min", calories: 280, serves: 2, tags: ["Fresh Burrata", "Heirloom Tomato", "Aged Balsamic", "Gluten Free"], spice: 1, badge: "Chef's Pick", veg: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Ribeye Fiorentina", cat: "mains", price: "$52", rating: 5.0, reviews: 312, time: "22 min", calories: 820, tags: ["28-Day Aged", "Truffle Butter", "Bone Marrow"], spice: 2, badge: "Chef's Pick", bestseller: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Pizza Diavola", cat: "pizza", price: "$22", rating: 4.9, reviews: 189, time: "15 min", calories: 720, tags: ["Calabrian Salami", "Fior di Latte", "Chilli Oil"], spice: 3, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
      { name: "Spaghetti Carbonara", cat: "pasta", price: "$24", rating: 4.9, reviews: 276, time: "14 min", calories: 680, tags: ["Hand-rolled", "Guanciale", "Farm Egg"], spice: 1, badge: "Signature", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
      { name: "Classic Tiramisù", cat: "dessert", price: "$12", rating: 5.0, reviews: 431, time: "Ready", calories: 380, tags: ["Mascarpone", "Espresso", "Valrhona Cocoa"], badge: "Since 1984", image: "https://images.unsplash.com/photo-1563729784474-e77d69acf757?w=400&h=300&fit=crop" }
    ],
    starter: [
      { name: "Fresh Burrata Classica", price: "$18", oldPrice: "$22", rating: 4.9, reviews: 218, time: "8 min", calories: 280, serves: 2, tags: ["Fresh Burrata", "Heirloom Tomato", "Aged Balsamic"], spice: 1, badge: "Chef's Pick", veg: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Truffle Mushroom Velouté", price: "$14", rating: 4.7, reviews: 142, time: "10 min", calories: 180, tags: ["Truffle Oil", "Wild Mushroom", "Crème Fraîche"], image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop" },
      { name: "Crispy Calamari", price: "$16", rating: 4.8, reviews: 98, time: "12 min", calories: 340, tags: ["Fresh Squid", "Semolina", "Smoked Aioli"], badge: "New", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop" },
      { name: "Bruschetta Trio", price: "$11", rating: 4.6, reviews: 98, time: "7 min", calories: 220, tags: ["Sourdough", "Ricotta", "Roasted Pepper"], veg: true, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
      { name: "Antipasto Board", price: "$24", rating: 4.5, reviews: 87, time: "5 min", calories: 520, serves: "3-4", tags: ["Prosciutto", "Aged Pecorino", "Focaccia"], badge: "Sharing", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop" }
    ],
    mains: [
      { name: "Ribeye Fiorentina", price: "$52", rating: 5.0, reviews: 312, time: "22 min", calories: 820, tags: ["28-Day Aged", "Truffle Butter", "Bone Marrow"], spice: 2, badge: "Chef's Pick", bestseller: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
      { name: "Cedar Plank Salmon", price: "$34", rating: 4.8, reviews: 96, time: "18 min", calories: 560, tags: ["Wild Atlantic", "Citrus Miso", "Saffron Risotto"], badge: "New", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop" },
      { name: "Braised Lamb Shank", price: "$38", rating: 4.9, reviews: 178, time: "15 min", calories: 680, tags: ["12hr Braise", "Red Wine Jus", "Pomme Purée"], badge: "Signature", image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop" },
      { name: "Spatchcock Chicken", price: "$28", rating: 4.7, reviews: 145, time: "20 min", calories: 640, tags: ["Free Range", "Preserved Lemon", "Harissa"], image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop" },
      { name: "Wild Mushroom Risotto", price: "$22", rating: 4.6, reviews: 112, time: "20 min", calories: 480, tags: ["Carnaroli", "Wild Mushroom", "Black Truffle"], veg: true, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop" }
    ],
    pizza: [
      { name: "Pizza Diavola", price: "$22", rating: 4.9, reviews: 189, time: "15 min", calories: 720, tags: ["Calabrian Salami", "Fior di Latte", "Chilli Oil"], spice: 3, badge: "Chef's Pick", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
      { name: "Pizza Margherita", price: "$18", rating: 4.8, reviews: 241, time: "12 min", calories: 580, tags: ["San Marzano", "Fior di Latte", "Fresh Basil"], veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
      { name: "Quattro Formaggi", price: "$20", rating: 4.7, reviews: 156, time: "13 min", calories: 840, tags: ["Mozzarella", "Gorgonzola", "Scamorza"], veg: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" }
    ],
    pasta: [
      { name: "Spaghetti Carbonara", price: "$24", rating: 4.9, reviews: 276, time: "14 min", calories: 680, tags: ["Hand-rolled", "Guanciale", "Farm Egg"], spice: 1, badge: "Signature", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
      { name: "Wild Boar Pappardelle", price: "$28", rating: 4.8, reviews: 163, time: "16 min", calories: 740, tags: ["Wild Boar", "Egg Pappardelle", "Juniper"], image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
      { name: "Cacio e Pepe", price: "$20", rating: 4.7, reviews: 134, time: "12 min", calories: 560, tags: ["Tonnarelli", "Pecorino Romano", "Black Pepper"], veg: true, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" }
    ],
    dessert: [
      { name: "Classic Tiramisù", price: "$12", rating: 5.0, reviews: 431, time: "Ready", calories: 380, tags: ["Mascarpone", "Espresso", "Valrhona Cocoa"], badge: "Since 1984", image: "https://images.unsplash.com/photo-1563729784474-e77d69acf757?w=400&h=300&fit=crop" },
      { name: "Vanilla Panna Cotta", price: "$10", rating: 4.8, reviews: 89, time: "Ready", calories: 290, tags: ["Madagascan Vanilla", "Berry Coulis", "Pistachios"], badge: "New", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
      { name: "Cannoli Siciliani", price: "$9", rating: 4.6, reviews: 77, time: "Ready", calories: 340, tags: ["Ricotta", "Candied Orange", "Dark Chocolate"], image: "https://images.unsplash.com/photo-1563729784474-e77d69acf757?w=400&h=300&fit=crop" }
    ],
    drinks: [
      { name: "Rossi Negroni", price: "$16", rating: 4.9, reviews: 204, tags: ["Aged Gin", "Blood Orange", "Sweet Vermouth"], calories: 180, badge: "House Signature", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop" },
      { name: "Barolo 2018", price: "$22", rating: 4.7, reviews: 88, tags: ["Nebbiolo", "Serralunga d'Alba", "14.5% ABV"], calories: 125, badge: "New Vintage", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop" },
      { name: "Espresso Martini", price: "$15", rating: 4.8, reviews: 167, tags: ["Fresh Espresso", "Premium Vodka", "Coffee Liqueur"], calories: 210, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop" }
    ]
  };

  const getSpiceIcons = (level) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <i key={i} className={`fa-solid fa-pepper-hot text-[9px] ${i <= level ? 'text-[#ef4444]' : 'text-gray-300'}`}></i>
        ))}
      </div>
    );
  };

  const currentItems = menuItems[activeTab] || menuItems.all;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div data-aos="fade-right">
            <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-2">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Menu
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              Explore Our <span className="text-[#ff581b] font-title">Signature</span><br />Dishes & Delights
            </h2>
          </div>
          <div className="text-right" data-aos="fade-left">
            <p className="text-gray-500 max-w-md mb-4">Every dish is crafted from locally sourced seasonal ingredients — prepared fresh daily with 40 years of passion.</p>
            <button className="group bg-[#ff581b] text-white rounded-full py-3 px-6 font-bold relative overflow-hidden inline-flex items-center gap-2">
              View Full Menu
              <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide" data-aos="fade-up">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#ff581b] text-white shadow-lg shadow-[#ff581b]/30'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#ff581b] hover:text-[#ff581b]'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-sm`}></i>
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group" data-aos="fade-up" data-aos-delay={idx * 100}>
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.badge && <span className="bg-[#ff581b] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">{item.badge}</span>}
                  {item.bestseller && <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">Best Seller</span>}
                  {item.veg && <span className="bg-green-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">Veg</span>}
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold shadow-md">
                  <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i> {item.rating} <span className="text-gray-400 font-normal text-[10px]">({item.reviews})</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff581b]">{item.cat || (activeTab === 'all' ? 'Signature' : activeTab)}</div>
                  {item.spice && getSpiceIcons(item.spice)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff581b] transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">Delicious {item.name.toLowerCase()} prepared with finest ingredients.</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                
                {/* Meta */}
                <div className="flex gap-3 text-[11px] text-gray-400 mb-4">
                  {item.time && <span><i className="fa-regular fa-clock text-[#ff581b] mr-1"></i> {item.time}</span>}
                  {item.calories && <span><i className="fa-regular fa-fire text-[#ff581b] mr-1"></i> {item.calories} kcal</span>}
                  {item.serves && <span><i className="fa-regular fa-users text-[#ff581b] mr-1"></i> Serves {item.serves}</span>}
                </div>
                
                <div className="border-t border-gray-100 my-3" />
                
                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-black text-gray-900">{item.price}</span>
                    {item.oldPrice && <span className="text-sm text-gray-400 line-through ml-2">Was {item.oldPrice}</span>}
                  </div>
                  <button className="bg-[#ff581b] text-white rounded-full py-2 px-4 text-sm font-semibold hover:bg-black transition-colors flex items-center gap-1">
                    Add to Cart
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Offer Card */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 relative overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_110%_-10%,rgba(255,88,27,0.3),transparent_55%),radial-gradient(ellipse_60%_60%_at_-10%_110%,rgba(244,180,0,0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_24px,rgba(255,255,255,0.02)_24px,rgba(255,255,255,0.02)_25px)]" />
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 text-[#ff581b] text-sm font-bold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-crown"></i> Chef's Table
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">8-Course <span className="text-[#ff581b]">Tasting</span> Menu</h3>
            <p className="text-white/50 text-sm mb-6">Natural wine pairings · Chef-guided journey · Every Friday & Saturday evening</p>
            <button className="bg-[#ff581b] text-white rounded-full py-3 px-8 font-bold hover:bg-white hover:text-[#ff581b] transition-all">
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;