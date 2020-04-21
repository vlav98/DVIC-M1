<template>
    <div class="fullscreen container">
        <div class="columns">
            <div class="column">
                <h1 class="title">Projects</h1>
            </div>
            <div class="column">
                <router-link to="new-project" class="button is-primary">Create a project</router-link>
            </div>
        </div>
        <div v-if="this.is_loaded === true">
            <loader />
        </div>
        <div v-else>
            <div class="projects">
            <div class="errors alert alert-danger" v-for="(error, k) in errors" :key="k">
                {{error}}
            </div>
            <div v-if="projects.length > 0">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(project, k) in projects" :key="k">
                        <td v-if="project.status !== 'created'">
                            <input v-model="title" type="text" placeholder="title" id="title" name="title" />
                        </td>
                        <td v-else>
                            {{project.title}}
                        </td>

                        <td v-if="project.status !== 'created'">
                            <input v-model="budget" type="text" placeholder="budget" id="budget" name="budget" />
                        </td>
                        <td v-else>
                            {{project.budget}}
                        </td>

                        <td>{{project.createdAt.getFullYear()}} / {{project.createdAt.getMonth() + 1}} / {{project.createdAt.getDate()}} - {{project.createdAt.getHours()}}:{{project.createdAt.getMinutes()}}:{{project.createdAt.getSeconds()}}</td>

                        <td v-if="project.status !== 'created'">
                            <button class="button" @click="_item_save(project.id, k)">Save</button>
                        </td>
                        <td v-else>
                            <div class="buttons">
                                <button class="button" @click="_item_edit(k)">
                                    Edit
                                </button>
                                <button class="button" @click="_item_delete(project.id, k)">
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
                There is no projects for now
            </div>

            </div>
        </div>
    </div>
</template>
<script>
import * as firebase from "firebase/app";
import Loader from "../../components/Loader";

export default {
    name: "projects",
    data() {
        return {
        projects: [],
        errors: [],
        title: '',
        budget: '',
        title: '',
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
        let snapshot        = await db.ref('projects').once('value')
        let projects         = await snapshot.val();
        let array           = []

        for (let item of Object.entries(projects)) {
            array.push(item)
        }
        let clients_length = array.length
        let diff           = clients_length - this.clients_length

        if(this.clients_length > 0) {
            this.projects        = []
            this.clients_length = this.clients_length + diff
            this._create_clients(this.clients_length)
            this.is_loaded = false
        }
        },
        _create_clients: async function(number) {

                let db        = await firebase.database()
                let snapshot  = await db.ref('projects').limitToLast(number).once('value')
                let projects  = await snapshot.val();

                for (let item of Object.entries(projects)) {
                    let key       = item[0]
                    let val       = item[1]
                    let the_date  = new Date(val.createdAt)

                    this.projects.push({
                    id: key,
                    title: val.title,
                    description: val.description,
                    budget: val.budget,
                    createdAt: the_date,
                    status: 'created'
                    })
                }

        },
        _item_delete: async function(id, index) {
        let db        = await firebase.database()
        let snapshot  = await db.ref('projects/' + id)

        this.projects.splice(index, 1);
        snapshot.remove()

        },
        _item_edit: function(index) {
        this.projects[index].status = 'updated'
        },
        _item_save: async function(id, index) {

        if (this.title !== "" && this.budget !== "" && this.title !== "" && this.phone !== "") {
            let db        = await firebase.database()
            let snapshot  = await db.ref('projects/' + id)

            snapshot.update({
            title: this.title,
            description: this.description,
            budget: this.budget,
            phone: this.phone,
            createdAt: Date.now(),
            })

            this.projects[index].title        = await this.title
            this.projects[index].budget         = await this.budget
            this.projects[index].title            = await this.title
            this.projects[index].phone            = await this.phone
            this.projects[index].status           = await 'created'

            this.title        = await ""
            this.budget         = await ""
            this.title            = await ""
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