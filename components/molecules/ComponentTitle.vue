<template>
    <v-layout
        column
        justify-center
        align-center
        class="mb-10 mt-5"
    >
        <v-flex>
            <h1 class="mt-5"> {{ title }} </h1>
        </v-flex>
        <p class="text--primary mt-1">
            {{ subtitle }}
        </p>
    </v-layout>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        }, 
        subtitle: {
            type: String,
            required: false,
            default: '',
        }
    }
}
</script>

<style>

</style>