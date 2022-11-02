<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Department</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <TableRow
        v-for="(user, index) in filteredUsers"
        :key="user.id"
        :user="user"
        :index="index"
      ></TableRow>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import TableRow from './TableRow.vue'
export default {
  components: {
    TableRow,
  },
  props: {
    department: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters(['userAccounts']),

    filteredUsers() {
      let filtered = this.userAccounts
      if (this.department !== '') {
        filtered = this.userAccounts.filter((user) => {
          return user.department === this.department
        })
      }
      return filtered
    },
  },
}
</script>

<style></style>
