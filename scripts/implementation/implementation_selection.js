/*-----------------------------------------------------------------------------------*/
// Battleship: Implementation - Selection
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
// Build Selection Board
/*------------------------------------------------------*/
btns_pos.forEach(btn => {
    // hover
    btn.addEventListener('mouseover', onHoverPos);
    // click
    btn.addEventListener('click', onClickPos);
    // mouse-out
    btn.addEventListener('mouseout', onMouseOutPos);
});
