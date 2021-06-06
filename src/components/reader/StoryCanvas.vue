<template>
	<div>
		<CharScroller></CharScroller>

		<DialogReader :storyId="1"></DialogReader>
	</div>
</template>

<script>
import CharScroller from './CharScroller.vue'
import DialogReader from './DialogReader.vue'

export default {
	name: 'StoryCanvas',
	components: {
		CharScroller,
		DialogReader
	}
}
</script>

<style lang="css" scoped>

</style>