<template>
  <div class="container">
    <div class="row flex-column align-items-center py-5 mt-3 text-center">
      <div class="col-sm-6 py-5">
        <button class="bg-white btn speechButton" @click.prevent="startConversion">
          <icon-mic v-if="!recording && !spinner"/>
          <b-spinner v-if="spinner && !recording" style="width: 25px; height: 25px"></b-spinner>
          <icon-dots-animation v-if="!spinner && recording"/>
        </button>
        <p class="d-inline-block ml-3 speechText" v-if="runtimeTranscription_ == '' && !recording">Click the mic to start speaking</p>
        <p class="d-inline-block ml-3 speechText" v-else>{{runtimeTranscription_}}</p>
        

        <weather-card-current :currentTemp="currentTemp" v-if="Object.keys(currentTemp).length > 0"/>

        <weather-card-tomorrow :tomorrowTemp="tomorrowTemp" v-if="Object.keys(tomorrowTemp).length > 0"/>
        
        <div v-if="error != ''" class="mt-3">
          <b-alert show variant="danger" class="mb-0">
            {{error}}
          </b-alert>
          <br>
          <div class="text-left">
            <p>
              Supported queries are: 
            </p>
            <ul class="pl-3">
              <li v-for="(query, index) in supportedQueries" :key="index">
                {{query}}
              </li>
            </ul>
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
       apiKey: '691a30a883842fd2dba81c53ee9bab05',
       runtimeTranscription_: "",
       transcription_: [],
       recording: false,
       error: '',
       spinner: false,
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
       currentTemp: {},
       tomorrowTemp: {},
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
      this.recording = false
      this.spinner = true
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
        this.spinner = false
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
        this.spinner = false

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
            utterThis.voice = this.voices[1]
            this.speechSynth.speak(utterThis)
        }
        document.querySelector('.speechButton').blur()
        document.querySelector('.speechButton').classList.remove('recording')
        recognition.stop()
      })
      recognition.start()
    },
    async geolocation() {
      this.error = ''
      this.tomorrowTemp = {}
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        this.$axios.get('/onecall?&exclude=hourly,minutely&units=metric&APPID=' + this.apiKey + '&lat=' + this.lat + '&lon=' + this.lng)
          .then((response) => {
            this.currentTemp = response.data
            // initialize speech output
            var utterThis = new SpeechSynthesisUtterance("It's" + this.currentTemp.current.temp + '°C now.')
            // set language as English US
            utterThis.voice = this.voices[1]
            this.speechSynth.speak(utterThis)
          }).catch((err) => {
            console.log(err)
          })
        })
    },
    nextDay() {
      this.error = ''
      this.currentTemp = {}
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        //  console.log(this.lat)
        this.$axios.get('/onecall?&exclude=hourly,minutely&units=metric&APPID=' + this.apiKey + '&lat=' + this.lat + '&lon=' + this.lng)
          .then((response) => {
            this.tomorrowTemp = response.data
             // initialize speech output
            var utterThis = new SpeechSynthesisUtterance("It can reach up to" + this.tomorrowTemp.daily[1].temp.max + '°C tomorrow.')
            // set language as English US
            utterThis.voice = this.voices[1]
            this.speechSynth.speak(utterThis)
          }).catch((err) => {
            console.log(err)
          })
        })
    }

   }
  }
  </script>