<template>
  <div class="home">
    <template v-if="user.loggedIn">
      <Dashboard />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Dashboard from '@/components/Dashboard.vue'
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Dashboard,
  },
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
