/*-----------------------------------------------------------------------------------*/
// Battleship: OnLoad - Game
/*-----------------------------------------------------------------------------------*/
const session_name_fleet    = 'session_fleet';
const session_name_game     = 'session_game_state';
const screen                = document.getElementById('screen');
const enemy_radar           = document.getElementById('enemy_radar');
const player_radar          = document.getElementById('player_radar');
window.onload               = initializeGame();

/*------------------------------------------------------*/
// Game Vars
/*------------------------------------------------------*/
const btns_game = document.querySelectorAll('.btn--game');