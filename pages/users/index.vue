<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="form-group">
        <select v-model="currentDepartment" class="form-control">
          <option value="">Department</option>
          <option
            v-for="(userDepartment, index) in userDepartments"
            :key="index"
            :value="userDepartment"
          >
            {{ userDepartment }}
          </option>
        </select>
      </div>
      <div>
        <b-button
          variant="success"
          @click="isCreateUserModalOpen = !isCreateUserModalOpen"
          >Create New <i class="bx bxs-plus-circle"></i
        ></b-button>
      </div>
    </div>
    <div>
      <UserTable :department="currentDepartment"></UserTable>
    </div>
    <RegisterModal v-if="isCreateUserModalOpen"></RegisterModal>
    <UpdateModal
      v-if="isUpdateUserModalOpen"
      :target="getTargetUser"
    ></UpdateModal>
    <DeleteModal
      v-if="isDeleteUserModalOpen"
      :target="getTargetUser"
    ></DeleteModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '~/common/eventBus'
import RegisterModal from '~/components/Admin/User/Modals/RegisterModal.vue'
import UpdateModal from '~/components/Admin/User/Modals/UpdateModal.vue'
import DeleteModal from '~/components/Admin/User/Modals/DeleteModal.vue'
import UserTable from '~/components/Admin/User/Table/UserTable.vue'

export default {
  components: {
    RegisterModal,
    UpdateModal,
    DeleteModal,
    UserTable,
  },
  layout: 'admin',

  data() {
    return {
      currentDepartment: '',
      isCreateUserModalOpen: false,
      isUpdateUserModalOpen: false,
      isDeleteUserModalOpen: false,
      userActionId: null,
    }
  },

  async fetch(context) {
      await context.store.dispatch('fetchUserAccounts')
      await context.store.dispatch('fetchUserDepartments')
  },

  computed: {
    ...mapGetters(['userAccounts', 'userDepartments']),

    getTargetUser() {
      return this.userAccounts.filter(
        (user) => user.id === this.userActionId
      )[0]
    },
  },

  mounted: function () {
    eventBus.on('closeCreateUserModal', () => {
      this.isCreateUserModalOpen = !this.isCreateUserModalOpen
    })

    eventBus.on('toggleUpdateUserModal', (id) => {
      this.userActionId = id || null
      this.isUpdateUserModalOpen = !this.isUpdateUserModalOpen
    })

    eventBus.on('toggleDeleteUserModal', (id) => {
      this.userActionId = id || null
      this.isDeleteUserModalOpen = !this.isDeleteUserModalOpen
    })
  },

  beforeDestroy() {
    eventBus.remove('closeCreateUserModal')
    eventBus.remove('toggleUpdateUserModal')
    eventBus.remove('toggleDeleteUserModal')
  },

  methods: {
    getUsetData: function (id) {
      const user = this.userAccounts.filter((account) => {
        return account.id === id
      })

      return user[0]
    },
  },
}
</script>
