const ITUNES_API_URL = "https://itunes.apple.com/"

export async function fetchSongs(query){
    try{
        const url = `${ITUNES_API_URL}search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

        const resp = await fetch(url);

        if(!resp.ok) {
            throw new Error("Error fetching song.");
        }

        const songs = await resp.json();

        return songs.results || [];

    }
    catch(error){
        console.error("Error searching for song:", error.message);
    }
}