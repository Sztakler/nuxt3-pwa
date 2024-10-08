<template>
    <button>
        <h6
            :style="{
                fontWeight: fontWeight,
                textDecoration: active ? 'underline' : '',
            }"
        >
            <slot></slot>
        </h6>
    </button>
</template>

<script setup>
const { fontWeight, active } = defineProps(["font-weight", "active"]);
</script>

<style scoped>
button {
    all: unset;
    cursor: pointer;
    white-space: nowrap;
}

button:hover {
    color: var(--black-75);
}
</style>
