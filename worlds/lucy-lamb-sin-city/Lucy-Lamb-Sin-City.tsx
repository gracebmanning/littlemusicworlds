"use client";
import WorldGate, { useWorldEntered } from "@/components/WorldGate";
import { Site } from "@/lib/siteData";

const SinCityEmbed = () => {
    return (
        <div>
            <iframe
                className="max-w-xl"
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay; encrypted-media"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2329588442&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
            <div className="max-w-xl text-[10px] text-[#cccccc] overflow-hidden whitespace-nowrap text-ellipsis font-[Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif] font-thin">
                <a
                    href="https://soundcloud.com/luucylamb"
                    title="Lucy Lamb"
                    target="_blank"
                    className="text-[#cccccc] no-underline"
                >
                    Lucy Lamb
                </a>{" "}
                ·{" "}
                <a
                    href="https://soundcloud.com/luucylamb/sin-city-2"
                    title="Sin City"
                    target="_blank"
                    className="text-[#cccccc] no-underline"
                >
                    Sin City
                </a>
            </div>
        </div>
    );
};

function SinCityContent() {
    const entered = useWorldEntered();
    if (!entered) return null;

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
            <SinCityEmbed />
        </main>
    );
}

export default function LucyLambSinCity({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <SinCityContent />
        </WorldGate>
    );
}
