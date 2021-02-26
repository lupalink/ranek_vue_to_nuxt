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

### ação após clicar em editar

```javascript
if (args.requestType === "beginEdit") {
}
```

### ação após clicar em editar ou add

```javascript
if (args.requestType === "beginEdit" || args.requestType === "add") {
}
```

### Exemplo de dados para combobox

```javascript
  vegetableData: [
    { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
    { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item2' },
    { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item3' },
    { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item4' },
    { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item5' },
    { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item6' },
    { Vegetable: 'Green bean', Category: 'Beans', Id: 'item7' },
    { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item8' },
    { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item9' },
    { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item10' },
    { Vegetable: 'Anúncio para revista', Category: 'Bulb and Stem', Id: 'item11' }
  ],
  dataSource : null,
  fields : { groupBy: 'nivel_descricao', text: 'nome', value: 'id' }
```
