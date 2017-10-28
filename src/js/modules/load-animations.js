var jQuery = $ = require('jquery');
require('gsap');

const loadAnimations=()=>{

	/*
		Loading Page Animation Tasks:
		1. Set up variables - #js-load-page, #js-load-page-overlay, #js-load-caption
		2. #js-load-page-overlay - animate up
		3. #js-load-caption - animate up 50% way of #js-load-page-overlay
	*/

	//-------------------------- Variables ---------------------------------//


	//Loading Page:
	let $body = $('body'),
		$jsLoadPage        = $('#js-load-page'),
		$jsLoadPageOverlay = $('#js-load-page-overlay'),
		$jsLoadCaption     = $('#js-load-caption'),
		tlLoadPage         = new TimelineLite(),
		tlMaster           = new TimelineLite(),
		timing             = 1.2;


	//Landing Page:



//-------------------------- Initialize ---------------------------------//


	(function init(){

		//Loading:
		TweenLite.set($body, {overflowY: 'hidden'});
		TweenLite.set($jsLoadCaption, {y: 400, x: 200, skew: 10});


		//Landing:


	})();

//-------------------------- Function Calls ---------------------------------//

	introAnimations();

//-------------------------- Function Creation ---------------------------------//

	//gsapAnimations function
	function introAnimations(){

		//Loading page timeline + animations
		tlLoadPage
			.to($jsLoadPageOverlay, timing, {height: '130%', ease: Cubic.easeIn})
			.to($jsLoadCaption, 1, {y: 0, x: 0, skew: 0, rotate: -5, ease: Cubic.easeIn}, '-=.1');

		//master timeline
		tlMaster
			.add(tlLoadPage, '1');

	}

//-------------------------- Click Function Creation ---------------------------------//


};
//END OF LOAD ANIMATION FUNCTION

module.exports = loadAnimations;