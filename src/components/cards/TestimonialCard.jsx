import React, { useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, name, color, initial, location, rating = 5 }) => {
    return (
        <div className="bg-white p-6 md:p-10 rounded-[35px] shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
            <div className="text-4xl text-[var(--color-secondary)] mb-6 opacity-30 italic font-serif leading-none">"</div>

            {/* Rating System */}
            <div className="flex gap-1 mb-6 text-[var(--color-secondary)]">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < rating ? "currentColor" : "none"}
                        className={i < rating ? "" : "text-gray-200"}
                    />
                ))}
            </div>

            <p className="text-base md:text-lg text-gray-700 italic leading-relaxed mb-8 flex-grow -mt-4">
                {quote}
            </p>

            <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg border-2 border-[var(--color-secondary)] overflow-hidden transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color }}
                >
                    {initial}
                </div>
                <div>
                    <h4 className="font-bold text-[var(--color-maroon)] leading-none mb-1 text-sm md:text-base">{name}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 font-sans tracking-wide uppercase">{location}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
