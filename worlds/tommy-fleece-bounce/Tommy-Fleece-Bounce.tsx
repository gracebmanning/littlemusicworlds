"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";
import dynamic from "next/dynamic";
import { BounceEmbed } from "./BounceEmbed";
import Link from "next/link";

const BounceCanvas = dynamic(() => import("../tommy-fleece-bounce/BounceCanvas"), { ssr: false });
const EMBED_SIZE = { width: 314, height: 314 };

function BounceContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="relative z-10 w-full px-6 py-1 bg-neutral-100 flex flex-row justify-between items-center">
                <Link href="/" className="text-[#0020BE] underline">
                    ← go home
                </Link>
                <p className="w-fit text-sm text-[#127400] uppercase">Click in the white space</p>
                <button className="text-[#C61200] underline hover:cursor-pointer">
                    reset circle count
                </button>
            </div>

            <div className="relative grow flex flex-col justify-center items-center">
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
