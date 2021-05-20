<template>
  <div class="card mt-3">
    <div class="card-body py-5">
      <img :src="'https://openweathermap.org/img/wn/' + currentTemp.current.weather[0].icon + '@2x.png'" :alt="currentTemp.current.weather[0].main" class="img-fluid">
      <h2 class="card-text">
        {{currentTemp.current.temp}}°C | {{currentTemp.current.weather[0].main}}
      </h2>
      <p class="font-italic mb-0 card-text">
        {{ currentTemp.current.dt | moment("dddd, MMMM Do YYYY") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentTemp'],

}
</script>

<style>

</style>