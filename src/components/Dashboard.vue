<template>
  <div class="container">
    <div class="box">
      <div class="title">Dashboard</div>
      <div class="content">
        <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
        <template v-if="user.loggedIn">
          <router-link to="new-project" class="button is-primary">Create a project</router-link>
          <router-link to="new-client" class="button is-primary">Add a new client</router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>