<template>
  <div class="page">
    <div v-for="user in users" :key="user.username">
      <router-link class="section userview" :to="'/user/' + user.username">
        <img
          class="profile_pic"
          :src="'/images/icons/' + user.username + '.svg'"
        />
        <p class="username">{{ user.username }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    users() {
      return this.$root.$data.users;
    }
  }
};
</script>

<style scoped>
.profile_pic {
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: #fff;
  border-color: #f00;
  border-style: solid;
  border-width: thin;
}

.userview {
  justify-content: flex-start;
  margin: 10px;
}

.username img {
  width: 20px;
  height: 20px;
}

router-link {
  color: #f00;
}

.section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height-min: 100%;
}
</style>
