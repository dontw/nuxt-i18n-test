export default {
  computed: {
    currRoute() {
      return this.$route.path.split('/')[
        this.$route.path.split('/').length - 1
      ]
    }
  },
}
