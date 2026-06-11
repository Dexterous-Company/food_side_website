// components/Chefs.jsx
"use client";
import React, { useEffect } from 'react';
import AOS from '../../../utils/aos';

const Chefs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const chefs = [
    { name: "Marco Rossi", role: "Executive Chef", specialty: "Italian · French · Wood-Fired", image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=500&fit=crop", social: { instagram: "#", facebook: "#", twitter: "#" } },
    { name: "Priya Nair", role: "Pastry Chef", specialty: "Patisserie · Chocolate · Plated Desserts", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop", social: { instagram: "#", facebook: "#", twitter: "#" } },
    { name: "James Carter", role: "Grill Master", specialty: "BBQ · Prime Cuts · Smoke", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop", social: { instagram: "#", facebook: "#", twitter: "#" } },
    { name: "Michel Clark", role: "Sous Chef", specialty: "Mediterranean · Vegetarian · Sauces", image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=500&fit=crop", social: { instagram: "#", facebook: "#", twitter: "#" } }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Top Curve */}
      <div className="absolute top-0 left-0 right-0 h-[70px] bg-white [clip-path:ellipse(55%_100%_at_50%_0%)]" />
      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-white [clip-path:ellipse(55%_100%_at_50%_100%)]" />
      
      {/* Background Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#ff581b]/15 to-transparent top-[-100px] left-[-150px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#ff581b]/10 to-transparent bottom-[-80px] right-[-100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-[#ff581b] text-xl font-title mb-4">
            <span className="w-9 h-0.5 bg-[#ff581b] rounded-full" /> Our Culinary Team
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            The Chefs Behind <span className="text-[#ff581b] font-title">Every Plate</span>
          </h2>
          <p className="text-white/50">Passion, precision and decades of craft — meet the team that makes every meal unforgettable.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, idx) => (
            <div key={idx} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="relative rounded-2xl overflow-hidden">
                <div className="relative h-[320px] overflow-hidden">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Social Icons */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link href={chef.social.instagram} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] transition-all">
                      <i className="fab fa-instagram text-sm"></i>
                    </Link>
                    <Link href={chef.social.facebook} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] transition-all">
                      <i className="fab fa-facebook-f text-sm"></i>
                    </Link>
                    <Link href={chef.social.twitter} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-[#ff581b] hover:border-[#ff581b] transition-all">
                      <i className="fab fa-twitter text-sm"></i>
                    </Link>
                  </div>
                </div>
                <div className="text-center py-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ff581b] mb-1">{chef.role}</div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff581b] transition-colors">{chef.name}</h4>
                  <p className="text-white/40 text-sm">{chef.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;