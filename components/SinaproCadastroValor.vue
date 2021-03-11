<template>
  <!-- 
    rm(components): SinaproCadastroValor
    refactor(components): SinaproCadastroValor
    add(components): SinaproCadastroValor
  -->
  <div id="apps" >   
    <ErroNotificacao :erros="erros"/> 
    <ejs-grid
    :dataSource='data'    
    ref='grid'
    :sortSettings='sortInit'
    :allowSorting='true'
    height='273px' 
    :rowSelected='rowSelected'
    :toolbar='toolbar' 
    :editSettings='editSettings' 
    :actionBegin='actionBegin'
    :actionComplete='actionComplete' 
    >
      <e-columns> 
        <!-- <e-column field='valor_categoria_id' headerText='Descrição do valor' textAlign='Right' width=50 ></e-column> -->

        <e-column
          field="valor_servico.0.valor_categorias.0.valor_descricao"
          headerText="Descrição do valor"
          width="100px"          
          :editTemplate="editTemplate"
          :allowSorting='false'
        ></e-column>







        <e-column field='valores_valor' headerText='Valor' width=120></e-column>      
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import { api } from "@/services.js";
import {mapState, mapMutations, mapActions} from 'vuex';
import Vue from "vue";
import { GridPlugin, Sort, Filter, Toolbar,  Edit} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
import ValorDescricaoDropdown from "@/components/ValorDescricaoDropdown.vue";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
  data() {
    return {
      modeSave: false,     
      sortInit: { 
        columns: [
          // { field: 'valor_servico.0.valor_categorias.0.valor_descricao', direction: 'Ascending'},
          { field: 'valores_valor', direction: 'Ascending' },
      ]},
      // Descending
      addNew: false,
      data: null,    
      index: null,
      erros: [],
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog'},
      toolbar: [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel'],  
    };
  },
  provide: {
    grid: [Toolbar, Edit, Sort]
  },
  computed: {
    ...mapState(['auth', 'login', 'sinapro_categoria_item', 'sinapro_categoria_titulo', 'valores']),    
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_ITEM", "UPDATE_SINAPRO_VALOR", "remove", "UPDATE_SINAPRO_VALOR_DESCRICAO_DROPDOWNLIST"]),  
    ...mapActions(["removeTodo", "updateTodo"]), 
    getDescricaoValores() {
      let id = this.$route.params.id
      api.get(`servicos/buscar?
        veiculo=sinapro
        &filtro=valor_categoria    
        &usuario_id=17
        &empresa_id=16
        &total_statu=1
        &servicos_id=`
      ).then(response => {  
        this.data = [];          
        
        console.log(response.data.data)
        this.UPDATE_SINAPRO_VALOR_DESCRICAO_DROPDOWNLIST(response.data.data)
      })
      .catch(error => {
        this.erros.push(error.response);
   
      })
  },
    editTemplate: function() {
      return { template: ValorDescricaoDropdown };
    },
    rowSelected: function(args) {
      console.log(this.index = args.row.getAttribute('aria-rowindex'))
    },
    actionComplete: function (e) { 
      if (e.requestType === 'save') { 
        //  this.$refs.grid.ej2Instances.sortColumn('valor_servico.0.valor_categorias.0.valor_descricao', "Ascending", true);          
        // console.log(e.data)
      } else if(e.requestType === 'delete') {

      } else if(e.requestType === "beginEdit") {
        this.addNew = false
        console.log('atualização. add = ', this.addNew = false)
      }
    }, 
    actionBegin: function(args) { 
      this.erros = [];
      if (args.requestType === "save") {
        // se estiver adicionando novos valores
        if (this.addNew === true){
          if(!args.data.valores_valor){
            args.data.valores_valor = null
          }
          this.UPDATE_SINAPRO_VALOR({
            valor_categoria_id: this.$store.state.valor_descricao.id,
            valores_valor: args.data.valores_valor
          })
          // se estiver atualizando valores
        } else{     
          const params = { 
            valor_categoria_id: this.$store.state.valor_descricao.id, 
            valores_valor:  args.data.valores_valor 
          }
          this.updateTodo({ index: this.index, params })
        } 
      } else if (args.requestType === "delete") { 
        this.removeTodo(this.index)           
      } else if (args.requestType === "sorting") {     
        console.log ( args.direction); 
        if ( args.direction === 'Descending'){             
          this.$refs.grid.ej2Instances.sortColumn('valores_valor', "Ascending", true);  
        }    
      } else if (args.requestType === "add") { 
        this.addNew = true
        console.log('resquest add ', this.addNew = true)
      }  
    },
  },
  beforeCreate(){
    this.data = null
  },
 
  created(){
    this.getDescricaoValores()
    
  }
}
</script>
<style>
@import '@/node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-inputs/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>