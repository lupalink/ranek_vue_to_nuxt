
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
    :fields="fieldsUsers"

    :allowFiltering='true'
  ></ejs-dropdownlist>
</template>

<script>
export default {
  data() {
    return {
      valores: this.$store.state.valores,
      fieldsUsers: { text: "nome", value: "nome" }
    };
  },
  methods: {
    doCustomAction: function(args) {
      // console.log(args);
      console.log(args.value);
      this.$eventHub.$emit("descricaoDoValor", args.value);
    },
  },
  };
</script>

<style>
</style>