<template>
<div>
  <Feed :posts="posts" />
</div>
</template>

<script>
import Feed from "../components/Feed.vue"
export default {
  name: 'Home',
  components: {
    Feed
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    posts() {
      return this.$root.$data.posts;
    }
  },
}
</script>

<style scoped>

</style>
