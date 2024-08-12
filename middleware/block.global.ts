export default defineNuxtRouteMiddleware(async (_to, from) => {
    if ((process.server || useError().value) && process.dev) return;
    //Si no tiene sesion iniciada ignorar
    // Token
    const authStore = useAuthStore();
    if (!authStore.isAuth) return;
    // Fetch
    const runtimeConfig = useRuntimeConfig();
    const statusED = await $fetch<{
      response: boolean;
    }>(`${runtimeConfig.public.authBaseUrl}/api/v1/encuesta-docente/status`, {
      headers: {
        Authorization: authStore.getToken,
      },
    });
  
    if (statusED.response) {
      return navigateTo("/", {
        redirectCode: 301,
        external: true,
      });
    }
    return;
  });