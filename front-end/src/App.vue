<template>
<div id="app">

  <div class="section menu">
    <h1>PathosLink</h1>
    <router-link to="/">
      <p class="menuItem">Dashboard</p>
    </router-link>

    <router-link to="/following">
      <p class="menuItem">Following</p>
    </router-link>

    <router-link :to="'/user/' + currentUser">
      <p class="menuItem">Profile</p>
    </router-link>
  </div>
  <router-view />

</div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$root.$data.currentUser;
    }
  }
}
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
  color: #F00;
}

.menu h1 {
  margin-right: 40px;
}
</style>
