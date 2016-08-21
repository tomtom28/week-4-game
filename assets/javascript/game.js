// @author: Thomas Thompson
// @github: tomtom28
// @comment: Interactive jQuery game



// Declare Global Variables for Game Flow
var charSelected = false;
var yourChar;

var enemySelected = false;
var yourEnemy;
var enemyName;
var readyToAttack = false;

var bodyCount = 0;



// Declare Global Variables for Character Attributes
var yourHealth;
var enemyHealth;

// Enemy Counter Attacks
var enemyAttack;
var lukeCountAttack = 9;
var obiCountAttack = 12;
var sidiCountAttack = 17;
var maulCountAttack = 21;

// Your Base Attacks
var yourAttack = 0;
var yourBaseAttack;
var lukeBaseAttack = 20;
var obiBaseAttack = 8;
var sidiBaseAttack = 6;
var maulBaseAttack = 9;


// Import Light Saber Sound
var saberSound = new Audio("http://soundbible.com/mp3/Lightsaber%20Clash-SoundBible.com-203518049.mp3");



// ------------------------ Game Functions are below ------------------------
$(document).ready(function(){

	// Move Characters to Enemy Div on Selection of your character
	$(".stats_card").on("click", function(){
		if(charSelected == false){

			// Remove any old Battle commentary
			$('.commented').remove()
			
			// Blindly move all characters to enemy
			$("#obi").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#luke").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#sidi").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#maul").appendTo("#enemy_list").addClass("enemy_stats_card");


			// Move selected character back to your div
			$(this).removeClass("enemy_stats_card").addClass("your_stats_card").appendTo("#char_list");


			// Collect id of your character and attributes
			yourChar = this.id;
			yourHealth = $(this).attr('value');


			// Set your base attack
			if(yourChar == 'obi'){
				yourBaseAttack = obiBaseAttack;
			}
			if(yourChar == 'luke'){
				yourBaseAttack = lukeBaseAttack;
			}
			if(yourChar == 'sidi'){
				yourBaseAttack = sidiBaseAttack;
			}
			if(yourChar == 'maul'){
				yourBaseAttack = maulBaseAttack;
			}


			// Change global variable and return
			charSelected = true;
			return;	
		}
	});




	// Move selected Enemy to Defender Div
	$(".stats_card").on("click", function(){
		if(this.id != yourChar && enemySelected == false){

			// Move enemy to defend area
			$(this).appendTo("#defend_list").removeClass('enemy_stats_card').addClass('defender_stats_card');

			// Collect id of your enemy and attributes
			yourEnemy = this.id;
			enemyHealth = $(this).attr('value');

			// Remove any old Battle commentary
			$('.commented').remove();

			// Change global variable and return
			enemySelected = true;
			readyToAttack = true;
			return;	
		}
			
	});




	// Begin the battle
	$("#attack").on("click", function(){

		if(readyToAttack){

			// Test you and defender are alive
			if(yourHealth > 0 && enemyHealth > 0){

				// Remove any old Battle commentary
				$('.commented').remove();


				// Increment your attack
				yourAttack += yourBaseAttack;


				// Determine Enemy Counter Attack
				if(yourEnemy == 'obi'){
					enemyAttack = obiCountAttack;
				}
				if(yourEnemy == 'luke'){
					enemyAttack = lukeCountAttack;
				}
				if(yourEnemy == 'sidi'){
					enemyAttack = sidiCountAttack;
				}
				if(yourEnemy == 'maul'){
					enemyAttack = maulCountAttack;
				}


				// Battle Logic
				yourHealth = yourHealth - enemyAttack;
				enemyHealth = enemyHealth - yourAttack;


				// Play Light Saber sound
				saberSound.play();


				// Change Enemy Stats on screen
				if(yourEnemy == 'obi'){
					$('#obi_hp').html(enemyHealth);
					enemyName = "Obi-Wan Kenobi";
				}
				if(yourEnemy == 'luke'){
					$('#luke_hp').html(enemyHealth);
					enemyName = "Luke Skywalker";
				}
				if(yourEnemy == 'sidi'){
					$('#sidi_hp').html(enemyHealth);
					enemyName = "Darth Sidious";
				}
				if(yourEnemy == 'maul'){
					$('#maul_hp').html(enemyHealth);
					enemyName = "Darth Maul";
				}


				// Change Your Stats on screen
				if(yourChar == 'obi'){
					$('#obi_hp').html(yourHealth);
				}
				if(yourChar == 'luke'){
					$('#luke_hp').html(yourHealth);
				}
				if(yourChar == 'sidi'){
					$('#sidi_hp').html(yourHealth);
				}
				if(yourChar == 'maul'){
					$('#maul_hp').html(yourHealth);
				}


				// Display battle commentary
				$('#battle_comments').append("<p class = 'commented'>You attacked " + "<span class = inline_bold>" + enemyName + "</span>" + " for " + "<span class = inline_bold>" + yourAttack + "</span>" + " damage.</p>");
				$('#battle_comments').append("<p class = 'commented'>" + enemyName + " attacked <span class = inline_bold>you</span> back for " + "<span class = inline_bold>" + enemyAttack + "</span>" + " damage.</p>");

			}

			// Lose - you are dead
			if(yourHealth <= 0){

				// Remove any old Battle commentary
				$('.commented').remove();

				// Display loser message
				$('#battle_comments').append("<p>You have been defeated... Game Over!</p>");
				$('#battle_comments').append("<button id = 'restart'>Try Again!</button>");

					// Restart the page for loss
					$("#restart").on("click", function(){
						location.reload();
					});

				// Change global variable and return
				readyToAttack = false;
				return;	

			}

			// Win - defender is dead
			if(enemyHealth <= 0){

				// Increment the body count
				bodyCount += 1;


				// Remove any old Battle commentary
				$('.commented').remove();


				// Hide the dead body...
				if(yourEnemy == 'obi'){
					$('#obi').addClass('hide_dead_enemy');
					enemyName = "Obi-Wan Kenobi";
				}
				if(yourEnemy == 'luke'){
					$('#luke').addClass('hide_dead_enemy');
					enemyName = "Luke Skywalker";
				}
				if(yourEnemy == 'sidi'){
					$('#sidi').addClass('hide_dead_enemy');
					enemyName = "Darth Sidious";
				}
				if(yourEnemy == 'maul'){
					$('#maul').addClass('hide_dead_enemy');
					enemyName = "Darth Maul";
				}


				// Check to see if all enemies are dead
				if(bodyCount < 3){

					// Ask User to challenge another guy
					$('#battle_comments').append("<p class = 'commented'>You have defeated " + "<span class = inline_bold>" + enemyName + "</span>" + ", choose another opponent!</p>");

					// Change global variable and return
					readyToAttack = false;
					enemySelected = false;
					return;
				}
				else{

					// Remove any old Battle commentary
					$('.commented').remove();
					
					$('#battle_comments').append("<p class = 'commented'>You have defeated everyone! You Win!</p>");
					$('#battle_comments').append("<button id = 'replay'>Play Again?</button>");

						// Restart the page for loss
						$("#replay").on("click", function(){
							location.reload();
						});

					// Change global variable and return
					readyToAttack = false;
					return;	
				}

			}

		}
		// No Character Selected
		else if (charSelected == false){
			// Remove any old Battle commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display idiot message
			$('#battle_comments').append("<p class = commented>No player selected! Please click on your character!</p>");
		}
		// No Enemy to attack
		else if (enemySelected == false){
			// Remove any old Battle commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display idiot message
			$('#battle_comments').append("<p class = commented>No enemy here! Please click on your opponent!</p>");
		}

	});
});	