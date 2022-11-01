<template>
  <div>
    <!-- Logo -->
    <div class="text-right">
      <img style="max-height: 40px" src="~/assets/images/nuxtlogo.png" alt="" />
    </div>

    <!-- User Id -->
    <div>
      <label class="m-0">ID:</label>
      <b-form-input
        v-model="loginData.email"
        style="width: 400px"
      ></b-form-input>
      <p v-if="error && error.email" class="text-danger">
        {{ error.email[0] }}
      </p>
    </div>

    <!-- User password -->
    <div class="my-3">
      <label class="m-0">Password:</label>
      <b-form-input
        v-model="loginData.password"
        style="width: 400px"
        type="password"
      ></b-form-input>
      <p v-if="error && error.password" class="text-danger">
        {{ error.password[0] }}
      </p>
      <p v-if="error && error.message" class="text-danger">
        {{ error.message[0] }}
      </p>
    </div>

    <!-- Submit -->
    <div>
      <b-button @click="onSubmit()">Submit</b-button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['guess'],
  data() {
    return {
      loginData: {
        email: null,
        password: null,
      },
      error: null,
    }
  },
  methods: {
    onSubmit: async function () {
      const result = await this.$store.dispatch('login', this.loginData)
      if (!result.status) {
        this.error = result.data
      }
    },
  },
}
</script>
