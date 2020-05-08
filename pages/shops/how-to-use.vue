<template>
    <div>
        <component-title :title="title"/>
    </div>
</template>

<script>
import ComponentTitle from '~/components/molecules/ComponentTitle.vue'

export default {
    components: {
        ComponentTitle,
    },
    data () {
        return {
            title: 'お店のページの見方'
        }
    },
    head() {
        return {
            title: this.title
        }
    }
}
</script>

<style>

</style>