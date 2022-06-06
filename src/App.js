import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./functions/Config";
import hash from "./functions/Hash";
import Artists from "./components/Artists";
import "./styles/style.scss"

function App() {

    const authLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    const token = hash.access_token

    return (
        <div className="App">
            {!token ?
                <main className="intro-container">
                    <h1 className="title">Spotify Tracker</h1>
                    <p className="description">Spotify Tracker is a web application that see the music genres and artists you listen to the most on Spotify.</p>
                    <a className="spotify-button" href={authLink}>
                        <i className="spotify-logo fa fa-spotify" aria-hidden="true"></i>
                        Login with Spotify
                    </a>


                </main>
                :
                <Artists token={token} />
            }

            <footer className="copyright">
                <p className="copyright-text">
                    © 2022 Copyright <a className="copyright-link" href="https://github.com/mehmetguduk" target="_blank" rel="noreferrer">Mehmet Güdük</a> All Rights Reserved
                </p>
            </footer>
        </div>
    );
}

export default App;
