import { useState } from "react";

const COLORS = {
  navy: "#0F1B2D",
  navyMid: "#1E3A5F",
  amber: "#F5A623",
  amberLight: "#FEF3DC",
  white: "#FFFFFF",
  slate: "#F4F6F9",
  border: "#E2E8F0",
  textPrimary: "#0F1B2D",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  success: "#10B981",
  error: "#EF4444",
  purple: "#7C3AED",
};

const POST_TYPES = [
  {
    id: "testimonials",
    label: "Testimonials & Reviews",
    icon: "❝",
    accentColor: "#6C5CE7",
    accentLight: "#F0EEFF",
    description: "Turn feedback into credible social proof",
    subtitle: "Showcase customer love and build trust with engaging review posts.",
    features: ["Customer testimonials", "Product reviews", "Star ratings", "Multiple reviews"],
    templates: 24,
    carousel: [
      {
        bg: "#F0EEFF", accent: "#6C5CE7", quote: "The product is amazing and the support team was incredibly helpful!", stars: 5,
        name: "Priya Sharma", role: "Marketing Head, Bloom Co.", hasAvatar: true,
      },
      {
        bg: "#FFF8E7", accent: "#F5A623", quote: "Excellent service and quality! Highly recommend to everyone.", stars: 5,
        name: "Rohit Verma", role: "Co-founder, GreenLife", hasAvatar: true,
      },
      {
        bg: "#0F1B2D", accent: "#F5A623", quote: "Our customers love what we do.", stars: 5,
        name: "Ananya Rao", role: "CEO, TechNova", hasAvatar: true,
      },
      {
        bg: "#E8F5E9", accent: "#2E7D32", quote: "Transformed our workflow completely. Can't imagine going back.", stars: 5,
        name: "James Liu", role: "CTO, BuildFast", hasAvatar: false,
      },
    ],
  },
  {
    id: "events",
    label: "Announcements",
    icon: "📣",
    accentColor: "#00B894",
    accentLight: "#E8F8F5",
    description: "Announce events that get noticed",
    subtitle: "Promote webinars, conferences and live events with speaker highlights and clear CTAs.",
    features: ["Event & webinar banners", "Speaker spotlights", "Date & location details", "Registration CTAs"],
    templates: 18,
    carousel: [
      {
        bg: "#E8F8F5", accent: "#00B894", label: "WEBINAR", title: "The Future of Digital Marketing", date: "May 24, 2025 · 11:00 AM IST", hasAvatar: true,
      },
      {
        bg: "#0F1B2D", accent: "#00B894", label: "CONFERENCE", title: "Growth Summit 2025", date: "Jun 10, 2025 · San Francisco", hasAvatar: false,
      },
      {
        bg: "#FFF3E0", accent: "#F57C00", label: "LIVE EVENT", title: "Product Launch — Next Gen", date: "Jul 1, 2025 · Online", hasAvatar: true,
      },
    ],
  },
  {
    id: "offers",
    label: "Offers & Promotions",
    icon: "🏷",
    accentColor: "#E84393",
    accentLight: "#FFF0F7",
    description: "Deals that stop the scroll",
    subtitle: "Drive conversions with bold promotional creatives for discounts, flash sales and limited-time offers.",
    features: ["Flash sale banners", "Promo codes", "Product highlights", "Limited-time offers"],
    templates: 21,
    carousel: [
      {
        bg: "#FFF8DC", accent: "#E67E22", offerTitle: "SUMMER SALE", discount: "30% OFF", sub: "On everything", hasProduct: true,
      },
      {
        bg: "#FFF0F7", accent: "#E84393", offerTitle: "FLASH DEAL", discount: "BUY 1 GET 1", sub: "This weekend only", hasProduct: false,
      },
      {
        bg: "#0F1B2D", accent: "#E84393", offerTitle: "EXCLUSIVE", discount: "50% OFF", sub: "Use code SAVE50", hasProduct: true,
      },
    ],
  },
  {
    id: "milestones",
    label: "Milestones",
    icon: "🏆",
    accentColor: "#F5A623",
    accentLight: "#FEF3DC",
    isNew: true,
    description: "Celebrate wins worth sharing",
    subtitle: "Highlight company achievements, anniversaries and growth milestones with shareable creatives.",
    features: ["Company anniversaries", "Follower milestones", "Award announcements", "Team achievements"],
    templates: 12,
    carousel: [
      {
        bg: "#FEF3DC", accent: "#F5A623", milestone: "10K", label: "Followers", sub: "Thank you for your support! 🎉", hasHeart: true,
      },
      {
        bg: "#0F1B2D", accent: "#F5A623", milestone: "5 Years", label: "In Business", sub: "Built with passion, grown with trust.", hasHeart: false,
      },
    ],
  },
];

const STYLES = ["Bold", "Formal", "Casual", "Playful"];

const GALLERY_TEMPLATES = [
  { id: 1,  type: "testimonials", style: "Bold",    reviews: 1, ratingType: "Star",  hasCustomerImage: true,  hasProductImage: false, charLimit: "120", label: "Single Bold Review" },
  { id: 2,  type: "testimonials", style: "Formal",  reviews: 2, ratingType: "Star",  hasCustomerImage: true,  hasProductImage: false, charLimit: "200", label: "Dual Review Clean" },
  { id: 3,  type: "testimonials", style: "Casual",  reviews: 1, ratingType: "Emoji", hasCustomerImage: false, hasProductImage: true,  charLimit: "150", label: "Product + Testimonial" },
  { id: 4,  type: "testimonials", style: "Playful", reviews: 3, ratingType: "Emoji", hasCustomerImage: true,  hasProductImage: false, charLimit: "120", label: "Triple Testimonial" },
  { id: 5,  type: "testimonials", style: "Bold",    reviews: 2, ratingType: "Star",  hasCustomerImage: false, hasProductImage: false, charLimit: "200", label: "Quote Highlight" },
  { id: 6,  type: "testimonials", style: "Formal",  reviews: 1, ratingType: "Star",  hasCustomerImage: true,  hasProductImage: true,  charLimit: "150", label: "Review with Product" },
  { id: 15, type: "testimonials", style: "Casual",  reviews: 1, ratingType: "Emoji", hasCustomerImage: true,  hasProductImage: false, charLimit: "120", label: "Friendly Single Review" },
  { id: 16, type: "testimonials", style: "Playful", reviews: 2, ratingType: "Emoji", hasCustomerImage: false, hasProductImage: true,  charLimit: "150", label: "Fun Duo with Product" },
  { id: 7,  type: "events", style: "Bold",    speakers: 1, hasSpeakerImage: true,  linkType: "QR",        label: "Single Speaker Bold" },
  { id: 8,  type: "events", style: "Formal",  speakers: 2, hasSpeakerImage: true,  linkType: "Short URL", label: "Two Speakers Clean" },
  { id: 9,  type: "events", style: "Casual",  speakers: 1, hasSpeakerImage: false, linkType: "None",      label: "Minimal Event Card" },
  { id: 10, type: "events", style: "Playful", speakers: 3, hasSpeakerImage: true,  linkType: "Short URL", label: "Multi-Speaker Fun" },
  { id: 17, type: "events", style: "Bold",    speakers: 2, hasSpeakerImage: false, linkType: "QR",        label: "Bold Duo No Photo" },
  { id: 18, type: "events", style: "Formal",  speakers: 1, hasSpeakerImage: true,  linkType: "None",      label: "Keynote Spotlight" },
  { id: 19, type: "events", style: "Casual",  speakers: 2, hasSpeakerImage: true,  linkType: "Short URL", label: "Friendly Two Speakers" },
  { id: 11, type: "offers", style: "Bold",    hasProductImage: true,  linkType: "QR",        label: "Flash Sale Hero" },
  { id: 12, type: "offers", style: "Casual",  hasProductImage: false, linkType: "Short URL", label: "Promo Code Card" },
  { id: 13, type: "offers", style: "Playful", hasProductImage: true,  linkType: "None",      label: "Product Spotlight" },
  { id: 14, type: "offers", style: "Formal",  hasProductImage: false, linkType: "Short URL", label: "Clean Offer Banner" },
  { id: 20, type: "offers", style: "Bold",    hasProductImage: false, linkType: "None",      label: "Bold Text Offer" },
  { id: 21, type: "offers", style: "Playful", hasProductImage: false, linkType: "QR",        label: "Playful QR Deal" },
  { id: 22, type: "offers", style: "Formal",  hasProductImage: true,  linkType: "QR",        label: "Elegant Product Sale" },
];

const STYLE_COLORS = {
  Bold: { bg: "#0F1B2D", accent: "#F5A623", text: "#FFFFFF" },
  Formal: { bg: "#F8FAFC", accent: "#1E3A5F", text: "#0F1B2D" },
  Casual: { bg: "#FFF7ED", accent: "#FB923C", text: "#7C2D12" },
  Playful: { bg: "#FAF5FF", accent: "#7C3AED", text: "#4C1D95" },
};

function TemplateCard({ template, onClick, saved, onSave }) {
  const [hovered, setHovered] = useState(false);
  const styleCol = STYLE_COLORS[template.style];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: `2px solid ${hovered ? COLORS.amber : COLORS.border}`,
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        background: COLORS.white,
      }}
    >
      {/* Template preview */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, ${styleCol.bg} 0%, ${styleCol.accent}33 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 16,
      }}>
        <div style={{
          background: styleCol.accent + "22",
          border: `1px solid ${styleCol.accent}55`,
          borderRadius: 8,
          padding: "8px 14px",
          marginBottom: 8,
          width: "80%",
        }}>
          <div style={{ height: 6, borderRadius: 3, background: styleCol.accent, width: "60%", marginBottom: 5 }} />
          <div style={{ height: 4, borderRadius: 2, background: styleCol.accent + "88", width: "90%", marginBottom: 3 }} />
          <div style={{ height: 4, borderRadius: 2, background: styleCol.accent + "55", width: "70%" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: styleCol.accent + (i === 1 ? "ff" : "55") }} />
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); onSave(template.id); }}
          style={{
            position: "absolute", top: 8, right: 8,
            background: saved ? COLORS.amber : "rgba(255,255,255,0.2)",
            border: "none", borderRadius: 6, padding: "4px 6px",
            cursor: "pointer", fontSize: 12,
            color: saved ? COLORS.navy : COLORS.white,
          }}
          title={saved ? "Saved" : "Save template"}
        >
          {saved ? "★" : "☆"}
        </button>

        {/* Style chip */}
        <div style={{
          position: "absolute", bottom: 8, left: 8,
          background: styleCol.accent,
          color: styleCol.bg,
          fontSize: 10, fontWeight: 700,
          padding: "2px 8px", borderRadius: 100,
        }}>
          {template.style}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 6 }}>
          {template.label}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {template.charLimit && (
            <span style={{ fontSize: 10, background: COLORS.slate, color: COLORS.textSecondary, padding: "2px 7px", borderRadius: 100 }}>
              Up to {template.charLimit} chars
            </span>
          )}
          {template.reviews && (
            <span style={{ fontSize: 10, background: COLORS.slate, color: COLORS.textSecondary, padding: "2px 7px", borderRadius: 100 }}>
              {template.reviews} review{template.reviews > 1 ? "s" : ""}
            </span>
          )}
          {template.speakers && (
            <span style={{ fontSize: 10, background: COLORS.slate, color: COLORS.textSecondary, padding: "2px 7px", borderRadius: 100 }}>
              {template.speakers} speaker{template.speakers > 1 ? "s" : ""}
            </span>
          )}
          {template.linkType && template.linkType !== "None" && (
            <span style={{ fontSize: 10, background: COLORS.slate, color: COLORS.textSecondary, padding: "2px 7px", borderRadius: 100 }}>
              {template.linkType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Mini carousel template previews
function CarouselPreview({ type, card }) {
  if (type.id === "testimonials") {
    return (
      <div style={{
        background: card.bg, borderRadius: 10, padding: "16px 14px",
        minWidth: 180, maxWidth: 200, flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 180,
      }}>
        <div style={{ fontSize: 22, color: card.accent, fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>"</div>
        <div style={{ fontSize: 12, color: card.bg === "#0F1B2D" ? "#fff" : "#1a1a2e", fontWeight: 600, lineHeight: 1.45, flex: 1, marginBottom: 10 }}>
          {card.quote}
        </div>
        <div>
          <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
            {[1,2,3,4,5].map(n => <span key={n} style={{ color: card.accent, fontSize: 11 }}>★</span>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {card.hasAvatar && (
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: card.accent + "44", flexShrink: 0, border: `1px solid ${card.accent}55` }} />
            )}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: card.bg === "#0F1B2D" ? "#fff" : "#1a1a2e" }}>{card.name}</div>
              <div style={{ fontSize: 9, color: card.bg === "#0F1B2D" ? "rgba(255,255,255,0.6)" : "#888" }}>{card.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type.id === "events") {
    return (
      <div style={{
        background: card.bg, borderRadius: 10, padding: "14px",
        minWidth: 180, maxWidth: 200, flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", minHeight: 180,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: card.accent, marginBottom: 8 }}>{card.label}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: card.bg === "#0F1B2D" ? "#fff" : "#1a1a2e", lineHeight: 1.3, marginBottom: 10 }}>{card.title}</div>
        </div>
        <div>
          {card.hasAvatar && <div style={{ width: 28, height: 28, borderRadius: "50%", background: card.accent + "44", marginBottom: 8, border: `1px solid ${card.accent}55` }} />}
          <div style={{ fontSize: 10, color: card.bg === "#0F1B2D" ? "rgba(255,255,255,0.7)" : "#666", display: "flex", alignItems: "center", gap: 4 }}>
            <span>📅</span> {card.date}
          </div>
        </div>
      </div>
    );
  }
  if (type.id === "offers") {
    return (
      <div style={{
        background: card.bg, borderRadius: 10, padding: "14px",
        minWidth: 160, maxWidth: 180, flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", minHeight: 180,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",
      }}>
        {card.hasProduct && <div style={{ width: 40, height: 40, borderRadius: 8, background: card.accent + "33", marginBottom: 8 }} />}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: card.accent, marginBottom: 4 }}>{card.offerTitle}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: card.bg === "#0F1B2D" ? "#fff" : "#1a1a2e", lineHeight: 1.1, marginBottom: 4 }}>{card.discount}</div>
        <div style={{ fontSize: 10, color: card.bg === "#0F1B2D" ? "rgba(255,255,255,0.6)" : "#888" }}>{card.sub}</div>
      </div>
    );
  }
  if (type.id === "milestones") {
    return (
      <div style={{
        background: card.bg, borderRadius: 10, padding: "14px",
        minWidth: 160, maxWidth: 180, flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", minHeight: 180,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",
      }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: card.accent, lineHeight: 1 }}>{card.milestone}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: card.bg === "#0F1B2D" ? "#fff" : "#1a1a2e", marginBottom: 6 }}>{card.label}</div>
        {card.hasHeart && <div style={{ fontSize: 20, marginBottom: 4 }}>❤️</div>}
        <div style={{ fontSize: 10, color: card.bg === "#0F1B2D" ? "rgba(255,255,255,0.6)" : "#777" }}>{card.sub}</div>
      </div>
    );
  }
  return null;
}

function HomePage({ onSelectType, recentWorks }) {
  const [selectedType, setSelectedType] = useState(POST_TYPES[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showMoreTypes, setShowMoreTypes] = useState(false);

  const visibleTypes = showMoreTypes ? POST_TYPES : POST_TYPES.slice(0, 3);
  const extraTypes = POST_TYPES.slice(3);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setCarouselIndex(0);
  };

  const carousel = selectedType?.carousel || [];
  const visibleCards = 3;
  const maxIndex = Math.max(0, carousel.length - visibleCards);

  const STATUS_COLORS = {
    Draft: { bg: "#EEF2FF", color: "#4F46E5" },
    Downloaded: { bg: "#ECFDF5", color: "#059669" },
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 28px 60px" }}>

      {/* Step 1 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.navy, marginBottom: 4 }}>
          1. What would you like to create?
        </div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 20 }}>
          Pick a post type. We'll show examples and templates that fit.
        </div>

        {/* Tab row */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {visibleTypes.map((type) => {
            const active = selectedType?.id === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleTypeClick(type)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 18px", borderRadius: 10, cursor: "pointer",
                  border: `1.5px solid ${active ? type.accentColor : COLORS.border}`,
                  background: active ? type.accentLight : COLORS.white,
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: active ? type.accentColor : COLORS.slate,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, transition: "background 0.15s",
                }}>
                  {type.icon}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? type.accentColor : COLORS.textPrimary, whiteSpace: "nowrap" }}>
                  {type.label}
                </span>
                {type.isNew && (
                  <span style={{
                    position: "absolute", top: -8, right: -8,
                    background: COLORS.amber, color: COLORS.navy,
                    fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 100,
                  }}>NEW</span>
                )}
              </button>
            );
          })}

          {/* More post types toggle */}
          {!showMoreTypes && extraTypes.length > 0 && (
            <button
              onClick={() => setShowMoreTypes(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "10px 16px", borderRadius: 10, cursor: "pointer",
                border: `1.5px solid ${COLORS.border}`, background: COLORS.white,
                fontSize: 13, color: COLORS.textSecondary, fontWeight: 500,
              }}
            >
              ••• More post types ∨
            </button>
          )}
        </div>

        {/* Expanded panel */}
        {selectedType && (
          <div style={{
            marginTop: 16, border: `1px solid ${COLORS.border}`,
            borderRadius: 14, padding: "24px 24px 24px",
            background: COLORS.white, overflow: "hidden",
          }}>
            <div style={{ display: "flex", gap: 24 }}>
              {/* Left: description + features */}
              <div style={{ width: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.navy, marginBottom: 6, lineHeight: 1.3 }}>
                  {selectedType.description}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 16 }}>
                  {selectedType.subtitle}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {selectedType.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: selectedType.accentLight,
                        border: `1.5px solid ${selectedType.accentColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <span style={{ color: selectedType.accentColor, fontSize: 10, fontWeight: 800 }}>✓</span>
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.textPrimary }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: carousel */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <div style={{ display: "flex", gap: 12, overflow: "hidden" }}>
                  {carousel.slice(carouselIndex, carouselIndex + visibleCards).map((card, i) => (
                    <CarouselPreview key={i} type={selectedType} card={card} />
                  ))}
                </div>

                {/* Carousel controls */}
                {carousel.length > visibleCards && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                    <button
                      onClick={() => setCarouselIndex(i => Math.max(0, i - 1))}
                      disabled={carouselIndex === 0}
                      style={{
                        width: 28, height: 28, borderRadius: "50%", border: `1px solid ${COLORS.border}`,
                        background: COLORS.white, cursor: carouselIndex === 0 ? "not-allowed" : "pointer",
                        fontSize: 13, color: carouselIndex === 0 ? COLORS.border : COLORS.textPrimary,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >‹</button>
                    <div style={{ display: "flex", gap: 5 }}>
                      {Array.from({ length: carousel.length - visibleCards + 1 }).map((_, i) => (
                        <div key={i} onClick={() => setCarouselIndex(i)} style={{
                          width: i === carouselIndex ? 16 : 6, height: 6,
                          borderRadius: 100, background: i === carouselIndex ? selectedType.accentColor : COLORS.border,
                          cursor: "pointer", transition: "all 0.2s",
                        }} />
                      ))}
                    </div>
                    <button
                      onClick={() => setCarouselIndex(i => Math.min(maxIndex, i + 1))}
                      disabled={carouselIndex >= maxIndex}
                      style={{
                        width: 28, height: 28, borderRadius: "50%", border: `1px solid ${COLORS.border}`,
                        background: COLORS.white, cursor: carouselIndex >= maxIndex ? "not-allowed" : "pointer",
                        fontSize: 13, color: carouselIndex >= maxIndex ? COLORS.border : COLORS.textPrimary,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >›</button>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>
              <button
                onClick={() => onSelectType(selectedType)}
                style={{
                  background: COLORS.navy, color: COLORS.white,
                  border: "none", borderRadius: 10, padding: "11px 24px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                Explore {selectedType.label.toLowerCase()} templates →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent works */}
      {recentWorks.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy }}>Continue where you left off</div>
            <button style={{ background: "none", border: "none", fontSize: 13, color: selectedType?.accentColor || COLORS.amber, fontWeight: 600, cursor: "pointer" }}>
              View all works →
            </button>
          </div>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 }}>
            {recentWorks.map((work) => {
              const sc = STYLE_COLORS[work.style] || STYLE_COLORS.Bold;
              const statusStyle = STATUS_COLORS[work.status] || STATUS_COLORS.Draft;
              return (
                <div key={work.id} style={{
                  flexShrink: 0, width: 170, borderRadius: 12, overflow: "hidden",
                  border: `1px solid ${COLORS.border}`, cursor: "pointer",
                  background: COLORS.white,
                  transition: "box-shadow 0.15s",
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    height: 120, position: "relative",
                    background: `linear-gradient(135deg, ${sc.bg} 0%, ${sc.accent}33 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: "65%", background: sc.accent + "22",
                      border: `1px solid ${sc.accent}44`,
                      borderRadius: 6, padding: "8px 10px",
                    }}>
                      <div style={{ height: 5, borderRadius: 3, background: sc.accent, width: "70%", marginBottom: 4 }} />
                      <div style={{ height: 3, borderRadius: 2, background: sc.accent + "88", width: "90%", marginBottom: 3 }} />
                      <div style={{ height: 3, borderRadius: 2, background: sc.accent + "55", width: "55%" }} />
                    </div>
                    {/* Status badge */}
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      background: statusStyle.bg, color: statusStyle.color,
                      fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 100,
                    }}>
                      {work.status}
                    </div>
                    {/* More menu */}
                    <div style={{
                      position: "absolute", bottom: 6, right: 8,
                      color: sc.bg === "#0F1B2D" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)",
                      fontSize: 16, cursor: "pointer",
                    }}>⋮</div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 3 }}>{work.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{work.date}</div>
                  </div>
                </div>
              );
            })}

            {/* New design CTA card */}
            <div style={{
              flexShrink: 0, width: 170, borderRadius: 12,
              border: `2px dashed ${COLORS.border}`, cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              minHeight: 168, gap: 8, color: COLORS.textMuted,
              transition: "border-color 0.15s",
            }}>
              <div style={{ fontSize: 28, color: COLORS.border }}>+</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>New design</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable filter section header
function FilterLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", margin: "14px 0 8px" }}>
      {children}
    </div>
  );
}

// Reusable count button row (1 2 3 4+)
function CountButtons({ values, active, onToggle }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {values.map(n => (
        <button key={n} onClick={() => onToggle(active === n ? null : n)} style={{
          minWidth: 34, height: 30, borderRadius: 7, fontSize: 12, padding: "0 8px",
          border: `1px solid ${active === n ? COLORS.amber : COLORS.border}`,
          background: active === n ? COLORS.amberLight : COLORS.white,
          color: active === n ? COLORS.amber : COLORS.textSecondary,
          cursor: "pointer", fontWeight: active === n ? 700 : 400,
        }}>
          {n}
        </button>
      ))}
    </div>
  );
}

// Reusable tab-chip row (All / With / Without  or  Star / Emoji  or  Short URL / QR / None)
function TabChips({ options, active, onToggle, nullValue = null }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {options.map(opt => {
        const isActive = opt.value === null ? active === nullValue : active === opt.value;
        return (
          <button key={opt.label} onClick={() => onToggle(opt.value)} style={{
            padding: "5px 10px", borderRadius: 100, fontSize: 11,
            border: `1px solid ${isActive ? COLORS.amber : COLORS.border}`,
            background: isActive ? COLORS.amberLight : COLORS.white,
            color: isActive ? COLORS.amber : COLORS.textSecondary,
            cursor: "pointer", fontWeight: isActive ? 600 : 400,
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function GalleryPage({ selectedType, onSelectTemplate, onBack }) {
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Shared
  const [activeStyle, setActiveStyle] = useState(null);

  // Testimonials-specific
  const [reviewCount, setReviewCount] = useState(null);
  const [ratingType, setRatingType] = useState(null);          // "Star" | "Emoji" | null
  const [customerImage, setCustomerImage] = useState(null);    // "with" | "without" | null
  const [productImageT, setProductImageT] = useState(null);    // "with" | "without" | null (testimonials)

  // Events-specific
  const [speakerCount, setSpeakerCount] = useState(null);
  const [speakerImage, setSpeakerImage] = useState(null);      // "with" | "without" | null
  const [linkTypeE, setLinkTypeE] = useState(null);            // "Short URL" | "QR" | "None" | null

  // Offers-specific
  const [productImageO, setProductImageO] = useState(null);    // "with" | "without" | null
  const [linkTypeO, setLinkTypeO] = useState(null);            // "Short URL" | "QR" | "None" | null

  const clearAll = () => {
    setActiveStyle(null);
    setReviewCount(null); setRatingType(null); setCustomerImage(null); setProductImageT(null);
    setSpeakerCount(null); setSpeakerImage(null); setLinkTypeE(null);
    setProductImageO(null); setLinkTypeO(null);
    setShowSavedOnly(false);
  };

  const filtered = GALLERY_TEMPLATES.filter(t => {
    if (t.type !== selectedType.id) return false;
    if (showSavedOnly && !savedTemplates.includes(t.id)) return false;
    if (activeStyle && t.style !== activeStyle) return false;

    if (t.type === "testimonials") {
      if (reviewCount && t.reviews !== reviewCount) return false;
      if (ratingType && t.ratingType !== ratingType) return false;
      if (customerImage === "with" && !t.hasCustomerImage) return false;
      if (customerImage === "without" && t.hasCustomerImage) return false;
      if (productImageT === "with" && !t.hasProductImage) return false;
      if (productImageT === "without" && t.hasProductImage) return false;
    }
    if (t.type === "events") {
      if (speakerCount && t.speakers !== speakerCount) return false;
      if (speakerImage === "with" && !t.hasSpeakerImage) return false;
      if (speakerImage === "without" && t.hasSpeakerImage) return false;
      if (linkTypeE && t.linkType !== linkTypeE) return false;
    }
    if (t.type === "offers") {
      if (productImageO === "with" && !t.hasProductImage) return false;
      if (productImageO === "without" && t.hasProductImage) return false;
      if (linkTypeO && t.linkType !== linkTypeO) return false;
    }
    return true;
  });

  // Build active chip list from every active filter
  const activeChips = [
    showSavedOnly        && { label: "Saved",               clear: () => setShowSavedOnly(false) },
    activeStyle          && { label: activeStyle,            clear: () => setActiveStyle(null) },
    reviewCount          && { label: `${reviewCount} review${reviewCount > 1 ? "s" : ""}`, clear: () => setReviewCount(null) },
    ratingType           && { label: `${ratingType} rating`, clear: () => setRatingType(null) },
    customerImage        && { label: `Customer image: ${customerImage}`, clear: () => setCustomerImage(null) },
    productImageT        && { label: `Product image: ${productImageT}`, clear: () => setProductImageT(null) },
    speakerCount         && { label: `${speakerCount} speaker${speakerCount > 1 ? "s" : ""}`, clear: () => setSpeakerCount(null) },
    speakerImage         && { label: `Speaker image: ${speakerImage}`, clear: () => setSpeakerImage(null) },
    linkTypeE            && { label: `Link: ${linkTypeE}`,   clear: () => setLinkTypeE(null) },
    productImageO        && { label: `Product image: ${productImageO}`, clear: () => setProductImageO(null) },
    linkTypeO            && { label: `Link: ${linkTypeO}`,   clear: () => setLinkTypeO(null) },
  ].filter(Boolean);

  const imageTabOptions = [
    { label: "All",     value: null },
    { label: "With",    value: "with" },
    { label: "Without", value: "without" },
  ];
  const linkTabOptions = [
    { label: "All",       value: null },
    { label: "Short URL", value: "Short URL" },
    { label: "QR code",   value: "QR" },
    { label: "None",      value: "None" },
  ];

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)", overflow: "hidden" }}>

      {/* ── Left filter panel ── */}
      <div style={{
        width: 228, flexShrink: 0,
        borderRight: `1px solid ${COLORS.border}`,
        padding: "20px 14px",
        overflowY: "auto",
        background: COLORS.white,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy }}>Filters</div>
          {activeChips.length > 0 && (
            <button onClick={clearAll} style={{ background: "none", border: "none", fontSize: 11, color: COLORS.amber, fontWeight: 600, cursor: "pointer", padding: 0 }}>
              Clear all
            </button>
          )}
        </div>

        {/* Saved */}
        <div onClick={() => setShowSavedOnly(!showSavedOnly)} style={{
          padding: "7px 10px", borderRadius: 8, marginBottom: 2,
          background: showSavedOnly ? COLORS.amberLight : "transparent",
          color: showSavedOnly ? COLORS.amber : COLORS.textSecondary,
          cursor: "pointer", fontSize: 12, fontWeight: showSavedOnly ? 600 : 400,
          border: `1px solid ${showSavedOnly ? COLORS.amber : "transparent"}`,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          ★ Saved {savedTemplates.length > 0 && <span style={{ fontSize: 10, background: COLORS.amber, color: COLORS.white, borderRadius: 100, padding: "1px 5px", fontWeight: 700 }}>{savedTemplates.length}</span>}
        </div>

        <div style={{ height: 1, background: COLORS.border, margin: "12px 0" }} />

        {/* Post type */}
        <FilterLabel>Post type</FilterLabel>
        {POST_TYPES.map(pt => (
          <div key={pt.id} style={{
            padding: "6px 10px", borderRadius: 8, marginBottom: 2,
            background: pt.id === selectedType.id ? COLORS.navy : "transparent",
            color: pt.id === selectedType.id ? COLORS.white : COLORS.textSecondary,
            fontSize: 12, fontWeight: pt.id === selectedType.id ? 600 : 400, cursor: "pointer",
          }}>
            {pt.icon} {pt.label}
          </div>
        ))}

        <div style={{ height: 1, background: COLORS.border, margin: "12px 0" }} />

        {/* Visual style — all types */}
        <FilterLabel>Visual style</FilterLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {STYLES.map(s => (
            <button key={s} onClick={() => setActiveStyle(activeStyle === s ? null : s)} style={{
              padding: "5px 10px", borderRadius: 100, fontSize: 11,
              border: `1px solid ${activeStyle === s ? COLORS.amber : COLORS.border}`,
              background: activeStyle === s ? COLORS.amberLight : COLORS.white,
              color: activeStyle === s ? COLORS.amber : COLORS.textSecondary,
              cursor: "pointer", fontWeight: activeStyle === s ? 600 : 400,
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* ── Testimonials filters ── */}
        {selectedType.id === "testimonials" && (
          <>
            <div style={{ height: 1, background: COLORS.border, margin: "12px 0" }} />
            <FilterLabel>Review count</FilterLabel>
            <CountButtons values={[1, 2, 3, "4+"]} active={reviewCount} onToggle={setReviewCount} />

            <FilterLabel>Rating type</FilterLabel>
            <TabChips
              options={[{ label: "All", value: null }, { label: "⭐ Star", value: "Star" }, { label: "😊 Emoji", value: "Emoji" }]}
              active={ratingType}
              onToggle={setRatingType}
            />

            <FilterLabel>Customer image</FilterLabel>
            <TabChips options={imageTabOptions} active={customerImage} onToggle={setCustomerImage} />

            <FilterLabel>Product image</FilterLabel>
            <TabChips options={imageTabOptions} active={productImageT} onToggle={setProductImageT} />
          </>
        )}

        {/* ── Events filters ── */}
        {selectedType.id === "events" && (
          <>
            <div style={{ height: 1, background: COLORS.border, margin: "12px 0" }} />
            <FilterLabel>Speaker count</FilterLabel>
            <CountButtons values={[1, 2, 3, "4+"]} active={speakerCount} onToggle={setSpeakerCount} />

            <FilterLabel>Speaker image</FilterLabel>
            <TabChips options={imageTabOptions} active={speakerImage} onToggle={setSpeakerImage} />

            <FilterLabel>Link type</FilterLabel>
            <TabChips options={linkTabOptions} active={linkTypeE} onToggle={setLinkTypeE} />
          </>
        )}

        {/* ── Offers filters ── */}
        {selectedType.id === "offers" && (
          <>
            <div style={{ height: 1, background: COLORS.border, margin: "12px 0" }} />
            <FilterLabel>Product image</FilterLabel>
            <TabChips options={imageTabOptions} active={productImageO} onToggle={setProductImageO} />

            <FilterLabel>Link type</FilterLabel>
            <TabChips options={linkTabOptions} active={linkTypeO} onToggle={setLinkTypeO} />
          </>
        )}
      </div>

      {/* ── Right results panel ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: COLORS.slate }}>


        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: activeChips.length > 0 ? 10 : 16 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy }}>{selectedType.label}</div>
            <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{filtered.length} template{filtered.length !== 1 ? "s" : ""}</div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 8 }}>Active filters</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {activeChips.map((chip, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: COLORS.white,
                  border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 100,
                  padding: "5px 8px 5px 12px",
                  fontSize: 12, fontWeight: 500,
                  color: COLORS.textPrimary,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}>
                  <span>{chip.label}</span>
                  <button onClick={chip.clear} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#E5E7EB", border: "none", cursor: "pointer",
                    color: COLORS.textSecondary, fontSize: 12, fontWeight: 700,
                    lineHeight: 1, padding: 0, flexShrink: 0,
                  }}>×</button>
                </div>
              ))}
              <button onClick={clearAll} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, color: "#6C5CE7", padding: "4px 2px",
              }}>
                Clear all
              </button>
            </div>
          </div>
        )}


        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy, marginBottom: 6 }}>No templates match these filters</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Try adjusting or clearing some filters.</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {filtered.map(t => (
              <TemplateCard
                key={t.id}
                template={t}
                onClick={() => onSelectTemplate(t)}
                saved={savedTemplates.includes(t.id)}
                onSave={(id) => setSavedTemplates(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// ─── Shared rich-text area ───────────────────────────────────────────────────
function RichTextArea({ value, onChange, onFocus, onBlur, placeholder, maxChars, activeKey, fieldKey }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 1, borderBottom: `1px solid ${COLORS.border}`, background: "#FAFAFA" }}>
        {["B","I","U"].map((lbl,i) => (
          <button key={i} style={{
            background: "none", border: "none", cursor: "pointer", padding: "3px 7px", borderRadius: 4, fontSize: 13,
            fontWeight: lbl==="B"?700:400, fontStyle: lbl==="I"?"italic":"normal",
            textDecoration: lbl==="U"?"underline":"none", color: COLORS.textSecondary,
          }}>{lbl}</button>
        ))}
        <div style={{ width:1, height:14, background: COLORS.border, margin:"0 4px" }} />
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:"3px 6px", borderRadius:4, color: COLORS.textMuted }}>
          <span style={{ display:"inline-block", width:14, height:14, background:"repeating-linear-gradient(45deg,#ccc 0,#ccc 2px,transparent 2px,transparent 6px)", borderRadius:2 }} />
        </button>
      </div>
      <div style={{ position:"relative" }}>
        <textarea value={value} onFocus={onFocus} onBlur={onBlur}
          onChange={(e) => onChange(e.target.value.slice(0, maxChars||99999))}
          placeholder={placeholder} rows={3}
          style={{
            width:"100%", padding:"10px 12px 28px", fontSize:13, lineHeight:1.6,
            border:"none", outline:"none", resize:"none", fontFamily:"inherit",
            color: COLORS.textPrimary, background: activeKey===fieldKey ? "#FAFBFF" : COLORS.white,
            boxSizing:"border-box",
          }}
        />
        {maxChars && <div style={{ position:"absolute", bottom:8, right:10, fontSize:11, color: COLORS.textMuted }}>{value.length} / {maxChars}</div>}
      </div>
    </div>
  );
}

// ─── CTA + Link row ──────────────────────────────────────────────────────────
function CTALinkRow({ cta, setCta, link, setLink, linkType, setLinkType, accent, activeField, setActiveField }) {
  return (
    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:600, color: COLORS.textSecondary, marginBottom:6 }}>CTA</div>
        <input value={cta} onChange={(e)=>setCta(e.target.value)}
          onFocus={()=>setActiveField("cta")} onBlur={()=>setActiveField(null)}
          placeholder="e.g. Register Now"
          style={{
            width:"100%", padding:"9px 11px", borderRadius:8, fontSize:13,
            border:`1.5px solid ${activeField==="cta"?accent:COLORS.border}`,
            outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
          }}
        />
      </div>
      <div style={{ flex:1.5 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color: COLORS.textSecondary }}>Link</span>
          <div style={{ display:"flex", borderRadius:6, overflow:"hidden", border:`1px solid ${COLORS.border}` }}>
            {["Short URL","QR"].map(t => (
              <button key={t} onClick={()=>setLinkType(t)} style={{
                padding:"3px 9px", fontSize:11, fontWeight:600, border:"none", cursor:"pointer",
                background: linkType===t ? accent : COLORS.white,
                color: linkType===t ? COLORS.white : COLORS.textSecondary,
              }}>{t}</button>
            ))}
          </div>
        </div>
        <input value={link} onChange={(e)=>setLink(e.target.value)}
          onFocus={()=>setActiveField("link")} onBlur={()=>setActiveField(null)}
          placeholder="https://..."
          style={{
            width:"100%", padding:"9px 11px", borderRadius:8, fontSize:13,
            border:`1.5px solid ${activeField==="link"?accent:COLORS.border}`,
            outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
          }}
        />
      </div>
    </div>
  );
}

// ─── Brand & Preferences (shared footer) ─────────────────────────────────────
function BrandBar({ companyName, setCompanyName, primaryColor, setPrimaryColor, activeField, setActiveField, accent }) {
  const PALETTE = ["#6C5CE7","#0F1B2D","#3B82F6","#10B981","#EF4444","#F5A623","#E84393"];
  return (
    <>
      <div style={{ height:1, background: COLORS.border, margin:"20px 0" }} />
      <div style={{ fontSize:11, fontWeight:700, color: COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16 }}>
        Brand &amp; Preferences
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <div style={{
          width:52, height:52, flexShrink:0, borderRadius:10,
          border:`2px dashed ${COLORS.border}`, background: COLORS.slate,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", gap:1,
        }}>
          <div style={{ fontSize:15, color: COLORS.textMuted }}>↑</div>
          <div style={{ fontSize:9, fontWeight:700, color: COLORS.textMuted, letterSpacing:"0.05em" }}>LOGO</div>
        </div>
        <input type="text" value={companyName}
          onFocus={()=>setActiveField("companyName")} onBlur={()=>setActiveField(null)}
          onChange={(e)=>setCompanyName(e.target.value)} placeholder="Company name"
          style={{
            flex:1, padding:"10px 12px", borderRadius:8, fontSize:14,
            border:`1.5px solid ${activeField==="companyName"?accent:COLORS.border}`,
            outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
          }}
        />
      </div>
      <div>
        <label style={{ fontSize:14, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:10 }}>Colour</label>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          {PALETTE.map(c => (
            <div key={c} onClick={()=>setPrimaryColor(c)} style={{
              width:32, height:32, borderRadius:"50%", background:c, cursor:"pointer", boxSizing:"border-box",
              border:`2.5px solid ${primaryColor===c?COLORS.white:"transparent"}`,
              boxShadow: primaryColor===c?`0 0 0 2.5px ${c}`:"0 1px 3px rgba(0,0,0,0.15)",
              transition:"all 0.12s",
            }} />
          ))}
          <div style={{
            width:32, height:32, borderRadius:"50%", cursor:"pointer",
            border:`2px dashed ${COLORS.border}`, background: COLORS.white,
            display:"flex", alignItems:"center", justifyContent:"center", color: COLORS.textMuted, fontSize:18,
          }}>+</div>
        </div>
      </div>
    </>
  );
}

// ─── Testimonial form ─────────────────────────────────────────────────────────
function TestimonialsForm({ template, companyName, setCompanyName, primaryColor, setPrimaryColor, activeField, setActiveField }) {
  const cardCount = Math.min(template.reviews || 1, 3);
  const makeCard = (i) => ({
    id: i, rating: i===0?4:5,
    testimonial: i===0?'"The dashboard saves us hours every week. Genuinely couldn\'t go back."':"",
    customerLine: i===0?"Priya Nair · Head of Ops · Brightpath Co.":"",
  });
  const [heading, setHeading] = useState("What our customers say");
  const [cards, setCards] = useState(() => Array.from({length:cardCount},(_,i)=>makeCard(i)));
  const [hasProductImage, setHasProductImage] = useState(false);
  const [hoveredStars, setHoveredStars] = useState({});
  const update = (id, key, val) => setCards(prev => prev.map(c => c.id===id?{...c,[key]:val}:c));
  const accent = "#6C5CE7";

  return (
    <div style={{ padding:"20px 20px 40px" }}>

      {/* Post heading */}
      <div style={{ marginBottom:20 }}>
        <label style={{ fontSize:14, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:6 }}>Post heading</label>
        <input type="text" value={heading} onChange={(e)=>setHeading(e.target.value)}
          onFocus={()=>setActiveField("heading")} onBlur={()=>setActiveField(null)}
          style={{
            width:"100%", padding:"10px 12px", borderRadius:8, fontSize:14,
            border:`1.5px solid ${activeField==="heading"?accent:COLORS.border}`,
            outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
          }}
        />
        <div style={{ fontSize:12, color: COLORS.textMuted, marginTop:4 }}>Leave blank to omit from the design.</div>
      </div>

      <div style={{ fontSize:11, fontWeight:700, color: COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>
        Testimonials
      </div>

      {/* Testimonial cards — count fixed by template */}
      {cards.map((card, idx) => (
        <div key={card.id} style={{ border:`1.5px solid ${COLORS.border}`, borderRadius:12, overflow:"hidden", marginBottom:12 }}>
          {/* Stars */}
          <div style={{ padding:"11px 14px 9px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", gap:3 }}>
              {[1,2,3,4,5].map(n=>(
                <span key={n}
                  onMouseEnter={()=>setHoveredStars(h=>({...h,[card.id]:n}))}
                  onMouseLeave={()=>setHoveredStars(h=>({...h,[card.id]:0}))}
                  onClick={()=>update(card.id,"rating",n)}
                  style={{ fontSize:22, cursor:"pointer", color: n<=(hoveredStars[card.id]||card.rating)?COLORS.amber:"#D1D5DB", transition:"color 0.1s" }}>★</span>
              ))}
            </div>
            {idx > 0 && <span style={{ fontSize:11, color: COLORS.textMuted }}>Card {idx+1} of {cardCount}</span>}
          </div>
          {/* Rich text */}
          <div style={{ borderBottom:`1px solid ${COLORS.border}` }}>
            <RichTextArea value={card.testimonial}
              onChange={(v)=>update(card.id,"testimonial",v)}
              onFocus={()=>setActiveField(`t-${card.id}`)} onBlur={()=>setActiveField(null)}
              placeholder='"Share what your customer said..."' maxChars={200}
              activeKey={activeField} fieldKey={`t-${card.id}`}
            />
          </div>
          {/* Customer */}
          <div style={{ padding:"10px 12px" }}>
            <div style={{ fontSize:11, fontWeight:600, color: COLORS.textSecondary, marginBottom:8 }}>Customer details</div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:44, height:44, borderRadius:10, flexShrink:0, border:`1.5px dashed ${COLORS.border}`, background: COLORS.slate, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:22 }}>🧑</div>
              <input value={card.customerLine} onChange={(e)=>update(card.id,"customerLine",e.target.value)}
                onFocus={()=>setActiveField(`cl-${card.id}`)} onBlur={()=>setActiveField(null)}
                placeholder="Name · Role · Company"
                style={{
                  flex:1, padding:"9px 11px", borderRadius:8, fontSize:13,
                  border:`1.5px solid ${activeField===`cl-${card.id}`?accent:COLORS.border}`,
                  outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, background: COLORS.white, boxSizing:"border-box", minWidth:0,
                }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Product image — only if template supports it */}
      {template.hasProductImage !== false && (
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
            <div><span style={{ fontSize:14, fontWeight:600, color: COLORS.textPrimary }}>Product image </span><span style={{ fontSize:13, color: COLORS.textMuted }}>(optional)</span></div>
            {!hasProductImage && (
              <button onClick={()=>setHasProductImage(true)} style={{ background:"#EEF2FF", color:accent, border:`1.5px solid #C7D2FE`, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Add image</button>
            )}
          </div>
          {hasProductImage ? (
            <div style={{ border:`2px dashed ${COLORS.border}`, borderRadius:10, padding:"18px", textAlign:"center", background: COLORS.slate, cursor:"pointer", position:"relative" }}>
              <div style={{ fontSize:26, marginBottom:4 }}>🖼</div>
              <div style={{ fontSize:13, color: COLORS.textSecondary, fontWeight:500 }}>Click to upload product image</div>
              <div style={{ fontSize:11, color: COLORS.textMuted, marginTop:3 }}>PNG, JPG — up to 10 MB</div>
              <button onClick={()=>setHasProductImage(false)} style={{ position:"absolute", top:8, right:10, background:"none", border:"none", cursor:"pointer", color: COLORS.textMuted, fontSize:18 }}>×</button>
            </div>
          ) : (
            <div style={{ fontSize:12, color: COLORS.textMuted }}>Used as a background or accent in the design.</div>
          )}
        </div>
      )}

      <BrandBar companyName={companyName} setCompanyName={setCompanyName} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} activeField={activeField} setActiveField={setActiveField} accent={accent} />
    </div>
  );
}

// ─── Events form ──────────────────────────────────────────────────────────────
function EventsForm({ template, companyName, setCompanyName, primaryColor, setPrimaryColor, activeField, setActiveField }) {
  const accent = "#00B894";
  const speakerCount = Math.min(template.speakers || 1, 3);
  const makeSpeaker = (i) => ({ id: i, line: i===0?"Ravi Shankar · CMO · ScaleUp":"" });
  const [eventTitle, setEventTitle] = useState("Growth Marketing Summit 2025");
  const [eventDesc, setEventDesc] = useState("Learn from the best growth marketers in SaaS — live, free, and online.");
  const [eventDate, setEventDate] = useState("12 Sep 2025 · 10:00 AM IST");
  const [eventLocation, setEventLocation] = useState("Zoom (Online)");
  const [speakers, setSpeakers] = useState(() => Array.from({length:speakerCount},(_,i)=>makeSpeaker(i)));
  const [moreSpeakers, setMoreSpeakers] = useState(false);
  const [cta, setCta] = useState("Register Now");
  const [link, setLink] = useState("");
  const [linkType, setLinkType] = useState(template.linkType==="QR"?"QR":"Short URL");
  const updateSpeaker = (id,key,val) => setSpeakers(prev=>prev.map(s=>s.id===id?{...s,[key]:val}:s));
  const addSpeaker = () => { if(speakers.length<3) setSpeakers(prev=>[...prev,{id:Date.now(),line:""}]); };

  const fieldStyle = (key) => ({
    width:"100%", padding:"10px 12px", borderRadius:8, fontSize:13,
    border:`1.5px solid ${activeField===key?accent:COLORS.border}`,
    outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
  });

  return (
    <div style={{ padding:"20px 20px 40px" }}>

      {/* Title + description card */}
      <div style={{ border:`1.5px solid ${COLORS.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
        <div style={{ padding:"10px 12px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <input value={eventTitle} onChange={(e)=>setEventTitle(e.target.value)}
            onFocus={()=>setActiveField("etitle")} onBlur={()=>setActiveField(null)}
            placeholder="Event title"
            style={{ flex:1, border:"none", outline:"none", fontSize:14, fontWeight:700, color: COLORS.textPrimary, background:"transparent", fontFamily:"inherit" }}
          />
          <span style={{ fontSize:16, color: COLORS.textMuted, marginLeft:8 }}>🔗</span>
        </div>
        <div style={{ borderTop:`1px solid ${COLORS.border}` }}>
          <RichTextArea value={eventDesc} onChange={setEventDesc}
            onFocus={()=>setActiveField("edesc")} onBlur={()=>setActiveField(null)}
            placeholder="Short description" maxChars={200} activeKey={activeField} fieldKey="edesc"
          />
        </div>
      </div>

      {/* Date & time */}
      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:6 }}>Date &amp; time</label>
        <input value={eventDate} onChange={(e)=>setEventDate(e.target.value)}
          onFocus={()=>setActiveField("edate")} onBlur={()=>setActiveField(null)}
          placeholder="e.g. 12 Sep 2025 · 10:00 AM IST"
          style={fieldStyle("edate")}
        />
        <div style={{ fontSize:12, color: COLORS.textMuted, marginTop:4 }}>Include timezone if needed.</div>
      </div>

      {/* Location */}
      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:6 }}>Location / Platform</label>
        <input value={eventLocation} onChange={(e)=>setEventLocation(e.target.value)}
          onFocus={()=>setActiveField("eloc")} onBlur={()=>setActiveField(null)}
          placeholder="e.g. Zoom (Online) or City, Country"
          style={fieldStyle("eloc")}
        />
      </div>

      {/* Speaker details */}
      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:8 }}>Speaker details</label>
        {speakers.map((sp,idx)=>(
          <div key={sp.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:44, height:44, borderRadius:10, flexShrink:0, border:`1.5px dashed ${COLORS.border}`, background: COLORS.slate, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:22 }}>🧑</div>
            <input value={sp.line} onChange={(e)=>updateSpeaker(sp.id,"line",e.target.value)}
              onFocus={()=>setActiveField(`sp-${sp.id}`)} onBlur={()=>setActiveField(null)}
              placeholder="Name · Title · Company"
              style={{
                flex:1, padding:"9px 11px", borderRadius:8, fontSize:13,
                border:`1.5px solid ${activeField===`sp-${sp.id}`?accent:COLORS.border}`,
                outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, background: COLORS.white, boxSizing:"border-box", minWidth:0,
              }}
            />
            {speakers.length>speakerCount && <button onClick={()=>setSpeakers(prev=>prev.filter(s=>s.id!==sp.id))} style={{ background:"none", border:"none", cursor:"pointer", color: COLORS.textMuted, fontSize:18, flexShrink:0 }}>×</button>}
          </div>
        ))}
        {speakers.length < 3 && (
          <button onClick={addSpeaker} style={{ background:"none", border:"none", cursor:"pointer", color:accent, fontSize:13, fontWeight:600, padding:"4px 0", display:"flex", alignItems:"center", gap:4 }}>
            + Add speaker <span style={{ fontSize:11, fontWeight:400, color: COLORS.textMuted }}>(max 3)</span>
          </button>
        )}
      </div>

      {/* CTA + Link */}
      <div style={{ border:`1.5px solid ${COLORS.border}`, borderRadius:12, padding:"14px", marginBottom:16 }}>
        <CTALinkRow cta={cta} setCta={setCta} link={link} setLink={setLink} linkType={linkType} setLinkType={setLinkType} accent={accent} activeField={activeField} setActiveField={setActiveField} />
      </div>

      <BrandBar companyName={companyName} setCompanyName={setCompanyName} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} activeField={activeField} setActiveField={setActiveField} accent={accent} />
    </div>
  );
}

// ─── Offers form ──────────────────────────────────────────────────────────────
function OffersForm({ template, companyName, setCompanyName, primaryColor, setPrimaryColor, activeField, setActiveField }) {
  const accent = "#E84393";
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [validity, setValidity] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [hasImage, setHasImage] = useState(!!template.hasProductImage);
  const [cta, setCta] = useState("");
  const [link, setLink] = useState("");
  const [linkType, setLinkType] = useState(template.linkType==="QR"?"QR":"Short URL");

  const fieldStyle = (key) => ({
    width:"100%", padding:"10px 12px", borderRadius:8, fontSize:13,
    border:`1.5px solid ${activeField===key?accent:COLORS.border}`,
    outline:"none", fontFamily:"inherit", color: COLORS.textPrimary, boxSizing:"border-box",
  });

  return (
    <div style={{ padding:"20px 20px 40px" }}>

      {/* Title + description card */}
      <div style={{ border:`1.5px solid ${COLORS.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
        <div style={{ padding:"10px 12px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <input value={offerTitle} onChange={(e)=>setOfferTitle(e.target.value)}
            onFocus={()=>setActiveField("otitle")} onBlur={()=>setActiveField(null)}
            placeholder="e.g. 50% Off This Weekend · Use code SAVE50"
            style={{ flex:1, border:"none", outline:"none", fontSize:14, fontWeight:600, color: offerTitle?COLORS.textPrimary:COLORS.textMuted, background:"transparent", fontFamily:"inherit" }}
          />
          <span style={{ fontSize:16, color: COLORS.textMuted, marginLeft:8 }}>🔗</span>
        </div>
        <div style={{ borderTop:`1px solid ${COLORS.border}` }}>
          <RichTextArea value={offerDesc} onChange={setOfferDesc}
            onFocus={()=>setActiveField("odesc")} onBlur={()=>setActiveField(null)}
            placeholder="Short description" maxChars={200} activeKey={activeField} fieldKey="odesc"
          />
        </div>
      </div>

      {/* Validity */}
      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:6 }}>Validity</label>
        <input value={validity} onChange={(e)=>setValidity(e.target.value)}
          onFocus={()=>setActiveField("oval")} onBlur={()=>setActiveField(null)}
          placeholder="e.g. 1–5 Jan 2026 · Ends midnight"
          style={fieldStyle("oval")}
        />
        <div style={{ fontSize:12, color: COLORS.textMuted, marginTop:4 }}>Include any date range or expiry detail.</div>
      </div>

      {/* Promo code */}
      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary, display:"block", marginBottom:6 }}>Promo code</label>
        <input value={promoCode} onChange={(e)=>setPromoCode(e.target.value)}
          onFocus={()=>setActiveField("opromo")} onBlur={()=>setActiveField(null)}
          placeholder="e.g. SAVE50"
          style={fieldStyle("opromo")}
        />
      </div>

      {/* Product image */}
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <div><span style={{ fontSize:13, fontWeight:600, color: COLORS.textPrimary }}>Product image </span><span style={{ fontSize:12, color: COLORS.textMuted }}>(optional)</span></div>
          {!hasImage && <button onClick={()=>setHasImage(true)} style={{ background:"#FFF0F7", color:accent, border:`1.5px solid ${accent}44`, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Add image</button>}
        </div>
        {hasImage && (
          <div style={{ border:`2px dashed ${COLORS.border}`, borderRadius:10, padding:"18px", textAlign:"center", background: COLORS.slate, cursor:"pointer", position:"relative" }}>
            <div style={{ fontSize:26, marginBottom:4 }}>🖼</div>
            <div style={{ fontSize:13, color: COLORS.textSecondary, fontWeight:500 }}>Click to upload product image</div>
            <div style={{ fontSize:11, color: COLORS.textMuted, marginTop:3 }}>PNG, JPG — up to 10 MB</div>
            <button onClick={()=>setHasImage(false)} style={{ position:"absolute", top:8, right:10, background:"none", border:"none", cursor:"pointer", color: COLORS.textMuted, fontSize:18 }}>×</button>
          </div>
        )}
      </div>

      {/* CTA + Link */}
      <div style={{ border:`1.5px solid ${COLORS.border}`, borderRadius:12, padding:"14px", marginBottom:16 }}>
        <CTALinkRow cta={cta} setCta={setCta} link={link} setLink={setLink} linkType={linkType} setLinkType={setLinkType} accent={accent} activeField={activeField} setActiveField={setActiveField} />
      </div>

      <BrandBar companyName={companyName} setCompanyName={setCompanyName} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} activeField={activeField} setActiveField={setActiveField} accent={accent} />
    </div>
  );
}

// ─── EditorPage ───────────────────────────────────────────────────────────────
function EditorPage({ template, onBack }) {
  const [filename, setFilename] = useState("Customer testimonial instagram feed");
  const [editingFilename, setEditingFilename] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [previewFormat, setPreviewFormat] = useState("1:1");
  const [showDownload, setShowDownload] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState(["1:1"]);
  const [rating, setRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6C5CE7");

  // accent per type
  const accent = template.type === "events" ? "#00B894" : template.type === "offers" ? "#E84393" : "#6C5CE7";



  const FORMATS = [
    { ratio: "1:1",    label: "Square",    dims: "1080 × 1080", use: "Feed · Ads",         platforms: "Instagram · Facebook · LinkedIn · X" },
    { ratio: "4:5",    label: "Portrait",  dims: "1080 × 1350", use: "Feed",               platforms: "Instagram · Facebook" },
    { ratio: "9:16",   label: "Vertical",  dims: "1080 × 1920", use: "Story · Reels",      platforms: "Instagram · TikTok · YouTube" },
    { ratio: "1.91:1", label: "Landscape", dims: "1200 × 628",  use: "Ads · Link preview", platforms: "LinkedIn · Facebook · X" },
  ];

  const styleCol = STYLE_COLORS[template.style];

  const FEEDBACK_REASONS = [
    "The layout does not suit my content",
    "The colours do not look good",
    "The text is difficult to read",
    "The image placement looks incorrect",
    "I need more template options",
    "Other",
  ];

  const previewAspect = {
    "1:1":    { w: 400, h: 400 },
    "4:5":    { w: 320, h: 400 },
    "9:16":   { w: 225, h: 400 },
    "1.91:1": { w: 400, h: 210 },
  }[previewFormat];

  const similarTemplates = GALLERY_TEMPLATES.filter(t => t.type === template.type && t.id !== template.id).slice(0, 3);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)", overflow: "hidden" }}>

      {/* ── Left panel ── */}
      <div style={{
        width: 420, flexShrink: 0,
        borderRight: `1px solid ${COLORS.border}`,
        overflowY: "auto",
        background: COLORS.white,
      }}>
        {/* Panel header */}
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 8, position: "sticky", top: 0, background: COLORS.white, zIndex: 10 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textSecondary, fontSize: 16, padding: 0 }}>←</button>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>Edit content</div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: COLORS.textMuted, background: COLORS.slate, padding: "3px 8px", borderRadius: 100, border: `1px solid ${COLORS.border}` }}>
            {template.label}
          </div>
        </div>

        {/* Form — switches by post type */}
        {template.type === "testimonials" && (
          <TestimonialsForm
            template={template}
            companyName={companyName} setCompanyName={setCompanyName}
            primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
            activeField={activeField} setActiveField={setActiveField}
          />
        )}
        {template.type === "events" && (
          <EventsForm
            template={template}
            companyName={companyName} setCompanyName={setCompanyName}
            primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
            activeField={activeField} setActiveField={setActiveField}
          />
        )}
        {template.type === "offers" && (
          <OffersForm
            template={template}
            companyName={companyName} setCompanyName={setCompanyName}
            primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
            activeField={activeField} setActiveField={setActiveField}
          />
        )}
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: COLORS.slate, overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          padding: "10px 20px", background: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          {/* Filename */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            {editingFilename ? (
              <input autoFocus value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onBlur={() => setEditingFilename(false)}
                style={{ fontSize: 13, fontWeight: 500, color: COLORS.navy, border: `1.5px solid ${COLORS.amber}`, borderRadius: 6, padding: "4px 8px", outline: "none", minWidth: 260 }}
              />
            ) : (
              <div onClick={() => setEditingFilename(true)}
                style={{ fontSize: 13, fontWeight: 500, color: COLORS.navy, cursor: "text", padding: "4px 8px", borderRadius: 6, border: "1.5px solid transparent" }}
                title="Click to rename">
                {filename}.png ✏️
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["↩", "↪", "⊞"].map((icon, i) => (
              <button key={i} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "5px 9px", cursor: "pointer", fontSize: 14, color: COLORS.textSecondary }}>
                {icon}
              </button>
            ))}

            <select value={previewFormat} onChange={(e) => setPreviewFormat(e.target.value)} style={{
              padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 500,
              border: `1px solid ${COLORS.border}`, background: COLORS.white,
              color: COLORS.textPrimary, cursor: "pointer", outline: "none",
            }}>
              {FORMATS.map(f => (
                <option key={f.ratio} value={f.ratio}>{f.label} — {f.ratio} ({f.use})</option>
              ))}
            </select>

            {/* Download button + dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowDownload(!showDownload)} style={{
                background: COLORS.navy, color: COLORS.white,
                border: "none", borderRadius: 8, padding: "7px 18px",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                Download ↓
              </button>
              {showDownload && (
                <div style={{
                  position: "absolute", top: "110%", right: 0, zIndex: 100,
                  background: COLORS.white, borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  border: `1px solid ${COLORS.border}`,
                  padding: 16, minWidth: 290,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>Select formats</div>
                  {FORMATS.map(f => (
                    <label key={f.ratio} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
                      <input type="checkbox"
                        checked={selectedFormats.includes(f.ratio)}
                        onChange={(e) => setSelectedFormats(prev => e.target.checked ? [...prev, f.ratio] : prev.filter(x => x !== f.ratio))}
                      />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.navy }}>{f.label} — {f.ratio}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{f.dims} · {f.platforms}</div>
                      </div>
                    </label>
                  ))}
                  <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                    <select style={{ flex: 1, padding: "6px 8px", borderRadius: 6, fontSize: 12, border: `1px solid ${COLORS.border}`, outline: "none" }}>
                      <option>PNG</option><option>JPEG</option><option>SVG</option>
                    </select>
                    <button
                      onClick={() => { setShowDownload(false); setShowFeedback(true); }}
                      style={{ flex: 2, background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      {selectedFormats.length > 1 ? "Download as ZIP" : `Download ${selectedFormats[0] || ""}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable preview area — single centred column */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>


          {/* ── Primary template preview ── */}
          <div style={{
            width: previewAspect.w, height: previewAspect.h,
            background: `linear-gradient(135deg, ${styleCol.bg} 0%, ${styleCol.accent}22 100%)`,
            borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
            padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between",
            position: "relative", overflow: "hidden", transition: "all 0.25s ease", flexShrink: 0,
          }}>
            <div style={{ position: "absolute", top: -24, right: -24, width: 100, height: 100, borderRadius: "50%", background: styleCol.accent + "1A" }} />

            {template.type === "testimonials" && (
              <>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: styleCol.accent, textTransform: "uppercase", marginBottom: 10 }}>
                    What our customers say
                  </div>
                  <div style={{ fontSize: 13, color: styleCol.text + "dd", lineHeight: 1.6, fontStyle: "italic" }}>
                    "The dashboard saves us hours every week. Genuinely couldn't go back."
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, marginBottom: 6 }}>
                    {[1,2,3,4,5].map(n => <span key={n} style={{ color: n <= 4 ? styleCol.accent : styleCol.accent + "33" }}>★</span>)}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: styleCol.text }}>Priya Nair</div>
                  <div style={{ fontSize: 10, color: styleCol.text + "99" }}>Head of Ops · Brightpath Co.</div>
                </div>
              </>
            )}

            {template.type === "events" && (
              <>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: styleCol.accent, textTransform: "uppercase", marginBottom: 8 }}>WEBINAR</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: styleCol.text, lineHeight: 1.3, marginBottom: 8 }}>
                    Growth Marketing Summit 2025
                  </div>
                  <div style={{ fontSize: 11, color: styleCol.text + "aa", lineHeight: 1.5 }}>
                    Learn from the best growth marketers in SaaS — live, free, and online.
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: styleCol.accent + "44", flexShrink: 0 }} />
                    <div style={{ fontSize: 10, fontWeight: 600, color: styleCol.text }}>Ravi Shankar · CMO · ScaleUp</div>
                  </div>
                  <div style={{ fontSize: 10, color: styleCol.text + "99" }}>12 Sep 2025 · 10:00 AM IST · Zoom</div>
                </div>
              </>
            )}

            {template.type === "offers" && (
              <>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: styleCol.accent, textTransform: "uppercase", marginBottom: 6 }}>LIMITED OFFER</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: styleCol.text, lineHeight: 1.1, marginBottom: 6 }}>50% OFF</div>
                  <div style={{ fontSize: 12, color: styleCol.text + "cc" }}>This weekend only. Use code SAVE50</div>
                </div>
                <div>
                  <div style={{ display: "inline-block", background: styleCol.accent, color: styleCol.bg, fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 100 }}>
                    Shop Now
                  </div>
                </div>
              </>
            )}

            <div style={{ position: "absolute", bottom: 10, right: 12, background: "rgba(255,255,255,0.12)", borderRadius: 4, padding: "3px 7px", fontSize: 9, color: styleCol.text + "99", fontWeight: 600 }}>
              {companyName || "Your Company"}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: primaryColor }} />
          </div>


          {/* ── Rating — shown only after download ── */}
          {showFeedback && (
            <div style={{
              marginTop: 20, background: COLORS.white, borderRadius: 14, padding: "20px 24px",
              border: `1px solid ${COLORS.border}`, width: previewAspect.w,
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Rate this template</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>How well did this template work for your content?</div>
              <div style={{ display: "flex", gap: 6, marginBottom: rating > 0 && rating <= 2 ? 16 : 0 }}>
                {[1,2,3,4,5].map(n => (
                  <span key={n} onClick={() => setRating(n)}
                    style={{ fontSize: 28, cursor: "pointer", color: n <= rating ? COLORS.amber : COLORS.border, transition: "color 0.12s" }}>★</span>
                ))}
              </div>

              {/* Reason picker — only on 1 or 2 stars */}
              {rating > 0 && rating <= 2 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 8 }}>How can we improve this template?</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {FEEDBACK_REASONS.map(reason => (
                      <label key={reason} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12, color: COLORS.textPrimary }}>
                        <input type="radio" name="feedback" value={reason} checked={feedbackReason === reason} onChange={() => setFeedbackReason(reason)} />
                        {reason}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {rating > 0 && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
                  <button onClick={() => setShowFeedback(false)} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "7px 14px", fontSize: 12, cursor: "pointer", color: COLORS.textSecondary }}>
                    Skip
                  </button>
                  <button onClick={() => setShowFeedback(false)} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 7, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Similar templates — below the preview ── */}
          <div style={{ width: previewAspect.w, marginTop: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>Similar templates</div>
              <button
                onClick={onBack}
                style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: COLORS.amber, cursor: "pointer", padding: 0 }}
              >
                View all →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {similarTemplates.map(t => {
                const sc = STYLE_COLORS[t.style];
                return (
                  <div key={t.id} style={{
                    borderRadius: 10, overflow: "hidden",
                    border: `1.5px solid ${COLORS.border}`, cursor: "pointer",
                    background: COLORS.white, transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.amber; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{
                      height: 80, background: `linear-gradient(135deg, ${sc.bg} 0%, ${sc.accent}33 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: "62%", background: sc.accent + "22", border: `1px solid ${sc.accent}44`, borderRadius: 5, padding: "6px 8px" }}>
                        <div style={{ height: 4, borderRadius: 2, background: sc.accent, width: "65%", marginBottom: 4 }} />
                        <div style={{ height: 3, borderRadius: 2, background: sc.accent + "88", width: "90%", marginBottom: 3 }} />
                        <div style={{ height: 3, borderRadius: 2, background: sc.accent + "55", width: "55%" }} />
                      </div>
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.navy, marginBottom: 2 }}>{t.label}</div>
                      <div style={{ fontSize: 10, color: COLORS.textMuted }}>{t.style}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SocialPostCreator() {
  const [screen, setScreen] = useState("home"); // home | gallery | editor
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const recentWorks = [
    { id: 1, name: "Customer Testimonial", date: "Edited 1 hour ago", status: "Draft", style: "Casual" },
    { id: 2, name: "Summer Sale Offer", date: "Downloaded yesterday", status: "Downloaded", style: "Bold" },
    { id: 3, name: "Webinar Announcement", date: "Edited 2 days ago", status: "Draft", style: "Formal" },
    { id: 4, name: "Thank You Post", date: "Edited 3 days ago", status: "Draft", style: "Playful" },
    { id: 5, name: "Client Testimonial", date: "Downloaded 5 days ago", status: "Downloaded", style: "Bold" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: COLORS.white, minHeight: "100vh" }}>
      {/* Top nav */}
      <div style={{
        height: 56, borderBottom: `1px solid ${COLORS.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", background: COLORS.white, position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: COLORS.textMuted, cursor: "pointer" }} onClick={() => setScreen("home")}>Social Toolkit</span>
            <span style={{ color: COLORS.textMuted }}>›</span>
            <span
              style={{ color: screen === "home" ? COLORS.navy : COLORS.textMuted, fontWeight: screen === "home" ? 600 : 400, cursor: screen !== "home" ? "pointer" : "default" }}
              onClick={() => screen !== "home" && setScreen("home")}
            >
              Social Post Creator
            </span>
            {screen === "gallery" && (
              <>
                <span style={{ color: COLORS.textMuted }}>›</span>
                <span style={{ color: COLORS.navy, fontWeight: 600 }}>{selectedType?.label}</span>
              </>
            )}
            {screen === "editor" && (
              <>
                <span style={{ color: COLORS.textMuted }}>›</span>
                <span style={{ color: COLORS.textMuted, cursor: "pointer" }} onClick={() => setScreen("gallery")}>{selectedType?.label}</span>
                <span style={{ color: COLORS.textMuted }}>›</span>
                <span style={{ color: COLORS.navy, fontWeight: 600 }}>{selectedTemplate?.label}</span>
              </>
            )}
          </div>
        </div>

        {/* Nav actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {screen !== "home" && (
            <div style={{ display: "flex", gap: 2, background: COLORS.slate, borderRadius: 8, padding: 3 }}>
              {[
                { s: "home", label: "Home" },
                { s: "gallery", label: "Templates" },
              ].map(({ s, label }) => (
                <button key={s} onClick={() => { if (s === "gallery" && selectedType) setScreen(s); else if (s === "home") setScreen(s); }}
                  style={{
                    padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                    border: "none", cursor: "pointer",
                    background: screen === s ? COLORS.white : "transparent",
                    color: screen === s ? COLORS.navy : COLORS.textSecondary,
                    boxShadow: screen === s ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          )}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 13, fontWeight: 700 }}>
            Z
          </div>
        </div>
      </div>

      {/* Screens */}
      {screen === "home" && (
        <HomePage
          onSelectType={(type) => { setSelectedType(type); setScreen("gallery"); }}
          recentWorks={recentWorks}
        />
      )}
      {screen === "gallery" && selectedType && (
        <GalleryPage
          selectedType={selectedType}
          onSelectTemplate={(t) => { setSelectedTemplate(t); setScreen("editor"); }}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "editor" && selectedTemplate && (
        <EditorPage
          template={selectedTemplate}
          onBack={() => setScreen("gallery")}
        />
      )}
    </div>
  );
}
