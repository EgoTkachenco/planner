<template>
  <div class="row" v-if="project">
    <div class="col-12 text-white d-flex align-items-center">
      <div class="h4 text-left d-flex align-items-center">
        <router-link tag="span" :to="{ name: 'Projects' }">
          <img
            src="../assets/svg/arrow-left.svg"
            width="25"
            class="mr-3"
            alt="back"
          />
        </router-link>
        {{ project.title }}
      </div>
      <div class="ml-auto">
        <v-btn @click="showInviteDialog = true" dark text>
          invite user
        </v-btn>
      </div>
    </div>
    <div class="col-4 px-0">
      <projectNavigation></projectNavigation>
    </div>

    <div class="col-8">
      <projectListView></projectListView>
    </div>

     <div class="dialog-overlay" v-if="showInviteDialog">
      <form  @submit.prevent="invite" class="dialog-card p-3 mx-1">
        <div class="close-btn" @click="showInviteDialog = false">+</div>

        <div class="h3 text-center">New List</div>

        <div class="form-group">
          <label for="title">User Email</label>
          <input
            type="email"
            class="form-control text-field"
            id="email"
            required
            autocomplete="off"
            placeholder="Email"
            v-model="inviteEmail"
          />
        </div>
        
        <span v-if="error" class="h4 text-danger mb-5">{{error}}</span>

        <button type="submit" class="btn success-bg  btn-add">
          +
        </button>
      </form>
    </div>

  </div>
</template>

<script>
  import projectNavigation from "../components/projects/project-navigation";
  import projectListView from "../components/projects/project-list-view";
  export default {
    data: () => ({
      showInviteDialog: false,
      socket: null,
      inviteEmail: '',
      error: ''

    }),
    components: {
      projectNavigation,
      projectListView
    },
    computed: {
      project: {
        get() {
          return this.$store.state.projects.activeProject;
        }
      },
    },
    created() {
      this.$store.dispatch('loadProjectLists', this.$route.params.id);
      this.$store.dispatch('joinSocketRoom', this.$route.params.id)
    },
    methods: {
      invite() {
        this.$store.dispatch('inviteUser', {email: this.inviteEmail})
          .then(res => {
            if(res) {
              this.error = res;
            } else {
              this.inviteEmail = null;
              this.showInviteDialog = false;
            }
          });
      }
    },
  };
</script>

<style scoped></style>
