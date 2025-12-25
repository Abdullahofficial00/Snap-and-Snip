// src/types.ts
export interface MediaItem {
    id: string | number;

    // For ReelViewer videos
    url: string;

    // Background blur + thumbnail
    thumbnail: string;

    title: string;
    description: string;
    category: string;
}
interface ReelViewerProps {
    items: MediaItem[];
    startIndex?: number;
}
