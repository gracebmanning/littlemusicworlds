import Image from "next/image";
import { Dev_Lemons_Eat_The_Pavement_assets } from "@/lib/assets";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
});

export default function InteractivePavement() {
    return (
        <div className="relative w-[80dvw] h-full border border-red-600">
            <canvas className="absolute z-20 inset-0 w-full h-full"></canvas>
            <div
                className="absolute z-10 inset-0 w-full h-full flex flex-col justify-center items-center"
                style={{
                    backgroundImage: "url('/images/blue_sky_with_clouds.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Image
                    src={Dev_Lemons_Eat_The_Pavement_assets.grassHill.img.src}
                    alt={Dev_Lemons_Eat_The_Pavement_assets.grassHill.img.alt}
                    className="w-full absolute bottom-0"
                />
                <Image
                    src={Dev_Lemons_Eat_The_Pavement_assets.handDrawnSun.img.src}
                    alt={Dev_Lemons_Eat_The_Pavement_assets.handDrawnSun.img.alt}
                    className="absolute top-5 right-5 w-70"
                />
                <Image
                    src={Dev_Lemons_Eat_The_Pavement_assets.handDrawnBalloon.img.src}
                    alt={Dev_Lemons_Eat_The_Pavement_assets.handDrawnBalloon.img.alt}
                    className="absolute bottom-15 left-0 h-120"
                />
                <Image
                    src={Dev_Lemons_Eat_The_Pavement_assets.handDrawnGirl.img.src}
                    alt={Dev_Lemons_Eat_The_Pavement_assets.handDrawnGirl.img.alt}
                    className="absolute bottom-0 left-20"
                />
                <p
                    className={`text-center text-transparent text-6xl stroke-1 stroke-black max-w-xl ${shrikhand.className}`}
                    style={{
                        backgroundImage: "url('/images/rainbow_glitter.gif')",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    I ate the pavement and all I got was this website
                </p>
            </div>
        </div>
    );
}
