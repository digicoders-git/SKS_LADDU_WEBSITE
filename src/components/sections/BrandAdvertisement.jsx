import React, { useState, useRef, useEffect, memo } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { throttle } from '../../utils/performance';

// Import videos
import add1 from '../../assets/images/add1.mp4';
import add2 from '../../assets/images/add2.mp4';

const BrandAdvertisement = memo(({ addToRefs }) => {
  const [isPlaying, setIsPlaying] = useState([false, false]);
  const [isMuted, setIsMuted] = useState([true, true]);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = [useRef(null), useRef(null)];
  const sectionRef = useRef(null);

  const videos = [
    { src: add1, title: "Authentic Sandila Experience" },
    { src: add2, title: "Traditional Craftsmanship" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      throttle(([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setIsPlaying([true, true]);
        } else if (!entry.isIntersecting && isVisible) {
          setIsPlaying([false, false]);
        }
      }, 200),
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    videoRefs.forEach((videoRef, index) => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying[index]) {
        video.play().catch(() => {
          const newPlaying = [...isPlaying];
          newPlaying[index] = false;
          setIsPlaying(newPlaying);
        });
      } else {
        video.pause();
      }
    });
  }, [isPlaying]);

  const togglePlay = (index) => {
    const newPlaying = [...isPlaying];
    newPlaying[index] = !newPlaying[index];
    setIsPlaying(newPlaying);
  };

  const toggleMute = (index) => {
    const newMuted = [...isMuted];
    newMuted[index] = !newMuted[index];
    setIsMuted(newMuted);
  };

  return (
    <section 
      ref={(el) => {
        sectionRef.current = el;
        addToRefs(el);
      }}
      className="scroll-section py-16 px-4 md:px-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      id="brand-story"
    >
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] rounded-full text-xs font-bold uppercase tracking-[0.4em] mb-6 border border-[var(--color-secondary)]/30 backdrop-blur-sm">
            Brand Story
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white font-[var(--font-heading)] tracking-tighter drop-shadow-2xl mb-4">
            Experience the <span className="text-[var(--color-secondary)] drop-shadow-[0_0_20px_rgba(242,183,5,0.5)]">Legacy</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Witness the journey of authentic Sandila laddus through cinematic storytelling
          </p>
        </div>

        {/* Video Containers */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {videos.map((video, index) => (
            <div key={index} className="relative group flex-1">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group-hover:border-[var(--color-secondary)]/50 transition-all duration-500">
                {/* Video Element */}
                <video
                  ref={videoRefs[index]}
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted={isMuted[index]}
                  loop
                  playsInline
                  preload="metadata"
                />

                {/* Video Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    {/* Play/Pause Button */}
                    <button
                      onClick={() => togglePlay(index)}
                      className="w-12 h-12 bg-[var(--color-secondary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)]/80 transition-colors shadow-lg"
                    >
                      {isPlaying[index] ? (
                        <Pause className="w-5 h-5 text-black" />
                      ) : (
                        <Play className="w-5 h-5 text-black ml-1" />
                      )}
                    </button>

                    {/* Mute Button */}
                    <button
                      onClick={() => toggleMute(index)}
                      className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      {isMuted[index] ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Loading State */}
                {!isVisible && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              {/* Video Title */}
              <div className="text-center mt-4">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Every frame tells the story of tradition, every moment captures the essence of authentic Sandila craftsmanship
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-semibold border border-[var(--color-secondary)]/30">
              🎬 Cinematic Quality
            </div>
            <div className="px-6 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-semibold border border-[var(--color-secondary)]/30">
              🏆 Award Winning Taste
            </div>
            <div className="px-6 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-semibold border border-[var(--color-secondary)]/30">
              🎭 Heritage Stories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BrandAdvertisement.displayName = 'BrandAdvertisement';

export default BrandAdvertisement;