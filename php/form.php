<?php
    // includes
    include 'variables_main.php';
    // object vars
    $player_name    = $_POST['owner'];
    $enemy_name     = 'Computer';
    // tweak format of player fleet object
    $fleet_obj      = json_decode($_POST['fleet_obj'], true)[0];
    $enemy_obj      = json_decode($_POST['enemy_obj'], true);

    // build player_object
    $player_object = array(
        "player_name"=>$player_name,
        "player_type"=>true,
        "player_fleet"=>$fleet_obj['player_fleet']
    );

    // build enemy object
    $enemy_object = array(
        "player_name"=>"Computer",
        "player_type"=>false,
        "player_fleet"=>$enemy_obj['player_fleet']
    );

    // join into one object
    $fleets_object = array(
        $player_object,
        $enemy_object
    );
    //banana($fleets_object);
    banana(json_encode($fleets_object));
    // dump to file
    file_put_contents("../JSON/test.json", json_encode($fleets_object));

    // redirect
    header("Location: http://localhost/css_sandbox/battleship/game.html");
?>