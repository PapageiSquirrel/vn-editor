<template>
	<ListSelectInput :elements="conditions" :elType="'condition'" :elKey="'trait'" :elLabel="'New Condition'" :elList="traits.map(t => t.name)" :isUnique="true">
		<template v-slot:default="slotProps">
			<v-card-text>
				<v-slider 
					v-model="stepIndex[slotProps.element.trait]"
					:tick-labels="getSteps(slotProps.element.trait)" 
					@change="setStepValue(slotProps.element, stepIndex[slotProps.element.trait])" 
					ticks="always" 
					step="1" 
					tick-size="2" 
					:max="getSteps(slotProps.element.trait).length-1"
					style="width:80%; margin-left: 5%; margin-right: 5%;">
				</v-slider>
			</v-card-text>
		</template>
	</ListSelectInput>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../../../services/CacheService'

import ListSelectInput from '../../generic/ListSelectInput'

export default {
	name: 'NodeCondition',
	props: {
		conditions: Array
	},
	components: {
		ListSelectInput
	},
	data() {
		return {
			stepIndex: {},
			traits: []
		}
	},
	methods: {
		getSteps(traitSelected) {
			let trait = this.traits.find(t => t.name === traitSelected);
			if (!trait) {
				return [];
			}

			return trait.steps.map(s => s.name).reverse();
		},
		setStepValue(condition, stepIndex) {
			if (!condition) {
				return;
			}

			let trait = this.traits.find(t => t.name === condition.trait);
			if (!trait) {
				return;
			}

			let step = trait.steps.slice().reverse()[stepIndex];
			if (!step) {
				return;
			}

			condition.value = step.value;
		},
	},
	created() {
		let storyTraits = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_TRAITS);
		this.traits = storyTraits || [];
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>