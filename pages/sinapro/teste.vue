<template>
  <div id="app">
    <div id='container' style="margin:20px auto 0; width:500px;">
        <br>
        <ejs-dropdownlist id='dropdownlist' popupHeight='200px' placeholder='Select a nome' :fields='fields' :dataSource='dataSource'></ejs-dropdownlist>
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";
import Vue from 'vue';
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
export default {
  data () {
      var nomeData = [
        { nome: 'Ação Promocional', nivel_descricao: 'PLANEJAMENTO DE COMUNICAÇÃO', Id: 'item1' },
        { nome: 'Calendário Anual institucional', nivel_descricao: 'PLANEJAMENTO DE COMUNICAÇÃO', Id: 'item2' },
        { nome: 'Wheat grass', nivel_descricao: 'Leafy and Salad', Id: 'item3' },
        { nome: 'Yarrow', nivel_descricao: 'Leafy and Salad', Id: 'item4' },
        { nome: 'Pumpkins', nivel_descricao: 'Leafy and Salad', Id: 'item5' },
        { nome: 'Chickpea', nivel_descricao: 'Beans', Id: 'item6' },
        { nome: 'Green bean', nivel_descricao: 'Beans', Id: 'item7' },
        { nome: 'Horse gram', nivel_descricao: 'Beans', Id: 'item8' },
        { nome: 'Garlic', nivel_descricao: 'Bulb and Stem', Id: 'item9' },
        { nome: 'Nopal', nivel_descricao: 'Bulb and Stem', Id: 'item10' },
        { nome: 'Onion', nivel_descricao: 'Bulb and Stem', Id: 'item11' }
        ];
    return {
        dataSource : null,
        fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'id' }
    }
  },
  methods: {
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
        // console.log(this.nomeData)
 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    }
  }
  ,
  created(){
    this.getServicos();
    // console.log(this.dataSource)
  }
}

</script>
<style>
@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>