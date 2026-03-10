import { useState } from 'react'
import { Routes, Route } from 'react-router';
import './App.css'
import styles from './App.module.css';
import Player from './shared/Player'
import SearchResults from './pages/SearchResults';
import LikedList from './pages/LikedList';
import Header from './shared/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
          <Route 
            path='/' 
            element={
              <Home />
            }  
          />

          <Route 
            path='/search'
            element={
              <SearchResults 
                onPlay={setCurrentSong} 
                setErrorMessage={setErrorMessage}
              />  
            }
          />

          <Route 
            path='/likedlist'
            element={<LikedList 
              onPlay={setCurrentSong}
              setErrorMessage={setErrorMessage}
              
            />}
          />

          <Route 
            path='*'
            element= {<NotFound />}
          />
      </Routes>

      <Player 
        currentSong={currentSong} 
        setErrorMessage={setErrorMessage}
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
