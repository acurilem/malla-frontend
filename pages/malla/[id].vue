<template>
    <div>
      <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
        aria-label="breadcrumb">
        <ol class="breadcrumb" align="center">
          <li class="breadcrumb-item">
            <a href="#"><nuxt-link :to="`/`"><i class="fa-solid fa-house"></i></nuxt-link></a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <nuxt-link :to="`/`"> Mis Mallas </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Malla</li>
        </ol>
      </nav>
      <hr><br>
      <div v-for="malla in plan">
      <h4  >PLAN   {{ malla.CarreraTotal.Carrera.nom_carrera }} <br/><span class="badge text-bg-info">{{ malla.CarreraTotal.cod_carrera }}</span> <span class="badge text-bg-secondary">{{ malla.CarreraTotal.Especialidad.nom_especialidad}}</span> <span class="badge text-bg-info">{{ malla.CarreraTotal.Mencion.nom_mencion }}</span> <span class="badge text-bg-secondary">{{ malla.AnoPlan}}</span> <span class="badge text-bg-info">{{ malla.Regimen.nom_regimen }}</span> <span class="badge text-bg-secondary">{{ malla.TipoPlan.nom_tipo_plan}}</span></h4>
       </div>
      <div class="container-fluid">
        <h4>Asignaturas</h4>

        <div v-if="cursosNoComplementarios && Object.keys(cursosNoComplementarios).length > 0"> 
            <div v-for="(mallaGroup, key,index) in Object.entries(cursosNoComplementarios)" :key="key">
         <div class="accordion" id="accordionNoComplementario">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button v-if=" mallaGroup[1].ano=='6' && mallaGroup[1].id_planes=='608'" class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-no-complementarios-' + key" aria-expanded="true" :aria-controls="'collapse-no-complementarios-' + key">  
                   Año 6 y Año 7
                </button>
                <button v-else class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-no-complementarios-' + key" aria-expanded="true" :aria-controls="'collapse-no-complementarios-' + key">  
                   {{Object.keys(cursosNoComplementarios)[key]}}
                </button>
              </h2>
              <div :id="'collapse-no-complementarios-' + key" class="accordion-collapse collapse " :class="{ 'show': key === 0 }">
                <div class="accordion-body">
                    <div class="table-responsive"  >
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Asignatura </th>
                        <th scope="col" v-if="competenciasNoComplementarios">Competencias</th>
                        <th scope="col" v-if="plan && (plan[0].cod_tipo_plan == 2 || plan[0].cod_tipo_plan == 3 || plan[0].cod_tipo_plan == 6 || plan[0].cod_tipo_plan == 8 || plan[0].cod_tipo_plan == 9)">CT</th>
                        <th scope="col" v-if="plan && (plan[0].cod_tipo_plan == 1 || plan[0].cod_tipo_plan == 5)">SCT</th>
                        <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 2">H.P.</th>
                        <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 2">H.N.P.</th>
                        <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">T</th>
                        <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">E</th>
                        <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">L</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Duración</th>
                        <th scope="col">Curso Básico</th>
                        <th scope="col">Institucional</th>
                        <th scope="col">Requisitos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(curso,index) in mallaGroup[1].cursos" :key="index">
                        <tr>
                          <td>{{ curso.CursoPionero?.CompetenciaAsignatura?.nom_comp_asig || 'Sin asignatura' }}</td>
                          <td  v-if="competenciasNoComplementarios">  
                            <ul v-if="curso.CursoPionero?.CursosPionerosCompetencias?.length > 0">
                                <li v-for="(competencia, index) in getCompetenciasMostradas(curso)" :key="index"> {{ competencia.CompetenciaRc.nom_competencia }}  </li>
                            </ul>
                            <button class="btn btn-link" @click="showMasCompetencias(curso)" v-show="curso.CursoPionero.CursosPionerosCompetencias.length > mostrarCompetenciasInicialmente">
                                {{ curso.mostrarTodasLasCompetencias ? 'Leer menos' : 'Leer más' }}
                            </button>
                          </td>
                          <td v-if="plan && plan[0].cod_tipo_plan != 4 && plan[0].cod_tipo_plan != 7">{{ curso.CursoPionero?.sct_total }}</td>
                          <td v-if="plan && plan[0].cod_tipo_plan == 2">{{ curso.CursoPionero?.hrs_crono_presen_semestral }}</td>
                          <td v-if="plan && plan[0].cod_tipo_plan == 2">{{ curso.CursoPionero?.hrs_crono_no_presen_semestral }}</td>
                          <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_teoricas }}</td>
                          <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_ejercicios }}</td>
                          <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_practicas }}</td>
                          <td>{{ curso.TipoCursoMalla?.descripcion }}</td>
                          <td>{{ curso.duracion === 'S' ? 'Semestral' :  curso.duracion=== 'A' ? 'Anual' : '' }}</td>
                          <td> {{ curso.curso_basico === 0 ? 'No' : curso.curso_basico === 1 ? 'Sí' : '' }}</td>
                          <td> {{ curso.CursoPionero?.institucional === 0 ? 'No' :  curso.CursoPionero?.institucional=== 1 ? 'Sí' : '' }}</td>
                          <td>  
                            <ul>
                               <li v-for="(requisito, index) in getRequisitosMostrados(curso)" :key="index">  {{ requisito }}</li>
                            </ul>
                            <button class="btn btn-link" @click="showMasRequisitos(curso)" v-show="curso.MallasRequisitos.length > mostrarCompetenciasInicialmente">
                              {{ curso.mostrarTodasLasRequisitos ? 'Leer menos' : 'Leer más' }}
                            </button>
                        </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <div v-if="cursosNoComplementarios">
                    <p   v-if=" plan[0].cod_tipo_plan == 2 || plan[0].cod_tipo_plan == 3 || plan[0].cod_tipo_plan == 6 || plan[0].cod_tipo_plan == 8 || plan[0].cod_tipo_plan == 9">Suma de CT : {{ mallaGroup[1].sumaSctTotal }}</p>
                    <p   v-if="plan[0].cod_tipo_plan == 1 || plan[0].cod_tipo_plan == 5">Suma  de SCT: {{ mallaGroup[1].sumaSctTotal }}</p>
                    <p v-if=" plan[0].cod_tipo_plan == 4">Suma T E L : [{{ mallaGroup[1].sumaTeoricas }}] [{{ mallaGroup[1].sumaEjercicios }}] [{{ mallaGroup[1].sumaPracticas }}]</p>        
                    <p   v-if=" mallaGroup[1].semestre=='2' && ( plan[0].cod_tipo_plan == 2 || plan[0].cod_tipo_plan == 3 || plan[0].cod_tipo_plan == 6 || plan[0].cod_tipo_plan == 8 || plan[0].cod_tipo_plan == 9)">Suma Anual de CT :  {{ mallaGroup[1].sumaSctAnual }}</p>
                    <p   v-if=" mallaGroup[1].semestre=='2' && (plan[0].cod_tipo_plan == 1 || plan[0].cod_tipo_plan == 5)">Suma Anual de SCT:  {{ mallaGroup[1].sumaSctAnual }}</p>
                    <p v-if="mallaGroup[1].semestre=='2' &&  (plan[0].cod_tipo_plan == 4)">Suma Anual de T E L: [{{ mallaGroup[1].sumaTeoricaAnual }}] [{{ mallaGroup[1].sumaEjerciciosAnual }}] [{{ mallaGroup[1].sumaPracticasAnual  }}] </p>
                  </div>
                </div>  </div>
              </div>
            </div>
        </div>
          </div>
        </div>
        <div v-else>
          <p>No hay Asignaturas disponibles.</p>
        </div>
    </div>
    <br><br>  
    <div class="container-fluid">
        <h4 v-if="cursosComplementarios  && Object.keys(cursosComplementarios).length > 0">Cursos Complementarios (Culturales/Deportivos, Electivos e Ingl&eacute;s)</h4>
        <div v-if="cursosComplementarios && Object.keys(cursosComplementarios).length > 0">
          <div>
            <div class="accordion" id="accordionComplementario">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"   :data-bs-target="'#collapse-' + key"   aria-expanded="true"  :aria-controls="'collapse-' + key"  >Cursos Complementarios</button>
              </h2>
           
              <div :id="'collapse-' + key" class="accordion-collapse collapse  "  :class="{ 'show': key === 0 }"  >
                <div class="accordion-body">
                    <div class="table-responsive"  >
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Asignatura  </th>
                                   
                                    <th v-if="competenciasComplementarios" scope="col">Competencias</th>
                                    <th scope="col" v-if="plan && (plan[0].cod_tipo_plan == 2 || plan[0].cod_tipo_plan == 3 || plan[0].cod_tipo_plan == 6 || plan[0].cod_tipo_plan == 8 || plan[0].cod_tipo_plan == 9)">CT</th>
                                    <th scope="col" v-if="plan && (plan[0].cod_tipo_plan == 1 || plan[0].cod_tipo_plan == 5)">SCT</th>
                                    <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 2">H.P.</th>
                                    <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 2">H.N.P.</th>
                                    <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">T</th>
                                    <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">E</th>
                                    <th scope="col" v-if="plan && plan[0].cod_tipo_plan == 4">L</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Duración</th>
                                    <th scope="col">Curso Básico</th>
                                    <th scope="col">Institucional</th>
                                    <th scope="col">Requisitos</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                              <template v-for="curso in cursosComplementarios" :key="curso.ID">
            <tr>
                                     <td>{{ curso.CursoPionero?.CompetenciaAsignatura?.nom_comp_asig || 'Sin asignatura' }}</td>
                                     <td  v-if="competenciasComplementarios">  
                                      <ul v-if="curso.CursoPionero?.CursosPionerosCompetencias?.length > 0">
                                           <li v-for="(competencia, index) in getCompetenciasMostradas(curso)" :key="index"> {{ competencia.CompetenciaRc.nom_competencia }}  </li>
                                      </ul>
                                      <button class="btn btn-link" @click="showMasCompetencias(curso)" v-show="curso.CursoPionero.CursosPionerosCompetencias.length > mostrarCompetenciasInicialmente">
                                        {{ curso.mostrarTodasLasCompetencias ? 'Leer menos' : 'Leer más' }}
                                      </button>
                                     </td>
                                     <td v-if="plan && plan[0].cod_tipo_plan != 4 && plan[0].cod_tipo_plan != 7">{{ curso.CursoPionero?.sct_total }}</td>
                                     <td v-if="plan && plan[0].cod_tipo_plan == 2">{{ curso.CursoPionero?.hrs_crono_presen_semestral }}</td>
                                     <td v-if="plan && plan[0].cod_tipo_plan == 2">{{ curso.CursoPionero?.hrs_crono_no_presen_semestral }}</td>
                                     <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_teoricas }}</td>
                                     <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_ejercicios }}</td>
                                     <td v-if="plan && plan[0].cod_tipo_plan == 4">{{ curso.CursoPionero?.hrs_practicas }}</td>
                                     <td>{{ curso.TipoCursoMalla?.descripcion }}</td>
                                     <td>{{ curso.duracion === 'S' ? 'Semestral' :  curso.duracion=== 'A' ? 'Anual' : '' }}</td>
                                     <td> {{ curso.curso_basico === 0 ? 'No' : curso.curso_basico === 1 ? 'Sí' : '' }}</td>
                                     <td> {{ curso.CursoPionero?.institucional === 0 ? 'No' :  curso.CursoPionero?.institucional=== 1 ? 'Sí' : '' }}</td>
                                     <td>  
                                        <ul>
                                          <li v-for="(requisito, index) in getRequisitosMostrados(curso)" :key="index">  {{ requisito }}</li>
                                        </ul>
                                        <button class="btn btn-link" @click="showMasRequisitos(curso)" v-show="curso.MallasRequisitos.length > mostrarCompetenciasInicialmente">
                                          {{ curso.mostrarTodasLasRequisitos ? 'Leer menos' : 'Leer más' }}
                                        </button>
                                     </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
        </div>
          </div>
        </div>
    </div>
    </div>
  </template>
  
<style scoped lang="scss">

  .accordion-button:not(.collapsed) {
    color: #0c63e4;
    background-color: #e7f1ff;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.125);
  }

  .badge{
    font-size: 14px;
    font-weight: normal;
  }

</style>
  <script>
  import useAuthStore from '~/stores/useAuthStore';
  import { reactive } from 'vue';

  /*LOCALHOST*/
  /*definePageMeta({
    auth:false,
  })*/
  /*FIN LOCALHOST*/
  
  export default {
    name: 'MallaPage',
    data() {
      return {
        cursosComplementarios: null,
        cursosNoComplementarios: null,
        codPersona: null,
        plan: null,
        competenciasNoComplementarios:null,
        mostrarCompetenciasInicialmente: 2,
        mostrarRequisitosInicialmente:2,
    
 
      };
    },
    beforeMount() {
      const user = useAuthStore().getUser;
      this.codPersona = user.cod_persona;
    },
    async created() {
      try {
        const route = useRoute();
        const plan_id = route.params.id;
        const complementariosResponse = await this.$fetchService(this.$config.public.backBaseUrl + '/cursos_complementarios/' + plan_id).catch((error) => error.data);
        const complementarios = complementariosResponse || [];
        const noComplementariosResponse = await this.$fetchService(this.$config.public.backBaseUrl + '/sin_cursos_complementarios/' + plan_id).catch((error) => error.data);
        const noComplementarios = noComplementariosResponse || [];
        this.cursosComplementarios = complementarios;
        this.cursosNoComplementarios = this.groupByAnoSemestre(noComplementarios);
        this.competenciasNoComplementarios=this.searchCompetencias(noComplementarios);
        this.competenciasComplementarios=this.searchCompetencias(complementarios);
        const response = await this.$fetchService(this.$config.public.backBaseUrl+'/plan/plan/'+ plan_id).catch((error) => error.data);
        this.plan = response;
      } catch (error) {
        console.error('Error al obtener la información:', error);
      }
    },
    computed: {
   
  },
    methods: {
    groupByAnoSemestre(cursos) {
    const groupedCursos = {};
    cursos.forEach((curso) => {
      let key = `Año ${curso.nro_ano} y Semestre ${curso.nro_sem}`;
      const keyAnterior = `Año ${curso.nro_ano} y Semestre 1`;
      if (!groupedCursos[key]) {
        groupedCursos[key] = {
          cursos: [],
          sumaSctTotal:0,
          sumaSctAnual:0,
          semestre:curso.nro_sem,
          ano:curso.nro_ano,
          id_planes:curso.id_planes,
          sumaTeoricas:0,
          sumaTeoricaAnual:0,
          sumaEjercicios:0,
          sumaEjerciciosAnual:0,
          sumaPracticas:0,
          sumaPracticasAnual:0,
        };
      }
      groupedCursos[key].sumaSctTotal += curso.CursoPionero?.sct_total || 0;
      groupedCursos[key].sumaTeoricas += curso.CursoPionero?.hrs_teoricas || 0;
      groupedCursos[key].sumaPracticas += curso.CursoPionero?.hrs_practicas|| 0;
      groupedCursos[key].sumaEjercicios += curso.CursoPionero?.hrs_ejercicios || 0;
      if(curso.nro_sem =='2'  && groupedCursos[keyAnterior] !== undefined ){
        groupedCursos[key].sumaSctAnual =  groupedCursos[key].sumaSctTotal+ groupedCursos[keyAnterior].sumaSctTotal;
        groupedCursos[key].sumaEjerciciosAnual =  groupedCursos[key].sumaEjercicios+ groupedCursos[keyAnterior].sumaEjercicios;
        groupedCursos[key].sumaPracticasAnual= groupedCursos[key].sumaPracticas + groupedCursos[keyAnterior].sumaPracticas;
        groupedCursos[key].sumaTeoricaAnual= groupedCursos[key].sumaTeoricas + groupedCursos[keyAnterior].sumaTeoricas;
      }
      groupedCursos[key].cursos.push(curso);
    });  
    return groupedCursos;
  },
    
      searchCompetencias(cursos) {
        let competencias = false;
        if (cursos.length > 0) {
            cursos.forEach((curso) => {
            if ( curso.CursoPionero &&  curso.CursoPionero.CursosPionerosCompetencias && curso.CursoPionero.CursosPionerosCompetencias.length > 0 ) {
                 competencias = true
            }
        });
        }
    return competencias;
    },
    
    getMostrados(lista, mostrarTodo) {
      return mostrarTodo ? lista : lista.slice(0, this.mostrarCompetenciasInicialmente);
    },
    getRequisitosMostrados(curso) {
       const requisitos = curso.MallasRequisitos.map(requisito => requisito.MallaPionero?.CursoPionero?.CompetenciaAsignatura?.nom_comp_asig || 'Sin requisito');
       return this.getMostrados(requisitos, curso.mostrarTodasLasRequisitos);
    }, 
    getCompetenciasMostradas(curso) {
       return this.getMostrados(curso.CursoPionero?.CursosPionerosCompetencias, curso.mostrarTodasLasCompetencias);
    },
    showMasRequisitos(curso) {
       curso.mostrarTodasLasRequisitos = !curso.mostrarTodasLasRequisitos;
       if (!curso.mostrarTodasLasRequisitos) {
          this.mostrarCompetenciasInicialmente = 2;
       }
    },
    showMasCompetencias(curso) {
      curso.mostrarTodasLasCompetencias = !curso.mostrarTodasLasCompetencias;
      if (!curso.mostrarTodasLasCompetencias) {
       this.mostrarCompetenciasInicialmente = 2;
    }
  },

   },
  };
  </script>
  