"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaArrowRight, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone, FaMapMarkerAlt, FaClock, FaCopy, FaChevronUp, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaTh, FaList, FaBoxOpen, FaSeedling, FaGift, FaDollarSign, FaBorderAll, FaMagnifyingGlass, FaAngleDown, FaXmark, FaUtensils, FaCalendarCheck, FaBagShopping, FaCamera, FaBookOpen, FaUsers, FaEnvelope, FaChevronDown, FaChevronRight } from 'react-icons/fa';

// Import images (in a real project, these would be imported from your assets)
// For this conversion, we'll use placeholder image URLs that match the original
const images = {
  logo: "https://placehold.co/300x65/1a1a1a/ff581b?text=Restrova",
  favicon: "https://placehold.co/32x32/ff581b/white?text=R",
  heroBg: "https://placehold.co/1920x600/1a1a1a/ff581b?text=Shop+Banner",
  shopSmallBanner: "https://placehold.co/800x300/1a1a1a/ff581b?text=Featured+Offer",
  product1: "https://placehold.co/600x400/2a2a2a/ff581b?text=Wagyu+Ribeye+Kit",
  product2: "https://placehold.co/600x400/2a2a2a/ff581b?text=Carbonara+Kit",
  product3: "https://placehold.co/600x400/2a2a2a/ff581b?text=Truffle+Butter",
  product4: "https://placehold.co/600x400/2a2a2a/ff581b?text=Chilli+Oil",
  product5: "https://placehold.co/600x400/2a2a2a/ff581b?text=Salmon+Kit",
  product6: "https://placehold.co/600x400/2a2a2a/ff581b?text=Red+Wine+Jus",
  product7: "https://placehold.co/600x400/2a2a2a/ff581b?text=Tagliatelle",
  product8: "https://placehold.co/600x400/2a2a2a/ff581b?text=Squid+Ink+Pasta",
  product9: "https://placehold.co/600x400/2a2a2a/ff581b?text=Steak+Rub",
  product10: "https://placehold.co/600x400/2a2a2a/ff581b?text=Collection+Gift+Set",
  pageBanner: "https://placehold.co/1920x400/1a1a1a/ff581b?text=Page+Banner",
  chefAvatar1: "https://placehold.co/40x40/ff581b/white?text=C",
  chefAvatar2: "https://placehold.co/40x40/f4b400/white?text=C",
  chefAvatar3: "https://placehold.co/40x40/1a1a1a/white?text=C",
};

// Product Data
const products = [
  {
    id: 1,
    name: "Wagyu Ribeye Kit",
    category: "Kits",
    price: 89,
    originalPrice: 110,
    rating: 5.0,
    reviewCount: 312,
    desc: "800g A5 Wagyu, truffle butter, bone marrow and triple-cooked fries. Chef video guide included.",
    badge: "Best Seller",
    badgeType: "hot",
    image: images.product1,
  },
  {
    id: 2,
    name: "Carbonara Kit",
    category: "Kits",
    price: 42,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 276,
    desc: "Hand-rolled spaghetti, guanciale, Pecorino Romano and farm eggs. The authentic Roman way.",
    badge: "New",
    badgeType: "new",
    image: images.product2,
  },
  {
    id: 3,
    name: "Truffle Butter (250g)",
    category: "Sauces",
    price: 28,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 204,
    desc: "Rich aromatic compound butter with hand-shaved black truffles. Melts on anything.",
    badge: "Fan Favourite",
    badgeType: "bestseller",
    image: images.product3,
  },
  {
    id: 4,
    name: "Chilli Dipping Oil",
    category: "Sauces",
    price: 18,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 145,
    desc: "Cold-pressed extra virgin olive oil infused with Calabrian chillies, garlic and rosemary.",
    badge: "New",
    badgeType: "new",
    image: images.product4,
  },
  {
    id: 5,
    name: "Salmon at Home Kit",
    category: "Kits",
    price: 56,
    originalPrice: 68,
    rating: 4.8,
    reviewCount: 96,
    desc: "Wild Atlantic salmon with citrus miso glaze and saffron risotto. Delivered fresh daily.",
    badge: "Sale",
    badgeType: "sale",
    image: images.product5,
  },
  {
    id: 6,
    name: "Red Wine Jus (500ml)",
    category: "Sauces",
    price: 22,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 167,
    desc: "Slow-reduced Chianti Classico jus with bone marrow and fresh thyme. Restaurant quality at home.",
    badge: null,
    badgeType: null,
    image: images.product6,
  },
  {
    id: 7,
    name: "Handmade Tagliatelle (250g)",
    category: "Pasta",
    price: 14,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 289,
    desc: "Bronze-die extruded egg tagliatelle, air-dried for 48 hours and made in artisan batches.",
    badge: null,
    badgeType: null,
    image: images.product7,
  },
  {
    id: 8,
    name: "Black Squid Ink Pasta (200g)",
    category: "Pasta",
    price: 16,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 87,
    desc: "Jet-black linguine coloured with Sicilian squid ink, ideal with seafood sauces.",
    badge: "New",
    badgeType: "new",
    image: images.product8,
  },
  {
    id: 9,
    name: "Restrova Steak Rub (80g)",
    category: "Spices",
    price: 12,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 321,
    desc: "Signature blend of smoked paprika, sea salt, black pepper, garlic and rosemary.",
    badge: "#1 Product",
    badgeType: "bestseller",
    image: images.product9,
  },
  {
    id: 10,
    name: "The Restrova Collection",
    category: "Gifts",
    price: 98,
    originalPrice: 120,
    rating: 5.0,
    reviewCount: 67,
    desc: "6-bottle gift set with truffle oil, chilli oil, balsamic, steak rub and herb blend.",
    badge: "Gift Set",
    badgeType: "hot",
    image: images.product10,
  },
];

// Category data
const categories = [
  { id: "all", name: "All Products", icon: FaBorderAll, count: 10 },
  { id: "Kits", name: "Meal Kits", icon: FaBoxOpen, count: 3 },
  // { id: "Sauces", name: "Sauces & Oils", icon: FaBottleDroplet, count: 3 },
  // { id: "Pasta", name: "Artisan Pasta", icon: FaBowlFood, count: 2 },
  { id: "Spices", name: "Spices & Rubs", icon: FaSeedling, count: 1 },
  { id: "Gifts", name: "Gift Sets", icon: FaGift, count: 1 },
];

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 47, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="shop-promo-countdown flex items-center gap-2 font-bold text-white/50">
      <span>Ends in</span>
      <span className="pc-num font-heading text-2xl font-black text-white min-w-[32px] text-center">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="pc-sep text-primary">:</span>
      <span className="pc-num font-heading text-2xl font-black text-white min-w-[32px] text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="pc-sep text-primary">:</span>
      <span className="pc-num font-heading text-2xl font-black text-white min-w-[32px] text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, viewMode }) => {
  const getBadgeStyles = (type) => {
    switch (type) {
      case 'hot':
        return 'bg-primary text-white shadow-lg shadow-primary/40';
      case 'new':
        return 'bg-dark/80 text-white';
      case 'sale':
        return 'bg-white/90 text-red-700 border border-red-200';
      case 'bestseller':
        return 'bg-white/90 text-amber-800 border border-amber-200';
      default:
        return 'bg-white/90 text-dark';
    }
  };

  const CardContent = () => (
    <>
      <div className="pc-bar h-1 w-full bg-primary flex-shrink-0"></div>
      <div className="pc-img-wrap relative h-64 overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        <div className="pc-img-overlay absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent z-[2]"></div>
        {product.badge && (
          <div className="pc-badges absolute top-4 left-4 z-[5]">
            <span className={`pc-badge inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-[1.5px] px-3 py-1 rounded-full backdrop-blur-sm ${getBadgeStyles(product.badgeType)}`}>
              {product.badge}
            </span>
          </div>
        )}
        <div className="pc-rating-img absolute bottom-3 right-3 z-[5] flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-dark">
          <FaStar className="text-amber-500 text-[9px]" /> {product.rating} <span className="text-gray-500 font-normal">({product.reviewCount})</span>
        </div>
      </div>
      <div className="pc-body p-5 flex flex-col flex-1">
        <div className="pc-cat text-[10px] font-bold tracking-[2.5px] uppercase text-primary mb-1">{product.category}</div>
        <div className="pc-name font-heading text-xl font-extrabold text-dark mb-2 hover:text-primary transition-colors">
          <a href="#" className="hover:text-primary">{product.name}</a>
        </div>
        <p className="pc-desc text-sm text-gray-500 leading-relaxed mb-auto pb-4">{product.desc}</p>
        <div className="pc-divider h-px bg-black/5 mb-4"></div>
        <div className="pc-footer flex items-center justify-between gap-2">
          <div className="pc-price font-heading text-3xl font-black text-dark leading-none">
            {product.originalPrice && <s className="text-base text-gray-400 font-normal mr-1">${product.originalPrice}</s>}
            <sup className="text-xl text-primary font-bold align-super">$</sup>{product.price}
          </div>
          <a href="#" className="btn-default relative inline-block text-sm font-bold uppercase bg-primary text-white rounded-full py-3 px-6 overflow-hidden transition-all duration-300 hover:bg-dark z-[1]">
            Add to Cart
          </a>
        </div>
      </div>
    </>
  );

  if (viewMode === 'list') {
    return (
      <div className="pc bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 grid grid-cols-[240px_minmax(0,1fr)]">
        <div className="pc-bar h-1 w-full bg-primary col-span-2"></div>
        <a href="#" className="block h-full">
          <div className="pc-img-wrap relative h-full min-h-[200px] overflow-hidden rounded-l-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="pc-img-overlay absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent"></div>
            {product.badge && (
              <div className="pc-badges absolute top-4 left-4 z-[5]">
                <span className={`pc-badge inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-[1.5px] px-3 py-1 rounded-full backdrop-blur-sm ${getBadgeStyles(product.badgeType)}`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>
        </a>
        <div className="pc-body p-5 flex flex-col">
          <div className="pc-cat text-[10px] font-bold tracking-[2.5px] uppercase text-primary mb-1">{product.category}</div>
          <div className="pc-name font-heading text-xl font-extrabold text-dark mb-2">
            <a href="#" className="hover:text-primary">{product.name}</a>
          </div>
          <p className="pc-desc text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{product.desc}</p>
          <div className="pc-footer flex items-center justify-between gap-4 mt-auto">
            <div className="pc-price font-heading text-3xl font-black text-dark leading-none">
              {product.originalPrice && <s className="text-base text-gray-400 font-normal mr-1">${product.originalPrice}</s>}
              <sup className="text-xl text-primary font-bold align-super">$</sup>{product.price}
            </div>
            <a href="#" className="btn-default relative inline-block text-sm font-bold uppercase bg-primary text-white rounded-full py-2.5 px-8 overflow-hidden transition-all duration-300 hover:bg-dark z-[1]">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pc bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 flex flex-col">
      <CardContent />
    </div>
  );
};

// Main Shop Page Component
const Restaurants = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(150);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedRating, setSelectedRating] = useState(null);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => selectedCategory === "all" || product.category === selectedCategory)
    .filter(product => product.price <= priceRange)
    .filter(product => searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => {
      if (!selectedRating) return true;
      if (selectedRating === 5) return product.rating >= 4.9;
      if (selectedRating === 4) return product.rating >= 4;
      if (selectedRating === 3) return product.rating >= 3;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  // Featured product (first product with "Best Seller" badge)
  const featuredProduct = products.find(p => p.badge === "Best Seller") || products[0];

  return (
    <div className="shop-page overflow-x-hidden font-body text-gray-500">
      {/* Loader - hidden by default, you can add loading state logic */}
      
      {/* Top Bar */}
      <div className="top-bar bg-primary text-white py-2 text-xs hidden lg:block">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="flex items-center justify-between">
            <div className="top-info flex items-center gap-4">
              <span className="inline-flex items-center gap-2 pr-4 border-r border-white/40"><FaPhone className="text-white/90" /> +00 (99) 939 7777</span>
              <span className="inline-flex items-center gap-2 pr-4 border-r border-white/40"><FaMapMarkerAlt className="text-white/90" /> Beverley Rd Brooklyn, New York 11226, USA.</span>
              <span className="inline-flex items-center gap-2"><FaClock className="text-white/90" /> Opening Hour: Mon to Sat - 9am to 5pm</span>
            </div>
            <div className="top-social flex gap-3">
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-white hover:text-dark transition-all"><FaFacebookF size={12} /></a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-white hover:text-dark transition-all"><FaInstagram size={12} /></a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-white hover:text-dark transition-all"><FaTwitter size={12} /></a>
              <a href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-white hover:text-dark transition-all"><FaLinkedinIn size={12} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header bg-white shadow-md sticky top-0 z-[1000] border-b border-gray-100">
        <nav className="navbar container mx-auto px-4 max-w-[1480px] flex items-center justify-between py-3">
          <a className="navbar-brand" href="#">
            <img src={images.logo} alt="Restrova" className="h-16" />
          </a>
          <button className="navbar-toggler lg:hidden flex flex-col gap-1.5 p-1.5" onClick={(e) => e.currentTarget.classList.toggle('collapsed')}>
            <span className="tog-line block w-6 h-0.5 bg-dark rounded transition-all"></span>
            <span className="tog-line block w-6 h-0.5 bg-dark rounded transition-all"></span>
            <span className="tog-line block w-6 h-0.5 bg-dark rounded transition-all"></span>
          </button>
          <div className="collapse navbar-collapse hidden lg:flex items-center">
            <ul className="navbar-nav flex items-center gap-2 mx-auto">
              <li className="nav-item relative group">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 inline-flex items-center gap-1 hover:text-primary transition-all" href="#">Home <FaAngleDown className="text-xs transition-transform group-hover:rotate-180" /></a>
              </li>
              <li className="nav-item relative group">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 inline-flex items-center gap-1 hover:text-primary transition-all" href="#">Menu <FaAngleDown className="text-xs transition-transform group-hover:rotate-180" /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 hover:text-primary transition-all" href="#">About</a>
              </li>
              <li className="nav-item relative group">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 inline-flex items-center gap-1 hover:text-primary transition-all" href="#">Pages <FaAngleDown className="text-xs transition-transform group-hover:rotate-180" /></a>
              </li>
              <li className="nav-item relative group">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 inline-flex items-center gap-1 hover:text-primary transition-all" href="#">Blog <FaAngleDown className="text-xs transition-transform group-hover:rotate-180" /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-semibold text-dark px-4 py-2.5 hover:text-primary transition-all" href="#">Contact</a>
              </li>
            </ul>
            <div className="header-actions flex items-center gap-5">
              <button className="header-icon w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><FaSearch size={18} /></button>
              <a href="#" className="header-icon relative w-11 h-11 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <FaShoppingCart size={18} />
                <span className="cart-count absolute -top-1 -right-1 bg-dark text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </a>
              <a href="#" className="btn-default relative inline-block text-sm font-bold uppercase bg-primary text-white rounded-full py-3 px-7 overflow-hidden transition-all duration-300 hover:bg-dark z-[1]">Book A Table</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Promo Bar */}
      <div className="shop-promo-bar bg-dark py-3 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="shop-promo-inner flex items-center justify-center gap-5 flex-wrap">
            <div className="shop-promo-text font-bold text-white">🔥 First order? Get <strong>20% off</strong> with code:</div>
            <div className="shop-promo-code flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 font-heading font-black text-primary tracking-wider"><FaCopy className="text-xs" /> RESTROVA20</div>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Shop Hero */}
      <section className="shop-hero relative py-20 overflow-hidden bg-dark">
        <div className="shop-hero-bg absolute inset-0 bg-cover bg-center brightness-50 saturate-50" style={{ backgroundImage: `url(${images.heroBg})` }}></div>
        <div className="container mx-auto px-4 max-w-[1480px] relative z-10">
          <div className="shop-hero-inner flex items-end justify-between gap-10 flex-wrap">
            <div>
              <div className="eyebrow inline-flex items-center gap-2 font-title text-2xl text-primary"><span className="eyebrow-line w-8 h-0.5 bg-primary rounded"></span>Restrova Shop</div>
              <h1 className="section-heading font-heading text-6xl font-extrabold text-white mb-5">Bring the<br />Kitchen <span className="hero-highlight text-primary font-title">Home</span></h1>
            </div>
            <div className="shop-hero-right flex-shrink-0">
              <div className="shop-hero-stats flex gap-8">
                <div className="hs-item text-center">
                  <div className="hs-num font-heading text-4xl font-black text-white leading-none">60<span className="text-primary">+</span></div>
                  <div className="hs-lbl text-[10px] font-bold tracking-wider uppercase text-primary mt-1">Products</div>
                </div>
                <div className="hs-item text-center">
                  <div className="hs-num font-heading text-4xl font-black text-white leading-none">4.9<span className="text-primary">★</span></div>
                  <div className="hs-lbl text-[10px] font-bold tracking-wider uppercase text-primary mt-1">Avg Rating</div>
                </div>
                <div className="hs-item text-center">
                  <div className="hs-num font-heading text-4xl font-black text-white leading-none">24<span className="text-primary">h</span></div>
                  <div className="hs-lbl text-[10px] font-bold tracking-wider uppercase text-primary mt-1">Dispatch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-hero-stripe h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-12 relative z-10"></div>
      </section>

      {/* Shop Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="shop-layout grid lg:grid-cols-[280px_1fr] gap-10">
            {/* Sidebar */}
            <aside className="sidebar">
              {/* Categories */}
              <div className="sb-card bg-white rounded-2xl border border-black/5 overflow-hidden shadow-md mb-5">
                <div className="sb-head bg-dark px-5 py-4 flex items-center gap-2.5">
                  <div className="sb-head-icon w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary"><FaBorderAll size={14} /></div>
                  <div className="sb-head-title font-heading text-sm font-extrabold text-white">Categories</div>
                </div>
                <div className="sb-body p-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`cat-btn w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-transparent text-left text-sm font-semibold transition-all ${selectedCategory === cat.id ? 'bg-primary text-white' : 'text-gray-500 hover:bg-primary/5 hover:border-primary/20 hover:text-primary'}`}
                    >
                      <cat.icon size={14} className={selectedCategory === cat.id ? 'text-white/80' : 'text-primary'} />
                      {cat.name}
                      <span className={`cat-count ml-auto text-[11px] font-extrabold px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-black/5 text-gray-500'}`}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="sb-card bg-white rounded-2xl border border-black/5 overflow-hidden shadow-md mb-5">
                <div className="sb-head bg-dark px-5 py-4 flex items-center gap-2.5">
                  <div className="sb-head-icon w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary"><FaDollarSign size={14} /></div>
                  <div className="sb-head-title font-heading text-sm font-extrabold text-white">Price Range</div>
                </div>
                <div className="price-range-wrap px-5 py-4">
                  <div className="pr-labels flex justify-between text-xs font-bold text-dark mb-3">
                    <span>$0</span>
                    <span>Up to <span className="text-primary">${priceRange}</span></span>
                  </div>
                  <input
                    type="range"
                    className="range-slider w-full h-1 bg-black/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                    min="10"
                    max="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="sb-card bg-white rounded-2xl border border-black/5 overflow-hidden shadow-md">
                <div className="sb-head bg-dark px-5 py-4 flex items-center gap-2.5">
                  <div className="sb-head-icon w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary"><FaStar size={14} /></div>
                  <div className="sb-head-title font-heading text-sm font-extrabold text-white">Rating</div>
                </div>
                <div className="rating-filters px-4 py-3 flex flex-col gap-2">
                  {[5, 4, 3].map(rating => (
                    <div
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`rf flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${selectedRating === rating ? 'bg-primary/5' : 'hover:bg-primary/5'}`}
                    >
                      <div className="rf-stars flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          i < rating ? <FaStar key={i} size={11} className="text-amber-500" /> : <FaRegStar key={i} size={11} className="text-gray-300" />
                        ))}
                      </div>
                      <span className="rf-lbl text-sm font-semibold text-gray-500 flex-1">{rating}+ Stars</span>
                      <span className="rf-cnt text-xs text-gray-400">({rating === 5 ? 42 : rating === 4 ? 28 : 8})</span>
                      <div className={`rf-cb w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedRating === rating ? 'bg-primary border-primary' : 'border-black/20'}`}>
                        {selectedRating === rating && <FaCheck className="text-white text-[9px]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Area */}
            <div className="main-area">
              {/* Featured Banner */}
              <div className="feat-banner relative h-56 rounded-2xl overflow-hidden mb-7">
                <div className="feat-banner-bg absolute inset-0">
                  <img src={images.shopSmallBanner} alt="banner" className="w-full h-full object-cover brightness-50 saturate-50" />
                </div>
                <div className="feat-banner-inner relative z-10 h-full flex items-center justify-between px-10 gap-6">
                  <div>
                    <div className="fb-tag text-[10px] font-bold tracking-[2.5px] uppercase text-primary mb-2.5">⭐ Most Popular Kit</div>
                    <div className="fb-title font-heading text-3xl font-black text-white leading-tight mb-2">{featuredProduct.name}</div>
                    <p className="fb-sub text-sm text-white/45 leading-relaxed">Our most celebrated dish — brought to your kitchen with step-by-step chef guidance.</p>
                  </div>
                  <div className="fb-right flex-shrink-0 text-center">
                    <div className="fb-price font-heading text-5xl font-black text-white leading-none"><span className="text-primary text-2xl align-super">$</span>{featuredProduct.price}</div>
                    <div className="fb-label text-[11px] font-bold tracking-wider uppercase text-white/30 mt-1.5">Per Serving Kit</div>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="toolbar flex items-center gap-3.5 mb-7 flex-wrap">
                <div className="shop-search-wrap flex-1 min-w-[200px] relative">
                  <FaSearch className="shop-search-icon absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    className="shop-search-input w-full py-3 pl-11 pr-4 bg-white border border-black/10 rounded-full text-sm text-dark outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)] transition-all"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="sort-select py-3 pl-4 pr-9 bg-white border border-black/10 rounded-full text-sm font-semibold text-dark outline-none focus:border-primary transition-all appearance-none bg-no-repeat bg-right-3 bg-center"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff581b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundSize: "14px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="result-count text-sm font-semibold text-gray-500 whitespace-nowrap"><strong id="resultNum" className="text-primary font-heading">{filteredProducts.length}</strong> products</div>
                <div className="view-toggle flex gap-1.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`vt-btn w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${viewMode === "grid" ? 'bg-primary border-primary text-white' : 'border-black/10 text-gray-500 hover:border-primary/30 hover:text-primary'}`}
                  ><FaTh size={14} /></button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`vt-btn w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${viewMode === "list" ? 'bg-primary border-primary text-white' : 'border-black/10 text-gray-500 hover:border-primary/30 hover:text-primary'}`}
                  ><FaList size={14} /></button>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`products-grid ${viewMode === 'list' ? 'grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-6`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern relative mt-24 overflow-hidden z-[1] bg-dark text-gray-500">
        <div className="footer-background absolute inset-0 bg-dark overflow-hidden z-0">
          <div className="footer-blob-2 absolute w-[350px] h-[350px] bg-cover bg-center bottom-[5%] left-[-5%] opacity-80 pointer-events-none animate-blob-float-2" style={{ backgroundImage: "url('https://placehold.co/350x350/ff581b/white?text=Tacos')" }}></div>
          <div className="footer-blob-3 absolute w-[400px] h-[400px] bg-cover bg-center bottom-[5%] right-[-12%] opacity-80 pointer-events-none animate-blob-float-3" style={{ backgroundImage: "url('https://placehold.co/400x400/ff581b/white?text=Pizza')" }}></div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-cta-section relative py-20 text-white overflow-hidden bg-[#f4b400] z-10">
          <div className="container mx-auto px-4 max-w-[1480px] relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="footer-cta-content">
                <h2 className="footer-cta-title text-5xl font-extrabold text-white mb-4 font-heading">Freshly <span className="text-dark font-title">Prepared</span></h2>
                <p className="footer-cta-subtitle text-lg text-white/90 mb-8">Sign up for our newsletter and get 20% off your first order!</p>
                <div className="footer-newsletter flex gap-2 max-w-md bg-primary p-1.5 rounded-full border-2 border-primary/20 focus-within:border-primary focus-within:shadow-lg">
                  <input type="email" placeholder="Your email address" className="flex-1 bg-primary rounded-full px-6 py-3.5 text-white placeholder-white/50 outline-none border-none" />
                  <button className="btn-footer-subscribe bg-dark text-white px-8 py-3.5 rounded-full font-semibold hover:translate-y-[-3px] transition-all">Subscribe</button>
                </div>
              </div>
              <div className="footer-app-download text-center">
                <h3 className="app-text text-4xl font-extrabold text-white mb-4 font-heading">Get Our App</h3>
                <div className="store-buttons flex gap-8 items-center">
                  <img src="https://placehold.co/260x80/white/ff581b?text=App+Store" alt="App Store" className="h-16 w-auto transition-transform hover:scale-105" />
                  <img src="https://placehold.co/260x80/white/ff581b?text=Google+Play" alt="Google Play" className="h-16 w-auto transition-transform hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bar-shape absolute top-0 left-0 right-0 h-2 bg-primary/30"></div>
        </div>

        {/* Footer Main */}
        <div className="footer-main pt-20 pb-12 relative z-10">
          <div className="container mx-auto px-4 max-w-[1480px]">
            <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="footer-brand-column">
                <div className="footer-logo mb-6">
                  <img src={images.logo} alt="Restrova" className="w-64" />
                </div>
                <p className="footer-description text-white/70 text-sm leading-relaxed mb-7">Delivering premium culinary experiences with passion, quality ingredients, and exceptional service.</p>
                <div className="footer-social-links flex gap-4">
                  <a href="#" className="social-link w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary border-2 border-transparent hover:bg-primary hover:text-white hover:-translate-y-2 transition-all"><FaFacebookF /></a>
                  <a href="#" className="social-link w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary border-2 border-transparent hover:bg-primary hover:text-white hover:-translate-y-2 transition-all"><FaInstagram /></a>
                  <a href="#" className="social-link w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary border-2 border-transparent hover:bg-primary hover:text-white hover:-translate-y-2 transition-all"><FaTwitter /></a>
                  <a href="#" className="social-link w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary border-2 border-transparent hover:bg-primary hover:text-white hover:-translate-y-2 transition-all"><FaLinkedinIn /></a>
                </div>
              </div>
              <div>
                <h5 className="footer-column-title text-base font-bold text-white uppercase tracking-wider mb-6 pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">Quick Menu</h5>
                <ul className="footer-links flex flex-col gap-3">
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Home</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Menu</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">About Us</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Reservation</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Shop</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Blog</a></li>
                </ul>
              </div>
              <div>
                <h5 className="footer-column-title text-base font-bold text-white uppercase tracking-wider mb-6 pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">Our Services</h5>
                <ul className="footer-links flex flex-col gap-3">
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Food Delivery</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Private Dining</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Takeaway Pickup</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Wedding Catering</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Party Booking</a></li>
                  <li><a href="#" className="text-white/70 hover:text-primary hover:pl-2 transition-all">Corporate Lunches</a></li>
                </ul>
              </div>
              <div>
                <h5 className="footer-column-title text-base font-bold text-white uppercase tracking-wider mb-6 pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">Contact Us</h5>
                <div className="contact-info flex flex-col gap-5">
                  <div className="info-item flex gap-4 items-start">
                    <FaMapMarkerAlt className="text-primary text-lg mt-1" />
                    <div><p className="text-white/70 text-sm">Beverley Rd, Brooklyn<br />New York 11226, USA</p></div>
                  </div>
                  <div className="info-item flex gap-4 items-start">
                    <FaPhone className="text-primary text-lg mt-1" />
                    <p className="text-white/70 text-sm">+00 (99) 939 7777</p>
                  </div>
                  <div className="info-item flex gap-4 items-start">
                    <FaEnvelope className="text-primary text-lg mt-1" />
                    <p className="text-white/70 text-sm">hello@restrova.com</p>
                  </div>
                  <div className="info-item flex gap-4 items-start">
                    <FaClock className="text-primary text-lg mt-1" />
                    <p className="text-white/70 text-sm">Mon-Sat: 9am - 10pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="horizontal-pulse w-full h-px relative overflow-hidden my-10 bg-gradient-to-r from-transparent via-dark/30 to-transparent"></div>
            <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="copyright-text text-xs text-white/60">&copy; 2026 Restrova. All Rights Reserved. <span className="mx-2 opacity-40">|</span> <a href="#" className="text-primary hover:text-white transition-all">Privacy Policy</a> <span className="mx-2 opacity-40">|</span> <a href="#" className="text-primary hover:text-white transition-all">Terms & Conditions</a></p>
              <div className="payment-methods flex items-center gap-3">
                <span className="payment-label text-xs text-white/60 uppercase tracking-wider font-semibold">We Accept:</span>
                <FaCcVisa size={24} className="text-white/50 hover:text-white transition-all" />
                <FaCcMastercard size={24} className="text-white/50 hover:text-white transition-all" />
                <FaCcPaypal size={24} className="text-white/50 hover:text-white transition-all" />
                <FaCcAmex size={24} className="text-white/50 hover:text-white transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        <button className="footer-scroll-top fixed bottom-10 right-10 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:-translate-y-2 transition-all z-[1000]">
          <FaChevronUp size={20} />
        </button>
      </footer>
    </div>
  );
};

// Helper component for checkmark
const FaCheck = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default Restaurants;