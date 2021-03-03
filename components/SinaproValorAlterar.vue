<template>
  <div id="app">
    <ejs-grid
      :dataSource="data"
      :editSettings="editSettings"
      :actionBegin="actionBegin"
      :toolbar="toolbar"
    
    >
      <e-columns>  
        <e-column
          field="valor_servico.0.valor_categorias.0.valor_descricao"
          headerText="Descrição do valor"
          width="auto"          
          :editTemplate="editTemplate"
          
          
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
import { api } from "@/services.js";
import {mapState, mapMutations} from 'vuex';
import Vue from "vue";
import { GridPlugin, Page, Toolbar, Edit } from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import ValorDescricaoDropdown from "@/components/ValorDescricaoDropdown.vue";

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
  data() {
    return {
      descricaoDoValor: '',    
      data: null,
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        // mode: "Normal"
        mode: 'Dialog'
      },
      
      toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"]
    };
  },
  // computed:{...mapState("valores")},
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_VALOR"]),
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
        // console.log(response.data.data[0][0]['valor_controles'])
        this.data = response.data.data[0][0]['valor_controles']    
        this.UPDATE_SINAPRO_VALOR(response.data.data[1])
      })
      .catch(error => {
        this.erros.push(error.response);
            // this.erros.push(error.response.data.message);
        // console.log(error.data)
      })
    },

    editTemplate: function() {
      return { template: ValorDescricaoDropdown };
    },
    actionBegin: function(args) {
      if (args.requestType === "beginEdit") {
        // recebe informação do template child
        // nos escolhemos o nome
        this.$eventHub.$on("descricaoDoValor", this.getTemplateValue);
      
      }
      if (args.requestType === "save") {
        // console.log(args.rowData.valor_servico[0].valor_categoria_id)      
        // console.log(args.data.valor_servico[0].valor_categorias[0].valor_descricao)
        // args.data.valor_servico[0].valor_categorias[0].valor_descricao = this.descricaoDoValor; 
       this.$eventHub.$on("descricaoDoValor", this.getTemplateValue); 
      if(!this.descricaoDoValor){
         
        this.descricaoDoValor = 
          { id: args.rowData.valor_servico[0].valor_categoria_id}
        
        // console.log(this.descricaoDoValor.id )
      }
        // this.$eventHub.$on("descricaoDoValorId", this.getTemplateValue); 
        // console.log( this.descricaoDoValor)
        // console.log( this.descricaoDoValor.id)
          
      // this.erros = [];
      // console.log(args.data.valor_servico[0].valor)    
      // console.log(this.$store.state.valores_atualozar.id)
      // this.categoria_sub_filho = args.categoria_sub_filho
      // console.log( args.data.categoria_sub_filho)

      api.put(`servicos/atualizar/`,{
        veiculo: 'sinapro',
        filtro: 'valor',             
        usuario_id: 17,
        empresa_id: 16, 
        servicos_id: args.data.servico_id,
        valores_valor_categoria_id: this.descricaoDoValor.id,       

        valores_id: args.rowData.valor_id,
        valores_valor: args.data.valor_servico[0].valor,  

      })
      .then((response) => {
        // console.log(response.data.data)
        this.getServicos();       
        // this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      });

        
      }
    },
    getTemplateValue: function(e) {
      this.descricaoDoValor = e;     
    }
  },

  provide: {
    grid: [Page, Edit, Toolbar]
  },
  created(){
    this.getServicos()
  }
};
</script>

<style>
@import "https://cdn.syncfusion.com/ej2/material.css";

.e-upload:before {
  content: "\e725";
}
.e-icons {
  color: #e3165b;
  font-size: 16px;
}
</style>
