<template>
  <div id="custom-modal" class="custom-modal active">
    <div class="custom-modal-content">
      <div class="custom-modal-header">
        <span>Delete User</span>
      </div>
      <div class="custom-modal-main">
        <span
          >Do you want to delele
          <i
            ><b>{{ target?.email || '' }}</b></i
          >
          ? This action cant be undo.
        </span>
      </div>
      <div class="custom-modal-footer">
        <div class="text-right">
          <button class="btn btn-secondary" @click="toggleDeleteUserModal()">
            Close
          </button>
          <button class="btn btn-danger" @click="onSubmit()">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '~/common/eventBus'

export default {
  props: {
    target: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    toggleDeleteUserModal() {
      eventBus.dispatch('toggleDeleteUserModal')
    },

    async onSubmit() {
      const result = await this.$store.dispatch('deleteUser', this.target.id)

      if (!result.status) {
        this.deleteError = result.data
      } else {
        this.toggleDeleteUserModal()
      }
    },
  },
}
</script>

<style></style>
