import styled from 'styled-components';
import styles from './SearchResults.module.css'
import { useState, useEffect } from 'react';
import PlaySong from './PlaySong';


const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


function LikedList({ likedList, onPlay, isLoading }) {

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (likedList.length === 0) return <p>No liked songs yet</p>;

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