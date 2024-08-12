<template>
  <div class="all-page">
    <Head>
      <Title>Sistema de Información Docente - Universidad de Magallanes</Title>
      <Meta name="description" content="Sistema de Información Docente"/>
    </Head>
    <div class="header-and-main">
      <UMAGHeader
        :name="useAuthStore().getName"
        :is-auth="useAuthStore().isAuth"
        :log-out="useAuthStore().logOut"
        logo="/img/logo_umag_sid3.png"
      />
      <div class="container-fluid main-container">
        <slot />
      </div>
    </div>
    <UMAGFooter />
  </div>
</template>

<style>
.all-page {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-container{
  padding: 20px 40px;
}

.header-and-main {
  flex-grow: 1;
}
</style>