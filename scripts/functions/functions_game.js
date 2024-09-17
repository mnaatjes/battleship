/*-----------------------------------------------------------------------------------*/
// Battleship: Game
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
/***
 * @name initializeGame
 */
/*------------------------------------------------------*/
function initializeGame(){
    // ajax load: player
    fetchJSON('JSON/test.json', function(xhttp){
        let players_obj  = JSON.parse(xhttp.responseText);
        sessionStorage.setItem(session_name_fleet, JSON.stringify(players_obj));
    });
    // load Game
    loadGame();
}
/*------------------------------------------------------*/
/***
 * @name loadGame
 */
/*------------------------------------------------------*/
function loadGame(){
    // define variables
    let game_state      = [];
    let player_objects  = JSON.parse(sessionStorage.getItem(session_name_fleet));
    console.log(player_objects);
    // screen loader
    screen.innerHTML = 'Loading...';
    // loop player objects
    player_objects.forEach(player_obj => {
        // set board state
        let result          = {};
        let player_moves    = [];
        let player_name     = player_obj.player_name;
        let player_type     = player_obj.player_type;
        let player_fleet    = player_obj.player_fleet;
        let board_state     = setBoardState(player_name, player_fleet);
        // draw boards
        if(player_type == false){
            // draw radar board
            drawRadarBoard(player_radar, player_type, board_state);
            // draw playerBoard
            drawPlayerBoard(board_state);
        } else {
            // draw radar board
            drawRadarBoard(enemy_radar, player_type, board_state);
        }
        // build player_object
        result.player_name  = player_name;
        result.player_type  = player_type;
        result.player_fleet = player_fleet;
        result.board_state  = board_state;
        result.player_moves = player_moves;
        // push board_states into game_state
        game_state.push(result);
    });
    // clear sessionStorage of fleet values
    sessionStorage.clear();
    // load gamestate onto sessionStorage
    sessionStorage.setItem(session_name_game, JSON.stringify(game_state));
    if (sessionStorage.session_game_state) {
        // update screen message
        screen.innerHTML = 'You may commence firing!';
    } else {
        screen.innerHTML = 'Failed to load game. Please reload webpage';
    }
}
/*------------------------------------------------------*/
/***
 * @name updateGameState
 * @param {array} game_state
 * @param {number} move_index
 */
/*------------------------------------------------------*/
function updateGameState(game_state, move_index){
    // define result
    let result_game_state = [];
    // loop gamestates
    game_state.forEach(player_obj => {
        let result_obj      = {};
        let player_type     = player_obj.player_type;
        let player_move     = 0;
        let enemy_player    = '';
        // update enemy board_state
        if(player_type == false){
            // set move
            player_move = parseInt(move_index);
        } else {
            // timer
            setTimeout(function(){
                screen.innerHTML = 'Computer calculating firing solution...'
            }, 1000);
            // set move
            player_move = getPlayerMove(player_obj.player_moves);
        }
        // define player vars
        let player_board = updateBoardState(player_obj.board_state, player_move);
        let player_fleet = updatePlayerFleet(player_obj.player_fleet, player_board);
        let moves_array  = player_obj.player_moves;
        // update radars
        updateRadarBoard(player_board[player_move]);
        // update player_object
        result_obj.player_name  = player_obj.player_name;
        result_obj.player_type  = player_type;
        result_obj.player_fleet = player_fleet;
        result_obj.player_moves = moves_array;
        result_obj.board_state  = player_board;
        // push to game_state
        result_game_state.push(result_obj);
    });
    return result_game_state;
}
/*------------------------------------------------------*/
/***
 * @name getPlayerMove
 * @param {array} player_moves
 * @return {number} rand_move
 */
/*------------------------------------------------------*/
function getPlayerMove(player_moves){
    for(let i = 0; i < 99; i++){
        let rand_move = parseInt(Math.floor(random(0, 99)));
        if(!player_moves.includes(rand_move)){
            return rand_move;
        } else {
            rand_move = parseInt(Math.floor(random(0, 99)));
        }
    }
}