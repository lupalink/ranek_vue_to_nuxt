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
        <e-column field='valor_categoria_id' headerText='Descrição do valor' textAlign='Right' width=50 ></e-column>
        <e-column field='valores_valor' headerText='Valor' width=120></e-column>      
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import Vue from "vue";
import { GridPlugin, Sort, Filter, Toolbar,  Edit} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
      modeSave: false,     
      sortInit: { 
        columns: [
          { field: 'valor_categoria_id', direction: 'Ascending' },
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
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_ITEM", "UPDATE_SINAPRO_VALOR", "remove"]),  
    ...mapActions(["removeTodo", "updateTodo"]), 
    excluirRegistro(){
      this.remove(0)
    },
    rowSelected: function(args) {
      console.log(this.index = args.row.getAttribute('aria-rowindex'))
    },
      
    actionComplete: function (e) { 
      if (e.requestType === 'save') {        
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
          this.UPDATE_SINAPRO_VALOR({
            valor_categoria_id: args.data.valor_categoria_id,
            valores_valor: args.data.valores_valor
          })
          // se estiver atualizando valores
        } else{     
          const params = { 
            valor_categoria_id: args.data.valor_categoria_id, 
            valores_valor:  args.data.valores_valor 
          }
          this.updateTodo({ index: this.index, params })
        } 
      } else if (args.requestType === "delete") { 
        this.removeTodo(this.index)           
      } else if (args.requestType === "sorting") {     
        console.log ( args.direction); 
        if ( args.direction === 'Descending'){
          this.data = this.$store.state.valores         
          this.$refs.grid.ej2Instances.sortColumn('valor_categoria_id', "Ascending", true);   
          this.$refs.grid.ej2Instances.sortColumn('valores_valor', "Ascending", true);  
        }    
      } else if (args.requestType === "add") { 
        this.addNew = true
        console.log('resquest add ', this.addNew = true)
      }  
    },
  },
 
  created(){
    
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