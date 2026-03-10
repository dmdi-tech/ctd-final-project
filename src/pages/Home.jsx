import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function Home() {
    return (
        <StyledDiv>
            <p>Hi! Welcome to your digital music player. Inspired by old stereos!</p>

            <p>Take a look around, search songs and add them to your liked list!</p>
        </StyledDiv>
    )
}

export default Home