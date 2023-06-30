<template>
  <h3 class="text-h3 mb-5">Sign Up</h3>
  <v-form @submit.prevent class="w-100 pa-5">
    <v-text-field label="Username" v-model="username" />
    <v-text-field label="Email" v-model="email" />
    <v-text-field
      label="Password"
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="passwordIcon"
      @click:append-inner="toggleShowPassword"
      :rules="[required]"
    />
    <v-text-field
      label="Password Confirmation"
      v-model="passwordConfirmation"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="passwordIcon"
      @click:append-inner="toggleShowPassword"
    />

    <v-row>
      <v-col cols="6">
        <v-btn block color="grey-darken-3" @click="handleSubmit"
          >Register</v-btn
        >
      </v-col>
      <v-col cols="6">
        <router-link to="/login">
          <v-btn variant="text" block color="grey-darken-3"
            >I already have an account</v-btn
          >
        </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import required from "@/utils/validation/required";
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      showPassword: false,
      required,
    };
  },
  computed: {
    passwordIcon() {
      return this.showPassword ? "mdi-eye-outline" : "mdi-eye-off-outline";
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      try {
        await this.register(payload);
        alert("Usuário criado com sucesso");
        this.$router.push("/login");
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor! Tente novamente mais tarde");
        } else {
          alert("Algo deu errado. Pedimos desculpas pela incompetência!");
        }
      }
    },
  },
};
</script>
