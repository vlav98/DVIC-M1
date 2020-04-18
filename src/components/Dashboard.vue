<template>
  <div class="container">
    <div class="box">
      <div class="title">Dashboard</div>
      <div class="content">
        <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
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