const animeListEl = document.querySelector(".anime__list")
const base_url = "https://api.jikan.moe/v4/anime";

function animeHTML(anime) {
    return `
    <div class="anime">
            <figure class="anime__img--wrapper">
                <img src="${anime.images.jpg.image_url}" class="anime__img" alt="">
            </figure>
            <div class="anime__title">${anime.title_english}</div>
            <div class="anime__ratings">${anime.score} / 10</div>
            <div class="synopsis">${anime.synopsis}</div>
        </div>
    `
}

async function searchAnime(event) {

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search")

    const animes = await fetch(`${base_url}?q=${query}&page=1`)
    const animesData = await animes.json();
    const animesList = animesData.data;
    animeListEl.innerHTML = animesList.map((anime) => animeHTML(anime)).join("");
}

function pageLoaded() {
    const form = document.getElementById('search__form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded)
