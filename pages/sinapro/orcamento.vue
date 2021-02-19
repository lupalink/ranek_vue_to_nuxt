<template>
    <div id="app">    
       
      <div id='container' style="width:250px;">
        <br>
        <ejs-dropdownlist id='dropdownlist'  :dataSource='ddldata' placeholder='Selecione um serviço' :change="onChange">
        </ejs-dropdownlist>
      </div>
        <ejs-grid ref='grid' :dataSource='data' :allowFiltering='true' height='273px' :filterSettings='filterOptions' :toolbar='toolbarOptions' :recordDoubleClick="recordDoubleClick" >
            <e-columns>
                <e-column field='sinapro_id' headerText='Sinapro ID' textAlign='Right' width=50></e-column>
                <e-column field='categoria_sub_pai' headerText='Serviço' width=120></e-column>
                <e-column field='categoria_sub_filho' headerText='Cabeçalho' width=120></e-column>
                <e-column field='item' headerText='Item id' width=100></e-column>
                <e-column field='valor_categoria' headerText='Descrição valor' width=100></e-column>
                <e-column field='valor' headerText='Valor' width=100 :format='formatOptions' ></e-column>
            </e-columns>
        </ejs-grid>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { api } from "@/services.js";
import Vue from "vue";
import { GridPlugin, Filter, Toolbar, Search} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
      data: null,
      filtro: 'ANÚNCIO PARA REVISTA',
      toolbarOptions: ['Search']
       , 
      formatOptions: { format:'C2', currency:'BRL' },
       filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      }, 
      
      ddldata: ['TODOS', 'ANÚNCIO PARA REVISTA', 'ANÚNCIO PARA JORNAL']
    };
  },
  provide: {
    grid: [Filter, Toolbar, Search]
  },
  computed: {
    ...mapState(["auth", "login"])
  },
  methods: {
    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16`).then(response => {
        this.data = response.data;
        // console.log(this.data)

      });
    },
    onChange: function(args) {
      let element = document.createElement('p');
      if (args.isInteracted) {  
        const filtro =  this.filtro = args.itemData.value
        // console.log(this.filtro)        
        if (args.itemData.value == 'TODOS') {
          this.$refs.grid.clearFiltering();
        } else {
          this.$refs.grid.filterByColumn('categoria_sub_pai', 'equal', args.itemData.value)
        }      
      } 
    },
    recordDoubleClick: function(args) { 
     // you can show Dialog component here 
      alert("dblclick"); 
        // console.log(args.rowData.sinapro_id); 
     }    
  },
  created() {
    this.getServicos();
  },
}
</script>
<style>
@import "@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>