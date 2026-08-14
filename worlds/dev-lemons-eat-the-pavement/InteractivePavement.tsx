import { useRef, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import { Dev_Lemons_Eat_The_Pavement_assets } from "@/lib/assets";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
});

const ERASER_SIZE = 50;

export default function InteractivePavement() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const buildRef = useRef({ width: 0, height: 0 });
    const paintedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const { src, width, height } = Dev_Lemons_Eat_The_Pavement_assets.crackedPavement.img.src;
        const pavement = document.createElement("img");
        let cancelled = false;

        const paint = () => {
            if (cancelled || paintedRef.current) return;
            if (!pavement.complete || pavement.width === 0) return;

            const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
            if (cssW === 0 || cssH === 0) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(cssW * dpr);
            canvas.height = Math.round(cssH * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            const scale = Math.max(cssW / pavement.naturalWidth, cssH / pavement.naturalHeight);
            const drawW = pavement.naturalWidth * scale;
            const drawH = pavement.naturalHeight * scale;
            context.drawImage(pavement, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);

            buildRef.current = { width: cssW, height: cssH };
            paintedRef.current = true;
        };

        // pavement.onload = () => {
        //     canvas.width = width;
        //     canvas.height = height;
        //     context.drawImage(pavement, 0, 0);
        // };
        pavement.onload = paint;
        pavement.src = src;

        const observer = new ResizeObserver(paint);
        observer.observe(canvas);
        paint();

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, []);

    function takeBite(e: MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        context.clearRect(x - ERASER_SIZE / 2, y - ERASER_SIZE / 2, ERASER_SIZE, ERASER_SIZE);
    }

    return (
        <div className="relative w-[80dvw] h-full border border-red-600">
            <canvas
                ref={canvasRef}
                onClick={takeBite}
                className="absolute z-20 inset-0 w-full h-full"
            ></canvas>
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
                    className="absolute bottom-15 left-0 w-auto h-120"
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
