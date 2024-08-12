# Template

## Guía inicio

### Docker

Corra el aplicativo con el comando para producción:

```bash
docker compose up
```

Corra para desarrollo:

```bash
npm run dev
```

### Sesión

La arquitectura propuesta para esta aplicación se basa principalmente en micro-frontends. Por esto mismo se realizó una implementación a nivel de sesión con el proposito de mantenerla viva alrededor de todos los multiples micro-frontends.

El flujo está construido en base a dos herramientas:

- `Nuxt-Session`: Middleware de sesión para conservar datos del usuario en todas las solicitudes.
- `Pinia`: Vue Store para manejar estado global de la aplicación.

Mientras que `Nuxt-Session` permite manejar, a nivel práctico, datos del usuario por medio de multiples almacenes configurables, a los cuales accede por medio de la identificación del usuario, generalmente por cookies.

`Pinia` permite exponer una API, por medio de la declaración de una `PiniaStore`, a la cual se le cargan estos datos provenientes de `Nuxt-Session`, es decir, los datos del usuario, y pueden ser facilmente accedidos por medio de dicha Store.

#### Flujo sesión

1. Antes de nada, Nuxt-Session captura la sesión del usuario, en este caso de la Cookie, luego, va al almacén que se configuró (por defecto `Memory`) y se trae los datos del usuario anteriormente seteados.

2. Actualmente, existe un middleware programado en `middleware/auth.global.ts` de este mismo template. Este middleware captura todas las peticiones, hace llamado de `Nuxt-Session` con `useSession()` y ver qué datos están dentro de la sesión del usuario.

3. Hace un llamado a nuestra Store de autenticación del usuario, con `useAuthStore()`, y hace un set de los datos cargados por `Nuxt-Session` de la sesión.

4. Puede comenzar a usar la auth Store dentro de todo el aplicativo con `useAuthStore()`.

Como puede ver, este flujo permite manejar la sesión del usuario a nivel de todos los micro-frontends. Esto ya que la sesión se guarda en un almacén común, y para acceder a él se identifica la sesión del usuario con una Cookie, la cual vive dentro de un dominio, como `ejemplo.cl`, compartiendose así todos los recursos grabados en caché por todos los servidores.
por ejemplo

#### Uso

Ejemplos del uso de la sesión son por ejemplo:

```vue
<script setup>
// Store
const authStore = useAuthStore()
</script>

<template>
    <div>
        <p v-if="authStore.userRoleIs('admin')">Este texto solo lo puede ver el admin</p>
        <p v-if="authStore.userRoleIs('student')">Este texto solo lo puede ver un estudiante</p>
        <p v-if="authStore.isAuth">Este texto solo lo puede ver alguien logueado</p>
    </div>
</template>
```

```vue
<script setup>
// Metadata - Configuración por defecto
definePageMeta({
    auth: true,
})
</script>

<template>
    <div>
        Pág. que solo puede alguien loggeado
    </div>
</template>
```


```vue
<script setup>
// Metadata
definePageMeta({
    auth: false,
})
</script>

<template>
    <div>
        Pág. que solo puede cualquiera
    </div>
</template>
```

```vue
<script setup>
// Store
const authStore = useAuthStore()
</script>

<template>
    <div>
        ¡Hola {{ authStore.getName }}!
    </div>
</template>
```

```vue
<script setup>
// Store
const authStore = useAuthStore()
</script>

<template>
    <div>
        <button @click="authStore.logOut">Cerrar sesión</button>
    </div>
</template>
```
