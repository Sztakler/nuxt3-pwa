<template>
    <nav>
        <TextButton>
            <NuxtLink to="/">Today</NuxtLink>
        </TextButton>
        <TextButton>
            <NuxtLink to="/tomorrow">Tomorrow</NuxtLink>
        </TextButton>
        <TextButton>
            <NuxtLink to="/weekly">Weekly</NuxtLink>
        </TextButton>
    </nav>
    <div v-if="weatherData" class="weather">
        <header>
            <h2>
                {{ calculateDateString(dayIndex) }},
                {{ weatherData.general.cityName }}
            </h2>
            <div class="weather-icon">
                <img
                    class="monochromatic"
                    :src="
                        weatherStore.getIconPath(
                            dayIndex,
                            dayIndex === 0 ? 'current' : 'daily',
                        )
                    "
                    :alt="
                        weatherStore.getWeatherDescription(
                            dayIndex,
                            dayIndex === 0 ? 'current' : 'daily',
                        )
                    "
                />
                <h2>
                    {{
                        weatherStore.getWeatherDescription(
                            dayIndex,
                            dayIndex === 0 ? "current" : "daily",
                        )
                    }}
                </h2>
            </div>
            <div class="weather-info">
                <div class="temperature">
                    {{
                        dayIndex === 0
                            ? Math.round(weatherData.current.temperature2m)
                            : Math.round(
                                  weatherData.daily.temperature2mMax[dayIndex],
                              )
                    }}°C
                </div>
                <h6>
                    Feels like
                    {{
                        dayIndex === 0
                            ? Math.round(
                                  weatherData.current.apparentTemperature,
                              )
                            : Math.round(
                                  weatherData.daily.apparentTemperatureMax[
                                      dayIndex
                                  ],
                              )
                    }}°C
                </h6>
            </div>
            <ArrowButton>
                <NuxtLink to="/hourly">See hourly forecast</NuxtLink>
            </ArrowButton>
        </header>

        <div class="container">
            <article>
                <div class="next-days">
                    <div class="day-forecast">
                        <h5>
                            {{
                                calculateDateString(dayIndex + 1, {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        </h5>
                        <img
                            class="monochromatic"
                            :src="
                                weatherStore.getIconPath(dayIndex + 1, 'daily')
                            "
                            :alt="
                                weatherStore.getWeatherDescription(
                                    dayIndex + 1,
                                    'daily',
                                )
                            "
                        />
                        <h6>
                            {{
                                Math.round(
                                    weatherData.daily.temperature2mMax[
                                        dayIndex + 1
                                    ],
                                )
                            }}
                            °C
                        </h6>
                    </div>
                    <VerticalDivider />
                    <div class="day-forecast">
                        <h5>
                            {{
                                calculateDateString(dayIndex + 2, {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        </h5>
                        <img
                            class="monochromatic"
                            :src="
                                weatherStore.getIconPath(dayIndex + 2, 'daily')
                            "
                            :alt="
                                weatherStore.getWeatherDescription(
                                    dayIndex + 2,
                                    'daily',
                                )
                            "
                        />
                        <h6>
                            {{
                                Math.round(
                                    weatherData.daily.temperature2mMax[
                                        dayIndex + 2
                                    ],
                                )
                            }}
                            °C
                        </h6>
                    </div>
                    <VerticalDivider />
                    <div class="day-forecast">
                        <h5>
                            {{
                                calculateDateString(dayIndex + 3, {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        </h5>
                        <img
                            class="monochromatic"
                            :src="
                                weatherStore.getIconPath(dayIndex + 3, 'daily')
                            "
                            :alt="
                                weatherStore.getWeatherDescription(
                                    dayIndex + 3,
                                    'daily',
                                )
                            "
                        />
                        <h6>
                            {{
                                Math.round(
                                    weatherData.daily.temperature2mMax[
                                        dayIndex + 3
                                    ],
                                )
                            }}
                            °C
                        </h6>
                    </div>
                </div>
                <ArrowButton>
                    <NuxtLink to="/weekly">Check weather this week</NuxtLink>
                </ArrowButton>
            </article>

            <article>
                <div class="next-days">
                    <div class="day-forecast">
                        <h5>Humidity</h5>
                        <img
                            class="monochromatic"
                            src="/weather-icons/humidity.svg"
                            alt="Humidity icon"
                        />
                        <h6>
                            {{
                                dayIndex === 0
                                    ? weatherData.current.relativeHumidity2m
                                    : weatherData.hourly.relativeHumidity2m[36]
                            }}
                            %
                        </h6>
                    </div>
                    <VerticalDivider />
                    <div class="day-forecast">
                        <h5>Pressure</h5>
                        <img
                            class="monochromatic"
                            src="/weather-icons/barometer.svg"
                            alt="Barometer icon"
                        />
                        <h6>
                            {{
                                dayIndex === 0
                                    ? Math.round(
                                          weatherData.current.surfacePressure,
                                      )
                                    : Math.round(
                                          weatherData.hourly
                                              .surfacePressure[36],
                                      )
                            }}
                            hPa
                        </h6>
                    </div>
                    <VerticalDivider />
                    <div class="day-forecast">
                        <h5>Wind</h5>
                        <img
                            class="monochromatic"
                            src="/weather-icons/wind.svg"
                            alt="Wind icon"
                        />
                        <h6>
                            {{
                                Math.round(
                                    weatherData.daily.windDirection10mDominant[
                                        dayIndex
                                    ],
                                )
                            }}°
                            {{
                                Math.round(
                                    weatherData.daily.windSpeed10mMax[dayIndex],
                                )
                            }}
                            km/h
                        </h6>
                    </div>
                    <VerticalDivider />
                    <div class="day-forecast">
                        <h5>Visibility</h5>
                        <img
                            class="monochromatic"
                            src="/weather-icons/compass.svg"
                            alt="Compass icon"
                        />
                        <h6>
                            {{
                                weatherData.hourly.visibility[
                                    new Date().getHours()
                                ] / 1000
                            }}
                            km
                        </h6>
                    </div>
                </div>
                <ArrowButton>
                    <NuxtLink to="/details">See more details</NuxtLink>
                </ArrowButton>
            </article>
        </div>
    </div>
    <div v-else class="loading">
        <h3 v-if="cityName">Loading...</h3>
        <h3 v-else>No city provided</h3>
    </div>
</template>

<script setup>
const { dayIndex } = defineProps(["dayIndex"]);

import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { cityName, weatherData } = storeToRefs(weatherStore);

function calculateDateString(dayIndex, options) {
    let date = new Date();
    date.setDate(date.getDate() + dayIndex);
    let dateString = date.toLocaleDateString(
        "en-US",
        (options = {
            month: "long",
            day: "numeric",
        }),
    );

    return dateString;
}
</script>

<style scoped>
nav {
    display: flex;
    gap: 24px;
    width: 100%;
    height: content-fit;
    justify-content: center;
}

article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
}

header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

h2 {
    display: flex;
    width: auto;
    align-items: center;
    justify-content: center;
}

.weather {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    gap: 24px;
}

.temperature {
    font-size: 96px;
    line-height: 100%;
    font-weight: 700;
}

.weather-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
}

.weather-icon > img {
    height: 256px;
    width: auto;
    margin: -32px;
}

.day-forecast > img {
    height: 48px;
    width: auto;
}

.weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.next-days {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
}

.day-forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
}

.container::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}

.loading {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
