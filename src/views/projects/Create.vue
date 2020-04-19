<template>
    <div class="container">
        <div class="box">
        <div class="title">New project</div>
        <div class="content">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <form action="#" @submit.prevent="submit">
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
                <input
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
            title: '',
            description: '',
            price: '',
            errors: [],
        }
    },
    methods: {
        _create_project: function() {
            let new_error
            let number
            if(
                this.title !== "" && this.description !== ""
            ) {
                number = 1
                this.errors.splice(0)
            } else {
                new_error = "Your field(s) not to be empty"
                if(!this.errors.includes(new_error)) {
                    this.errors.push(new_error)
                }
            }
            if (number == 1) {
                    // Firebase references
                    const rootReference = firebase.database().ref();
                    const alertsReference = rootReference.child("projects");
                    alertsReference.push({
                        title: this.title,
                        description: this.description,
                        date: Date.now(),
                    })
                    this.title = ""
                    this.description = ""
            }
        }
    },
} 
</script>

<style lang="scss">

</style>