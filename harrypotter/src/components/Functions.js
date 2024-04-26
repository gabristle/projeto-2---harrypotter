import './Main.css';
function Functions(){
    function searchCharacter() {
        var characterName = document.getElementById('search--input').value.trim();
        if(validateSearch(characterName)){
            var url = 'https://potterhead-api.vercel.app/api/characters';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var characters = JSON.parse(xhr.responseText);
                        var foundCharacters = characters.filter(function (character) {
                            return character.name.toLowerCase().startsWith(characterName.toLowerCase());
                        });
                        if (foundCharacters.length > 0) {
                            var errorMessage = document.getElementById('search--error');
                            errorMessage.textContent = '';
                            console.log(foundCharacters);
                            displayCharacter(foundCharacters);
                        }else {
                            displayError(`There's no characters with this name`);
                        }
                    } else {
                        displayError('Error');
                    }
                }
            };
            xhr.send();
        }
    }

    function displayCharacter(characters) {
        var descContainer = document.getElementById('desc--container');
        descContainer.innerHTML = '';
    
        characters.forEach(function (character){
    
            var characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
    
            var descName = document.createElement('h2');
            descName.textContent = character.name;
            descName.classList.add('desc--name');
            
            var descSpecies = document.createElement('p');
            descSpecies.textContent = "Species: " + character.species;
            descSpecies.classList.add('desc--species');
            
            var descGender = document.createElement('p');
            descGender.textContent = "Gender: " + character.gender;
            descGender.classList.add('desc--gender');
            
            var descHouse = document.createElement('p');
            descHouse.textContent = "House: " + character.house;
            descHouse.classList.add('desc--house');
            
            var descDateOfBirth = document.createElement('p');
            descDateOfBirth.textContent = "Date of Birth: " + character.dateOfBirth;
            descDateOfBirth.classList.add('desc--date-of-birth');
            
            var descAncestry = document.createElement('p');
            descAncestry.textContent = "Ancestry: " + character.ancestry;
            descAncestry.classList.add('desc--ancestry');
    
            var descEye = document.createElement('p');
            descEye.textContent = "Eye Colour: " + character.eyeColour;
            descEye.classList.add('desc--eye-colour');
    
            var descHair = document.createElement('p');
            descHair.textContent = "Hair Colour: " + character.hairColour;
            descHair.classList.add('desc--hair-colour');
            
            if(character.image){
                var imgCharacter = document.createElement('img');
                imgCharacter.classList.add('desc--img-character');
                imgCharacter.src = character.image;
                imgCharacter.alt = character.name;
            }else{
    
            }
    
            if(character.house){
                var imgHouse = document.createElement('img');
                imgHouse.classList.add('desc--img-house');
                imgHouse.alt = 'House logo';
                if (character.house === 'Gryffindor') {
                    imgHouse.src = 'assets/gryffindor.webp';
                } else if (character.house === 'Slytherin') {
                    imgHouse.src = 'assets/slytherin.webp';
                } else if (character.house === 'Hufflepuff') {
                    imgHouse.src = 'assets/hufflepuff.webp';
                } else if (character.house === 'Ravenclaw') {
                    imgHouse.src = 'assets/ravenclaw.webp';
                }
            }
    
            characterDiv.appendChild(descName);
            characterDiv.appendChild(descSpecies);
            characterDiv.appendChild(descGender);
            characterDiv.appendChild(descHouse);
            characterDiv.appendChild(descDateOfBirth);
            characterDiv.appendChild(descAncestry);
            characterDiv.appendChild(descEye);
            characterDiv.appendChild(descHair);
            if(imgCharacter){
                characterDiv.appendChild(imgCharacter);
            }
            if(imgHouse){
                characterDiv.appendChild(imgHouse);
            }
    
            descContainer.appendChild(characterDiv);
        });
    }
    
    function displayError(message){
        var errorMessage = document.getElementById('search--error');
        errorMessage.textContent = `${message}`;
    }
    
    function validateSearch(toValidate){
        if(toValidate.length <= 2){
            displayError('Write more than 2 characters');
            return false;
        }else if(toValidate.length === 0){      
            displayError('The input is empty, write at least 2 characters');
            return false;
        }else if(toValidate.length > 20){
            displayError('Write less than 21 characters');
            return false;
        }
        return true;
    }
}

export default Functions;