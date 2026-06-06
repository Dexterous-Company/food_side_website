"use client";
import { useState } from "react";

// ── Rupee Icon (replaces $ icon) ─────────────────────────────────────────────
export const RupeeIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: 900,
      lineHeight: 1,
    }}
  >
    &#8377;
  </span>
);

// ── Food images ──────────────────────────────────────────────────────────────
export const foodImgs = {
  wagyu: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  carbonara:
    "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
  truffle:
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80",
  chilli:
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80",
  salmon:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
  redwine:
    "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600&q=80",
  tagliatelle:
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80",
  squidink:
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
  steakrub:
    "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  giftset:
    "https://images.unsplash.com/photo-1606914469633-bd56a1f9cf06?w=600&q=80",
  banner:
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=80",
  hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
};

// ── Products data ─────────────────────────────────────────────────────────────
export const products = [
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
    img: foodImgs.wagyu,
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
    img: foodImgs.carbonara,
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
    img: foodImgs.truffle,
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
    img: foodImgs.chilli,
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
    img: foodImgs.salmon,
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
    img: foodImgs.redwine,
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
    img: foodImgs.tagliatelle,
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
    img: foodImgs.squidink,
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
    img: foodImgs.steakrub,
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
    img: foodImgs.giftset,
  },
];

// ── Stars ────────────────────────────────────────────────────────────────────
export function Stars({ rating }) {
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          style={{
            width: "10px",
            height: "10px",
            fill: i <= Math.round(rating) ? "#f59e0b" : "none",
            stroke: "#f59e0b",
            strokeWidth: 2,
          }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ badge, type }) {
  const styles = {
    hot: {
      background: "#ff581b",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(255,88,27,0.4)",
    },
    new: { background: "rgba(26,26,26,0.85)", color: "#fff" },
    sale: {
      background: "rgba(255,255,255,0.92)",
      color: "#b91c1c",
      border: "1px solid #fecaca",
    },
    bestseller: {
      background: "rgba(255,255,255,0.92)",
      color: "#92400e",
      border: "1px solid #fde68a",
    },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "9px",
        fontWeight: 800,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: "999px",
        backdropFilter: "blur(4px)",
        ...(styles[type] || {
          background: "rgba(255,255,255,0.9)",
          color: "#1a1a1a",
        }),
      }}
    >
      {badge}
    </span>
  );
}

// ── Price display with ₹ (rupee) icon ────────────────────────────────────────
function VegIndicator({ isVeg }) {
  const color = isVeg ? "#16a34a" : "#dc2626";

  return (
    <span
      title={isVeg ? "Veg" : "Non Veg"}
      aria-label={isVeg ? "Veg" : "Non Veg"}
      style={{
        width: "26px",
        height: "26px",
        borderRadius: "6px",
        border: `2px solid ${color}`,
        background: "rgba(255,255,255,0.94)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.16)",
      }}
    >
      <span
        style={{
          width: "11px",
          height: "11px",
          borderRadius: "50%",
          background: color,
          display: "block",
        }}
      />
    </span>
  );
}

function PriceDisplay({ price, originalPrice, large = false }) {
  return (
    <div
      style={{
        fontFamily: "Georgia,serif",
        fontWeight: 900,
        color: "#1a1a1a",
        lineHeight: 1,
      }}
    >
      {originalPrice && (
        <s
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            fontWeight: 400,
            marginRight: "4px",
          }}
        >
          <RupeeIcon />
          {originalPrice}
        </s>
      )}
      <span
        style={{
          fontSize: large ? "22px" : "15px",
          color: "#ff581b",
          fontWeight: 700,
          verticalAlign: "super",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <RupeeIcon />
      </span>
      <span style={{ fontSize: large ? "52px" : "28px" }}>{price}</span>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
export function ProductCard({ p, item, viewMode }) {
  p = item || p;
  const [hover, setHover] = useState(false);

  // ── List view ──────────────────────────────────────────────────────────────
  if (viewMode === "list")
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: hover
            ? "1px solid rgba(255,88,27,0.2)"
            : "1px solid rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          transition: "all 0.4s",
          transform: hover ? "translateY(-6px)" : "none",
          boxShadow: hover
            ? "0 20px 40px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{ height: "4px", background: "#ff581b", gridColumn: "1/-1" }}
        />
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "180px",
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s",
              transform: hover ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top,rgba(0,0,0,0.2),transparent)",
            }}
          />
          {p.badge && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                zIndex: 5,
              }}
            >
              <Badge badge={p.badge} type={p.badgeType} />
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 5,
            }}
          >
            <VegIndicator isVeg={p.isVeg} />
          </div>
        </div>
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#ff581b",
              marginBottom: "4px",
            }}
          >
            {p.category}
          </div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "18px",
              fontWeight: 800,
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            {p.name}
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: 1.6,
              marginBottom: "auto",
              paddingBottom: "12px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {p.desc}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <PriceDisplay price={p.price} originalPrice={p.originalPrice} />
            <button
              style={{
                background: "#ff581b",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0 16px",
                height: "38px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap", // important
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              Add to Cart
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "11px",
                  height: "11px",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2.5,
                }}
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );

  // ── Grid view ──────────────────────────────────────────────────────────────
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: hover
          ? "1px solid rgba(255,88,27,0.2)"
          : "1px solid rgba(0,0,0,0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s",
        transform: hover ? "translateY(-8px)" : "none",
        boxShadow: hover
          ? "0 20px 40px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ height: "4px", background: "#ff581b", flexShrink: 0 }} />
      <div
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={p.img}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s",
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top,rgba(0,0,0,0.35),transparent)",
            zIndex: 2,
          }}
        />
        {p.badge && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 5,
            }}
          >
            <Badge badge={p.badge} type={p.badgeType} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 5,
          }}
        >
          <VegIndicator isVeg={p.isVeg} />
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#ff581b",
            marginBottom: "4px",
          }}
        >
          {p.category}
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: "18px",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "8px",
          }}
        >
          {p.name}
        </div>
        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: 1.6,
            marginBottom: "auto",
            paddingBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {p.desc}
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(0,0,0,0.06)",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <PriceDisplay price={p.price} originalPrice={p.originalPrice} />
          <button
            style={{
              background: "#ff581b",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "0 16px",
              height: "38px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Add to Cart
            <svg
              viewBox="0 0 24 24"
              style={{
                width: "11px",
                height: "11px",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2.5,
              }}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Featured Banner (uses products data from this file) ──────────────────────
export function FeaturedBanner() {
  const featured = products.find((p) => p.badge === "Best Seller");
  return (
    <div
      style={{
        position: "relative",
        height: "200px",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      <img
        src={foodImgs.banner}
        alt="banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.4) saturate(0.5)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          gap: "24px",
        }}
        className="feat-banner-inner"
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#ff581b",
              marginBottom: "8px",
            }}
          >
            ⭐ Most Popular Kit
          </div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "28px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "6px",
            }}
          >
            {featured?.name}
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
              maxWidth: "400px",
            }}
          >
            Our most celebrated dish — brought to your kitchen with step-by-step
            chef guidance.
          </p>
        </div>
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: "52px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                color: "#ff581b",
                fontWeight: 700,
                marginTop: "10px",
              }}
            >
              <RupeeIcon />
            </span>
            <span>{featured?.price}</span>
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginTop: "4px",
            }}
          >
            Per Serving Kit
          </div>
        </div>
      </div>
    </div>
  );
}
