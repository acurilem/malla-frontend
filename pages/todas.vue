<template>
    <section class="section">
        <div class="container-fluid">
            <UMAGBreadCrumb module-name="Todas las mallas" />
            <hr><br>
            <h3 class="title">Todos las Mallas &nbsp;&nbsp;&nbsp; <nuxt-link :to="`/`"
                    class="btn btn-outline-primary"> Mis Mallas</nuxt-link> </h3>

            <div class="table-responsive">
                <div class="example-header">
                    <span>Búsqueda: </span>
                    <input type="text" id="filter-text-box" placeholder="Filtro..." v-on:input="onFilterTextBoxChanged()">
                </div><br>
                <ag-grid-vue class="ag-theme-alpine" style="width:100%; height: 500px;" 
                    :columnDefs="columnDefs.value"
                    :rowData="rowData.value" 
                    :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
                    :paginationAutoPageSize="true"
                    :pagination="true"
                    :autoSizeColumns="true"
                    @grid-ready="onGridReady">
                </ag-grid-vue>
            </div>

        </div>
    </section>
</template>
<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import NuxtLinkRenderer from '~/components/NuxtLinkRenderer.vue';
import NuxtLinkPDFRenderer from '~/components/NuxtLinkPDFRenderer.vue';

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

/*LOCALHOST*/
/*definePageMeta({
    auth:false,
})*/
/*FIN LOCALHOST*/

export default {
    name: 'PlanPage',
    components: {
        AgGridVue,
        NuxtLinkRenderer,
        NuxtLinkPDFRenderer,
    },
    setup() {
        const gridApi = ref(null); // Optional - for accessing Grid's API

        // Obtain API from grid's onGridReady event
        const onGridReady = (params) => {
            gridApi.value = params.api;
        };

        
        const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row
        
        const onFilterTextBoxChanged = () => {
            gridApi.value.setQuickFilter(
                document.getElementById('filter-text-box').value
            );
        };

        // Each Column Definition results in one Column.
        const columnDefs = reactive({
            value: [
                { field: "CarreraTotal.cod_carrera", headerName: "Código", width: 100 },
                { field: "CarreraTotal.Carrera.nom_carrera", headerName: "Nombre Carrera", width: 600 },
                { field: "CarreraTotal.Especialidad.nom_especialidad", headerName: "Especialidad", width: 250 },
                { field: "CarreraTotal.Mencion.nom_mencion", headerName: "Mención", width: 250 },
                { field: "AnoPlan", headerName: "Año Plan", width: 110 },
                { field: "Regimen.nom_regimen", headerName: "Régimen" },
                { field: "TipoPlan.nom_tipo_plan", headerName: "Tipo Plan", width: 400 },
                { field: "NivelGlobalCarrera.descripcion", headerName: "Nivel Global" },
                { field: "CarreraTotal.NivelCarrera.descripcion", headerName: "Nivel Plan de la Carrera", width: 500 },
                { field: "duracion", headerName: "Duración", width: 110 },
                { headerName: "Ver Malla", field: 'ID', cellRenderer: 'NuxtLinkRenderer', width: 110},
                { headerName: "Ver PDF",field: 'ID', cellRenderer: 'NuxtLinkPDFRenderer', width: 110 }
            ],
        });

        // DefaultColDef sets props common to all Columns
        const defaultColDef = {
            sortable: true,
            filter: true,
        };

        return {
            onGridReady,
            columnDefs,
            rowData,
            defaultColDef,
            onFilterTextBoxChanged,
        };
    },
    async created() {
        try {
            const response = await this.$fetchService(this.$config.public.backBaseUrl + '/plan/').catch((error) => error.data)
            this.rowData.value = response
        } catch (error) {
            console.error('Error al obtener la información.');
        }
    }
}
</script>