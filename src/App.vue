<template>
  <v-app toolbar>
    <v-toolbar class="primary" fixed>
      <v-btn large
        href="https://github.com/Lyrialtus/maplacelist-demo"
        target="_blank"
        class="hidden-xs-only mini">
        <v-icon>code</v-icon>
        <div class="hidden-sm-and-down ml-2">
          GitHub
        </div>
      </v-btn>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          Места СПб
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn exact flat v-for="item in items"
          @click.native="onNavigation"
          :to="item.link"
          :key="item.link">
          <v-icon>{{ item.icon }}</v-icon>
          <div class="hidden-xs-only ml-2">
            {{ item.title }}
          </div>
        </v-btn>
      </v-toolbar-items>
      <v-spacer class="hidden-sm-and-up"></v-spacer>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { link: '/', title: 'Карта', icon: 'layers' },
          { link: '/list', title: 'Список', icon: 'format_align_justify' },
          { link: '/new', title: 'Добавить', icon: 'add_location' },
        ],
      };
    },
    methods: {
      onNavigation() {
        this.$store.commit('setDefaultCenter');
      },
    },
  };
</script>

<style lang="stylus">
  @import './stylus/main'

  .mini
    min-width: auto

  .input-group--focused label
    color: $theme.secondary !important

  .progress-circular
    margin: 5rem

  .visited
    font-style: italic
    text-decoration: line-through
</style>
