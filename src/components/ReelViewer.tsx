// ReelViewer.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { MediaItem } from "../types";

interface ReelViewerProps {
    items: MediaItem[];
    startIndex?: number;
}

// 1. Check if it's a Drive URL
const isDriveUrl = (url: string) =>
    /drive\.google\.com\/file\/d\/([^/]+)/.test(url);

// 2. Convert to Direct Link for Autoplay
// WARNING: This uses the /uc?export=download endpoint which has quota limits.
// It is the only way to get true autoplay for Drive videos.
const getDriveProxyUrl = (url: string) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (!match || !match[1]) return url;
    // enhance compatibility by adding confirm=t to bypass virus scan warning for large files
    return `https://drive.google.com/uc?export=download&id=${match[1]}&confirm=t`;
};

const getDriveEmbedUrl = (url: string) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (!match || !match[1]) return url;
    return `https://drive.google.com/file/d/${match[1]}/preview`;
};

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
                    isActive={activeIndex === idx}
                    shouldLoad={idx >= activeIndex - 1 && idx <= activeIndex + 2} // Load 1 behind, 2 ahead
                />
            ))}
        </div>
    );
};

const ReelItem: React.FC<{ reel: MediaItem; isActive: boolean; shouldLoad: boolean }> = ({
    reel,
    isActive,
    shouldLoad,
}) => {
    // Determine if it is a Drive link
    const isDrive = useMemo(() => isDriveUrl(reel.url), [reel.url]);
    // Get the direct stream URL if it is Drive, otherwise use original
    const videoSrc = useMemo(() => isDrive ? getDriveProxyUrl(reel.url) : reel.url, [reel.url, isDrive]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isBuffering, setIsBuffering] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Robust play function to handle promises and race conditions
    const safePlay = async (v: HTMLVideoElement) => {
        try {
            if (v.paused) {
                await v.play();
            }
        } catch (error) {
            // AbortError is common when scrolling quickly, safe to ignore
            if ((error as Error).name !== "AbortError") {
                console.error("Playback failed:", error);
            }
        }
    };

    // Handle Active State Changes
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        if (isActive) {
            // Reset error on re-activation attempt
            setHasError(false);
            setRetryCount(0); // Reset retries on new view

            // If we already have data, don't show buffering
            if (v.readyState >= 3) {
                setIsBuffering(false);
                safePlay(v);
            } else {
                setIsBuffering(true);
                // Attempt to play; it will wait for data
                safePlay(v);
            }
        } else {
            v.pause();
            v.currentTime = 0; // Optional: Reset to start when scrolling away
            setIsBuffering(false); // Stop showing loader when off-screen
        }
    }, [isActive]);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            safePlay(v);
        } else {
            v.pause();
        }
    };

    const handleWaiting = () => {
        // Only show buffering if we are supposed to be playing
        if (isActive && !videoRef.current?.paused) {
            setIsBuffering(true);
        }
    };

    const handleCanPlay = () => {
        setIsBuffering(false);
        setHasError(false);
        setRetryCount(0);
    };

    const handleError = () => {
        console.error("Video error upon loading reel:", reel.id);
        if (retryCount < 3) {
            const timeout = 1000 * (retryCount + 1); // Exponential backoff: 1s, 2s, 3s
            console.log(`Retrying video ${reel.id} in ${timeout}ms... (Attempt ${retryCount + 1}/3)`);
            setTimeout(() => {
                if (videoRef.current) {
                    setRetryCount(prev => prev + 1);
                    videoRef.current.load();
                }
            }, timeout);
        } else {
            setIsBuffering(false);
            setHasError(true);
        }
    };

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Background blur */}
            <div className="absolute inset-0 opacity-30 blur-3xl scale-150">
                <img
                    src={reel.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full max-w-[450px] aspect-[9/16] bg-black shadow-2xl rounded-2xl overflow-hidden group">
                {shouldLoad ? (
                    <>
                        {!hasError ? (
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                className={`w-full h-full object-cover transition-all duration-500 transform ${isBuffering ? "blur-xl scale-110" : "blur-0 scale-100"
                                    }`}
                                playsInline
                                muted
                                preload="auto"
                                loop
                                poster={reel.thumbnail}
                                // @ts-ignore
                                referrerPolicy="no-referrer"
                                onClick={togglePlay}
                                onWaiting={handleWaiting}
                                onPlaying={() => setIsBuffering(false)}
                                onCanPlay={handleCanPlay}
                                onError={handleError}
                            />
                        ) : (
                            // Fallback to Iframe Player
                            <iframe
                                src={getDriveEmbedUrl(reel.url)}
                                className="w-full h-full object-cover bg-black"
                                allow="autoplay; fullscreen"
                                title={reel.title || "Video"}
                            />
                        )}

                        {/* Loading Indicator */}
                        {isBuffering && !hasError && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="relative w-24 h-24 opacity-80 animate-pulse">
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-sm" />
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-sm" />
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-sm" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-sm" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                                    </div>
                                </div>
                                <div className="absolute mt-32 font-mono text-xs text-white/80 tracking-[0.2em] uppercase">
                                    REC [///...]
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <img
                        src={reel.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};
