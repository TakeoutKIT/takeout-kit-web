<template>
    <div>
        <component-title :title="shopData.name" />
        <v-row align="center" class="pl-5 pr-5" justify="center">
            <!-- <v-img
                src="https://bad.src/not/valid"
                lazy-src="https://picsum.photos/id/11/100/60"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="800"
                max-height="400"
            >
            </v-img> -->
            <iframe 
                :class="$style.map_embed" 
                :src="`${shopData.mapUrl}`" 
                scrolling="no"
            ></iframe>
        </v-row>
        {{ shopData }}
    </div>
</template>

<script>
import ComponentTitle from '~/components/molecules/ComponentTitle.vue'

export default {
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
    }
}
</script>

<style lang="scss" module>
.map_embed {
    width: 100%;
    height: 60vh;
}
</style>