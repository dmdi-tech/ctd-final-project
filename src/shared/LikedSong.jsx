{/* this is where favorite and remove button go*/}
import { useContext, useState } from "react";

import favoritesLocalStorage from "../utils/LikedListLocalStorage";

function LikedSong({ song, onFavorite, onRemove }) {

    return (
        <div>
            <button 
                onClick={() => onFavorite(song)}
            >
                Favorite
            </button>

            <button 
                onClick={() => onRemove(song)}
            >
                Remove
            </button>
        </div>
    )
}

export default LikedSong