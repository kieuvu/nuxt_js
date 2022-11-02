<template>
  <div id="custom-modal" class="custom-modal active">
    <div class="custom-modal-content">
      <div class="custom-modal-header">
        <span>Update User</span>
      </div>
      <div class="custom-modal-main">
        <div class="mb-3">
          <label class="m-0">ID:</label>
          <b-form-input v-model="updateData.email" class="w-100"></b-form-input>
          <p v-if="updateError && updateError.email" class="text-danger">
            {{ updateError.email[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Department:</label>
          <select v-model="updateData.department" class="form-control">
            <option
              v-for="userDepartment in userDepartments"
              :key="userDepartment.id"
              :value="userDepartment"
            >
              {{ userDepartment }}
            </option>
          </select>
          <p v-if="updateError && updateError.department" class="text-danger">
            {{ updateError.department[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Password:</label>
          <b-form-input
            v-model="updateData.password"
            type="password"
            class="w-100"
          ></b-form-input>
          <p v-if="updateError && updateError.password" class="text-danger">
            {{ updateError.password[0] }}
          </p>
        </div>
        <div class="mb-3">
          <label class="m-0">Password Confirmation:</label>
          <b-form-input
            v-model="updateData.password_confirmation"
            type="password"
            class="w-100"
          ></b-form-input>
          <p
            v-if="updateError && updateError.password_confirmation"
            class="text-danger"
          >
            {{ updateError.password_confirmation[0] }}
          </p>
        </div>
      </div>
      <div class="custom-modal-footer">
        <div class="text-right">
          <button class="btn btn-secondary" @click="toggleUpdateUserModal()">
            Close
          </button>
          <button class="btn btn-primary" @click="onSubmit()">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '~/common/eventBus'
export default {
  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      updateData: {
        email: this.target.email,
        department: this.target.department,
        password: '',
        password_confirmation: '',
      },
      updateError: null,
    }
  },

  computed: {
    ...mapGetters(['userDepartments']),
  },

  methods: {
    toggleUpdateUserModal() {
      eventBus.dispatch('toggleUpdateUserModal')
    },

    async onSubmit() {
      this.updateError = null

      const result = await this.$store.dispatch('updateUser', {
        id: this.target.id,
        data: this.updateData,
      })

      if (!result.status) {
        this.updateError = result.data
      } else {
        this.toggleUpdateUserModal()
      }
    },
  },
}
</script>

<style></style>
