import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Castle, Film, Truck, Play, X, Shield, Droplets, Leaf, Heart as HeartIcon } from 'lucide-react';
import LadduCard from '../../components/cards/LadduCard';
import Footer from '../../components/layout/Footer';
import heroLaddus from '../../assets/images/hero-laddus.png';
import storyMaker from '../../assets/images/story-maker.png';
import besanLaddu from '../../assets/images/besan-laddu.png';
import kesarLaddu from '../../assets/images/kesar-laddu.png';
import nariyalLaddu from '../../assets/images/nariyal-laddu.png';

import { listProductsApi } from '../../api/product';

const videoReviews = [
  { id: 1, name: 'Anjali S.', thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: 2, name: 'Rajesh K.', thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { id: 3, name: 'Meera T.', thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 4, name: 'Suresh P.', thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { id: 5, name: 'Priya M.', thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
];

const Home = () => {
  const sectionRefs = useRef([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRef = useRef(null);
  const ladduScrollRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProductsApi();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videoContainer = scrollRef.current;
    const ladduContainer = ladduScrollRef.current;

    let videoInterval;
    let ladduInterval;

    const startVideoScroll = () => {
      if (videoInterval) clearInterval(videoInterval);
      videoInterval = setInterval(() => {
        if (!videoContainer) return;
        if (videoContainer.scrollLeft >= videoContainer.scrollWidth / 3) {
          videoContainer.scrollLeft = 0;
        } else {
          videoContainer.scrollLeft += 1.5; // Adjusted speed for smoothness
        }
      }, 20);
    };

    const startLadduScroll = () => {
      if (ladduInterval) clearInterval(ladduInterval);
      ladduInterval = setInterval(() => {
        if (!ladduContainer) return;
        if (ladduContainer.scrollLeft >= ladduContainer.scrollWidth / 3) {
          ladduContainer.scrollLeft = 0;
        } else {
          ladduContainer.scrollLeft += 1.5; // Consistent speed
        }
      }, 20);
    };

    const stopVideoScroll = () => {
      if (videoInterval) clearInterval(videoInterval);
    };

    const stopLadduScroll = () => {
      if (ladduInterval) clearInterval(ladduInterval);
    };

    if (videoContainer) {
      setTimeout(startVideoScroll, 100); // Small delay for layout
      videoContainer.addEventListener('mouseenter', stopVideoScroll);
      videoContainer.addEventListener('mouseleave', startVideoScroll);
    }

    if (ladduContainer) {
      setTimeout(startLadduScroll, 100);
      ladduContainer.addEventListener('mouseenter', stopLadduScroll);
      ladduContainer.addEventListener('mouseleave', startLadduScroll);
    }

    return () => {
      stopVideoScroll();
      stopLadduScroll();
      if (videoContainer) {
        videoContainer.removeEventListener('mouseenter', stopVideoScroll);
        videoContainer.removeEventListener('mouseleave', startVideoScroll);
      }
      if (ladduContainer) {
        ladduContainer.removeEventListener('mouseenter', stopLadduScroll);
        ladduContainer.removeEventListener('mouseleave', startLadduScroll);
      }
    };
  }, [products]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="bg-[var(--color-primary)] -mt-10 text-[var(--color-text)] font-[var(--font-body)] overflow-x-hidden">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between pt-24 pb-12 px-8 md:px-24 min-h-[70vh] bg-[linear-gradient(0deg,rgba(255,212,0,0.2)_0%,transparent_70%)] mt-0 relative z-10 shadow-2xl mb-1" id="home">
        <div className="flex-1 max-w-xl text-center md:text-left z-10">
          <h1 className="text-4xl md:text-6xl text-[var(--color-secondary)] font-bold leading-tight mb-6">
            The Original Taste of Sandila, <br />Now at Your Home!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 italic">
            Traditional Sandila Laddus Delivered to Your Doorstep
          </p>
          <Link
            to="/shop"
            className="hero-btn px-10 py-4 bg-[var(--color-secondary)] text-[var(--color-primary)] no-underline rounded-md text-lg font-semibold inline-block transition-all duration-300 shadow-[0_4px_15px_rgba(255,212,0,0.3)] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,212,0,0.4)]"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Order Now ›
          </Link>
        </div>
        <div className="flex-1 flex justify-center mt-8 md:mt-0 relative">
          <img
            src={heroLaddus}
            alt="Traditional Laddus"
            className="max-w-[80%] md:max-w-[70%] rounded-3xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
          ` }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={addToRefs} className="scroll-section bg-[var(--color-primary)] text-[var(--color-secondary)] py-24 px-8 md:px-24 relative z-20 overflow-hidden mb-2 border-t border-[var(--color-secondary)]/5 shadow-[0_10px_32px_-10px_rgba(255,255,255,0.24),0_-4px_16px_-6px_rgba(0,0,0,0.1)]" id="about">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="home-bubble home-bubble-1"></div>
          <div className="home-bubble home-bubble-2"></div>
          <div className="home-bubble home-bubble-3"></div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            .home-bubble {
              position: absolute;
              background: rgba(255, 212, 0, 0.2);
              border-radius: 50%;
              animation: float-home-bubble 20s infinite ease-in-out;
            }
            .home-bubble-1 {
              width: 150px;
              height: 150px;
              left: 5%;
              top: 10%;
              animation-delay: 0s;
            }
            .home-bubble-2 {
              width: 100px;
              height: 100px;
              right: 10%;
              bottom: 20%;
              animation-delay: 5s;
            }
            .home-bubble-3 {
              width: 80px;
              height: 80px;
              left: 40%;
              bottom: 10%;
              animation-delay: 10s;
            }
            @keyframes float-home-bubble {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
              50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
            }
          `
        }} />
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl text-[var(--color-secondary)] mb-8 flex items-center">
              <span className="mr-3 opacity-50">::</span>
              Our Story
            </h2>
            <ul className="list-none p-0">
              <li className="mb-6 text-lg flex items-start leading-relaxed"><User className="mr-4 mt-1 text-[var(--color-secondary)] w-6 h-6 flex-shrink-0" /> I am Satish Kumar, a resident of Sandila. I have been enjoying Sandila's Laddus since childhood.</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed"><Heart className="mr-4 mt-1 text-[var(--color-secondary)] w-6 h-6 flex-shrink-0" /> Our Laddu tradition is more than 100 years old!</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed"><Castle className="mr-4 mt-1 text-[var(--color-secondary)] w-6 h-6 flex-shrink-0" /> "The feast of the Nawabs of Lucknow is incomplete without Sandila's authentic Laddus!"</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed"><Film className="mr-4 mt-1 text-[var(--color-secondary)] w-6 h-6 flex-shrink-0" /> They have even been celebrated in several Bollywood movies.</li>
              <li className="mb-6 text-lg flex items-start leading-relaxed"><Truck className="mr-4 mt-1 text-[var(--color-secondary)] w-6 h-6 flex-shrink-0" /> Today, carrying this legacy forward, we bring you the original Laddus of Sandila, now available online!</li>
            </ul>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="border-[8px] border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <img src={storyMaker} alt="Making Laddus" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Laddus Section - Auto Scrolling Carousel */}
      <section ref={addToRefs} className="scroll-section py-16 px-8 md:px-24 text-center bg-[var(--color-primary)] relative z-10 shadow-[0_10px_32px_-10px_rgba(255,255,255,0.24),0_-4px_16px_-6px_rgba(0,0,0,0.1)] mb-2 overflow-hidden" id="laddus">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-2 font-bold">Our Laddus</h2>
        <p className="italic text-gray-500 mb-16">Pure and Delicious</p>

        <div className="relative w-full overflow-hidden">
          <div
            ref={ladduScrollRef}
            className="flex gap-4 md:gap-8 overflow-hidden py-4"
          >
            {/* Triple products for seamless scrolling */}
            {[...products, ...products, ...products].map((item, index) => (
              <div key={`${item._id}-${index}`} className="w-[90vw] md:w-[350px] flex-shrink-0">
                <LadduCard
                  product={{
                    id: item._id,
                    name: item.name,
                    img: item.mainImage?.url || besanLaddu,
                    price: item.price,
                    finalPrice: item.finalPrice,
                    discountPercent: item.discountPercent,
                    priceStr: `₹${item.finalPrice} / kg`,
                    description: item.description,
                    category: item.category?.name || 'Special'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <p className="text-gray-400 mt-8">Loading delicious laddus...</p>
        )}
      </section>

      {/* Our Priorities Section (Moved Down) */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 bg-[var(--color-accent)]/5 relative z-10 shadow-[0_10px_32px_-10px_rgba(255,255,255,0.24),0_-4px_16px_-6px_rgba(0,0,0,0.1)] mb-2" id="priorities">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-16 font-bold text-center">Our Priorities</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Health First</h3>
            <p className="text-sm text-[var(--color-text)]">No artificial preservatives, colors, or flavors. Pure and natural ingredients only.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Hygiene Standards</h3>
            <p className="text-sm text-[var(--color-text)]">FSSAI certified kitchen with strict hygiene protocols and regular quality checks.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Fresh Daily</h3>
            <p className="text-sm text-[var(--color-text)]">Made fresh every day and delivered within 24-48 hours to ensure maximum freshness.</p>
          </div>
          <div className="text-center p-6 bg-[var(--color-muted)] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">Made with Love</h3>
            <p className="text-sm text-[var(--color-text)]">Every laddu is handcrafted with care, carrying forward our family's century-old tradition.</p>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-muted)] text-center relative z-10 shadow-[0_10px_32px_-10px_rgba(255,255,255,0.24),0_-4px_16px_-6px_rgba(0,0,0,0.1)] mb-2" id="testimonials">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-16 font-bold">Customer Video Reviews</h2>
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-hidden pb-4"
          >
            {/* Triple video reviews for seamless scrolling */}
            {[...videoReviews, ...videoReviews, ...videoReviews].map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 bg-[var(--color-muted)] rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <video
                    src={video.videoUrl}
                    className="w-full h-56 object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {
        selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4 pt-32">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[70vh] overflow-hidden relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute bottom-4 right-4 p-1 md:p-2 bg-black text-white rounded-full transition-colors z-10 hover:bg-gray-800"
              >
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <div className="p-6">
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full aspect-video rounded-lg"
                  controls
                  autoPlay
                  onLoadedData={(e) => {
                    setTimeout(() => {
                      e.target.pause();
                    }, 5000);
                  }}
                />
                <div className="mt-4 text-center">
                  <p className="text-gray-600">Customer Review</p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Founder Section (Moved to Bottom) */}
      <section ref={addToRefs} className="scroll-section py-24 px-8 md:px-24 bg-[var(--color-primary)] relative z-10 shadow-[0_10px_32px_-10px_rgba(255,255,255,0.24),0_-4px_16px_-6px_rgba(0,0,0,0.1)]" id="founders">
        <h2 className="text-4xl text-[var(--color-secondary)] mb-16 font-bold text-center">Meet Our Founders</h2>
        <div className="flex flex-col gap-16 max-w-6xl mx-auto">
          {/* Founder 1: Satish Kumar */}
          <div className="flex flex-col md:flex-row gap-12 items-center bg-[var(--color-muted)] p-8 rounded-3xl shadow-lg border border-[var(--color-secondary)]/10 text-left">
            <div className="w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-[var(--color-secondary)] shadow-lg">
              <img src={storyMaker} alt="Satish Kumar - Founder" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">Satish Kumar</h3>
              <p className="text-[var(--color-accent)] font-semibold mb-4 text-xl">Founder & Master Craftsman</p>
              <p className="text-[var(--color-text)] leading-relaxed text-lg">
                Born and raised in Sandila, Satish has been perfecting the art of laddu making for over 25 years.
                His passion for preserving traditional recipes and bringing authentic flavors to modern homes drives our mission.
                He personally selects every ingredient to ensure the authentic taste of Sandila remains strictly preserved.
              </p>
            </div>
          </div>

          {/* Founder 2: Priya Kumar */}
          <div className="flex flex-col md:flex-row gap-12 items-center bg-[var(--color-muted)] p-8 rounded-3xl shadow-lg border border-[var(--color-secondary)]/10 text-left">
            <div className="w-48 h-64 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-[var(--color-secondary)] shadow-lg">
              <img src={storyMaker} alt="Co-Founder" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">Priya Kumar</h3>
              <p className="text-[var(--color-accent)] font-semibold mb-4 text-xl">Co-Founder & Quality Head</p>
              <p className="text-[var(--color-text)] leading-relaxed text-lg">
                With a background in food technology, Priya ensures every batch meets our highest quality standards.
                She oversees packaging, hygiene protocols, and customer satisfaction to maintain our legacy of excellence.
                Her vision brings our traditional heritage to the digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div >
  );
};

export default Home;