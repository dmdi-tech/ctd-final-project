import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    width: 100%;
    box-sizing: border-box;
`;


const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    font-size: 0.875rem;
    color: #555;

    input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 0.875rem;
        background: transparent;
    }
`;

const StyledButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    color: #888;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 4px;
    &:hover {
        background: #f0f0f0;
        color: #333;
    }
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