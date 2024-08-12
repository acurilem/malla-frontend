import axios from "axios";
import useAuthStore from "~/stores/useAuthStore";
import { useLoadingStore } from '~/store/loadingStore';
import { useUserStore } from '~/stores/userStore';

export default defineNuxtPlugin((nuxtApp) => {
    const loadingStore = useLoadingStore();
    const userStore = useUserStore()
    const instance = axios.create({
        baseURL: "",
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(function (config) {
        loadingStore.startLoading()
        const token = useAuthStore().getToken
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
         return config;
        }, function (error) {
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use(
        (response) => {
          loadingStore.stopLoading()
          return response;
        },
        async (error) => {
            loadingStore.stopLoading()
            /*
          loadingStore.stopLoading()
          const originalConfig = error.config;
          if (error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
              originalConfig._retry = true;
              let refresh = useAuthStore().getRefreshToken
              if(refresh){
                  loadingStore.startLoading()
                  await axios.post(nuxtApp.$config.public.backBaseUrl+"/auth/refresh", {"refresh_token":refresh})
                  .then((r) => {
                      useAuthStore().setAuth(r.data)
                      originalConfig.headers['Authorization'] = 'Bearer ' + r.data.token;
                      return axios.request(originalConfig);
                  })
                  .catch(() => {
                      useRouter().push("/logout")
                  })
                  .finally(() => loadingStore.stopLoading())
              return instance(error.config);
            }
            else{
                useRouter().push("/logout")
            }
          } 
          else{
           return Promise.reject(error);
          }
      
          return Promise.reject(error);
            }
        */}
    );
    // Add a response interceptor

    /*
    instance.interceptors.response.use(function (response) {
        loadingStore.stopLoading()
        return response;
    }, async function (error) {
        loadingStore.stopLoading()
        const originalRequest = error.config;
        if(error.response.status==401){ // Error por no tener autorización
            originalRequest._retry = true;
            let refresh = authService.getRefreshToken()
            if(refresh){
                loadingStore.startLoading()
                await axios.post(nuxtApp.$config.public.backBaseUrl+"/auth/refresh", {"refresh_token":refresh})
                .then((r) => {
                    authService.setToken(r.data.token)
                    authService.setUser(r.data.user)
                    authService.setRefreshToken(r.data.refreshToken)
                    //error.config.headers['Authorization'] = 'Bearer ' + r.data.token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + r.data.token;
                    console.log('aca')
                    console.log(originalRequest);
                    console.log('Y aca')
                    ////return instance(originalRequest);
                    return axios.request(originalRequest)
                    //return instance.request(originalRequest);
                })
                .catch(() => {
                    useRouter().push("/logout")
                })
                .finally(() => loadingStore.stopLoading())
            }
            else{
                useRouter().push("/logout")
            }
            
        }
        return Promise.reject(error)
    });*/
    return {
        provide: {
            axiosService: instance,
        },
    };
});