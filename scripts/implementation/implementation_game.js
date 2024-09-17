/*-----------------------------------------------------------------------------------*/
// Battleship: Implementation - Game
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
// Listen to Gameboard
/*------------------------------------------------------*/
btns_game.forEach(btn => {
    // click
    btn.addEventListener('click', onClickGame);
});
/*------------------------------------------------------*/
/***
 * @name onClickGame 
 * @param {HTMLElement} this => btn
 */
/*------------------------------------------------------*/
function onClickGame(){
    let btn         = this;
    let played      = btn.getAttribute('data-play');
    let occupied    = btn.getAttribute('data-occupied');
    let game_state  = JSON.parse(sessionStorage.getItem(session_name_game));
    //console.log(Array.isArray(game_state[0].player_moves));

    // update player board
    btn.setAttribute('data-play', 'true');
    // print screen
    if(occupied == 'true'){
        screen.innerHTML = 'Hit!: ' + btn.innerHTML;
    } else {
        screen.innerHTML = 'Miss: ' + btn.innerHTML;
    }
    // update gamestate and execute computer play
    game_state = updateGameState(game_state, btn.id);
    //console.log(game_state);

    // upload to sessionStorage
    sessionStorage.clear();
    sessionStorage.setItem(session_name_game, JSON.stringify(game_state));
    //console.log(sessionStorage.session_game_state);

}