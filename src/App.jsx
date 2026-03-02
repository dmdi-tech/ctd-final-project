import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css';
import Player from './shared/Player'
import SearchBar from './shared/SearchBar';
import { fetchSongs } from './api/itunes';
import SearchResults from './features/SearchResults';



function App() {
  const [queryString, setQueryString] = useState('');
  const [songsResults, setSongsResults] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {

      if (!queryString.trim()) {
        setSongsResults([]);
        return;
      }; 

      try {
        const results = await fetchSongs(queryString);
        setSongsResults(results);
      } catch (error) {
        console.error("Error");
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
        />  
      </div>   
      
      <Player /> 
    </div>
  )
}

export default App
