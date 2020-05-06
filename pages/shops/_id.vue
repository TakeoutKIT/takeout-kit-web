<template>
    <div>
        {{ shopData }}
    </div>
</template>

<script>
import axios from 'axios'


export default {
    async asyncData(context) {
        //const id = context.params.id
        //const shopData = (await axiosBase.get(`/api/shops/${id}`)).data
        return { shopData: 'TODO:ここから' }
    }
}
</script>

<style>

</style>