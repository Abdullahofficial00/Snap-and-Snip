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

function toDriveDownloadUrl(viewUrl: string) {
    const { id, search } = driveIdFromUrl(viewUrl);
    if (!id) return viewUrl;
    const qs = search
        ? search.startsWith("?")
            ? "&" + search.slice(1)
            : "&" + search
        : "";
    return `https://drive.google.com/uc?export=download&id=${id}${qs}`;
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
        scrollRef.current.scrollTop = startIndex * scrollRef.current.clientHeight;
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
                    isActive={activeIndex === idx}
                />
            ))}
        </div>
    );
};

const ReelItem: React.FC<{ reel: MediaItem; isActive: boolean }> = ({
    reel,
    isActive,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // ✅ exact same "Drive / HTML5" toggle logic as your working HTML file
    const [mode, setMode] = useState<"drive" | "html5">(() => {
        const saved =
            typeof window !== "undefined" ? localStorage.getItem("playerMode") : null;
        return saved === "html5" ? "html5" : "drive";
    });

    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const isDrive = useMemo(() => isDriveView(reel.url), [reel.url]);

    const previewUrl = useMemo(() => {
        if (!isDrive) return reel.url;
        return toDrivePreviewUrl(reel.url);
    }, [isDrive, reel.url]);

    const downloadUrl = useMemo(() => {
        if (!isDrive) return reel.url;
        return toDriveDownloadUrl(reel.url);
    }, [isDrive, reel.url]);

    // ✅ same as your HTML: drive uses iframe, html5 uses <video src=downloadUrl>
    useEffect(() => {
        if (!isActive) {
            // stop html5 when not active
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsPlaying(false);
            return;
        }

        // if active and html5 mode -> play
        if (isDrive && mode === "html5" && videoRef.current) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }

        // if active and drive mode -> we can't "play" iframe, so we treat it as playing
        if (isDrive && mode === "drive") {
            setIsPlaying(true);
        }

        // if not drive (normal mp4) -> play
        if (!isDrive && videoRef.current) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    }, [isActive, isDrive, mode]);

    const togglePlay = () => {
        // iframe cannot be controlled
        if (isDrive && mode === "drive") return;

        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const setPlayerMode = (m: "drive" | "html5") => {
        setMode(m);
        try {
            localStorage.setItem("playerMode", m);
        } catch { }
    };

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Background Blur */}
            <div className="absolute inset-0 opacity-30 blur-3xl scale-150">
                <img src={reel.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-[450px] aspect-[9/16] bg-black shadow-2xl flex items-center justify-center rounded-2xl overflow-hidden">
                {/* PLAYER */}
                {isDrive ? (
                    mode === "drive" ? (
                        <iframe
                            // ✅ force reload like your HTML modal does
                            key={`${reel.id}-drive-${isActive ? "on" : "off"}`}
                            src={previewUrl}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    ) : (
                        <video
                            key={`${reel.id}-html5-${isActive ? "on" : "off"}`}
                            ref={videoRef}
                            src={downloadUrl}
                            className="w-full h-full object-cover"
                            controls
                            playsInline
                            muted={isMuted}
                            onClick={togglePlay}
                        />
                    )
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

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start pointer-events-auto">
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/80 border border-white/10">
                            {reel.category}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* ✅ Drive/HTML5 toggle only for Drive */}
                            {isDrive && (
                                <div className="flex rounded-full overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPlayerMode("drive");
                                        }}
                                        className={`px-3 py-2 text-[10px] uppercase tracking-widest ${mode === "drive" ? "bg-white/15 text-white" : "text-white/70"
                                            }`}
                                    >
                                        Drive
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPlayerMode("html5");
                                        }}
                                        className={`px-3 py-2 text-[10px] uppercase tracking-widest ${mode === "html5"
                                                ? "bg-white/15 text-white"
                                                : "text-white/70"
                                            }`}
                                    >
                                        HTML5
                                    </button>
                                </div>
                            )}

                            {/* Mute only affects HTML5 video (or non-drive video) */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted((v) => !v);
                                }}
                                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                {isMuted ? (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-white"
                                    >
                                        <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-white"
                                    >
                                        <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pointer-events-auto">
                        <h3 className="text-2xl font-serif italic text-white mb-2">
                            {reel.title}
                        </h3>
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-4">
                            {reel.description}
                        </p>

                        {/* ✅ Optional: open in Drive (useful when iframe shows blank due to perms/quota) */}
                        {isDrive && (
                            <a
                                href={reel.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs text-white/80 bg-black/40 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                            >
                                Open in Drive
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M14 3h7v7" />
                                    <path d="M10 14L21 3" />
                                    <path d="M21 14v7h-7" />
                                    <path d="M3 10V3h7" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Play Hint only for HTML5/non-drive */}
                <AnimatePresence>
                    {!isPlaying && !(isDrive && mode === "drive") && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-white ml-1"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute right-8 bottom-32 hidden lg:flex flex-col gap-8 text-right pointer-events-none">
                <div className="text-white/20 text-7xl font-serif italic select-none">
                    #{String(reel.id).padStart(2, "0")}
                </div>
            </div>
        </div>
    );
};
