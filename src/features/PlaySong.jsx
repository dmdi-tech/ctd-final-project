function PlaySong({ song, onPlay}) {

    return (
        <div>
            <button 
                onClick={() => onPlay(song)}
            >
                Play
            </button>
        </div>
    )
}

export default PlaySong