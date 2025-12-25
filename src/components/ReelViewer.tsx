// ReelViewer.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MediaItem } from "../types";

interface ReelViewerProps {
    items: MediaItem[];
    startIndex?: number;
}

const isDriveView = (url: string) =>
    /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view/.test(url);

function driveIdFromUrl(url: string): { id: string | null; search: string } {
    try {
        const u = new URL(url);
        const m = u.pathname.match(/\/d\/([^/]+)/);
        return { id: m ? m[1] : null, search: u.search || "" };
    } catch {
        const m = url.match(/\/d\/([^/]+)/);
        return { id: m ? m[1] : null, search: "" };
    }
}

function toDrivePreviewUrl(viewUrl: string) {
    const { id, search } = driveIdFromUrl(viewUrl);
    if (!id) return viewUrl;
    return `https://drive.google.com/file/d/${id}/preview${search}`;
}

export const ReelViewer: React.FC<ReelViewerProps> = ({
    items,
    startIndex = 0,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(startIndex);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const idx = Math.round(
            scrollRef.current.scrollTop / scrollRef.current.clientHeight
        );
        if (idx !== activeIndex) setActiveIndex(idx);
    };

    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop =
            startIndex * scrollRef.current.clientHeight;
        setActiveIndex(startIndex);
    }, [startIndex]);

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        >
            {items.map((reel, idx) => (
                <ReelItem
                    key={String(reel.id)}
                    reel={reel}
                    index={idx}
                    isActive={activeIndex === idx}
                />
            ))}
        </div>
    );
};

const ReelItem: React.FC<{
    reel: MediaItem;
    index: number;
    isActive: boolean;
}> = ({ reel, index, isActive }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const isDrive = useMemo(() => isDriveView(reel.url), [reel.url]);
    const previewUrl = useMemo(
        () => (isDrive ? toDrivePreviewUrl(reel.url) : ""),
        [isDrive, reel.url]
    );

    useEffect(() => {
        if (isDrive) {
            setIsPlaying(isActive);
            return;
        }

        if (!videoRef.current) return;

        if (isActive) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive, isDrive]);

    const togglePlay = () => {
        if (isDrive || !videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Background Blur */}
            <div className="absolute inset-0 opacity-30 blur-3xl scale-150">
                <img
                    src={reel.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Reel Card */}
            <div className="relative z-10 w-full max-w-[450px] aspect-[9/16] bg-black shadow-2xl rounded-2xl overflow-hidden">
                {/* Player */}
                {isDrive ? (
                    <iframe
                        key={`${reel.id}-${isActive}`}
                        src={previewUrl}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src={reel.url}
                        className="w-full h-full object-cover"
                        loop
                        muted={isMuted}
                        playsInline
                        onClick={togglePlay}
                    />
                )}

                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center pointer-events-auto">
                    <div className="bg-black/45 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/80 border border-white/10">
                        {reel.category}
                    </div>

                    <div className="flex items-center gap-2">
                        {isDrive && (
                            <a
                                href={reel.url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white/80 hover:bg-white/10 transition"
                            >
                                Open
                            </a>
                        )}

                        {!isDrive && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted((v) => !v);
                                }}
                                className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition"
                            >
                                {isMuted ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                    <h3 className="text-2xl font-serif italic text-white mb-1">
                        {reel.title}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-2">
                        {reel.description}
                    </p>

                    {/* ✅ Small reel number */}
                    <div className="mt-2 text-[11px] uppercase tracking-widest text-white/40">
                        Reel {String(index + 1).padStart(2, "0")}
                    </div>
                </div>

                {/* Play hint (HTML5 only) */}
                <AnimatePresence>
                    {!isDrive && !isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
