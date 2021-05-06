<template>
  <div>
    <div :style="{ backgroundColor: backgroundColor }">
      <h3><TitleInput :title="node.title" :isClickEdit="true" @save="saveTitle" @select="selectNode"></TitleInput></h3>
    </div>
    <button class="button button-white" v-show="isDeleteAllowed" v-on:click="deleteChild()">Delete</button>
  </div>
</template>

<script>
import TitleInput from '../generic/TitleInput.vue';

export default {
  name: 'NodeHead',
  components: {
    TitleInput
  },
  props: {
    node: Object,
    isEnlarged: Boolean,
    isSelected: Boolean,
    backgroundColor: String
  },
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    isDeleteAllowed: function() {
      return !this.node.isTrunk && !this.node.hasChildren && !this.isSelected;
    }
  },
  methods: {
    selectNode() {
      this.$emit("onNodeSelection", []);
    },
    saveTitle(title) {
      this.node.title = title;
      this.isEditing = false;
    },
    deleteChild() {
      this.$emit("onNodeDelete", this.node.index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>