<template>
    <article>
        <header>
            <ArrowButton :reversed="true">
                <NuxtLink to="/">Back</NuxtLink>
            </ArrowButton>
        </header>
        <div v-if="weatherData">
            <div class="container">
                <div class="weather">
                    <div class="details">
                        <h4>Current weather</h4>
                        <ul>
                            <li>
                                <h6>
                                    Temperature:
                                    {{
                                        Math.round(
                                            weatherData.current.temperature2m,
                                        )
                                    }}
                                    °C
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Feels like:
                                    {{
                                        Math.round(
                                            weatherData.current
                                                .apparentTemperature,
                                        )
                                    }}
                                    °C
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Humidity:
                                    {{
                                        Math.round(
                                            weatherData.current
                                                .relativeHumidity2m,
                                        )
                                    }}
                                    %
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Pressure:
                                    {{
                                        Math.round(
                                            weatherData.current.surfacePressure,
                                        )
                                    }}
                                    hPa
                                </h6>
                            </li>
                        </ul>
                    </div>
                    <img
                        class="monochromatic"
                        :src="weatherStore.getIconPath(0, 'current')"
                        :alt="weatherStore.getWeatherDescription(0, 'current')"
                    />
                </div>

                <div class="weather">
                    <div class="details">
                        <h4>Precipitation</h4>
                        <ul>
                            <li>
                                <h6>
                                    Probability:
                                    {{
                                        Math.round(
                                            weatherData.daily
                                                .precipitationProbabilityMax[0],
                                        )
                                    }}
                                    %
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Rate:
                                    {{
                                        Math.round(
                                            weatherData.current.precipitation,
                                        )
                                    }}
                                    mm/h ({{
                                        getPrecipitationDescription(
                                            weatherData.current.precipitation,
                                        )
                                    }})
                                </h6>
                            </li>
                        </ul>
                    </div>
                    <img
                        class="monochromatic"
                        src="/weather-icons/raindrop.svg"
                        alt="Raindrop icon"
                    />
                </div>

                <div class="weather">
                    <div class="details">
                        <h4>Wind</h4>
                        <ul>
                            <li>
                                <h6>
                                    Speed:
                                    {{
                                        Math.round(
                                            weatherData.current.windSpeed10m,
                                        )
                                    }}
                                    km/h ({{
                                        getWindDescription(
                                            weatherData.current.windSpeed10m,
                                        )
                                    }})
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Gust:
                                    {{
                                        Math.round(
                                            weatherData.current.windGusts10m,
                                        )
                                    }}
                                    km/h ({{
                                        getWindDescription(
                                            weatherData.current.windGusts10m,
                                        )
                                    }})
                                </h6>
                            </li>
                            <li>
                                <h6>
                                    Direction:
                                    {{
                                        getWindDirection(
                                            weatherData.current
                                                .windDirection10m,
                                        )
                                    }}
                                </h6>
                            </li>
                        </ul>
                    </div>
                    <img
                        class="monochromatic"
                        src="/weather-icons/wind.svg"
                        alt="Wind icon"
                    />
                </div>

                <div class="weather">
                    <div class="details">
                        <h4>Sunset and Sunrise</h4>
                        <div class="horizontal-list">
                            <div class="captioned-icon">
                                <img
                                    class="monochromatic"
                                    src="/weather-icons/sunrise.svg"
                                    alt="Wind icon"
                                />
                                <h6>{{ weatherData.daily.sunrise[0] }}</h6>
                            </div>
                            <div class="captioned-icon">
                                <img
                                    class="monochromatic"
                                    src="/weather-icons/sunset.svg"
                                    alt="Wind icon"
                                />
                                <h6>{{ weatherData.daily.sunset[0] }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>Loading...</div>
    </article>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

/**
 * Returns precipitation description based on https://en.wikipedia.org/wiki/Precipitation_types and https://www.baranidesign.com/faq-articles/2020/1/19/rain-rate-intensity-classification rain rate intensity classification.
 *
 * @param {rainRate} rate of rain in mm/h.
 */
function getPrecipitationDescription(rainRate) {
    if (weatherData.value.current.snowfall > 0) {
        return "Snowfall";
    }

    switch (true) {
        case rainRate < 0.1:
            return "No rain";
        case rainRate < 2.5:
            return "Light rain";
        case rainRate < 7.5:
            return "Moderate rain";
        case rainRate < 50:
            return "Heavy rain";
        default:
            return "Violent rain";
    }
}

/**
 * Returns precipitation description based on Beaufort scale https://en.wikipedia.org/wiki/Beaufort_scale
 *
 * @param {windSpeed} Wind speed in km/h.
 */
function getWindDescription(windSpeed) {
    switch (true) {
        case windSpeed < 1:
            return "Calm";
        case windSpeed < 5:
            return "Light air";
        case windSpeed < 11:
            return "Light breeze";
        case windSpeed < 19:
            return "Gentle breeze";
        case windSpeed < 28:
            return "Moderate breeze";
        case windSpeed < 38:
            return "Fresh breeze";
        case windSpeed < 49:
            return "Strong breeze";
        case windSpeed < 61:
            return "Moderate gale";
        case windSpeed < 74:
            return "Gale";
        case windSpeed < 88:
            return "Strong gale";
        case windSpeed < 102:
            return "Storm";
        case windSpeed < 117:
            return "Violent storm";
        default:
            return "Hurricane";
    }
}

/**
 * Returns cardinal wind direction based on wind direction in degrees
 *
 * @param {degree} Wind direction in degrees.
 */
function getWindDirection(degree) {
    switch (true) {
        case degree < 10:
            return "N";
        case degree < 30:
            return "N/NE";
        case degree < 50:
            return "NE";
        case degree < 70:
            return "E/NE";
        case degree < 100:
            return "E";
        case degree < 120:
            return "E/SE";
        case degree < 140:
            return "SE";
        case degree < 160:
            return "S/SE";
        case degree < 190:
            return "S";
        case degree < 210:
            return "S/SW";
        case degree < 230:
            return "SW";
        case degree < 250:
            return "W/SW";
        case degree < 280:
            return "W";
        case degree < 300:
            return "W/NW";
        case degree < 320:
            return "NW";
        case degree < 340:
            return "N/NW";
        default:
            return "N";
    }
}
</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
    width: 100%;
    height: 100%;
}

ul {
    all: unset;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

li {
    all: unset;
}

img {
    height: 92px;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

.weather {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.horizontal-list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    width: 100%;
}

.captioned-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
