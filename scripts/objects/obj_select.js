/*-----------------------------------------------------------------------------------*/
// Battleship: Seelct Object
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
/***
 * @name SelectionObject
 * @typedef {FunctionConstructor}
 * @param {HTMLElement} btn_pos button position
 * @property {HTMLElement}
 * @property {HTMLElement}
 * @property {HTMLElement}
 * 
 */
/*------------------------------------------------------*/
function SelectionObject(btn_pos){
    // variables and objects
    this.pos_index      = parseInt(btn_pos.id);
    this.fleet_obj      = JSON.parse(sessionStorage.getItem(storage_name));
    this.player_fleet   = this.fleet_obj.player_fleet;
    this.pos_plotted    = getPlottedPositions(this.player_fleet);
    // HTML Attributes
    this.ship_active    = data.getAttribute('data-ship-active');
    this.ship_type      = this.ship_active.toLowerCase();
    this.ship_size      = getShipSize(this.ship_type, this.player_fleet);
    this.ships_plotted  = JSON.parse(data.getAttribute('data-plotted-ships'));
    this.orientation    = JSON.parse(data.getAttribute('data-orientation'));
    // Arrays and Objects
    this.adjacent_arr   = getAdjacentPos(this.pos_index, this.ship_size, this.orientation, this.pos_plotted);
    /*------------------------------------------------------*/
    /***
     * @name updatePosHovered
     * @typedef {Function}
     * @property {string} this.ship_type
     * @property {array} this.adjacent_arr 
     */
    /*------------------------------------------------------*/
    this.updatePosHovered = function(){
        let coords = '';
        // alter button attributes
        this.adjacent_arr.forEach(index => {
            let btn_adj = document.getElementById(index);
            coords     += `${btn_adj.innerHTML}, `;
            // set attributes
            btn_adj.setAttribute('data-select', 'false');
        });
        coords  = coords.slice(0, -2);
        let msg = `Selected: ${coords} for ${this.ship_type.toUpperCase()}`
        // print selection to screen
        screen.innerHTML = msg;
    };
    /*------------------------------------------------------*/
    /***
     * @name updateShipsPlotted
     * @typedef {Function}
     * @property {string} ship_type
     * @property {number} 
     */
    /*------------------------------------------------------*/
    this.updateShipsPlotted = function(index){
        let coords = [];
        // alter button states
        this.adjacent_arr.forEach(index => {
            // get associated coords from btn indexes
            let btn_adj = document.getElementById(index);
            // alter button state
            btn_adj.setAttribute('data-select', 'true');
            // push coordinate
            coords.push(btn_adj.innerHTML);
        });
        
        // update data-attribute: plotted-ships
        this.ships_plotted.push(this.ship_type);
        data.setAttribute('data-plotted-ships', JSON.stringify(this.ships_plotted));

        // alter label state of plotted ship
        let label = document.querySelector(`[for="${this.ship_type}"]`);
        label.setAttribute('data-select', 'true');

        // loop player_arr
        this.player_fleet.forEach(ship => {
            let ship_name = ship[0];
            if(ship_name == this.ship_type){
                // update indexes
                ship[1].indexes = this.adjacent_arr;
                // update coords
                ship[1].coords = coords;
            }
        });
        // store fleet object
        sessionStorage.setItem(storage_name, JSON.stringify(this.fleet_obj));

        // print to screen
        screen.innerHTML = `${this.ship_type.toUpperCase()}: has been plotted!`;

        // reset data-active ship attribute
        data.setAttribute('data-ship-active', '');

        // check if all plotted and commit to input elements
        if(this.ships_plotted.length == 5){
            // player input
            buildPlayerBoard(document.getElementById('fleet_obj'));
            // enemy input
            // TODO: Hiccup that doesn't build board on first attempt at 5 plots
            buildEnemyBoard(document.getElementById('enemy_obj'));
            // print to screen
            screen.innerHTML = 'Fleet Ready to Deploy!';
        }
    }
}