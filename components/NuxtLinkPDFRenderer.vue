<template>
    <nuxt-link :to="linkTo" class="btn btn-outline-primary" @click="generatePdf"> <i class="fa-solid fa-file-pdf"></i></nuxt-link>
</template>
  
<script>
export default {
    data() {
    return {
      pdfUrl: null,
    };
  },
    props: ['params'],
    computed: {
        data() {
            return this.params.data;
        },
        linkTo() {
            return `#`;
        },
    },
  methods: {
    async generatePdf() {
        try {
            var planId=this.data.ID
            const response = await this.$fetchService(this.$config.public.backBaseUrl + '/pdf/malla/' + planId);
            const pdfUrl = URL.createObjectURL(response);
            window.open(pdfUrl, '_blank');
        } catch (error) {
        console.error(error);
        console.error('Error al obtener la información.');
        }
    },

  },
};</script>