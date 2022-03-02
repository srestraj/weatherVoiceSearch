<template>
  <div class="container">
    <div class="row flex-column align-items-center py-5 mt-3 text-center">
      <div class="col-sm-6 py-5">
        <button class="btn speechButton" @click.prevent="startConversion">
          <icon-mic v-if="!recording"/>
          <icon-dots-animation v-if="recording"/>
        </button>
        <p class="d-inline-block mt-3 speechText" v-if="runtimeTranscription_ == '' && !recording">Tap the mic to start speaking</p>
        <p class="d-inline-block mt-3 speechText" v-else>{{ runtimeTranscription_ }}</p>
        

        <weather-card-current :currentTemp="temperature" v-if="Object.keys(temperature).length > 0"/>

        <weather-card-tomorrow :tomorrowTemp="tomorrowTemp" v-if="Object.keys(tomorrowTemp).length > 0" />
        
        <div v-if="error != ''" class="mt-3">
          <b-alert show variant="danger" class="mb-0">
            {{error}}
          </b-alert>
          <br>
          <div class="text-left">
            <p>
              Supported queries are: 
            </p>

            <div class="py-2 pill-container">
              <b-badge class="mr-2" variant="light" pill v-for="(query, index) in supportedQueries" :key="index" @click="detectText(query)">
                <h6 class="font-weight-light pill-text">{{ query }}</h6>
              </b-badge>
            </div>
          </div>
        </div>

      </div>
    </div>     
  </div>
</template>



 <script>
  export default {
   data() {
     return {
       apiKey: process.env.API_KEY,
       weatherAPI: process.env.WEATHER_API,
       runtimeTranscription_: "",
       transcription_: [],
       recording: false,
       error: '',
       speechSynth: [],
       voices: [],
       supportedQueries: [
        "what's the weather like",
        "what is the weather like",
        "current weather",
        "weather right now",
        "how's the weather like",
        "how is the weather like",
        "how's the weather outside",
        "how's the weather",
        "how is the weather",
        "what's it like outside",
        "how's the weather like tomorrow",
        "tomorrow's weather",
        "weather tomorrow",
        "weather today"
       ],
       lang_: "en-EN",
       lat: '',
       lng: '',
     }
   },
   computed: {
     temperature() {
       return this.$store.state.weather.temperature
     },
     tomorrowTemp() {
       return this.$store.state.weather.tomorrowTemp
     }
   },
   mounted() {
     var synth = window.speechSynthesis
    //  store speechSynthesis inside app to use it later
     this.speechSynth = synth
    //  store voices
     this.voices = synth.getVoices()
   },
   methods: {
    startConversion() {
      this.recording = true
      // speechInput initialization
      
      window.SpeechRecognition =
      window.SpeechRecognition || 
      window.webkitSpeechRecognition
      const recognition = new window.SpeechRecognition()
      recognition.lang = this.lang_
      recognition.interimResults = true

      // record word from current speech
      recognition.addEventListener("result", event => {
        this.recording = true
        document.querySelector('.speechButton').classList.add('recording')
        var text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("")
        this.runtimeTranscription_ = text
      })
      // end of transcription
      recognition.addEventListener("end", () => {
        this.transcription_.push(this.runtimeTranscription_)
        this.recording = false

        // I know this is a mess, but this is just for test purpose, lol
        switch(this.runtimeTranscription_) {
          case "what's the weather like":
            this.geolocation()
            break
          case "weather today":
            this.geolocation()
            break
          case "what is the weather like":
            this.geolocation()
            break
          case "weather right now":
            this.geolocation()
            break
          case "current weather":
            this.geolocation()
            break
          case "how's the weather like":
            this.geolocation()
            break
          case "how is the weather like":
            this.geolocation()
            break
          case "how's the weather outside":
            this.geolocation()
            break
          case "how's the weather":
            this.geolocation()
            break
          case "how is the weather":
            this.geolocation()
            break
          case "what's it like outside":
            this.geolocation()
            break
          case "how's the weather like tomorrow":
            this.nextDay()
            break
          case "how is the weather tomorrow":
            this.nextDay()
            break
          case "tomorrow's weather"  :
            this.nextDay()
            break
          case "weather tomorrow":
            this.nextDay()
            break
          default:
            this.error = 'Speech match not found.'
            var utterThis = new SpeechSynthesisUtterance("Speech match not found. Following are the supported queries.")
            // set language as English US
            utterThis.voice = this.voices[2]
            this.speechSynth.speak(utterThis)
        }
        document.querySelector('.speechButton').blur()
        document.querySelector('.speechButton').classList.remove('recording')
        recognition.stop()
      })
      recognition.start()
    },

    // current weather
    async geolocation() {
      this.error = ''
      this.$store.commit('weather/storeTomorrowTemp', {})
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        this.$store.dispatch('weather/getWeather', { lat: this.lat, lng: this.lng, weatherAPI: this.weatherAPI, apiKey: this.apiKey, voices: this.voices, speechSynth: this.speechSynth })
      })
    },

    // get tomorrow's weather
    nextDay() {
      this.error = ''
      this.$store.commit('weather/storeTemp', {})
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        this.$store.dispatch('weather/getTomorrowWeather', { lat: this.lat, lng: this.lng, weatherAPI: this.weatherAPI, apiKey: this.apiKey, voices: this.voices, speechSynth: this.speechSynth })
      })
    },

    // detect text on pill click
    detectText(query) {
      this.recording = true
      this.runtimeTranscription_ = query
      switch(query) {
          case "what's the weather like":
            this.geolocation()
            break
          case "weather today":
            this.geolocation()
            break
          case "what is the weather like":
            this.geolocation()
            break
          case "weather right now":
            this.geolocation()
            break
          case "current weather":
            this.geolocation()
            break
          case "how's the weather like":
            this.geolocation()
            break
          case "how is the weather like":
            this.geolocation()
            break
          case "how's the weather outside":
            this.geolocation()
            break
          case "how's the weather":
            this.geolocation()
            break
          case "how is the weather":
            this.geolocation()
            break
          case "what's it like outside":
            this.geolocation()
            break
          case "how's the weather like tomorrow":
            this.nextDay()
            break
          case "how is the weather tomorrow":
            this.nextDay()
            break
          case "tomorrow's weather"  :
            this.nextDay()
            break
          case "weather tomorrow":
            this.nextDay()
            break
          default:
            this.error = 'Speech match not found.'
            var utterThis = new SpeechSynthesisUtterance("Speech match not found. Following are the supported queries.")
            // set language as English US
            utterThis.voice = this.voices[2]
            this.speechSynth.speak(utterThis)
        }
        this.recording = false
    }

   }
  }
  </script>