"use strict";
class Map {
    constructor() {
        this.mapItems = [];
    }
    empty() {
        return (this.mapItems.length === 0);
    }
    size() {
        return (this.mapItems.length);
    }
    insert(key, value) {
        this.mapItems[this.mapItems.length] = { key: key, value: value };
    }
    update(key, value) {
        for (var i = 0; i < this.mapItems.length; i++) {
            if (this.mapItems[i].key === key) {
                this.mapItems[i].value = value;
                return true;
            }
        }
        return false;
    }
    contains(key) {
        for (var i = 0; i < this.mapItems.length; i++) {
            if (this.mapItems[i].key === key) {
                return true;
            }
        }
        return false;
    }
    get(key) {
        for (var i = 0; i < this.mapItems.length; i++) {
            if (this.mapItems[i].key === key) {
                return this.mapItems[i].value;
            }
        }
        return String(null);
    }
}
exports.Map = Map;
class MapItem {
}
//# sourceMappingURL=Map.js.map