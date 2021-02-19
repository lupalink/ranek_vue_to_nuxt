<template>
  <!-- 
    rm(components): SinaproCadastroItem
    refactor(components): SinaproCadastroItem
    add(components): SinaproCadastroItem
  -->
  <div id="apps" >   
    <ErroNotificacao :erros="erros"/> 
    <h3>{{this.$store.state.sinapro_categoria_titulo.nome}}</h3>     
    <ejs-grid
    :dataSource='data'
    ref='grid'
    :allowFiltering='true' 
    height='273px' 
    :filterSettings='filterOptions' 
    :toolbar='toolbar' 
    :commandClick="commandClick" 
    :editSettings='editSettings' 
    :actionBegin='actionBegin'>  
      <e-columns> 
        <e-column field='sinapro_numero_item' headerText='Item' textAlign='Right' width=50></e-column>
        <e-column field='nome' headerText='Descrição do servico' width=120></e-column>
        <e-column headerText="" width="150" :commands="commands"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import { api } from "@/services.js";
import Vue from "vue";
import { GridPlugin, Filter, Toolbar, Search, Edit, CommandColumn} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
      data: '',
      data_sinapro_titulo: null,
      veiculo: '',
      servicos_id: '',
      categoria_sub_filho: '',
      usuario_id: '',
      empresa_id: '',
      id: '',
      nome: '',
      categoria_sub_filho_id: '',
      item: '',
      valores_id: '',
      valores_valor: '',

      categorias: [{
        categoria_sub_pai: '',
      }],
      erros: [],
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      // toolbarOptions: ['Search'], 
      formatOptions: { format:'C2', currency:'BRL' },
       filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      }, 
      commands: [{ buttonOption: { content: "Selecionar", cssClass: "e-flat" } }],
      
      ddldata: null,
      // ddldata: ['TODOS', 'ANÚNCIO PARA REVISTA', 'ANÚNCIO PARA JORNAL']      
    };
  },
  provide: {
    grid: [Filter, Toolbar, Search, Edit, CommandColumn]
  },
  computed: {
    ...mapState(['auth', 'login', 'sinapro_categoria_item', 'sinapro_categoria_titulo'])   
  },
  methods: {   
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_ITEM"]),
    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16&nivel=3`).then(response => {
        let lista = [];
        let listaCadastroTitulo = [];
     
        lista.push('TODOS');   
        response.data.sinapro_categoria.forEach((item) => {     
        
          listaCadastroTitulo.push(item);
          lista.push(item.nome);
          
        })    
        this.ddldata = lista
        this.data = listaCadastroTitulo;
 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    },
    onChange: function(args) {
      let element = document.createElement('p');
      if (args.isInteracted) {  
        // const filtro =  this.filtro = args.itemData.value
        // console.log(this.filtro)        
        if (args.itemData.value == 'TODOS') {
          this.$refs.grid.clearFiltering();
        } else {
          this.$refs.grid.filterByColumn('nome', 'equal', args.itemData.value)
        }      
      } 
    },
    actionBegin: function(args) { 
    if (args.requestType === "save") {      
      this.erros = [];  
      api.post(`/servicos`,
      { 
        veiculo: "sinapro",
	      filtro: "titulo",
        usuario_id: 17,
        servicos_insercao_id: 7,
        servicos_insercao_controle_id: 54,

        nivel: 3,
        sinapro_id: this.sinapro_categoria_titulo.sinapro_id,      
        nome: args.data.nome,
        sinapro_numero_item: args.data.sinapro_numero_item,
        nivel_descricao: 'SINAPRO',
        sinapro_item_cabecalho_id: 1,  
        sinapro: true,        
      })
      .then((r) => {
        this.getServicos();                               
        // this.$refs.grid.filterByColumn('nome', 'equal', this.sinapro_categoria_item[0].nome)
        this.$refs.grid.filterByColumn('nome', 'equal', args.data.nome) 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      }); 
    } else if (args.requestType === "delete") { 
       // console.log(args.data.servico_id)
        console.log(args.data[0]['servico_id'])
       // // alert(args.data.servico_id);      
      }
    },

    commandClick: function(args) {
      // debugger;
      // console.log(args.rowData)
      var rowID = args.target.parentElement
      .closest("tr")
      .getAttribute("data-uid");
      var rowData = JSON.stringify(args.rowData);
      // var rowData = args.rowData.nome;
      var rowIndex = args.target.parentElement
      .closest("tr")
      .getAttribute("aria-rowindex");
      alert(
        // "rowID: " +
        //   rowID +
        //   "\r\nrowIndex: " +
        //   rowIndex +
          "\r\nDESCRIÇÃO DO ITEM: " +
          rowData
      );
      this.UPDATE_SINAPRO_CATEGORIA_ITEM({ 
        id: args.rowData.id,
        nivel: 2,
        sinapro_id: this.sinapro_categoria_titulo.sinapro_id, 
        nome: args.rowData.nome,
        sinapro: 1,
        sinapro_numero_item: args.rowData.sinapro_numero_item,
        sinapro_item_cabecalho_id: 1  
      })  
    }
  },
  created() {
    // console.log(this.$store.state.sinapro_categoria_item)
    this.getServicos();
    // console.log(this.sinapro_categoria_titulo)


     
  },
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