# LAYOUTS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Application Layouts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/views#layouts).

```javascript
recordDoubleClick: function(args) {
  this.UPDATE_SINAPRO_CATEGORIA_TITTULO(args.rowData)
  this.$refs.grid.filterByColumn('nome', 'equal', args.rowData.nome)
  this.$refs.dropdownObj.ej2Instances.value = args.rowData.nome;
}
```

### exemplo de dados aceito em dropdownlist

```javascript
sportsData: [
  { Id: 'game1', Game: 'Badminton', New: 'valor 1' },
  { Id: 'game2', Game: 'Football', New: 'valor 2' },
  { Id: 'game3', Game: 'Tennis', New: 'valor 3' }
],
fields: { text: 'nome', value: 'id' }
```

### retorna valor da linha selecionada no grind syncfusion

```javascript
console.log(args.rowData);
```

### função usado no crud no grind dialog

```javascript
actionBegin: function(args) {
if (args.requestType === "save") {
  console.log(args.data); // retorna valor adicionado

  // aqui está ocorrendo uma mutação utilizando valores recuperados
  this.UPDATE_SINAPRO_CATEGORIA_ITEM({
  nivel: 3,
  sinapro_id: 582,
  nome: args.data.nome,
  sinapro_numero_item: args.data.item,
  sinapro: 1,
  sinapro_item_cabecalho_id: 1
  })
} else if (args.requestType === "delete") {
    // faça algo
  }
}
```

### manter apenas uma linha de dados no grid

```javascript
// em data. aqui estamos usando dados do vuex
state: {
  gridOrderData: this.$store.state.sinapro_categoria_item
}

// no grind
:dataSource='this.state.gridOrderData'

// aqui atualizamos para o valor que precisamos manter no grid
this.state.gridOrderData = [
  {
    nome: args.data.nome,
    sinapro_numero_item: args.data.sinapro_numero_item
  }
];
```

### fazendo muatação após método post no grind syncfusion

```javascript
console.log(args.data.nome);
this.UPDATE_SINAPRO_CATEGORIA_ITEM({
  nivel: 3,
  sinapro_id: this.sinapro_categoria_titulo.sinapro_id,
  nome: args.data.nome,
  sinapro: 1
});
```
