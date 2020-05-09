<template>
    <v-btn
    fab
    :color="backgroundColor"
    :href="baseUrl + tweetBody"
    >
        <v-icon :color="iconColor">
            fab fa-twitter
        </v-icon>
    </v-btn>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        iconColor: {
            type: String,
            default: 'blue'
        },
        backgroundColor: {
            type: String,
            default: 'white'
        }
    },
    data () {
        return {
            baseUrl: 'https://twitter.com/intent/tweet?text=',
            domainName: 'https://takeout-kit-web.herokuapp.com'
        }
    },
    computed: {
        pageTitle () {
            if (process.browser) {
                return document.title
            } else {
                return ''
            }
        },
        tweetBody () {
            if (!this.text){
                return encodeURI(this.pageTitle + '\n' + this.domainName + this.$route.fullPath)
            }else{
                return encodeURI(this.text)
            }
        }
    }
}
</script>
