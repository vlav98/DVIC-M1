<template>
    <div class="fullscreen container">
        <div class="columns">
            <div class="column">
                <h1 class="title">Clients</h1>
            </div>
            <div class="column">
                <router-link to="new-client" class="button is-primary">Add a new client</router-link>
            </div>
        </div>
        <div v-if="this.is_loaded === true">
            <loader />
        </div>
        <div v-else>
            <div class="clients">
            <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
                {{error}}
            </div>
            <div v-if="clients.length > 0">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(client, k) in clients" :key="k">
                        <td v-if="client.status !== 'created'">
                            <input v-model="firstName" type="text" placeholder="firstName" id="firstName" name="firstName" />
                        </td>
                        <td v-else>
                            {{client.firstName}}
                        </td>

                        <td v-if="client.status !== 'created'">
                            <input v-model="lastName" type="text" placeholder="lastName" id="lastName" name="lastName" />
                        </td>
                        <td v-else>
                            {{client.lastName}}
                        </td>

                        <td v-if="client.status !== 'created'">
                            <input v-model="email" type="text" placeholder="email" id="email" name="email" />
                        </td>
                        <td v-else>
                            {{client.email}}
                        </td>

                        <td v-if="client.status !== 'created'">
                            <input v-model="phone" type="text" placeholder="phone" id="phone" name="phone" />
                        </td>
                        <td v-else>
                            {{client.phone}}
                        </td>

                        <td>{{client.createdAt.getFullYear()}} / {{client.createdAt.getMonth() + 1}} / {{client.createdAt.getDate()}} - {{client.createdAt.getHours()}}:{{client.createdAt.getMinutes()}}:{{client.createdAt.getSeconds()}}</td>

                        <td v-if="client.status !== 'created'">
                            <button class="button" @click="_item_save(client.id, k)">Save</button>
                        </td>
                        <td v-else>
                            <div class="buttons">
                                <button class="button" @click="_item_edit(k)">
                                    Edit
                                </button>
                                <button class="button" @click="_item_delete(client.id, k)">
                                    Delete
                                </button>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <button @click.prevent="_load_more" class="button button-success">Load More</button>
            </div>
            <div v-else class="alert alert-warning">
                There is no clients for now
            </div>

            </div>
        </div>
    </div>
</template>
<script>
import * as firebase from "firebase/app";
import Loader from "../../components/Loader";

export default {
    name: "clients",
    data() {
        return {
        clients: [],
        errors: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        clients_length: 3,
        is_loaded: false,
        }
    },
    components: {
    Loader
    },
    mounted() {
    this._create_clients(this.clients_length)
    },
    methods: {
        _load_more: async function () {
        this.is_loaded = true

        let db              = await firebase.database()
        let snapshot        = await db.ref('clients').once('value')
        let clients         = await snapshot.val();
        let array           = []

        for (let item of Object.entries(clients)) {
            array.push(item)
        }
        let clients_length = array.length
        let diff           = clients_length - this.clients_length

        if(this.clients_length > 0) {
            this.clients        = []
            this.clients_length = this.clients_length + diff
            this._create_clients(this.clients_length)
            this.is_loaded = false
        }
        },
        _create_clients: async function(number) {

                let db        = await firebase.database()
                let snapshot  = await db.ref('clients').limitToLast(number).once('value')
                let clients  = await snapshot.val();

                for (let item of Object.entries(clients)) {
                    let key       = item[0]
                    let val       = item[1]
                    let the_date  = new Date(val.createdAt)

                    this.clients.push({
                    id: key,
                    firstName: val.firstName,
                    lastName: val.lastName,
                    email: val.email,
                    phone: val.phone,
                    createdAt: the_date,
                    status: 'created'
                    })
                }

        },
        _item_delete: async function(id, index) {
        let db        = await firebase.database()
        let snapshot  = await db.ref('clients/' + id)

        this.clients.splice(index, 1);
        snapshot.remove()

        },
        _item_edit: function(index) {
        this.clients[index].status = 'updated'
        },
        _item_save: async function(id, index) {

        if (this.firstName !== "" && this.lastName !== "" && this.email !== "" && this.phone !== "") {
            let db        = await firebase.database()
            let snapshot  = await db.ref('clients/' + id)

            snapshot.update({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            createdAt: Date.now(),
            })

            this.clients[index].firstName        = await this.firstName
            this.clients[index].lastName         = await this.lastName
            this.clients[index].email            = await this.email
            this.clients[index].phone            = await this.phone
            this.clients[index].status           = await 'created'

            this.firstName        = await ""
            this.lastName         = await ""
            this.email            = await ""
            this.phone            = await ""
            this.errors           = await []

        } else {
            let new_error = "Your field(s) not to be empty"
            if(!this.errors.includes(new_error)) {
            this.errors.push(new_error)
            }
        }
        },
    },
}
</script>