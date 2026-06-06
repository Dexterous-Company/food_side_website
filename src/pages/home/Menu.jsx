// components/Menu.jsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AOS from '../../../utils/aos';

// Real menu data from fooddelivery.menus.json (10 items)
const menuData = [
  {
    id: "69fb07deeab765dad2e24bbb",
    name: "Chicken Curry",
    description: "Traditional North Indian chicken curry cooked with tender chicken pieces, onions, tomatoes, and authentic Indian spices.",
    price: 320,
    discount_price: 289,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059226/Menu/Items/z9z85njqkkzdhymyyapi.jpg",
    category: "mains",
    isVeg: false,
    rating: 5,
    trending: true,
    estimateTimePrepareMenuItem: 30
  },
  {
    id: "69fb1fcbeab765dad2e24e6f",
    name: "Hyderabadi Chicken Biryani",
    description: "Authentic Hyderabadi-style chicken biryani made with fragrant basmati rice, tender chicken, and rich aromatic spices.",
    price: 340,
    discount_price: 299,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778065353/Menu/Items/ibnyoclfcoimnvcoydy5.jpg",
    category: "mains",
    isVeg: false,
    rating: 5,
    trending: true,
    estimateTimePrepareMenuItem: 35
  },
  {
    id: "6a0db88c3fa4abf407b67b5a",
    name: "Crispy Burger",
    description: "Spicy & Yummy crispy chicken burger with fresh lettuce and special sauce.",
    price: 329,
    discount_price: 279,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1779284104/Menu/Items/vk0j1kmbrkeki706fzzn.jpg",
    category: "burger",
    isVeg: false,
    estimateTimePrepareMenuItem: 15,
    trending: true
  },
  {
    id: "69fb2c79eab765dad2e24efe",
    name: "Shahi Paneer",
    description: "Rich and creamy Mughlai paneer curry prepared with soft paneer cubes, cashew gravy, fresh cream, and aromatic royal spices.",
    price: 310,
    discount_price: 279,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778068599/Menu/Items/slmmobhjunml2hcih0nd.jpg",
    category: "mains",
    isVeg: true,
    rating: 5,
    trending: true,
    estimateTimePrepareMenuItem: 25
  },
  {
    id: "69fb0a4beab765dad2e24c21",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a creamy tomato-butter gravy with rich North Indian spices and herbs.",
    price: 360,
    discount_price: 329,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059849/Menu/Items/yu6aowg2lbwjhjbjrm79.jpg",
    category: "mains",
    isVeg: false,
    rating: 5,
    trending: true,
    estimateTimePrepareMenuItem: 30
  },
  {
    id: "69fb065aeab765dad2e24b99",
    name: "Paneer Butter Masala",
    description: "Creamy and rich North Indian curry made with fresh paneer cubes cooked in buttery tomato gravy.",
    price: 280,
    discount_price: 249,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778058833/Menu/Items/s7eqmofrqii9tj2wzo0q.jpg",
    category: "mains",
    isVeg: true,
    rating: 5,
    estimateTimePrepareMenuItem: 25
  },
  {
    id: "69fb157beab765dad2e24d27",
    name: "South Indian Filter Coffee",
    description: "Traditional South Indian filter coffee made with freshly brewed coffee decoction and creamy milk.",
    price: 70,
    discount_price: 55,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778062713/Menu/Items/r9uiu95ds4otlfznnd2j.jpg",
    category: "drinks",
    isVeg: true,
    rating: 5,
    estimateTimePrepareMenuItem: 5
  },
  {
    id: "6a0abbb9e31abfb145e7b8e3",
    name: "Zinger Pro Burger",
    description: "New premium zinger with crunchy zinger fillet, cheese, lettuce, tomatoes, sauce in sesame bun!",
    price: 299,
    discount_price: 229,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1779088308/Menu/Items/ijsptxgkj1cvypmjsk2a.png",
    category: "burger",
    isVeg: true,
    estimateTimePrepareMenuItem: 15
  },
  {
    id: "69fb0868eab765dad2e24bd1",
    name: "Butter Naan",
    description: "Soft and fluffy tandoor-baked naan topped with melted butter. Perfect accompaniment for curries.",
    price: 60,
    discount_price: 49,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059367/Menu/Items/mbq2cff5ypx9nsyjtb8k.jpg",
    category: "breads",
    isVeg: true,
    rating: 5,
    estimateTimePrepareMenuItem: 10
  },
  {
    id: "69fb20d7eab765dad2e24e87",
    name: "Cheese Chicken Burger",
    description: "Juicy chicken patty layered with melted cheese, fresh lettuce, onions, and special sauce inside a soft toasted bun.",
    price: 180,
    discount_price: 149,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778065621/Menu/Items/hwotbzb8jecpugxft2nv.jpg",
    category: "burger",
    isVeg: false,
    rating: 5,
    estimateTimePrepareMenuItem: 15
  }
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');

  useEffect(() => {
    // Initialize AOS after component mounts
    setTimeout(() => {
      AOS.init();
    }, 100);
  }, []);

  // Re-initialize AOS when activeTab changes
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'All Items', icon: 'fa-border-all' },
    { id: 'mains', label: 'Mains', icon: 'fa-fire-flame-curved' },
    { id: 'burger', label: 'Burgers', icon: 'fa-burger' },
    { id: 'drinks', label: 'Drinks', icon: 'fa-wine-glass' },
    { id: 'breads', label: 'Breads', icon: 'fa-bread-slice' }
  ];

  const getCategoryCount = useCallback((categoryId) => {
    if (categoryId === 'all') return menuData.length;
    return menuData.filter(item => item.category === categoryId).length;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') {
      return menuData;
    }
    return menuData.filter(item => item.category === activeTab);
  }, [activeTab]);

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setLastAddedItem(item.name);
    setShowCartAlert(true);
    setTimeout(() => setShowCartAlert(false), 2000);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-orange-50/30">
      <div className="container mx-auto px-4">
        {/* Cart Alert Toast */}
        {showCartAlert && (
          <div className="fixed top-24 right-4 z-50 animate-slide-in">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <i className="fa-solid fa-check-circle"></i>
              <span>Added {lastAddedItem} to cart!</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div data-aos="fade-right">
            <div className="flex items-center gap-2 text-[#ff581b] text-xl font-title mb-2">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Signature Menu
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              Explore Our <span className="text-[#ff581b] font-title">Delicious</span><br />Dishes & Delights
            </h2>
          </div>
          <div className="text-right" data-aos="fade-left">
            <p className="text-gray-500 max-w-md mb-4">Every dish is crafted from authentic recipes with the finest ingredients — prepared fresh daily with passion.</p>
            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <i className="fa-solid fa-utensils text-[#ff581b]"></i>
                <span>{menuData.length}+ Items</span>
              </div>
              <div className="group bg-[#ff581b] text-white rounded-full py-3 px-6 font-bold relative overflow-hidden inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                View Full Menu
                <svg className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide" data-aos="fade-up">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#ff581b] text-white shadow-lg shadow-[#ff581b]/30 scale-105'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#ff581b] hover:text-[#ff581b] hover:scale-105'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-sm`}></i>
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{getCategoryCount(tab.id)}</span>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group" 
                data-aos="fade-up" 
                data-aos-delay={idx * 100}
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.trending && (
                      <span className="bg-gradient-to-r from-[#ff581b] to-orange-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">
                        <i className="fa-solid fa-chart-line mr-1 text-[8px]"></i> Trending
                      </span>
                    )}
                    {item.isVeg ? (
                      <span className="bg-green-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">
                        <i className="fa-solid fa-leaf mr-1"></i> Pure Veg
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-md">
                        <i className="fa-solid fa-drumstick-bite mr-1"></i> Non-Veg
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  {item.rating && (
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold shadow-md">
                      <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i> {item.rating}
                      <span className="text-gray-400 text-[9px]">★★★★★</span>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff581b] bg-orange-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </div>
                    {item.estimateTimePrepareMenuItem && (
                      <div className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        <i className="fa-regular fa-clock mr-1"></i> {item.estimateTimePrepareMenuItem} min
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff581b] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Price Section */}
                  <div className="border-t border-gray-100 my-3 pt-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-black text-[#ff581b]">₹{item.discount_price || item.price}</span>
                        {item.discount_price && (
                          <span className="text-sm text-gray-400 line-through ml-2">₹{item.price}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <i className="fa-regular fa-fire"></i>
                        <span>{Math.floor((item.discount_price || item.price) / 5)} cal</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    <div 
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-[#ff581b] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#e04e16] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <i className="fa-solid fa-cart-shopping text-xs"></i>
                      Add to Cart
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>

        {/* Cart Summary Bar */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-gray-900 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-6">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-bag-shopping text-[#ff581b]"></i>
                <span className="font-semibold">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="w-px h-6 bg-gray-700"></div>
              <div className="font-bold">₹{cartItems.reduce((sum, item) => sum + (item.discount_price || item.price), 0)}</div>
              <button className="bg-[#ff581b] text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-[#e04e16] transition-colors cursor-pointer">
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style >{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Menu;