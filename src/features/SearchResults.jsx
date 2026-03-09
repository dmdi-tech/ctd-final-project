import styled from 'styled-components';
import styles from './SearchResults.module.css'
import PlaySong from '../shared/PlaySong';
import { useState, useEffect, useRef } from 'react';
import likedListLocalStorage from '../utils/LikedListLocalStorage';
import { fetchSongs } from '../api/itunes';
import SearchBar from '../shared/SearchBar';

const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;  
    
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 6px;  
    padding: 12px;
`;

const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
    
`;

const StyledResults = styled.div`
    gap: 10px;
    width: 100%;
    
`;

const StyledPopUp = styled.div`
    width: 100%;
    position: absolute;
    top: 30px;
    max-height: 400px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

function SearchResults({ onPlay, setErrorMessage }) {
    const [queryString, setQueryString] = useState('');
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    const [songsResults, setSongsResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [likedSongs, setLikedSongs] = useState({});
    const resultsRef = useRef(null);

    const addSong = (song) => {
        setLikedList(prev => [...prev, song]);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const onLike = (song) => {
        if(likedList.some(s => s.trackId === song.trackId)) {
            return "Already in liked list."
        }

        setLikedList(prev => [...prev, song]);
        likedListLocalStorage.saveList([...likedList, song]);

        setLikedSongs(prev => ({...prev, [song.trackId]: true }));
        setTimeout(() => {
            setLikedSongs(prev => ({...prev, [song.trackId]: false }));
        }, 1000);
    };

    useEffect(() => {
        const loadSongs = async () => {
          setIsLoading(true);
    
          if (!queryString.trim()) {
            setSongsResults([]);
            setShowResults(true);
            setIsLoading(false);
            return;
          }; 
    
          try {
            const results = await fetchSongs(queryString);
            setSongsResults(results);
          } catch (error) {
            setErrorMessage(error.message);
          } finally {
            setIsLoading(false);
          }
        }
        loadSongs();
    }, [queryString]);

    /* outside click listner */
    useEffect(() => {
        function handleClickOutside(event) {
            if(resultsRef.current && !resultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <StyledContainer>
            <SearchWrapper ref={resultsRef}>
                <SearchBar 
                    queryString={queryString}
                    setQueryString={setQueryString}
                    onFocus={() => songsResults.length > 0 && setShowResults(true)}
                />

                {showResults &&  songsResults.length > 0 && (
                    <StyledPopUp>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                        songsResults.map((song) => (
                            <StyledDiv key={song.trackId} >
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
                                                onLike(song);
                                            }}
                                            disabled={likedList.some(s => s.trackId === song.trackId)}
                                        >
                                        {likedSongs[song.trackId] ? "Added!" : 
                                            likedList.some(s => s.trackId === song.trackId) ? "Already liked" : 
                                            "Add to Likes"}
                                        </button>

                                        <PlaySong 
                                            song={song} 
                                            onPlay={onPlay}
                                        />
                                    </div>

                                    <hr></hr>
                                </StyledResults>
                            </StyledDiv>
                        ))
                    )}
                </StyledPopUp>
                )}
            </SearchWrapper>
        </StyledContainer>
    )
}

export default SearchResults