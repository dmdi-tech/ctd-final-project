import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css';
import Player from './shared/Player'
import SearchBar from './shared/SearchBar';
import { fetchSongs } from './api/itunes';
import SearchResults from './features/SearchResults';
import LikedList from './features/LikedList';



function App() {
  const [queryString, setQueryString] = useState('');
  const [songsResults, setSongsResults] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const addSong = (song) => {
    setLikedList([...likedList, song]);
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

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <SearchBar 
          queryString={queryString}
          setQueryString={setQueryString}
        />

        <SearchResults 
          results={songsResults}
          isLoading={isLoading}
          onLike={addSong}
        />  
      </div>   
      
      <Player /> 

      <LikedList 
        likedList={likedList}
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
