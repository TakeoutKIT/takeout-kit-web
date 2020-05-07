import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHCMS_API = "https://api-eu-central-1.graphcms.com/v2/ck9wzy7px0af701xsd7ld7cu0/master"

export default () => ({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
})