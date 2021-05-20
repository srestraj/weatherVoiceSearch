# Weather App with Voice Search

## Demo

Live demo: [weather-voice-search.vercel.app](https://weather-voice-search.vercel.app/)

### Overview

This is just a personal project. You can determine the current or tomorrow's weather with voice search. The app uses the Weather API from [OpenWeather](https://openweathermap.org/api) for weather forecast.

For Speech Recognition, the app uses [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). In addition, to get the accurate weather data, it also uses [Geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
