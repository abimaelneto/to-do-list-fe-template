<template>
  <h3 class="text-h3 mb-5">Welcome</h3>
  <v-form @submit.prevent class="w-100 pa-5">
    <v-text-field label="Email" v-model="email" :rules="[required]" />
    <v-text-field
      label="Password"
      type="password"
      v-model="password"
      :rules="[required]"
    />

    <v-row>
      <v-col cols="6">
        <v-btn block color="grey-darken-3" @click="handleSubmit">Login</v-btn>
      </v-col>
      <v-col cols="6">
        <router-link to="/register">
          <v-btn block variant="outlined" color="grey-darken-3">Register</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import required from "@/utils/validation/required";
import { authApiMixin } from "@/api/auth";
import { emailRegex } from "@/utils/validation/email.js";
import { setupPrivateApi } from "@/api";
export default {
  mixins: [authApiMixin],
  data() {
    return {
      email: "",
      password: "",
      required,
      emailRegex,
    };
  },
  methods: {
    validateEmail(string) {
      return this.emailRegex.test(string);
    },
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      console.log(payload);

      try {
        const { data } = await this.login(payload);
        const { access_token } = data;
        setupPrivateApi(access_token);
        localStorage.setItem("access_token", access_token);
        console.log(access_token);
        this.$router.push("/dashboard");
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
};
</script>
