<template>
	<div>
		<CharScroller class="body"></CharScroller>

		<footer>
			<DialogReader :storyId="1"></DialogReader>
		</footer>
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
.body {
	position:fixed;
	height: 600px;
	width: 99%;
}

footer {
  position: fixed;
  bottom: 0;
  background-color: var(--primary-color);
  width: 99%;
  border-top: solid 2px black;
  padding-top: 4px;
}
</style>