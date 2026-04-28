'use client';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ListingCard from '../../components/ListingCard';
import { listings } from '../../data/listings';
import { MessageCircle, MapPin, Calendar, Star, ChevronRight, Shield, Share2, Award } from 'lucide-react';

// Mock profile data
const profiles: Record<number, {
  id: number; name: string; age: number; location: string; whatsapp: string;
  bio: string; joined: string; emoji: string; color: 'green'|'red'|'blue'|'gold';
  badges: string[]; rating: number; reviews: number; listingIds: number[];
}> = {
  1: {
    id: 1, name: 'Margaret Tan', age: 68, location: 'Petaling Jaya, KL', whatsapp: '60123456789',
    bio: 'Retired school teacher with a deep love for animals and nature. I have been caring for pets my entire life and I offer a safe, warm, loving environment for your furry companions. When I\'m not looking after animals, you can find me gardening or baking for my grandchildren.',
    joined: 'March 2024', emoji: '🌿', color: 'green', rating: 4.9, reviews: 34,
    badges: ['Trusted Host', 'Animal Lover', '30+ Reviews', 'Quick Responder'],
    listingIds: [1, 5],
  },
  2: {
    id: 2, name: 'Robert Lim', age: 72, location: 'Cheras, KL', whatsapp: '60129876543',
    bio: 'My late mother passed down 3 generations of kuih recipes to me. After retiring from my bakery business of 30 years, I now make small batches from home using the exact same love and freshness. Every bite tells a story of our family heritage.',
    joined: 'January 2024', emoji: '🍰', color: 'gold', rating: 5.0, reviews: 18,
    badges: ['Top Seller', 'Homemade Quality', 'Heritage Recipes'],
    listingIds: [2],
  },
};

const colorMap = {
  green: { bg: 'var(--green-pale)', accent: 'var(--green)', label: '#2E7D32', hero: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)' },
  red: { bg: 'var(--red-pale)', accent: 'var(--red)', label: '#8B1A1A', hero: 'linear-gradient(135deg, #8B1A1A 0%, #4A0000 100%)' },
  blue: { bg: 'var(--blue-pale)', accent: 'var(--blue)', label: '#1565C0', hero: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)' },
  gold: { bg: 'var(--gold-pale)', accent: 'var(--gold)', label: '#D4A017', hero: 'linear-gradient(135deg, #D4A017 0%, #A67C00 100%)' },
};

export default function ProfilePageClient({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const profile = profiles[id];

  // Fallback for unknown profile
  const displayProfile = profile || {
    id, name: 'Community Member', age: 65, location: 'Kuala Lumpur',
    whatsapp: '601234567890',
    bio: 'A valued member of the RestComm community.',
    joined: '2024', emoji: '👴', color: 'blue' as const, rating: 4.8, reviews: 5,
    badges: ['Community Member'], listingIds: [],
  };

  const c = colorMap[displayProfile.color];
  const memberListings = listings.filter(l => displayProfile.listingIds.includes(l.id));

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero banner */}
      <div style={{ background: c.hero, padding: '0 24px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative petal watermark */}
        <div style={{ position: 'absolute', right: -80, top: -80, opacity: 0.08 }}>
          <svg width="400" height="400" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="13" rx="10" ry="14" transform="rotate(-45 13 13)" fill="#fff" />
            <ellipse cx="27" cy="13" rx="10" ry="14" transform="rotate(45 27 13)" fill="#fff" />
            <ellipse cx="13" cy="27" rx="10" ry="14" transform="rotate(45 13 27)" fill="#fff" />
            <ellipse cx="27" cy="27" rx="10" ry="14" transform="rotate(-45 27 27)" fill="#fff" />
          </svg>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 0 80px', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} />
            <Link href="/marketplace" style={{ color: 'inherit', textDecoration: 'none' }}>Marketplace</Link>
            <ChevronRight size={13} />
            <span style={{ color: 'rgba(255,255,255,0.95)' }}>{displayProfile.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{
              width: 110, height: 110, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: '4px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 52, flexShrink: 0,
              backdropFilter: 'blur(8px)',
            }}>
              {displayProfile.emoji}
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-1px' }}>
                {displayProfile.name}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: 'rgba(255,255,255,0.82)', fontSize: 14 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={13} /> {displayProfile.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} /> Joined {displayProfile.joined}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Star size={13} fill="currentColor" /> {displayProfile.rating} ({displayProfile.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '-40px auto 0', padding: '0 24px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>

          {/* Main */}
          <div>
            {/* Bio */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>About {displayProfile.name.split(' ')[0]}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>{displayProfile.bio}</p>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                {displayProfile.badges.map(badge => (
                  <span key={badge} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: c.bg, color: c.label,
                    border: `1px solid ${c.accent}30`,
                    padding: '5px 12px', borderRadius: 50,
                    fontSize: 12, fontWeight: 700,
                  }}>
                    <Award size={11} /> {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Listings */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20, letterSpacing: '-0.5px' }}>
              {displayProfile.name.split(' ')[0]}'s Listings
              <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>({memberListings.length})</span>
            </h2>

            {memberListings.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {memberListings.map(l => <ListingCard key={l.id} {...l} />)}
              </div>
            ) : (
              <div style={{ background: 'var(--bg-subtle)', borderRadius: 20, padding: '48px 24px', textAlign: 'center', border: '1px dashed var(--border)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>No listings yet</p>
              </div>
            )}

            {/* Reviews */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: '40px 0 20px', letterSpacing: '-0.5px' }}>
              Reviews <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-muted)' }}>({displayProfile.reviews})</span>
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '20px 24px', marginBottom: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{displayProfile.rating}</div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '6px 0' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{displayProfile.reviews} reviews</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[5, 4, 3, 2, 1].map(star => {
                  const pct = star === 5 ? 85 : star === 4 ? 12 : 3;
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 12 }}>{star}</span>
                      <Star size={10} fill="var(--gold)" color="var(--gold)" />
                      <div style={{ flex: 1, height: 6, background: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)', borderRadius: 3, transition: 'width 0.6s ease' }} />
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 28 }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {[
              { name: 'Amira K.', rating: 5, text: 'Absolutely wonderful! So professional and genuinely caring. My cat was so happy.', time: '3 days ago' },
              { name: 'James T.', rating: 5, text: 'Exceeded all expectations. Would recommend to every pet owner I know!', time: '2 weeks ago' },
              { name: 'Siti N.', rating: 4, text: 'Great service, very attentive and responsive on WhatsApp. Minor scheduling hiccup but sorted quickly.', time: '1 month ago' },
            ].map(review => (
              <div key={review.name} style={{ padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.bg, border: `2px solid ${c.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: c.label, fontSize: 15 }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{review.name}</div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={11} fill="var(--gold)" color="var(--gold)" />)}
                        {[...Array(5 - review.rating)].map((_, i) => <Star key={i} size={11} color="var(--border)" />)}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{review.time}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{review.text}</p>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px var(--shadow)', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
                Contact {displayProfile.name.split(' ')[0]}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 20 }}>
                Reach out via WhatsApp to discuss listings, ask questions, or just say hello!
              </p>
              <a
                href={`https://wa.me/${displayProfile.whatsapp}?text=Hi ${displayProfile.name.split(' ')[0]}! I found your profile on RestComm and would love to connect.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700, width: '100%', transition: 'all 0.2s' }}
                className="wa-btn"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <button style={{ width: '100%', marginTop: 10, padding: '12px', border: '1px solid var(--border)', background: 'var(--bg-subtle)', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Share2 size={14} /> Share Profile
              </button>
            </div>

            <div style={{ background: 'var(--green-pale)', borderRadius: 16, padding: '16px 18px', border: '1px solid var(--green)20' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                <Shield size={14} /> Verified Member
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {displayProfile.name.split(' ')[0]} is a verified RestComm community member. Their identity has been confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`.wa-btn:hover { opacity: 0.88; transform: translateY(-1px); }`}</style>
    </div>
  );
}
