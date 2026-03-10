import styled from 'styled-components';

const StyledSongCards = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

function Card ({ children }) {
    return <StyledSongCards>{children}</StyledSongCards>
}

export default Card