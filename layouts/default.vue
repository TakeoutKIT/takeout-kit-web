<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="naviDrawer.isDrawer"
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon 
        @click.stop="naviDrawer.isDrawer = !naviDrawer.isDrawer"
      />
      <v-toolbar-title v-text="title" />
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
          }
        ]
      }
    }
  }
}
</script>
