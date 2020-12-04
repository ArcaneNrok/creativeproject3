import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import posts from "./posts.js";
import users from "./users.js";

let data = {
  currentUser: null,
  users: users,
  posts: posts,
  cart: [],
  addReply(parentId, text) {
    let parentPost = posts[parentId];
    console.log(parentId);
    let reply = {
      postId: parentPost.replies.length,
      poster: this.currentUser,
      text: text
    };
    parentPost.replies.push(reply);
  },
  addPost(poster, text) {
    let post = {
      postId: posts.length,
      poster: poster,
      text: text,
      replies: []
    };
    posts.push(post);
  }
};

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount("#app");
