/*
    THIS FILE WAS DEVELOPED BY MEHMET GUDUK
    © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
    https://github.com/mehmetguduk
*/

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
        if (item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

export default hash;









