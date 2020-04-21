<template>
  <div class="container">
    <div class="is-fullwidth">
      <div class="columns is-desktop">
        <div class="column">
          <h1 class="title is-1">
            Dashboard
          </h1>
        </div>
      </div>
      <div class="content columns is-desktop">
        <div class="column">
          <div class="box">
            <DashboardProjects />
          </div>
        </div>
        <div class="column">
          <div class="box">
            <DashboardClients />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import Loader from './Loader';
import DashboardClients from '../views/clients/Dashboard';
import DashboardProjects from '../views/projects/Dashboard';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    clients: [],
    projects: [],
    errors: [],
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    budget: '',
    clients_length: 3,
    project_length: 3,
    is_loaded: false,
    }
  },
  components: {
    Loader,
    DashboardClients,
    DashboardProjects,
  },
  mounted() {
    let self = this;
    // Find data using the "lists" reference
    firebase.database().ref('clients').on('value', function(snapshot) {
      let returnArr = [];
      snapshot.forEach(function(childSnapshot) {
        returnArr.push(childSnapshot.val());
        // Fill the local data property with Firebase data
        self.lists = returnArr;
      });
    });
  },
  methods: {
    getList: function(list) {
      this.todoList = list;
    },
    createList: function() {
      let formData = this.$f7.form.convertToData('#list-form');
      if (formData.listname != '' && formData.listname != undefined && this.listItems.length != 0) {
        var ID = function() {
          return Math.random().toString(36).substr(2, 10);
        };
        let listKey = ID();
        this.createdList = {
          name: formData.listname,
          items: this.listItems,
          id: ID(),
          key: listKey
        };
        // Firebase magic! We're making a reference to the list using a unique ID, then creating the object itself
        firebase.database().ref('lists/' + listKey).set({
          name: this.createdList.name,
          items: this.createdList.items,
          id: this.createdList.id,
          key: this.createdList.key
        });
        this.$$('input.input-with-value').forEach(function(input) {
          input.value = '';
        });
        this.listItems = [];
        this.listName = '';
        this.disabled = 1;
        this.$emit('created', this.createdList);
        this.$f7.tab.show(tab1, true);
      } else {
      return false;
      }
    },
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>