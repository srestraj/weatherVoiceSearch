<template>
  <div class="card mt-3">
    <div class="card-body py-5">
      <img :src="'https://openweathermap.org/img/wn/' + tomorrowTemp.daily[1].weather[0].icon + '@2x.png'" :alt="tomorrowTemp.daily[1].weather[0].main" class="img-fluid">
      <h2 class="card-text">
        {{tomorrowTemp.daily[1].temp.max}}°C | {{tomorrowTemp.daily[1].weather[0].main}}
      </h2>
      <p class="font-italic mb-0 card-text">
        {{ tomorrowTemp.daily[1].dt | moment("dddd, MMMM Do YYYY") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tomorrowTemp']

}
</script>

<style>

</style>