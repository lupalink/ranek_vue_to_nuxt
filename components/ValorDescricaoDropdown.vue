
<template>
  <!-- 
    refactor(compoments): ValorDescricaoDropdown
    add(compoments): ValorDescricaoDropdown
    rm(compoments): UsuaValorDescricaoDropdownrioForm
  -->
  <ejs-dropdownlist
    name="descricaoValoresDropdown"
    id="dropdownlist"
    v-model="data.valor_servico[0].valor_categorias[0].valor_descricao"
    :change="doCustomAction.bind(this)"
    placeholder="Selecione um item"
    :dataSource="valores"
    :fields="fieldsValores"
    :allowFiltering='true'
  ></ejs-dropdownlist>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  data() {
    return {
      valores: this.$store.state.alterar_valores,
      fieldsValores: { text: "nome", value: "nome" }
    };
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_VALORES_ATUALIZAR"]),

    doCustomAction: function(args) {
      // console.log(args.itemData);

        //formato original
        // this.$eventHub.$emit("descricaoDoValor", args.value);
      this.$eventHub.$emit("descricaoDoValor", args.value);
       this.$eventHub.$emit("descricaoDoValor", args.itemData);
      //  this.$eventHub.$emit("descricaoDoValorId", args.itemData);
      // this.UPDATE_SINAPRO_VALORES_ATUALIZAR(args.itemData)
    },
  },
  };
</script>

<style>
</style>