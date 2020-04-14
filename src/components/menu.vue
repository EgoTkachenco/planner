<template>
  <nav :class="{ active: collapsed }">
    <div class="logo">
      <img src="../assets/logo-p.svg" alt="logo-vue" width="200" height="75" />
    </div>

    <div class="menu">
      <router-link
        :to="{ name: 'Todo' }"
        class="nav-link"
        :event="collapsed ? 'click' : ''"
      >
        <img src="../assets/svg/list.svg" width="25" class="mr-3" alt="list" />
        Tasks

        <div class="warning-tasks">3</div>
      </router-link>
      <router-link
        :to="{ name: 'ShopList' }"
        class="nav-link"
        :event="collapsed ? 'click' : ''"
      >
        <img
          src="../assets/svg/shop-cart.svg"
          width="25"
          class="mr-3"
          alt="shop cart"
        />
        Shop List
      </router-link>

      <router-link
        :to="{ name: 'Plan' }"
        class="nav-link"
        :event="collapsed ? 'click' : ''"
      >
        <img
          src="../assets/svg/plan.svg"
          width="25"
          class="mr-3"
          alt="calendar"
        />
        Plan
      </router-link>

      <router-link
        :to="{ name: 'Projects' }"
        class="nav-link"
        :event="collapsed ? 'click' : ''"
      >
        <img src="../assets/svg/list.svg" width="25" class="mr-3" alt="list" />
        Projects
      </router-link>
    </div>

    <div class="toggle-btn" @click="collapsed = !collapsed">
      <span></span>
      <span></span>
      <span></span>
      <div class="active">+</div>
    </div>
  </nav>
</template>

<script>
  export default {
    data: () => ({
      collapsed: false,
    }),
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
    },
  };
</script>

<style scoped>
  .avatar {
    width: 75px;
    border-radius: 50%;
  }
  nav {
    background: rgb(33, 33, 47);
    z-index: 100;
    height: 85px;
    padding: 5px 10px;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
		flex-direction: column;
  }
  .nav-link {
    position: relative;
    text-align: start;
    align-items: center;
    font-size: 25px;
    color: white;
    opacity: 0;
    display: flex;
  }
	.menu {
		display: none;
	}
	nav.active .menu {
		display: flex;
		flex-direction: row;
	}
  nav.active {
    height: auto;
  }
  nav.active .nav-link {
    align-self: flex-end;
    transition: 1s opacity;
    opacity: 1;
  }
  .toggle-btn {
    position: absolute;
    top: 20px;
    height: 30px;
    width: 40px;
    right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }
  .toggle-btn .active {
    transform: rotate(45deg);
    font-size: 2.5rem;
    line-height: 50px;
    display: none;
  }
  .toggle-btn span {
    width: 80%;
    height: 2px;
    display: block;
    background: #ffffff;
  }
  .active .toggle-btn span {
    display: none;
  }
  .active .toggle-btn .active {
    display: block;
  }
  .warning-tasks {
    position: absolute;
    right: -5px;
    top: -5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 0.9rem;
    background: #b71c1c;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 800px) {
    nav.active .menu {
			flex-direction: column;
    }
    nav.active .nav-link {
      align-self: center;
    }
  }
</style>
