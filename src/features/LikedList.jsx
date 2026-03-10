import styled from 'styled-components';
import styles from './LikedList.module.css'
import { useState, useEffect, useMemo } from 'react';
import PlaySong from '../shared/PlaySong';
import LikedSong from '../shared/LikedSong';
import likedListLocalStorage from '../utils/LikedListLocalStorage';
import { useSearchParams, useNavigate } from 'react-router';
import Sort from './Sort';

const StyledContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

const StyledCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    padding: 20px;
`;

const StyledSongCards = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


function LikedList({ onPlay, setErrorMessage }) {
    const [likedList, setLikedList] = useState(() => likedListLocalStorage.getList());
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [sortField, setSortField] = useState("createdTime");
    const [sortDirection, setSortDirection] = useState("desc");

    const [filter, setFilter] = useState("all");

    const sortedLikedList = useMemo(() => {
        if (filter === 'favorites') return likedListLocalStorage.getFavorites();
        return likedListLocalStorage.getSortedList(sortField, sortDirection);
    }, [likedList, sortField, sortDirection, filter]);


    const [searchParams, setSearchParams] = useSearchParams();
    const itemsPerPage = 6;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const indexOfFirstLiked = (currentPage - 1) * itemsPerPage;
    const indexOfLastLiked = indexOfFirstLiked + itemsPerPage;
    const totalPages = Math.ceil(sortedLikedList.length / itemsPerPage);
    const currentLikedList = sortedLikedList.slice(indexOfFirstLiked, indexOfLastLiked);

    const handleFavoriteSong = (song) => {
        try{
            setLikedList(prev => {
                const songId = song.trackId ?? song.id;

                const updatedFav = prev.map(s =>
                    (s.trackId ?? s.id) === songId
                        ? {...s, isFavorite: !song.isFavorite}
                        : s
                );

                likedListLocalStorage.saveList(updatedFav);
                return updatedFav;
            });
        } catch(error) {
            setErrorMessage(error.message);
        }
    };

    const handleRemoveSong = (song) => {
        try {
            setLikedList(prev => prev.filter(s => s.trackId !== song.trackId));
            likedListLocalStorage.removeSong(song.trackId);
        } catch(error) {
            setErrorMessage(error.message);
        }
    };

    const handlePreviousPage = () => {
        setSearchParams({page: Math.max(1, currentPage - 1)});
    }

    const handleNextPage = () => {
        setSearchParams({ page: Math.min(totalPages, currentPage + 1)})
    }

    useEffect(() => {
        if(totalPages > 0){
            if(isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
                navigate("/likedlist");
            }
        }
    },[currentPage, totalPages, navigate]);

    if(isLoading) {
        return <p>Liked List is loading...</p>
    }

    if (!likedList || likedList.length === 0) {
        return <p>No liked songs yet. Add a song your liked list!</p>;
    }

    return (
        <StyledContainer>
            <h3 className={styles.title}>Liked List:</h3>   
            
            <StyledCards>
                {currentLikedList.map((song) => (
                    <StyledSongCards key={song.trackId}>
                        <img
                            className={styles.albumCover}
                            src={song.artworkUrl100}
                            alt={`${song.trackName}`}
                            width={50}
                            height={50}
                        />

                        <p>{song.artistName} - {song.trackName}</p>
                        
                        <div className={styles.buttons}>
                            <PlaySong 
                                song={song} 
                                onPlay={onPlay}
                            />
                            <LikedSong 
                                song={song}
                                onFavorite={handleFavoriteSong}
                                onRemove={handleRemoveSong}
                            />
                        </div>
                    </StyledSongCards>
                    
                ))}
            </StyledCards>
            <div className={styles.paginationControls}>
                <button

                    onClick={() =>{
                        handlePreviousPage();
                    }}
                    disabled={currentPage===1}
                >Previous</button>

                <span>Page {currentPage} of {totalPages} </span>
                
                <button
                    onClick={() => {
                        handleNextPage();
                    }}
                    disabled={currentPage===totalPages}
                >Next</button>
            </div> 

            <Sort 
                filter={filter}
                setFilter={setFilter}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortField={sortField}
                setSortField={setSortField}
            />
        </StyledContainer>
    )
}

export default LikedList