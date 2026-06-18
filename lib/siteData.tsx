import { Player } from "@/components/EmbedPlayer";

interface Artist {
    name: string;
    slug: string;
}

export interface Site {
    songTitle: string;
    songSlug: string;
    artists: Artist[];
    publishDate: string; // "2026-03-15"
    thumbnail: string;
    embedPlayer: Player;
    coverArt?: string; // optional standalone image URL
    contentWarning?: string; // ex: "This site contains intense strobing effects."
}

export const sitePath = (s: Site) => `/${s.artists[0].slug}/${s.songSlug}`;

export const sites: Site[] = [
    {
        songTitle: "Bounce",
        songSlug: "bounce",
        artists: [
            {
                name: "Tommy Fleece",
                slug: "tommy-fleece",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Sin City",
        songSlug: "sin-city",
        artists: [
            {
                name: "Lucy Lamb",
                slug: "lucy-lamb",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Hot 'n Cold",
        songSlug: "hot-n-cold",
        artists: [
            {
                name: "Basement Jaxx",
                slug: "basement-jaxx",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Where's Your Head At",
        songSlug: "wheres-your-head-at",
        artists: [
            {
                name: "Basement Jaxx",
                slug: "basement-jaxx",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Black Country",
        songSlug: "black-country",
        artists: [
            {
                name: "Tonstartssbandht",
                slug: "tonstartssbandht",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Treehouse",
        songSlug: "treehouse",
        artists: [
            {
                name: "Alex G",
                slug: "alex-g",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
    {
        songTitle: "Fort Greene Park",
        songSlug: "fort-greene-park",
        artists: [
            {
                name: "Battles",
                slug: "battles",
            },
        ],
        publishDate: "2026-06-13",
        thumbnail: "/images/rectangle.png",
        embedPlayer: { source: "spotify", id: "1AI3sVDlYHrWP0vRLBkaDS" },
    },
];

// <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2329588442&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/luucylamb" title="Lucy Lamb" target="_blank" style="color: #cccccc; text-decoration: none;">Lucy Lamb</a> · <a href="https://soundcloud.com/luucylamb/sin-city-2" title="Sin City" target="_blank" style="color: #cccccc; text-decoration: none;">Sin City</a></div>
