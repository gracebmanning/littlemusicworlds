"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import InteractivePavement, { type InteractivePavementHandle } from "./InteractivePavement";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import SourceModal from "@/components/SourceModal";
import { Dev_Lemons_Eat_The_Pavement_assets } from "@/lib/assets";

const buttonStyle =
    "flex flex-row justify-center items-center gap-1 px-1 py-0.5 rounded-sm text-accent-one bg-accent-two border border-accent-one hover:text-accent-two hover:bg-accent-one cursor-pointer transition-colors";

const VideoEmbed = () => {
    // aspect ratio: width = 560, height = 315
    return (
        <div className="w-48 aspect-video">
            <iframe
                className="w-full h-auto aspect-video"
                src="https://www.youtube.com/embed/8uBcrVpLX7Q?si=zau96OtwDiYQxPqF&amp;autoplay=1&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

function EatThePavementContent() {
    const pavementRef = useRef<InteractivePavementHandle>(null);
    const [sourcesOpen, setSourcesOpen] = useState(false);

    return (
        <main className="relative w-full h-dvh flex flex-col justify-center items-center bg-[#b1cdff]">
            <div className="w-full flex flex-col justify-center items-center gap-y-2 px-2 py-2">
                <div className="w-full flex flex-row flex-wrap justify-between items-center px-2">
                    <Link href="/" className={buttonStyle}>
                        ← back
                    </Link>
                    <button onClick={() => pavementRef.current?.reset()} className={buttonStyle}>
                        {<ArrowClockwiseIcon />} reset
                    </button>
                </div>
                <p className="w-full text-accent-one font-bold text-center">
                    TAP TO EAT THE PAVEMENT
                </p>
            </div>
            <InteractivePavement ref={pavementRef} />
            <div className="w-full py-2 flex flex-col justify-center items-center gap-y-4">
                <VideoEmbed />
                <button type="button" onClick={() => setSourcesOpen(true)} className={buttonStyle}>
                    image sources
                </button>
            </div>
            {sourcesOpen && (
                <SourceModal
                    assets={Dev_Lemons_Eat_The_Pavement_assets}
                    onClose={() => setSourcesOpen(false)}
                />
            )}
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
