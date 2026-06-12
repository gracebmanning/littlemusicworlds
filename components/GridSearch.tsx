export default function GridSearch({
    searchQuery,
    onSearchChange,
}: {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearchChange(searchQuery);
        }
    };

    return (
        <div className="relative w-1/5">
            <svg
                stroke="#3d348b"
                fill="#3d348b"
                stroke-width="0"
                viewBox="0 0 500 500"
                height="22px"
                width="22px"
                className="absolute top-1/2 -translate-y-1/2 left-2"
            >
                <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z" />
            </svg>
            <input
                type="search"
                name="grid-search"
                placeholder="Search songs and artists"
                aria-label="Search song titles and artist names"
                className="bg-accent-two text-accent-one rounded-md pl-10 pr-2 w-full h-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
