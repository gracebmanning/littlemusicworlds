"use client";
import { useRef } from "react";
import Link from "next/link";
import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import InteractivePavement, { type InteractivePavementHandle } from "./InteractivePavement";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";

function EatThePavementContent() {
    const pavementRef = useRef<InteractivePavementHandle>(null);

    return (
        <main className="relative w-full h-dvh flex flex-col justify-center items-center bg-white">
            <div className="w-full flex flex-col justify-center items-center gap-y-2 px-2 py-4">
                <div className="w-full flex flex-row flex-wrap justify-between items-center">
                    <Link href="/" className="top-2 left-2 w-fit underline text-black">
                        ← back
                    </Link>
                    <button
                        onClick={() => pavementRef.current?.reset()}
                        className="flex flex-row items-center gap-1 px-1 py-0.5 text-black border rounded-md cursor-pointer hover:bg-black/20 transition-colors"
                    >
                        {<ArrowClockwiseIcon />} reset
                    </button>
                </div>
                <p className="w-full text-black text-center">TAP TO EAT THE PAVEMENT</p>
            </div>
            <InteractivePavement ref={pavementRef} />
            <div className="w-full py-4 flex flex-col md:flex-row justify-evenly items-center">
                <p className="text-black">image sources</p>
                <p className="text-black">[VIDEO EMBED]</p>
            </div>
        </main>
    );
}

export default function DevLemonsEatThePavement({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <EatThePavementContent />
        </WorldGate>
    );
}
