// eslint-disable-next-line no-undef
const { defineConfig } = require("cypress")

// eslint-disable-next-line no-undef
module.exports = defineConfig({
    e2e: {
        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
        baseUrl: "http://localhost:4173",
    },
    component: {
        specPattern: "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
        devServer: {
            framework: "vue",
            bundler: "vite",
        },
    },
})
