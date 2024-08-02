const key = "FJPvwvt6OiNDJFMNqy2E5k8dYqQviaG1";

const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];
};

const getCurrentConditions = async (locationkey ) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${locationkey}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();
    
    return data[0];
};
