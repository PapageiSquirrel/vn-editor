<template>
  <div>
    <button @click="save">Save</button>
    <p>{{getSelectedRecap}}</p>
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
<style>
  
</style>
