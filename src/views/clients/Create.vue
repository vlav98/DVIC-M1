<template>
    <div class="container">
        <div class="box">
        <div class="title">New project</div>
        <div class="content">
        <div class="alert alert-danger" v-for="(error, k) in errors" :key="k">
            {{error}}
        </div>
        <form action="#" @submit.prevent="_create_client">
            <div class="field">
                <div class="control">
                    <input
                    id="firstName"
                    type="text"
                    class="input"
                    name="firstName"
                    value
                    required
                    autofocus
                    v-model="form.firstName"
                    placeholder="First name" />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                    id="lastName"
                    type="text"
                    class="input"
                    name="lastName"
                    value
                    required
                    autofocus
                    v-model="form.lastName"
                    placeholder="Last name" />
                </div>
            </div>
            <div class="field">
                <div class="control">
                <input
                    id="company"
                    type="text"
                    class="input"
                    name="company"
                    value
                    required
                    v-model="form.company"
                    placeholder="Company" />
                </div>
            </div>
            <div class="field">
                <div class="control">
                <input
                    id="email"
                    type="email"
                    class="input"
                    name="email"
                    value
                    required
                    v-model="form.email"
                    placeholder="E-mail"
                />
                </div>
            </div>
            <div class="field">
                <div class="control">
                <input
                    id="phine"
                    type="tel"
                    class="input"
                    name="phone"
                    value
                    v-model="form.phone"
                    placeholder="Phone number"
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
import firebase from "firebase";
export default {
    name: "create-client",
    data() {
        return {
            form : {
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phone: '',
            },
            errors: []
        }
    },
    methods: {
        _create_client: function() {
            let new_error
            let number
            if(
                this.firstName !== "" && this.lastName !== "" && this.company !== "" && this.email !== ""
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
                    const alertsReference = rootReference.child("clients");
                    alertsReference.push({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        company: this.company,
                        email: this.email,
                        phone: this.phone,
                        createdAt: Date.now(),
                    })
                    this.firstName = ""
                    this.lastName = ""
                    this.company = ""
                    this.email = ""
                    this.phone = ""
            }
        }
    },
} 
</script>

<style lang="scss">

</style>