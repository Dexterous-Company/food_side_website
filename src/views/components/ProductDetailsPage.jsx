'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Star, Clock, Flame, Users, Minus, Plus, ChevronRight, Heart } from "lucide-react";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Your MongoDB product data
  const product = {
    _id: "69fb08d8eab765dad2e24bec",
    restaurantId: "69f99c192611c0935abd49c3",
    RESTID: "REST1777966105077795",
    name: "Dal Tadka",
    description: "Classic North Indian dal made with yellow lentils, tempered with ghee, garlic, cumin, and traditional spices. Best enjoyed with jeera rice or roti.",
    price: 180,
    discount_price: 159,
    image: "https://res.cloudinary.com/dssdvnei1/image/upload/v1778059478/Menu/Items/omuhmif1ccn8givy62mc.jpg",
    isAvailable: true,
    stock: 40,
    outOfStock: false,
    categoryId: "69fad83efd9d78bce9f01707",
    subcategoryId: "69fad9cbfd9d78bce9f01737",
    createdAt: "2026-05-06T09:24:40.026Z",
    updatedAt: "2026-05-06T09:24:40.026Z",
    __v: 0,
    rating: 5,
    isVeg: true,
    recommended: true,
    trending: true,
    estimateTimePrepareMenuItem: 25
  };

  // Calculate discount percentage
  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  // Nutrition info (you can add this to your database or keep as static)
  const nutritionInfo = {
    calories: 420,
    protein: "12g",
    totalFat: "8g",
    saturatedFat: "3g",
    carbohydrates: "24g",
    sodium: "520mg",
    fiber: "6g"
  };

  // Similar items (you can fetch from your API based on category)
  const similarItems = [
    {
      name: "Jeera Rice",
      category: "RICE",
      description: "Fragrant basmati rice tempered with cumin seeds and fresh coriander.",
      price: 120,
      calories: 280,
      prepTime: "15 min",
      tags: ["Basmati Rice", "Cumin", "Coriander"],
      image: "/api/placeholder/120/120"
    },
    {
      name: "Butter Naan",
      category: "BREAD",
      description: "Soft leavened flatbread brushed with butter, baked in tandoor.",
      price: 45,
      calories: 180,
      prepTime: "10 min",
      tags: ["Tandoor", "Butter", "Flour"],
      image: "/api/placeholder/120/120"
    },
    {
      name: "Tandoori Roti",
      category: "BREAD",
      description: "Whole wheat flatbread cooked in clay oven with a smoky flavor.",
      price: 35,
      calories: 120,
      prepTime: "10 min",
      tags: ["Whole Wheat", "Tandoor", "Smoky"],
      image: "/api/placeholder/120/120"
    }
  ];

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {product.isVeg && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Pure Veg
              </span>
            )}
            {product.recommended && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                Chef's Pick
              </span>
            )}
            {product.trending && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                🔥 Trending
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-6 flex-wrap mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-semibold">{product.rating}</span>
              <span className="text-gray-500 ml-1">(124 ratings)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{product.estimateTimePrepareMenuItem} min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Flame className="w-4 h-4" />
              <span>{nutritionInfo.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
            {product.discount_price && product.discount_price < product.price && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                Save {discountPercentage}%
              </div>
            )}
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.isVeg && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-900">Dietary</span>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-1 w-fit">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Vegetarian
                  </span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.discount_price || product.price)}
                </span>
                {product.discount_price && product.discount_price < product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Taxes included</p>
            </div>

        <div className="mb-8">
  <span className="block text-sm font-semibold text-gray-900 mb-3">
    Quantity
  </span>

  <div className="flex items-center gap-4">
    
    {/* Quantity Buttons */}
    <div className="flex items-center gap-3">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        disabled={!product.isAvailable || product.outOfStock}
        className="w-11 h-11 rounded-full bg-[#FB571B] text-white flex items-center justify-center hover:bg-[#E84A10] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="min-w-[40px] text-center text-xl font-bold text-gray-900">
        {quantity}
      </span>

      <button
        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
        disabled={
          !product.isAvailable ||
          product.outOfStock ||
          quantity >= product.stock
        }
        className="w-11 h-11 rounded-full bg-[#FB571B] text-white flex items-center justify-center hover:bg-[#E84A10] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>

    {/* Add To Cart Button */}
    <button
      className={`flex-1 h-12 rounded-full font-semibold transition-all duration-300 ${
        product.isAvailable &&
        !product.outOfStock &&
        product.stock > 0
          ? "bg-[#FB571B] text-white hover:bg-[#E84A10] hover:shadow-lg hover:shadow-orange-300"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={
        !product.isAvailable ||
        product.outOfStock ||
        product.stock === 0
      }
    >
      {!product.isAvailable ||
      product.outOfStock ||
      product.stock === 0
        ? "Out of Stock"
        : "Add to Cart"}
    </button>
  </div>

  {product.stock > 0 && product.stock <= 10 && (
    <div className="mt-3 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
      <span>🔥</span>
      <span className="text-xs font-medium text-orange-700">
        Only {product.stock} left in stock!
      </span>
    </div>
  )}
</div>

            {/* Delivery info */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Preparation Time: {product.estimateTimePrepareMenuItem} minutes</span>
              </div>
            </div>
          </div>
        </div>


       
      </div>
    </div>
  );
};

export default ProductDetailsPage;