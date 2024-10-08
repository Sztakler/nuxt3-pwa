<template>
    <nav>
        <h5><input v-model.lazy="cityName" placeholder="Enter city name" /></h5>
    </nav>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const weatherStore = useWeatherStore();
const { cityName } = storeToRefs(weatherStore);
const { updateWeatherData } = weatherStore;

useFetch(async () => {
    await weatherStore.updateWeatherData();
});

watch(cityName, async (newValue) => {
    await weatherStore.updateWeatherData();
});
</script>

<style scoped>
nav {
    height: 32px;
    width: 390px;
    padding: 16px;
    border-radius: 16px;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    all: unset;
}
</style>
