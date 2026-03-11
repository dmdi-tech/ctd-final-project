import styled from 'styled-components';
import mediaPlayer from '../assets/mediaplayer.svg';
import styles from '../shared/Player.module.css';
import { useEffect, useRef } from 'react';

const PlayerWrapper = styled.div`
    position: relative;
    width: 60%;
    max-width: 700px;
    margin: 0 auto;
    padding-top: 40px;
`;

const MediaPlayer = styled.img`
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
`;

const ScreenOverlay = styled.div`
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 83%;
    height: 41%;
    align-items: center;
    padding: 10px 15px;
    font-family: 'VT323', monospace;
    letter-spacing: 2px;
    background: linear-gradient(to bottom, #001a20, #000e12);
    border-radius: 4px;
    box-shadow:
        inset 0 0 8px #00eaff55,
        0 0 12px #00eaff33;
    pointer-events: none;
`;

const PlayingSong = styled.p`
    font-size: 16px;
    font-style: italic;
    color: #00eaff;
    text-shadow:
        0 0 4px #00eaff,
        0 0 8px #00eaff;
`;


function Player({ currentSong, setErrorMessage }) {
    const audioRef = useRef(null);

    useEffect(() => {
        try {
            if(currentSong && audioRef.current) {
                audioRef.current.src = currentSong.previewUrl;
                audioRef.current.play();
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }, [currentSong]);

    return (
        <div className={styles.player}>
            <PlayerWrapper>
                <MediaPlayer src={mediaPlayer} alt="Media Player"/>
                
                <ScreenOverlay>
                    <p>MP3</p>
                    {currentSong ? (
                        <> 
                            <PlayingSong>
                                {currentSong.trackName}
                            </PlayingSong>
                        </>
                    ) : (
                        <p>No song playing...</p>
                    )}
                    <audio ref={audioRef} />

                </ScreenOverlay>
            </PlayerWrapper>
        </div>
    )
}

export default Player