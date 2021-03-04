<template>
  <!-- 
    refactor(compoments): SinaproComboboxItem
    add(compoments): SinaproComboboxItem
    rm(compoments): SinaproComboboxItem
  -->
  <div id="container">
    <div id='container' style="margin:0px auto 0; width:100%;">
        <br>
        <!-- <h4>DESCRIÇÃO DO ITEM</h4> -->        
        <ejs-dropdownlist ref='comboboxObjs'
         id='comboboxItem'
         :dataSource='dataSource'
         :fields='fields'
         popupHeight="200"
         :change="onChange"
         :ignoreAccent='true'
         :allowCustom='true' 
         :allowFiltering='true' 
         v-model='item' 
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
      placeholder: "Descrição do item",
      bluebg: "dropdown-bg-blue",
      labelType: "Auto",
      dataSource : null,
      fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'nome' },
      item: this.$store.state.sinapro_categoria_item.nome
    }   
  },
  methods:{

    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16&nivel=3`).then(response => {
        let lista = [];
        let listaCadastroTitulo = [];
     
        // lista.push('TODOS');   
        response.data.sinapro_categoria.forEach((item) => {     
        
          listaCadastroTitulo.push(item);
          lista.push(item.nome);
          
        })    
        this.ddldata = lista
        this.dataSource = listaCadastroTitulo;
        // console.log(this.nomeData)
 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    }, 
    onChange: function(args) {
      // console.log(args)
      if (args.isInteracted) {  
        // console.log(args.itemData)   
        // console.log(this.$route.params.id)
        this.erros = [];
        api.put(`servicos/atualizar/`,{
          veiculo: 'sinapro',
          filtro: 'item_detalhe',             
          usuario_id: 17,
          empresa_id: 16,
          servicos_id: this.$route.params.id,
          categoria_subs_categoria_filho_id: args.itemData.id,  
        })
        .then((response) => {

          console.log(response.data)        
          this.$refs.comboboxObjs.ej2Instances.focusOut();
            
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