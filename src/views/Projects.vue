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

    <div class="col-12 col-md-4" v-for="(project, id) in projects" :key="id">
      <project-item :project="project" :id="id"></project-item>
    </div>

    <new-project-dialog
      :show="showNewProjectDialog"
      @close="showNewProjectDialog = false"
    ></new-project-dialog>
  </div>
</template>

<script>
  import projectItem from '../components/projects/project-item';
  import newProjectDialog from '../components/projects/new-project-dialog';

  export default {
    name: 'Projects',
    data: () => ({
      name: '',
      showNewProjectDialog: false,
    }),
    components: {
      projectItem,
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
  };
</script>

<style scoped></style>
