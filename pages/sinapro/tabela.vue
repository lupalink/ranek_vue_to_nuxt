<template>
  <!-- 
  refactor(pages): tabela
    add(pages): tabela
    rm(pages): tabela
  -->
  <div id="app">     
  <!-- {{ddldata}} -->
      
<!--       
      <div v-if="data">
        <h2>Titulo</h2>
        <div class="" v-for="(datas, index) in data" :key="index">
          <span>Serviço:</span>
            <ul>
              <li>
                {{datas.categoria_sub_pai}}
              </li>
            </ul>
        </div>
      </div>
      <PaginaCarregando v-else/>
 -->








       
      <div id='container' style="width:250px;">
        <br> 
        <ejs-dropdownlist id='dropdownlists'  :dataSource='ddldata' placeholder='Selecione um serviço' :change="onChange">
        </ejs-dropdownlist>
      </div>
        <ejs-grid ref='grid' :dataSource='data' :allowFiltering='true' height='273px' :filterSettings='filterOptions' :toolbar='toolbarOptions'  :editSettings='editSettings' :actionBegin='actionBegin' :commandClick='commandClick' :allowExcelExport='true'  :toolbarClick='toolbarClick'>  
            <e-columns>
               
               <!-- <e-column field='id' headerText='Resgistro ID' textAlign='Right' width=50  :isPrimaryKey='true'></e-column>
               <e-column field='categoria_sub_filho_id' headerText='Cabeçalho ID' textAlign='Right' width=50  :isPrimaryKey='true'></e-column> -->
                <e-column field='sinapro_id' headerText='Sinapro ID' textAlign='Right' width=50></e-column>
                <!-- <e-column field='categoria_sub_pai' headerText='Serviço' width=120></e-column> -->
                <e-column field='categoria_sub_pai' headerText='Titulo do serviço' width='150' editType='dropdownedit' :edit='editparams'></e-column>
               
                <e-column field='categoria_sub_filho' headerText='Descrição do serviço' width='150' editType='dropdownedit' :edit='editparams'></e-column>  
               
               
                <!-- <e-column field='categoria_sub_filho' headerText='Cabeçalho' width=120></e-column> -->

                <e-column field='item' headerText='Item id' width=100></e-column>
                <!-- <e-column field='valor_categoria' headerText='Descrição valor' width=100></e-column> -->
                  <e-column field='valor_categoria' headerText='Descrição do valor' width='150' editType='dropdownedit' :edit='editparams'></e-column>
                <e-column field='valor' headerText='Valor' width=100 :format='formatOptions' ></e-column>
                <e-column headerText="" width="150" :commands="commands"></e-column> 
            </e-columns>
            
        </ejs-grid>
        
        <ErroNotificacao :erros="erros"/>

    </div>
</template>
<script>
import { mapState } from "vuex";
import { api } from "@/services.js";
import Vue from "vue";
import { GridPlugin, Filter, Toolbar, Search, Edit, CommandColumn, ExcelExport } from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
    //   transition: {
    //   name: 'home',
    //   mode: 'out-in'
    // },
      data: null,
      data_sinapro_titulo: null,
      // veiculo: '',
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
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport'],
      toolbarOptions: ['ExcelExport'], 
      formatOptions: { format:'C2', currency:'BRL' },
       filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      },       
      ddldata: null,
      editparams: { params: { popupHeight: '300px' }},
      teste: 'teste',
      commands: [{ buttonOption: { content: "Detalhes", cssClass: "e-flat" } }]
    };
  },
  provide: {
    grid: [Filter, Toolbar, Search, Edit, CommandColumn, ExcelExport]
  },
  computed: {
    ...mapState(["auth", "login"])
  },
  methods: {
    toolbarClick: function(args) {
      console.log(args)
      // if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      // }
    },
    commandClick: function(args) {
      // debugger;
      // var rowID = args.target.parentElement
      // .closest("tr")
      // .getAttribute("data-uid");
      // var rowData = JSON.stringify(args.rowData);
      // // var rowData = args.rowData.nome; 
      // var rowIndex = args.target.parentElement
      // .closest("tr")
      // .getAttribute("aria-rowindex");
      // alert(
      //   // "rowID: " +
      //   //   rowID +
      //   //   "\r\nrowIndex: " +
      //   // rowIndex +
      //   "\r\nSEVIÇO SELECIONADO: " +
      //   rowData
       
      // );
      console.log(args.rowData.servico_id)
      this.$router.push({name: 'tabela-id-detalhes-inicial', params: {id: args.rowData.servico_id}});
      
    },        
    getServicos() {
      api.get(`servicos/buscar?
        veiculo=sinapro
        &filtro=servico    
        &usuario_id=17
        &servicos_praca_id=7
        &servicos_insercao_id=7
        &sinapro_id=1
        &empresa_id=16
        &nivel=2`
      ).then(response => {
        // console.log(response.data.sinapro_categoria_titulo)
        this.data = response.data.sinapro_servico;
        // console.log(response.data.sinapro_servico)
        let lista = [];
        let listaCadastroTitulo = [];
        lista.push('TODOS');
        response.data.sinapro_categoria.forEach((item) => {     
          listaCadastroTitulo.push(item);
          lista.push(item.nome);
        })        
        // console.log(lista);
        // console.log(this.r) 
        this.ddldata = lista
        // console.log(listaCadastroTitulo)
 
      });
    },
    onChange: function(args) {
      let element = document.createElement('p');
      if (args.isInteracted) {  
        const filtro =  this.filtro = args.itemData.value
        // console.log(this.filtro)        
        if (args.itemData.value == 'TODOS') {
          this.$refs.grid.clearFiltering();
        } else {
          this.$refs.grid.filterByColumn('categoria_sub_pai', 'equal', args.itemData.value)
        }      
      } 
    },
    // recordDoubleClick: function(args) { 
    //  // you can show Dialog component here 
    //   alert("dblclick"); 
    //     console.log(args.rowData.sinapro_id); 
    //  },
     
    actionBegin: function(args) { 
    if (args.requestType === "save") { 
      // console.log(args.data); // edited data 
      // PLease store this data in Vuex store 
      this.erros = [];
      console.log(args.data)
      // this.categoria_sub_filho = args.categoria_sub_filho
      // console.log( args.data.categoria_sub_filho)
      api.put(`servicos/atualizar/`,{
        veiculo: 'sinapro',
        filtro: 'servico',             
        usuario_id: 17,
        empresa_id: 16,
        servicos_id: args.data.servico_id,
        categoria_subs_categoria_pai_id: args.data.id,
        categoria_subs_categoria_filho_id: args.data.categoria_sub_filho_id,
        // item_sinapro_id: args.data,
        item_sinapro_numero_item: args.data.item,
        item_sinapro_item_cabecalho_id: 1,
        valores_valor_id: args.data.valor_id,
        valores_valor: args.data.valor
      })
      .then((response) => {

        console.log(response.data.data)

        this.getServicos();
        // this.$store.dispatch("getUsuario");
        // this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      });
  
    } else if (args.requestType === "delete") { 
      // console.log(args.data[0]['id'])
      let id = args.data[0]['servico_id']
      console.log(id)
      // let id = this.servicos_id
      api
        .delete(`servicos/deletar?veiculo=sinapro&filtro=servico&usuario_id=17&servicos_id=${id}&arquivar=0&restaurar=0&remover=1`)
          .then((response) => {
            console.log(response.data)
            this.getServicos();
          })
          .catch(error => {
            // console.log(error.reponse);
          });
       // console.log(args.data.servico_id)
        // console.log(args.data[0]['servico_id'])
      //  alert(args.data.servico_id);      
      }
    }
  },
  created() {
    this.getServicos();
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