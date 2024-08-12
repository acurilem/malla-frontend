import { ofetch } from 'ofetch';
import { useLoadingStore } from '~/store/loadingStore';

export default defineNuxtPlugin((nuxtApp) => {
  const loadingStore = useLoadingStore()
  globalThis.$fetch = ofetch.create({
    onRequest ({ request, options }) {
        loadingStore.startLoading()
        const token = useAuthStore().getToken
        if (token) {
            options.headers = { 
              Authorization: `Bearer ${token}` 
            }
            console.log(options)
        } /*else {
            useRouter().push("/login")
            console.log('Not authenticated')
        }
        */
       
    },
    onRequestError ({ error }) {
      console.error(error)
    },
    onResponse({ request, response, options }) {
        loadingStore.stopLoading()
    },
    onResponseError({ request, options, response }){
        loadingStore.stopLoading()
        if(response.status == 401){
            useAuthStore().logOut()
            useRouter().push("/login")
        }
    },
  })
  return {
    provide: {
        fetchService: globalThis.$fetch,
    },
  };
})