import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faAngleUp, faAngleDown, faTimes, faPlus, faSave, faFileImage, faFileUpload, faTv, faScroll, faBrain, faUserPlus, faMap,
  faPuzzlePiece, faCodeBranch, faHistory, faThumbtack, faEye, faExclamationCircle, faBookReader, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'

library.add(faEdit, faAngleUp, faAngleDown, faTimes, faPlus, faSave, faFileImage, faFileUpload, faTv, faScroll, faBrain, faUserPlus, faMap,
  faPuzzlePiece, faCodeBranch, faHistory, faThumbtack, faEye, faExclamationCircle, faBookReader, faToolbox)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
