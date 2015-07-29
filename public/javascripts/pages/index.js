define(['jquery', 'lodash'], function($, _){

	var Game = (function(){

		var $blocks_wrapper = $('.blocks-wrapper');
		var $user_menu = $('#userMenu');
		var $question_box = $('#question');
		var $answer_box = $('#answer');
		var $submit_btn = $('#submit');
		var $replay_btn = $('#replay');
		var $score_box = $('#score span');
		var blocks = {};
		var score = 0;
		var base_countdown = 5000;
		var countdown = base_countdown;
		var num_of_block = 9;
		var asked_number = 0;
		var rand_color = ["red", "blue", "green", "yellow", "white", "purple", "orange"];
		var used_color = 1;
		var question_format = "What is the color of block %block_num%?";
		var right_format = "Congrats! Just luck?";
		var wrong_format = "Boo, try again ;)";
		var preview_mode = true;

		function init(){
			// attach event
			$user_menu.submit( validateAnswer );
			$replay_btn.click( start );
			// start
			start();
		}

		function start(){
			// hide replay and user menu at first
			$replay_btn.hide();
			$user_menu.hide();
			// clear the block
			clearBlock();
			// generate new one
			preview_mode = true;
			generateBlock();
			// hide based on countdown
			setTimeout(function(){
				preview_mode = false;
				$user_menu.fadeIn();
				runQuestion()
			}, countdown);
		}

		function clearBlock(){
			$blocks_wrapper.html('').show();
		}

		function generateBlock(){
			// Clear the question
			$question_box.text('');
			// Shuffle color first
			rand_color = _.shuffle(rand_color);
			for(var color="", i=1;i<=num_of_block;i++){
				color = rand_color[Math.round(Math.random()*used_color )];
				blocks[i] = color;
				$blocks_wrapper.append( $('<div/>').css('background-color', color).text(i) );
			}
		}

		function runQuestion(){
			$blocks_wrapper.fadeOut(500, function(){
				clearBlock();
				asked_number = Math.ceil(Math.random()*num_of_block);
				$question_box.text( question_format.replace('%block_num%', asked_number) );
				$answer_box.val('');
				$submit_btn.show();
			});
		}

		function validateAnswer(){
			if(!preview_mode){
				var answer = $answer_box.val();
				if(answer===blocks[asked_number]){
					$question_box.text( right_format );
					updateScore(1);
				}else{
					$question_box.text( wrong_format );
				}
				$submit_btn.hide();
				$replay_btn.show();
			}
			return false;
		}

		function updateScore(poin){
			// add the score
			score += poin;
			// update score
			$score_box.text(score);
			// recalculate countdown based on score
			countdown = base_countdown - (score*100);
			// recalculate show color based on score
			used_color = Math.min( (rand_color.length-1), Math.ceil(score/2));
		}

		return {
			init: init
		}

	})();

	Game.init();

	return Game;

});