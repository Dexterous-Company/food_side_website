
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wagyu Ribeye at Home Kit",
      category: "Meal Kit · Signature",
      price: 89,
      originalPrice: 110,
      quantity: 1,
      image: "/assets/images/shop/product-10.jpg",
      badge: "Best Seller",
      badgeColor: "primary",
      serves: "Serves 2",
      kcal: "820 kcal",
      shipTime: "Ships 24h",
      tags: ["A5 Wagyu", "28-Day Aged", "Truffle Butter", "Gluten Free"]
    },
    {
      id: 2,
      name: "House Truffle Butter (250g)",
      category: "Sauces & Oils",
      price: 28,
      originalPrice: null,
      quantity: 2,
      image: "/assets/images/shop/product-9.jpg",
      badge: "Fan Fav",
      badgeColor: "dark",
      weight: "250g",
      temp: "Chilled",
      diet: "Vegetarian",
      tags: ["Black Truffle", "Périgord", "House-Made"]
    },
    {
      id: 3,
      name: "Restrova Signature Steak Rub (80g)",
      category: "Spices & Rubs",
      price: 12,
      originalPrice: null,
      quantity: 1,
      image: "/assets/images/shop/product-8.jpg",
      badge: "#1 Product",
      badgeColor: "green",
      weight: "80g",
      shelfLife: "Best Before 12 mo",
      diet: "Vegan",
      tags: ["Smoked Paprika", "Rosemary", "Maldon Salt"]
    }
  ]);

  const [promoCode, setPromoCode] = useState("RESTROVA20");
  const [appliedPromo, setAppliedPromo] = useState("RESTROVA20");
  const [promoDiscount, setPromoDiscount] = useState(28.60);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromo = () => {
    if (promoCode === "RESTROVA20") {
      setAppliedPromo("RESTROVA20");
      setPromoDiscount(28.60);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal - promoDiscount;
  const vat = 12.68;

  return (
    <div className="font-sans text-gray-600 bg-gray-50">
      {/* Breadcrumb Section */}
      <section className="relative h-[300px] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/page-banner.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="container relative z-10 mx-auto px-4 max-w-[1480px]">
          <div className="text-white">
            <div className="flex items-center gap-2 font-['Yesteryear',cursive] text-2xl text-[#ff581b] mb-4">
              <span className="w-9 h-0.5 bg-[#ff581b] rounded-full"></span>
              Cart
            </div>
            <h2 className="font-['Raleway',sans-serif] text-5xl md:text-6xl font-extrabold text-white mb-2">
              Your <span className="text-[#ff581b] font-['Yesteryear',cursive]">Cart</span>
            </h2>
            <p className="text-white/70">Review your selected items and manage your order before checkout.</p>
          </div>
          <div className="absolute bottom-7 right-0 flex items-center gap-2 text-sm font-semibold">
            <Link href="/" className="text-white hover:text-[#ff581b]">Home</Link>
            <i className="fa-solid fa-chevron-right text-white text-[10px]"></i>
            <span className="text-[#ff581b]">Cart</span>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="flex items-center justify-center gap-0 max-w-[600px] mx-auto">
            {[
              { label: "Cart", icon: "fa-solid fa-bag-shopping", active: true },
              { label: "Delivery", step: "2" },
              { label: "Payment", step: "3" },
              { label: "Confirm", step: "4" }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 flex-1 relative flex-col">
                {idx < 3 && <div className="absolute left-[calc(50%+0px)] right-[calc(-50%+0px)] top-[18px] h-0.5 bg-gray-200 z-0"></div>}
                <div className={`w-9 h-9 rounded-full grid place-items-center z-10 font-['Raleway',sans-serif] text-sm font-extrabold flex-shrink-0 transition-all duration-300 border-2 ${step.active ? 'bg-[#ff581b] border-[#ff581b] text-white shadow-[0_0_0_5px_rgba(255,88,27,0.15)]' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                  {step.icon ? <i className={step.icon}></i> : step.step}
                </div>
                <span className={`text-xs font-bold tracking-wide whitespace-nowrap ${step.active ? 'text-[#ff581b]' : 'text-gray-500'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cart Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1480px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
            
            {/* LEFT: CART ITEMS */}
            <div>
              {/* Column Header */}
              <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                <div>
                  <div className="font-['Raleway',sans-serif] text-2xl font-black text-gray-900 tracking-tight">Order Items</div>
                  <div className="text-sm text-gray-500 font-medium"><strong className="text-[#ff581b] font-['Raleway',sans-serif]">{cartItems.length}</strong> products in your cart</div>
                </div>
                <button onClick={clearCart} className="text-sm font-bold text-gray-500 hover:text-red-600 flex items-center gap-1.5 transition-colors">
                  <i className="fa-solid fa-trash-can"></i> Clear Cart
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4 shadow-sm hover:shadow-md hover:border-[#ff581b]/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-1 bg-gradient-to-r from-[#ff581b] to-[#ff581b]/25"></div>
                  
                  {/* Desktop View */}
                  <div className="hidden md:grid md:grid-cols-[140px_1fr_auto] gap-6 p-5 md:p-6">
                    {/* Image */}
                    <div className="relative w-[140px] h-[120px] rounded-xl overflow-hidden flex-shrink-0 group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
                      <span className={`absolute top-2 left-2 text-white font-bold text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm z-10 ${
                        item.badgeColor === 'primary' ? 'bg-[#ff581b] shadow-md' : 
                        item.badgeColor === 'dark' ? 'bg-gray-900' : 'bg-emerald-700'
                      }`}>{item.badge}</span>
                    </div>
                    
                    {/* Info */}
                    <div>
                      <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#ff581b] mb-1">{item.category}</div>
                      <div className="font-['Raleway',sans-serif] text-lg font-extrabold text-gray-900 leading-tight mb-1.5">{item.name}</div>
                      <div className="flex gap-3 flex-wrap mb-3.5">
                        {item.serves && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-users text-[#ff581b] text-[10px]"></i> {item.serves}</span>}
                        {item.kcal && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-fire text-[#ff581b] text-[10px]"></i> {item.kcal}</span>}
                        {item.shipTime && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-clock text-[#ff581b] text-[10px]"></i> {item.shipTime}</span>}
                        {item.weight && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-weight-hanging text-[#ff581b] text-[10px]"></i> {item.weight}</span>}
                        {item.temp && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-snowflake text-[#ff581b] text-[10px]"></i> {item.temp}</span>}
                        {item.diet && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-seedling text-[#ff581b] text-[10px]"></i> {item.diet}</span>}
                        {item.shelfLife && <span className="flex items-center gap-1 text-xs font-semibold text-gray-500"><i className="fa-solid fa-clock text-[#ff581b] text-[10px]"></i> {item.shelfLife}</span>}
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-100 px-2.5 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Right side */}
                    <div className="flex flex-col items-end justify-between gap-4 min-w-[120px]">
                      <div className="text-right">
                        <div className="font-['Raleway',sans-serif] text-2xl font-black text-gray-900 leading-none tracking-tight"><sup className="text-sm text-[#ff581b]">$</sup>{item.price}</div>
                        {item.originalPrice && <div className="text-xs text-gray-400 line-through font-medium mt-0.5">Was ${item.originalPrice}</div>}
                        {item.originalPrice && <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-1">Save ${item.originalPrice - item.price}</div>}
                      </div>
                      <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-9 h-9 grid place-items-center text-gray-800 hover:text-[#ff581b] transition-colors"><i className="fa-solid fa-minus"></i></button>
                        <span className="font-['Raleway',sans-serif] text-base font-black text-gray-900 min-w-[32px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-9 h-9 grid place-items-center text-gray-800 hover:text-[#ff581b] transition-colors"><i className="fa-solid fa-plus"></i></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"><i className="fa-solid fa-trash-can"></i> Remove</button>
                    </div>
                  </div>
                  
                  {/* Mobile View */}
                  <div className="md:hidden">
                    <div className="p-4">
                      <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-3">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className={`absolute top-2 left-2 text-white font-bold text-[9px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm z-10 ${
                          item.badgeColor === 'primary' ? 'bg-[#ff581b]' : item.badgeColor === 'dark' ? 'bg-gray-900' : 'bg-emerald-700'
                        }`}>{item.badge}</span>
                      </div>
                      <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#ff581b] mb-1">{item.category}</div>
                      <div className="font-['Raleway',sans-serif] text-lg font-extrabold text-gray-900 mb-2">{item.name}</div>
                      <div className="flex gap-3 flex-wrap mb-3">
                        {item.serves && <span className="text-xs text-gray-500"><i className="fa-solid fa-users text-[#ff581b] mr-1"></i> {item.serves}</span>}
                        {item.kcal && <span className="text-xs text-gray-500"><i className="fa-solid fa-fire text-[#ff581b] mr-1"></i> {item.kcal}</span>}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 grid place-items-center"><i className="fa-solid fa-minus text-sm"></i></button>
                            <span className="font-['Raleway',sans-serif] font-black min-w-[28px] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 grid place-items-center"><i className="fa-solid fa-plus text-sm"></i></button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="font-['Raleway',sans-serif] text-xl font-black text-gray-900"><sup className="text-sm text-[#ff581b]">$</sup>{item.price * item.quantity}</div>
                          <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-600"><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex gap-3 items-stretch">
                  <div className="flex-1 relative">
                    <i className="fa-solid fa-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code…" 
                      className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl bg-white text-gray-900 text-sm outline-none focus:border-[#ff581b] focus:shadow-[0_0_0_4px_rgba(255,88,27,0.1)] transition-all"
                    />
                  </div>
                  <button onClick={applyPromo} className="px-6 py-3.5 bg-gray-900 text-white rounded-xl font-['Raleway',sans-serif] font-bold text-sm hover:bg-[#ff581b] transition-colors whitespace-nowrap">Apply</button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center gap-2.5 mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                    <div>
                      <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-emerald-800 tracking-wide">{appliedPromo}</div>
                      <div className="text-xs font-semibold text-emerald-600">20% off applied — saving you ${promoDiscount.toFixed(2)}</div>
                    </div>
                    <button onClick={removePromo} className="ml-auto text-xs font-bold text-emerald-600 hover:text-red-600">Remove</button>
                  </div>
                )}
              </div>

              {/* Continue Shopping */}
              <Link href="/shop" className="flex items-center gap-2 mt-7 font-['Raleway',sans-serif] font-bold text-gray-900 hover:text-[#ff581b] transition-colors w-fit">
                <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                {[
                  { icon: "fa-solid fa-lock", title: "Secure<br>Checkout", desc: "256-bit SSL encryption on every transaction" },
                  { icon: "fa-solid fa-snowflake", title: "Cold Chain<br>Guaranteed", desc: "Insulated packaging — fresh on arrival" },
                  { icon: "fa-solid fa-rotate-left", title: "Easy<br>Returns", desc: "7-day hassle-free return policy" }
                ].map((trust, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#ff581b]/20 transition-all hover:-translate-y-1">
                    <div className="w-11 h-11 rounded-xl bg-[#ff581b]/10 border border-[#ff581b]/20 grid place-items-center mx-auto mb-2.5 text-[#ff581b] text-lg transition-all group-hover:bg-[#ff581b] group-hover:text-white">
                      <i className={trust.icon}></i>
                    </div>
                    <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900 leading-tight" dangerouslySetInnerHTML={{ __html: trust.title }}></div>
                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">{trust.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-gray-900 rounded-xl rounded-t-xl overflow-hidden shadow-lg">
                <div className="flex items-center gap-3.5 p-6 bg-gray-900 relative overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-[#ff581b]/20 border border-[#ff581b]/30 grid place-items-center text-[#ff581b] text-lg relative z-10"><i className="fa-solid fa-receipt"></i></div>
                  <div className="relative z-10">
                    <div className="font-['Raleway',sans-serif] text-base font-black text-white tracking-tight">Order Summary</div>
                    <div className="text-xs text-white/35 font-medium mt-0.5">{cartItems.length} items · Dispatched 24h</div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl overflow-hidden shadow-md">
                  {/* Product rows */}
                  <div className="py-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-start justify-between gap-3 px-7 py-3 border-b border-gray-100 bg-[#ff581b]/5">
                        <div>
                          <div className="font-['Raleway',sans-serif] text-sm font-bold text-gray-900 leading-tight">{item.name}</div>
                          <div className="text-[11.5px] text-gray-500 font-medium mt-0.5">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-['Raleway',sans-serif] text-sm font-extrabold text-gray-900 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-[#ff581b]/30 to-transparent my-1 mx-7"></div>
                  
                  {/* Calculations */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100">
                      <div className="text-sm font-semibold text-gray-500 flex items-center gap-1.5"><i className="fa-solid fa-receipt text-[#ff581b] text-[11px]"></i> Subtotal</div>
                      <div className="font-['Raleway',sans-serif] text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</div>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100">
                        <div className="text-sm font-semibold text-gray-500 flex items-center gap-1.5"><i className="fa-solid fa-tag text-[#ff581b] text-[11px]"></i> Promo (RESTROVA20)</div>
                        <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">−${promoDiscount.toFixed(2)}</div>
                      </div>
                    )}
                    <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100">
                      <div className="text-sm font-semibold text-gray-500 flex items-center gap-1.5"><i className="fa-solid fa-truck-fast text-[#ff581b] text-[11px]"></i> Delivery</div>
                      <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Free ✓</div>
                    </div>
                    <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100">
                      <div className="text-sm font-semibold text-gray-500 flex items-center gap-1.5"><i className="fa-solid fa-box text-[#ff581b] text-[11px]"></i> Insulated Packaging</div>
                      <div className="font-['Raleway',sans-serif] text-sm font-bold text-emerald-600">Included</div>
                    </div>
                    <div className="flex items-center justify-between px-7 py-3">
                      <div className="text-sm font-semibold text-gray-500 flex items-center gap-1.5"><i className="fa-solid fa-percent text-[#ff581b] text-[11px]"></i> VAT (Incl.)</div>
                      <div className="font-['Raleway',sans-serif] text-sm font-bold text-[#ff581b]">${vat.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="bg-gray-900 px-7 py-5 flex items-center justify-between gap-3 relative overflow-hidden">
                    <div>
                      <div className="text-xs font-bold tracking-[2px] uppercase text-white/40">Order Total</div>
                      {promoDiscount > 0 && <div className="text-[11px] text-white/35 mt-1">You save <strong>${promoDiscount.toFixed(2)}</strong> with your promo code</div>}
                    </div>
                    <div className="font-['Raleway',sans-serif] text-4xl font-black text-white leading-none tracking-[-2px]"><sup className="text-xl text-[#ff581b] font-bold">$</sup>{total.toFixed(2)}</div>
                  </div>
                  
                  {/* Delivery note */}
                  <div className="px-7 py-3.5 bg-emerald-50 border-t border-emerald-200 flex items-center gap-2.5">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-base"></i>
                    <div className="text-xs font-semibold text-emerald-600"><span className="font-extrabold">Free next-day delivery</span> applied — your order qualifies (over $60)</div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="px-7 py-5 flex flex-col gap-2.5">
                    <Link href="/checkout" className="relative inline-block font-bold text-base uppercase bg-[#ff581b] text-white rounded-full py-[18px] pl-6 pr-[60px] overflow-hidden transition-all duration-300 hover:bg-gray-900 text-center w-full">
                      Proceed to Checkout
                      <span className="absolute top-1/2 right-1.5 w-10 h-10 bg-white rounded-full -translate-y-1/2 transition-all duration-300 group-hover:rotate-45"></span>
                    </Link>
                    <Link href="/checkout" className="flex items-center justify-center gap-2 text-base font-bold bg-transparent text-gray-900 border-2 border-gray-200 rounded-full py-[15px] px-6 hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-all duration-300 w-full">
                      <i className="fa-brands fa-apple"></i> Pay with Apple Pay
                    </Link>
                  </div>
                  
                  {/* Payment icons */}
                  <div className="px-7 py-3.5 border-t border-gray-100 flex items-center justify-center gap-2.5 flex-wrap">
                    <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-500">We accept</span>
                    <div className="flex gap-1.5 flex-wrap items-center">
                      {["fa-brands fa-cc-visa", "fa-brands fa-cc-mastercard", "fa-brands fa-cc-amex", "fa-brands fa-apple-pay", "fa-brands fa-google-pay"].map((icon, idx) => (
                        <div key={idx} className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1 text-xl text-gray-800 flex items-center"><i className={icon}></i></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recently viewed */}
                  <div className="px-7 pt-4 pb-6 border-t border-gray-100">
                    <div className="font-['Raleway',sans-serif] text-base font-extrabold text-gray-900 tracking-tight mb-3.5">Recently Viewed</div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { name: "Carbonara Kit", cat: "Meal Kit", price: "$42", img: "/assets/images/shop/product-10.jpg" },
                        { name: "The Restrova Collection", cat: "Gift Set", price: "$98", img: "/assets/images/shop/product-4.jpg" }
                      ].map((item, idx) => (
                        <Link key={idx} href="/shop-details" className="grid grid-cols-[64px_1fr] gap-3 items-center p-3 bg-white rounded-xl border border-gray-100 hover:border-[#ff581b]/20 hover:translate-x-1 hover:shadow-md transition-all">
                          <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#ff581b] mb-0.5">{item.cat}</div>
                            <div className="font-['Raleway',sans-serif] text-xs font-bold text-gray-900 leading-tight">{item.name}</div>
                            <div className="font-['Raleway',sans-serif] text-xs font-extrabold text-[#ff581b] mt-0.5">{item.price}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;