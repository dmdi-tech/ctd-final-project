{/* this is where favorite and remove button go*/}

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