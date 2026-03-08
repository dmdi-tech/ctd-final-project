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
import NotFound from './pages/NotFound';
import likedListLocalStorage from './utils/LikedListLocalStorage';

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
          <Route 
            path='/' 
            element={
              <>
              </>
            }  
          />

          <Route 
            path='/search'
            element={
              <SearchResults onPlay={setCurrentSong} />  
            }
          />

          <Route 
            path='/about'
            element={<About />}
          />

          <Route 
            path='/likedlist'
            element={<LikedList />}
          />

          <Route 
            path='*'
            element= {<NotFound />}
          />
      </Routes>

      <Player currentSong={currentSong} /> 
      
      {/* {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )} */}
    </div>
  )
}

export default App
