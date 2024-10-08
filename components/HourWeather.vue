<template>
    <div class="container">
        <div class="hour">{{ calculateTimeString(time) }}</div>
        <img
            class="monochromatic"
            :src="weatherStore.getIconPath(index, 'hourly')"
            :alt="weatherStore.getWeatherDescription(index, 'hourly')"
        />
        <div class="progress-bar">
            <div class="bar">
                <div class="circle"></div>
                <div
                    class="line"
                    :style="{ width: calculateProgressbarLength(100) }"
                ></div>
            </div>
            {{ getMeasurementValue(option) }}
        </div>
    </div>
</template>

<script setup>
const { time, option } = defineProps(["time", "option"]);
const index = ref(new Date().getHours() + time - 1);

function getMeasurementValue(option) {
    console.log(option);
    const data = weatherData.value.hourly;
    if (option === "precipitationProbability") {
        return Math.round(data.precipitationProbability[index.value]) + " %";
    } else if (option === "precipitationRate") {
        return Math.round(data.precipitation[index.value]) + " mm/h";
    } else if (option === "temperature") {
        return Math.round(data.temperature2m[index.value]) + " °C";
    } else if (option === "wind") {
        return Math.round(data.windSpeed10m[index.value]) + " km/h";
    } else if (option === "uv") {
        return "UV index " + Math.round(data.uvIndex[index.value]);
    } else if (option === "airQuality") {
        return "n/a";
    }

    return "n/a";
}

function calculateProgressbarLength(value) {
    // let maxLength = 150;
    // let number = value.match(/\d+/g).join("");
    // return (number / 100) * maxLength + "px";
    return "100px";
}

function calculateTimeString(i) {
    let currentTime = new Date().getHours();
    let hour = (currentTime + i - 1) % 24;

    if (hour < 10) hour = "0" + hour;

    return hour + ":00";
}

import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { weatherData, weatherIcons } = storeToRefs(weatherStore);
</script>

<style scoped>
img {
    height: 48px;
    width: auto;
}

.container {
    display: flex;
    align-items: center;
    gap: 16px;
}

.progress-bar {
    display: flex;
    align-items: center;
    gap: 8px;
}

.progress-bar > .bar {
    display: flex;
    align-items: center;
}

.circle {
    height: 10px;
    width: 10px;
    content: "";
    border: 1px solid var(--black);
    border-radius: 999px;
}

.line {
    height: 1px;
    background-color: var(--black);
}
</style>
