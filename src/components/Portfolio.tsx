// Portfolio.tsx
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { ReelViewer } from "../components/ReelViewer";
import type { MediaItem } from "../types";

// ✅ PHOTO IMPORTS (NOT MISSING ANYTHING)
import img1 from "../assets/portfolio/Event/snap (1).webp";
import img2 from "../assets/portfolio/Event/snap (2).webp";
import img3 from "../assets/portfolio/Event/snap (3).webp";
import img4 from "../assets/portfolio/Event/snap (4).webp";
import img5 from "../assets/portfolio/Event/snap (5).webp";
import img6 from "../assets/portfolio/Event/snap (6).webp";

import img7 from "../assets/portfolio/FashionPhotography/snap (1).webp";
import img8 from "../assets/portfolio/FashionPhotography/snap (3).webp";
import img9 from "../assets/portfolio/FashionPhotography/snap (4).webp";
import img10 from "../assets/portfolio/FashionPhotography/snap (5).webp";
import img11 from "../assets/portfolio/FashionPhotography/snap (6).webp";
import img12 from "../assets/portfolio/FashionPhotography/snap (7).webp";

import img13 from "../assets/portfolio/LandscapePhotography/snap (1).webp";
import img14 from "../assets/portfolio/LandscapePhotography/snap (2).webp";
import img15 from "../assets/portfolio/LandscapePhotography/snap (3).webp";
import img16 from "../assets/portfolio/LandscapePhotography/snap (4).webp";
import img17 from "../assets/portfolio/LandscapePhotography/snap (5).webp";
import img18 from "../assets/portfolio/LandscapePhotography/snap (6).webp";

import img19 from "../assets/portfolio/PortraitPhotography/snap (1).webp";
import img20 from "../assets/portfolio/PortraitPhotography/snap (2).webp";
import img21 from "../assets/portfolio/PortraitPhotography/snap (4).webp";
import img22 from "../assets/portfolio/PortraitPhotography/snap (6).webp";
import img23 from "../assets/portfolio/PortraitPhotography/snap (7).webp";
import img24 from "../assets/portfolio/PortraitPhotography/snap (8).webp";

import img25 from "../assets/portfolio/ProductPhotography/snap (1).webp";
import img26 from "../assets/portfolio/ProductPhotography/snap (2).webp";
import img27 from "../assets/portfolio/ProductPhotography/snap (3).webp";
import img28 from "../assets/portfolio/ProductPhotography/snap (4).webp";
import img29 from "../assets/portfolio/ProductPhotography/snap (5).webp";
import img30 from "../assets/portfolio/ProductPhotography/snap (6).webp";

// ✅ Photography categories
const photographyCategories: Record<string, string[]> = {
  "Wedding Photography": [img1, img2, img3, img4, img5, img6],
  "Fashion Photography": [img7, img8, img9, img10, img11, img12],
  "Landscape Photography": [img13, img14, img15, img16, img17, img18],
  "Portrait Photography": [img19, img20, img21, img22, img23, img24],
  "Product Photography": [img25, img26, img27, img28, img29, img30],
};

// ✅ YOUR RAW LIST (UNCHANGED)
const RAW_LIST =
  "https://drive.google.com/file/d/1_F52xq60P0wfl0so-uzrsIlgd47IKY4W/view https://drive.google.com/file/d/1trYJ9leYb-58IMXfjP_c66UOUUG6hhXx/view https://drive.google.com/file/d/1qeR9UEYrwaQctW_gUDhwNsg835TaoAJh/view https://drive.google.com/file/d/1NRxrNxnqEIohc2fludPpVpkdujg3YGSM/view https://drive.google.com/file/d/1vlT2y3Sri30ZqYtHs_CrXNlucTxQbQYj/view https://drive.google.com/file/d/1OPJFOpZsCMUZJmgEA9nZkqb-Fr2t1_29/view https://drive.google.com/file/d/1Ugqh6b1ug-UQ17YeK4d82dQQ3-AnU_ci/view https://drive.google.com/file/d/1PfwvteRbwJhACcaeZrQoCIlPPWxcbmBG/view https://drive.google.com/file/d/1uEDwk1h_6SNuTgb0NvDbsdhCtSug0Cz6/view https://drive.google.com/file/d/1ueJJ0OBgcoNX3dtdFtTVULQzYPhjVjrA/view https://drive.google.com/file/d/1cW2dJeGFV-mmVeKPBfp4D7nQk9NNmp-O/view https://drive.google.com/file/d/1AimvrvZ0BlPwwvwwxQ_Th5RG0UxJQ-Jg/view https://drive.google.com/file/d/1vOf1wnQHdguDvky_HHMe-yzWGPpgSKC8/view https://drive.google.com/file/d/1M1XcrU9xaKpyBh8XjAXbNGagfUNkatG2/view https://drive.google.com/file/d/1dx0nLM5guqKukeGKgxsZsvjCPp2sou1x/view https://drive.google.com/file/d/1EIEW0wAJBquveNZmcLW8k7b7BcQuMdaM/view https://drive.google.com/file/d/1cfXraDhKxbGfcR9AUPskSfgLCtwZhjWk/view https://drive.google.com/file/d/1jWcJ0CbkrIwjQBZmZlRm1574PsvCpbz3/view https://drive.google.com/file/d/1FtwzsnEQDFPqOKfuOQQcHDk6OmPmTP2l/view https://drive.google.com/file/d/1YMYuQpVbAU9_C9K9SGdJBYcxJppU4hGn/view https://drive.google.com/file/d/1r7w-PbMBTR7lvOzqq97iZJ5Pel2tR3PQ/view https://drive.google.com/file/d/1EnX3D0e3KCtRn8WGBYAf7laeVdE3qURr/view https://drive.google.com/file/d/1HcP_4JNq8Mr8pa4T8t-L4QxyJA3KVCVe/view https://drive.google.com/file/d/1OFT5CIq38va7dWxEWoU6NXzywfJlrXVD/view https://drive.google.com/file/d/14yUCjaHHjevmRuwMhwedgxvarsvZzSMI/view https://drive.google.com/file/d/1Wy1bkAUZbgnhj6rOpkPYQo9wme6gSDzd/view https://drive.google.com/file/d/1tnoa-R1Di9WLrpnsz_t9ZMumIrw3lLix/view https://drive.google.com/file/d/1PhrsUol7KDfc_4OlD6QDZ3x7Ngt6MioP/view https://drive.google.com/file/d/1dpt5ikvbZ2_aiyMENVpq_bCFUzGYsvjK/view https://drive.google.com/file/d/12bNYux2_96RaUdP-TI7bCb9UOvuFChKF/view https://drive.google.com/file/d/1j6jzZzyUK-DKFkDLfjGLkgZiArhxIn_G/view https://drive.google.com/file/d/1e86w9SLj2rcdKCkhWxEVraamHxTbMurQ/view https://drive.google.com/file/d/18WRtVGoRO3aag26bcXaL-93j7mpoqwbp/view https://drive.google.com/file/d/1-WeMACx4I3ef6Dy5FpWb59_KbVlifnVS/view https://drive.google.com/file/d/1h31WgXTeOtG99oGeOQeUWxk06f9sEnA9/view https://drive.google.com/file/d/1jgxkMCf_ocA3dsMzLpsHK6xVHlnS6WJe/view https://drive.google.com/file/d/175RhBAE83io40j02RErOp9F3sP4POUNs/view https://drive.google.com/file/d/1U7hqicywVE4I6j6W2Kio4Suby_moPgIi/view https://drive.google.com/file/d/1s5Qfj1eG9a5yCv4mWlw5dCHu1AA-oXwO/view https://drive.google.com/file/d/1fjITALyNpjxAksg6n-yr6WScIL85hGmg/view https://drive.google.com/file/d/1_H-1cPakIz4me5J_Z3uudx6N2zCfemEK/view https://drive.google.com/file/d/1Njw1-OMbhG72DyL6Nv8T6ddBjFk1h65d/view https://drive.google.com/file/d/1j6bO3l56IVSGeb1UXwOrsudfals6qNi9/view https://drive.google.com/file/d/1FDYkMQoGJtMBKENA_5hmqbVz2UxrUy3L/view https://drive.google.com/file/d/11_h523frBkAeZOE27dliVthMD6jkfwMx/view https://drive.google.com/file/d/170UazrOiBu75NovLj_kwTaud35xyMEnT/view https://drive.google.com/file/d/1AtDE-M_5iuSJMtetxaiU_q4MADKH7ovW/view https://drive.google.com/file/d/1xjKSkxJKse4NW8YypsFjRAK7jDREm8n_/view https://drive.google.com/file/d/1WA43ptUbBJUjS8AQs0vji9mCp_jtLXN4/view https://drive.google.com/file/d/1RxM1A05LRoNULKY9ctfBcDDHiKAtEKR1/view https://drive.google.com/file/d/1OiyzpvHfCpjx9MOJAf1288OVOioOT4M-/view https://drive.google.com/file/d/1TtGuVfOQoFfJ3puwkj-AYFh9C0FJ1onm/view https://drive.google.com/file/d/1nZ53tsfTC0U43-SfVyuybvIhjYsbbRMF/view https://drive.google.com/file/d/12wYtBAVaNBf3V0B3uIu8Ad2rCafW0GXq/view https://drive.google.com/file/d/1xo64I0TxbnNyXONGRCTSPfEDFmfm9VxM/view https://drive.google.com/file/d/1IVrFJFlYr8c0s1Plt0tH9VDoo_VqK7So/view https://drive.google.com/file/d/1Mre5DhV90pagzO3SdmZFLg56wZoZt436/view https://drive.google.com/file/d/1FQx9OfBwsUtZtDVQPiT2vMGFsHBgXFJg/view https://drive.google.com/file/d/1ZMGkoOZuxtrQ9bLFJ01xg6Kic5HKcrar/view?usp=drive_link https://drive.google.com/file/d/1uTaWIeQoGq31XupluIgiRtubRSfoeeA5/view?usp=drive_link https://drive.google.com/file/d/1m1xKWZE2oFKn-vCJR54YoGicdGQaB7UU/view?usp=drive_link https://drive.google.com/file/d/1KN6rudB5DlN2fAIQAwDjk827MEuYLSoz/view?usp=drive_link https://drive.google.com/file/d/1nL7klm25G_Hz46WqdxiqAQDERq70WkYh/view?usp=drive_link https://drive.google.com/file/d/1dKiYKi2akHEC97Rc5FzYywJmeSSf_rJf/view?usp=drive_link https://drive.google.com/file/d/1a_dMrIBBzC1ALtqdJ191Zio0DbQ0swze/view?usp=drive_link https://drive.google.com/file/d/1i-jwBdH8wmsyYb2UcctTNjhN1eL7ZeqY/view?usp=drive_link https://drive.google.com/file/d/1RTk5BBSUrOvA7EojAQk8D60-FF6TuNCf/view?usp=drive_link https://drive.google.com/file/d/1OEQ1BfkioHt-O9rXcV1Vp14W0da09iqI/view?usp=drive_link https://drive.google.com/file/d/1sSnP4PWi6wG_9WP2uWt_6Wauf62EEiFD/view?usp=drive_link https://drive.google.com/file/d/1pzYbCEC1ZN5622QjSBRtDUF5_RM2BVa9/view?usp=drive_link https://drive.google.com/file/d/1Pr-ThbLmaiwVrBVH89xP-KZyMMawQvw5/view?usp=drive_link https://drive.google.com/file/d/1ks5xScxv7jd4Ie7gUCWYvZBiOEwjZTGV/view?usp=drive_link";

type DriveParsed = {
  index: number;
  id: string;
  viewUrl: string;
  previewUrl: string;
  downloadUrl: string;
  thumb: string;
  label: string;
};

function parseDriveRawList(raw: string): DriveParsed[] {
  const viewLinks = Array.from(
    new Set(raw.split(/\s+/).filter((u) => /^https:\/\/drive\.google\.com\/file\//.test(u)))
  );

  return viewLinks
    .map((url, i) => {
      let id: string | null = null;
      let search = "";

      try {
        const u = new URL(url);
        const m = u.pathname.match(/\/d\/([^/]+)/);
        id = m ? m[1] : null;
        search = u.search || "";
      } catch {
        const m = url.match(/\/d\/([^/]+)/);
        id = m ? m[1] : null;
        search = "";
      }

      if (!id) return null;

      const qs = search
        ? search.startsWith("?")
          ? "&" + search.slice(1)
          : "&" + search
        : "";

      return {
        index: i + 1,
        id,
        viewUrl: `https://drive.google.com/file/d/${id}/view${search}`,
        previewUrl: `https://drive.google.com/file/d/${id}/preview${search}`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${id}${qs}`,
        thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w1000${qs}`,
        label: `#${i + 1} · ${id.slice(0, 6)}…${id.slice(-4)}`,
      } satisfies DriveParsed;
    })
    .filter(Boolean) as DriveParsed[];
}

const Portfolio = () => {
  const [tab, setTab] = useState<"photo" | "video">("photo");

  // Photography modal
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Videography modal
  const [reelOpen, setReelOpen] = useState(false);
  const [reelStartIndex, setReelStartIndex] = useState(0);

  // ✅ IMPORTANT CHANGE:
  // We pass viewUrl into ReelViewer.
  // ReelViewer will internally create preview/download urls like your working HTML player does.
  const reelItems: MediaItem[] = useMemo(() => {
    const parsed = parseDriveRawList(RAW_LIST);
    return parsed.map((it) => ({
      id: it.index,
      url: it.viewUrl, // ✅ pass view URL (same as your working HTML code input)
      thumbnail: it.thumb,
      title: `Reel ${String(it.index).padStart(2, "0")}`,
      description: it.label,
      category: "Videography",
    }));
  }, []);

  const openCategoryModal = (category: string) => {
    setSelectedCategory(category);
    setSelectedImageIndex(0);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImageIndex(0);
  };

  const navigateImage = (dir: "prev" | "next") => {
    if (!selectedCategory) return;
    const images = photographyCategories[selectedCategory];
    const lastIndex = images.length - 1;

    setSelectedImageIndex((prev) =>
      dir === "prev" ? (prev > 0 ? prev - 1 : lastIndex) : (prev < lastIndex ? prev + 1 : 0)
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-yellow-500">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my collection of photography and videography work, showcasing diverse styles and creative visions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 p-2 rounded-xl flex gap-2">
            <button
              onClick={() => setTab("photo")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                tab === "photo" ? "bg-yellow-500 text-slate-900" : "text-gray-300 hover:text-white"
              }`}
            >
              Photography
            </button>

            <button
              onClick={() => setTab("video")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                tab === "video" ? "bg-yellow-500 text-slate-900" : "text-gray-300 hover:text-white"
              }`}
            >
              Videography
            </button>
          </div>
        </div>

        {/* Photography grid */}
        {tab === "photo" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(photographyCategories).map(([category, images]) => (
              <div
                key={category}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800 cursor-pointer"
                onClick={() => openCategoryModal(category)}
              >
                <img
                  src={images[0]}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{category}</h3>
                  <p className="text-gray-300 text-sm">{images.length} photos</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videography gallery (scrollable) */}
        {tab === "video" && (
          <div className="max-h-[70vh] overflow-y-auto pr-2 hide-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {reelItems.map((item, index) => (
                <button
                  key={String(item.id)}
                  onClick={() => {
                    setReelStartIndex(index);
                    setReelOpen(true);
                  }}
                  className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-black"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="white" className="opacity-90">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-xs text-white/80 truncate">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Videography Modal */}
        {reelOpen && (
          <div className="fixed inset-0 z-50 bg-black">
            <button
              onClick={() => setReelOpen(false)}
              className="absolute top-4 right-4 z-50 text-white hover:text-yellow-500"
            >
              <X className="h-8 w-8" />
            </button>

            <ReelViewer items={reelItems} startIndex={reelStartIndex} />
          </div>
        )}

        {/* Photography Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-yellow-500">
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronRight className="h-12 w-12" />
            </button>

            <img
              src={photographyCategories[selectedCategory][selectedImageIndex]}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
