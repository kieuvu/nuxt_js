<template>
  <div class="wrapper">
    <!-- Sidebar Holder -->
    <nav id="sidebar" :class="{ active: isSideBarOpen }">
      <div class="sidebar-header">
        <h3>NuxtJS</h3>
        <strong>N</strong>
      </div>

      <ul class="list-unstyled components">
        <li :class="{ active: $route.name == 'index' }">
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <li :class="{ active: $route.name == 'users' }">
          <NuxtLink to="/users"> User </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Page Content Holder -->
    <div id="content">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header d-flex justify-content-between w-100">
            <button
              id="sidebarCollapse"
              type="button"
              class="btn btn-info navbar-btn"
              @click="isSideBarOpen = !isSideBarOpen"
            >
              <i class="bx bx-menu-alt-left"></i>
            </button>
            <button
              id="sidebarCollapse"
              type="button"
              class="btn btn-info navbar-btn"
              @click="logout()"
            >
              {{loggingUser && loggingUser.details.user.email }}
              <i class="bx bx-log-out"></i>
            </button>
          </div>
        </div>
      </nav>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: ['isAuth', 'isAdmin'],

  data() {
    return {
      isSideBarOpen: true,
    }
  },

  computed:{
    ...mapGetters(["loggingUser"]),
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
    },
  },
}
</script>

<style>
body {
  font-family: Helvetica, Arial, sans-serif;
  background: #fafafa;
}

p {
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

i,
span {
  display: inline-block;
}

.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header strong {
  display: block;
}

#sidebar ul li a {
  text-align: left;
  color: white;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

#sidebar.active ul ul a {
  padding: 10px !important;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar .sidebar-header strong {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: white;
  background: #7386d5;
}
#sidebar ul li a i {
  margin-right: 10px;
}

#sidebar ul li.active > a,
a[aria-expanded='true'] {
  color: #7386d5;
  background: white;
}

#content {
  padding: 20px;
  min-height: 100vh;
  width: 100vw;
  transition: all 0.3s;
}

@media (max-width: 1023px) {
  #sidebar {
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    margin-left: -80px !important ;
  }
  a[aria-expanded='false']::before,
  a[aria-expanded='true']::before {
    top: auto;
    bottom: 5px;
    right: 50%;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }
  #sidebar.active {
    margin-left: 0 !important;
  }

  #sidebar .sidebar-header h3,
  #sidebar .CTAs {
    display: none;
  }

  #sidebar .sidebar-header strong {
    display: block;
  }

  #sidebar ul li a {
    padding: 20px 10px;
  }

  #sidebar ul li a span {
    font-size: 0.85em;
  }
  #sidebar ul li a i {
    margin-right: 0;
    display: block;
  }

  #sidebar ul ul a {
    padding: 10px !important;
  }

  #sidebar ul li a i {
    font-size: 1.3em;
  }
  #sidebar {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}
</style>
