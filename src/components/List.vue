<template>
  <v-container fluid class="px-0">
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center" style="margin-top: 15vh">
        <v-progress-circular
          indeterminate
          :size="70"
          class="amber--text">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!loading">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-list two-line>
          <h4 v-if="!places.length" class="text-xs-center">Список пуст</h4>
          <v-list-tile v-for="place in places"
            :key="place.id"
            tag="div"
            :ripple="false">
            <v-list-tile-action>
              <v-checkbox
                v-model="place.visited"
                @change="onChange($event, place.id)"
                color="accent">
              </v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="{visited: place.visited}">
                {{ place.title }}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ place.location }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="pr-1">
              <v-btn light class="mini" @click.native.stop="onGo(place)">
                <v-icon class="hidden-sm-and-up">pin_drop</v-icon>
                <div class="hidden-xs-only">
                  На карте
                </div>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action class="pl-2 pr-4">
              <v-btn light class="mini" @click.native.stop="onDelete(place.id)">
                <v-icon class="hidden-sm-and-up">highlight_off</v-icon>
                <div class="hidden-xs-only">
                  Удалить
                </div>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      places() {
        return this.$store.getters.allPlaces;
      },
      loading() {
        return this.$store.getters.loading;
      },
    },
    methods: {
      onDelete(placeId) {
        this.$store.dispatch('deletePlace', placeId);
      },
      onChange(isVisited, placeId) {
        this.$store.dispatch('setVisited', { isVisited, placeId });
      },
      onGo(place) {
        this.$store.commit('setCenter', place);
        this.$router.push('/');
      },
    },
  };
</script>
