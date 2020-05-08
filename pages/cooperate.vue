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
import forms from '~/assets/forms/cooperate.json'

import ComponentTitle from '~/components/molecules/ComponentTitle.vue'

export default {
    components: {
        ComponentTitle
    },
    head() {
        return {
            title: texts.title
        }
    },
    data() {
        return {
            texts,
            tabState: null,
            tabs: [
                {
                    id: 'tab-1',
                    title: texts.tab1title,
                    icon: 'fas fa-plus-square',
                    content: forms.tab1form
                },
                {
                    id: 'tab-2',
                    title: texts.tab2title,
                    icon: 'fas fa-pen-square',
                    content: forms.tab2form
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