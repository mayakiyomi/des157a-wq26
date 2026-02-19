(function () {
	'use strict';

    console.log('reading js');
	

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;
		let exitDirection;
		let enterDirection;

		/* This version adds a preloader screen that shows until all
		the assets for the page have downloaded, including the large
		image. This preloader is a div that covers the entire screen 
		on the HTML file.
		
		The code below removes this div by fading it out, then once
		it has faded out, sets it to display none. */

		const preloader = document.getElementById('preloader');
		preloader.className = 'fadeout';

		// wait until the animation has completed
		preloader.addEventListener('animationend', function () {

			//once the animation is done, remove the preloader div.
			preloader.style.display = 'none';
		});


		resetPagePosition();


		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); // end window load function

})();// END IIFE