<template>
    <v-layout
        column
        justify-center
        align-center
        style="height:80vh"
    >
        <Development />
        <TwitterShare/>
    </v-layout>
</template>

<script>
import Development from '~/components/organisms/Development.vue'
import TwitterShare from '~/components/organisms/TwitterShare.vue'

export default {
    components: {
        Development,
        TwitterShare
    },
    head() {
        return {
            title: '開発中'
        }
    }
}
</script>
