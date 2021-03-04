<template>
  <!-- 
    rm(components): SinaproCadastroTitulo
    refactor(components): SinaproCadastroTitulo
    add(components): SinaproCadastroTitulo
  -->
  <div id="app">  
    <ErroNotificacao :erros="erros"/>
    <div id='container' style="width:250px;">      
      <br> 
      <ejs-dropdownlist ref='dropdownObj' id='dropdownlist'  :dataSource='ddldata' placeholder='Selecione um serviço' :change="onChange">
      </ejs-dropdownlist>
    </div> 
      <!-- {{this.$store.state.titulo_sinapro.titulo_sinapro}} -->
      <ejs-grid ref='grid' :dataSource='data' :allowFiltering='true' height='273px' :filterSettings='filterOptions' :toolbar='toolbar' id='SinaproCadastroTitulo' :commandClick="commandClick"  :editSettings='editSettings' :actionBegin='actionBegin' :actionComplete='actionComplete'>  
        <e-columns>          
          <e-column field='sinapro_id' headerText='Sinapro ID' textAlign='Right' width=50 :isPrimaryKey='true'></e-column>
          <e-column field='nome' headerText='Serviço' width=120></e-column>
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
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.use(DialogPlugin);
export default {
  data() {
    return {
      modeSave: null,
      data: null, 
      erros: [],
      // toolbarOptions: ['Search'], 
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      formatOptions: { format:'C2', currency:'BRL' },
      filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      },       
      ddldata: null,
      commands: [{ buttonOption: { content: "Selecionar", cssClass: "e-flat" } }]      
    };
  },
  provide: {
    grid: [Filter, Toolbar, Search, Edit, CommandColumn], 
  },
  computed: {
    ...mapState(["auth", "login", "sinapro_categoria_titulo"])    
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_TITTULO"]),
    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16&nivel=2`).then(response => {
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
      if (args.isInteracted) {         
        if (args.itemData.value == 'TODOS') {         
        } else {
          console.log(args)
          this.$refs.grid.filterByColumn('nome', 'equal', args.itemData.value)         
        }      
      } 
    },
    actionBegin: function(args) { 
    if (args.requestType === "save") { 
      if(this.modeSave === true){    
      this.erros = [];  
      api.post(`/servicos`,
      { 
        veiculo: "sinapro",
	      filtro: "titulo",
        usuario_id: 17,
        servicos_insercao_id: 7,
        servicos_insercao_controle_id: 54,
        nivel: 2,
        sinapro_id: args.data.sinapro_id,      
        nome: args.data.nome,
        nivel_descricao: 'SINAPRO',
        sinapro: true,        
      })
      .then(() => {
        this.getServicos();
        this.$refs.grid.filterByColumn('nome', 'equal', args.data.nome) 
        // this.$refs.grid.filterByColumn('nome', 'equal', this.$store.state.sinapro_categoria_titulo.nome) 
        // this.$store.dispatch("getUsuario");
        // this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
        
      }); 
      } else {
        api.put(`/servicos/atualizar`,{ 
        veiculo: "sinapro",
	      filtro: "titulo",
        usuario_id: 17,
        empresa_id: 17,
        id: args.data.id,
        nivel: 2,
        sinapro_id: args.data.sinapro_id,      
        nome: args.data.nome,
        nivel_descricao: 'SINAPRO',
        sinapro: true,        
      }) 
      .then(() => {
        this.getServicos();
        this.$refs.grid.filterByColumn('nome', 'equal', args.data.nome) 
        // this.$refs.grid.filterByColumn('nome', 'equal', this.$store.state.sinapro_categoria_titulo.nome) 
        // this.$store.dispatch("getUsuario");
        // this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
        
      }); 
      }












      
    } else if (args.requestType === "delete") { 
       // console.log(args.data.servico_id)
      //  alert('chegou aqui')
        // console.log(args.data[0]['servico_id'])
       // // alert(args.data.servico_id);      
      }
    },
    
    commandClick: function(args) {
      // debugger;
      var rowID = args.target.parentElement
      .closest("tr")
      .getAttribute("data-uid");
      var rowData = JSON.stringify(args.rowData);
      var rowData = args.rowData.nome;
      var rowIndex = args.target.parentElement
      .closest("tr")
      .getAttribute("aria-rowindex");
      alert(
        // "rowID: " +
        //   rowID +
        //   "\r\nrowIndex: " +
        // rowIndex +
        "\r\nSEVIÇO SELECIONADO: " +
        rowData
        
      );         
      this.UPDATE_SINAPRO_CATEGORIA_TITTULO({ 
        id: args.rowData.id, 
        nivel: 2,
        sinapro_id: args.rowData.sinapro_id, 
        nome: args.rowData.nome,
        sinapro: 1,
      })   
    },
    actionComplete(args) {
    if (args.requestType === 'beginEdit') {
      this.modeSave = false
      console.log(this.modeSave)
    } else if (args.requestType === 'add') {
      this.modeSave = true
      console.log(this.modeSave)

      // (args.form.elements.namedItem('CustomerID')).focus();
      } else if (args.requestType === 'cancel') {
      this.modeSave = null
      console.log(this.modeSave)

      // (args.form.elements.namedItem('CustomerID')).focus();
      }
   }
  },
  created() {
    this.getServicos();
  },
}
</script>
<style>

@import "@/node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
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