<template>
  <div>
    <div :style="{ backgroundColor: backgroundColor }">
      <h3><TitleInput :title="node.title" :isClickEdit="true" @save="saveTitle" @select="selectNode"></TitleInput></h3>
    </div>
    <div v-if="node.isOption">
      <v-select v-model="node.traitChange" :items="traits" style="margin-left: 5%; margin-right: 5%;" placeholder="Trait to change" />
      <v-text-field type="number" v-model="node.traitValue" hide-details single-line style="margin-left: 5%; margin-right: 5%;" />
    </div>
    <button class="button button-white" v-show="isDeleteAllowed" v-on:click="deleteChild()"><font-awesome-icon icon="times" /></button>
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
    traits: Array,
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