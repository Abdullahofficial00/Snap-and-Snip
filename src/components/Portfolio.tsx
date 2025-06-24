import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Folder } from "lucide-react";

// Image imports
import img1 from "../assets/portfolio/Event/snap (1).webp";
import img2 from "../assets/portfolio/Event/snap (2).webp";
import img3 from "../assets/portfolio/Event/snap (3).webp";
import img4 from "../assets/portfolio/Event/snap (4).webp";
import img5 from "../assets/portfolio/Event/snap (5).webp";
import img6 from "../assets/portfolio/Event/snap (6).webp";
import img7 from "../assets/portfolio/Fashion Photography/snap (1).webp";
import img8 from "../assets/portfolio/Fashion Photography/snap (3).webp";
import img9 from "../assets/portfolio/Fashion Photography/snap (4).webp";
import img10 from "../assets/portfolio/Fashion Photography/snap (5).webp";
import img11 from "../assets/portfolio/Fashion Photography/snap (6).webp";
import img12 from "../assets/portfolio/Fashion Photography/snap (7).webp";
import img13 from "../assets/portfolio/Landscape Photography/snap (1).webp";
import img14 from "../assets/portfolio/Landscape Photography/snap (2).webp";
import img15 from "../assets/portfolio/Landscape Photography/snap (3).webp";
import img16 from "../assets/portfolio/Landscape Photography/snap (4).webp";
import img17 from "../assets/portfolio/Landscape Photography/snap (5).webp";
import img18 from "../assets/portfolio/Landscape Photography/snap (6).webp";
import img19 from "../assets/portfolio/Portrait Photography/snap (1).webp";
import img20 from "../assets/portfolio/Portrait Photography/snap (2).webp";
import img21 from "../assets/portfolio/Portrait Photography/snap (4).webp";
import img22 from "../assets/portfolio/Portrait Photography/snap (6).webp";
import img23 from "../assets/portfolio/Portrait Photography/snap (7).webp";
import img24 from "../assets/portfolio/Portrait Photography/snap (8).webp";
import img25 from "../assets/portfolio/Product Photography/snap (1).webp";
import img26 from "../assets/portfolio/Product Photography/snap (2).webp";
import img27 from "../assets/portfolio/Product Photography/snap (3).webp";
import img28 from "../assets/portfolio/Product Photography/snap (4).webp";
import img29 from "../assets/portfolio/Product Photography/snap (5).webp";
import img30 from "../assets/portfolio/Product Photography/snap (6).webp";
import vid1 from "../assets/videos/wedding.mp4";
import vid2 from "../assets/videos/corporate.mp4";
import vid3 from "../assets/videos/product.mp4";
import vid4 from "../assets/videos/music.mp4";
import th1 from "../assets/thumbnails/wedding.jpg";
import th2 from "../assets/thumbnails/corporate.jpg";
import th3 from "../assets/thumbnails/product.jpg";
import th4 from "../assets/thumbnails/music.jpg";
// Video data
const videoData = [
  {
    id: 1,
    title: "Wedding Highlights",
    category: "Weddings",
    src: vid1,
    thumbnail:  th1,
  },
  {
    id: 2,
    title: "Corporate Promo",
    category: "Commercial Video",
    src:  vid2,
    thumbnail:  th2,
  },
  {
    id: 3,
    title: "Product Demo",
    category: "Product Video",
    src:  vid3,
    thumbnail:   th3,
  },
  {
    id: 4,
    title: "Film Story",
    category: "Creative Video",
    src:  vid4,
    thumbnail:  th4,
  },
];

// Photography category map
const photographyCategories = {
  "Wedding Photography": [img1, img2, img3, img4, img5, img6],
  "Fashion Photography": [img7, img8, img9, img10, img11, img12],
  "Landscape Photography": [img13, img14, img15, img16, img17, img18],
  "Portrait Photography": [img19, img20, img21, img22, img23, img24],
  "Product Photography": [img25, img26, img27, img28, img29, img30],
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("photography");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openCategoryModal = (category: string, imageIndex = 0) => {
    setSelectedCategory(category);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        {/* Header */}
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
              onClick={() => setActiveTab("photography")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "photography" ? "bg-yellow-500 text-slate-900" : "text-gray-300 hover:text-white"
                }`}
            >
              Photography
            </button>
            <button
              onClick={() => setActiveTab("videography")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "videography" ? "bg-yellow-500 text-slate-900" : "text-gray-300 hover:text-white"
                }`}
            >
              Videography
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "photography" ? (
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
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <Folder className="h-12 w-12 text-white mx-auto mb-2" />
                    <span className="text-white text-sm">View Gallery</span>
                  </div>
                </div>


                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{category}</h3>
                  <p className="text-gray-300 text-sm">{images.length} photos</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoData.map((video) => (
              <div
                key={video.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800 cursor-pointer"
                onClick={() => setSelectedVideo(video.src)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                  <p className="text-gray-300 text-sm">{video.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedCategory && (
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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white hover:text-yellow-500">
            <X className="h-8 w-8" />
          </button>
          <video
            src={selectedVideo}
            autoPlay
            controls
            className="w-full max-w-5xl max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </section>
  );
};

export default Portfolio;
