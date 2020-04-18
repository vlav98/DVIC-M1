<template>
  <div class="container">
    <div class="box">
      <div class="title">Login</div>
      <div class="content">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <form action="#" @submit.prevent="submit">
          <div class="field">
            <div class="control">
              <input
                id="email"
                type="email"
                class="input"
                name="email"
                value
                required
                autofocus
                v-model="form.email"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                id="password"
                type="password"
                class="input"
                name="password"
                required
                v-model="form.password"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="field mb-0">
            <div class="col-md-8 offset-md-4">
              <button type="submit" class="button is-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>