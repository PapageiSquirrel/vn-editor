<template>
  <div>
    <button @click="save">Save</button>
    <p>{{getSelectedRecap}}</p>
  </div>
</template>

<script>
import axios from 'axios';

import Tree from '../models/Tree.js';

export default {
  name: 'NavRecap',
  props: {
    tree: Tree
  },
  computed: {
    getSelectedRecap() {
      return this.tree.getRecap().join(' > ');
    }
  },
  methods: {
    save() {
        axios.post("http://localhost:45050/api/save/trees", this.tree);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
