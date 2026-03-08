import style from '../shared/LikedSong.module.css';

function LikedSong({ song, onFavorite, onRemove }) {
    return (
        <div className={style.buttons}>
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