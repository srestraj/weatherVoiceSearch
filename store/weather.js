import axios from 'axios'
export const state = () => ({
    temperature: {},
    tomorrowTemp: {}
})

export const mutations = {  
    storeTemp(state, data) {
        state.temperature = data
    },
    storeTomorrowTemp(state, data) {
        state.tomorrowTemp = data
    }
}

export const actions = {
    async getWeather({commit}, { weatherAPI, apiKey, lat, lng, voices }) {
        let speechSynth = window.speechSynthesis
        axios.get(`https://api.openweathermap.org/data/2.5${weatherAPI}${apiKey}&lat=${lat}&lon=${lng}`)
          .then((response) => {
            commit('storeTemp', response.data)
            var utterThis = new SpeechSynthesisUtterance("It's" + response.data.current.temp + '°Celsius now.')
            // set language as English US
            utterThis.voice = voices[2]
            speechSynth.speak(utterThis)
            // console.log(utterThis)
          }).catch((err) => {
            console.log(err)
          })
    },
    async getTomorrowWeather({commit}, { weatherAPI, apiKey, lat, lng, voices }) {
        let speechSynth = window.speechSynthesis
        axios.get(`https://api.openweathermap.org/data/2.5${weatherAPI}${apiKey}&lat=${lat}&lon=${lng}`)
          .then((response) => {
            commit('storeTomorrowTemp', response.data)
            var utterThis = new SpeechSynthesisUtterance("It can reach up to" + response.data.daily[1].temp.max + '°Celsius tomorrow.')
            // set language as English US
            utterThis.voice = voices[2]
            speechSynth.speak(utterThis)
            // console.log(utterThis)
          }).catch((err) => {
            console.log(err)
          })
    },
}
  