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

const preventDefault = (event) => {
    event.preventDefault();
};

function SearchBar({ queryString, setQueryString }){
    const [localQueryString, setLocalQueryString] = useState(queryString);

    useEffect(() => {
        const debounce = setTimeout(() => setQueryString(localQueryString), 500);
        return () => clearTimeout(debounce);
    },[localQueryString, setQueryString]);

    return(
        <StyledForm onSubmit={preventDefault}>
            <StyledLabel id="searchTodos">Search songs: 
                <input
                    id="searchSongs"
                    type="text"
                    value={localQueryString}
                    onChange={(event) => {
                        setLocalQueryString(event.target.value);
                    }}
                />  
            </StyledLabel>
        </StyledForm>
    )
}

export default SearchBar