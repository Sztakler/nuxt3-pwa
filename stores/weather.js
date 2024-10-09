import { fetchWeatherApi } from "openmeteo";
import { defineStore } from "pinia";

const baseURL = "/nuxt3-pwa";

const params = {
    latitude: null,
    longitude: null,
    current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "surface_pressure",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
    ],
    hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
        "precipitation_probability",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "snow_depth",
        "weather_code",
        "surface_pressure",
        "visibility",
        "wind_speed_10m",
        "uv_index",
        "uv_index_clear_sky",
        "is_day",
        "sunshine_duration",
    ],
    daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "sunrise",
        "sunset",
        "daylight_duration",
        "sunshine_duration",
        "uv_index_max",
        "uv_index_clear_sky_max",
        "precipitation_sum",
        "rain_sum",
        "showers_sum",
        "snowfall_sum",
        "precipitation_hours",
        "precipitation_probability_max",
        "wind_speed_10m_max",
        "wind_gusts_10m_max",
        "wind_direction_10m_dominant",
    ],
    timezone: "auto",
};
const weatherURL = "https://api.open-meteo.com/v1/forecast";
const geocodingURL = "https://nominatim.openstreetmap.org/search";

async function fetchGeocodingData(cityName) {
    try {
        const response = await fetch(
            geocodingURL + `?q=${cityName.value}&format=json&limit=1`,
        );
        if (!response.ok) {
            throw new Error("Geocoding response was not ok");
        }
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                latitude: data[0].lat,
                longitude: data[0].lon,
                name: data[0].name,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

async function fetchSuntimesApi(location, days) {
    try {
        const sunTimes = { sunrise: [], sunset: [] };

        for (let i = 0; i < days; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            console.log(dateString);
            const reponse = await fetch(
                `https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=${location.longitude}&date=${dateString}&tzid=${location.timezone}`,
            );
            if (!reponse.ok) {
                throw new Error("Sunrise-sunset response was not ok");
            }
            const data = await reponse.json();
            sunTimes.sunrise.push(data.results.sunrise);
            sunTimes.sunset.push(data.results.sunset);
        }

        return sunTimes;
    } catch (error) {
        console.error("Error fetching sunrise-sunset data:", error);
    }
}

async function fetchWeatherData(location) {
    try {
        if (location) {
            params.latitude = location.latitude;
            params.longitude = location.longitude;
        }
        // Helper function to form time ranges
        const range = (start, stop, step) =>
            Array.from(
                { length: (stop - start) / step },
                (_, i) => start + i * step,
            );

        const responses = await fetchWeatherApi(weatherURL, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        location.timezone = timezone;
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current();
        const hourly = response.hourly();
        const daily = response.daily();

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            general: {
                cityName: location.name,
                timezone: timezone,
            },
            current: {
                time: new Date(
                    (Number(current.time()) + utcOffsetSeconds) * 1000,
                ),
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                apparentTemperature: current.variables(2).value(),
                isDay: current.variables(3).value(),
                precipitation: current.variables(4).value(),
                rain: current.variables(5).value(),
                showers: current.variables(6).value(),
                snowfall: current.variables(7).value(),
                weatherCode: current.variables(8).value(),
                cloudCover: current.variables(9).value(),
                pressureMsl: current.variables(10).value(),
                surfacePressure: current.variables(11).value(),
                windSpeed10m: current.variables(12).value(),
                windDirection10m: current.variables(13).value(),
                windGusts10m: current.variables(14).value(),
            },
            hourly: {
                time: range(
                    Number(hourly.time()),
                    Number(hourly.timeEnd()),
                    hourly.interval(),
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature2m: hourly.variables(0).valuesArray(),
                relativeHumidity2m: hourly.variables(1).valuesArray(),
                dewPoint2m: hourly.variables(2).valuesArray(),
                apparentTemperature: hourly.variables(3).valuesArray(),
                precipitationProbability: hourly.variables(4).valuesArray(),
                precipitation: hourly.variables(5).valuesArray(),
                rain: hourly.variables(6).valuesArray(),
                showers: hourly.variables(7).valuesArray(),
                snowfall: hourly.variables(8).valuesArray(),
                snowDepth: hourly.variables(9).valuesArray(),
                weatherCode: hourly.variables(10).valuesArray(),
                surfacePressure: hourly.variables(11).valuesArray(),
                visibility: hourly.variables(12).valuesArray(),
                windSpeed10m: hourly.variables(13).valuesArray(),
                uvIndex: hourly.variables(14).valuesArray(),
                uvIndexClearSky: hourly.variables(15).valuesArray(),
                isDay: hourly.variables(16).valuesArray(),
                sunshineDuration: hourly.variables(17).valuesArray(),
            },
            daily: {
                time: range(
                    Number(daily.time()),
                    Number(daily.timeEnd()),
                    daily.interval(),
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                weatherCode: daily.variables(0).valuesArray(),
                temperature2mMax: daily.variables(1).valuesArray(),
                temperature2mMin: daily.variables(2).valuesArray(),
                apparentTemperatureMax: daily.variables(3).valuesArray(),
                apparentTemperatureMin: daily.variables(4).valuesArray(),
                // sunrise: daily.variables(5).valuesArray(),
                // sunset: daily.variables(6).valuesArray(),
                sunrise: [],
                sunset: [],
                daylightDuration: daily.variables(7).valuesArray(),
                sunshineDuration: daily.variables(8).valuesArray(),
                uvIndexMax: daily.variables(9).valuesArray(),
                uvIndexClearSkyMax: daily.variables(10).valuesArray(),
                precipitationSum: daily.variables(11).valuesArray(),
                rainSum: daily.variables(12).valuesArray(),
                showersSum: daily.variables(13).valuesArray(),
                snowfallSum: daily.variables(14).valuesArray(),
                precipitationHours: daily.variables(15).valuesArray(),
                precipitationProbabilityMax: daily.variables(16).valuesArray(),
                windSpeed10mMax: daily.variables(17).valuesArray(),
                windGusts10mMax: daily.variables(18).valuesArray(),
                windDirection10mDominant: daily.variables(19).valuesArray(),
            },
        };

        let days = 2;
        const sunTimes = await fetchSuntimesApi(location, days);
        weatherData.daily.sunrise = sunTimes.sunrise;
        weatherData.daily.sunset = sunTimes.sunset;
        console.log(location);
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

export const useWeatherStore = defineStore("weather", () => {
    const cityName = ref("Wrocław");
    const weatherData = ref(null);
    const weatherIcons = ref({
        0: {
            name: "Clear sky",
            iconDay: "clear-day",
            iconNight: "clear-night",
        },
        1: {
            name: "Mainly clear",
            iconDay: "clear-day",
            iconNight: "clear-night",
        },
        2: {
            name: "Partly cloudy",
            iconDay: "partly-cloudy-day",
            iconNight: "partly-cloudy-night",
        },
        3: {
            name: "Overcast",
            iconDay: "overcast-day",
            iconNight: "overcast-night",
        },
        45: {
            name: "Fog",
            iconDay: "fog-day",
            iconNight: "fog-night",
        },
        48: {
            name: "Depositing rime fog",
            iconDay: "partly-cloudy-day",
            iconNight: "partly-cloudy-night",
        },
        51: {
            name: "Light drizzle",
            iconDay: "partly-cloudy-day-drizzle",
            iconNight: "partly-cloudy-night-drizzle",
        },
        53: {
            name: "Moderate drizzle",
            iconDay: "partly-cloudy-day-drizzle",
            iconNight: "partly-cloudy-night-drizzle",
        },
        55: {
            name: "Dense drizzle",
            iconDay: "partly-cloudy-day-drizzle",
            iconNight: "partly-cloudy-night-drizzle",
        },
        56: {
            name: "Freezing light drizzle",
            iconDay: "partly-cloudy-day-drizzle",
            iconNight: "partly-cloudy-night-drizzle",
        },
        57: {
            name: "Freezing light drizzle",
            iconDay: "partly-cloudy-day-drizzle",
            iconNight: "partly-cloudy-night-drizzle",
        },
        61: {
            name: "Slight rain",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        63: {
            name: "Moderate rain",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        65: {
            name: "Heavy rain",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        66: {
            name: "Freezing light rain",
            iconDay: "partly-cloudy-day-sleet",
            iconNight: "partly-cloudy-night-sleet",
        },
        67: {
            name: "Freezing heavy rain",
            iconDay: "partly-cloudy-day-sleet",
            iconNight: "partly-cloudy-night-sleet",
        },
        71: {
            name: "Light snow fall",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        73: {
            name: "Moderate snow fall",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        75: {
            name: "Heavy snow fall",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        77: {
            name: "Snow grains",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        80: {
            name: "Light showers",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        81: {
            name: "Moderate showers",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        82: {
            name: "Violent showers",
            iconDay: "partly-cloudy-day-rain",
            iconNight: "partly-cloudy-night-rain",
        },
        85: {
            name: "Slight snow showers",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        86: {
            name: "Heavy snow showers",
            iconDay: "partly-cloudy-day-snow",
            iconNight: "partly-cloudy-night-snow",
        },
        95: {
            name: "Thunderstorm",
            iconDay: "thunderstorms-day",
            iconNight: "thunderstorms-night",
        },
        96: {
            name: "Thunderstorm with slight hail",
            iconDay: "thunderstorms-day",
            iconNight: "thunderstorms-night",
        },
        99: {
            name: "Thunderstorm with heavy hail",
            iconDay: "thunderstorms-day",
            iconNight: "thunderstorms-night",
        },
    });
    const location = ref({ latitude: 0, longitude: 0 });
    const sunTimes = ref({ sunrise: [], sunset: [] });

    /**
     * Calculates path to weather icon.
     *
     * @param {number} index - specifies index of measurement
     * @param {string} interval - specifies time interval of weather measurement. Can be "current" (default), "daily" or "hourly".

     * @returns {string} Static path to icon.
     */
    function getIconPath(index = 0, interval = "current") {
        if (!weatherData.value) {
            console.error("weatherData is null");
            return null;
        }

        let data = weatherData.value.current;

        if (interval === "hourly") {
            data = weatherData.value.hourly;
            const iconName = data.isDay[index]
                ? weatherIcons.value[data.weatherCode[index]].iconDay
                : weatherIcons.value[data.weatherCode[index]].iconNight;

            return `${baseURL}/weather-icons/${iconName}.svg`;
        } else if (interval === "daily") {
            data = weatherData.value.daily;
            const iconName =
                weatherIcons.value[data.weatherCode[index]].iconDay;

            return `${baseURL}/weather-icons/${iconName}.svg`;
        } else if (interval === "current") {
            data = weatherData.value.current;
            const iconName = weatherData.value.current.isDay
                ? weatherIcons.value[data.weatherCode].iconDay
                : weatherIcons.value[data.weatherCode].iconNight;

            return `${baseURL}/weather-icons/${iconName}.svg`;
        }

        const iconName = weatherData.value.current.isDay
            ? weatherIcons.value[data.weatherCode[index]].iconDay
            : weatherIcons.value[data.weatherCode[index]].iconNight;

        return `${baseURL}/weather-icons/${iconName}.svg`;
    }

    /**
     * Returns weather description.
     *
     * @param {number} index - specifies index of measurement
     * @param {string} interval - specifies time interval of weather measurement. Can be "current" (default), "daily" or "hourly".

     * @returns {string} Weather description.
     */
    function getWeatherDescription(index = 0, interval) {
        if (!weatherData.value) {
            console.error("weatherData is null");
            return null;
        }
        if (interval === "hourly") {
            return weatherIcons.value[
                weatherData.value.hourly.weatherCode[index]
            ].name;
        } else if (interval === "daily") {
            return weatherIcons.value[
                weatherData.value.daily.weatherCode[index]
            ].name;
        } else if (interval === "current") {
            return weatherIcons.value[weatherData.value.current.weatherCode]
                .name;
        }
    }

    async function updateWeatherData() {
        console.log("update");
        location.value = await fetchGeocodingData(cityName);
        weatherData.value = await fetchWeatherData(location.value);

        // console.log(weatherData.value);
    }

    return {
        cityName,
        location,
        updateWeatherData,
        getIconPath,
        getWeatherDescription,
        weatherData,
        weatherIcons,
    };
});
