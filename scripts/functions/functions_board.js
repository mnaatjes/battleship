/*-----------------------------------------------------------------------------------*/
// Battleship: Functions - Board
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
// Build Display Board
/*------------------------------------------------------*/
function buildBoardArray_1d() {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var numbers = range(1, 10);
    var board   = [];

    // build board
    letters.forEach(x => {
        numbers.forEach(y => {
            value = x + y;
            board.push(value);
        });
    });
    return board;                
}
/*------------------------------------------------------*/
// Build Board Coordinate Array
/*------------------------------------------------------*/
function buildBoardArray_2d() {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var numbers = range(1, 10);
    var board   = [];
    var counter = 1;

    // build board
    letters.forEach(x => {
        let row = [];
        numbers.forEach(y => {
            value    = x + y;
            counter += 1;
            row.push(value);
            if (counter > 10) {
                board.push(row);
                row     = [];
                counter = 1;
            }
        });
    });
    return board;
}
/*------------------------------------------------------*/
/***
 * @name drawPlotBoard displays buttons for plotting positions for player
 * @param {HTMLElement} target div container for board element
 */
/*------------------------------------------------------*/
function drawPlotBoard(target){
    let board_arr   = buildBoardArray_1d();
    let table       = document.createElement('table');
    let row         = 0;
    let index       = 0;
    // cycle rows
    for(row; row < 10; row++){
        // define vars
        let tr = document.createElement('tr');
        // cycle cols
        for(let col = 0; col < 10; col ++){
            // define elements and vars
            let pos = board_arr[index];
            let td  = document.createElement('td');
            let btn = `<div id="${index}" data-select="none" class="btn--pos">${pos}</div>`;
            // append
            td.innerHTML = btn;
            tr.appendChild(td);
            // increment index
            index++;
        }
        // append row to table
        table.appendChild(tr);
    }
    // append to target container
    target.appendChild(table);
}
/*------------------------------------------------------*/
/***
 * @name drawPlayerBoard 
 * @param {object} board_state enemy boardstate
 */
/*------------------------------------------------------*/
function drawPlayerBoard(board_state){
    let target  = document.getElementById('player_board');
    let table   = document.createElement('table');
    let row     = 0;
    let index   = 0;
    // cycle rows
    for(row; row < 10; row++){
        // define vars
        let tr = document.createElement('tr');
        // cycle cols
        for(let col = 0; col < 10; col ++){
            // define elements and vars
            let pos         = board_state[index].coord;
            let td          = document.createElement('td');
            let played      = board_state[index].play_state;
            let occupied    = board_state[index].occupied;
            // define states
            let btn = `<div id="${index}" data-occupied="${occupied}" data-play="${played}" class="btn--game">${pos}</div>`;
            // append
            td.innerHTML = btn;
            tr.appendChild(td);
            // increment index
            index++;
        }
        // append row to table
        table.appendChild(tr);
    }
    // append to target container
    target.appendChild(table);
}
/*------------------------------------------------------*/
/***
 * @name drawRadarBoard
 * @param {HTMLElement} target
 * @param {bool} player_type enemy or player board; true = player, false = enemy
 * @param {object} board_state 
 */
/*------------------------------------------------------*/
function drawRadarBoard(target, player_type, board_state){
    let board_arr   = buildBoardArray_1d();
    let parent      = target.parentElement;
    let label       = parent.querySelector('.radar__label');
    let table       = document.createElement('table');
    let row         = 0;
    let index       = 0;
    let player_name = board_state[0].owner;
    // cycle rows
    for(row; row < 10; row++){
        // define vars
        let tr = document.createElement('tr');
        // cycle cols
        for(let col = 0; col < 10; col ++){
            // define elements and vars
            let pos     = board_arr[index];
            let td      = document.createElement('td');
            let hit     = `<img src="assets/icons/icon_explosion.svg">`;
            let miss    = `<img src="assets/icons/water.svg">`;
            let ship    = `<i class="fa fa-ship"></i>`;
            let blank   = ``;
            let icon;
            // build markup (icon): player
            if(player_type == true) {
                // position played
                if(board_state[index].play_state == true){
                    // if occupied
                    if(board_state[index].occupied == true){
                        icon = hit;
                    // if unoccupied
                    } else {
                        icon = miss;
                    }
                // position unplayed
                } else {
                    // if occupied
                    if(board_state[index].occupied == true){
                        icon = ship;
                    // if unoccupied
                    } else {
                        icon = blank;
                    }
                }
            // build markup (icon): enemy
            } else {
                // position played
                if(board_state[index].play_state == true){
                    // if occupied
                    if(board_state[index].occupied == true){
                        icon = hit;
                    // if unoccupied
                    } else {
                        icon = miss;
                    }
                // position unplayed
                } else {
                    icon = blank;
                }
            }
            // append
            td.innerHTML = icon;
            td.id        = `${player_name}-${pos}`;
            tr.appendChild(td);
            // increment index
            index++;
        }
        // append row to table
        table.appendChild(tr);
    }
    // draw lable
    label.innerHTML = player_name;
    // append to target container
    target.appendChild(table);
}
/*------------------------------------------------------*/
/***
 * @name updateRadarBoard
 * @param {object} board_state_item
 */
/*------------------------------------------------------*/
function updateRadarBoard(board_state_item){
    // boardstate vars
    let player_name = board_state_item.owner;
    let position    = board_state_item.coord;
    let occupied    = board_state_item.occupied;
    //console.log(position);
    // markup vars
    let td      = document.getElementById(`${player_name}-${position}`);
    let hit     = `<img src="assets/icons/icon_explosion.svg">`;
    let miss    = `<img src="assets/icons/water.svg">`;
    let ship    = `<i class="fa fa-ship"></i>`;
    let blank   = ``;
    let icon;
    // build markup (icon): both player_types
    // if occupied
    if(occupied == true){
        icon = hit;
    // if unoccupied
    } else {
        icon = miss;
    }
    // append
    td.innerHTML = icon;
}
/*------------------------------------------------------*/
/***
 * @name setBoardState
 * @param {string} player_name
 * @param {object} fleet
 * @example board_state[index] = board_item {
        owner: 'player',
        coord: 'A1',
        ship_type: 'submarine',
        occupied: true, // occupied
        play_state: false // not played
    }
 * @return {Array} result: array of board_item objects
 */
/*------------------------------------------------------*/
function setBoardState(player_name, fleet_arr){
    let result      = [];
    let ref_board   = buildBoardArray_1d();
    // loop reference board
    ref_board.forEach((coord, index) => {
        // define flag
        let flag        = false;
        let board_item  = {};
        // loop fleet
        for(let i = 0; i < fleet_arr.length; i++){
            let occupied_indexes = fleet_arr[i][1].indexes;
            // if reference_board index == ship_index
            if(occupied_indexes.includes(index)){
                // alter flag
                flag = true;
                // define board_item values
                board_item.occupied     = true;
                board_item.ship_type    = fleet_arr[i][0];
            } else if(!occupied_indexes.includes(index)) {
                // if unoccupied
                board_item.occupied     = false;
                board_item.ship_type    = '';
                // set flag
                if(i == fleet_arr.length - 1){ flag = true;}
            }
            // default board_item values
            board_item.coord        = coord;
            board_item.owner        = player_name;
            board_item.play_state   = false;
            
            // break loop when flag true
            if(flag == true){ break;}
        }
        // push onto array
        if(flag == true) {
            result.push(board_item);
        }
    });
    return result;
}
/*------------------------------------------------------*/
/***
 * @name updateBoardState
 * @param {object} board_state
 * @param {number} move_index
 * @example board_state[index] = board_item {
        owner: 'player',
        coord: 'A1',
        ship_type: 'submarine',
        occupied: true, // occupied
        play_state: false // not played
    }
 * @return {Array} board_state : array of edited board_state
 */
/*------------------------------------------------------*/
function updateBoardState(board_state, move_index){
    for(let i = 0; i < board_state.length; i++){
        if(i == move_index){
            board_state[i].play_state = true;
        }
    }
    return board_state;
}
/*------------------------------------------------------*/
/***
 * @name updatePlayerFleet
 * @param {object} player_fleet
 * @param {array} board_state
 * @return {object} player_fleet
 */
/*------------------------------------------------------*/
function updatePlayerFleet(player_fleet, board_state){
    result_fleet = [];
    // define temp array of played indexes
    let play_index_arr = [];
    // loop board_state and extract played indexes
    board_state.forEach((item, index) => {
        if(item.play_state == true){
            play_index_arr.push(index);
        }
    });
    // loop fleet object
    player_fleet.forEach(ship_obj => {
        let result_arr      = [];
        let ship_type       = ship_obj[0];
        let ship_indexes    = ship_obj[1].indexes;
        let ship_coords     = ship_obj[1].coords;
        let ship_sunk       = ship_obj[1].sunk;
        let ship_size       = ship_obj[1].size;
        let temp_index_arr  = [];
        // loop ship indexes
        if(ship_sunk == false){
            ship_indexes.forEach(index => {
                // check against played index positions
                if(play_index_arr.includes(index)){
                    // dump index into temp array to check length
                    temp_index_arr.push(index);
                }
            });
            // check temp_arr length against ship size
            if (temp_index_arr.length == ship_size) {
                // change sunk state
                ship_sunk = true;
                // print to screen
                screen.innerHTML = ship_type.toUpperCase() + ' has been sunk!';
            }
            result_arr = [
                ship_type, {
                    indexes: ship_indexes,
                    coords: ship_coords,
                    size: ship_size,
                    sunk: ship_sunk
            }];
            result_fleet.push(result_arr);
        }
    });
    return result_fleet;
}