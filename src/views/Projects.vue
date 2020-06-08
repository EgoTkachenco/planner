<template>
  <div class="row pt-5">
    <div class="col-12 text-white d-flex align-items-center">
      <div class="h4 text-left d-flex align-items-center">
        <router-link tag="span" :to="{ name: 'Home' }">
          <img
            src="../assets/svg/Home.svg"
            width="25"
            class="mr-3"
            alt="back"
          />
        </router-link>
        Projects
      </div>
      <div class="ml-auto" v-if="!showNewProjectDialog">
        <v-btn @click="showNewProjectDialog = true" text class="text-white">
          ADD
        </v-btn>
      </div>
    </div>

    <div class="col-12 col-md-4" v-for="(project, index) in projects" :key="index">
      <router-link :to="{ path: `/project/${project._id}` }" tag="div" class="list-card my-2 p-2">
        <div class="d-flex align-items-center">
          <span class="h4">{{project.title}}</span>
        </div>
      </router-link>
    </div>

    <new-project-dialog
      :show="showNewProjectDialog"
      @close="showNewProjectDialog = false"
    ></new-project-dialog>
  </div>
</template>

<script>
  import newProjectDialog from '../components/projects/new-project-dialog';

  export default {
    name: 'Projects',
    data: () => ({
      name: '',
      showNewProjectDialog: false,
    }),
    components: {
      newProjectDialog,
    },
    computed: {
      projects: {
        get() {
          return this.$store.state.projects.projects;
        },
      },
    },
    methods: {},
    created() {
      this.$store.dispatch('loadProjects');
    }
  };
</script>

<style scoped>
  .list-card {
    background: rgb(36, 35, 51);
    border-radius: 10px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
</style>
