<template>
  <!-- 
    refactor(compoments): SinaproComboboxItem
    add(compoments): SinaproComboboxItem
    rm(compoments): SinaproComboboxItem
  -->
  <div id="container">
    <div id='container' style="margin:0px auto 0; width:100%;">
        <br>
        <h4>DESCRIÇÃO DO ITEM</h4>
        <!-- <h6>Alterar</h6> -->
        <ejs-combobox ref='comboboxObj' :value='item' id='comboboxItem' :dataSource='dataSource' :fields='fields' popupHeight="200" :change="onChange"  :ignoreAccent='true' :allowCustom='true' v-on:blur='handleBlur'></ejs-combobox>
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
      dataSource : null,
      fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'id' },
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
        if (args.itemData === null){
          this.$refs.comboboxObj.ej2Instances.value = this.$store.state.sinapro_categoria_item.nome
        }else {
          // console.log(args.itemData)
          // var numerosPermitidos = new Array("15", "457", "330", "13", "54", "589");
          //   if(numerosPermitidos.indexOf("15") != -1)
          // {  
          //   alert("encontrei");
          // }
        }        
        
        // console.log(args.previousItemData)
        // if (args.itemData === null) {
            
        //   // (this.$refs.comboboxObj.getDataByValue('Vegetable', 'equal', Cabbage)())
        //   // this.$refs.comboboxObj.getDataByValue('Vegetable', 'equal', 'Yarrow')
        //   // this.$refs.comboboxObj.ej2Instances.value = 'Yarrow';
        //   // this.$refs.comboboxObj.filter('Yarrow')
        //   // console.log(this.$refs.comboboxObj.filtering('Vegetable', 'equal', Cabbage)())
        //   // console.log(this.$refs.comboboxObj.value);
       
        //   // alert('chegou')
        // } else {
        //   this.$refs.comboboxObj.ej2Instances.value = 'Yarrow';
        //   console.log(args.itemData )
          // let r =Number.isInteger(r)
          // console.log(Number.isInteger(r))

          // if(!Number.isInteger(r)){
          //   this.$refs.comboboxObj.ej2Instances.value = 'Yarrow';
          // }
          
          //  console.log(this.$refs.comboboxObj.value = '12')
          //  this.$refs.comboboxObj.value = '12'
        // }      
      }      
    },
    handleBlur(e) {
      // console.log(this.$refs.comboboxObj.ej2Instances.value)
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