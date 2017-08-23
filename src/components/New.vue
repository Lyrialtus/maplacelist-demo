<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Добавление нового места</h4>
        <v-alert warning dismissible v-model="alert">
          Что-то пошло не так!
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddPlace">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Название"
                v-model="title"
                id="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Адрес"
                v-model="location"
                id="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn light primary type="submit">
                Добавить
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        location: '',
        coords: [],
        alert: false,
      };
    },
    methods: {
      onAddPlace() {
        const base = 'https://geocode-maps.yandex.ru/1.x/';
        fetch(`${base}?format=json&geocode=${this.location}&results=1`)
        .then(response => response.json())
        .then((json) => {
          this.coords = json.response
            .GeoObjectCollection
            .featureMember[0]
            .GeoObject
            .Point
            .pos
            .split(' ')
            .map(Number)
            .reverse();
        })
        .then(() => {
          this.$store.dispatch('createPlace', {
            title: this.title,
            location: this.location,
            coords: this.coords,
            visited: false,
          });
          this.$router.push('/');
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('OMG!', error);
          this.alert = true;
        });
      },
    },
  };
</script>
