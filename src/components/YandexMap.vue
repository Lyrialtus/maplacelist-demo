<template>
  <v-container fluid class="pa-0">
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center" style="margin-top: 15vh">
        <v-progress-circular
          indeterminate
          :size="70"
          class="amber--text">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <yandex-map v-if="!loading"
      :coords="center"
      :zoom="center === defaultCenter ? 10 : 14"
      :style="{height: height, width: width}"
      map-type="map">
      <ymap-marker v-for="place in places" :key="place.id"
        marker-type="placemark"
        :coords="[place.coords[0], place.coords[1]]"
        :balloon="{header: place.title, body: place.location}"
        :icon="{color: place.visited ? 'orange' : 'grey', glyph: 'dot'}">
      </ymap-marker>
    </yandex-map>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        height: '0px',
        width: '0px',
      };
    },
    mounted() {
      this.height = `${this.$el.clientHeight}px`;
      this.width = `${this.$el.clientWidth}px`;
    },
    computed: {
      places() {
        return this.$store.getters.allPlaces;
      },
      loading() {
        return this.$store.getters.loading;
      },
      center() {
        return this.$store.getters.center;
      },
      defaultCenter() {
        return this.$store.getters.defaultCenter;
      },
    },
  };
</script>
