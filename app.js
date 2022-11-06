const key = 'M8uPYhVGnA2l1ImeGcqrf5syY8UjgSaI';

//get weather information
const getweather = async (id) => {

    const base1 = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query1 = `${id}?apikey=${key}`;


    const response1 = await fetch(base1 + query1);
    const data1 = await response1.json();

    const base2 = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query2 = `${id}?apikey=${key}`;

    const response2 = await fetch(base2 + query2);
    const data2 = await response2.json();

    return [data1[0], data2];
};

//get city information

const getcity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

let value = [];

getcity('ferozepur').then(data => {
        return getweather(data.Key);
    }).then(data => {
        for (let i = 0; i <= 1; i++) {
            value.push(data[i]);
        }
    })
    .catch(err => console.log(err));
