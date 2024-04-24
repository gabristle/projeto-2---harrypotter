function HeaderHP() {
    
    return(
        <>
            <header>
                <img src="assets/logo.png" alt="logo harry potter" />
                <div id="header--search">
                    <p>character searcher</p>
                    <div id="header--search-input-error">
                        <input type="text" id="search--input" />
                        <small id="search--error"></small>
                    </div>
                    <button id="search--button" onclick="searchCharacter()">search</button>
                </div>
            </header>
        </>
    )
}

export default HeaderHP;