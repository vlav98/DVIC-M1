<template>
    <div class="container">
        <div class="box">
        <div class="title">New project</div>
        <div class="content">
        <div class="alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
        </div>
        <form action="#" @submit.prevent="_create_project">
            <div class="field">
                <div class="control">
                    <input 
                    id="title"
                    type="text"
                    class="input"
                    name="title"
                    required
                    autofocus
                    v-model="form.title"
                    placeholder="Name of the project"/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                <textarea
                    id="description"
                    type="text"
                    class="input"
                    name="description"
                    required
                    v-model="form.description"
                    placeholder="Description of the project"
                />
                </div>
            </div>
            <div class="field">
                <div class="control">
                <input
                    id="budget"
                    type="number"
                    class="input"
                    name="budget"
                    required
                    v-model.number="form.budget"
                    placeholder="Budget of the project"
                />
                </div>
            </div>
            <div class="field">
                <div class="control">
                <button type="submit" class="button is-primary">Submit</button>
                </div>
            </div>
        </form>
        </div>
        </div>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
    name: "create-project",
    data() {
        return {
            form: {
                title: '',
                description: '',
                budget: '',
                clients: [],
            },
            errors: []
        }
    },
    methods: {
        _create_project: function() {
            let new_error
            let number
            if(
                this.form.title !== "" && this.form.description !== "" && this.form.budget !== ""
            ) {
                number = 1
                this.errors.splice(0)
            } else {
                new_error = "Your field(s) should not to be empty"
                if(!this.errors.includes(new_error)) {
                    this.errors.push(new_error)
                }
            }
            if (number == 1) {
                    // Firebase references
                    const rootReference = firebase.database().ref();
                    const alertsReference = rootReference.child("projects");
                    alertsReference.push({
                        title: this.form.title,
                        description: this.form.description,
                        budget: this.form.budget,
                        createdAt: Date.now(),
                    })
                    this.title = ""
                    this.description = ""
                    this.budget = ""
                    this.clients = ""
            }
        }
    },
} 
</script>

<style lang="scss">

</style>