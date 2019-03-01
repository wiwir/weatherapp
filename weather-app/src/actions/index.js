import transformForecast from "./../services/transformForecast";
import getUrlWeatherByCity from "./../services/getUrlWeatherByCity";
import transformWeather from "./../services/transformWeather";

export const SET_CITY = "SET_CITY";
export const SET_FORECAST_DATA = "SET_FORECAST_DATA";
export const SET_WEATHER_CITY = "SET_WEATHER";
export const GET_WEATHER_CITY = "GET_WEATHER";

const setCity = payload => ({ type: SET_CITY, payload }); //action creator qomo valor city, type es lo que describe el proposito de la accion
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload }); //action creator que toma como valor forecast
const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload });
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload });

export const api_key = "a43c322ec70349d3886a22ab1081dd81";
export const url_base_weather =
  "http://api.openweathermap.org/data/2.5/forecast";

export const setSelectedCity = payload => {
  return (dispatch, getState) => {
    const url_forecast = `${url_base_weather}?q=${payload}&appid=${api_key}`;

    // activar en el estado un indicador de busqueda de datos
    dispatch(setCity(payload));
    console.log(setCity(payload));

    const state = getState();
    const date =
      state.cities[payload] && state.cities[payload].forecastDataDate;

    const now = new Date();

    if (date && now - date < 1 * 60 * 1000) {
      return;
    }

    return fetch(url_forecast)
      .then(data => data.json())
      .then(weather_data => {
        const forecastData = transformForecast(weather_data);
        console.log(forecastData, "data");

        // modificar el estado con el resultado de la promise (fetch)
        dispatch(setForecastData({ city: payload, forecastData }));
      });
  };
};
export const setWeather = payload => {
  return dispatch => {
    payload.forEach(city => {
      console.log(payload, "payload");
      dispatch(getWeatherCity(city));

      const api_weather = getUrlWeatherByCity(city);
      fetch(api_weather)
        .then(data => {
          return data.json();
        })
        .then(weather_data => {
          const weather = transformWeather(weather_data);

          dispatch(setWeatherCity({ city, weather }));
        });
    });
  };
};

/*const actionNormal = payload => ({type: 'myAction', payload})

const actionDelay = payload => {
  return dispatch => {
    dispatch (`inicio ${payload}`)
    window.setTimeout (()=>dispatch(`termino ${payload}`),1000)
  }
}

const myDispatch = texto => {
  console.log(texto)
}

//mientras tanto en el middlware..
//return ({dispatch,getstate}) => next => action => 
const payload = 'fetching '
const action = actionNormal(payload)

if(typeof action === 'function'){
  console.log('action delay');
  action(myDispatch)
}else{
  console.log('action normal')
  console.log(action)
}
*/
