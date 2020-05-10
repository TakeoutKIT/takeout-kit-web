<template>
    <div>
        <component-title :title="texts.title" />

        <v-parallax
            height="600"
            fluid
            class="pa-10"
            :src="require('~/assets/images/adpDSC_7033.jpg')"
        >
            <v-layout
                column
                justify-center
                align-center
            >
                <v-flex
                    xs12
                    sm8
                    md6
                >
                    <h2 
                        :class="[
                            $style.vertical_write, 
                            $style.text_shadow, 
                            $style.ln_to_br,
                            'display-1',
                            'font-weight-thin',
                            'mb-1'
                        ]"
                    >{{ texts.catchphrase }}</h2>
                </v-flex>
            </v-layout>
        </v-parallax>

        <fullwide-card-markdown
            v-for="(about, i) in abouts"
            :key="i"
            :title="about.title"
            :content="$md.render(about.content)"
        />
    </div>
</template>

<script>
import texts from '~/assets/texts/about-us.json'

import FullwideCard from '~/components/molecules/FullwideCard.vue'
import ComponentTitle from '~/components/molecules/ComponentTitle.vue'
import FullwideCardMarkdown from '~/components/molecules/FullwideCardMarkdown.vue'

import allAbouts from '~/apollo/queries/allAbouts'

export default {
    apollo: {
        abouts: {
            query: allAbouts
        }
    },
    head() {
        return {
            title: texts.title
        }
    },
    data() {
        return {
            texts
        }
    },
    components: {
        FullwideCard,
        FullwideCardMarkdown
    }
}
</script>

<style lang="scss" module>
.vertical_write {
    writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
}
.text_shadow {
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
}
.ln_to_br {
    white-space: pre-wrap; 
}
</style>