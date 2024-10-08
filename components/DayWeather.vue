<template>
    <div class="container">
        <div class="left">
            <h4>{{ calculateDateString(index) }}</h4>
            <h6>
                {{ weatherStore.getWeatherDescription(index - 1, "daily") }}
            </h6>
        </div>
        <div class="right">
            <img
                class="monochromatic"
                :src="weatherStore.getIconPath(index - 1, 'daily')"
                :alt="weatherStore.getWeatherDescription(index - 1, 'daily')"
            />
            <h3>
                {{
                    Math.round(weatherData.daily.temperature2mMax[index - 1])
                }}°C
            </h3>
        </div>
    </div>
</template>

<script setup>
const { index } = defineProps(["index"]);

function calculateDateString(index) {
    if (index === 1) return "Today";

    let date = new Date();
    date.setDate(date.getDate() + index - 1);
    let dateString = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return dateString;
}

import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);
</script>

<style scoped>
img {
    height: 64px;
    width: auto;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.right {
    display: flex;
    gap: 8px;
    align-items: center;
}
</style>
