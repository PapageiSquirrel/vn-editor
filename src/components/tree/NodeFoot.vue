<template>
	<div>
		<h4>{{node.title && node.title + "'s' END" || "Title's END"}}</h4>
	</div>
</template>

<script>
export default {
	name: 'NodeFoot',
	props: {
		node: Object,
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>