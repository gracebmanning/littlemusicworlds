"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";

const TreehouseEmbed = () => {
    return (
        <div>
            <iframe
                width="315"
                height="315"
                src="https://www.youtube.com/embed/I_5lEJjGgto?si=rl-aGqUE2hvcW6Yi&amp;autoplay=1&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>
    );
};

function TreehouseContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
            <TreehouseEmbed />
        </main>
    );
}

export default function AlexGTreehouse({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <TreehouseContent />
        </WorldGate>
    );
}
