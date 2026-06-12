export function slugify(str: string) {
    return str
        .toString() // Ensure it's a string
        .normalize("NFD") // Decompose accented characters (e.g., é -> e + ´)
        .replace(/[\u0300-\u036f]/g, "") // Remove the standalone accent marks
        .toLowerCase() // Convert to lowercase
        .trim() // Remove whitespace from both ends
        .replace(/[^a-z0-9 -]/g, "") // Remove any character that isn't a letter, number, space, or hyphen
        .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
        .replace(/-+/g, "-"); // Collapse multiple consecutive hyphens into one
}
