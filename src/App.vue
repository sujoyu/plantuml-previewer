<template>
  <v-app>
    <v-toolbar color="indigo" dark>
      <v-container>
        <v-toolbar-title>PlantUML Previewer</v-toolbar-title>
      </v-container>
    </v-toolbar>

    <container></container>

    <v-footer color="indigo" height="auto">
      <v-container>
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-xs-center"
      >
        <v-card-text class="white--text">
          <v-layout>
            <v-flex xs6 layout column>
              <h4>What's This</h4>
              <p>This application is online Plant UML editor <br>
              with syntax highlighting and preview.</p>
            </v-flex>
            <v-flex xs6 layout column>
              <h4>Contact</h4>
              <v-list two-line class="white--text indigo lighten-1">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <v-icon></v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Twitter</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <a href="https://twitter.com/intent/tweet?screen_name=sutsurumu" class="twitter-mention-button" data-related="sutsurumu" data-dnt="true">Tweet to @sutsurumu</a>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <v-icon></v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>GitHub</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <a class="github-button" href="https://github.com/sujoyu/plantuml-previewer" data-style="mega" data-count-href="/sujoyu/plantuml-previewer/stargazers" data-count-api="/repos/sujoyu/plantuml-previewer#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star sujoyu/plantuml-previewer on GitHub">Star</a>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
        </v-card-text>
      </v-card>
      <v-card
        flat
        tile
        class="indigo white--text text-xs-center"
      >
        <v-card-text class="white--text">
          © 2016 sujoyu
        </v-card-text>
      </v-card>
      </v-container>
   </v-footer>
  </v-app>
</template>

<script>
import Container from './Container.vue';

export default {
  components: {
    Container,
  }
}
</script>

<style lang="sass" scoped>

</style>
