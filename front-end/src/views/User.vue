<template>
  <div>
    <div class="profileTitle">
      <img class="profile_pic" :src="profileIconPath">
      <h1>{{ title }}'s Profile</h1>
    </div>

    <div v-show="ownProfile" class="makePost">
      <h2>Change Profile Picture</h2>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>

    <div v-show="ownProfile" class="makePost">
      <h2>Make a post</h2>
      <form @submit.prevent="addPost()">
        <textarea id="postText"></textarea><br />
        <button>Make Post</button>
      </form>
    </div>

    <Feed :posts="posts" />
  </div>
</template>

<script>
import axios from "axios";
import Feed from "../components/Feed.vue";
export default {
  name: "User",
  components: {
    Feed
  },
  data() {
    return {
      searchText: "",
      posts: [],
      users: [],
      file: null,
      profileIconPath: ""
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
        this.posts = response.data.filter(post => post.poster == this.$route.params.id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addPost() {
      try {
        await axios.post("/api/posts", {
          poster: this.$root.$data.currentUser.username,
          text: document.getElementById("postText").value
        });
        document.getElementById("postText").value = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        let username = this.$route.params.id;
        let user = this.users.find(function(i) {
          return i.username == username;
        });
        this.profileIconPath = user.iconPath;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        console.log(this.file.name.split('.')[1]);
        formData.append('photo', this.file, this.file.name);
        let iconPath = await axios.post('/api/photos', formData);
        this.$root.$data.currentUser.iconPath = iconPath.data.path.split(".")[0];
        console.log(iconPath);
        console.log(this.$root.$data.currentUser.iconPath);
        await axios.put('/api/users/' + this.$root.$data.currentUser._id, this.$root.$data.currentUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    title() {
      return this.$route.params.id;
    },
    ownProfile() {
      if (this.$root.$data.currentUser == null){
        return false;
      }
      return this.$root.$data.currentUser.username == this.$route.params.id;
    },
  }
};
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
