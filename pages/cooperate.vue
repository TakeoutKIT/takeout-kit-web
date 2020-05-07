<template>
    <div>
        <component-title :title="texts.title" :subtitle="texts.comment" />
        <div>
            <v-tabs
                v-model="tabState"
                class="elevation-2"
                :grow="true"
                :icons-and-text="true"
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab
                    v-for="(item, i) in tabs"
                    :key="i"
                    :href="`#${item.id}`"
                >
                    {{ item.title }}
                    <v-icon> {{ item.icon }} </v-icon>
                </v-tab>

                <v-tab-item
                    v-for="(item, i) in tabs"
                    :key="i"
                    :value="item.id"
                >
                    <v-card
                        flat
                    >
                        <v-layout
                            column
                            justify-center
                            align-center
                        >
                            <div :class="$style.embed_from" v-html="item.content"></div>
                        </v-layout>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>

    </div>
</template>

<script>
import texts from '~/assets/texts/cooperate.json'

import ComponentTitle from '~/components/molecules/ComponentTitle.vue'

export default {
    components: {
        ComponentTitle
    },
    data() {
        return {
            texts,
            tabState: null,
            tabs: [
                {
                    id: 'tab-1',
                    title: '店舗登録',
                    icon: 'fas fa-plus-square',
                    content: '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd5PMhlcWUXAp9WmpqNGH1t2Mc8XxrPNNx7EoPKui-MOOy1aA/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0" style="width:80vw;height:2400px;">読み込んでいます…</iframe>'
                },
                {
                    id: 'tab-2',
                    title: '追記・編集・削除',
                    icon: 'fas fa-pen-square',
                    content: '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeJ5r2XD2_3DdT38kATZe3-KvhRFOWjzkYyWJfYVyW9MtDXUg/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0" style="width:80vw;height:1800px;">読み込んでいます…</iframe>'
                }
            ],
        }
    }
}
</script>

<style lang="scss" module>
.embed_from {
    height: 2500px;
}
</style>