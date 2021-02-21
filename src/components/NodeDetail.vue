<template>
  <div>
    <div v-show="isShort">
      <p>This section has {{node.getNumberOfChildren()}} sub-sections</p>
    </div>

    <div v-show="!isShort">
      <p>{{node.description}}</p>
    </div>
  </div>
</template>

<script>
import TreeNode from '../models/TreeNode.js'

export default {
  name: 'NodeDetail',
  props: {
    node: TreeNode,
    isShort: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>