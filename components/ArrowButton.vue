<template>
    <button>
        <h4>
            <slot></slot>
            <img
                src="@/assets/svg/arrow_forward.svg"
                alt="Arrow forward"
                :style="rotationStyle"
            />
        </h4>
    </button>
</template>

<script lang="ts" setup>
let { reversed } = defineProps(["reversed"]);

const rotationStyle = computed(() => ({
    transform: reversed ? "rotate(180deg)" : "rotate(0deg)",
}));
</script>

<style scoped>
button {
    all: unset;
}

button:hover {
    color: var(--black-75);
}

h4 {
    display: flex;
    gap: 4px;
}

img {
    height: 16px;
    width: auto;
}

button {
    cursor: pointer;
}
</style>
