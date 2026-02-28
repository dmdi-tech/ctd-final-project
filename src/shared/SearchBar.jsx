import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


const StyledLabel = styled.label`
    display:flex;
    gap: 5px;
`;

function SearchBar({ queryString, setQueryString }){
    const [localQueryString, setLocalQueryString] = useState(queryString);

    
const preventDefault = (event) => {
    event.preventDefault();
};

    return(
        <StyledForm onSubmit={preventDefault}>
            <StyledLabel id="searchTodos">Search songs: 
                <input
                    id="searchSongs"
                    type="text"
                    value={localQueryString}
                    onChange={(event) => {
                        setLocalQueryString(event.target.value);
                        setQueryString(event.target.value);
                    }}
                />  
            </StyledLabel>
        </StyledForm>
    )
}

export default SearchBar