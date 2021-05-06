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
export default {
  name: 'NodeDetail',
  props: {
    node: Object,
    isShort: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>