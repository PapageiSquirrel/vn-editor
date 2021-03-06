import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faAngleUp, faAngleDown, faTimes, faPlus, faSave, faFileImage, faFileUpload, faHistory, faThumbtack, faEye, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'

library.add(faEdit, faAngleUp, faAngleDown, faTimes, faPlus, faSave, faFileImage, faFileUpload, faHistory, faThumbtack, faEye, faExclamationCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
