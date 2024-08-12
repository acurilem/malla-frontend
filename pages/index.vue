<template>
    <section class="section">
        <div class="container-fluid">
            <UMAGBreadCrumb module-name="Mallas" page-name="Mis Mallas" />
            <hr><br>
            <h3 class="title bold" >Mis Mallas &nbsp;&nbsp;&nbsp;<nuxt-link :to="`/todas/`" class="btn btn-outline-primary" > Todos las mallas</nuxt-link></h3>      
            <br>
            <div class="table-responsive">
                <table class="table  table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre Carrera</th>
                            <th  scope="col">Especialidad</th>
                            <th  scope="col">Mención</th>
                            <th  scope="col">Año Plan</th>
                            <th  scope="col">Régimen</th>
                            <th scope="col">Tipo Plan</th>
                            <th scope="col">Nivel Global</th>
                            <th scope="col">Nivel Plan de la Carrera</th>
                            <th scope="col">Duración</th>
                            <th  scope="col">Ver Malla</th>
                            <th scope="col">Ver PDF</th>
                        </tr>
                    </thead>
                    <tbody  v-for="plan in Planes" :key="plan.ID">
                        <tr>
                            <td>{{ plan.CarreraTotal.cod_carrera }}</td>
                            <td>{{ plan.CarreraTotal.Carrera.nom_carrera }}</td>
                            <td>{{ plan.CarreraTotal.Especialidad.nom_especialidad}}</td>
                            <td>{{ plan.CarreraTotal.Mencion.nom_mencion }}</td>
                            <td>{{ plan.AnoPlan}}</td>
                            <td>{{ plan.Regimen.nom_regimen }}</td>
                            <td>{{ plan.TipoPlan.nom_tipo_plan}}</td>
                            <td>{{ plan.NivelGlobalCarrera.descripcion}}</td>
                            <td>{{ plan.CarreraTotal.NivelCarrera.descripcion}}</td>
                            <td>{{ plan.duracion}}</td>
                            <td> <NuxtLink :to="`/malla/${plan.ID}`" class="btn btn-outline-primary">   <i class="fa-solid fa-eye"></i>   </NuxtLink></td>
                          
                            <td> <nuxt-link :to="`#`" @click="generatePdf(plan.ID)" class="btn btn-outline-primary">   <i class="fa-solid fa-file-pdf"></i>   </nuxt-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </section>
</template>
<script>

/*LOCALHOST*/
/*import useAuthStore from "~/stores/useAuthStore";
 definePageMeta({
    auth:false,
})*/
/*FIN LOCALHOST*/

export default {
    name: 'PlanPage',
    data() {
        return {
            Planes: null,
            codPersona: null,
            pdfUrl:null,
        }
    },
    async created() {
        try {

            /*LOCALHOST*/
            /*const authStore = useAuthStore()
            await authStore.login({username:"marisali", password:"secret"}) 
            console.log('authStore id', authStore.getID)
            console.log('authStore token', authStore.getToken)*/
            /*FIN LOCALHOST*/

            const response = await this.$fetchService(this.$config.public.backBaseUrl+'/plan/carreras/').catch((error) => error.data)
            this.Planes = response
        } catch (error) {
            console.error(error)
            console.error('Error al obtener la información.');
        }
    },
    methods: {
    async generatePdf(planId) {
        try {
            const response = await this.$fetchService(this.$config.public.backBaseUrl + '/pdf/malla/' + planId);
            const pdfUrl = URL.createObjectURL(response);
            window.open(pdfUrl, '_blank');
        } catch (error) {
        console.error(error);
        console.error('Error al obtener la información.');
        }
    },
}

}
</script>
