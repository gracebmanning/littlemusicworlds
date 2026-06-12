import Image from "next/image";
import Link from "next/link";
import { Site } from "@/lib/sampleData";
import { slugify } from "@/util/slugify";

export function Grid({ sites }: { sites: Site[] }) {
    return (
        <div className="w-full flex flex-col">
            <div>Search bar</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-12 lg:gap-x-20">
                {sites.map((site) => (
                    <Link
                        key={site.id}
                        href={`/${slugify(site.artistName)}/${slugify(site.songTitle)}`}
                        className="flex flex-col justify-center items-center gap-2"
                    >
                        <Image
                            src={site.thumbnail}
                            alt="Lavender rectangle"
                            width="350"
                            height="250"
                            className="w-full rounded-lg"
                        />
                        <p>{`"${site.songTitle}" - ${site.artistName}`}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
