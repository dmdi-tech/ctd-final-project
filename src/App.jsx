import { use, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router';
import './App.css'
import styles from './App.module.css';
import Player from './shared/Player'
import SearchBar from './shared/SearchBar';
import { fetchSongs } from './api/itunes';
import SearchResults from './features/SearchResults';
import LikedList from './features/LikedList';
import Header from './shared/Header';
import About from './pages/About';
import likedListLocalStorage from './utils/LikedListLocalStorage';

function App() {
  const [queryString, setQueryString] = useState('');
  const [songsResults, setSongsResults] = useState([]);
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

    })
  }

  const handleRemoveSong = (song) => {
    
  }

  useEffect(() => {
    if(!Array.isArray(likedList)) return;
    likedListLocalStorage.saveList(likedList);
  }, [likedList]);

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

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route 
          path='/'
          element={
            <div className={styles.searchArea}>
              <SearchBar 
                queryString={queryString}
                setQueryString={setQueryString}
              />

              <SearchResults 
                results={songsResults}
                isLoading={isLoading}
                onLike={addSong}
                onPlay={handlePlaySong}
              />  
            </div>
          }
        />
        <Route 
          path='/about'
          element={<About />}
        />

        <Route 
          path='/likedlist'
          element={<LikedList 
            likedList={likedList}
            onPlay={handlePlaySong}
            isLoading={isLoading}
          />}
        />
      </Routes>

      <Player 
        currentSong={currentSong}
      /> 

      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
    </div>
  )
}

export default App
