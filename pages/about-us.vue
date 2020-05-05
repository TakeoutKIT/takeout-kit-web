<template>
    <div>
        <v-layout
            column
            justify-center
            align-center
            class="mb-10 mt-5"
        >
            <v-flex>
                <h1 ma5> {{ texts.title }} </h1>
            </v-flex>
        </v-layout>

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

        <v-layout
            column
            justify-center
            align-center
            class="mb-10 mt-3"
        >
            <v-flex>
                <v-card 
                    class="pa-10 mx-auto"
                    width="5000"
                >
                    <h3 class="display-1 text--primary">
                        {{ texts.aboutUsTitle }}
                    </h3>
                    <p class="text--primary mt-3">
                        {{ texts.aboutUsContent }}
                    </p>
                </v-card>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
import texts from '~/assets/texts/about-us.json'

export default {
    data() {
        return {
            texts
        }
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