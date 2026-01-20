import React, { useState, useEffect, useRef, lazy, Suspense, memo, useCallback } from 'react';
import { X } from 'lucide-react';
import { getAllVideosApi } from '../../api/video';
import { throttle, debounce } from '../../utils/performance';

const LazyVideo = lazy(() => import('./LazyVideo'));

const LazyVideoReviews = memo(({ addToRefs, isHomePage = false }) => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);

    const fetchVideos = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const data = await getAllVideosApi();
            setVideos(data.videos || []);
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            debounce(([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    fetchVideos();
                }
            }, 200),
            { threshold: 0.1, rootMargin: '100px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible, fetchVideos]);

    useEffect(() => {
        if (!videos.length || !scrollRef.current || !isHomePage) return;

        const videoContainer = scrollRef.current;
        let videoInterval;
        let isVideoHovered = false;

        const startVideoScroll = throttle(() => {
            if (videoInterval || isVideoHovered) return;
            videoInterval = setInterval(() => {
                if (!videoContainer || isVideoHovered) return;
                if (videoContainer.scrollLeft >= videoContainer.scrollWidth / 2) {
                    videoContainer.scrollLeft = 0;
                } else {
                    videoContainer.scrollLeft += 1.5;
                }
            }, 30);
        }, 100);

        const stopVideoScroll = () => {
            if (videoInterval) {
                clearInterval(videoInterval);
                videoInterval = null;
            }
        };

        const handleMouseEnter = () => {
            isVideoHovered = true;
            stopVideoScroll();
        };

        const handleMouseLeave = () => {
            isVideoHovered = false;
            startVideoScroll();
        };

        setTimeout(startVideoScroll, 200);
        videoContainer.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        videoContainer.addEventListener('mouseleave', handleMouseLeave, { passive: true });

        return () => {
            stopVideoScroll();
            videoContainer.removeEventListener('mouseenter', handleMouseEnter);
            videoContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [videos, isHomePage]);

    return (
        <>
            <section 
                ref={(el) => {
                    sectionRef.current = el;
                    addToRefs(el);
                }} 
                className="scroll-section py-20 px-8 md:px-24 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-surface)] text-center relative z-10 shadow-sm overflow-hidden" 
                id="testimonials"
            >
                <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--color-secondary)]/20">
                        Real Stories
                    </div>
                    <h2 className="text-4xl md:text-7xl text-[var(--color-secondary)] mb-12 font-bold font-[var(--font-heading)] drop-shadow-sm">Loved by Customers</h2>

                    {isVisible ? (
                        videos.length > 0 ? (
                            <div className="relative group">
                                <div
                                    ref={scrollRef}
                                    className="flex gap-4 md:gap-10 overflow-x-auto pb-12 scroll-smooth no-scrollbar px-2"
                                >
                                    {/* Duplicate videos for infinite scroll */}
                                    {videos.concat(videos).map((video, index) => (
                                        <Suspense key={`${video._id}-${index}`} fallback={
                                            <div className="flex-shrink-0 w-56 md:w-80 h-80 md:h-96 bg-gray-200 rounded-[30px] animate-pulse"></div>
                                        }>
                                            <LazyVideo 
                                                video={video} 
                                                onClick={() => setSelectedVideo(video)}
                                                isHomePage={isHomePage}
                                            />
                                        </Suspense>
                                    ))}
                                </div>
                            </div>
                        ) : isLoading ? (
                            <div className="py-20 flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-[var(--color-text-muted)] font-medium">Loading customer stories...</p>
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center">
                                <p className="text-[var(--color-text-muted)] font-medium">No videos available</p>
                            </div>
                        )
                    ) : (
                        <div className="py-20 flex flex-col items-center">
                            <div className="w-56 md:w-80 h-80 md:h-96 bg-gray-200 rounded-[30px] animate-pulse mx-auto"></div>
                        </div>
                    )}
                </div>
            </section>

            {selectedVideo && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4 pt-32">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[70vh] overflow-hidden relative">
                        <div className="p-6">
                            <video
                                src={selectedVideo.url}
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
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute bottom-4 right-4 p-1 md:p-2 bg-black text-white rounded-full transition-colors z-10 hover:bg-gray-800"
                        >
                            <X className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
});

LazyVideoReviews.displayName = 'LazyVideoReviews';

export default LazyVideoReviews;