import { tbSortAsc, tbSortDesc } from "@/lib/icons";

export default function GridSort({
    sortOrder,
    onSortChange,
}: {
    sortOrder: "asc" | "desc";
    onSortChange: (sortOrder: "asc" | "desc") => void;
}) {
    const handleClick = () => {
        onSortChange(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <button
            onClick={handleClick}
            className="bg-accent-two text-accent-one rounded-md h-10 px-3 hover:cursor-pointer hover:bg-accent-two/90 transition-colors"
        >
            {sortOrder === "asc" ? tbSortAsc : tbSortDesc}
        </button>
    );
}
