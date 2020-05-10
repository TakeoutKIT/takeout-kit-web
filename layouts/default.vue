<template>
  <v-app
    :id="$style.bg_color"
  >
    <!-- 左メニュー -->
    <v-navigation-drawer
      class="secondary"
      v-model="naviDrawer.isDrawer"
      :src="require('~/assets/images/adpDSC_7033.jpg')"
      flex
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in naviDrawer.items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title 
              class="white--text"
              v-text="item.title" 
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      class="secondary white--text"
    >
      <v-app-bar-nav-icon
        class="white--text"
        @click.stop="naviDrawer.isDrawer = !naviDrawer.isDrawer"
      />
      <v-toolbar-title>
        <nuxt-link 
          to="/"
          :class="['white--text', $style.toolbar_title, 'mt-1', 'mb-1']"
        > 
          <v-img 
            :src="require('~/assets/images/meshiteku_rogo.png')" 
            max-width="200px"
          >
          </v-img>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import texts from '~/assets/texts/default.json'

export default {
  data () {
    return {
      title: texts.title,
      naviDrawer: {
        isDrawer: false,
        items: [
          {
            title: texts.list,
            icon: 'fas fa-list',
            to: '/'
          },
          {
            title: texts.cooperate,
            icon: 'fas fa-edit',
            to: '/cooperate'
          },
          {
            title: texts.aboutus,
            icon: 'fas fa-question-circle',
            to: '/about-us'
          },
          {
            title: texts.terms_of_uses,
            icon: 'fas fa-pen-fancy',
            to: '/terms-of-uses'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" module>
#bg_color {
  background: $tamago-white;
}
.toolbar_title {
  text-decoration: none;
}
</style>