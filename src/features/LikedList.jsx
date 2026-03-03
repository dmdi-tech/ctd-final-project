import styled from 'styled-components';
import styles from './SearchResults.module.css'
import { useState, useEffect } from 'react';


const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


function LikedList({ likedList, isLoading }) {

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (likedList.length === 0) return <p>No liked songs yet</p>;

    return (
        <StyledContainer>
            <h3>Liked List:</h3>
            
            {likedList.map((song) => (
                <div key={song.trackId}>
                    <p>{song.artistName} - {song.trackName}</p>
                </div>
            ))}

        </StyledContainer>
    )
}

export default LikedList