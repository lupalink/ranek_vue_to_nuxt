<template>
  <div style="height: 80vh">
    <!-- {{todos }} -->
    <ejs-grid
      ref='grid'
      :dataSource="data"
      :toolbar="toolbar"
      :editSettings="editing"
      :pageSettings="pageSettings"
      :selectionSettings="selectOptions"
      :actionBegin="actionBegin"
      :actionComplete="actionComplete"
    >
      <e-columns> 
        <e-column
          field="valor_servico.0.valor_categorias.0.valor_descricao"
          headerText="Descrição do valor"
          editType='dropdownedit' :edit='countryParams'
          clipMode="EllipsisWithTooltip"          
        ></e-column>
          <e-column
          field="valor_servico.0.valor"
          headerText="Valor"
          clipMode="EllipsisWithTooltip"
        ></e-column>
        
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import { api } from "@/services.js";
import Vue from "vue";
import {
  GridPlugin,
  Edit,
  Page,
  Toolbar,
  ContextMenu,
} from "@syncfusion/ej2-vue-grids";
import { Query } from "@syncfusion/ej2-data";


Vue.use(GridPlugin);

export default ({ 
  
  data: () => {
    return {      
      data: null,
      pageSettings: { pageSize: 5 },
      toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],

      editing: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        showDeleteConfirmDialog: true,
        mode: 'Dialog'
      },
      selectOptions: { type: "Multiple" },
      countryParams: {
        params: {
          allowFiltering: true,
          dataSource: null,  
          fields: { text: "nome", value: "nome" }, 
     
          query: new Query(),
          actionComplete: () => false,
        },
      },
    };
  },
  

  provide: {
    grid: [Edit, Page, Toolbar, ContextMenu],
  },
  computed:{
    ...mapState(["auth", "login", "country"]) 
  },

  methods:{
    getServicos() {
      let id = this.$route.params.id
      api.get(`servicos/buscar?
        veiculo=sinapro
        &filtro=servicoDetalhe    
        &usuario_id=17
        &empresa_id=16
        &servicos_id=${id}
        &servicos_praca_id=7
        &servicos_insercao_id=7
        &servicos_insercao_controle_id=
        &sinapro_id=1
        &nivel=2`
      ).then(response => {
        this.data = response.data.data[0][0]['valor_controles']     
        console.log(response.data.data[1])         
        this.countryParams.params.dataSource = response.data.data[1]
      })
      .catch(error => {
        this.erros.push(error.response);
            // this.erros.push(error.response.data.message);
        // console.log(error.data)
      })
    },
    actionBegin(args) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      // console.log(args)
        for (var i = 0; i < this.$refs.grid.getColumns().length; i++) {
          if (this.$refs.grid.getColumns()[i].field == "valor_servico.0.valor_categorias.0.valor_descricao") {
            this.$refs.grid.getColumns()[i].visible = true;
          }
          // else if (this.$refs.grid.getColumns()[i].field == "valor_servico.0.valor_categorias.0.valor_descricao") {
          //   this.$refs.grid.getColumns()[i].visible = false;
          // }
        }
      }
    },
    actionComplete(args) {
        if ((args.requestType === 'save')) {
          console.log(args)
            for (var i = 0; i < this.$refs.grid.getColumns().length; i++) {
              if (this.$refs.grid.getColumns()[i].field == "valor_servico.0.valor_categorias.0.valor_descricao") {
                  this.$refs.grid.getColumns()[i].visible = false;
              }
              // else if (this.$refs.grid.getColumns()[i].field == "valor_servico.0.valor_categorias.0.valor_descricao") {
              //     this.$refs.grid.getColumns()[i].visible = true;
              // }
            }
        }
    }

  },

  created() {
    this.getServicos();
  },



})

window.addEventListener("resize", function () {
  debugger;
  if (document.getElementsByClassName("e-grid")[0]) {
    let gridObj = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
    gridObj.refresh();
  }
});

</script>

<style>
@import "https://cdn.syncfusion.com/ej2/material.css";

/* .e-pager .e-icon-last::before {
  content: "\E897";
} */
</style>
