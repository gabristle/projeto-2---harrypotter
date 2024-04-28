import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://potterhead-api.vercel.app/api/characters');
                const characters = response.data;
                setAllCharacters(characters);
                setFoundCharacters(characters);
            } catch (error) {
                setErrorMessage('Error fetching data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const searchCharacter = (characterName) => {
        const trimmedName = characterName.trim();
        if (validateSearch(trimmedName)) {
            const filteredCharacters = allCharacters.filter(character =>
                character.name.toLowerCase().startsWith(trimmedName.toLowerCase())
            );
            if (filteredCharacters.length > 0) {
                setFoundCharacters(filteredCharacters);
                setErrorMessage('');
            } else {
                setFoundCharacters([]);
                setErrorMessage(`No characters found starting with "${trimmedName}"`);
            }
        }
    };

    const validateSearch = (toValidate) => {
        if (toValidate.length <= 2) {
            setErrorMessage('Write more than 2 characters');
            return false;
        } else if (toValidate.length === 0) {
            setErrorMessage('The input is empty, write at least 2 characters');
            return false;
        } else if (toValidate.length > 20) {
            setErrorMessage('Write less than 21 characters');
            return false;
        }
        return true;
    };

    return (
        <CharacterContext.Provider value={{ foundCharacters, errorMessage, searchCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};

export { CharacterProvider, CharacterContext };