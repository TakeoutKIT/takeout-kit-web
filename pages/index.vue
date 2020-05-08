<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-toolbar>

        <v-toolbar-title>一覧</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          hide-details
          prepend-icon="fas fa-search"
          single-line
          style="max-width:60%"
        ></v-text-field>

        <v-btn icon>
          <v-icon>fas fa-filter</v-icon>
        </v-btn>

      </v-toolbar>
        
      <v-card-text>
          <div>
            <v-layout>
              <v-flex xs5>
                <v-img
                  :src="require('~/assets/images/loading.gif')"
                  height="125px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title> title </v-card-title>
                <v-card-subtitle> subtitle </v-card-subtitle>
              </v-flex>
            </v-layout>
          </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
