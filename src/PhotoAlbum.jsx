import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  MapPin,
  Heart,
  Globe,
  Sunrise,
  Mountain,
  Waves,
  Trees,
  Landmark,
  BookOpen,
  Star,
} from 'lucide-react';

const PhotoAlbumBook = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [bookmarks, setBookmarks] = useState([]);
  const [showTransition, setShowTransition] = useState(false);

  // Optimized photo spreads with verified unique images
  const photoSpreads = useMemo(
    () => [
      {
        left: null,
        right: 'cover',
        theme: 'Begin Your Journey',
        icon: BookOpen,
      },
      {
        left: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop&q=75',
        theme: 'Dawn: New Beginnings',
        icon: Sunrise,
        leftCaption: 'As the first light touches the earth...',
        rightCaption: 'Mountains awaken from their slumber',
        narrative: 'Every journey begins with a sunrise, a promise of discovery.',
      },
      {
        left: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=700&h=500&fit=crop&q=75',
        theme: 'Mountains: Reaching Higher',
        icon: Mountain,
        leftCaption: 'Peaks that touch the infinite sky',
        rightCaption: 'Challenging us to climb beyond our limits',
        narrative: 'Mountains teach us that the greatest views come after the hardest climbs.',
      },
      {
        left: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=700&h=500&fit=crop&q=75',
        theme: 'Forests: Finding Peace',
        icon: Trees,
        leftCaption: 'Where ancient trees whisper wisdom',
        rightCaption: 'And sunlight filters through emerald canopies',
        narrative: 'In the heart of the forest, we remember our connection to nature.',
      },
      {
        left: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&h=500&fit=crop&q=75',
        theme: 'Waters: Flowing Forward',
        icon: Waves,
        leftCaption: 'Oceans that hold infinite mysteries',
        rightCaption: 'Lakes mirror the sky in perfect stillness',
        narrative: 'Water teaches us to adapt, to flow, to persist through all obstacles.',
      },
      {
        left: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&h=500&fit=crop&q=75',
        theme: 'Golden Hour: Moments of Magic',
        icon: Sparkles,
        leftCaption: 'When the world is painted in gold',
        rightCaption: 'Time stands still in perfect beauty',
        narrative: "Golden hour reminds us to pause and appreciate life's fleeting moments.",
      },
      {
        left: null,
        right: 'transition',
        theme: 'Chapter Two',
        icon: Globe,
        sectionTitle: 'Human Wonders',
        sectionSubtitle: 'Where creativity meets eternity',
      },
      {
        left: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=700&h=500&fit=crop&q=75',
        theme: 'Great Wall: Guardians of Time',
        icon: Landmark,
        leftCaption: 'Stretching across mountains like a dragon',
        rightCaption: '2,000 years of human determination',
        narrative: 'Built to protect, it now unites the world in wonder.',
        stats: '21,196 km long',
      },
      {
        left: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=500&fit=crop&q=75',
        theme: 'Taj Mahal: Monument to Love',
        icon: Heart,
        leftCaption: 'White marble poetry under moonlight',
        rightCaption: 'Built by 20,000 artisans for eternal love',
        narrative: 'A testament that love transcends time and death.',
        stats: 'Built 1632-1653',
      },
      {
        left: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=700&h=500&fit=crop&q=75',
        theme: 'Colosseum: Echoes of Glory',
        icon: Landmark,
        leftCaption: 'Where 50,000 Romans once roared',
        rightCaption: "Stone witnesses to history's drama",
        narrative: 'The grandest stage of the ancient world still stands proud.',
        stats: '80 AD',
      },
      {
        left: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=700&h=500&fit=crop&q=75',
        theme: 'Machu Picchu: City in the Clouds',
        icon: Mountain,
        leftCaption: 'Incan perfection at 2,430 meters',
        rightCaption: 'Lost for 400 years, found forever',
        narrative: 'Hidden by clouds, revealed to inspire generations.',
        stats: '15th century',
      },
      {
        left: 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=700&h=500&fit=crop&q=75',
        theme: 'Petra: Rose-Red Mystery',
        icon: Sparkles,
        leftCaption: 'Carved from solid rock 2,000 years ago',
        rightCaption: 'The Treasury glows at sunrise',
        narrative: 'A city hewn from stone, painted by nature in sunset hues.',
        stats: '312 BC',
      },
      {
        left: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=700&h=500&fit=crop&q=75',
        theme: 'Christ the Redeemer: Arms Wide Open',
        icon: Heart,
        leftCaption: 'Watching over Rio from 710 meters high',
        rightCaption: '30 meters of faith and hope',
        narrative: 'Embracing all who gaze upon it with open arms.',
        stats: 'Completed 1931',
      },
      {
        left: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=700&h=500&fit=crop&q=75',
        right: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&h=500&fit=crop&q=75',
        theme: 'Chichen Itza: Cosmic Calendar',
        icon: Star,
        leftCaption: 'El Castillo: where math meets mystery',
        rightCaption: '365 steps for each day of the year',
        narrative: 'The Mayans built pyramids that speak to the stars.',
        stats: '600-900 AD',
      },
      {
        left: null,
        right: 'end',
        theme: 'Until We Meet Again',
        icon: Heart,
      },
    ],
    []
  );

  // Optimized parallel image preloading with cancellation
  useEffect(() => {
    const urls = photoSpreads.flatMap((s) =>
      [s.left, s.right].filter((u) => u?.startsWith('http'))
    );

    let cancelled = false;

    Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => resolve(url);
          })
      )
    ).then((loaded) => {
      if (!cancelled) setLoadedImages(new Set(loaded));
    });

    return () => {
      cancelled = true;
    };
  }, [photoSpreads]);

  // Chapter transition effect
  useEffect(() => {
    if (currentSpread === 6) {
      setShowTransition(true);
      const timer = setTimeout(() => setShowTransition(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentSpread]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSpread();
      if (e.key === 'ArrowLeft') prevSpread();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSpread, isFlipping]);

  const nextSpread = useCallback(() => {
    if (currentSpread < photoSpreads.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread((prev) => prev + 1);
        setTimeout(() => setIsFlipping(false), 80);
      }, 650);
    }
  }, [currentSpread, isFlipping, photoSpreads.length]);

  const prevSpread = useCallback(() => {
    if (currentSpread > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread((prev) => prev - 1);
        setTimeout(() => setIsFlipping(false), 80);
      }, 650);
    }
  }, [currentSpread, isFlipping]);

  const toggleBookmark = () => {
    setBookmarks((prev) =>
      prev.includes(currentSpread)
        ? prev.filter((b) => b !== currentSpread)
        : [...prev, currentSpread]
    );
  };

  // Touch swipe handlers
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSpread() : prevSpread();
    setTouchStart(null);
  };

  const currentData = photoSpreads[currentSpread];
  const IconComponent = currentData.icon || Camera;

  // Cinematic image component with dramatic effects
  const ImageDisplay = ({ src, caption }) => {
    const isLoaded = loadedImages.has(src);

    return (
      <div className="relative w-full h-full overflow-hidden bg-slate-300 group">
        <img
          src={src}
          alt={caption}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />

        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-slate-600 text-sm animate-pulse">Loading...</p>
          </div>
        )}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Caption with smooth reveal */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
          <p className="text-sm font-light tracking-wide drop-shadow-2xl leading-relaxed">
            {caption}
          </p>
          {currentData.stats && (
            <p className="text-xs text-amber-300 mt-2 font-medium drop-shadow-lg">
              {currentData.stats}
            </p>
          )}
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-10 h-10 border-t-2 border-r-2 border-white/60"></div>
        </div>
      </div>
    );
  };

  // Cover page component
  const CoverPage = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)',
          }}
        ></div>
      </div>
      <div className="text-center px-12 relative z-10">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-30 animate-pulse"></div>
          <h1 className="text-7xl font-serif text-amber-400 mb-2 tracking-wider relative drop-shadow-2xl">
            Wonders
          </h1>
          <p className="text-6xl font-serif text-amber-500/70 italic relative">of Our World</p>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
        <p className="text-amber-200 text-xl font-light mb-8 italic">
          A Visual Journey Through Time & Beauty
        </p>
        <div className="flex items-center justify-center gap-3 text-amber-300/70 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Curated Collection</span>
          <span>•</span>
          <span>2025</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  // Transition page component
  const TransitionPage = ({ data }) => (
    <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-500 to-rose-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
      <div className="text-center px-12 relative z-10">
        <Globe className="w-28 h-28 text-white mx-auto mb-8 animate-spin-slow drop-shadow-2xl" />
        <h2 className="text-6xl font-serif text-white mb-4 drop-shadow-lg">{data.sectionTitle}</h2>
        <div className="w-40 h-1 bg-white mx-auto mb-6"></div>
        <p className="text-white text-xl font-light leading-relaxed drop-shadow-md">
          {data.sectionSubtitle}
        </p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-white animate-pulse" />
          <Star className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Star className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );

  // End page component
  const EndPage = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Starfield */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
      <div className="text-center z-10 px-12 max-w-2xl">
        <Heart className="w-24 h-24 text-rose-400 mx-auto mb-8 animate-pulse drop-shadow-2xl" />
        <h2 className="text-6xl font-serif text-amber-300 mb-8 leading-tight">
          The Journey
          <br />
          Continues...
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
        <p className="text-amber-100 text-lg font-light leading-relaxed mb-6">
          Thank you for wandering through these pages of wonder. From nature's untouched majesty to
          humanity's greatest monuments, each image whispers a story of our beautiful, awe-inspiring
          world.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <p className="text-amber-200/90 text-base font-light italic leading-relaxed">
            "The world is a book, and those who do not travel
            <br />
            read only one page."
          </p>
          <p className="text-amber-300/60 text-sm mt-2">— Saint Augustine</p>
        </div>
        <div className="flex items-center justify-center gap-3 text-amber-300/60 text-sm">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Until we meet again, fellow explorer</span>
          <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b1c11] via-[#1d1410] to-[#2b1c11] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic warm ambient orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-25 blur-3xl">
        <div
          className="absolute top-40 left-20 w-[28rem] h-[28rem] rounded-full bg-amber-600/40"
          style={{ animation: 'pulse-slow 5s ease-in-out infinite' }}
        ></div>
        <div
          className="absolute bottom-32 right-24 w-[26rem] h-[26rem] rounded-full bg-orange-500/35"
          style={{ animation: 'pulse-slow 7s ease-in-out infinite', animationDelay: '1s' }}
        ></div>
      </div>

      {/* Chapter transition overlay */}
      {showTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade">
          <div className="text-center">
            <Globe className="w-24 h-24 text-amber-400 mx-auto mb-6 animate-spin-slow" />
            <h2 className="text-5xl font-serif text-white mb-4">Chapter Two</h2>
            <p className="text-amber-300 text-xl">Entering the realm of human wonders...</p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <IconComponent className="w-8 h-8 text-amber-300 animate-pulse" />
            <h1 className="text-5xl font-serif text-amber-100 tracking-wide drop-shadow-lg">
              Wonders of Our World
            </h1>
            <IconComponent className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          <p className="text-amber-200 text-lg font-light italic mb-4">
            A narrative journey through nature and human achievement
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentSpread + 1) / photoSpreads.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Book container */}
        <div
          className="relative mx-auto max-w-6xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: '2000px' }}
        >
          {/* Shadow layers */}
          <div className="absolute inset-0 bg-black opacity-40 blur-3xl transform translate-y-12 scale-95 rounded-2xl"></div>
          <div className="absolute inset-0 bg-black opacity-20 blur-2xl transform translate-y-8 scale-97 rounded-2xl"></div>

          {/* Book wrapper with brightness dim during flip */}
          <div
            className={`relative bg-gradient-to-r from-amber-900/40 via-amber-800/50 to-amber-900/40 rounded-2xl shadow-2xl p-3 transition-all duration-500 ${
              isFlipping ? 'brightness-75' : 'brightness-100'
            }`}
          >
            {/* Leather texture */}
            <div
              className="absolute inset-0 opacity-30 rounded-2xl pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
              }}
            ></div>

            {/* Inner pages */}
            <div
              className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-xl shadow-inner flex overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            >
              {/* Left page */}
              <div className="w-1/2 h-full relative group">
                {currentData.left ? (
                  <ImageDisplay src={currentData.left} caption={currentData.leftCaption} />
                ) : currentData.right === 'transition' ? (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center">
                    <div className="text-center px-8">
                      <MapPin className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-bounce" />
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-px bg-amber-400"></div>
                        <Star className="w-4 h-4 text-amber-400" />
                        <div className="w-8 h-px bg-amber-400"></div>
                      </div>
                      <h2 className="text-3xl font-serif text-amber-300 mb-3">Chapter Two</h2>
                      <p className="text-amber-100 text-sm font-light">From Nature's Canvas</p>
                      <p className="text-amber-100 text-sm font-light">To Human Masterpieces</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 flex items-center justify-center">
                    <div className="text-center px-8">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl relative">
                        <Camera className="w-16 h-16 text-white" />
                        <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-20"></div>
                      </div>
                      <h2 className="text-3xl font-serif text-amber-900 mb-3">Welcome, Explorer</h2>
                      <p className="text-amber-700 font-light text-lg mb-4">
                        Embark on a visual odyssey
                      </p>
                      <div className="flex items-center justify-center gap-2 text-amber-600 text-sm">
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                        <span>Swipe to begin</span>
                        <div
                          className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Book spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-2 transform -translate-x-1/2 z-10">
                <div className="h-full w-full bg-gradient-to-r from-amber-800/40 via-amber-900/80 to-amber-800/40 shadow-lg"></div>
                <div className="absolute top-0 left-1/2 h-full w-px bg-amber-950/50 -translate-x-1/2"></div>
              </div>

              {/* Right page with flip animation */}
              <div className="w-1/2 h-full relative group overflow-hidden">
                <div
                  className={`absolute inset-0 will-change-transform ${
                    isFlipping ? `animate-flip-${flipDirection}` : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {currentData.right === 'cover' ? (
                    <CoverPage />
                  ) : currentData.right === 'transition' ? (
                    <TransitionPage data={currentData} />
                  ) : currentData.right === 'end' ? (
                    <EndPage />
                  ) : (
                    <ImageDisplay src={currentData.right} caption={currentData.rightCaption} />
                  )}
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-300/30 pointer-events-none"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-300/30 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-300/30 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-300/30 pointer-events-none"></div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSpread}
            disabled={currentSpread === 0 || isFlipping}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-out ${
              currentSpread === 0 || isFlipping
                ? 'opacity-20 cursor-not-allowed scale-90'
                : 'opacity-90 hover:opacity-100 hover:scale-110 hover:shadow-2xl active:scale-105'
            }`}
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>

          <button
            onClick={nextSpread}
            disabled={currentSpread >= photoSpreads.length - 1 || isFlipping}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-out ${
              currentSpread >= photoSpreads.length - 1 || isFlipping
                ? 'opacity-20 cursor-not-allowed scale-90'
                : 'opacity-90 hover:opacity-100 hover:scale-110 hover:shadow-2xl active:scale-105'
            }`}
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Bookmark button */}
          {currentSpread > 0 && currentSpread < photoSpreads.length - 1 && (
            <button
              onClick={toggleBookmark}
              className="absolute -top-6 right-8 w-12 h-16 bg-gradient-to-b from-rose-500 to-rose-600 rounded-b-lg shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl active:scale-105"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  bookmarks.includes(currentSpread)
                    ? 'text-white fill-white scale-110'
                    : 'text-white/70'
                }`}
              />
            </button>
          )}
        </div>

        {/* Page info */}
        <div className="mt-8 text-center space-y-4">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3 border border-white/20 shadow-lg">
            <IconComponent className="w-5 h-5 text-amber-300" />
            <span className="text-amber-300 font-medium text-lg">{currentData.theme}</span>
            <span className="w-px h-6 bg-amber-300/30"></span>
            <span className="text-white/70 text-sm">
              {currentSpread + 1} / {photoSpreads.length}
            </span>
          </div>

          {/* Narrative text */}
          {currentData.narrative && (
            <div className="max-w-2xl mx-auto">
              <p className="text-amber-200/80 text-sm font-light italic leading-relaxed">
                {currentData.narrative}
              </p>
            </div>
          )}

          {/* Bookmark indicators */}
          {bookmarks.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-rose-300/70 text-xs">
                {bookmarks.length} {bookmarks.length === 1 ? 'page' : 'pages'} bookmarked
              </span>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="mt-6 text-center">
          <p className="text-white/30 text-xs font-light">
            Use arrow keys ← → or swipe to navigate
          </p>
        </div>
      </div>

      <style>{`
        @keyframes flip-next {
          0% {
            transform: perspective(2000px) rotateY(0deg);
            box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: perspective(2000px) rotateY(-90deg);
            box-shadow: -15px 10px 40px rgba(0, 0, 0, 0.6);
          }
          100% {
            transform: perspective(2000px) rotateY(-180deg);
            box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
          }
        }

        @keyframes flip-prev {
          0% {
            transform: perspective(2000px) rotateY(-180deg);
            box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: perspective(2000px) rotateY(-90deg);
            box-shadow: -15px 10px 40px rgba(0, 0, 0, 0.6);
          }
          100% {
            transform: perspective(2000px) rotateY(0deg);
            box-shadow: -5px 5px 20px rgba(0, 0, 0, 0.3);
          }
        }

        .animate-flip-next {
          animation: flip-next 0.65s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .animate-flip-prev {
          animation: flip-prev 0.65s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes fade {
          0%,
          100% {
            opacity: 0;
          }
          20%,
          80% {
            opacity: 1;
          }
        }

        .animate-fade {
          animation: fade 2s ease-in-out;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.05);
          }
        }

        @media (max-width: 1024px) {
          .absolute.-translate-x-16,
          .absolute.translate-x-16 {
            transform: translateY(-50%) translateX(0) !important;
            position: relative;
            margin: 1rem auto;
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoAlbumBook;