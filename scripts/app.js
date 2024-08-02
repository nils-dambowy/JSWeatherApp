const searchBar = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    details.innerHTML = `
     <h5 class="my-3">${cityDetails.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>   
    `;

    // set day or night background
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = "img/day.svg";
    } else {
        timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc);

    // remove d-none class
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }

};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getCurrentConditions(cityDetails.Key);

    return {cityDetails, weather};
}

searchBar.addEventListener("submit", e => {
    // prevent refresh
    e.preventDefault();

    // get city value
    const city = searchBar.city.value.trim();
    searchBar.reset();

    // update ui
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})