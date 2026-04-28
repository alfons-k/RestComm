'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ListingCard from '../../components/ListingCard';
import { listings } from '../../data/listings';
import { MessageCircle, MapPin, Tag, ChevronRight, Share2, Heart, ArrowLeft, Star, Shield } from 'lucide-react';
import { useState } from 'react';

const colorMap = {
  green: { bg: 'var(--green-pale)', accent: 'var(--green)', label: '#2E7D32', dark: '#1B5E20' },
  red: { bg: 'var(--red-pale)', accent: 'var(--red)', label: '#8B1A1A', dark: '#4A0000' },
  blue: { bg: 'var(--blue-pale)', accent: 'var(--blue)', label: '#1565C0', dark: '#0D47A1' },
  gold: { bg: 'var(--gold-pale)', accent: 'var(--gold)', label: '#D4A017', dark: '#A67C00' },
};

export default function ListingDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const listing = listings.find(l => l.id === id);
  const related = listings.filter(l => l.id !== id && l.category === listing?.category).slice(0, 3);
  const [saved, setSaved] = useState(false);

  if (!listing) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: 600, margin: '120px auto', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🔍</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 12 }}>Listing Not Found</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>This listing may have been removed or doesn't exist.</p>
          <Link href="/marketplace" style={{ padding: '14px 28px', background: 'var(--blue)', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 700 }}>
            Browse All Listings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const c = colorMap[listing.color];

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} />
          <Link href="/marketplace" style={{ color: 'inherit', textDecoration: 'none' }}>Marketplace</Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{listing.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>

          {/* Main content */}
          <div>
            {/* Back button */}
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 24, transition: 'color 0.2s' }} className="back-link">
              <ArrowLeft size={15} /> Back to Listings
            </Link>

            {/* Image */}
            <div style={{
              background: c.bg,
              borderRadius: 24,
              height: 360,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 120,
              marginBottom: 32,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <span style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }}>{listing.imageEmoji}</span>
              {listing.featured && (
                <div style={{ position: 'absolute', top: 18, left: 18, background: 'var(--gold)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 50, letterSpacing: 0.5 }}>
                  ⭐ FEATURED
                </div>
              )}
              {/* Decorative blobs */}
              <div style={{ position: 'absolute', bottom: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: c.accent, opacity: 0.08 }} />
              <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: c.accent, opacity: 0.05 }} />
            </div>

            {/* Category & title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Tag size={13} color={c.label} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.label, textTransform: 'uppercase', letterSpacing: 0.8 }}>{listing.category}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: 20 }}>
              {listing.title}
            </h1>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, color: 'var(--text-secondary)', fontSize: 14 }}>
              <MapPin size={14} />
              <span>{listing.location}</span>
            </div>

            {/* Description */}
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 16, padding: '24px', marginBottom: 32, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>About This Listing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>
                {listing.description}
              </p>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { icon: '✅', label: 'Verified Profile', desc: 'Identity confirmed' },
                { icon: '🔒', label: 'Safe Contact', desc: 'Via WhatsApp only' },
                { icon: '🤝', label: 'Community Member', desc: `Since ${listing.id < 3 ? '2024' : '2025'}` },
              ].map(t => (
                <div key={t.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.desc}</div>
                </div>
              ))}
            </div>

            {/* Reviews placeholder */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20 }}>
                Community Reviews
              </h3>
              {[
                { name: 'Priya L.', rating: 5, text: 'Absolutely wonderful experience! Very professional and caring. Would recommend to anyone.', time: '2 weeks ago' },
                { name: 'David C.', rating: 5, text: 'My dog loved every minute. Came home happy and well-fed. Will definitely use again.', time: '1 month ago' },
              ].map(review => (
                <div key={review.name} style={{ padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: c.label, fontSize: 14, border: `1.5px solid ${c.accent}` }}>
                        {review.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{review.name}</div>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={11} fill="var(--gold)" color="var(--gold)" />)}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{review.time}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 90 }}>
            {/* Contact card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, padding: 28, marginBottom: 16, boxShadow: '0 4px 24px var(--shadow)' }}>
              {/* Poster */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: c.bg, border: `3px solid ${c.accent}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {listing.imageEmoji}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>{listing.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Age {listing.age} · {listing.location}</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="var(--gold)" color="var(--gold)" />)}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>5.0</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                Interested? Reach out directly to <strong>{listing.name}</strong> via WhatsApp to discuss details, pricing, and availability.
              </p>

              <a
                href={`https://wa.me/${listing.whatsapp}?text=Hi ${listing.name}! I saw your listing "${listing.title}" on RestComm and I'm interested. Can we discuss?`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: '#25D366', color: '#fff',
                  textDecoration: 'none', padding: '16px',
                  borderRadius: 14, fontSize: 16, fontWeight: 700,
                  width: '100%', transition: 'all 0.2s',
                }}
                className="wa-main-btn"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>

              <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Shield size={10} /> Your first message is pre-filled for you
              </p>

              {/* Save & Share */}
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button
                  onClick={() => setSaved(!saved)}
                  style={{
                    flex: 1, padding: '12px', border: `1.5px solid ${saved ? 'var(--red)' : 'var(--border)'}`,
                    background: saved ? 'var(--red-pale)' : 'var(--bg-subtle)',
                    borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    color: saved ? 'var(--red)' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'all 0.2s',
                  }}
                >
                  <Heart size={14} fill={saved ? 'var(--red)' : 'none'} color={saved ? 'var(--red)' : 'currentColor'} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button style={{ flex: 1, padding: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onClick={() => navigator.share?.({ title: listing.title, url: window.location.href })}>
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            {/* Safety tip */}
            <div style={{ background: 'var(--gold-pale)', borderRadius: 16, padding: '16px 18px', border: '1px solid var(--gold)30' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>🛡️ Stay Safe</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Meet in public for first interactions. Never send money in advance. Trust your instincts.
              </p>
            </div>
          </div>
        </div>

        {/* Related listings */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 28, letterSpacing: '-0.5px' }}>
              More in {listing.category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {related.map(l => <ListingCard key={l.id} {...l} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <style>{`
        .back-link:hover { color: var(--text-primary) !important; }
        .wa-main-btn:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,211,102,0.3); }
        @media (max-width: 800px) {
          .listing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}
