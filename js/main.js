// main variables
var books = [];
var users = {};
var currentUser = 'user';
var signin = $('#signIn').detach();
var signup = $('#signUp').detach();


// Execute the code only when the document is fully loaded in the memory
$(document).ready(function () {
	$('#noBooksShelf').hide();
	$('#span').hide();
	$('body').css('background-image', 'url("./img/5.jpg")');
	$('body').css('background-size', 'cover');
	//$('body').css('background-repeat', 'no-repeat');
	$("#info").hide();
	$('#formAddBook').hide();
	$('#formUpdateProgress').hide();
	$('.displayedBookP').hide();
	$('.displayedAllBooksP').hide();
	$('.displayedAllBooksP').html('');
	$('#all').remove();
	$('#signUp').hide();
	$('#signIn').hide();

	//;---------------------------------------------------------------------------------------------;
	//Sign in main button
	$('#signInMain').on('click', function () {
		$('#signUp').detach();
		$('#signInOrSignUp').after(signin);
		// Shows the login screen
		$('#limg').on('click', function () {
			var inputUserName = $('#userNameSignInInput').val();
			var inputPassword = $('#passwordSignInInput').val();
			var loginState = false;

			Object.keys(users).forEach(function (key) {
				if (users[key].userName === inputUserName && users[key].password === inputPassword) {
					$('body').css('background-image', '');
					$('body').css('background-color', 'rgb(0, 0, 0)');
					$('#signIn').hide();
					$('#signUp').hide();
					$('#span').show();
					loginState = true;
					currentUser = users[key].userName;
					$('#signInOrSignUp').hide();
					$('#userNameSignInInput').val('');
					$('#passwordSignInInput').val('');
					$('#nameInput').val('');
					$('#userNameInput').val('');
					$('#emailInput').val('');
					$('#passwordSignUpInput').val('');

				}
			});
			if (!loginState) {
				alert('Wrong username or password!');
				$('#userNameSignInInput').val('');
				$('#passwordSignInInput').val('');
				$('#signInOrSignUp').show();
			}
		});

		$('#passwordSignInInput').keypress(function (element) {
			var key = element.which;
			if (key == 13) {
				$('#limg').click();
				return false;
			}
		});

		$('#userNameSignInInput').keypress(function (element) {
			var key = element.which;
			if (key == 13) {
				$('#limg').click();
				return false;
			}
		});
	});

	//;---------------------------------------------------------------------------------------------;
	//Sign up main button
	$('#signUpMain').on('click', function () {
		$('#signIn').detach();
		$('#signInOrSignUp').after(signup);

		$('#signUpButton').on('click', function () {
			var inputName = $('#nameInput').val();
			var inputUserName = $('#userNameInput').val();
			var inputEmail = $('#emailInput').val();
			var inputPassword = $('#passwordSignUpInput').val();

			users[inputUserName] = User(inputName, inputUserName, inputPassword, inputEmail);
			alert('Success!\nNow you need to signin to your bookshelf.');
		});
	});

	//;---------------------------------------------------------------------------------------------;
	//Sign out li button
	$('#signOutLi').on('click', function () {
		currentUser = '';
		$('body').css('background-color', '');
		$('#noBooksShelf').hide();
		$('#span').hide();
		$('body').css('background-image', 'url("./img/5.jpg")');
		$('body').css('background-size', 'cover');
		//$('body').css('background-repeat', 'no-repeat');
		$("#info").hide();
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('.displayedBookP').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('#all').remove();
		$('#signUp').hide();
		$('#signIn').hide();

		$('#signInOrSignUp').show();
	});

	//;---------------------------------------------------------------------------------------------;
	// Show the add book form
	$('#addBook').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedProgressP').hide();
		$('#mainImg').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('#formAddBook').show();
		$('#all').remove();
		$('#mybook').remove()
	});

	//;---------------------------------------------------------------------------------------------;
	// Show the update reading progress form
	$('#updateProgress').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('.displayedAllBooksP').hide();
		$('#mainImg').hide();
		$('.displayedBookP').hide();
		$('.displayedAllBooksP').html('');
		$('#formUpdateProgress').show();
		$('#all').remove();
		$('#mybook').remove()
	});

	//;---------------------------------------------------------------------------------------------;
	//Show the user's bookshelf
	$('#showMyShelf').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		var myDiv;
		$('.displayedBookP').html('');
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('#mainImg').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedBookP').show();
		$('#all').remove();
		$('#mybook').remove()

		myDiv = users[currentUser].displayMyBooks();

		$('body').append(myDiv);
	});

	//;---------------------------------------------------------------------------------------------;
	// Show all the books in the library
	$('#showAllBooks').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('#mainImg').hide();
		$('#formUpdateProgress').hide();
		$('.displayedBookP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedAllBooksP').show();
		$('#all').remove();
		$('#mybook').remove()

		displayLibraryBooks();
	});

	//;---------------------------------------------------------------------------------------------;
	// Add a book to the user's bookshelf
	$('#addToShelf').on('click', function () {
		var id = $('#addBookid').val();
		if (!$.isNumeric(id)) {
			alert('IDs are only integers!');
		} else {
			users[currentUser].addBookToUser(id);
		}

		$('#addBookid').val('');
	});

	//;---------------------------------------------------------------------------------------------;
	// Change the current page of the user's book
	$('#updateProgressSave').on('click', function () {
		var id = $('#progressBookid').val();
		var currPage = $('#bookProgressNumber').val();

		if (!$.isNumeric(id) || !$.isNumeric(currPage)) {
			alert("Both fields' values should be integers!");
		} else {
			users[currentUser].updateNumPages(id, currPage);
		}

		$('#progressBookid').val('')
		$('#bookProgressNumber').val('')
	});

	//;---------------------------------------------------------------------------------------------;
	// Shows the progress the user has made with their books
	$('#liProgress').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedProgressP').html('');
		$('#dprogress').remove();
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedBookP').hide();
		$('#mainImg').hide()
		$('#all').remove();
		$('#mybook').remove();
		$("#buttons").hide();
		$("#info").hide();

		users[currentUser].displayProgress();
	});

	//;---------------------------------------------------------------------------------------------;
	// Shows the home screen
	$('#liHome').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedProgressP').html('');
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedBookP').hide();
		$('#all').remove();
		$('#mybook').remove();
		$("#buttons").show();
		$('#dprogress').remove();
		$("#info").hide();
		$('#mainImg').show();
	});

	//;---------------------------------------------------------------------------------------------;
	// Shows general info about reading
	$('#liInfo').on('click', function () {
		$('#signInOrSignUp').hide();
		$('#noBooksShelf').hide();
		$('.displayedProgressP').html('');
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedBookP').hide();
		$('#all').remove();
		$('#mybook').remove();
		$("#buttons").hide();
		$('#dprogress').remove();
		$('#mainImg').hide();
		$("#info").show();
		$('#mainImg').hide();
	});
	//;---------------------------------------------------------------------------------------------;
});

// Generate dynamic IDs
function generateID() {
	var start = 0;
	return function () {
		return ++start;
	}
}
var countID = generateID();

// Factory function to create new books
function createBook(title, author, genre, rating, year, numPages, imgSrc, description) {
	var bookObj = {
		id: countID(),
		title: title,
		author: author,
		genre: genre,
		rating: rating,
		year: year,
		numPages: numPages,
		currentNumPages: 0,
		src: imgSrc,
		description: description
	};
	books.push(bookObj);
}

// User class to create new users
function User(name, userName, password, email) {
	var userObj = {};

	userObj.name = name;
	userObj.userName = userName;
	userObj.password = password;
	userObj.email = email;
	userObj.userBooks = [];
	userObj.addBookToUser = addBookToUser;
	userObj.displayMyBooks = displayMyBooks;
	userObj.displayLibraryBooks = displayLibraryBooks;
	userObj.updateNumPages = updateNumPages;
	userObj.displayProgress = displayProgress;

	return userObj;
}

//Create two User users
var user1 = User('sa', 'admin', '123', 'eng.admin@gmail.com');
var user2 = User('sartyer', 'user', '1rthyrt23', 'rhhrtn@gmail.com');

// Add the users to users object with the username as a key
users[user1.userName] = user1;
users[user2.userName] = user2;


//Create six books
createBook('The Stranger', 'Albert Camus', 'Classics', '3.97', 1989, 123, "https://images.gr-assets.com/books/1349927872l/49552.jpg", "The Stranger is a novel by Albert Camus that was first published in 1942.");
createBook('Don Quixote', 'Miguel de Cervantes', 'Classics', '3.2', 1615, 1023, "https://images.gr-assets.com/books/1364958765l/3836.jpg", "Don Quixote has become so entranced by reading chivalric romances, that he determines to become a knight-errant himself.");
createBook('Ulysses', 'James Joyce', 'Classics', '3.7', 1922, 730, "https://images.gr-assets.com/books/1428891345l/338798.jpg", "Loosely based on the Odyssey, this landmark of modern literature follows ordinary Dubliners in 1904.");
createBook('The Great Gatsby', 'F. Scott Fitzgerald', 'Classics', '3.9', 1925, 180, "https://images.gr-assets.com/books/1490528560l/4671.jpg", "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.");
createBook('Hamlet', 'William Shakespeare', 'Classics', '4.01', 1603, 342, "https://images.gr-assets.com/books/1459795479l/1432.jpg", "Hamlet is the story of the Prince of Denmark who learns of the death of his father at the hands of his uncle, Claudius.");
createBook('The Odyssey', 'Homer', 'Classics', '3.74', 720, 541, "https://images.gr-assets.com/books/1390173285l/1381.jpg", "The Odyssey is one of two major ancient Greek epic poems attributed to Homer.");

// Adds a book to a certain user
function addBookToUser(id) {
	var that = this;
	var status = false;
	books.forEach(function (element, index) {
		if (element.id === parseInt(id)) {
			that.userBooks.push(element);
			status = true;
		}
	});
	return status ? alert('Success!') : alert('No such book!');
}

// Shows the entire bookshelf of a user
function displayMyBooks() {
	if (this.userBooks.length === 0) {
		$('#noBooksShelf').show();
	} else {
		var $myDiv = $("<div id=\'all\' class=\"card-columns text-center\" id=\"cards\"></div>");
		var result = '\n';
		this.userBooks.forEach(function (element, index) {
			result = "<div class=\" card text-white bg-secondary \" style=\"max-width: 14rem; height: 35rem;\"><img class=\"card-img-top\" style=\"height: 347px;\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element.description + "</p></div>";
			$($myDiv).append(result);
		});
		$('body').append($myDiv);
	}
}

// Shows the entire library of books
function displayLibraryBooks() {
	$('.displayedAllBooksP').html('');
	var $myDiv = $("<div id=\'all\' class=\"card-columns text-center\" id=\"cards\"></div>");
	var result = '\n';
	books.forEach(function (element, index) {
		result = "<div class=\"card text-white bg-secondary\" style=\"max-width: 14rem; height: 38rem;\"><img class=\"card-img-top\" style=\"height: 347px;\" src='" + element.src + "'><div class=\"card-body\"><h5 class=\" card-title\">" + element.title + "</h5><p class=\"card-text\" style=\"height: 144px;\">" + element.description + "</p><h6 class=\"card-text\"><em style=\"color:#fff\">[" + element.id + "]</em></h6></div></div>";
		$($myDiv).append(result);
	});
	$('body').append($myDiv);

}

//Update the current page of a user's book
function updateNumPages(id, currentPage) {
	var status = false;
	this.userBooks.forEach(function (element, index) {
		if (element.id === parseInt(id)) {
			if (element.numPages >= parseInt(currentPage)) {
				element.currentNumPages = parseInt(currentPage);
				status = true;
			} else {
				alert('The last page of this book is: ' + element.numPages + '\nYou are currently on page: ' + element.currentNumPages);
			}
		}
	});
	return status ? alert('Success!') : alert('Failed!');
}

// Shows all the progress the user has made with their books
function displayProgress() {
	$('#cards').html('');
	if (this.userBooks.length === 0) {
		$('#noBooksShelf').show();
	} else {
		var $myDiv = $("<div id=\'all\' class=\"card-columns text-center\" id=\"cards\"></div>");
		var result = '\n';
		this.userBooks.forEach(function (element, index) {
			result = "<div class=\"card text-white bg-secondary\" style=\"max-width: 14rem; height: 31rem;\"><img class=\"card-img-top\" style=\"height: 347px;\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text text-light progressPar\">Percentage: " + Math.floor(element.currentNumPages / element.numPages * 100) + '%<br>Pages: ' + element.currentNumPages + '/' + element.numPages + "</p></div>";
			$($myDiv).append(result);
		});
		$('body').append($myDiv);
	}
}

