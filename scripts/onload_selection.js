/*-----------------------------------------------------------------------------------*/
// Battleship: OnLoad
/*-----------------------------------------------------------------------------------*/
const board         = document.getElementById('board_select');
const storage_name  = 'player_fleet';
const screen        = document.getElementById('screen');
window.onload       = initializeSelection(board, storage_name, screen);

/*------------------------------------------------------*/
// DOM Elements and variabled
/*------------------------------------------------------*/
const btns_pos        = board.querySelectorAll('.btn--pos');
const switchboard     = document.getElementById('switchboard');
const btns_ships      = switchboard.querySelectorAll('.btn--rocker');
const labels_ships    = switchboard.querySelectorAll('.label--rocker');
const data            = document.getElementById('data');