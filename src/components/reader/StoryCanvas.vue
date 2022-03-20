<template>
	<v-main>
		<CharScroller class="body"></CharScroller>

		<footer>
			<DialogReader :storyId="1"></DialogReader>
		</footer>
	</v-main>
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