import type { StaticImageData } from "next/image";

import computerGif from "@/public/images/computer.gif";
import desk from "@/public/images/desk.svg";
import fieldOfGrass from "@/public/images/field_of_grass.jpg";
import blueSkyWithClouds from "@/public/images/blue_sky_with_clouds.jpg";
import crackedPavement from "@/public/images/cracked_pavement.jpg";
import rainbowGlitter from "@/public/images/rainbow_glitter.gif";
import grassHill from "@/public/images/grass_hill.svg";
import handDrawnSun from "@/public/images/hand_drawn_sun.png";
import handDrawnBalloon from "@/public/images/hand_drawn_balloon.png";
import handDrawnGirl from "@/public/images/hand_drawn_girl.png";

type License = {
    name: string; // ex: "CC BY-SA 4.0", "CC0", "Public Domain", "Unknown / unverified"
    href?: string;
};

export type Origin = {
    title: string;
    href?: string; // link to file's source page; omit for my own work
    author?: string; // actual creator
    license: License; // required for CC-licensed files
    modified?: boolean; // set true if source was altered
    note?: string; // describe alteration (e.g. used in composite, brightness increased)
};

export type ImageAsset = {
    img: { src: StaticImageData; alt: string };
    origin: Origin | Origin[];
};

export const Alex_G_Treehouse_assets = {
    computerGif: {
        img: {
            src: computerGif,
            alt: "Clipart illustration of a retro desktop computer setup with a monitor, tower, keyboard, mouse, and speakers.",
        },
        origin: {
            title: "Animated computer gif (archived GeoCities page, c. 2001)",
            href: "https://web.archive.org/web/20011230035715/http://br.geocities.com:80/adrianocaramello/computador01.gif",
            author: "Unknown",
            license: {
                name: "Unknown / unverified",
            },
            note: "Found via GifCities; archived by the Internet Archive. Original copyright status unclear.",
        },
    },
    desk: {
        img: {
            src: desk,
            alt: "Graphic of a dark brown computer desk featuring three drawers on the left and open storage on the right.",
        },
        origin: {
            title: "Office desk vector illustration",
            href: "https://publicdomainvectors.org/en/free-clipart/Office-desk-vector-illustration/11004.html",
            license: {
                name: "CC0 1.0",
                href: "https://creativecommons.org/publicdomain/zero/1.0/",
            },
        },
    },
    fieldOfGrass: {
        img: {
            src: fieldOfGrass,
            alt: "A vibrant green field of tall grass blowing in the wind, with trees in the background under a dark cloudy sky.",
        },
        origin: {
            title: "Field of grass Looking across to Saddlesall, the trees on the river bank form a backdrop to the grass field.",
            href: "https://commons.wikimedia.org/wiki/File:Field_of_grass_-_geograph.org.uk_-_436971.jpg",
            author: "John Poyser",
            license: {
                name: "CC BY-SA 2.0",
                href: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
            },
        },
    },
} satisfies Record<string, ImageAsset>;

export const Dev_Lemons_Eat_The_Pavement_assets = {
    blueSkyWithClouds: {
        img: {
            src: blueSkyWithClouds,
            alt: "Baby blue sky with several overlapping soft white clouds.",
        },
        origin: {
            title: "Clouds and blue sky in Russia",
            href: "https://commons.wikimedia.org/wiki/File:Clouds_and_blue_sky_in_Russia._IMG_057.jpg",
            author: "Dmitry Makeev",
            license: {
                name: "CC BY-SA 4.0",
                href: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
            },
        },
    },
    crackedPavement: {
        img: {
            src: crackedPavement,
            alt: "Photograph of tiled pavement that is severely cracked across it. There is also a wet mark on the pavement that indicates someone recently dropped their drink.",
        },
        origin: {
            title: "Severely cracked paving in Stuttgart, Germany (November 2012)",
            href: "https://commons.wikimedia.org/wiki/File:Cracked_pavement.jpg",
            author: "Till Westermayer",
            license: {
                name: "CC BY-SA 2.0",
                href: "https://creativecommons.org/licenses/by-sa/2.0/deed.en",
            },
        },
    },
    grassHill: {
        img: {
            src: grassHill,
            alt: "rolling green hills of grass",
        },
        origin: [
            {
                title: "Grass hill vector illustration",
                href: "https://www.vecteezy.com/vector-art/52434065-green-field-scenery-grass-landscape-green-grass-background-grass-hill-illustration",
                license: {
                    name: "CC0 1.0",
                    href: "https://creativecommons.org/publicdomain/zero/1.0/",
                },
                modified: true,
                note: "used as mask shape",
            },
            {
                title: "Grassy field (July 3, 2017)",
                href: "https://commons.wikimedia.org/wiki/File:Fort_earthworks,_Grassy_Island_National_Historic_Site,_NS_(35666167856).jpg",
                author: "Larry from Charlottetown, PEI, Canada",
                license: {
                    name: "CC BY-SA 4.0",
                    href: "https://creativecommons.org/licenses/by-sa/4.0/",
                },
                modified: true,
                note: "grass texture",
            },
        ],
    },
    rainbowGlitter: {
        img: {
            src: rainbowGlitter,
            alt: "A gif with a rainbow gradient background and animated glitter on top.",
        },
        origin: {
            title: "Animated glitter gif (archived GeoCities page, c. 2009)",
            href: "https://web.archive.org/web/20091025071851/http://geocities.com/smhart33/GLITTERS3.html",
            author: "Unknown",
            license: {
                name: "Unknown / unverified",
            },
            note: "Found via GifCities; archived by the Internet Archive. Original copyright status unclear.",
        },
    },
    handDrawnSun: {
        img: {
            src: handDrawnSun,
            alt: "A yellow cartoon-style sun, drawn using colored pencils.",
        },
        origin: {
            title: "Hand drawn sun",
            author: "Grace Manning",
            license: {
                name: "© Grace Manning",
            },
            note: "drawn",
        },
    },
    handDrawnBalloon: {
        img: {
            src: handDrawnBalloon,
            alt: "A red balloon with a brown string, drawn using colored pencils.",
        },
        origin: {
            title: "Hand drawn balloon",
            author: "Grace Manning",
            license: {
                name: "© Grace Manning",
            },
            note: "drawn",
        },
    },
    handDrawnGirl: {
        img: {
            src: handDrawnGirl,
            alt: "A stick figure girl with blonde hair and a pink triangular dress, with a simple smiley face. Hand drawn using colored pencils.",
        },
        origin: {
            title: "Hand drawn girl",
            author: "Grace Manning",
            license: {
                name: "© Grace Manning",
            },
            note: "drawn",
        },
    },
} satisfies Record<string, ImageAsset>;
