// RotatingGallery.tsx
import React from "react";
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

const images = [
    img6,
    img13,
    img23,
    img4,
    img19,
    img12,
    img17,
    img8,
    img24,
    img20,
    img2,
    img9,
    img3,
    img28,
    img14,
    img22,
    img11,
    img2,
    img30,
    img1,
    img26,
    img16,
    img10,
    img21,
    img15,
    img5,
    img25,
    img29,
    img2,
    img27,
    img7,
    img18
];




const RotatingGallery = () => {
    const scrollingImages = [...images, ...images];

    return (
        <div className="flex w-max animate-scroll space-x-2 h-full">
            {scrollingImages.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i}`}
                    className="h-full w-[16.66%] object-cover opacity-30"
                />
            ))}
        </div>
    );
};

export default RotatingGallery;
