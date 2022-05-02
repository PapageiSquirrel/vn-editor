<template>
	<component :is="currentStoryElement"></component>
</template>

<script>
import NavCharacter from './storyElements/NavCharacter'
import NavTrait from './storyElements/NavTrait'
import NavLocation from './storyElements/NavLocation'
import NavTrigger from './storyElements/NavTrigger'

export default {
	name: 'MainCanvas',
	components: {
		NavCharacter,
		NavTrait,
		NavLocation,
		NavTrigger
	},
	props: {
		currentStoryElement: String
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>