
window.addEventListener('load', function () {

	//define variables needed
	const posts = document.querySelectorAll('section');
	let postTops = [];
	let pageTop;
	let counter = 1;
	let prevCounter = 1;
	let doneResizing;

	resetPagePosition();

	window.addEventListener('scroll', function () {
		pageTop = window.pageYOffset + 300;
		
		// if the user is scrolling down the page...
		if (pageTop > postTops[counter]) {
			counter++;
			console.log(`scrolling down ${counter}`);
		}
		// if the user is down the page and scrolling up
		else if (counter > 1 && pageTop < postTops[counter - 1]) {
			counter--;
			console.log(`scrolling up ${counter}`);
		}

		// when the section changes...
		if (counter != prevCounter) {
			// changes the class name on the image, which activates animation...
			document.querySelector('figure img').className = 'sect' + counter;
			prevCounter = counter;
		}

	}); // end window scroll function

	// this event handler fires while the window is being resized
	window.addEventListener('resize', function () {

		clearTimeout(doneResizing);
		// this runs after the window has stopped being resized...
		doneResizing = setTimeout(function () {

			resetPagePosition();

		}, 500);
	});

	// this function resets variables, which may have changed based on resizing
	function resetPagePosition() {
		postTops = [];
		posts.forEach(function (post) {
			postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
		});

		const pagePosition = window.pageYOffset + 300;
		counter = 0;

		postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

	}

}); 