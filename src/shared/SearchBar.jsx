import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;


const StyledLabel = styled.label`
    display:flex;
    gap: 5px;
`;

const StyledButton = styled.button`
    font-style: ${(props) => (props.disabled ? 'italic' : 'normal')};
`;

const preventDefault = (event) => {
    event.preventDefault();
};

function SearchBar({ queryString, setQueryString, onFocus }){
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
                    onFocus={onFocus}
                />  
            </StyledLabel>

            <StyledButton
                type="button"
                onClick={() => {setLocalQueryString("")}}
            >
                Clear
            </StyledButton>
        </StyledForm>
    )
}

export default SearchBar