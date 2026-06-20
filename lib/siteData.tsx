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
    coverArt?: string; // optional standalone image URL
    contentWarning?: string; // ex: "This site contains intense strobing effects."
}

export const sitePath = (s: Site) => `/${s.artists[0].slug}/${s.songSlug}`;

export const sites: Site[] = [
    {
        songTitle: "Treehouse",
        songSlug: "treehouse",
        artists: [
            {
                name: "Alex G",
                slug: "alex-g",
            },
        ],
        publishDate: "2026-06-21",
        thumbnail: "/images/rectangle.png",
    },
    {
        songTitle: "Bounce",
        songSlug: "bounce",
        artists: [
            {
                name: "Tommy Fleece",
                slug: "tommy-fleece",
            },
        ],
        publishDate: "2026-06-20",
        thumbnail: "/images/thumbnails/tommy-fleece-bounce.png",
    },
];

/*
{
    songTitle: "Sin City",
    songSlug: "sin-city",
    artists: [
        {
            name: "Lucy Lamb",
            slug: "lucy-lamb",
        },
    ],
    publishDate: "2026-06-20",
    thumbnail: "/images/rectangle.png",
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
},
*/
