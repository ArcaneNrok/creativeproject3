<template>
  <div id="app">

    <div class="section menu">
      <h1>PathosLink</h1>
      <router-link to="/" v-show="signedIn">
        <p class="menuItem">Dashboard</p>
      </router-link>

      <router-link to="/following" v-show="signedIn">
        <p class="menuItem">Following</p>
      </router-link>

      <router-link :to="'/user/' + currentUser" v-show="signedIn">
          <p class="menuItem" >Profile</p>
      </router-link>

      <router-link to="/" v-show="signedIn">
        <p class="menuItem" v-on:click="signOut()"  v-show="signedIn">Sign Out</p>
      </router-link>

    </div>
    <router-view v-if="signedIn" />
    <div v-else>
      <div class="form">
        <input v-model="username" placeholder="Username">
        <p></p>
        <input v-model="password" placeholder="Password">
        <p></p>
        <button @click="signIn()">Login</button>
        <p></p>
        <button @click="register()">Register</button>
        <p></p>
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
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
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    signOut(){
      this.$root.$data.currentUser = null;
    },
    async register() {
      let username = this.username;
      if (this.users.find(function (i) { return i.username == username})) {
        this.message = "Username already taken";
        return;
      }
      let user = {
        username: this.username,
        password: this.password
      };
      try {
        await axios.post("/api/users", user);
        this.message = 'Registration successful!';
        this.users.push(user);
      } catch (error) {
        console.log(error);
      }
    },
    async signIn(){
      let username = this.username;
      let user = this.users.find(function(i) {
        return i.username == username;
      });
      if (user == null || !user.password == this.password){
        this.message = "Incorrect username or password";
        return;
      }
      this.$root.$data.currentUser = user;
    }
  },
  computed: {
    currentUser() {
      if (this.$root.$data.currentUser == null){
        return null;
      }
      return this.$root.$data.currentUser.username;
    },
    signedIn() {
      return this.$root.$data.currentUser != null;
    }
  }
};
</script>

<style>
.section {
  width-min: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.menuItem {
  margin: 20px;
  padding: 10px;
  color: #0aa;
  background-image: linear-gradient(#011, #033);
  border-color: #066;
  border-style: solid;
}

.menu {
  margin-left: 40px;
  color: #f00;
}

.menu h1 {
  margin-right: 40px;
}

.form {
  margin: 20px;
}
</style>
