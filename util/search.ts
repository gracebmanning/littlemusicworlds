import { Site } from "@/lib/siteData";

function sanitizeQuery(query: string): string {
    return query
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, ""); // remove special chars
}

export function searchSites(sites: Site[], query: string): Site[] {
    const sanitized = sanitizeQuery(query);

    if (!sanitized) return sites;

    return sites.filter(
        (site) =>
            sanitizeQuery(site.songTitle).includes(sanitized) ||
            site.artists.some((artist) => sanitizeQuery(artist.name).includes(sanitized)),
    );
}
