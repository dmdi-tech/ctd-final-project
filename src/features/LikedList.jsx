import styled from 'styled-components';
import styles from './SearchResults.module.css'
import { useState, useEffect } from 'react';
import PlaySong from '../shared/PlaySong';
import LikedSong from '../shared/LikedSong';
import likedListLocalStorage from '../utils/LikedListLocalStorage';

const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


function LikedList({ }) {
    const [queryString, setQueryString] = useState('');
    const [songsResults, setSongsResults] = useState([]);
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    const [currentSong, setCurrentSong] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [onPlay, setOnPlay] = useState(false);

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (!likedList || likedList.length === 0) {
        return <p>No liked songs yet. Add a song your liked list!</p>;
    }

    const addSong = (song) => {
        setLikedList(prev => [...prev, song]);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const handleFavoriteSong = (song) => {
        setLikedList(prev => {
        
        })
    }

    const handleRemoveSong = (song) => {

    }

    useEffect(() => {
        if(!Array.isArray(likedList)) return;
        likedListLocalStorage.saveList(likedList);
    }, [likedList]);


    return (
        <StyledContainer>
            <h3>Liked List:</h3>      
            {likedList.map((song) => (
                <div key={song.trackId}>
                    <img 
                    src={song.artworkUrl100}
                    alt={`${song.trackName}`}
                    width={50}
                    height={50}
                />
                    <p>{song.artistName} - {song.trackName}</p>
                    
                    <PlaySong 
                        song={song} 
                        onPlay={onPlay}
                    />
                    <LikedSong />

                </div>
                
            ))}

        </StyledContainer>
    )
}

export default LikedList