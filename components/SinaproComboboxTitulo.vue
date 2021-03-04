<template>
  <!-- 
    refactor(compoments): SinaproComboboxTitulo
    add(compoments): SinaproComboboxTitulo
    rm(compoments): SinaproComboboxTitulo
  -->
  <div id="">
     <ErroNotificacao :erros="erros"/>
    <div id='container' style="margin:0px auto 0; width:100%;">
        <ejs-dropdownlist 
          ref='comboboxObj'    
          :dataSource='dataSource'
          :fields='fields'
          popupHeight="200"
          popupWidth="100%"
          :change="onChange"
          :ignoreAccent='true'         
          :allowFiltering='true'
          v-model="titulo"   
          :floatLabelType="labelType"          
          :placeholder="placeholder"       
        ></ejs-dropdownlist>  
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";
import Vue from 'vue';
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(ComboBoxPlugin);

export default {
  data (){    
    return {
      labelType: "Auto",
      placeholder: "Descrição do serviço",
      bluebg: "dropdown-bg-blue",
      labelType: "Auto",
      selectedValue: this.$store.state.sinapro_categoria_titulo.nome,     
      dataSource : null,
      fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'nome' },
      titulo: this.$store.state.sinapro_categoria_titulo.nome,
      erros: [],
    }   
  },
  methods:{

    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16&nivel=2`).then(response => {
        let lista = [];
        let listaCadastroTitulo = [];

        // lista.push('TODOS');   
        response.data.sinapro_categoria.forEach((item) => {     
        
          listaCadastroTitulo.push(item);
          lista.push(item.nome);
          
        })    
        this.ddldata = lista
        this.dataSource = listaCadastroTitulo;       
        //  this.$refs.comboboxObj.ej2Instances.value = this.value;
      console.log(listaCadastroTitulo)

        // console.log(this.$store.state.sinapro_categoria_titulo.nome)
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    },

    onChange: function(args) {
      // console.log(args)
      if (args.isInteracted) {  
        console.log(args.itemData)   
        console.log(this.$route.params.id)
        this.erros = [];
        api.put(`servicos/atualizar/`,{
          veiculo: 'sinapro',
          filtro: 'titulo_detalhe',             
          usuario_id: 17,
          empresa_id: 16,
          servicos_id: this.$route.params.id,
          categoria_subs_categoria_pai_id: args.itemData.id,  
        })
        .then((response) => {

          console.log(response.data)        
          this.$refs.comboboxObj.ej2Instances.focusOut();
            
          // this.getServicos();
          // this.$store.dispatch("getUsuario");
          // this.$router.push({ name: "usuario-produto" });
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
          // console.log(error)
          
        }); 
      }      
    }
  },
  created(){
    this.getServicos();
 
  }
 

  
  
}
</script>
<style>
@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>