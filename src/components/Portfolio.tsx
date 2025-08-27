// Portfolio.tsx

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

const photographyCategories = {
  "Wedding Photography": [img1, img2, img3, img4, img5, img6],
  "Fashion Photography": [img7, img8, img9, img10, img11, img12],
  "Landscape Photography": [img13, img14, img15, img16, img17, img18],
  "Portrait Photography": [img19, img20, img21, img22, img23, img24],
  "Product Photography": [img25, img26, img27, img28, img29, img30],
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 p-2 rounded-xl flex gap-2">
            <button
              className="px-6 py-2 rounded-lg font-semibold bg-yellow-500 text-slate-900"
            >
              Photography
            </button>
            <button
              onClick={() => {
                window.location.href = "/videography.html";
              }}
              className="px-6 py-2 rounded-lg font-semibold text-gray-300 hover:text-white"
            >
              Videography
            </button>
          </div>
        </div>

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

        {selectedCategory && (
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
