/*-----------------------------------------------------------------------------------*/
// Battleship: Functions - Selection
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
/***
 * @name    getAdjacentPos
 * @param   {number} index index of array from which adjacent indexes are returned
 * @param   {number} size int of ship size: number of indexes to return
 * @param   {bool} orientation horizontal or vertial search conditions for adjacent indexes
 * @param   {array} occupied_arr array of already occupied positions
 * @returns {array} result_arr adjacent indexes + search index
 */
/*------------------------------------------------------*/
function getAdjacentPos(pos_index, ship_size, orientation, pos_plotted) {
    let result_arr  = [];
    let result_int  = pos_index;
    let x_len       = 10;
    let y_len       = 10;
    let adj_size    = ship_size - 1;
    /*
    console.log(pos_index);
    // size undefined???
    console.log(ship_size);
    console.log(orientation);
    console.log(pos_plotted);
    */
    // horizontal orientation
    if (orientation == true) {
        for (let i = 1; i <= adj_size; i++) {
            // module result != 0
            if (result_int % x_len != 0) {
                // subtract one from result
                result_int = pos_index - i;
                // if occupied does NOT include result:
                if (!pos_plotted.includes(result_int)) {
                    result_arr.push(result_int);
                } else break;
            } else break;
        }                    
    } else if (orientation == false) {
        for(let i = 1; i <= adj_size; i++){
            if(Math.floor(result_int/y_len) != (y_len - 1)){
                result_int = pos_index + (y_len * i);
                // if occupied does NOT include result:
                if(!pos_plotted.includes(result_int)){
                    result_arr.push(result_int);
                } else break;
            } else break;
        }
    }

    // add original index to result_arr
    result_arr = result_arr.concat(pos_index);
    // ensure result is large enought to fill size requirements
    if (result_arr.length < ship_size || pos_plotted.includes(pos_index)) {
        result_arr = [];
    }
    // vertical
    return result_arr;
}
/*------------------------------------------------------*/
// Get Associated Coordinate from Index
/*------------------------------------------------------*/
function getCoord(index, x_len, y_len, arr) {
    let x = 0;
    let y = 0;
    //let x_len = 10;
    //let y_len = 10;
    let coords = [];
    if (!(index <= (x_len-1))) {
        // split index
        let digits = index.toString().split('');
        digits.forEach(num => {
            coords.push(parseInt(num));
        });
        x = coords[1];
        y = coords[0];
    } else {
        x = index;
    }

    let result = arr[y][x];
    return result;
}
/*------------------------------------------------------*/
/***
 * @name selectShipLabel
 * @param {HTMLElement} btn_ship switchboard button of ship name
 * @returns {null} nothing returned
 */
/*------------------------------------------------------*/
function selectShipLabel(btn_ship){
    // get label
    let btn_state       = btn_ship.getAttribute('data-select');
    let ship_type       = btn_ship.id;
    let ships_plot_arr  = JSON.parse(data.getAttribute('data-plotted-ships'));
    let label           = switchboard.querySelector(`[for="${ship_type}"]`);

    // cycle through labels and de-select if not aleady plotted
    for(let i = 0; i < labels_ships.length; i++){
        let ele         = labels_ships[i];
        let ele_state   = ele.getAttribute('data-select');
        let btn_ele     = btns_ships[i];
        // if not plotted
        if(ele_state != 'true'){
            // reset label
            ele.setAttribute('data-select', 'none');
            // reset btn
            btn_ele.setAttribute('data-select', 'false');
        }
    }
    // check button state: false
    if(btn_state == 'false'){
        // check if ship already plotted
        if(!ships_plot_arr.includes(ship_type)){
            // change label state
            label.setAttribute('data-select', 'false');
            // change btn state
            btn_ship.setAttribute('data-select', 'true');
            // update message
            screen.innerHTML = 'You have selected:<br>' + label.innerHTML;
            // prevent selection of other elements
            data.setAttribute('data-ship-active', ship_type);
        }
    // check button state: true
    } else {
        // deselect ship: change button state
        btn_ship.setAttribute('data-select', 'false');
        // deselect ship: change label state
        label.setAttribute('data-select', 'none');
        // deselect ship: remove from ships_plotted
        let plot_index = ships_plot_arr.indexOf(ship_type);
        delete ships_plot_arr[plot_index];
        // filter array: clean up empty values
        ships_plot_arr = ships_plot_arr.filter(function(ele){
            return ele != null;
        });
        // update data element
        data.setAttribute('data-plotted-ships', JSON.stringify(ships_plot_arr));
        // update data attribute active
        data.setAttribute('data-ship-active', '');
        // search sessionStorage for plotted positions
        let fleet_obj       = JSON.parse(sessionStorage.getItem(storage_name));
        let player_fleet    = fleet_obj.player_fleet;
        // find shiptype in playerfleet object
        player_fleet.forEach(ship => {
            if(ship[0] == ship_type){
                // loop indexes and de-select buttons
                ship[1].indexes.forEach(index => {
                    btns_pos[index].setAttribute('data-select', 'none');
                });
                // reset ship indexes and coords
                ship[1].indexes = [];
                ship[1].coords  = [];
            }
        });
        // save sessionStorage player_fleet
        sessionStorage.setItem(storage_name, JSON.stringify(fleet_obj));
        // check inputs to make sure they were not filled
        let input_player_obj    = document.getElementById('fleet_obj');
        let input_enemy_obj     = document.getElementById('enemy_obj');
        // check attribute value
        let input_size = input_player_obj.value.length;
        if(input_size > 0){
            // clear values
            input_player_obj.setAttribute('value', '');
            input_enemy_obj.setAttribute('value', '');
        }
        
        // print message
        screen.innerHTML = ship_type.toUpperCase() + ': Removed';
    }
}
/*------------------------------------------------------*/
/***
 * @name selectOrientation
 * @param {HTMLElement} dial switchboard button of ship name
 * @returns {null} nothing returned
 */
/*------------------------------------------------------*/
function selectOrientation(dial){
    // get vars
    let dial_state      = JSON.parse(dial.getAttribute('data-select'));
    let horizontal      = document.getElementById('label-horizontal');
    let vertical        = document.getElementById('label-vertical');

    // if horizontal state
    if(dial_state == true){
        // change dial state
        dial.setAttribute('data-select', 'false');
        // change label states
        horizontal.setAttribute('data-state', 'false');
        vertical.setAttribute('data-state', 'true');
        // update data element
        data.setAttribute('data-orientation', 'false');
    // if vertical state
    } else {
        // change dial state
        dial.setAttribute('data-select', 'true');
        // change label states
        horizontal.setAttribute('data-state', 'true');
        vertical.setAttribute('data-state', 'false');
        // update data element
        data.setAttribute('data-orientation', 'true');
    }
}
/*------------------------------------------------------*/
/***
 * @name getPlottedPositions
 * @param {array} fleet_arr obj from sessionStorage; JSON.parsed
 * @returns {array} list of occupied index positions
 */
/*------------------------------------------------------*/
function getPlottedPositions(fleet_arr){
    let result = [];
    // loop fleet array
    fleet_arr.forEach(ship => {
        let ship_indexes = ship[1].indexes;
        // loop ship indexes: if occupied
        if(ship_indexes.length > 0){
            ship_indexes.forEach(index => {
                result.push(index);
            });
        }
    });
    return result;
}
/*------------------------------------------------------*/
/***
 * @name initializeSelection
 * @param {HTMLElement} board_target selection board target
 * @param {sessionStorage} session_name
 */
/*------------------------------------------------------*/
function initializeSelection(board_target, session_name, screen){
    // build selection board
    drawPlotBoard(board_target);
    // ajax request
    fetchJSON('JSON/fleet_default.json', function(xhttp){
        let fleet_default = JSON.parse(xhttp.responseText);
        sessionStorage.setItem(session_name, JSON.stringify(fleet_default));
    });
    // print to screen
    screen.innerHTML = 'Welcome to the Battleship Program...';
}
/*------------------------------------------------------*/
/***
 * @name formValidation
 * @param {HTMLElement} btn_submit html submit button element
 */
/*------------------------------------------------------*/
function formValidation(btn_submit){
    let player_name     = document.getElementById('owner').value;
    let input_object    = document.getElementById('player_fleet').value;
    // submit form
}
/*------------------------------------------------------*/
/***
 * @name buildPlayerBoard
 * @param input_target where to place JSON data
 */
/*------------------------------------------------------*/
function buildPlayerBoard(input_target){
    let player_fleet = [];
    // pull fleet data from session storage
    player_fleet.push(JSON.parse(sessionStorage.getItem(storage_name)));
    // insert into input
    input_target.setAttribute('value', JSON.stringify(player_fleet));
}
/*------------------------------------------------------*/
/***
 * @name buildEnemyBoard
 * @param input_target where to place JSON data
 */
/*------------------------------------------------------*/
function buildEnemyBoard(input_target){
    const session_name_enemy = 'enemy_obj';
    // ajax request
    // TODO: fix latency issues
    fetchJSON('JSON/fleet_default.json', function(xhttp){
        let fleet_default = JSON.parse(xhttp.responseText);
        sessionStorage.setItem(session_name_enemy, JSON.stringify(fleet_default));
    });
    // fetch session storage item
    let enemy_obj       = JSON.parse(sessionStorage.getItem(session_name_enemy));
    let enemy_fleet     = enemy_obj.player_fleet;
    let occupied_arr    = [];
    // loop through ships
    enemy_fleet.forEach(ship => {
        // get adjacent array
        let adjacent_arr = [];
        let i = 0;
        // loop until positions found
        while(i < ship[1].size){
            let orientation     = Boolean(Math.floor(random(0, 2)));
            let index           = getStartIndex(occupied_arr);
            adjacent_arr        = getAdjacentPos(index, ship[1].size, orientation, occupied_arr);
            i = adjacent_arr.length;
        }
        // loop results and get coords
        let coords      = [];
        let coord_board = buildBoardArray_1d();
        adjacent_arr.forEach(index => {
            // get coords
            coords.push(coord_board[index]);
            // push onto occupied array
            occupied_arr.push(index);
        });
        // store values
        ship[1].indexes = adjacent_arr;
        ship[1].coords  = coords;
    });
    // store enemy object in input
    input_target.setAttribute('value', JSON.stringify(enemy_obj));

}
/*------------------------------------------------------*/
/***
 * @name getShipSize
 * @param {string} ship_type
 * @param {Array} fleet_arr
 * @returns {number} int ship size
 */
/*------------------------------------------------------*/
function getShipSize(ship_type, fleet_arr){
    let result;
    // loop fleet array
    fleet_arr.forEach(ship => {
        let ship_name = ship[0];
        if(ship_name == ship_type){
            result = ship[1].size;
        }
    });
    return result;
    
}
/*------------------------------------------------------*/
/***
 * @name getStartIndex
 * @param {array} occupied_arr
 * @return {number} rand_index
 */
/*------------------------------------------------------*/
function getStartIndex(occupied_arr){
    for(let i = 0; i < 99; i++){
        let rand_index = parseInt(Math.floor(random(0, 99)));
        if(!occupied_arr.includes(rand_index)){
            return rand_index;
        } else {
            rand_index = parseInt(Math.floor(random(0, 99)));
        }
    }
}