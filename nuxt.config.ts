// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["@/assets/css/main.css"],
    modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
    app: {
        baseURL: "/nuxt3-pwa/",
    },
    pwa: {
        manifest: {
            name: "Czy jest dzisiaj lampa?",
            short_name: "Lampa",
            description: "Weather App",
            icons: [
                {
                    src: "icons/icon-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "icons/icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
            screenshots: [
                {
                    src: "screenshots/desktop.png",
                    sizes: "1019x911",
                    type: "image/png",
                    form_factor: "wide",
                    label: "Desktop application",
                },
                {
                    src: "screenshots/mobile.png",
                    sizes: "382x810",
                    type: "image/png",
                    form_factor: "narrow",
                    label: "Mobile application",
                },
            ],
        },
        workbox: {
            navigateFallback: "/nuxt3-pwa/",
        },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },
    // runtimeConfig: {
    //     public: {
    //         baseURL: "/",
    //     },
    // },
});
