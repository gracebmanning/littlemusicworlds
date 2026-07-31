"use client";
import Link from "next/link";
import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import InteractivePavement from "./InteractivePavement";

function EatThePavementContent() {
    return (
        <main className="relative w-full h-dvh flex flex-col justify-center items-center bg-white">
            <div className="w-full py-6 flex flex-row justify-evenly items-center">
                <Link href="/" className="top-2 left-2 w-fit underline text-black">
                    ← back
                </Link>
                <p className="text-black">TAP TO EAT THE PAVEMENT</p>
            </div>
            <InteractivePavement />
            <div className="w-full py-6 flex flex-row justify-evenly items-center">
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
