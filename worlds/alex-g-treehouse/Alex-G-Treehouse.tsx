"use client";
import { useRef } from "react";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import { TreehouseEmbed } from "./TreehouseEmbed";
import Image from "next/image";
import Link from "next/link";
import TreehouseMagnets, { type MagnetsHandle } from "./TreehouseMagnets";

function TreehouseContent() {
    const entered = useWorldEntered();
    const magnetsRef = useRef<MagnetsHandle>(null);
    if (!entered) return null;

    return (
        <main className="relative w-full h-full min-h-screen flex flex-col justify-center items-center bg-[url('/images/field_of_grass.jpg')] bg-cover">
            <div className="w-full px-1 py-0.5 flex flex-row justify-between items-center">
                <Link href="/" className="underline bg-background/30 px-0.5 py-px">
                    ← go home
                </Link>
                <button
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
                <div className="absolute left-[2%] md:left-[8%] top-[68%] md:top-[60%] lg:top-[52%] z-0 w-[73vw] md:w-[65vw] max-w-130">
                    <Image
                        src="/images/desk.svg"
                        alt=""
                        width={500}
                        height={290}
                        className="h-auto w-full"
                    />
                    <Image
                        src="/images/computer.gif"
                        alt=""
                        width={180}
                        height={126}
                        unoptimized
                        className="absolute left-[32%] bottom-[82%] h-auto w-[36%]"
                    />
                </div>
                <div className="absolute bottom-5 left-5">
                    <button className="hover:cursor-pointer underline bg-background/30 px-1">
                        image sources
                    </button>
                </div>
                <TreehouseMagnets ref={magnetsRef} />
            </div>
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
