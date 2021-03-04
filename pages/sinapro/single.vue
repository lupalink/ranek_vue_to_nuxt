<template>
  <div id="app">
    <div id='container' style="margin:0px auto 0; width:100%;">
        <br>
        <h4>SELECIONE UM SERVIÇO</h4>
        <!-- <h6>Alterar</h6> -->
        <ejs-combobox ref='comboboxObj' :value='titulo' id='combobox' :dataSource='vegetableData' :fields='fields' popupHeight="200" :change="onChange"  :ignoreAccent='true' :allowCustom='true'></ejs-combobox>
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
      vegetableData: null,
      
      // [
      //   { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
      //   { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item2' },
      //   { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item3' },
      //   { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item4' },
      //   { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item5' },
      //   { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item6' },
      //   { Vegetable: 'Green bean', Category: 'Beans', Id: 'item7' },
      //   { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item8' },
      //   { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item9' },
      //   { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item10' },
      //   { Vegetable: 'Anúncio para revista', Category: 'Bulb and Stem', Id: 'item11' }
      // ],
      fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'id' },
      // titulo: 'Anúncio para revista',
      // waterMark : 'Selecione um serviço',
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
        // this.ddldata = lista
        // this.dataSource = listaCadastroTitulo;
        console.log(this.vegetableData = listaCadastroTitulo)
 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    },









    onChange: function(args) {
      console.log(args)
      let element = document.createElement('p');
      if (args.isInteracted) {  
        // console.log(args.itemData)    
        if (args.itemData === null){
          this.$refs.comboboxObj.ej2Instances.value = 'Yarrow';
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


  },
 

  created() {
    this.getServicos();     
  },
  
}
</script>
<style>
@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>