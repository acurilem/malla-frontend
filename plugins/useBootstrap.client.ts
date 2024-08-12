//import 'bootstrap/dist/js/bootstrap.js'

import * as bootstrap from 'bootstrap'
//import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
//import "bootstrap";


export default defineNuxtPlugin((nuxtApp) => {
    //nuxtApp.vueApp.use(bootstrap)
    return {
        provide: {
            bootstrap: bootstrap
        }
    }
})