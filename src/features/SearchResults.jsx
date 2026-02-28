import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

const StyledSongNames = styled.div`
    width: 40%;
`;

function SearchResults({ results, onPlay, onLike }) {
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
                
                <StyledSongNames>
                    <p>{song.artistName} - {song.trackName}</p>
                </StyledSongNames>

                {/* then here add like, favorite, or play wip */}

                <button>
                    Add to Likes
                </button>

                <button>
                    Play
                </button>
            </StyledDiv>
            ))}
      </StyledContainer>
    )
}

export default SearchResults