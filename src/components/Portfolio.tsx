import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Image imports
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
import vid1 from "../assets/videos/wedding.mp4";
import vid2 from "../assets/videos/corporate.mp4";
import vid3 from "../assets/videos/product.mp4";
import vid4 from "../assets/videos/music.mp4";
import th1 from "../assets/thumbnails/wedding.jpg";
import th2 from "../assets/thumbnails/corporate.jpg";
import th3 from "../assets/thumbnails/product.jpg";
import th4 from "../assets/thumbnails/music.jpg";
const photographyCategories = {
  "Wedding Photography": [img1, img2, img3, img4, img5, img6],
  "Fashion Photography": [img7, img8, img9, img10, img11, img12],
  "Landscape Photography": [img13, img14, img15, img16, img17, img18],
  "Portrait Photography": [img19, img20, img21, img22, img23, img24],
  "Product Photography": [img25, img26, img27, img28, img29, img30],
};

const videoCategories = {
  "Weddings": [
    { title: "Wedding Highlights", src: vid1, thumbnail: th1 }
  ],
  "Commercial Video": [
    { title: "Corporate Promo", src: vid2, thumbnail: th2 },
    {
      title: "Honorary Consul of Greece | Mr. Shahbaz Haider Agha",
      src: "https://www.youtube.com/embed/HbzJQCSt5g8?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0",
      thumbnail: th3,
      isIframe: true,
    },
    {
      title: "Long Exposure Shot",
      src: "https://www.youtube.com/embed/7oiaoMRO4c0?autoplay=1&mute=1&modestbranding=0&rel=0&controls=0",
      thumbnail: th3,
      isIframe: true,
    },
    {
      title: "South Sudan Ambassador | Shahid Sajjad Hussain",
      src: "https://www.youtube.com/embed/HprOFCu_YF0?autoplay=1&mute=1&modestbranding=0&rel=0&controls=0",
      thumbnail: th3,
      isIframe: true,
    },
    {
      title: "Entrepreneurial Life at GIFT",
      src: "https://www.youtube.com/embed/ml09Zzmqd3s?autoplay=1&mute=1&modestbranding=0&rel=0&controls=0",
      thumbnail: th3,
      isIframe: true,
    },
  ],
  "Product Video": [
    { title: "Product Demo", src: vid3, thumbnail: th3 }
  ],
  "Creative Video": [
    { title: "Film Story | Life at UET Lahore", src: vid4, thumbnail: th4 },
    {
      title: "Bird Eye View | GIFT",
      src: "https://www.youtube.com/embed/oGWSJ1BI4kk?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0",
      thumbnail: th4,
      isIframe: true,
    }
  ]
};

const VideoPreviewCarousel = ({ videos }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000); // change video every 5s
    return () => clearInterval(interval);
  }, [videos]);

  const video = videos[current];
  return (
    <div className="aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg mb-10">
      {video.src.includes("youtube") ? (
        <iframe
          src={video.src}
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          className="w-full h-full object-cover pointer-events-none"
          title={`Video ${current}`}
        />
      ) : (
        <video
          src={video.src}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("photography");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const openCategoryModal = (category: string) => {
    setSelectedCategory(category);
    setSelectedImageIndex(0);
    setSelectedVideoIndex(0);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImageIndex(0);
    setSelectedVideoIndex(0);
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory(null);
    setSelectedImageIndex(0);
    setSelectedVideoIndex(0);
  };

  const nextVideo = () => {
    if (!selectedCategory) return;
    const categoryVideos = videoCategories[selectedCategory];
    setSelectedVideoIndex((prev) => (prev + 1) % categoryVideos.length);
  };

  const prevVideo = () => {
    if (!selectedCategory) return;
    const categoryVideos = videoCategories[selectedCategory];
    setSelectedVideoIndex((prev) => (prev === 0 ? categoryVideos.length - 1 : prev - 1));
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

        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 p-2 rounded-xl flex gap-2">
            <button
              onClick={() => switchTab("photography")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === "photography"
                  ? "bg-yellow-500 text-slate-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Photography
            </button>
            <button
              onClick={() => switchTab("videography")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === "videography"
                  ? "bg-yellow-500 text-slate-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Videography
            </button>
          </div>
        </div>

        {activeTab === "photography" && (
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

        {activeTab === "videography" && (
          <div className="mt-10 flex flex-col items-center">
            {/* Category buttons */}
            <div className="mb-6 w-full flex flex-col items-center">
              <div className="block sm:hidden w-full max-w-xs">
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 w-full"
                >
                  <option value="" disabled>Select a video category</option>
                  {Object.keys(videoCategories).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:flex flex-wrap justify-center gap-3">
                {Object.keys(videoCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => openCategoryModal(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${selectedCategory === category ? "bg-yellow-500 text-slate-900" : "bg-slate-700 text-white hover:bg-yellow-600"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview carousel */}
            {!selectedCategory && (
              <VideoPreviewCarousel videos={Object.values(videoCategories).flat()} />
            )}

            {/* Selected category video viewer */}
            {selectedCategory && (
              <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                  {videoCategories[selectedCategory][selectedVideoIndex].src.includes("youtube") ? (
                    <iframe
                      src={videoCategories[selectedCategory][selectedVideoIndex].src}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      src={videoCategories[selectedCategory][selectedVideoIndex].src}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  )}
                  <button onClick={prevVideo} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button onClick={nextVideo} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-white text-2xl font-semibold">{videoCategories[selectedCategory][selectedVideoIndex].title}</h3>
                  <p className="text-gray-400">{selectedCategory}</p>
                  <button onClick={closeModal} className="mt-2 text-yellow-500 underline">Close</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Photography Lightbox */}
        {selectedCategory && activeTab === "photography" && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-yellow-500">
              <X className="h-8 w-8" />
            </button>
            <button onClick={() => navigateImage("prev")} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
              <ChevronLeft className="h-12 w-12" />
            </button>
            <button onClick={() => navigateImage("next")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
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