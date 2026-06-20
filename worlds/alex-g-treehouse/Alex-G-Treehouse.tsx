"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import { TreehouseEmbed } from "./TreehouseEmbed";
import Image from "next/image";
import Link from "next/link";
import TreehouseMagnets from "./TreehouseMagnets";

function TreehouseContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="relative w-full h-full min-h-screen flex flex-col justify-center items-center bg-[url('/images/field_of_grass.jpg')] bg-cover">
            <div className="w-full px-1 py-0.5 flex flex-row justify-between items-center">
                <Link href="/" className="underline px-0.5 py-px">
                    ← go home
                </Link>
                <button className="underline px-0.5 py-px text-accent-one bg-accent-two hover:cursor-pointer">
                    reset tiles
                </button>
            </div>
            <div className="relative w-full grow">
                <div className="absolute bottom-55 left-20 z-30 perspective-dramatic">
                    <TreehouseEmbed />
                </div>
                <Image
                    src="/images/computer.gif"
                    alt=""
                    width="180"
                    height="126"
                    className="absolute top-[40%] left-50 z-10"
                    unoptimized
                />
                <Image
                    src="/images/desk.svg"
                    alt=""
                    width="500"
                    height="290"
                    className="absolute top-1/2 left-10 z-0"
                />
                <TreehouseMagnets />
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
