'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Share2,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Inline Temple SVG Icons & Decorative Motifs ---

const GaneshIcon = ({ className = 'w-16 h-16 text-gold' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-label="Lord Ganesha Motif">
    <path d="M50 8 C42 8 36 14 36 22 C36 26 38 29 41 32 C35 34 30 39 28 45 C25 41 21 38 16 38 C11 38 7 42 7 47 C7 54 13 59 20 59 C22 59 24 58 26 57 C27 66 33 74 42 78 C41 81 40 84 40 88 C40 93 44 97 50 97 C56 97 60 93 60 88 C60 84 59 81 58 78 C67 74 73 66 74 57 C76 58 78 59 80 59 C87 59 93 54 93 47 C93 42 89 38 84 38 C79 38 75 41 72 45 C70 39 65 34 59 32 C62 29 64 26 64 22 C64 14 58 8 50 8 Z M50 14 C54 14 58 18 58 22 C58 26 54 30 50 30 C46 30 42 26 42 22 C42 18 46 14 50 14 Z M50 34 C57 34 63 39 65 46 C63 48 58 49 54 49 C50 49 46 47 44 44 C42 41 39 39 36 38 C40 35 45 34 50 34 Z M48 53 C52 53 56 55 58 58 C60 62 60 67 56 71 C54 73 52 74 50 74 C47 74 44 72 43 69 C41 65 42 60 45 56 C46 54 47 53 48 53 Z M50 82 C53 82 55 84 55 87 C55 90 53 92 50 92 C47 92 45 90 45 87 C45 84 47 82 50 82 Z" />
    <circle cx="50" cy="22" r="3" fill="#FF6B00" />
    <path d="M47 38 L53 38 L50 44 Z" fill="#FF6B00" />
  </svg>
);

const KalashIcon = ({ className = 'w-10 h-10 text-gold' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    {/* Coconut on top */}
    <ellipse cx="32" cy="14" rx="7" ry="10" fill="currentColor" fillOpacity="0.25" />
    {/* Mango Leaves */}
    <path d="M22 20 Q16 12 12 18 Q20 22 25 24" fill="currentColor" fillOpacity="0.4" />
    <path d="M42 20 Q48 12 52 18 Q44 22 39 24" fill="currentColor" fillOpacity="0.4" />
    <path d="M32 20 Q32 10 32 6 Q34 12 32 20" strokeWidth="2" />
    {/* Kalash Pot Rim */}
    <path d="M23 24 L41 24 C44 24 46 26 45 29 L44 32 L20 32 L19 29 C18 26 20 24 23 24 Z" fill="currentColor" fillOpacity="0.3" />
    {/* Kalash Pot Body */}
    <path d="M20 32 C12 37 12 48 18 53 C22 56 42 56 46 53 C52 48 52 37 44 32 Z" fill="currentColor" fillOpacity="0.2" />
    {/* Kalash Base */}
    <path d="M22 55 L42 55 L44 60 L20 60 Z" fill="currentColor" fillOpacity="0.3" />
    {/* Swastika / Auspicious Mark on Pot */}
    <path d="M32 38 L32 48 M27 43 L37 43 M27 38 L27 43 M37 43 L37 48 M32 38 L37 38 M32 48 L27 48" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DiyaIcon = ({ className = 'w-8 h-8 text-gold', glowing = true }: { className?: string; glowing?: boolean }) => (
  <div className={`relative inline-block ${glowing ? 'animate-diya-flicker' : ''}`}>
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Diya Base and Oil Bowl */}
      <path
        d="M12 40 C14 52 50 52 52 40 C54 35 48 34 32 34 C16 34 10 35 12 40 Z"
        fill="#D4AF37"
        stroke="#8F6E12"
        strokeWidth="2"
      />
      <ellipse cx="32" cy="38" rx="18" ry="4" fill="#7A1C1C" />
      <path d="M24 50 L40 50 L44 58 L20 58 Z" fill="#AA881E" stroke="#8F6E12" strokeWidth="1.5" />
      {/* Wick */}
      <line x1="32" y1="36" x2="32" y2="28" stroke="#3D0808" strokeWidth="2.5" strokeLinecap="round" />
      {/* Outer Flame Glow */}
      <path
        d="M32 8 C36 18 42 24 32 32 C22 24 28 18 32 8 Z"
        fill="url(#flameGrad)"
        filter="drop-shadow(0 0 6px rgba(255,107,0,0.8))"
      />
      {/* Inner Core Flame */}
      <path d="M32 16 C34 22 37 25 32 29 C27 25 30 22 32 16 Z" fill="#FFE885" />
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="40%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#7A1C1C" />
        </linearGradient>
      </defs>
    </svg>
    {glowing && (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-saffron/20 blur-md pointer-events-none" />
    )}
  </div>
);

const TempleToran = () => (
  <div className="w-full overflow-hidden leading-none flex justify-center py-1 opacity-90 select-none pointer-events-none">
    <svg className="w-full max-w-4xl h-8 text-gold" viewBox="0 0 800 32" fill="none">
      <path d="M0 4 Q50 20 100 4 Q150 20 200 4 Q250 20 300 4 Q350 20 400 4 Q450 20 500 4 Q550 20 600 4 Q650 20 700 4 Q750 20 800 4" stroke="#D4AF37" strokeWidth="3" />
      {/* Hanging Mango Leaves and Marigold buds */}
      {[50, 150, 250, 350, 450, 550, 650, 750].map((cx, i) => (
        <g key={i}>
          <ellipse cx={cx} cy="18" rx="6" ry="11" fill="#2E7D32" opacity="0.85" />
          <circle cx={cx} cy="26" r="4.5" fill="#FF6B00" />
          <circle cx={cx} cy="26" r="2" fill="#D4AF37" />
        </g>
      ))}
      {[100, 200, 300, 400, 500, 600, 700].map((cx, i) => (
        <g key={i}>
          <path d={`M${cx} 4 L${cx} 16`} stroke="#AA881E" strokeWidth="1.5" />
          <polygon points={`${cx},16 ${cx - 4},24 ${cx + 4},24`} fill="#D4AF37" />
        </g>
      ))}
    </svg>
  </div>
);

const TemplePillar = ({ height = 'h-full', className = '' }: { height?: string; className?: string }) => (
  <div className={`flex flex-col items-center justify-between py-2 select-none pointer-events-none ${height} ${className}`}>
    {/* Pillar Capital */}
    <div className="w-8 h-4 bg-gradient-to-b from-gold via-sandstone-border to-sandstone-accent rounded-t-md border-t border-x border-gold shadow-sm" />
    <div className="w-6 h-2 bg-maroon rounded-xs" />
    {/* Fluted Column */}
    <div className="w-4 flex-1 bg-gradient-to-r from-sandstone-dark via-sandstone-light to-sandstone-dark border-x border-sandstone-border relative">
      <div className="absolute inset-y-0 left-1 w-0.5 bg-gold/40" />
      <div className="absolute inset-y-0 right-1 w-0.5 bg-maroon/20" />
    </div>
    {/* Pillar Base */}
    <div className="w-6 h-2 bg-maroon rounded-xs" />
    <div className="w-8 h-4 bg-gradient-to-t from-gold via-sandstone-border to-sandstone-accent rounded-b-md border-b border-x border-gold shadow-sm" />
  </div>
);

// --- Floating Marigold Petals Component ---
const FloatingPetals = () => {
  const petals = Array.from({ length: 18 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20" style={{ contain: 'paint' }}>
      {petals.map((_, i) => {
        const left = `${(i * 5.7 + 3) % 96}%`;
        const duration = 12 + (i % 7) * 2.5;
        const delay = (i * 1.3) % 9;
        const size = 12 + (i % 4) * 4;
        const isSaffron = i % 2 === 0;
        return (
          <div
            key={i}
            className="absolute -top-10 petal-anim"
            style={{
              left,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <svg
              width={size}
              height={size * 1.4}
              viewBox="0 0 24 34"
              className={isSaffron ? 'text-saffron opacity-80' : 'text-gold opacity-85'}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(122,28,28,0.25))' }}
            >
              <path
                d="M12 0 C18 8 24 18 12 34 C0 18 6 8 12 0 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default function WeddingInvitation() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDoorOpened, setIsDoorOpened] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  const handleRevealDate = () => {
    setIsDateRevealed(true);
    triggerConfetti();
  };

  // --- Countdown Logic ---
  const weddingTimestamp = new Date('2026-11-30T19:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setIsMounted(true);
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = weddingTimestamp - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [weddingTimestamp]);

  // Handle Opening Temple Doors (Mobile & Desktop)
  const handleOpenDoor = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsDoorOpened(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FF6B00', '#D4AF37', '#7A1C1C', '#F5E6D3'],
        });
      }
    } catch (err) {
      console.log('Confetti trigger error:', err);
    }
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text =
      lang === 'hi'
        ? `॥ श्री गणेशाय नमः ॥\n\nहार्दिक निमंत्रण: चिरंजीवि अंकित कुमार संग आयुष्मति कुमारी ईशा\nशुभ विवाह: 30 नवंबर 2026\nपरिणय स्थल: कोलगामा, सुल्तानगंज (भागलपुर)\nबारात प्रस्थान: नरहन स्टेट, विभूतिपुर (समस्तीपुर)\n\nकृप्या पधारकर वर-वधू को अपना आशीर्वाद प्रदान करें। निमंत्रण पत्र देखें:\n${currentUrl}`
        : `|| Shree Ganeshaya Namah ||\n\nCordially Inviting You: Chi. Ankit Kumar weds Ayushmati Kumari Isha\nWedding Date: November 30, 2026\nWedding Venue: Kolgama, Sultanganj (Bhagalpur)\nBarat Departure: Narhan Estate, Bibhutipur (Samastipur)\n\nPlease grace the auspicious occasion and shower your blessings. View digital card:\n${currentUrl}`;

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden text-maroon-dark ram-mandir-theme-bg selection:bg-saffron selection:text-white">
      {/* Floating Marigold Petals */}
      <FloatingPetals />

      {/* ============================================================== */}
      {/* TEMPLE ENTRANCE DOORS ANIMATION (PHONE & DESKTOP) */}
      {/* ============================================================== */}
      <div
        onClick={handleOpenDoor}
        onTouchEnd={handleOpenDoor}
        style={{ contain: 'paint' }}
        className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 transition-all duration-1000 perspective-1200 cursor-pointer ${isDoorOpened ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 pointer-events-auto visible'
          }`}
      >
        {/* Left Temple Door */}
        <motion.div
          animate={{ rotateY: isDoorOpened ? -115 : 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            transformOrigin: 'left center',
            backgroundImage: "linear-gradient(to right, rgba(43,5,5,0.85), rgba(74,13,13,0.88)), url('/images/ram-mandir-gate.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
          className="w-1/2 h-full border-r-2 border-gold shadow-2xl relative flex flex-col justify-between py-8 px-3 sm:px-6 select-none pointer-events-none"
        >
          {/* Decorative Inset Panel */}
          <div className="w-full h-full border-2 border-gold/40 rounded-xl relative p-3 sm:p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-maroon/20 via-transparent to-black/30">
            {/* Brass Boss Studs */}
            <div className="absolute top-4 left-2 sm:left-3 space-y-5 sm:space-y-7">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gold border border-amber-800 shadow-md" />
              ))}
            </div>

            {/* Top Motif & Shubh */}
            <div className="text-center pt-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-full bg-maroon-dark border border-gold flex items-center justify-center shadow-inner">
                <span className="text-lg sm:text-2xl">🪷</span>
              </div>
              <p className="font-headingHi text-gold text-xl sm:text-3xl font-bold mt-2 tracking-widest">
                ॥ शुभ ॥
              </p>
            </div>

            {/* Brass Temple Door Handle */}
            <div className="self-end my-auto -mr-1 sm:-mr-2">
              <div className="w-7 sm:w-10 h-14 sm:h-18 rounded-full border-2 sm:border-4 border-gold bg-gradient-to-b from-gold via-amber-700 to-gold flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-maroon border border-gold" />
              </div>
            </div>

            {/* Bottom Inscription */}
            <div className="text-center pb-2 opacity-80">
              <span className="text-gold font-shloka text-[11px] sm:text-xs">श्री सीताराम कृपा</span>
            </div>
          </div>
        </motion.div>

        {/* Right Temple Door */}
        <motion.div
          animate={{ rotateY: isDoorOpened ? 115 : 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            transformOrigin: 'right center',
            backgroundImage: "linear-gradient(to left, rgba(43,5,5,0.85), rgba(74,13,13,0.88)), url('/images/ram-mandir-gate.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
          }}
          className="w-1/2 h-full border-l-2 border-gold shadow-2xl relative flex flex-col justify-between py-8 px-3 sm:px-6 select-none pointer-events-none"
        >
          {/* Decorative Inset Panel */}
          <div className="w-full h-full border-2 border-gold/40 rounded-xl relative p-3 sm:p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-maroon/20 via-transparent to-black/30">
            {/* Brass Boss Studs */}
            <div className="absolute top-4 right-2 sm:right-3 space-y-5 sm:space-y-7">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gold border border-amber-800 shadow-md" />
              ))}
            </div>

            {/* Top Motif & Labh */}
            <div className="text-center pt-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-full bg-maroon-dark border border-gold flex items-center justify-center shadow-inner">
                <span className="text-lg sm:text-2xl">🪔</span>
              </div>
              <p className="font-headingHi text-gold text-xl sm:text-3xl font-bold mt-2 tracking-widest">
                ॥ लाभ ॥
              </p>
            </div>

            {/* Brass Temple Door Handle */}
            <div className="self-start my-auto -ml-1 sm:-ml-2">
              <div className="w-7 sm:w-10 h-14 sm:h-18 rounded-full border-2 sm:border-4 border-gold bg-gradient-to-b from-gold via-amber-700 to-gold flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-maroon border border-gold" />
              </div>
            </div>

            {/* Bottom Inscription */}
            <div className="text-center pb-2 opacity-80">
              <span className="text-gold font-shloka text-[11px] sm:text-xs">मांगलिक परिणय</span>
            </div>
          </div>
        </motion.div>

        {/* Center Tap to Open Prompt */}
        <motion.div
          animate={{
            scale: isDoorOpened ? 0.7 : 1,
            opacity: isDoorOpened ? 0 : 1,
          }}
          transition={{ duration: 0.5 }}
          style={{ transform: 'translateZ(100px)' }}
          className="absolute z-20 flex flex-col items-center px-4 max-w-xs text-center pointer-events-auto"
        >
          <div
            onClick={handleOpenDoor}
            onTouchEnd={handleOpenDoor}
            className="p-6 rounded-3xl bg-gradient-to-b from-[#2B0505]/95 via-[#4A0D0D]/95 to-[#2A0606]/95 border-2 border-gold shadow-diya-glow backdrop-blur-md flex flex-col items-center gap-2.5 cursor-pointer"
          >
            <DiyaIcon className="w-9 h-9" />

            <p className="font-shloka text-saffron-light font-bold text-xs sm:text-sm tracking-widest drop-shadow-sm">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <h2 className="font-headingHi text-2xl sm:text-3xl text-gold-light font-black tracking-wide drop-shadow-md">
              {lang === 'hi' ? '॥ शुभ विवाह ॥' : '॥ Sacred Wedding ॥'}
            </h2>

            <p className="text-xs sm:text-sm text-sandstone-light font-medium tracking-wider">
              {lang === 'hi' ? 'शुभ विवाह आमंत्रण पत्र' : 'Sacred Wedding Invitation'}
            </p>

            <button
              type="button"
              onClick={handleOpenDoor}
              onTouchEnd={handleOpenDoor}
              className="mt-3 group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-saffron via-saffron-dark to-maroon text-white font-bold text-sm border-2 border-gold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="animate-spin text-base">🪷</span>
              <span>{lang === 'hi' ? 'कपाट खोलें (Tap to Open)' : 'Open Invitation (द्वार खोलें)'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* FLOATING MOBILE-FRIENDLY CONTROLS (LANGUAGE & AUDIO TOGGLE) */}
      {/* ============================================================== */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        {/* Replay Door Opening Animation Button */}
        {isDoorOpened && (
          <button
            onClick={() => setIsDoorOpened(false)}
            className="flex items-center justify-center h-8 px-2.5 rounded-full bg-sandstone-light/90 border border-gold/70 text-maroon shadow-md text-xs font-semibold backdrop-blur-xs hover:border-maroon transition-all cursor-pointer"
            title={lang === 'hi' ? 'कपाट पुनः देखें' : 'Replay Door'}
          >
            <span>🚪</span>
            <span className="ml-1 hidden xs:inline">{lang === 'hi' ? 'कपाट' : 'Door'}</span>
          </button>
        )}

        {/* Language Toggle Pill */}
        <div className="flex items-center bg-sandstone-light/90 p-0.5 rounded-full border border-gold/70 shadow-md backdrop-blur-xs">
          <button
            onClick={() => setLang('hi')}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${lang === 'hi'
              ? 'bg-maroon text-gold shadow-xs'
              : 'text-maroon/70 hover:text-maroon'
              }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${lang === 'en'
              ? 'bg-maroon text-gold shadow-xs'
              : 'text-maroon/70 hover:text-maroon'
              }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Decorative Temple Toran Framing Top of Page */}
      <div className="pt-2">
        <TempleToran />
      </div>

      {/* ============================================================== */}
      {/* 2. HERO & SACRED INVOCATION (#home) */}
      {/* ============================================================== */}
      <section id="home" className="relative pt-6 pb-20 px-4 flex flex-col items-center text-center overflow-hidden w-full max-w-full">
        {/* Subtle Background Glow Rings */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 max-w-full bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] max-w-full bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full relative z-10">
          {/* Top Mantras & Divine Invocation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            {/* Ganesh Motif */}
            <div className="p-3 rounded-full bg-gradient-to-b from-maroon via-maroon-dark to-maroon shadow-md border-2 border-gold relative">
              <GaneshIcon className="w-14 h-14 text-gold drop-shadow" />
              <div className="absolute -inset-1 rounded-full border border-gold/50 pointer-events-none animate-pulse-slow" />
            </div>

            <p className="font-shloka text-saffron-dark font-bold text-xl md:text-2xl tracking-widest">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div className="max-w-2xl px-5 py-3 bg-sandstone-light/95 rounded-2xl border-2 border-gold/60 shadow-md backdrop-blur-sm">
              <p className="font-shloka text-maroon font-bold text-sm md:text-base leading-relaxed">
                सर्वमंगलमांगल्ये शिवे सर्वार्थसाधिके ।<br />
                शरण्ये त्र्यंबके गौरी, नारायणि नमोऽस्तु ते ॥
              </p>
            </div>

            {/* Opening Verse */}
            <div className="mt-4 px-6 py-4 bg-sandstone-light/95 rounded-2xl border-2 border-gold/50 shadow-md max-w-xl">
              <p className="font-shloka text-maroon font-bold text-base md:text-lg italic leading-relaxed whitespace-pre-line">
                {lang === 'hi' ? (
                  <>
                    &ldquo;हर अक्षर में प्रार्थना, हर पंक्ति में प्यार,
                    {'\n'}स्नेह निहित अधिकारमय, करें निमंत्रण स्वीकार।
                    {'\n'}मंगलम् भगवान विष्णुः मंगलम् गरूड़ध्वजः ।
                    {'\n'}मंगलम् पुण्डरीकाक्षः मंगलाय तनोऽ हरिः ॥&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;With a prayer in every word and warmth in every line,
                    {'\n'}We seek your gracious presence by divine design.
                    {'\n'}Mangalam Bhagwan Vishnuh, Mangalam Garudadhwajah,
                    {'\n'}Mangalam Pundarikakshah, Mangalaya Tano Harih.&rdquo;
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Grand Nagara Ram Mandir Arch Frame with Couple Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="my-8 relative px-4"
          >
            {/* Left & Right Temple Pillars */}
            <div className="absolute left-0 top-0 bottom-0 hidden sm:block">
              <TemplePillar height="h-full" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 hidden sm:block">
              <TemplePillar height="h-full" />
            </div>

            {/* Central Ornate Temple Arch Card */}
            <div className="sm:mx-10 p-5 sm:p-8 md:p-10 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative overflow-hidden">
              {/* Corner Floral Ornaments */}
              <div className="absolute top-2 left-2 text-gold opacity-60">❖</div>
              <div className="absolute top-2 right-2 text-gold opacity-60">❖</div>
              <div className="absolute bottom-2 left-2 text-gold opacity-60">❖</div>
              <div className="absolute bottom-2 right-2 text-gold opacity-60">❖</div>

              {/* Shikhara / Kalash Symbol */}
              <div className="flex justify-center items-center gap-3 mb-2">
                <DiyaIcon className="w-7 h-7" />
                <span className="text-xs uppercase tracking-widest text-saffron-dark font-bold font-headingEn">
                  {lang === 'hi' ? '॥ शुभ विवाह परिणय संस्कार ॥' : '॥ Auspicious Wedding Invitation ॥'}
                </span>
                <DiyaIcon className="w-7 h-7" />
              </div>

              {/* Grand Sacred Union Proclamation */}
              <div className="py-4">
                <h1 className="font-headingHi text-3xl sm:text-5xl md:text-6xl text-saffron-maroon font-black tracking-wide leading-tight">
                  {lang === 'hi' ? '॥ शुभ परिणय ॥' : '॥ Sacred Union ॥'}
                </h1>

                <div className="my-3 flex items-center justify-center gap-4">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold to-maroon" />
                  <span className="font-shloka text-saffron-dark text-sm sm:text-base font-bold px-3.5 py-1 rounded-full bg-sandstone-accent/70 border border-gold/50 shadow-xs">
                    {lang === 'hi' ? 'मांगलिक आमंत्रण पत्र' : 'Wedding Invitation'}
                  </span>
                  <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-gold to-maroon" />
                </div>

                <p className="font-shloka text-maroon font-bold text-base sm:text-lg max-w-lg mx-auto italic mt-2 leading-relaxed">
                  {lang === 'hi'
                    ? '« यदेतद्धृदयं तव तदस्तु हृदयं मम । यदिदं हृदयं मम तदस्तु हृदयं तव ॥ »'
                    : '“May your heart be my heart, and may my heart be yours.”'}
                </p>
              </div>

              {/* Interactive "Tap to Reveal Date" Section */}
              <div className="mt-4 flex flex-col items-center min-h-[90px] justify-center">
                <AnimatePresence mode="wait">
                  {!isDateRevealed ? (
                    <motion.div
                      key="hidden-prompt"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={handleRevealDate}
                        className="relative group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-saffron via-amber-600 to-maroon text-white font-bold text-sm sm:text-base border-2 border-gold shadow-diya-glow hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-slow"
                      >
                        <span className="text-base sm:text-lg">🗓️</span>
                        <span className="font-headingEn tracking-wider font-extrabold text-gold-light">
                          {lang === 'hi' ? 'शुभ विवाह तिथि जानें (Tap to Reveal Date)' : 'Tap to Reveal Wedding Date'}
                        </span>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light animate-spin" />

                        {/* Golden Shimmer Beam */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer" />
                        </div>
                      </button>

                      <p className="mt-2 text-[11px] sm:text-xs text-saffron-dark font-medium tracking-wide">
                        {lang === 'hi'
                          ? '👆 पावन विवाह तिथि जानने हेतु यहाँ स्पर्श करें'
                          : '👆 Tap above to reveal the auspicious date'}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="revealed-date"
                      initial={{ opacity: 0, scale: 0.75, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        onClick={triggerConfetti}
                        className="relative group inline-flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-gold font-semibold text-base sm:text-xl border-2 border-gold shadow-diya-glow cursor-pointer hover:scale-105 active:scale-95 transition-all"
                        title={lang === 'hi' ? 'शुभकामनाओं के लिए क्लिक करें' : 'Click to celebrate'}
                      >
                        <motion.div
                          animate={{ rotate: [0, 8, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        >
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-saffron-light" />
                        </motion.div>
                        <span className="tracking-wide text-gold-light drop-shadow-sm font-headingHi">
                          {lang === 'hi'
                            ? 'सोमवार, 30 नवंबर 2026'
                            : 'Monday, November 30, 2026'}
                        </span>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-light animate-pulse" />

                        {/* Subtle divine golden glimmer */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer" />
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-2.5">
                        <span className="text-xs font-semibold text-saffron-dark tracking-widest uppercase flex items-center gap-1.5">
                          <span>✨</span>
                          <span>{lang === 'hi' ? 'शुभ विवाह की पावन तिथि' : 'Auspicious Wedding Date'}</span>
                          <span>✨</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setIsDateRevealed(false)}
                          className="text-[11px] text-maroon/70 hover:text-maroon underline transition-colors cursor-pointer"
                          title={lang === 'hi' ? 'पुनः छिपाएं' : 'Hide Date'}
                        >
                          {lang === 'hi' ? '(पुनः छिपाएं ↺)' : '(Hide ↺)'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Wedding Live Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="font-headingEn text-xs sm:text-sm font-bold uppercase tracking-widest text-maroon mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              {lang === 'hi' ? 'शुभ घड़ी की उल्टी गिनती (शुभ लग्न)' : 'Auspicious Wedding Countdown'}
              <Sparkles className="w-4 h-4 text-saffron" />
            </p>

            <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-4 max-w-lg w-full">
              {[
                { labelHi: 'दिन', labelEn: 'Days', val: timeLeft.days },
                { labelHi: 'घंटे', labelEn: 'Hours', val: timeLeft.hours },
                { labelHi: 'मिनट', labelEn: 'Mins', val: timeLeft.minutes },
                { labelHi: 'सेकंड', labelEn: 'Secs', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={triggerConfetti}
                  className="cursor-pointer group flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-maroon via-maroon-dark to-maroon text-gold border sm:border-2 border-gold shadow-md transition-transform hover:-translate-y-1 active:scale-95"
                >
                  <span
                    suppressHydrationWarning
                    className="font-headingHi text-xl sm:text-4xl font-extrabold text-gold-light group-hover:scale-105 transition-transform"
                  >
                    {isMounted ? String(item.val).padStart(2, '0') : '00'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-sandstone-accent tracking-wider uppercase mt-0.5 sm:mt-1">
                    {lang === 'hi' ? item.labelHi : item.labelEn}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={triggerConfetti}
              className="mt-3 text-xs text-saffron-dark font-medium flex items-center gap-1 hover:underline"
            >
              <span>🎉</span> {lang === 'hi' ? 'शुभकामनाएं देने के लिए क्लिक करें' : 'Click to celebrate with confetti'}
            </button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <div className="mt-12 flex flex-col items-center gap-1 text-gold-rich animate-bounce">
            <span className="text-xs font-semibold tracking-wider uppercase font-headingEn">
              {lang === 'hi' ? 'शुभ दर्शन' : 'Scroll Down'}
            </span>
            <ChevronDown className="w-5 h-5 text-saffron" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. THE COUPLE & FAMILY LINEAGE (#couple — वर-वधू परिचय) */}
      {/* ============================================================== */}
      <section id="couple" className="py-16 px-4 bg-gradient-to-b from-transparent via-sandstone-light to-transparent overflow-hidden w-full max-w-full">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <DiyaIcon className="w-6 h-6" />
              <h2 className="font-headingHi text-3xl sm:text-4xl text-maroon font-bold">
                {lang === 'hi' ? '॥ वर - वधू परिचय ॥' : '॥ The Bride & Groom ॥'}
              </h2>
              <DiyaIcon className="w-6 h-6" />
            </div>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-2" />

            {/* Welcome Verse */}
            <p className="font-shloka text-maroon-dark text-base sm:text-lg max-w-2xl mx-auto italic mt-4 leading-relaxed">
              {lang === 'hi' ? (
                <>
                  &ldquo;सौभाग्य हमारा तब होगा, जब दर्शन आपका पायेंगे !<br />
                  हृदय कमल खिल जाएगा, जब आप द्वार पर आयेंगे !!<br />
                  <span className="text-saffron-dark font-semibold">स्नेही स्वजन, ईश्वर की असीम अनुकम्पा से...</span>&rdquo;
                </>
              ) : (
                <>
                  &ldquo;Our joy will be boundless when you grace our threshold with your auspicious presence.<br />
                  With the limitless blessings of the Almighty, we warmly present the bride and groom...&rdquo;
                </>
              )}
            </p>
          </div>

          {/* Two Side-by-Side Temple Sandstone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Groom Card (वर) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card flex flex-col justify-between"
            >
              {/* Top Arch Crown */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1 rounded-full bg-saffron text-white font-bold text-xs uppercase tracking-widest border border-gold shadow-sm">
                {lang === 'hi' ? '॥ वर ॥' : '॥ Groom ॥'}
              </div>

              <div>
                {/* Traditional Royal Groom Silhouette / Frame */}
                <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-gradient-to-b from-sandstone-light to-sandstone-accent border-2 border-gold flex items-center justify-center p-2 shadow-inner">
                  <div className="w-full h-full rounded-full bg-maroon/10 flex items-center justify-center border border-dashed border-gold">
                    <span className="text-3xl">👑</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-center mb-6"
                >
                  <h3 className="font-headingHi text-2xl sm:text-3xl font-bold text-saffron-maroon">
                    {lang === 'hi' ? 'चिरंजीवि अंकित कुमार' : 'Chi. Ankit Kumar'}
                  </h3>
                  <p className="text-xs font-semibold text-saffron-dark uppercase tracking-widest mt-0.5">
                    {lang === 'hi' ? '(वर / Groom)' : 'Groom'}
                  </p>
                </motion.div>

                {/* Lineage Details */}
                <div className="space-y-4 text-sm sm:text-base border-t border-gold/40 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'सुपौत्र :' : 'Grandson of :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'स्मृतिशेष सत्यनारायण ठाकुर'
                        : 'Late Satyanarayan Thakur'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'सुपुत्र :' : 'Son of :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'श्रीमती रंजना ठाकुर एवं श्री संजय कुमार ठाकुर'
                        : 'Smt. Ranjana Thakur & Shri Sanjay Kumar Thakur'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'निवास :' : 'Address :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'ग्राम + पो. - नरहन स्टेट, थाना - विभूतिपुर, जिला - समस्तीपुर'
                        : 'Vill + Post - Narhan Estate, P.S. - Bibhutipur, Dist - Samastipur (Bihar)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/30 text-center">
                <span className="text-xs font-semibold text-gold-rich">
                  🚩 {lang === 'hi' ? 'नरहन स्टेट, समस्तीपुर' : 'Narhan Estate, Samastipur'}
                </span>
              </div>
            </motion.div>

            {/* Bride Card (वधू) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card flex flex-col justify-between"
            >
              {/* Top Arch Crown */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1 rounded-full bg-maroon text-gold font-bold text-xs uppercase tracking-widest border border-gold shadow-sm">
                {lang === 'hi' ? '॥ वधू ॥' : '॥ Bride ॥'}
              </div>

              <div>
                {/* Traditional Royal Bride Silhouette / Frame */}
                <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-gradient-to-b from-sandstone-light to-sandstone-accent border-2 border-gold flex items-center justify-center p-2 shadow-inner">
                  <div className="w-full h-full rounded-full bg-maroon/10 flex items-center justify-center border border-dashed border-gold">
                    <span className="text-3xl">🪷</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-center mb-6"
                >
                  <h3 className="font-headingHi text-2xl sm:text-3xl font-bold text-saffron-maroon">
                    {lang === 'hi' ? 'आयुष्मति कुमारी ईशा' : 'Ayushmati Kumari Isha'}
                  </h3>
                  <p className="text-xs font-semibold text-saffron-dark uppercase tracking-widest mt-0.5">
                    {lang === 'hi' ? '(वधू / Bride)' : 'Bride'}
                  </p>
                </motion.div>

                {/* Lineage Details */}
                <div className="space-y-4 text-sm sm:text-base border-t border-gold/40 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'सुपौत्री :' : 'Granddaughter :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'स्मृतिशेष मणिकांत ठाकुर'
                        : 'Late Manikant Thakur'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'सुपुत्री :' : 'Daughter of :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'श्रीमती बेबी देवी एवं श्री अंजन कुमार ठाकुर'
                        : 'Smt. Baby Devi & Shri Anjan Kumar Thakur'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-bold text-maroon min-w-20 sm:min-w-24 shrink-0">
                      {lang === 'hi' ? 'निवास :' : 'Address :'}
                    </span>
                    <span className="font-medium text-maroon-dark">
                      {lang === 'hi'
                        ? 'ग्राम - कोलगामा, पोस्ट - तिलकपुर, थाना - सुल्तानगंज, जिला - भागलपुर'
                        : 'Vill - Kolgama, Post - Tilakpur, P.S. - Sultanganj, Dist - Bhagalpur (Bihar)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/30 text-center">
                <span className="text-xs font-semibold text-gold-rich">
                  🌺 {lang === 'hi' ? 'कोलगामा, सुल्तानगंज, भागलपुर' : 'Kolgama, Sultanganj, Bhagalpur'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Blessing Note Card */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-gold text-center border-2 border-gold shadow-md">
            <p className="font-shloka text-base sm:text-xl font-medium leading-relaxed">
              {lang === 'hi' ? (
                'परिणय बंधन की मांगलिक बेला पर पधार कर वर-वधू को अपने स्नेहिल आशीर्वचनों से अभिसिंचित कर हमें अनुगृहीत करें।'
              ) : (
                'Please grace this auspicious occasion of the sacred wedlock and bestow your loving blessings upon the bride and groom.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. AUSPICIOUS EVENTS TIMELINE (#events — मांगलिक कार्यक्रम) */}
      {/* ============================================================== */}
      <section id="events" className="py-16 px-4 relative overflow-hidden w-full max-w-full">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <KalashIcon className="w-8 h-8 text-saffron" />
              <h2 className="font-headingHi text-3xl sm:text-4xl text-maroon font-bold">
                {lang === 'hi' ? '॥ मांगलिक कार्यक्रम ॥' : '॥ Auspicious Ceremonies ॥'}
              </h2>
              <KalashIcon className="w-8 h-8 text-saffron" />
            </div>
            <p className="font-headingEn text-xs sm:text-sm uppercase tracking-widest text-saffron-dark font-bold">
              {lang === 'hi' ? 'मांगलिक बेला का शुभ समय सारिणी' : 'Wedding Itinerary & Rituals'}
            </p>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-2" />
          </div>

          {/* 4 Auspicious Events Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event 1: घृतढ़ारी, मटकोर एवं पूजा */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-saffron/15 border border-saffron flex items-center justify-center shrink-0">
                  <span className="text-2xl">🍯</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-saffron tracking-widest uppercase">
                    {lang === 'hi' ? 'रस्म प्रथम' : 'Event 01'}
                  </span>
                  <h3 className="font-headingHi text-xl sm:text-2xl font-bold text-maroon">
                    {lang === 'hi'
                      ? 'घृतढ़ारी, मटकोर एवं पूजा'
                      : 'Ghritdhari, Matkor & Puja'}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-maroon-dark">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>
                      {lang === 'hi'
                        ? 'दिनांक: 27-11-2026 (शुक्रवार)'
                        : 'Date: 27-11-2026 (Friday)'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-maroon/80 leading-relaxed">
                    {lang === 'hi'
                      ? 'कुलदेवता पूजन, मातृका पूजन एवं पारंपरिक मांगलिक मटकोर अनुष्ठान।'
                      : 'Traditional sacred soil rituals, Kuldevata sanctification and maternal ancestral worship.'}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/30 flex justify-between items-center text-xs text-saffron-dark font-semibold">
                <span>🚩 {lang === 'hi' ? 'नरहन स्टेट' : 'Narhan Estate'}</span>
                <span>✨ {lang === 'hi' ? 'शुभ मुहूर्त' : 'Shubh Muhurat'}</span>
              </div>
            </motion.div>

            {/* Event 2: हल्दी, मेंहदी रस्म एवं संगीत */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/20 border border-gold flex items-center justify-center shrink-0">
                  <span className="text-2xl">🌼</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-saffron tracking-widest uppercase">
                    {lang === 'hi' ? 'रस्म द्वितीय' : 'Event 02'}
                  </span>
                  <h3 className="font-headingHi text-xl sm:text-2xl font-bold text-maroon">
                    {lang === 'hi'
                      ? 'हल्दी, मेंहदी रस्म एवं संगीत'
                      : 'Haldi, Mehendi & Sangeet'}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-maroon-dark">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>
                      {lang === 'hi'
                        ? 'दिनांक: 28-11-2026 (शनिवार)'
                        : 'Date: 28-11-2026 (Saturday)'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-maroon/80 leading-relaxed">
                    {lang === 'hi'
                      ? 'हल्दी का उबटन, हाथों में रची मेहंदी, और ढोलक की थाप पर लोकगीत व संगीत उत्सव।'
                      : 'Joyous turmeric application, bridal henna artistry, folk music and family celebration.'}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/30 flex justify-between items-center text-xs text-saffron-dark font-semibold">
                <span>🎵 {lang === 'hi' ? 'गीत व संगीत' : 'Music & Celebration'}</span>
                <span>✨ {lang === 'hi' ? 'हर्षोल्लास' : 'Joyous Revelry'}</span>
              </div>
            </motion.div>

            {/* Event 3: शुभ विवाह (Shubh Vivah / Wedding Ceremony) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-sandstone-card via-sandstone-light to-sandstone-accent border-2 border-saffron shadow-temple-card relative flex flex-col justify-between ring-2 ring-gold/40"
            >
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-saffron text-white text-[11px] font-bold uppercase tracking-wider shadow">
                {lang === 'hi' ? 'मुख्य संस्कार' : 'Main Ceremony'}
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-maroon text-gold border border-gold flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-saffron tracking-widest uppercase">
                    {lang === 'hi' ? 'महा संस्कार' : 'Sacred Wedding'}
                  </span>
                  <h3 className="font-headingHi text-xl sm:text-2xl font-bold text-maroon">
                    {lang === 'hi'
                      ? 'शुभ विवाह (Shubh Vivah)'
                      : 'Shubh Vivah / Wedding Ceremony'}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-maroon-dark">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>
                      {lang === 'hi'
                        ? 'दिनांक: 30-11-2026 (सोमवार)'
                        : 'Date: 30-11-2026 (Monday)'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-maroon/80 leading-relaxed">
                    {lang === 'hi'
                      ? 'शुभ बारात आगमन, वरमाला, द्वारपूजा, हस्तमिलाप एवं सप्तपदी (अग्नि फेरे)।'
                      : 'Grand Barat reception, Varmala, Hastamelap and holy Saptapadi around the sacred Agni.'}
                  </p>
                  <div className="mt-2.5 p-2 rounded-xl bg-sandstone-light/90 border border-gold/40 text-xs text-maroon-dark space-y-1">
                    <p>
                      <span className="font-bold text-saffron-dark">{lang === 'hi' ? 'बारात प्रस्थान:' : 'Barat Departure:'}</span>{' '}
                      {lang === 'hi' ? 'नरहन स्टेट, विभूतिपुर (समस्तीपुर)' : 'Narhan Estate, Bibhutipur (Samastipur)'}
                    </p>
                    <p>
                      <span className="font-bold text-maroon">{lang === 'hi' ? 'परिणय स्थल:' : 'Wedding Venue:'}</span>{' '}
                      {lang === 'hi' ? 'कोलगामा, सुल्तानगंज (भागलपुर)' : 'Kolgama, Sultanganj (Bhagalpur)'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/30 flex justify-between items-center text-xs text-saffron-dark font-semibold">
                <span>🚩 {lang === 'hi' ? 'प्रस्थान: नरहन ➔ परिणय: कोलगामा' : 'Narhan ➔ Kolgama'}</span>
                <span>✨ {lang === 'hi' ? 'सोमवार संध्या' : 'Monday Evening'}</span>
              </div>
            </motion.div>

            {/* Event 4: प्रीति भोज (Reception Feast) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-maroon/15 border border-maroon flex items-center justify-center shrink-0">
                  <span className="text-2xl">🍛</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-saffron tracking-widest uppercase">
                    {lang === 'hi' ? 'रस्म चतुर्थ' : 'Event 04'}
                  </span>
                  <h3 className="font-headingHi text-xl sm:text-2xl font-bold text-maroon">
                    {lang === 'hi' ? 'प्रीति भोज' : 'Reception Feast'}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-maroon-dark">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>
                      {lang === 'hi'
                        ? 'दिनांक: 03-12-2026 (गुरुवार)'
                        : 'Date: 03-12-2026 (Thursday)'}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm font-semibold text-saffron-dark">
                    <Clock className="w-4 h-4 text-saffron" />
                    <span>
                      {lang === 'hi'
                        ? 'संध्या 04:00 बजे से आपके आगमन तक'
                        : 'From 4:00 PM onwards'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-maroon/80 leading-relaxed">
                    {lang === 'hi'
                      ? 'स्नेही स्वजनों एवं अतिथियों हेतु विशेष प्रीतिभोज एवं स्वागत समारोह।'
                      : 'Grand banquet and dinner reception in honor of the newlywed couple.'}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/30 flex justify-between items-center text-xs text-saffron-dark font-semibold">
                <span>🍽️ {lang === 'hi' ? 'महाभोज' : 'Grand Banquet'}</span>
                <span>✨ {lang === 'hi' ? 'सादर आमंत्रित' : 'Cordially Invited'}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. VENUE & DIRECTIONS (#venue — परिणय स्थल एवं बारात प्रस्थान) */}
      {/* ============================================================== */}
      <section id="venue" className="py-16 px-4 bg-sandstone-light/60 overflow-hidden w-full max-w-full">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <DiyaIcon className="w-6 h-6" />
              <h2 className="font-headingHi text-3xl sm:text-4xl text-maroon font-bold">
                {lang === 'hi' ? '॥ परिणय स्थल एवं बारात प्रस्थान ॥' : '॥ Wedding Venue & Barat Departure ॥'}
              </h2>
              <DiyaIcon className="w-6 h-6" />
            </div>
            <p className="font-headingEn text-xs sm:text-sm uppercase tracking-widest text-saffron-dark font-bold">
              {lang === 'hi' ? 'विवाह आयोजन एवं बारात का पावन विवरण' : 'Ceremony Destination & Departure Details'}
            </p>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-2" />
          </div>

          <div className="space-y-8">
            {/* Primary Venue Card: परिणय स्थल (कोलगामा, सुल्तानगंज) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1 rounded-full bg-saffron text-white font-bold text-xs uppercase tracking-widest border border-gold shadow-sm">
                {lang === 'hi' ? '॥ मुख्य परिणय स्थल ॥' : '॥ Wedding Ceremony Venue ॥'}
              </div>

              <div className="text-center mb-6 pt-2">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-saffron/15 text-saffron flex items-center justify-center border border-saffron">
                  <MapPin className="w-6 h-6 text-saffron-dark" />
                </div>
                <h3 className="font-headingHi text-2xl sm:text-3xl text-maroon font-bold">
                  {lang === 'hi'
                    ? 'ग्राम - कोलगामा (Kolgama)'
                    : 'Village - Kolgama'}
                </h3>
                <p className="mt-2 text-base sm:text-lg font-medium text-maroon-dark">
                  {lang === 'hi'
                    ? 'पोस्ट - तिलकपुर, थाना - सुल्तानगंज, जिला - भागलपुर (बिहार)'
                    : 'Post - Tilakpur, P.S. - Sultanganj, Dist - Bhagalpur (Bihar)'}
                </p>
                <span className="inline-block mt-2 px-4 py-1 rounded-full bg-maroon/10 text-maroon font-semibold text-xs border border-gold/40">
                  🗓️ {lang === 'hi' ? 'शुभ विवाह: 30 नवंबर 2026 (सोमवार)' : 'Shubh Vivah: Monday, November 30, 2026'}
                </span>
              </div>

              {/* Styled Google Maps Embed (Kolgama, Sultanganj) */}
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-inner relative mb-6">
                <iframe
                  title="Kolgama Sultanganj Location Map"
                  src="https://maps.google.com/maps?q=Kolgama+Tilakpur+Sultanganj+Bhagalpur+Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Direct Map Action Button */}
              <div className="flex justify-center items-center">
                <a
                  href="https://maps.google.com/?q=Kolgama+Tilakpur+Sultanganj+Bhagalpur+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-gold font-bold text-sm sm:text-base border border-gold shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <MapPin className="w-5 h-5 text-saffron-light" />
                  <span>{lang === 'hi' ? 'परिणय स्थल (कोलगामा) गूगल मैप्स पर देखें' : 'Open Wedding Venue in Maps'}</span>
                  <ExternalLink className="w-4 h-4 text-gold-light" />
                </a>
              </div>
            </div>

            {/* Secondary Card: बारात प्रस्थान स्थल (नरहन स्टेट, विभूतिपुर) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1 rounded-full bg-maroon text-gold font-bold text-xs uppercase tracking-widest border border-gold shadow-sm">
                {lang === 'hi' ? '॥ बारात प्रस्थान स्थल ॥' : '॥ Barat Departure Location ॥'}
              </div>

              <div className="text-center mb-6 pt-2">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-maroon/15 text-maroon flex items-center justify-center border border-maroon">
                  <MapPin className="w-6 h-6 text-maroon" />
                </div>
                <h3 className="font-headingHi text-2xl sm:text-3xl text-maroon font-bold">
                  {lang === 'hi'
                    ? 'नरहन स्टेट (Narhan Estate)'
                    : 'Narhan Estate'}
                </h3>
                <p className="mt-2 text-base sm:text-lg font-medium text-maroon-dark">
                  {lang === 'hi'
                    ? 'पुरानी बाजार, विभूतिपुर, जिला - समस्तीपुर (बिहार)'
                    : 'Purani Bazar, Bibhutipur, Dist - Samastipur, Bihar'}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-saffron-dark font-semibold">
                  {lang === 'hi'
                    ? '🚩 सोमवार, 30 नवंबर 2026 को शुभ बारात नरहन स्टेट से परिणय स्थल कोलगामा (सुल्तानगंज) हेतु प्रस्थान करेगी।'
                    : '🚩 On Monday, November 30, 2026, the auspicious Barat will depart from Narhan Estate for Kolgama (Sultanganj).'}
                </p>
              </div>

              {/* Direct Map Action Button for Narhan Estate */}
              <div className="flex justify-center items-center">
                <a
                  href="https://maps.google.com/?q=Narhan+Estate+Bibhutipur+Samastipur+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sandstone-light text-maroon font-bold text-sm sm:text-base border-2 border-gold/70 shadow-sm hover:border-maroon active:scale-95 transition-all"
                >
                  <MapPin className="w-4 h-4 text-saffron" />
                  <span>{lang === 'hi' ? 'बारात प्रस्थान स्थल (नरहन स्टेट) मैप पर देखें' : 'Open Barat Point in Maps'}</span>
                  <ExternalLink className="w-4 h-4 text-maroon/70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. KIDS' INVITATION & FAMILY HOSTS (#family — बाल मनुहार) */}
      {/* ============================================================== */}
      <section id="family" className="py-16 px-4 overflow-hidden w-full max-w-full">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* A. बाल मनुहार (Kids' Invitation Card) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sandstone-light via-sandstone to-sandstone-accent border-2 border-gold shadow-temple-card relative overflow-hidden">
            <div className="text-center mb-6">
              <span className="text-3xl">🪅</span>
              <h2 className="font-headingHi text-2xl sm:text-3xl text-saffron font-bold mt-1">
                {lang === 'hi' ? '॥ बाल मनुहार ॥' : '॥ Kids’ Loving Invitation ॥'}
              </h2>
              {/* Kids Verse */}
              <div className="my-4 p-4 rounded-2xl bg-white/60 border border-gold/40 max-w-xl mx-auto">
                <p className="font-shloka text-maroon text-lg sm:text-xl font-bold leading-relaxed italic">
                  &ldquo;नन्हें-नन्हें पाँव हमारे, कैसे आऊँ बुलाने को।<br />
                  हमारे घर में शादी है, भूल न जाना आने को।।&rdquo;
                </p>
                {lang === 'en' && (
                  <p className="text-xs text-maroon/70 mt-1 italic">
                    (&quot;With tiny little feet we cannot travel far to call; It&apos;s a wedding in our home, do come one and all!&quot;)
                  </p>
                )}
              </div>
            </div>

            {/* Kids Names List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-sandstone-card border border-gold/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                  {lang === 'hi' ? 'भतीजा एवं भतीजी' : 'Nephews & Nieces'}
                </span>
                <p className="font-headingHi text-xl font-bold text-maroon mt-2">
                  माही, पिहू (Mahi, Pihu)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sandstone-card border border-gold/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron">
                  {lang === 'hi' ? 'भगीना एवं भगिनी' : 'Cousins & Nieces'}
                </span>
                <p className="font-headingHi text-lg sm:text-xl font-bold text-maroon mt-2 leading-relaxed">
                  आर्यन, धैर्य, दिव्यांश, दैविक, मयरा, पाखी, स्नेहा
                </p>
                <p className="text-xs text-maroon/70 font-medium mt-1">
                  (Aryan, Dhairya, Divyansh, Daivik, Mayra, Pakhi, Sneha)
                </p>
              </div>
            </div>
          </div>

          {/* B. Family Hosts & Lineage */}
          <div className="p-6 sm:p-10 rounded-3xl bg-sandstone-card border-2 border-gold shadow-temple-card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 mb-2">
                <DiyaIcon className="w-6 h-6" />
                <h2 className="font-headingHi text-3xl sm:text-4xl text-maroon font-bold">
                  {lang === 'hi' ? '॥ स्नेही स्वजन एवं निमंत्रक ॥' : '॥ The Host Family ॥'}
                </h2>
                <DiyaIcon className="w-6 h-6" />
              </div>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-2" />
            </div>

            <div className="space-y-6 max-w-3xl mx-auto text-center sm:text-left">
              {/* दर्शनाभिलाषी */}
              <div className="p-4 rounded-2xl bg-sandstone-light/80 border border-gold/40">
                <span className="text-xs font-bold text-saffron-dark uppercase tracking-widest block mb-1">
                  {lang === 'hi' ? 'दर्शनाभिलाषी (Awaiting Your Presence):' : 'Awaiting Your Gracious Presence:'}
                </span>
                <p className="font-headingHi text-lg sm:text-xl font-bold text-maroon leading-relaxed">
                  अमित, रिशु, भारती-राहुल, रुचि-अनिल, संध्या-अनितेश, कोमल, अमित, रितिका, निशु एवं समस्त ठाकुर परिवार।
                </p>
                <p className="text-xs text-maroon/70 mt-1">
                  Amit, Rishu, Bharti-Rahul, Ruchi-Anil, Sandhya-Anitesh, Komal, Amit, Ritika, Nishu & Entire Thakur Family.
                </p>
              </div>

              {/* स्वागतोत्सुक */}
              <div className="p-4 rounded-2xl bg-sandstone-light/80 border border-gold/40">
                <span className="text-xs font-bold text-saffron-dark uppercase tracking-widest block mb-1">
                  {lang === 'hi' ? 'स्वागतोत्सुक (Eager to Welcome You):' : 'Eager to Welcome You:'}
                </span>
                <p className="font-headingHi text-xl font-bold text-maroon">
                  अमित एवं डोली (Amit & Doli)
                </p>
              </div>

              {/* आकांक्षी */}
              <div className="p-4 rounded-2xl bg-sandstone-light/80 border border-gold/40">
                <span className="text-xs font-bold text-saffron-dark uppercase tracking-widest block mb-1">
                  {lang === 'hi' ? 'आकांक्षी (With Warm Regards):' : 'With Warm Regards & Sincere Wishes:'}
                </span>
                <p className="font-headingHi text-xl font-bold text-maroon">
                  श्री गणेश ठाकुर (Shri Ganesh Thakur)
                </p>
              </div>
            </div>

            {/* Action Buttons: Click-to-call & WhatsApp Share */}
            <div className="mt-10 pt-6 border-t border-gold/40 flex flex-wrap justify-center items-center gap-4">
              {/* Call Button */}
              <a
                href="tel:+919572953036"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-saffron text-white font-bold text-sm sm:text-base border border-gold shadow-md hover:bg-saffron-dark transition-colors"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>{lang === 'hi' ? 'संपर्क करें: 9572953036' : 'Call Host: 9572953036'}</span>
              </a>

              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-bold text-sm sm:text-base border border-gold shadow-md hover:bg-green-800 transition-colors cursor-pointer"
              >
                <Share2 className="w-5 h-5 text-white" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. SACRED FOOTER */}
      {/* ============================================================== */}
      <footer className="mt-16 py-10 px-4 bg-maroon-dark text-gold border-t-4 border-gold text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <DiyaIcon className="w-6 h-6" />
            <span className="font-shloka text-lg sm:text-xl font-bold text-gold-light">
              ॥ जय श्री राम ॥
            </span>
            <DiyaIcon className="w-6 h-6" />
          </div>

          <p className="font-shloka text-sm sm:text-base text-sandstone-light max-w-lg leading-relaxed">
            {lang === 'hi'
              ? 'प्रभु श्री सीताराम जी की असीम अनुकम्पा से वर-वधू को सुखी एवं समृद्ध दांपत्य जीवन का आशीर्वाद प्रदान हो।'
              : 'May Lord Sita-Ram shower eternal peace, joy and prosperity upon the newlywed couple.'}
          </p>

          <div className="h-0.5 w-32 bg-gold/40 my-1" />

          <p className="text-xs text-sandstone-accent/80 font-medium tracking-wide">
            {lang === 'hi'
              ? 'ठाकुर परिवार, नरहन स्टेट (समस्तीपुर) की ओर से आप सभी का सादर अभिनंदन।'
              : 'Warmest regards from the Thakur Family, Narhan Estate, Samastipur.'}
          </p>
        </div>

        {/* Ambient bottom glow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 max-w-full h-20 bg-saffron/20 blur-2xl pointer-events-none" />
      </footer>
    </main>
  );
}
