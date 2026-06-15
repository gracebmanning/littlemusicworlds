import { notFound } from "next/navigation";
import { sites } from "@/lib/siteData";
import { worlds } from "@/worlds";

type Params = Promise<{ artist: string; song: string }>;

export function generateStaticParams() {
    return sites.map((s) => ({ artist: s.artists[0].slug, song: s.songSlug }));
}

export async function generateMetadata({ params }: { params: Params }) {
    const { artist, song } = await params;
    const site = sites.find((s) => s.artists[0].slug === artist && s.songSlug === song);
    if (!site) return {};
    const names = site.artists.map((a) => a.name).join(", ");
    return {
        title: `"${site.songTitle}" — ${names}`,
        description: `A visual world inspired by "${site.songTitle}" by ${names}.`,
        openGraph: {
            title: `"${site.songTitle}" — ${names}`,
            description: `A visual world inspired by "${site.songTitle}" by ${names}.`,
            images: [site.thumbnail],
            type: "website",
        },
    };
}

export default async function Page({ params }: { params: Params }) {
    const { artist, song } = await params;
    const site = sites.find((s) => s.artists[0].slug === artist && s.songSlug === song);
    const World = worlds[`${artist}/${song}`];
    if (!site || !World) notFound();
    return <World site={site} />;
}
