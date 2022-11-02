<template>
  <div id="custom-modal" class="custom-modal active">
    <div class="custom-modal-content">
      <div class="custom-modal-header">
        <span>Create New User</span>
      </div>
      <div class="custom-modal-main">
        <div class="mb-3">
          <label class="m-0">ID:</label>
          <b-form-input
            v-model="registerData.email"
            class="w-100"
          ></b-form-input>
          <p v-if="registerError && registerError.email" class="text-danger">
            {{ registerError.email[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Department:</label>
          <select v-model="registerData.department" class="form-control">
            <option value=""></option>
            <option
              v-for="(userDepartment, index) in userDepartments"
              :key="index"
              :value="userDepartment"
            >
              {{ userDepartment }}
            </option>
          </select>
          <p
            v-if="registerError && registerError.department"
            class="text-danger"
          >
            {{ registerError.department[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Password:</label>
          <b-form-input
            v-model="registerData.password"
            type="password"
            class="w-100"
          ></b-form-input>
          <p v-if="registerError && registerError.password" class="text-danger">
            {{ registerError.password[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Password Confirmation:</label>
          <b-form-input
            v-model="registerData.password_confirmation"
            type="password"
            class="w-100"
          ></b-form-input>
        </div>
      </div>
      <div class="custom-modal-footer">
        <div class="text-right">
          <button class="btn btn-secondary" @click="closeCreateUserModal()">
            Close
          </button>
          <button class="btn btn-primary" @click="onSubmit()">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '~/common/eventBus'
export default {
  props: {},
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        password_confirmation: '',
        department: '',
      },
      registerError: null,
    }
  },

  computed: {
    ...mapGetters(['userDepartments']),
  },

  methods: {
    closeCreateUserModal() {
      eventBus.dispatch('closeCreateUserModal')
    },

    async onSubmit() {
      this.registerError = null

      const result = await this.$store.dispatch(
        'createNewUser',
        this.registerData
      )

      if (!result.status) {
        this.registerError = result.data
      } else {
        this.closeCreateUserModal()
      }
    },
  },
}
</script>

<style></style>
