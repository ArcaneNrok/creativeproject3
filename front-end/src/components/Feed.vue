<template>
  <div class="reverse">
    <div class="post" v-for="post in posts" :key="post._id">
      <router-link class="username" :to="'/user/' + post.poster">
        <img
          class="profile_pic"
          :src="'/images/icons/' + post.poster + '.svg'"
        />
        <h1 class="username">{{ post.poster }}</h1>
      </router-link>

      <p>{{ post.text }}</p>

      <div class="post response" v-for="reply in post.replies" :key="reply._id">
        <router-link class="username" :to="'/user/' + reply.poster">
          <img
            class="profile_pic"
            :src="'/images/icons/' + reply.poster + '.svg'"
          />
          <h1 class="username">{{ reply.poster }}</h1>
        </router-link>
        <p>{{ reply.text }}</p>
      </div>

      <div class="respondForm">
        <h2 class="replyLabel">Reply</h2>
        <form @submit.prevent="addReply(post._id)">
          <textarea v-bind:id="'replyText' + post._id"></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Feed",
  props: {
    posts: Array
  },
  methods: {
    async addReply(postId) {
      let reply = {
        poster: this.$root.$data.currentUser.username,
        text: document.getElementById("replyText" + postId).value
      };
      let post = this.posts.find(function(i) {
        return i._id == postId;
      });
      post.replies.push(reply);
      await axios.put("/api/posts/" + postId, post);
      document.getElementById("replyText" + postId).value = "";
    }
  },
  computed: {}
};
</script>

<style scoped>
.post {
  margin: 20px;
  margin-bottom: 40px;
  border-style: solid;
  border-width: medium;
  padding: 10px;
  border-color: #f00;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.username {
  color: #f00;
  font-weight: bold;
  font-size: 12px;
}

.response {
  margin-bottom: 5px;
  border-width: thin;
}

.username img {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-color: #f00;
  border-style: solid;
  border-width: thin;
  margin: 5px;
}

.respondForm {
  margin: 20px;
  color: #0aa;
}

.respondForm h2 {
  font-size: 20px;
  margin: 10px;
}

textarea {
  background-color: #000;
}

.reverse {
  display: flex;
  flex-direction: column-reverse;
}
</style>
