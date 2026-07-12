"use client";

import { useEffect, useRef } from "react";

const BRUSH_RADIUS_X = 2;
const BRUSH_RADIUS_Y = 4;

export default function RainbowScratchPaper() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isScratchingRef = useRef(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);
    const buildSizeRef = useRef({ width: 0, height: 0 });

    const createBlackLayer = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const { clientWidth, clientHeight } = container;

        buildSizeRef.current = { width: clientWidth, height: clientHeight };

        canvas.width = clientWidth * dpr;
        canvas.height = clientHeight * dpr;
        ctx.scale(dpr, dpr);

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, clientWidth, clientHeight);
    };

    useEffect(() => {
        createBlackLayer();
    }, []);

    const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const { width, height } = buildSizeRef.current;
        return {
            x: (e.clientX - rect.left) * (width / rect.width),
            y: (e.clientY - rect.top) * (height / rect.height),
        };
    };

    const erase = (x: number, y: number) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = BRUSH_RADIUS_X * 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const stretchY = BRUSH_RADIUS_Y / BRUSH_RADIUS_X;
        const last = lastPointRef.current ?? { x, y };

        ctx.save();
        ctx.scale(1, stretchY);
        ctx.beginPath();
        ctx.moveTo(last.x, last.y / stretchY);
        ctx.lineTo(x, y / stretchY);
        ctx.stroke();
        ctx.restore();

        lastPointRef.current = { x, y };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        isScratchingRef.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        const { x, y } = getPoint(e);
        lastPointRef.current = { x, y };
        erase(x, y);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isScratchingRef.current) return;
        const { x, y } = getPoint(e);
        erase(x, y);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        isScratchingRef.current = false;
        lastPointRef.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <button
                type="button"
                onClick={createBlackLayer}
                className="absolute z-20 top-2 right-2 px-2 py-0.5 rounded-md bg-white text-black text-base font-sans cursor-pointer"
            >
                reset
            </button>
            <div
                className="absolute w-full h-full inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(to bottom, #E92122, #EC228E, #85329A, #3F4DA1, #4089CE, #64C2F6, #6EBD50, #FAEB16, #F5841E, #EF3923, #ED2124)",
                }}
            ></div>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="absolute w-full h-full inset-0 z-10"
            ></canvas>
        </div>
    );
}
