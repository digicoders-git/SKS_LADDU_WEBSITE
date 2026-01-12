import React from 'react';
import { Play, Star } from 'lucide-react';

const VideoReviewCard = ({ videoUrl, name, thumbnailImg, title, color, initial, location, rating = 5 }) => {
    return (
        <div className="bg-white rounded-[35px] shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            {/* Video Content Placeholder/Preview */}
            <div className="relative aspect-video bg-black group-hover:scale-105 transition-transform duration-500 cursor-pointer overflow-hidden">
                {thumbnailImg ? (
                    <img src={thumbnailImg} alt={name} className="w-full h-full object-cover opacity-80" />
                ) : (
                    <div className="w-full h-full bg-[var(--color-maroon)] flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-125 group-hover:bg-[var(--color-secondary)]">
                        <Play size={24} fill="currentColor" className="text-[var(--color-maroon)] ml-1" />
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">
                <h3 className="font-bold text-base md:text-lg text-[var(--color-maroon)] mb-4 line-clamp-1">"{title}"</h3>

                {/* Rating */}
                <div className="flex gap-1 mb-6 text-[var(--color-secondary)]">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "" : "text-gray-200"} />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-[10px] md:text-sm border-2 border-[var(--color-secondary)]"
                        style={{ backgroundColor: color }}
                    >
                        {initial}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs md:text-sm leading-none">{name}</h4>
                        <p className="text-[10px] text-gray-400 font-sans tracking-wide uppercase mt-1">{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoReviewCard;
