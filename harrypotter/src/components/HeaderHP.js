import './Header.css';
import Functions from './Functions.js';
import logo from './assets/logo.png';
function HeaderHP() {
    
    return(
        <>
            <header>
                <img src={logo} alt="logo harry potter"/>
                <div id="header--search">
                    <p>character searcher</p>
                    <div id="header--search-input-error">
                        <input type="text" id="search--input" />
                        <small id="search--error"></small>
                    </div>
                    <button id="search--button" onclick={Functions.searchCharacter()}>search</button>
                </div>
            </header>
        </>
    )
}

export default HeaderHP;