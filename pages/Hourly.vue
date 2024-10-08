<template>
    <article>
        <header>
            <ArrowButton :reversed="true">
                <NuxtLink to="/">Back</NuxtLink>
            </ArrowButton>
        </header>

        <div v-if="weatherData">
            <nav id="options">
                <TextButton
                    @click="updateSelectedOption('precipitationProbability')"
                    :active="selectedOption === 'precipitationProbability'"
                    :font-weight="400"
                    >Precipitation probability</TextButton
                >
                <TextButton
                    @click="updateSelectedOption('precipitationRate')"
                    :active="selectedOption === 'precipitationRate'"
                    :font-weight="400"
                    >Precipitation rate</TextButton
                >
                <TextButton
                    @click="updateSelectedOption('temperature')"
                    :active="selectedOption === 'temperature'"
                    :font-weight="400"
                    >Temperature</TextButton
                >
                <TextButton
                    @click="updateSelectedOption('wind')"
                    :active="selectedOption === 'wind'"
                    :font-weight="400"
                    >Wind</TextButton
                >
                <TextButton
                    @click="updateSelectedOption('uv')"
                    :active="selectedOption === 'uv'"
                    :font-weight="400"
                    >UV</TextButton
                >
                <TextButton
                    @click="updateSelectedOption('airQuality')"
                    :active="selectedOption === 'airQuality'"
                    :font-weight="400"
                    >Air quality</TextButton
                >
            </nav>

            <ul>
                <li v-for="i in 24">
                    <HourWeather
                        :time="i"
                        :option="selectedOption"
                        :key="i"
                    ></HourWeather>
                </li>
            </ul>
        </div>
        <div v-else>Loading...</div>
    </article>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

function calculateProgressbarLength() {
    return Math.random() * 200 + "px";
}

const selectedOption = ref("temperature");

function updateSelectedOption(newOption) {
    selectedOption.value = newOption;
    console.log("update", selectedOption.value);
}

onMounted(() => {
    const navElement = document.querySelector("#options");
    navElement.addEventListener("wheel", (event) => {
        event.preventDefault();
        console.log("nav");
        navElement.scrollLeft += event.deltaY;
    });
});
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
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

ul::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

li {
    all: unset;
}

li > img {
    height: 32px;
}

nav {
    display: flex;
    gap: 24px;
    padding: 8px;
    overflow-x: scroll; /* Wymuszone przewijanie w poziomie */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

nav::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}
</style>
