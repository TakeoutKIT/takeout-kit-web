<template>
    <div>
        {{ shopData }}
    </div>
</template>

<script>

export default {
    validate(context) {
        return /^[0-9]+$/.test(context.params.id)
    },
    async asyncData(context) {
        const id = context.params.id
        const shopData = (await context.$axios.$get(`/api/shops/${id}`)).data
        return { shopData: 'TODO:ここから' }
    }
}
</script>

<style>

</style>