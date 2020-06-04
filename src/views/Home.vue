<template>
  <div class="row pt-5 nav-margin">
    <app-menu></app-menu>
    
    <div style="display: none" class="col-12">
			<today-tasks></today-tasks>
		</div>
  </div>
</template>

<script>
  import menu from '../components/menu';
  import todayTasks from '../components/tasks/today-tasks';
  export default {
		components: {
      todayTasks,
      'app-menu': menu
		}
  };
</script>

<style scoped>
  .nav-margin {
    margin-top: 75px;
  }
</style>
