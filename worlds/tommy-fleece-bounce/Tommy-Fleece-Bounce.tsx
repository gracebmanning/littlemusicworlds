"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import dynamic from "next/dynamic";

const BounceCanvas = dynamic(() => import("../tommy-fleece-bounce/BounceCanvas"), { ssr: false });

const BounceEmbed = () => {
    return (
        <iframe
            width="315"
            height="315"
            src="https://www.youtube.com/embed/F6aYsopTmWo?si=Co8X6KguqXqtTQE5&amp;start=63&amp;autoplay=1&amp;controls=0&amp;loop=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
    );
};

function BounceContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="relative z-10 border-2 border-pink-400">
                <BounceEmbed />
            </div>
            <div className="absolute inset-0 z-0">
                <BounceCanvas />
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
