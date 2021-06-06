<template>
	<div class="modal-backdrop">
		<div class="modal">
			<img :src="require(`@/assets/${assetUrl}`)" />
			<button @click="close">close</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PreviewModal',
	props: {
		assetUrl: String
	},
	methods: {
		close() {
			this.$emit('close');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
	max-width: 600px;
	max-height: 300px
}
</style>