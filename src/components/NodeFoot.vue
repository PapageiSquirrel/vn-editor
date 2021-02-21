<template>
  <div>
    <h3>{{node.title && node.title + " END" || "Title END"}}</h3>
  </div>
</template>

<script>
import TreeNode from '../models/TreeNode.js'

export default {
  name: 'NodeFoot',
  props: {
    node: TreeNode,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>