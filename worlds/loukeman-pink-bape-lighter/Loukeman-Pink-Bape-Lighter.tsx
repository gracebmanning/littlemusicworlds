"use client";
import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import RainbowScratchPaper from "./RainbowScratchPaper";

function PinkBapeLighterContent() {
    return (
        <main className="w-full h-dvh flex flex-col justify-center items-center bg-black">
            <RainbowScratchPaper />
        </main>
    );
}

export default function TommyFleeceBounce({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <PinkBapeLighterContent />
        </WorldGate>
    );
}
