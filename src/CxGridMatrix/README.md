# CxGridMatrix ( factory )

- **module**  `ng.cx.grid.CxGridMatrix`
- **factory** `CxGridMatrix`

### Constructor

```
    CxGridMatrix(colHeaders: any[], rowHeaders: any[], cells: any[[]] | CxMatrix)
```

### Properties

- **width** : ( number ).
- **height** : ( number ).
- **rowHeaders** : ( any[] ).
- **colHeaders** : ( any[] ).
- **cells**: ( CxMatrix ).

### Methods

- **getCellAt(col, row)**
- **getColHeaderAt(index)**
- **getRowHeaderAt(index)**
- **getColAt(index)**
- **getRowAt(index)**
- **getAxisByHeader(header)**
- **addColAt(index, header, cells)**
- **addRowAt(index, header, cells)**
- **getCopy()**
- **map(mapColHeaderFn, mapRowHeaderFn, mapCellsFn)**
- **mapColHeaders(mapFn)**
- **mapRowHeaders(mapFn)**
- **mapCells(mapFn)**
- **onColAdded(handler)**
- **onRowAdded(handler)**


