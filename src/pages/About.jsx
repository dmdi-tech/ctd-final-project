import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function About() {
    return (
        <StyledDiv>
            <p>Hi There! Welcome to my Code the Dream Final Project for the React Course!</p>
        </StyledDiv>
    )
}

export default About