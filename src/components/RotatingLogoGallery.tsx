
import logo1 from "../assets/logos/white/logo (1).png";
import logo2 from "../assets/logos/white/logo (2).png";
import logo3 from "../assets/logos/white/logo (3).png";
import logo4 from "../assets/logos/white/logo (4).png";
import logo5 from "../assets/logos/white/logo (5).png";
import logo6 from "../assets/logos/white/logo (6).png";
import logo7 from "../assets/logos/white/logo (7).png";
import logo8 from "../assets/logos/white/logo (8).png";
import logo9 from "../assets/logos/white/logo (9).png";
import logo10 from "../assets/logos/white/logo (10).png";
import logo11 from "../assets/logos/white/logo (11).png";

const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6,
    logo7, logo8, logo9, logo10, logo11
];
const RotatingLogoGallery = () => {
    const scrollingLogos = [...logos, ...logos]; // duplicate for smooth loop

    return (
        <div className="w-full overflow-hidden h-24 bg-transparent">
            <div className="flex w-max animate-logo-scroll space-x-8 items-center h-full">
                {scrollingLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`logo-${index}`}
                        className="h-16 w-auto object-contain opacity-80"
                    />
                ))}
            </div>
        </div>
    );
};

export default RotatingLogoGallery;
