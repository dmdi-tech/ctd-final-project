import styled from 'styled-components';
import mediaPlayer from '../assets/mediaplayer2.svg';

const PlayerWrapper = styled.div`
    position: relative;
    width:fit-content;
    margin: 0 auto;
`;

const MediaPlayer = styled.img`
    display: block;
    width: 90rem;
    max-width: 900px;
    position: relative;
    z-index: 1;
`;

const ScreenOverlay = styled.div`
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 60%;
    height: 15%;

    
    align-items: center;
    padding: 10px 15px;

    font-family: 'VT323', monospace;
    letter-spacing: 2px;

    color: #00eaff;

    background: linear-gradient(to bottom, #001a20, #000e12);
    border-radius: 4px;

    box-shadow:
        inset 0 0 8px #00eaff55,
        0 0 12px #00eaff33;

    text-shadow:
        0 0 4px #00eaff,
        0 0 8px #00eaff;

    pointer-events: none;
`;



function Player() {
    return (
        <PlayerWrapper>
            <MediaPlayer src={mediaPlayer} alt="Media Player"/>
            
            <ScreenOverlay>
                <p>MP3</p>

            </ScreenOverlay>
        </PlayerWrapper>
    )
}

export default Player