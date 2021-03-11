<template>
  <!-- 
    refactor(compoments): SinaproValorAlterar
    add(compoments): SinaproValorAlterar
    rm(compoments): SinaproValorAlterar
  -->
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
      idParamter: this.$route.params.id,
      addNew: false,
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
    ...mapMutations(["UPDATE_SINAPRO_VALOR", "UPDATE_SINAPRO_VALOR_DESCRICAO_DROPDOWNLIST"]),
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
        this.UPDATE_SINAPRO_VALOR(response.data.data[1])
        this.UPDATE_SINAPRO_VALOR_DESCRICAO_DROPDOWNLIST(response.data.data[1])


      })
      .catch(error => {
        this.erros.push(error.response);
   
      })
    },
    editTemplate: function() {
      return { template: ValorDescricaoDropdown };
    },
    actionBegin: function(args) {
      if (args.requestType === "add") {        
      
        this.addNew = true
      
        
      }
      if (args.requestType === "beginEdit") {  
        this.addNew = false
        this.$eventHub.$on("descricaoDoValor", this.getTemplateValue);      
      }

      if (args.requestType === "save" && this.addNew === false) {
        console.log('vai atualizar')
       this.$eventHub.$on("descricaoDoValor", this.getTemplateValue); 
       console.log(this.descricaoDoValor)
     
      
       if(!this.descricaoDoValor){         
          this.descricaoDoValor = { id: args.rowData.valor_servico[0].valor_categoria_id}     
        }
        // console.log(args.data)
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
          this.getServicos();      
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });

      }else if (args.requestType === "save" && this.addNew === true) {
        // console.log
        this.$eventHub.$on("descricaoDoValor", this.getTemplateValue);  
        console.log(this.descricaoDoValor)
        // if(!this.descricaoDoValor){         
        //   this.descricaoDoValor = { id: args.rowData.valor_servico[0].valor_categoria_id}   
            
        // }    
        let id = this.$route.params.id
        console.log(args.data.valor_servico[0].valor)
        // console.log(this.descricaoDoValor)
            console.log('id da descrição dos valores', this.$store.state.valor_descricao.id)


        api.post(`servicos`,{
          veiculo: 'sinapro',
          filtro: 'valor_objeto',             
          usuario_id: 17,
          empresa_id: 16, 
          servicos_id: id,
          valores_valor_categoria_id: this.$store.state.valor_descricao.id,       
          valores_valor: args.data.valor_servico[0].valor,  
        })
        .then((response) => { 
          console.log(response)
          this.getServicos();      
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });

        
      }else if (args.requestType === "delete") {
        console.log(this.idParamter)
        console.log(args.data[0].valor_id)
        api
        .delete(`servicos/deletar?
        veiculo=sinapro
        &filtro=valor_objeto
        &usuario_id=17
        &servicos_id=${this.idParamter}
        &valores_valor_id=${args.data[0].valor_id}
        &arquivar=0
        &restaurar=0
        &remover=1`)
        .then((response) => {
          console.log(response)
        })
        .catch(error => {
          // console.log(error.reponse);
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