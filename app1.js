const cityForm = document.querySelector('form');
const cityName = document.querySelector('.city');
const temptxt = document.querySelector('.temp-cur');
const weatherType = document.querySelector('.weather-type');
const weatherIcon = document.querySelector('.weather-icon');
const bg = document.querySelector('.weather-card');

const wIcon1 = document.querySelector('.wIcon1');
const wIcon2 = document.querySelector('.wIcon2');
const wIcon3 = document.querySelector('.wIcon3');
const wIcon4 = document.querySelector('.wIcon4');
const wIcon5 = document.querySelector('.wIcon5');

const minTxt1 = document.querySelector('.min-txt1');
const minTxt2 = document.querySelector('.min-txt2');
const minTxt3 = document.querySelector('.min-txt3');
const minTxt4 = document.querySelector('.min-txt4');
const minTxt5 = document.querySelector('.min-txt5');

const maxTxt1 = document.querySelector('.max-txt1');
const maxTxt2 = document.querySelector('.max-txt2');
const maxTxt3 = document.querySelector('.max-txt3');
const maxTxt4 = document.querySelector('.max-txt4');
const maxTxt5 = document.querySelector('.max-txt5');

const day1 = document.querySelector('.day1');
const day2 = document.querySelector('.day2');
const day3 = document.querySelector('.day3');
const day4 = document.querySelector('.day4');
const day5 = document.querySelector('.day5');

const curDate = document.querySelector('.cur-date');



const updateUi = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    cityName.textContent = cityDets.EnglishName; //update city name

    temptxt.textContent = weather[0].Temperature.Metric.Value; //update temperature value

    weatherType.textContent = weather[0].WeatherText; //changed weather text

    weatherIcon.src = `image/${weather[0].WeatherIcon}.png`; // changed weather icon

    bg.style.backgroundimage = `url(bg/${weather[0].WeatherIcon}.jpg)`;

    wIcon1.src = `image/${weather[1].DailyForecasts[0].Day.Icon}.png`;
    wIcon2.src = `image/${weather[1].DailyForecasts[1].Day.Icon}.png`;
    wIcon3.src = `image/${weather[1].DailyForecasts[2].Day.Icon}.png`;
    wIcon4.src = `image/${weather[1].DailyForecasts[3].Day.Icon}.png`;
    wIcon5.src = `image/${weather[1].DailyForecasts[4].Day.Icon}.png`;

    minTxt1.textContent = Math.round((weather[1].DailyForecasts[0].Temperature.Minimum.Value - 32) / (1.8));
    minTxt2.textContent = Math.round((weather[1].DailyForecasts[1].Temperature.Minimum.Value - 32) / (1.8));
    minTxt3.textContent = Math.round((weather[1].DailyForecasts[2].Temperature.Minimum.Value - 32) / (1.8));
    minTxt4.textContent = Math.round((weather[1].DailyForecasts[3].Temperature.Minimum.Value - 32) / (1.8));
    minTxt5.textContent = Math.round((weather[1].DailyForecasts[4].Temperature.Minimum.Value - 32) / (1.8));

    maxTxt1.textContent = Math.round((weather[1].DailyForecasts[0].Temperature.Maximum.Value - 32) / (1.8));
    maxTxt2.textContent = Math.round((weather[1].DailyForecasts[1].Temperature.Maximum.Value - 32) / (1.8));
    maxTxt3.textContent = Math.round((weather[1].DailyForecasts[2].Temperature.Maximum.Value - 32) / (1.8));
    maxTxt4.textContent = Math.round((weather[1].DailyForecasts[3].Temperature.Maximum.Value - 32) / (1.8));
    maxTxt5.textContent = Math.round((weather[1].DailyForecasts[4].Temperature.Maximum.Value - 32) / (1.8));


    const getDayName = (dayNumber) => {

        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
        return dayName[dayNumber];
    }

    const tarikh = new Date();

    const day = tarikh.getDay();

    const date = tarikh.getDate();
    const month = tarikh.getMonth();
    const year = tarikh.getFullYear();
    curDate.textContent = `${date}/${month}/${year}`;

    day1.textContent = `${getDayName((day)%7)}`;
    day2.textContent = `${getDayName((day+1)%7)}`;
    day3.textContent = `${getDayName((day+2)%7)}`;
    day4.textContent = `${getDayName((day+3)%7)}`;
    day5.textContent = `${getDayName((day+4)%7)}`;




}
const updateCity = async (city) => {

    const cityDets = await getcity(city);
    const weather = await getweather(cityDets.Key)

    return {
        cityDets,
        weather
    };
}

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));


})