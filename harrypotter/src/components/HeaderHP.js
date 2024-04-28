import './HeaderHP.css';
import axios from 'axios';
import logo from './assets/logo.png';
import React, { useState } from 'react';

function HeaderHP() {
    const [characterName, setCharacterName] = useState('');
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchCharacter = () => {
        const trimmedName = characterName.trim();
        if (validateSearch(trimmedName)) {
            axios.get(`https://potterhead-api.vercel.app/api/characters`)
                .then(response => {
                    const characters = response.data;
                    const filteredCharacters = characters.filter(character =>
                        character.name.toLowerCase().startsWith(trimmedName.toLowerCase())
                    );
                    if (filteredCharacters.length > 0) {
                        setFoundCharacters(filteredCharacters);
                        setErrorMessage('');
                    } else {
                        setFoundCharacters([]);
                        setErrorMessage(`No characters found starting with "${trimmedName}"`);
                    }
                })
                .catch(error => {
                    setErrorMessage('Error fetching data');
                    console.error('Error fetching data:', error);
                });
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
    
    return(
        <>
            <header>
                <img src={logo} alt="logo harry potter"/>
                <div id="header--search">
                    <p>character searcher</p>
                    <div id="header--search-input-error">
                        <input
                            type="text"
                            id="search--input"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                        />
                        <small id="search--error">{errorMessage}</small>
                    </div>
                    <button id="search--button" onClick={searchCharacter}>search</button>
                </div>
            </header>
            <main>
                <div id="desc--container">
                    {foundCharacters.map(character => (
                        <div className="character" key={character.id}>
                                <h2 className="desc--name">{character.name}</h2>
                                <p className="desc--species">Species: {character.species}</p>
                                <p className="desc--gender">Gender: {character.gender}</p>
                                <p className="desc--house">House: {character.house}</p>
                                <p className="desc--date-of-birth">Date of Birth: {character.dateOfBirth}</p>
                                <p className="desc--ancestry">Ancestry: {character.ancestry}</p>
                                <p className="desc--eye-colour">Eye Colour: {character.eyeColour}</p>
                                <p className="desc--hair-colour">Hair Colour: {character.hairColour}</p>
                            {character.image && (
                                <img
                                    className="desc--img-character"
                                    src={character.image}
                                    alt={character.name}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default HeaderHP;