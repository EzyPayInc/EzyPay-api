/**
 * Created by gustavoquesada on 10/23/16.
 */
export class Table {

    constructor(idTable, idRestaurant, tableNumber, isActive) {
        this.idTable = idTable;
        this.idRestaurant = idRestaurant;
        this.tableNumber = tableNumber;
        this.isActive = isActive;
    }
}