import React, { useState, useContext } from 'react';
import { CharacterContext } from './CharacterContext';
import './HeaderHP.css';
import logo from './assets/logo.png';

function HeaderHP() {
    const { foundCharacters, errorMessage, searchCharacter } = useContext(CharacterContext);
    const [characterName, setCharacterName] = useState('');

    const handleSearch = () => {
        searchCharacter(characterName);
    };

    return (
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
                    <button id="search--button" onClick={handleSearch}>search</button>
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