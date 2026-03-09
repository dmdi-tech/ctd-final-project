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

const StyledCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    padding: 20px;
`;

const StyledSongCards = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;


function LikedList({ onPlay, setErrorMessage }) {
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    const [isLoading, setIsLoading] = useState(false);

    const handleFavoriteSong = (song) => {
        try{
            setLikedList(prev => {
                const songId = song.trackId ?? song.id;

                const updatedFav = prev.map(s =>
                    (s.trackId ?? s.id) === songId
                        ? {...s, isFavorite: !song.isFavorite}
                        : s
                );

                likedListLocalStorage.saveList(updatedFav);
                return updatedFav;
            });
        } catch(error) {
            setErrorMessage(error.message);
        }
    };

    const handleRemoveSong = (song) => {
        try {
            setLikedList(prev => prev.filter(s => s.trackId !== song.trackId));
            likedListLocalStorage.removeSong(song.trackId);
        } catch(error) {
            setErrorMessage(error.message);
        }
    };

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (!likedList || likedList.length === 0) {
        return <p>No liked songs yet. Add a song your liked list!</p>;
    }

    return (
        <StyledContainer>
            <h3 className={styles.title}>Liked List:</h3>   
            
            <StyledCards>
                {likedList.map((song) => (
                    <StyledSongCards key={song.trackId}>
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
                                onPlay={onPlay}
                            />
                            <LikedSong 
                                song={song}
                                onFavorite={handleFavoriteSong}
                                onRemove={handleRemoveSong}
                            />
                        </div>
                    </StyledSongCards>
                    
                ))}
            </StyledCards>
        </StyledContainer>
    )
}

export default LikedList