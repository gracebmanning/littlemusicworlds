"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Site, sitePath } from "@/lib/siteData";
import { searchSites } from "@/util/search";
import GridSearch from "./GridSearch";
import GridSort from "./GridSort";
import { formatDateMonthDayYear } from "@/util/formatDate";

export default function Grid({ sites }: { sites: Site[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredSites = useMemo(() => {
        const searched = searchSites(sites, debouncedQuery);
        const sorted = [...searched].sort((a, b) => {
            const dateA = new Date(a.publishDate).getTime();
            const dateB = new Date(b.publishDate).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
        return sorted;
    }, [debouncedQuery, sites, sortOrder]);

    return (
        <div className="w-full flex flex-col gap-8 justify-center items-center">
            <div className="w-full flex flex-row justify-end gap-2">
                <GridSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <GridSort sortOrder={sortOrder} onSortChange={setSortOrder} />
            </div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-12 lg:gap-x-20">
                {filteredSites.length > 0 ? (
                    filteredSites.map((site) => (
                        <Link
                            key={sitePath(site)}
                            href={sitePath(site)}
                            className="flex flex-col justify-center items-center gap-2"
                        >
                            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src={site.thumbnail}
                                    alt={`Thumbnail for "${site.songTitle}" by ${site.artists.map((a) => a.name).join(", ")}`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-center">{`"${site.songTitle}" - ${site.artists.map((a) => a.name).join(", ")}`}</p>
                                {site.publishDate.length > 0 && (
                                    <p className="text-center">
                                        {formatDateMonthDayYear(site.publishDate)}
                                    </p>
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
