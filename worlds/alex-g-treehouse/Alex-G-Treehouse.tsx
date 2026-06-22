"use client";
import { useRef, useState } from "react";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import { TreehouseEmbed } from "./TreehouseEmbed";
import Image from "next/image";
import Link from "next/link";
import TreehouseMagnets, { type MagnetsHandle } from "./TreehouseMagnets";
import { Alex_G_Treehouse_assets } from "@/lib/assets";
import SourceModal from "@/components/SourceModal";

function TreehouseContent() {
    const entered = useWorldEntered();
    const magnetsRef = useRef<MagnetsHandle>(null);
    const [sourcesOpen, setSourcesOpen] = useState(false);
    if (!entered) return null;

    return (
        <main className="relative w-full h-dvh overflow-hidden flex flex-col justify-center items-center bg-[url('/images/field_of_grass.jpg')] bg-cover">
            <div className="w-full px-1 py-0.5 flex flex-row justify-between items-center">
                <Link href="/" className="underline bg-background/30 px-0.5 py-px">
                    ← go home
                </Link>
                <button
                    type="button"
                    onClick={() => magnetsRef.current?.reset()}
                    className="underline px-0.5 py-px text-accent-one bg-accent-two hover:cursor-pointer"
                >
                    reset magnets
                </button>
            </div>
            <div className="relative w-full grow">
                <div className="absolute bottom-5 right-5">
                    <TreehouseEmbed />
                </div>
                <div className="absolute left-[2%] md:left-[8%] top-[68%] md:top-[60%] lg:top-[52%] z-0 w-[min(73vw,80dvh)] md:w-[min(65vw,80dvh)] max-w-130">
                    <Image
                        {...Alex_G_Treehouse_assets.desk.img}
                        alt={Alex_G_Treehouse_assets.desk.img.alt}
                        loading="eager"
                        className="h-auto w-full"
                    />
                    <Image
                        {...Alex_G_Treehouse_assets.computerGif.img}
                        alt={Alex_G_Treehouse_assets.computerGif.img.alt}
                        unoptimized
                        className="absolute left-[32%] bottom-[82%] h-auto w-[36%]"
                    />
                </div>
                <div className="absolute bottom-5 left-5">
                    <button
                        type="button"
                        onClick={() => setSourcesOpen(true)}
                        className="hover:cursor-pointer underline bg-background/30 px-1"
                    >
                        image sources
                    </button>
                </div>
                <TreehouseMagnets ref={magnetsRef} />
            </div>
            {sourcesOpen && (
                <SourceModal
                    assets={Alex_G_Treehouse_assets}
                    onClose={() => setSourcesOpen(false)}
                />
            )}
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
