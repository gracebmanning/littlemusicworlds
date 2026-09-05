"use client";
import Link from "next/link";
import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import RainbowScratchPaper from "./RainbowScratchPaper";

const SongEmbed = () => {
    return (
        <div className="fixed bottom-2 right-2 z-20 w-30 aspect-square overflow-hidden">
            <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[101%] w-[179.6%]"
                src="https://www.youtube.com/embed/ydGyN1fMuR8?si=RZxLi7B8d_Wzip0D&amp;autoplay=1&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

function PinkBapeLighterContent() {
    return (
        <main className="relative w-full h-dvh flex flex-col justify-center items-center bg-black">
            <Link href="/" className="absolute top-2 left-2 z-20 w-fit underline">
                ← back
            </Link>
            <RainbowScratchPaper />
            <SongEmbed />
        </main>
    );
}

export default function LoukemanPinkBapeLighter({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <PinkBapeLighterContent />
        </WorldGate>
    );
}
