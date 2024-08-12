<template>
    <ul class="nav justify-content-center menu-top justify-content-sm-end" v-show="useAuthStore().isAuth">
        <li class="nav-item">
            <NuxtLink to="/" class="nav-link active">
                Servicios
            </NuxtLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Novedades</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contacto</a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.menu-top{
    position: absolute;
    top: $header-height;
    width: 100%;
    font-size: 13px;
    padding-right: 20px;
}

.active{
    font-weight: bold;
}

.menu-top a{
    color: var(--bs-gray-300);
}

.menu-top a:hover{
    color: #FFF;
    text-decoration: none;
}

@media (max-width: 445px) {
    .menu-top{
        top: $header-height+46px;
    }
    
}
</style>