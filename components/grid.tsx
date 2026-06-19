"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Site, sitePath } from "@/lib/siteData";
import { searchSites } from "@/util/search";
import GridSearch from "./GridSearch";

export default function Grid({ sites }: { sites: Site[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredSites = useMemo(() => {
        return searchSites(sites, debouncedQuery);
    }, [debouncedQuery, sites]);

    return (
        <div className="w-full flex flex-col gap-8 justify-center items-center">
            <div className="w-full flex flex-row justify-end">
                <GridSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-12 lg:gap-x-20">
                {filteredSites.length > 0 ? (
                    filteredSites.map((site) => (
                        <Link
                            key={sitePath(site)}
                            href={sitePath(site)}
                            className="flex flex-col justify-center items-center gap-2"
                        >
                            <Image
                                src={site.thumbnail}
                                alt="Lavender rectangle"
                                width="350"
                                height="250"
                                className="w-full rounded-lg"
                            />
                            <div className="flex flex-col justify-center items-center">
                                {site.active ? (
                                    <p>{`"${site.songTitle}" - ${site.artists.map((a) => a.name).join(", ")}`}</p>
                                ) : (
                                    <p>{`"??????" - ??????`}</p>
                                )}
                                {site.publishDate.length > 0 && site.active ? (
                                    <p>{site.publishDate}</p>
                                ) : (
                                    <p>TBD</p>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No sites available.</p>
                )}
            </div>
        </div>
    );
}
