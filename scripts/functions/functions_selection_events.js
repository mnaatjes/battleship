/*-----------------------------------------------------------------------------------*/
// Battleship: Functions - Selection  Events
/*-----------------------------------------------------------------------------------*/
/*------------------------------------------------------*/
/***
 * @name onHoverPos
 */
/*------------------------------------------------------*/
function onHoverPos(){
    const select = new SelectionObject(this);
    // check if ship selected by user in switchboard
    if(select.ship_active.length != 0){
        // check if ship NOT already plotted
        if(!select.ships_plotted.includes(select.ship_type)){
            // validate result
            if(select.adjacent_arr.length != 0){
                // alter button attributes
                select.updatePosHovered();
            } else {
                // not enough room for vessel plot
                screen.innerHTML = `Not enough room for ${select.ship_type.toUpperCase()}`;
            }
        }
    }
    else {
        screen.innerHTML = 'No Vessel Selected!';
    }
}
/*------------------------------------------------------*/
/***
 * @name onClickPos
 * @typedef {function}
 */
/*------------------------------------------------------*/
function onClickPos(){
    const select = new SelectionObject(this);
    // check if ship selected by user in switchboard
    if(select.ship_active.length != 0){
        // check if ship NOT already plotted
        if(!select.ships_plotted.includes(select.ship_type)){
            // validate result
            if(select.adjacent_arr.length != 0){
                // upload selection
                select.updateShipsPlotted();
            }
        } else {
            screen.innerHTML = ship_type.toUpperCase() + ': Already Plotted!';
        }
    } else {
        screen.innerHTML = 'No Vessel Selected!';
    }
}
/*------------------------------------------------------*/
/***
 * @name onMouseOutPos
 */
/*------------------------------------------------------*/
function onMouseOutPos(){
    // cycle all btns and reset attribute
    let btns = document.querySelectorAll('.btn--pos');
    for(let i = 0; i < btns.length; i++){
        let btn_state = btns[i].getAttribute('data-select');
        // validate already selected
        if (btn_state == 'false') {
            btns[i].setAttribute('data-select', '');
        }
    }
}
