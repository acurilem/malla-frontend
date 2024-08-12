import { UserTypes } from "~/models/user/user.model"

export default defineNuxtRouteMiddleware((to) => {
    if (process.server || process.dev) return

    const auth = useAuthStore()
    const roles = to.meta.roles
    if ((roles && roles instanceof Array)) { 
        let rolesUser = auth.getRoles
        const namesRoles = roles.map((rol)=> UserTypes[rol])
        if(!rolesUser?.some((rolUser) => namesRoles.some((nameRol) => rolUser === nameRol)))
        return navigateTo(
            "/",{
                redirectCode: 301,
                external: true
            }
        )
        
    }
})