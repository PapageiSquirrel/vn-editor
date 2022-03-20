<template>
  <div>
    <v-btn class="button button-icon button-primary" fab @click="save"><font-awesome-icon icon="save" /></v-btn>
    <b>{{getSelectedRecap}}</b>
  </div>
</template>

<script>
export default {
  name: 'NavRecap',
  props: {
    tree: Object
  },
  computed: {
    getSelectedRecap() {
      return this.tree && this.tree.getRecap().join(' > ');
    }
  },
  methods: {
    save() {
      this.$emit("save", this.tree);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 10px;
}
</style>
