function LikedSong({ song, onFavorite, onRemove }) {

    return (
        <div>
            <button 
                onClick={() => onFavorite(song)}
            >
                { song.isFavorite ? "❤" : "♡" } 
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