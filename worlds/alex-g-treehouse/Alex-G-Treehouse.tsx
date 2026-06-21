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
                <Link href="/" className="underline px-0.5 py-px">
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

// desk: https://publicdomainvectors.org/en/free-clipart/Office-desk-vector-illustration/11004.html
// computer - original site: https://web.archive.org/web/20011230035715/http://br.geocities.com:80/adrianocaramello/computador01.gif
// computer - solo: https://blob.gifcities.org/gifcities/4CYYPJFEYJMKKXSJKSU3IDWNCTE7FTTR.gif
// field: https://commons.wikimedia.org/wiki/File:Field_of_grass_-_geograph.org.uk_-_436971.jpg
