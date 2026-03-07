import styled from 'styled-components';
import styles from './SearchResults.module.css'
import PlaySong from '../shared/PlaySong';
import { useState, useEffect } from 'react';


const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    background: #f9f9f9;
    border-radius: 6px;
`;

const StyledResults = styled.div`

`;

function SearchResults({ results, onPlay, onLike, isLoading }) {

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <StyledContainer>
            {results.map((song) => (
            <StyledDiv key={song.trackId}>
                <img 
                    src={song.artworkUrl100}
                    alt={`${song.trackName}`}
                    width={50}
                    height={50}
                />
                
                <StyledResults>
                    <p>{song.artistName} - {song.trackName}</p>
                    
                    <div className={styles.buttons}>
                        <button
                            onClick={() => {
                                onLike(song)
                            }}
                        >
                        Add to Likes
                        </button>

                        <PlaySong 
                            song={song} 
                            onPlay={onPlay}
                        />
                    </div>
                </StyledResults>

                {/* then here add like, favorite, or play wip */}

            </StyledDiv>
            ))}
      </StyledContainer>
    )
}

export default SearchResults