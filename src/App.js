import { useState, useEffect, useRef } from "react";

// ── Real flower images from Pexels ──────────────────────────────────────────
const CARD_IMAGES = [
  "https://i.pinimg.com/1200x/dc/5b/af/dc5baf5d77a42cad18af7f8acf463689.jpg",
  "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://i.pinimg.com/1200x/2e/7b/2d/2e7b2df025b4474836447395179eeccf.jpg",
  "https://i.pinimg.com/1200x/96/c9/2d/96c92d0d9f0526f11299fbca37ef61f3.jpg",
  "https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://i.pinimg.com/1200x/32/09/d3/3209d3019750e9b31e1842d0a3af3301.jpg",
];

const HERO_IMAGE =
  process.env.PUBLIC_URL + "/Background.png";

const STORY_IMAGE =
  "https://i.pinimg.com/736x/59/a9/af/59a9afd3b7013c73872c2382089b134a.jpg";

// ── Data ────────────────────────────────────────────────────────────────────
const flowers = [
  {
    id: 1,
    name: "Crimson Garden Rose",
    tagline: "The Queen of Flowers",
    price: "LKR 3,800",
    desc: "Full-bloomed garden roses handpicked at dawn, carrying the deep fragrance of heritage gardens.",
    badge: "Bestseller",
    badgeClass: "",
  },
  {
    id: 2,
    name: "Ivory Peony Cloud",
    tagline: "Soft as a morning dream",
    price: "LKR 4,500",
    desc: "Lush peonies bursting with silk-like petals, evoking romance and tender celebration.",
    badge: "New Arrival",
    badgeClass: "",
  },
  {
    id: 3,
    name: "Violet Lavender Mist",
    tagline: "Calm, wild, infinite",
    price: "LKR 2,900",
    desc: "Sun-dried lavender bundled with eucalyptus sprigs for a serene, aromatic arrangement.",
    badge: "Seasonal",
    badgeClass: "",
  },
  {
    id: 4,
    name: "Blush Ranunculus Wrap",
    tagline: "Layers upon layers of grace",
    price: "LKR 5,200",
    desc: "Dozens of delicate petals spiraling inward, creating a hypnotic layered effect in soft blush.",
    badge: "Luxury",
    badgeClass: "luxury",
  },
  {
    id: 5,
    name: "Saffron Sunflower Burst",
    tagline: "Pure joy, bottled in gold",
    price: "LKR 3,200",
    desc: "Giant sunflowers that turn heads and fill rooms with warmth, celebration, and golden light.",
    badge: "Popular",
    badgeClass: "",
  },
  {
    id: 6,
    name: "Midnight Calla Lily",
    tagline: "Elegance in silence",
    price: "LKR 6,800",
    desc: "Rare dark calla lilies for those who appreciate bold, dramatic, and deeply sophisticated beauty.",
    badge: "Rare",
    badgeClass: "rare",
  },
];

const occasions = [
  { icon: "💍", label: "Weddings" },
  { icon: "🎂", label: "Birthdays" },
  { icon: "🌿", label: "Sympathy" },
  { icon: "💼", label: "Corporate" },
  { icon: "💝", label: "Romance" },
  { icon: "🎓", label: "Graduation" },
];

const testimonials = [
  {
    q: "The roses arrived in perfect condition and lasted two full weeks. The wrapping was like opening a gift from another century.",
    name: "Amara D.",
    loc: "Colombo 7",
    icon: "🌹",
  },
  {
    q: "I've ordered from florists across the world. MalKade arrangements have a soul that most simply don't. Pure emotion in every stem.",
    name: "Ravi P.",
    loc: "Negombo",
    icon: "🌸",
  },
  {
    q: "Our wedding flowers were beyond anything we imagined. They captured exactly what we felt without a single word.",
    name: "Nisha & Kavin",
    loc: "Kandy",
    icon: "🌿",
  },
];

// ── Hooks ───────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, ref]);
  return inView;
}

function AnimSection({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function MalKade() {
  const [activeOccasion, setActiveOccasion] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = (id) => {
    setCartCount((c) => c + 1);
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
        background: "#FEFDFB",
        color: "#1A1A1A",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Noto+Serif+Sinhala:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #E8F4F1; }
        ::-webkit-scrollbar-thumb { background: #2D5039; border-radius: 3px; }
        .sinhala-text { font-family: 'Noto Serif Sinhala', Georgia, serif; font-weight: 400; }
        .btn-primary {
          background: #2D5039; color: #FEFDFB; border: none;
          padding: 13px 32px; font-family: 'Jost', sans-serif;
          font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
          cursor: pointer; transition: all .3s;
        }
        .btn-primary:hover { background: #1F4D3A; transform: translateY(-2px); }
        .btn-outline {
          background: transparent; color: #2D5039; border: 1.5px solid #2D5039;
          padding: 11px 28px; font-family: 'Jost', sans-serif;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: all .3s;
        }
        .btn-outline:hover { background: #2D5039; color: #FEFDFB; }
        .card-wrap {
          background: #fff; border: 1px solid rgba(127,212,196,.22);
          overflow: hidden; position: relative;
          transition: transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s;
        }
        .card-wrap:hover { transform: translateY(-10px) scale(1.015); box-shadow: 0 28px 56px rgba(60,40,20,.13); }
        .card-wrap:hover .card-img { transform: scale(1.1); }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.16,1,.3,1); }
        .pill-btn {
          cursor: pointer; border: 1px solid #7FD4C4; background: transparent;
          padding: 10px 20px; font-family: 'Jost', sans-serif;
          font-size: 12px; letter-spacing: 1.5px; transition: all .3s;
        }
        .pill-btn:hover, .pill-active { background: #2D5039 !important; color: #FEFDFB !important; border-color: #2D5039 !important; }
        .nav-link {
          text-decoration: none; color: #3D4037; font-family: 'Jost', sans-serif;
          font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
          opacity: .8; transition: opacity .2s;
        }
        .nav-link:hover { opacity: 1; }
        .footer-link { font-size: 12px; margin-bottom: 9px; cursor: pointer; transition: color .2s; color: rgba(254,253,251,.55); }
        .footer-link:hover { color: #FEFDFB; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hero-anim > * { opacity: 0; animation: fadeIn .9s ease forwards; }
        .d1{animation-delay:.15s} .d2{animation-delay:.35s} .d3{animation-delay:.55s}
        .d4{animation-delay:.75s} .d5{animation-delay:.95s}
        .hero-right-img { transition: transform 8s ease; }
        .hero-right-img:hover { transform: scale(1.03) !important; }
        
        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 1024px) {
          .btn-primary, .btn-outline {
            padding: 11px 24px;
            font-size: 10px;
          }
          .pill-btn {
            padding: 8px 16px;
            font-size: 11px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-link {
            font-size: 10px;
            margin: 0 10px !important;
          }
          .btn-primary, .btn-outline {
            padding: 10px 18px;
            font-size: 9px;
            min-height: 44px;
          }
          .pill-btn {
            padding: 8px 14px;
            font-size: 10px;
          }
          .footer-link { font-size: 11px; }
          .card-wrap:hover { transform: translateY(-6px) scale(1.01); }
        }
        
        @media (max-width: 640px) {
          .nav-link {
            display: none;
          }
          .btn-primary, .btn-outline {
            padding: 10px 16px;
            font-size: 8px;
            letter-spacing: 1.5px;
            width: 100%;
          }
          .pill-btn {
            padding: 7px 12px;
            font-size: 9px;
            letter-spacing: 1px;
            flex: 1;
            min-width: 75px;
          }
          .footer-link { font-size: 10px; }
          .card-wrap:hover { transform: translateY(-4px) scale(1.005); }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          padding: "0 4%", height: "auto",
          minHeight: 70,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrollY > 60 ? "rgba(254,253,251,0.96)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(14px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(127,212,196,.25)" : "none",
          transition: "all .4s",
          flexWrap: "wrap",
        }}
      >
        <img src={process.env.PUBLIC_URL + "/MalKade_LogoTT.png"} alt="MalKade Logo" style={{ height: "clamp(24px, 4vw, 30px)", objectFit: "contain", flexShrink: 0 }} />
        <div style={{ display: "flex", gap: "clamp(8px, 2vw, 16px)", alignItems: "center" }}>
          {["Collections", "Occasions", "Story", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ margin: "0 clamp(8px, 1vw, 16px)" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(10px, 2vw, 12px)", letterSpacing: 2, textTransform: "uppercase", color: "#2D5039", cursor: "pointer", position: "relative", flexShrink: 0 }}>
          🛒 Bag
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: -8, right: -12, background: "#C0392B",
              color: "white", borderRadius: "50%", width: 17, height: 17,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9,
            }}>{cartCount}</span>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="collections"
        style={{
          minHeight: "100vh", display: "flex",
          alignItems: "center", justifyContent: "flex-start",
          overflow: "hidden", position: "relative",
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          marginTop: "clamp(70px, 15vw, 100px)",
        }}
      >
        {/* Background Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(254,253,251,0.92) 0%, rgba(254,253,251,0.7) 40%, transparent 100%)" }} />

        <div
          className="hero-anim"
          style={{
            position: "relative", zIndex: 1,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "clamp(40px, 8vw, 120px) clamp(20px, 5%, 7%) clamp(40px, 8vw, 80px)",
            maxWidth: "clamp(300px, 90%, 600px)",
            width: "100%",
          }}
        >
          <p className="d1" style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(2px, 1vw, 4px)", textTransform: "uppercase", color: "#2D5039", marginBottom: "clamp(14px, 3vw, 22px)" }}>
            ✦ Mal Artistry from Sri Lanka
          </p>
          <h1 className="d2" style={{ fontSize: "clamp(32px, 8vw, 82px)", fontWeight: 300, lineHeight: 1.05, color: "#1A2E25", letterSpacing: -1, marginBottom: "clamp(14px, 3vw, 22px)", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Where <span style={{ fontFamily: "'Noto Serif Sinhala', Georgia, serif", fontWeight: 400, color: "#2D5039", letterSpacing: 0.5 }}>මල්</span><br /><em style={{ fontStyle: "italic", color: "#2D5039" }}>stories in bloom</em>
          </h1>
          <p className="d3" style={{ fontSize: "clamp(13px, 3.5vw, 16px)", fontWeight: 300, lineHeight: 1.75, color: "#4A4A3A", maxWidth: 390, marginBottom: "clamp(20px, 4vw, 34px)" }}>
            Each bouquet is a handcrafted poem. We work with the finest seasonal blooms, wrapped in the tradition of Sri Lanka's garden culture.
          </p>
          <div className="d4" style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Bouquets
            </button>
            <button className="btn-outline" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
              Our Story
            </button>
          </div>
          <div className="d5" style={{ display: "flex", gap: "clamp(16px, 5vw, 36px)", marginTop: "clamp(24px, 5vw, 40px)", paddingTop: "clamp(14px, 3vw, 26px)", borderTop: "1px solid rgba(196,168,130,.4)", flexWrap: "wrap" }}>
            {[["200+", "Flower Varieties"], ["12", "Years Crafting"], ["4,000+", "Happy Clients"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 500, color: "#2D5039" }}>{n}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(8px, 1.5vw, 10px)", letterSpacing: "clamp(1px, 1vw, 1.5px)", textTransform: "uppercase", color: "#888", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "#2D5039", padding: "clamp(8px, 2vw, 14px) 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{
          display: "inline-flex", gap: "clamp(30px, 5vw, 52px)",
          animation: "marquee 100s linear infinite",
          fontFamily: "'Jost', sans-serif", fontSize: "clamp(8px, 2vw, 11px)", letterSpacing: "clamp(1.5px, 1vw, 3px)",
          textTransform: "uppercase", color: "#A8DDD9",
        }}>
          {Array(8).fill(["✦ Same Day Delivery", "✦ Hand-Tied Bouquets", "✦ Fresh From Garden", "✦ Custom Orders Welcome", "✦ Free Delivery Over LKR 5000", "✦ 100% Sustainable Wrapping"]).flat().map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── OCCASIONS ── */}
      <section id="occasions" style={{ padding: "clamp(40px, 8vw, 80px) clamp(20px, 5%, 7%)", background: "#FAFAF7", textAlign: "center" }}>
        <AnimSection>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(2px, 1vw, 4px)", textTransform: "uppercase", color: "#2D5039", marginBottom: 14 }}>
            Mal Kade - Shop by Mood
          </p>
          <h2 style={{ fontSize: "clamp(24px, 5vw, 50px)", fontWeight: 300, color: "#1A2E25" }}>
            Every occasion, <em style={{ fontStyle: "italic" }}>perfectly bloomed</em>
          </h2>
        </AnimSection>
        <AnimSection delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(6px, 2vw, 10px)", justifyContent: "center", marginTop: "clamp(20px, 4vw, 30px)" }}>
            {occasions.map(({ icon, label }) => (
              <button
                key={label}
                className={`pill-btn ${activeOccasion === label ? "pill-active" : ""}`}
                onClick={() => setActiveOccasion(activeOccasion === label ? null : label)}
              >
                {icon} <span style={{ display: "none" }} >{label}</span>
              </button>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ── COLLECTION GRID ── */}
      <section id="collection" style={{ padding: "clamp(40px, 8vw, 100px) clamp(20px, 5%, 7%)" }}>
        <AnimSection>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(24px, 4vw, 36px)", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(2px, 1vw, 4px)", textTransform: "uppercase", color: "#2D5039", marginBottom: 10 }}>
                Mal Collection
              </p>
              <h2 style={{ fontSize: "clamp(24px, 5vw, 50px)", fontWeight: 300, color: "#1A2E25" }}>Signature Bouquets</h2>
            </div>
            <a href="/malkade" style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(10px, 2vw, 12px)", letterSpacing: "clamp(1.5px, 1vw, 2px)", textTransform: "uppercase", color: "#2D5039", textDecoration: "none", borderBottom: "1px solid #2D5039", paddingBottom: 2 }}>
              View All →
            </a>
          </div>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(14px, 3vw, 22px)" }}>
          {flowers.map((f, i) => (
            <AnimSection key={f.id} delay={i * 0.08}>
              <div className="card-wrap">
                {/* Badge */}
                <span style={{
                  position: "absolute", top: 14, left: 14, zIndex: 2,
                  background: f.badgeClass === "luxury" ? "#1A2E25" : f.badgeClass === "rare" ? "#2C3E50" : "#2D5039",
                  color: "#FEFDFB", padding: "5px 12px",
                  fontFamily: "'Jost', sans-serif", fontSize: "clamp(8px, 1.5vw, 9px)", letterSpacing: "clamp(1.5px, 1vw, 2.5px)", textTransform: "uppercase",
                }}>
                  {f.badge}
                </span>
                {/* Image */}
                <div style={{ height: "clamp(180px, 40vw, 230px)", overflow: "hidden", position: "relative" }}>
                  <img src={CARD_IMAGES[i]} alt={f.name} className="card-img" loading="lazy" />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(transparent,rgba(255,255,255,.9))" }} />
                </div>
                {/* Content */}
                <div style={{ padding: "clamp(14px, 3vw, 20px)" }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(8px, 1.5vw, 10px)", letterSpacing: "clamp(1.5px, 1vw, 2.5px)", textTransform: "uppercase", color: "#7FD4C4", marginBottom: 7 }}>
                    {f.tagline}
                  </p>
                  <h3 style={{ fontSize: "clamp(15px, 3vw, 19px)", fontWeight: 400, color: "#1A2E25", marginBottom: 8 }}>{f.name}</h3>
                  <p style={{ fontSize: "clamp(12px, 2vw, 13px)", fontWeight: 300, lineHeight: 1.6, color: "#6A6A5A", marginBottom: 16 }}>{f.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: 500, color: "#2D5039" }}>{f.price}</span>
                    <button
                      className="btn-primary"
                      style={{ padding: "clamp(8px, 2vw, 9px) clamp(12px, 3vw, 18px)", fontSize: "clamp(8px, 1.5vw, 10px)", background: added === f.id ? "#1F4D3A" : "#2D5039" }}
                      onClick={() => handleAdd(f.id)}
                    >
                      {added === f.id ? "✓ Added" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" style={{ background: "#1A2E25", color: "#FEFDFB", padding: "clamp(40px, 8vw, 100px) clamp(20px, 5%, 7%)", position: "relative", overflow: "hidden" }}>
        <AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(30px, 8vw, 70px)", alignItems: "center" }}>
            {/* Image */}
            <div style={{ height: "clamp(300px, 50vw, 460px)", overflow: "hidden", position: "relative", order: 2 }}>
              <img
                src={STORY_IMAGE}
                alt="Sri Lankan floral heritage"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 6s ease" }}
                onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                onMouseOut={e => e.target.style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(26,46,37,.25) 0%,transparent 60%)" }} />
            </div>
            {/* Text */}
            <div style={{ order: 1 }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(2px, 1vw, 4px)", textTransform: "uppercase", color: "#A8DDD9", marginBottom: "clamp(12px, 2vw, 18px)" }}>
                Mal Heritage
              </p>
              <h2 style={{ fontSize: "clamp(26px, 6vw, 54px)", fontWeight: 300, lineHeight: 1.15, marginBottom: "clamp(14px, 3vw, 22px)", color: "#FEFDFB" }}>
                Rooted in Sri Lanka's<br /><em style={{ fontStyle: "italic", color: "#7FD4C4" }}>floral tradition</em>
              </h2>
              <p style={{ fontSize: "clamp(13px, 2.5vw, 15px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(245,236,215,.72)", marginBottom: "clamp(12px, 2vw, 16px)" }}>
                MalKade was born from a grandmother's garden in Negombo — where jasmine threaded through frangipani and hibiscus opened at dawn. We carry that legacy into every hand-tied arrangement.
              </p>
              <p style={{ fontSize: "clamp(13px, 2.5vw, 15px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(245,236,215,.72)", marginBottom: "clamp(16px, 3vw, 24px)" }}>
                Our florists are trained in both classical Sri Lankan garland-making and contemporary European arrangement. The result is something truly singular.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {[
                  ["Hand-picked", "Every bloom selected at peak freshness by our master florists"],
                  ["Same-day", "Order before noon for same-day delivery across Colombo & Negombo"],
                  ["Seasonal", "Bouquets designed around what's naturally blooming this month"],
                  ["Sustainable", "Compostable wraps, no floral foam, and a garden-to-door ethos"],
                ].map(([title, sub]) => (
                  <div key={title} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(196,168,130,.18)", padding: "20px 16px" }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#7FD4C4", marginBottom: 7 }}>{title}</div>
                    <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(245,236,215,.58)", lineHeight: 1.7 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <button
                className="btn-outline"
                style={{ borderColor: "#7FD4C4", color: "#7FD4C4" }}
                onMouseOver={e => { e.target.style.background = "#7FD4C4"; e.target.style.color = "#1A2E25"; }}
                onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "#7FD4C4"; }}
              >
                Read Our Story
              </button>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) clamp(20px, 5%, 7%)", background: "#FEFDFB" }}>
        <AnimSection>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(2px, 1vw, 4px)", textTransform: "uppercase", color: "#2D5039", marginBottom: 14, textAlign: "center" }}>Voice of Love</p>
          <h2 style={{ fontSize: "clamp(24px, 5vw, 50px)", fontWeight: 300, color: "#1A2E25", textAlign: "center" }}>
            Said it with <em style={{ fontStyle: "italic" }}>Mal</em>
          </h2>
        </AnimSection>
        <AnimSection delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(12px, 3vw, 18px)", marginTop: "clamp(30px, 5vw, 44px)" }}>
            {testimonials.map(({ q, name, loc, icon }) => (
              <div key={name} style={{ background: "#FAFAF7", border: "1px solid rgba(196,168,130,.28)", padding: "clamp(18px, 4vw, 28px)" }}>
                <div style={{ fontSize: "clamp(20px, 4vw, 26px)", marginBottom: "clamp(10px, 2vw, 14px)" }}>{icon}</div>
                <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 300, lineHeight: 1.7, color: "#4A4A3A", fontStyle: "italic", marginBottom: "clamp(12px, 2vw, 18px)" }}>\"{q}\"</p>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(11px, 2vw, 12px)", fontWeight: 500, color: "#2D5039", letterSpacing: .8 }}>{name}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 1.5vw, 10px)", color: "#999", letterSpacing: "clamp(1px, 1vw, 1.5px)", textTransform: "uppercase", marginTop: 3 }}>{loc}</div>
              </div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", minHeight: "clamp(300px, 60vw, 480px)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,46,37,.72)" }} />
        <AnimSection style={{ position: "relative", zIndex: 2, padding: "clamp(30px, 5vw, 50px) clamp(20px, 5%, 7%)" }}>
          <h2 style={{ fontSize: "clamp(26px, 6vw, 58px)", fontWeight: 300, color: "#FEFDFB", marginBottom: "clamp(10px, 2vw, 14px)", lineHeight: 1.2, fontFamily: "'Noto Sans Sinhala', 'Playfair Display', Georgia, serif" }}>
            මල් Kade<br /><em style={{ fontStyle: "italic", color: "#7FD4C4" }}>without words?</em>
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(11px, 2.5vw, 13px)", color: "rgba(245,236,215,.65)", letterSpacing: "clamp(0.5px, 1vw, 1px)", marginBottom: "clamp(20px, 4vw, 30px)" }}>
            Custom bouquets crafted within 24 hours. Free delivery on orders over LKR 5,000.
          </p>
          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ background: "#FEFDFB", color: "#1A2E25" }}
              onMouseOver={e => e.target.style.background = "#E8F4F1"} onMouseOut={e => e.target.style.background = "#FEFDFB"}>
              Order Now
            </button>
            <button className="btn-outline" style={{ borderColor: "rgba(127,212,196,.5)", color: "#FEFDFB" }}
              onMouseOver={e => e.target.style.background = "rgba(245,236,215,.12)"} onMouseOut={e => e.target.style.background = "transparent"}>
              WhatsApp Us
            </button>
          </div>
        </AnimSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111A14", color: "rgba(245,236,215,.55)", padding: "clamp(30px, 5vw, 50px) clamp(20px, 5%, 7%)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(24px, 5vw, 40px)", marginBottom: "clamp(30px, 5vw, 40px)" }}>
          <div>
            <img src={process.env.PUBLIC_URL + "/MalKade_LogoFooter.png"} alt="MalKade Logo" style={{ height: "clamp(16px, 3vw, 20px)", objectFit: "contain", marginBottom: "clamp(8px, 2vw, 10px)" }} />
            <p style={{ fontSize: "clamp(11px, 2vw, 12.5px)", fontWeight: 300, lineHeight: 1.8, maxWidth: 210 }}>Handcrafted floral arrangements rooted in Sri Lanka's garden heritage.</p>
          </div>
          {[
            { head: "Shop", links: ["All Bouquets", "Wedding", "Sympathy", "Corporate", "Custom Order"] },
            { head: "Company", links: ["Our Story", "Sustainability", "Careers", "Press"] },
            { head: "Contact", links: ["WhatsApp", "Instagram", "Email Us", "Visit Studio"] },
          ].map(({ head, links }) => (
            <div key={head}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(8px, 2vw, 10px)", letterSpacing: "clamp(1.5px, 1vw, 3px)", textTransform: "uppercase", color: "#7FD4C4", marginBottom: "clamp(10px, 2vw, 16px)" }}>{head}</div>
              {links.map((l) => <div key={l} className="footer-link" style={{ fontSize: "clamp(9px, 1.5vw, 12px)" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(196,168,130,.12)", paddingTop: "clamp(12px, 2vw, 20px)", display: "flex", justifyContent: "space-between", fontFamily: "'Jost', sans-serif", fontSize: "clamp(9px, 1.5vw, 11px)", flexWrap: "wrap", gap: 10 }}>
          <span>© 2025 MalKade. All rights reserved.</span>
          <span>Galle, Sri Lanka 🇱🇰</span>
        </div>
      </footer>
    </div>
  );
}