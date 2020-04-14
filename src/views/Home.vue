<template>
  <div class="row pt-5">
    <app-menu></app-menu>
    
    <div class="col-12 mt-5">
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
  
</style>
