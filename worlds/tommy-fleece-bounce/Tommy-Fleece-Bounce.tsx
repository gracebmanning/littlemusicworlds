"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";

const BounceEmbed = () => {
    return (
        <div>
            <iframe
                width="315"
                height="315"
                src="https://www.youtube.com/embed/F6aYsopTmWo?si=Co8X6KguqXqtTQE5&amp;start=63&amp;autoplay=1&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

function BounceContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
            <BounceEmbed />
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
