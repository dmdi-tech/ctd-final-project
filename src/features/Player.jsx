import styled from 'styled-components';
import mediaPlayer from '../assets/mediaplayer.svg';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

`;

function Player() {
    return (
        <StyledContainer>
            <img src={mediaPlayer} alt="Media Player"/>
        </StyledContainer>
    )
}

export default Player