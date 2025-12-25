// ReelViewer.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import type { MediaItem } from "../types";

interface ReelViewerProps {
    items: MediaItem[];
    startIndex?: number;
}

const isDrivePreview = (url: string) =>
    /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/preview(\?.*)?$/.test(url);

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
                <ReelItem key={String(reel.id)} reel={reel} isActive={activeIndex === idx} />
            ))}
        </div>
    );
};

const ReelItem: React.FC<{ reel: MediaItem; isActive: boolean }> = ({
    reel,
    isActive,
}) => {
    const isDrive = useMemo(() => isDrivePreview(reel.url), [reel.url]);

    // HTML5 player (for non-drive sources)
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isDrive) return; // iframe handles itself

        const v = videoRef.current;
        if (!v) return;

        if (isActive) {
            v.play().catch(() => { });
        } else {
            v.pause();
        }
    }, [isActive, isDrive]);

    // ✅ On click: start playing immediately, no play icon overlay
    const handleTapToPlay = () => {
        if (isDrive) return; // Drive iframe handles click-to-play inside player
        const v = videoRef.current;
        if (!v) return;
        v.play().catch(() => { });
    };

    return (
        <div className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Background Blur */}
            <div className="absolute inset-0 opacity-30 blur-3xl scale-150">
                <img src={reel.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Reel Card */}
            <div className="relative z-10 w-full max-w-[450px] aspect-[9/16] bg-black shadow-2xl rounded-2xl overflow-hidden">
                {/* ✅ PLAYER */}
                {isDrive ? (
                    // ✅ Only mount iframe for the active reel (faster + less load)
                    isActive ? (
                        <iframe
                            src={reel.url}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={reel.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    )
                ) : (
                    <video
                        ref={videoRef}
                        src={reel.url}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        preload="auto"
                        loop
                        onClick={handleTapToPlay}
                    />
                )}
            </div>
        </div>
    );
};
