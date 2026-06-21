import type { StaticImageData } from "next/image";

import computerGif from "@/public/images/computer.gif";
import desk from "@/public/images/desk.svg";
import fieldOfGrass from "@/public/images/field_of_grass.jpg";

export type ImageAsset = {
    img: { src: StaticImageData; alt: string };
    origin: { title: string; href: string };
};

export const Alex_G_Treehouse_assets = {
    computerGif: {
        img: {
            src: computerGif,
            alt: "Clipart illustration of a retro desktop computer setup with a monitor, tower, keyboard, mouse, and speakers.",
        },
        origin: {
            title: "WebArchive / GifCities",
            href: "https://web.archive.org/web/20011230035715/http://br.geocities.com:80/adrianocaramello/computador01.gif",
        },
    },
    desk: {
        img: {
            src: desk,
            alt: "Graphic of a dark brown computer desk featuring three drawers on the left and open storage on the right.",
        },
        origin: {
            title: "PublicDomainVectors",
            href: "https://publicdomainvectors.org/en/free-clipart/Office-desk-vector-illustration/11004.html",
        },
    },
    fieldOfGrass: {
        img: {
            src: fieldOfGrass,
            alt: "A vibrant green field of tall grass blowing in the wind, with trees in the background under a dark cloudy sky.",
        },
        origin: {
            title: "Wikimedia Commons",
            href: "https://commons.wikimedia.org/wiki/File:Field_of_grass_-_geograph.org.uk_-_436971.jpg",
        },
    },
} satisfies Record<string, ImageAsset>;
