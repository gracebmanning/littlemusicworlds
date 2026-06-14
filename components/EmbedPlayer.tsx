export type Player =
    | { source: "spotify"; id: string } // open.spotify.com/track/<id>
    | { source: "youtube"; id: string } // youtube.com/embed/<id>
    | { source: "soundcloud"; id: string } // numeric id from .../tracks/<id>
    | { source: "bandcamp"; album: string; track: string }; // album=<album>/track=<track>
