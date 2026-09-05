import { useRef, useEffect, useImperativeHandle, forwardRef, type MouseEvent } from "react";
import Image from "next/image";
import { Dev_Lemons_Eat_The_Pavement_assets } from "@/lib/assets";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
});

const BITE_RADIUS = 50;
const TOOTH_COUNT = 8;
const TOOTH_RING = 0.55;
const TOOTH_RADIUS_MIN = 0.5;
const TOOTH_RADIUS_MAX = 0.62;
const TOOTH_ANGLE_JITTER = 0.5;

export type InteractivePavementHandle = {
    reset: () => void;
};

const InteractivePavement = forwardRef<InteractivePavementHandle>(
    function InteractivePavement(_props, ref) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const imgRef = useRef<HTMLImageElement | null>(null);
        const buildRef = useRef({ width: 0, height: 0 });
        const paintedRef = useRef(false);

        const drawPavement = () => {
            const canvas = canvasRef.current;
            const pavement = imgRef.current;
            if (!canvas || !pavement) return;

            const context = canvas.getContext("2d");
            if (!context) return;

            const { width: cssW, height: cssH } = buildRef.current;
            if (cssW === 0 || cssH === 0) return;

            context.clearRect(0, 0, cssW, cssH); // clean canvas
            const scale = Math.max(cssW / pavement.naturalWidth, cssH / pavement.naturalHeight);
            const drawW = pavement.naturalWidth * scale;
            const drawH = pavement.naturalHeight * scale;
            context.drawImage(pavement, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);
        };

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext("2d");
            if (!context) return;

            const { src } = Dev_Lemons_Eat_The_Pavement_assets.crackedPavement.img.src;
            const pavement = document.createElement("img");
            imgRef.current = pavement;
            let cancelled = false;

            const setup = () => {
                if (cancelled || paintedRef.current) return;
                if (!pavement.complete || pavement.naturalWidth === 0) return;

                const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
                if (cssW === 0 || cssH === 0) return;

                const dpr = window.devicePixelRatio || 1;
                canvas.width = Math.round(cssW * dpr);
                canvas.height = Math.round(cssH * dpr);
                context.setTransform(dpr, 0, 0, dpr, 0, 0);
                buildRef.current = { width: cssW, height: cssH };
                paintedRef.current = true;

                drawPavement();
            };

            pavement.onload = setup;
            pavement.src = src;

            const observer = new ResizeObserver(setup);
            observer.observe(canvas);
            setup();

            return () => {
                cancelled = true;
                observer.disconnect();
            };
        }, []);

        useImperativeHandle(ref, () => ({ reset: drawPavement }), []);

        function takeBite(e: MouseEvent<HTMLCanvasElement>) {
            const canvas = canvasRef.current;
            if (!canvas || !paintedRef.current) return;

            const context = canvas.getContext("2d");
            if (!context) return;

            const rect = canvas.getBoundingClientRect();
            const { width: buildW, height: buildH } = buildRef.current;

            const scaleX = buildW / rect.width;
            const scaleY = buildH / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            context.save();
            context.globalCompositeOperation = "destination-out";

            context.beginPath();
            context.arc(x, y, BITE_RADIUS * TOOTH_RING, 0, Math.PI * 2);
            context.fill();

            const step = (Math.PI * 2) / TOOTH_COUNT;
            for (let i = 0; i < TOOTH_COUNT; i++) {
                const angle = i * step + (Math.random() - 0.5) * step * TOOTH_ANGLE_JITTER;
                const lobeRadius =
                    BITE_RADIUS *
                    (TOOTH_RADIUS_MIN + Math.random() * (TOOTH_RADIUS_MAX - TOOTH_RADIUS_MIN));
                const cx = x + Math.cos(angle) * BITE_RADIUS * TOOTH_RING;
                const cy = y + Math.sin(angle) * BITE_RADIUS * TOOTH_RING;
                context.beginPath();
                context.arc(cx, cy, lobeRadius, 0, Math.PI * 2);
                context.fill();
            }

            context.restore();
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
    },
);

export default InteractivePavement;
