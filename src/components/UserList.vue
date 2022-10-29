<template>
  <div>
    <div class="user-list-container">
      <div class="title-container">
        <h1>Memebers</h1>
        <!-- <router-link to="user-managment-app/users/create-user">
          <p>Add New</p>
        </router-link> -->
      </div>
      <table class="user-list">
        <tr>
          <th>Avatar</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th></th>
        </tr>
        <p v-if="!userList.length" class="empty-message">
          There are no members in sight...
        </p>
        <tr v-for="user in userList" :key="user.id">
          <td><img :src="user.avatar" alt="avatar" class="user-avatar" /></td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td class="list-button-container">
            <router-link :to="`/user-managment-app/users/${user.id}`" class="edit-user-button">
              <p>Edit</p>
            </router-link>
            <button @click="deleteUser(user.id)" class="delete-user-button">
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
  
<script>
import { getUserList } from "../services/api-call.js";

import Logo from "../assets/icons/logo.png";

export default {
  components: {},
  data() {
    return {
      icons: {
        Logo,
      },
      userList: [],
    };
  },
  methods: {
    async fillUserList() {
      if (localStorage.getItem("userList")) {
        const users = JSON.parse(localStorage.getItem("userList"));
        this.userList = users;
      } else {
        const users = await getUserList(1); //TODO
        this.userList = users;
        localStorage.setItem("userList", JSON.stringify(this.userList));
      }
    },
    deleteUser(userId) {
      const index = this.userList.findIndex((user) => user.id == userId);
      if (index > -1) {
        this.userList.splice(index, 1);
        localStorage.setItem("userList", JSON.stringify(this.userList));
      }
    },
  },
  async created() {
    await this.fillUserList();
  },
};
</script>