<template>
    <div>
        <component-title :title="shopData.name" />
        <div class="text-center">
            <v-chip
                v-for="(tag, i) in shopData.tag"
                :key="i"
                class="ma-1"
                label
                @click.native.stop="tagClick"
            >
                {{ tag }}
            </v-chip>
        </div>

        <v-row class="mt-2" align="center" justify="center">
            <v-checkbox
                v-model="shopData.takeout"
                label="テイクアウト"
                :readonly="true"
            ></v-checkbox>
            <div style="width:2%;height:100%;"></div>
            <v-checkbox
                v-model="shopData.firstDelivery"
                label="自社デリバリー"
                :readonly="true"
            ></v-checkbox>
            <div style="width:2%;height:100%;"></div>
            <v-checkbox
                v-model="shopData.thirdDelivery"
                label="外部委託デリバリー"
                :readonly="true"
            ></v-checkbox>
        </v-row>

        <v-row v-if="!!shopData.imageUrl" align="center" class="pl-5 pr-5 mt-10" justify="center">
            <v-img
                :class="[$style.embed_frame, 'grey', 'lighten-2']" 
                :src="shopData.imageUrl"
                :lazy-src="require('~/assets/images/loading.gif')"
                aspect-ratio="1"
            >
            </v-img>
        </v-row>

        <v-card v-if="!!shopData.address" class="pl-5 pr-5 pt-3 mt-10 ms-2">
            <v-card-text>
                <address>
                    <p class="body-1">
                        <b>住所：</b><br>
                        {{ shopData.address }} <br>
                        <br>
                        <b>電話：</b><br>
                        <a :href="`tel:${shopData.tel}`"> {{ shopData.tel }} </a>
                    </p>
                </address>
            </v-card-text>
        </v-card>

        <v-card v-if="!!shopNews" class="pl-5 pr-5 pt-3 mt-10 ms-2">
            <v-card-text>
                <div id="md-container">
                    <div v-html="$md.render(shopNews.news)"></div>
                </div>
            </v-card-text>
        </v-card>

        <v-card v-if="!!shopData.orderUrl" class="pl-5 pr-5 pt-3 mt-10 ms-2">
            <v-list-item one-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1"> {{ shopData.name }} の注文の仕方</v-list-item-title>
                    <v-list-item-subtitle>下記のボタンを押すと注文の仕方や注文ができるWebサイトへ飛びます</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions >
                <v-btn :href="shopData.orderUrl" class="mb-5" target="_blank" rel="noopener noreferrer">
                    注文サイトへ
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-row v-if="!!iframeToUrl()" align="center" class="pl-5 pr-5 mt-10 mb-5" justify="center">
            <iframe 
                :class="$style.embed_frame" 
                :src="iframeToUrl()" 
                scrolling="no"
            ></iframe>
        </v-row>

        <p class="pl-2 pr-2 mt-10 mb-5">
            このページの見方は<nuxt-link to="/shops/how-to-use">こちら</nuxt-link>
        </p>
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
    head() {
        return {
            title: this.shopData.name
        }
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
        },
        tagClick(event) {
            this.$router.push({
                path: '/',
                query: {
                    keyword: event.toElement.innerText
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#md-container ::v-deep img {
    max-width: 100%;
}
</style>

<style lang="scss" module>
.embed_frame {
    width: 100%;
    height: 60vh;
}
</style>