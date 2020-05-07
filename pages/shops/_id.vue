<template>
    <div>
        <component-title :title="shopData.name" />
        <div class="text-center">
            <v-chip
                v-for="(tag, i) in shopData.tag"
                :key="i"
                class="ma-1"
                label
            >
                {{ tag }}
            </v-chip>
        </div>

        <v-row v-if="!!shopData.imageUrl" align="center" class="pl-5 pr-5 mt-10" justify="center">
            <v-img
                :class="[$style.embed_frame, 'grey', 'lighten-2']" 
                :src="shopData.imageUrl"
                :lazy-src="require('~/assets/images/loading.gif')"
                aspect-ratio="1"
            >
            </v-img>
        </v-row>

        <v-card class="pl-5 pr-5 pt-3 mt-10 ms-2">
            <v-card-text>
                <p v-if="!!shopNews" v-html="$md.render(shopNews.news)"></p>
            </v-card-text>
        </v-card>

        <v-row v-if="!!iframeToUrl()" align="center" class="pl-5 pr-5 mt-10" justify="center">
            <iframe 
                :class="$style.embed_frame" 
                :src="iframeToUrl()" 
                scrolling="no"
            ></iframe>
        </v-row>
        {{ shopData }}
    </div>
</template>

<script>
import ComponentTitle from '~/components/molecules/ComponentTitle.vue'
import shopsNews from '~/apollo/queries/shopsNews'

export default {
    apollo: {
        shopNews: {
            query: shopsNews,
            variables() {
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    validate(context) {
        return /^[0-9]+$/.test(context.params.id)
    },
    async asyncData(context) {
        const id = context.params.id
        const shopData = await context.$axios.get(`shops/${id}`)
        return { shopData: shopData.data }
    },
    components: {
        ComponentTitle
    },
    methods: {
        iframeToUrl() {
            try {
                return this.shopData.mapIframe.split('"')[1]
            } catch(e) {
                return ''
            }
        } 
    }
}
</script>

<style lang="scss" module>
.embed_frame {
    width: 100%;
    height: 60vh;
}
</style>