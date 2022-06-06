import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { nanoid } from "nanoid"
import pieColors from "../functions/PieColors";

export default function Graph({ data, artistGenres, labels }) {

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var initialLabel = ` ${context.label.toUpperCase()} : `
                        var artists = [];
                        artistGenres.map((artist) => {
                            if (artist.genres.includes(context.label)) {
                                artists.push(artist.artistName);
                            }
                            return artist
                        })
                        artists.map((artist) => {
                            initialLabel = initialLabel + artist + ", "
                            return initialLabel
                        });
                        initialLabel = initialLabel.substring(0, initialLabel.length - 2);
                        return initialLabel;
                    }
                }
            }
        }
    }

    /*///////////////////////////////////////////////////////////////////////////////////////////////*/

    const pieLabels = labels.map((label, index) => {
        return (
            <li className="label" key={nanoid()}>
                <span className="label-color" style={{ backgroundColor: pieColors[index] }}></span>
                <span className="label-name">{label}</span>
            </li>
        )
    })

    const artists = artistGenres.map((artist, index) => {
        return (
            <li className="artist" key={nanoid()}>
                <h5 className="artist-id">{index + 1}</h5>
                <img className="artist-photo" src={artist.imageUrl} alt="artist" />
                <h5 className="artist-name">
                    {artist.artistName}
                </h5>
                <a className="artist-link" href={artist.artistUrl} target="_blank" rel="noreferrer">
                    <i className="spotify-logo fa fa-spotify" aria-hidden="true"></i>
                </a>
            </li>
        )
    })

    /*///////////////////////////////////////////////////////////////////////////////////////////////*/

    return (
        <div className="result-container">
            <div className="pie-container">
                <h2 className="pie-title">Your Top Genres</h2>
                <Pie
                    data={data}
                    options={options}
                />

                <ul className="pie-labels">
                    {pieLabels}
                </ul>
            </div>

            <div className="artist-container">
                <h2 className="artists-title">Your Top Artists</h2>
                <ul className="artist-list">
                    {artists}
                </ul>
            </div>
        </div>
    );
}
