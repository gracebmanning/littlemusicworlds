export interface Site {
    id: number;
    songTitle: string;
    artistName: string;
    thumbnail: string;
}

export const sites: Site[] = [
    {
        id: 1,
        songTitle: "healing spiritual echo",
        artistName: "meat computer",
        thumbnail: "/images/rectangle.png",
    },
    {
        id: 2,
        songTitle: "Fort Greene Park",
        artistName: "Battles",
        thumbnail: "/images/rectangle.png",
    },
    {
        id: 3,
        songTitle: "Pink Bape Lighter",
        artistName: "Artist Name",
        thumbnail: "/images/rectangle.png",
    },
    {
        id: 4,
        songTitle: "The Call",
        artistName: "Broken Social Scene",
        thumbnail: "/images/rectangle.png",
    },
    {
        id: 5,
        songTitle: "wakeup",
        artistName: "Mietze Conte",
        thumbnail: "/images/rectangle.png",
    },
    {
        id: 6,
        songTitle: "Lines",
        artistName: "Lorem Ipsum, Sacred Holes",
        thumbnail: "/images/rectangle.png",
    },
];

// how to handle multiple artists?
// option 1: use an array of artist names and structure slugs/pages differently. Good for filtering by a specific artist.
// option 2: use a comma-separated string and keep slugs/pages the same. Simpler, but not great for filtering by a specific artist.
// However, the filter could know to split by comma (or use semicolon because sometimes artists use commas in their names)
