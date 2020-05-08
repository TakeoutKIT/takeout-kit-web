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
        <v-container 
          id="scroll-target"
          style="height: 75vh"
          class="overflow-y-auto ma-1"
        >
          <div v-for="(shop, i) in shops" :key="i" class="pb-4">
            <v-layout>
              <v-flex xs5>
                <v-img
                  v-if="!!shop.imageUrl"
                  :src="shop.imageUrl"
                  :lazy-src="require('~/assets/images/loading.gif')"
                  height="125px"
                  contain
                ></v-img>
                <v-layout
                  v-else
                  column
                  justify-center
                  align-center
                >
                  <h3 class="pt-10 display-1"> 
                    {{ shop.name }}
                  </h3>
                </v-layout>
              </v-flex>
              <v-flex xs7>
                <v-card-title> {{ shop.name }} </v-card-title>
                <div class="ml-2">
                  <v-chip
                      v-for="(tag, i) in shop.tag"
                      :key="i"
                      class="ma-1"
                      label
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-flex>
            </v-layout>
          </div>
          <client-only>
            <infinite-loading
              ref="infiniteLoading" 
              spinner="spiral"
              @infinite="infiniteLoad"
            >
              <div slot="no-results"/>
              <span slot="no-more">もうないよ〜</span>
            </infinite-loading>
          </client-only>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  head() {
    return {
      titleTemplate: 'めしてく'
    }
  },
  async asyncData(context) {
    const shops = (await context.$axios.get('/shops')).data
    return {
      currentPage: shops.currentPage,
      hitCount: shops.hitCount,
      shops: shops.shops
    }
  },
  data() {
    return {
      location: null,
    }
  },
  async mounted() {
    try {
      let position = await this.getPosition()
      position = position.coords
      this.location = {
        latitude: position.latitude,
        longitude: position.longitude
      }
    } catch(e) {
      this.location = null
    }
  },
  methods: {
    async getPosition(options) {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      })
    },
    async infiniteLoad() {
      this.$refs.infiniteLoading.stateChanger.complete()
    }
  }
}
</script>
