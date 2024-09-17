<?php

/**
 * getVarName function with html styling
 * @name dump
 * @param variable $variable : any variable to display
 * @return str variable name
 */
function getVarName($variable){
    // cycle all global variables
    foreach($GLOBALS as $var_name => $value){
        if($value == $variable){
            return $var_name;
        }
    }
}
/**
 * var_dump function with html styling
 * @name dump
 * @param variable $variable : any variable to display
 * @return HTML formatted string
 */
function banana($variable, $comments=""){
    // get var name
    $var_name = getVarName($variable);
    if(strlen($var_name) == 0){
        $var_name = 'undefined';
    }
    // vars
    $div_open   = '<div style="width:100%; border-top:1px solid red; border-bottom:1px solid red; padding:20px 0; margin: 20px 0;">';
    $div_close  = '</div>';
    // output to screen
    echo($div_open);
    printf('<div style="margin-bottom:20px;">VAR NAME: <b>$%s</b></div>', $var_name);
    // display comments
    if(strlen($comments) > 0){
        printf('<div style="border-bottom:1px dashed black; padding-bottom:20px;"><i>%s</i></div><br>', $comments);
    }
    // variable dump
    var_dump($variable);
    echo($div_close);
}
?>