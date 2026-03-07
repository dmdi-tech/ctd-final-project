import styled from 'styled-components';
import styles from './SearchResults.module.css'
import PlaySong from '../shared/PlaySong';
import { useState, useEffect } from 'react';
import likedListLocalStorage from '../utils/LikedListLocalStorage';
import { fetchSongs } from '../api/itunes';
import SearchBar from '../shared/SearchBar';

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

function SearchResults({ onPlay }) {
    const [queryString, setQueryString] = useState('');
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    /* const [currentSong, setCurrentSong] = useState(null); */
    const [songsResults, setSongsResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addSong = (song) => {
        setLikedList(prev => [...prev, song]);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const onLike = (song) => {
        setLikedList(prev => [...prev, song]);
        likedListLocalStorage.saveList([...likedList, song]);
    };

    useEffect(() => {
        const loadSongs = async () => {
          setIsLoading(true);
    
          if (!queryString.trim()) {
            setSongsResults([]);
            setIsLoading(false);
            return;
          }; 
    
          try {
            const results = await fetchSongs(queryString);
            setSongsResults(results);
          } catch (error) {
            console.error("Error");
          } finally {
            setIsLoading(false);
          }
        }
        loadSongs();
      }, [queryString]);

    

    if(isLoading) {
        return <p>Loading...</p>
    }


    return (
        <StyledContainer>
            <SearchBar 
                queryString={queryString}
                setQueryString={setQueryString}
              />
            {songsResults.map((song) => (
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