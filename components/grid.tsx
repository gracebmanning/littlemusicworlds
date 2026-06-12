"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Site } from "@/lib/sampleData";
import { slugify } from "@/util/slugify";
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
                    ))
                ) : (
                    <p>No sites available.</p>
                )}
            </div>
        </div>
    );
}
