<template>
    <nuxt-link :to="linkTo" class="btn btn-outline-primary"><i class="fa-solid fa-eye"></i></nuxt-link>
</template>
  
<script>
export default {
    props: ['params'],
    computed: {
        data() {
            return this.params.data;
        },
        linkTo() {
            return `/malla/${this.data.ID}`;
        },
    },
};
</script>