"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import dynamic from "next/dynamic";
import { BounceEmbed } from "./BounceEmbed";

const BounceCanvas = dynamic(() => import("../tommy-fleece-bounce/BounceCanvas"), { ssr: false });
const EMBED_SIZE = { width: 314, height: 314 };

function BounceContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="relative z-10 border-2 border-pink-400">
                <BounceEmbed />
            </div>
            <div className="absolute inset-0 z-0">
                <BounceCanvas embedSize={EMBED_SIZE} />
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
