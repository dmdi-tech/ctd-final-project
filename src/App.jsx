import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css';
import Player from './features/Player'
import SearchBar from './shared/SearchBar';
import { fetchSongs } from './api/itunes';


function App() {
  const [queryString, setQueryString] = useState('');
  const [songsResults, setSongsResults] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      if (queryString.length === 0) return; 

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
      <Player />
      <SearchBar 
        queryString={queryString}
        setQueryString={setQueryString}
      />

      <div>
        {songsResults.map((song) => (
          <div key={song.trackId}>
            <p>{song.artistName} - {song.trackName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
