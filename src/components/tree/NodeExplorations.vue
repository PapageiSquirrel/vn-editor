<template>
	<v-card>
		<v-card-title>Explorations</v-card-title>

		<v-card-text>
			<v-list>
				<v-list-item v-for="exp in explorations" :key="exp.id">
					<v-card>
						<v-card-title>
							<TitleInput :title="exp.location" 
								:titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" 
								:isClickEdit="false" @save="exp.location = $event"></TitleInput>
						</v-card-title>
				
						<v-card-text>
							<v-list>
								<v-list-item>Conversations</v-list-item>
								<v-divider></v-divider>
								<v-list-item v-for="con in exp.conversations" :key="con.id">
									<v-list-content>
										<v-container>
											<v-row dense>
												<v-select v-model="con.characters" :items="characters" item-text="name" item-value="name" label="Character" /><!-- TODO: multi select ? -->
											</v-row>	
										</v-container>
									</v-list-content>
								</v-list-item>
							</v-list>

							<v-list>
								<v-list-item>Actions</v-list-item>
								<v-divider></v-divider>
								<v-list-item v-for="act in exp.actions" :key="act.id">
									
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-list-item>
			</v-list>
		</v-card-text>

		<v-card-actions>
			<v-btn @click="add">Add Exploration</v-btn>
		</v-card-actions>
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData.js'
import ListInput from '../generic/ListInput.vue'

export default {
	name: 'NodeExplorations',
	mixins: [
		NavData
	],
	components: {
		ListInput
	},
	data() {
		return {
			collection: "explorations",
			keepCache: true,
			clearCache: true
		}
	},
	computed: {
		triggers() {
			return this.loadedData;
		}
	},
	destroyed() {
		this.save();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>