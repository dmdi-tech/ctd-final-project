import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 20px;
    gap: 16px;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 1.15rem;
    color: #555;
    max-width: 480px;
    line-height: 1.6;
    margin: 0;
`;

function Home() {
    return (
        <StyledDiv>
            <Title>Your Music, Your Style</Title>
            <Subtitle>
                A music player with a touch of old-fashioned radio charm.
                Search songs, build your liked list and listen all day long!
            </Subtitle>

            <Subtitle>Start by searching for any song, and add it to your liked list. Or play a song!</Subtitle>
        </StyledDiv>
    )
}

export default Home