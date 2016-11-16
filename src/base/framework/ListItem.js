"use strict";
class ListItem {
    constructor(list, value, index) {
        this.list = list;
        this.index = index;
        this.value = value;
    }
    prev() {
        return this.list.get(this.index - 1);
    }
    next() {
        return this.list.get(this.index + 1);
    }
}
exports.ListItem = ListItem;
class List {
    constructor() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    add(value) {
        this.items.push(new ListItem(this, value, this.size()));
    }
    get(index) {
        return this.items[index];
    }
}
exports.List = List;
//# sourceMappingURL=ListItem.js.map