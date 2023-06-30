<template>
  <v-card v-for="list in toDoLists" :key="list.id">
    <v-card-title>{{ list.title }}</v-card-title>
  </v-card>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
    };
  },
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
