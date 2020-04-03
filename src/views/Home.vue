<template>
  <div class="row pt-5">
    <div class="col-12 text-left h1">
      <img :src="user.img" class="avatar mr-2" alt="avatar" />
      Hello {{ user.name.split(' ')[0] }}
    </div>

    <div class="col-6">
      <router-link tag="div" :to="{ name: 'Todo' }" class="home-card px-2 py-3">
        <img src="../assets/svg/list.svg" width="30" class="mr-3" alt="list" />
        Tasks
      </router-link>
    </div>
    <div class="col-6">
      <router-link
        tag="div"
        :to="{ name: 'ShopList' }" class="home-card px-2 py-3">
        <img
          src="../assets/svg/shop-cart.svg"
          width="30"
          class="mr-3"
          alt="shop cart"
        />
        Shop List
      </router-link>
    </div>
    <div class="col-6 mt-2">
      <router-link
        tag="div"
        :to="{ name: 'Calendar' }"
        class="home-card px-2 py-3"
      >
        <img
          src="../assets/svg/calendar.svg"
          width="30"
          class="mr-3"
          alt="calendar"
        />
        Calendar
      </router-link>
    </div>

		<div class="col-6 mt-2">
      <router-link
        tag="div"
        :to="{ name: 'Plan' }"
        class="home-card px-2 py-3"
      >
        <img
          src="../assets/svg/plan.svg"
          width="30"
          class="mr-3"
          alt="calendar"
        />
        Plan
      </router-link>
    </div>

    <div class="col-12 mt-2">
      <router-link
        tag="div"
        :to="{ name: 'Projects' }"
        class="home-card px-2 py-3"
      >
        <!-- <img
          src="../assets/svg/plan.svg"
          width="30"
          class="mr-3"
          alt="calendar"
        /> -->
        Projects
      </router-link>
    </div>

    <div class="col-12">
			<today-tasks></today-tasks>
		</div>
  </div>
</template>

<script>
  import todayTasks from '../components/tasks/today-tasks';
  export default {
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
		},
		components: {
			todayTasks
		}
  };
</script>

<style scoped>
  .home-card {
    background: rgb(36, 35, 51);
    border-radius: 10px;
    text-align: start;
    display: flex;
    align-items: center;
    font-size: 25px;
  }
  .avatar {
    width: 75px;
    border-radius: 50%;
  }
</style>
