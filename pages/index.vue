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
            <v-divider class="mt-5 mb-2"></v-divider>
          </div>
          <client-only>
            <infinite-loading
              ref="infiniteLoading" 
              spinner="spiral"
              @infinite="infiniteLoad"
            >
              <div slot="no-results"/>
              <span slot="no-more">おしまい🥺</span>
            </infinite-loading>
          </client-only>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  head() {
    return {
      titleTemplate: 'めしてく'
    }
  },
  async asyncData(context) {
    try {
      const shops = (await context.$axios.get('/shops?limit=20')).data
      return {
        currentPage: shops.currentPage,
        hitCount: shops.hitCount,
        shops: shops.shops
      }
    } catch(e) {
      return {
        currentPage: 0,
        hitCount: 0,
        shops: []
      }
    }
  },
  data() {
    return {
      location: null,
    }
  },
  methods: {
    async getPosition(options) {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      })
    },
    async setLocation() {
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
    async infiniteLoad() {
      this.currentPage ++
      let requestUrl = this.getShopsRequestUrl({page: this.currentPage})
      try {
        let axRes = await this.$axios.get(requestUrl)
        if (!!axRes.data) {
          if (axRes.data.shops.length > 0) {
            this.shops = this.shops.concat(axRes.data.shops)
            this.$refs.infiniteLoading.stateChanger.loaded()
            return 
          } 
        }
      } catch(e) {
        this.currentPage --
      }
      this.$refs.infiniteLoading.stateChanger.complete()
    },
    getShopsRequestUrl({
      page = 1,
      sort = 2,
      delivery = 0,
      thirdDelivery = 0,
      takeout = 0
    }) {
      return `/shops?page=${page}&sort=${sort}&delivery=${delivery}&thirdDelivery=${thirdDelivery}&takeout=${takeout}`
    }
  }
}
</script>
