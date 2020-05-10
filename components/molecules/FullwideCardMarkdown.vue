<template>
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
                    {{ title }}
                </h3>
                <p class="text--primary mt-3" v-html="content"></p>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true   
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>