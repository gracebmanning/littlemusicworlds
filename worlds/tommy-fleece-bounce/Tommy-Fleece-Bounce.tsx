"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import dynamic from "next/dynamic";
import { BounceEmbed } from "./BounceEmbed";
import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";

const BounceCanvas = dynamic(() => import("../tommy-fleece-bounce/BounceCanvas"), { ssr: false });

const BREAKPOINT = 768;

function subscribeToResize(cb: () => void) {
    window.addEventListener("resize", cb);
    window.addEventListener("orientationchange", cb);
    return () => {
        window.removeEventListener("resize", cb);
        window.removeEventListener("orientationchange", cb);
    };
}

function getIsCompact() {
    return Math.min(window.innerWidth, window.innerHeight) < BREAKPOINT;
}

function useIsCompact() {
    return useSyncExternalStore(subscribeToResize, getIsCompact, () => false);
}

function BounceContent() {
    const entered = useWorldEntered();
    const resetRef = useRef<(() => void) | null>(null);
    const [{ count, max }, setInfo] = useState({ count: 0, max: 0 });
    const maxed = max > 0 && count >= max;
    const [tiltDeg, setTiltDeg] = useState(0);

    const isCompact = useIsCompact();
    const embedSize = useMemo(() => {
        const width = isCompact ? 200 : 310;
        return { width: width, height: width };
    }, [isCompact]);
    const radiusRange = useMemo(
        () => (isCompact ? { min: 15, max: 55 } : { min: 25, max: 75 }),
        [isCompact],
    );
    const maxCircles = isCompact ? 70 : 120;

    if (!entered) return null;

    return (
        <main className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="relative z-10 w-full px-2 md:px-6 py-1 bg-neutral-100 flex flex-row justify-between items-center">
                <Link href="/" className="text-[#0020BE] underline">
                    ← back
                </Link>
                <p className="w-fit text-sm text-[#127400] uppercase">Click the white space</p>
                <span className="text-sm md:text-base tabular-nums text-neutral-500">
                    {tiltDeg}°
                </span>
                <span>
                    <button
                        onClick={() => resetRef.current?.()}
                        className="text-[#C61200] underline hover:cursor-pointer"
                    >
                        reset circles
                    </button>
                    <span
                        className={`text-sm md:text-base ml-1 tabular-nums ${maxed ? "font-semibold text-[#C61200]" : "text-neutral-500"}`}
                    >
                        {count}/{max}
                    </span>
                </span>
            </div>
            <div className="relative grow flex flex-col justify-center items-center">
                <BounceEmbed size={embedSize.width} />
            </div>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <BounceCanvas
                    embedSize={embedSize}
                    radiusRange={radiusRange}
                    maxCircles={maxCircles}
                    onCountChange={(count, max) => setInfo({ count, max })}
                    onTiltChange={setTiltDeg}
                    onReset={(callback) => {
                        resetRef.current = callback;
                    }}
                />
            </div>
        </main>
    );
}

export default function TommyFleeceBounce({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <BounceContent />
        </WorldGate>
    );
}
