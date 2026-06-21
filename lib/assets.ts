import type { StaticImageData } from "next/image";

import computerGif from "@/public/images/computer.gif";
import desk from "@/public/images/desk.svg";
import fieldOfGrass from "@/public/images/field_of_grass.jpg";

export type ImageAsset = { src: StaticImageData; alt: string; origin: string };

export const assets = {
    computerGif: {
        src: computerGif,
        alt: "",
        origin: "https://web.archive.org/web/20011230035715/http://br.geocities.com:80/adrianocaramello/computador01.gif",
    },
    desk: {
        src: desk,
        alt: "",
        origin: "https://publicdomainvectors.org/en/free-clipart/Office-desk-vector-illustration/11004.html",
    },
    fieldOfGrass: {
        src: fieldOfGrass,
        alt: "",
        origin: "https://commons.wikimedia.org/wiki/File:Field_of_grass_-_geograph.org.uk_-_436971.jpg",
    },
} satisfies Record<string, ImageAsset>;
