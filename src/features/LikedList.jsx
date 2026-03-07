import styled from 'styled-components';
import styles from './SearchResults.module.css'
import { useState, useEffect } from 'react';
import PlaySong from '../shared/PlaySong';


const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


function LikedList({ likedList, onPlay, isLoading }) {

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
                    
                    <PlaySong 
                        song={song} 
                        onPlay={onPlay}
                    />
                </div>
                
            ))}
        </StyledContainer>
    )
}

export default LikedList