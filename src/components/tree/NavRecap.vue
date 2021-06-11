<template>
  <div>
    <button class="button button-icon button-primary" @click="save"><font-awesome-icon icon="save" /></button>
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
