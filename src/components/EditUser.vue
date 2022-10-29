<template>
  <div class="edit-user-view">
    <div class="user-name">
      <h2>{{ user.first_name }} {{ user.last_name }}</h2>
    </div>
    <div class="user-card">
      <img :src="user.avatar" alt="user avatar" class="user-avatar" />
      <div class="user-form">
        <div class="form-item">
          <label for="fname">First name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            v-model="user.first_name"
          />
        </div>
        <div class="form-item">
          <label for="lname">Last name</label>
          <input type="text" id="lname" name="lname" v-model="user.last_name" />
        </div>
        <div class="form-item">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="user.email" />
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click="goBack">Back</button>
      <button @click="saveChanges">Save</button>
    </div>
  </div>
</template>
  
<script>
import { getUser } from "../services/api-call.js";

export default {
  components: {},
  data() {
    return {
      user: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fillUserData() {
      if (this.$route.params.userId) {
        if (localStorage.getItem("userList")) {
          const userList = JSON.parse(localStorage.getItem("userList"));
          this.user = userList.find(
            (user) => user.id == this.$route.params.userId
          );
        } else {
          const user = await getUser(this.$route.params.userId);
          this.user = user;
        }
      }
    },
    saveChanges() {
      if (localStorage.getItem("userList")) {
        const userList = JSON.parse(localStorage.getItem("userList"));
        const userIndex = userList.findIndex((user) => user.id == this.user.id);
        userList[userIndex].first_name = this.user.first_name;
        userList[userIndex].last_name = this.user.last_name;
        userList[userIndex].email = this.user.email;
        localStorage.setItem("userList", JSON.stringify(userList));
      }
      this.$router.push("/user-managment-app/users");
    },
  },
  created() {
    this.fillUserData();
  },
};
</script>
