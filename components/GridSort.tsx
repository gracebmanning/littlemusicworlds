const iconWidth = "24px";
const iconHeight = "24px";

const tbSortAsc = (
    <svg
        stroke="#3d348b"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        height={iconHeight}
        width={iconWidth}
    >
        <path d="M4 6l7 0"></path>
        <path d="M4 12l7 0"></path>
        <path d="M4 18l9 0"></path>
        <path d="M15 9l3 -3l3 3"></path>
        <path d="M18 6l0 12"></path>
    </svg>
);

const tbSortDesc = (
    <svg
        stroke="#3d348b"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        height={iconHeight}
        width={iconWidth}
    >
        <path d="M4 6l9 0"></path>
        <path d="M4 12l7 0"></path>
        <path d="M4 18l7 0"></path>
        <path d="M15 15l3 3l3 -3"></path>
        <path d="M18 6l0 12"></path>
    </svg>
);

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
