import styled from 'styled-components';
import styles from './LikedList.module.css'
import { useState, useEffect } from 'react';
import PlaySong from '../shared/PlaySong';
import LikedSong from '../shared/LikedSong';
import likedListLocalStorage from '../utils/LikedListLocalStorage';

const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;


function LikedList({ }) {
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    const [currentSong, setCurrentSong] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const addSong = (song) => {
        setLikedList(prev => [...prev, song]);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const handleFavoriteSong = (song) => {
        setLikedList(prev => {
            const songId = song.trackId ?? song.id;

            const filtered = prev.filter(s => s.trackId !== songId);

            const updatedFav = [
                ...filtered,
                {...song, isFavorite: !song.isFavorite}
            ];

            likedListLocalStorage.saveList(updatedFav);
            return updatedFav;
        });
    };

    const handleRemoveSong = (song) => {
        setLikedList(prev => prev.filter(s => s.trackId !== song.trackId));
        likedListLocalStorage.removeSong(song.trackId);
    };

    useEffect(() => {
        setIsLoading(true);
        try {
            if(!Array.isArray(likedList)) {
                likedListLocalStorage.saveList(likedList);
            }
        } catch(errorMessage) {
            setErrorMessage("Failed to save song to liked list.");
        } finally {
            setIsLoading(false);
        }

    }, [likedList]);

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (!likedList || likedList.length === 0) {
        return <p>No liked songs yet. Add a song your liked list!</p>;
    }

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
                    
                    <div className={styles.buttons}>
                        <PlaySong 
                            song={song} 
                            onPlay={handlePlaySong}
                        />
                        <LikedSong 
                            song={song}
                            onFavorite={handleFavoriteSong}
                            onRemove={handleRemoveSong}
                        />
                    </div>
                </div>
                
            ))}
        </StyledContainer>
    )
}

export default LikedList