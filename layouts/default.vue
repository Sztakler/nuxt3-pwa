<template>
    <main>
        <Navigation />
        <section>
            <slot></slot>
        </section>
    </main>
</template>

<script setup>
definePageMeta({
    // head: {
    //     link: [{ rel: "manifest", href: "/Lampa/manifest.webmanifest" }],
    // },
});
</script>

<style scoped>
* {
    box-sizing: border-box;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    padding: 16px;
    background-color: var(--light-gray);
}

section {
    color: var(--black);
    background-color: var(--white);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    padding: 16px;
    width: 390px;
    height: 90vh;
}

@media screen and (max-width: 480px) {
    section {
        width: 100%;
    }
}
</style>
