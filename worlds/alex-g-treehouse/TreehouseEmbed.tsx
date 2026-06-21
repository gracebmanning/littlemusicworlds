export const TreehouseEmbed = () => {
    const width = window.innerWidth < 768 ? 100 : 120;
    return (
        <iframe
            width={width}
            height={width}
            src="https://www.youtube.com/embed/I_5lEJjGgto?si=rl-aGqUE2hvcW6Yi&amp;autoplay=1&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
    );
};
