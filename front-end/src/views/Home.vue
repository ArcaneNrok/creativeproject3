<template>
  <div>
    <Feed :posts="posts" />
  </div>

</template>

<script>
import axios from "axios";
import Feed from "../components/Feed.vue";
export default {
  name: "Home",
  components: {
    Feed
  },
  data() {
    return {
      searchText: "",
      posts: [],
      users: [],
      message: '',
      username: '',
      password: ''
    };
  },
  created() {
    this.getPosts();
    this.getUsers();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  },
  computed: {
    signedIn(){
      return this.$root.$data.currentUser != null;
    }
  }
};
</script>

<style scoped></style>
