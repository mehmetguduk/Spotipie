/*
    THIS FILE WAS DEVELOPED BY MEHMET GUDUK
    © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
    https://github.com/mehmetguduk
*/

import React from 'react'
import pieColors from '../utils/PieColors';
import Graph from './Graph';

const axios = require("axios");

export default function Artists({ token }) {

    /* @@@@@@@@@@@@@@@@@@@@@@@@ STATES @@@@@@@@@@@@@@@@@@@@@@@@ */

    const [artistGenres, setArtistGenres] = React.useState([]);
    const [data, setData] = React.useState({})
    const [isMounted, setIsMounted] = React.useState(false);
    const [labels, setLabels] = React.useState({})

    /* @@@@@@@@@@@@@@@@@@@@@@@@ EFFECTS @@@@@@@@@@@@@@@@@@@@@@@@ */

    React.useEffect(() => {
        const getTopArtists = async (token) => {

            /*///////////////////////////////*/

            let topArtists = [];

            const headers = {
                "Authorization": "Bearer " + token
            };
            await axios.get("https://api.spotify.com/v1/me/top/artists", { headers }).then((response) => {
                topArtists = response.data.items;
            })

            const currArtistsToGenres = topArtists.map((artist) => {
                const name = artist.name
                const genres = artist.genres
                const imageUrl = artist.images[0].url
                const artistUrl = artist.external_urls.spotify
                return {
                    artistName: name,
                    genres: genres,
                    imageUrl: imageUrl,
                    artistUrl: artistUrl
                }
            })

            setArtistGenres(currArtistsToGenres);

            /*///////////////////////////////*/

            const unorganizedGenres = topArtists.map((artist) => {
                const genreArr = artist.genres;
                return genreArr;
            })

            const allGenres = [].concat(...unorganizedGenres)

            let frequency = {};

            allGenres.map((genre) => {
                frequency[genre] = 0;
                return frequency
            })

            allGenres.map((genre) => {
                frequency[genre] = frequency[genre] + 1;
                return frequency
            })

            let keys = Object.keys(frequency);
            let vals = Object.values(frequency);
            let a = 0;
            let finalArr = [];

            while (a !== 20 && keys.length !== 0) {
                let currIndex = vals.length - 1;
                finalArr.push(keys[currIndex]);
                keys.splice(currIndex, 1);
                vals.splice(currIndex, 1);
                a++;
            }

            let finalObj = {};
            finalArr.map((genre) => {
                finalObj[genre] = frequency[genre];
                return finalObj
            })

            setLabels(Object.keys(finalObj))

            const total = Object.values(finalObj).reduce((partialSum, a) => partialSum + a, 0);

            /*///////////////////////////////*/

            let newData = {
                labels: Object.keys(finalObj),
                datasets: [
                    {
                        label: "Your Top Genres",
                        data: Object.values(finalObj).map((value) => {
                            return Math.round((value / total) * 100) / 100;
                        }),
                        backgroundColor: pieColors,
                        borderColor: "#f3f3f3",
                        radius: "100%",
                        borderWidth: 2,
                        borderRadius: 10,
                        spacing: 20
                    }
                ]
            }
            setData(newData);
            setIsMounted(true);
        }
        getTopArtists(token);
    }, [axios, token])

    /* @@@@@@@@@@@@@@@@@@@@@@@@ RETURN @@@@@@@@@@@@@@@@@@@@@@@@ */

    return (
        <main className='graph-container'>
            {isMounted &&
                <Graph
                    data={data}
                    artistGenres={artistGenres}
                    labels={labels}
                />
            }
        </main>
    );
}