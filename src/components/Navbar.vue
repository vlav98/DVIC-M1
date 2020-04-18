<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">DVIC-APP</router-link>
      </div>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="main-navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div class="navbar-menu" id="main-navbar">
        <ul class="navbar-end">
          <template v-if="user.loggedIn">
            <div class="navbar-item">{{user.data.displayName}}</div>
            <li class="navbar-item">
              <a class="navbar-item" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="navbar-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};
</script>