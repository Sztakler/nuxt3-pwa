// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["@/assets/css/main.css"],
    modules: ["@pinia/nuxt"],
    app: {
        baseURL: "/nuxt3-pwa/",
    },
    // runtimeConfig: {
    //     public: {
    //         baseURL: "/",
    //     },
    // },
});

/*

Recently I was trying to host my weather app on Github Pages. The app is developed in Nuxt.js and I'm using bun.js for generating static files. When I set baseURL to "/" and generate static files to `.output/public`, then serving the app with `npx serve .output/public` works like a charm. However when I deploy it to ghpages with baseURL changed to `/nuxt3-pwa/` no scripts are working. Ghpages link: [https://sztakler.github.io/nuxt3-pwa/](https://stackoverflow.com).

My build pipeline is as follows:

1. bun run generate (translates to "nuxt generate")
2. bun run deploy (translates to "push-dir --dir=./.output/public --branch=gh-pages --cleanup")

App is successfully deployed to github pages but it look like this:[enter image description here](https://i.sstatic.net/M6RLfWep.png)
instead of this [enter image description here](https://i.sstatic.net/TzHliCJj.png)

Basically pages load css and html just fine but it cannot see generated javascript files, so no script are working correctly.

Initially I thought this is a problem with URLs but I think I've set it correctly:

```
export default defineNuxtConfig({
   compatibilityDate: "2024-04-03",
   devtools: { enabled: true },
   css: ["@/assets/css/main.css"],
   modules: ["@pinia/nuxt"],
   app: {
       baseURL: "/nuxt3-pwa/",
   },
   // runtimeConfig: {
   //     public: {
   //         baseURL: "/",
   //     },
   // },
});
```
When I inspect the app with devtools I see lots of 404 errors -- pages cannot find script files.
[enter image description here](https://i.sstatic.net/CHBbEnrk.png)
[enter image description here](https://i.sstatic.net/GsV9OsVQ.png)

I went straight to Chat GPT and asked it for answers but it's suggestion was invalid baseURL or that files were not generated at all. I've also read through few stackoverflow questions but with similar results. I've checked it and in fact all files are in here: https://github.com/Sztakler/nuxt3-pwa/tree/gh-pages/_nuxt. However, when I try to access it manually, it on address https://sztakler.github.io/nuxt3-pwa/_nuxt/C6ViZ6fq.js, it won't load. I'm greeted with 404 errors instead.

Next I tried to use Firefox's devtools and it pointed out that `Loading module from “https://sztakler.github.io/nuxt3-pwa/_nuxt/C6ViZ6fq.js” was blocked because of a disallowed MIME type (“text/html”).` It doesn't make any sense to me. It's being loaded with
`<link rel="modulepreload" as="script" crossorigin="" href="/nuxt3-pwa/_nuxt/C6ViZ6fq.js">` so why does it comes with 'text/html' type, and with 0B size above all else?

Does anyone know why it happens? What did I do wrong? I'm struggling with this problem for two weeks and cannot find any solution.
*/
