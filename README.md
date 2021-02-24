# netv-box-selection

Box selection plugin for NetV.js(http://netv.zjuvag.org/)

![box-selection-demo](./images/box-selection.png)

## API reference

### `boxSelection = new BoxSelection(netv, configs)`

Create lasso handler

* `netv: NetV`: pass core NetV object
* `configs: {}`: key-value pair configs
    * `enable: bool`: default enable box-selection or not

### `boxSelection.dispose()`

Dispose boxSelection handler, clean related DOM element

### `boxSelection.enable()`

Manually enable box selection.

### `boxSelection.disable()`

Manually disable box selection.

### `boxSelection.onSelected(callback: (nodes: Node[]) => {})`

Set callback function, the callback can get selected nodes in NetV's Node type.