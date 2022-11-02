<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ user.email }}</td>
    <td>{{ user.department }}</td>
    <td>
      <button class="btn btn-danger" @click="toggleDeleteUserModal()">
        Delete
      </button>
      <button class="btn btn-primary" @click="toggleUpdateUserModal()">
        Update
      </button>
    </td>
  </tr>
</template>

<script>
import eventBus from '~/common/eventBus'

export default {
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    toggleUpdateUserModal() {
      eventBus.dispatch('toggleUpdateUserModal', this.user.id)
    },

    toggleDeleteUserModal() {
      eventBus.dispatch('toggleDeleteUserModal', this.user.id)
    },
  },
}
</script>

<style></style>
