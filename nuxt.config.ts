// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["@/assets/css/main.css"],
    modules: ["@pinia/nuxt"],
    app: {
        baseURL: "/nuxt3-pwa/",
    },
    runtimeConfig: {
        public: {
            baseURL: "/nuxt3-pwa/",
        },
    },
});
