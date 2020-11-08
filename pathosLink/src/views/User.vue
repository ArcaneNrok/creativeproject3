<template>
<div>

  <div class="profileTitle">
    <img class="profile_pic" :src="'/images/icons/'+ title +'.svg'">
    <h1>{{title}}'s Profile</h1>
  </div>

  <div v-show="ownProfile" class="makePost">
    <h2>Make a post</h2>
    <form @submit.prevent="addPost()">
      <textarea id="postText"></textarea><br>
      <button>Make Post</button>
    </form>
  </div>

  <Feed :posts="posts" />

</div>
</template>

<script>
import Feed from "../components/Feed.vue"
export default {
  name: 'User',
  components: {
    Feed
  },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    addPost() {
      this.$root.$data.addPost(this.$root.$data.currentUser, document.getElementById("postText").value);
      document.getElementById("postText").value = "";
    }
  },
  computed: {
    title() {
      return this.$route.params.id;
    },
    posts() {
      return this.$root.$data.posts.filter(post => post.poster == this.$route.params.id);
    },
    ownProfile() {
      return this.$root.$data.currentUser == this.$route.params.id;
    }
  },
}
</script>


<style scoped>
.userview {
  justify-content: flex-start;
}


.profile_pic {
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: #fff;
  border-color: #f00;
  border-style: solid;
  border-width: thin;
  margin: 5px;
}


.profileTitle {
  color: #f00;
  margin: 20px;
  display: flex;
}

.profileTitle h1 {
  margin: 10px;
}


.makePost {
  margin: 20px;
  color: #0aa;
}

.makePost h2 {
  font-size: 20px;
  margin: 10px;
}

textarea {
  background-color: #000;
}
</style>
