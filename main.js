// main variables
var books = [];
var users = [];
var currentUser = 'user'


// Execute the code only when the document is fully loaded in the memory
$(document).ready(function () {
	$('#span').hide();
	$('body').css('background-image', 'url("5.jpg")');
	$("#info").hide();
	$('#formAddBook').hide();
	$('#formUpdateProgress').hide();
	$('.displayedBookP').hide();
	$('.displayedAllBooksP').hide();
	$('.displayedAllBooksP').html('');
	$('#all').remove();

	// Show the add book form
	$('#addBook').on('click', function () {
		$('.displayedProgressP').hide();
		$('#mainImg').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('#formAddBook').show();
		$('#all').remove();
		$('#mybook').remove()
	});

	// Show the update reading progress form
	$('#updateProgress').on('click', function () {
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

	//Show the user's bookshelf
	$('#showMyShelf').on('click', function () {
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
		users.forEach(function (element, index) {
			if (currentUser === element.userName) {
				myDiv = element.displayMyBooks();
			}
		});
		$('body').append(myDiv);
	});

	// Show all the books in the library
	$('#showAllBooks').on('click', function () {
		var myDiv;
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

		myDiv = displayLibraryBooks();
		$('body').append(myDiv);
	});

	// Add a book to the user's bookshelf
	$('#addToShelf').on('click', function () {
		var id = $('#addBookid').val();
		users.forEach(function (element, index) {
			if (currentUser === element.userName) {
				element.addBookToUser(id);
				alert('The Book has been added!');
			}
		});
		$('#addBookid').val('');
	});

	// Change the current page of the user's book
	$('#updateProgressSave').on('click', function () {
		var id = parseInt($('#progressBookid').val());
		var currPage = parseInt($('#bookProgressNumber').val());
		users.forEach(function (element, index) {
			if (currentUser === element.userName) {
				element.updateNumPages(id, currPage);
				alert('The current page has been set!');
			}
		});
		$('#progressBookid').val('')
		$('#bookProgressNumber').val('')
	});

	// Shows the progress the user has made with their books
	$('#liProgress').on('click', function () {
		$('.displayedProgressP').html('');
		var myDiv;
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

		users.forEach(function (element, index) {
			if (currentUser === element.userName) {
				myDiv = element.displayProgress();
			}
		});

		$('body').append(myDiv);
	});

	// Shows the home screen
	$('#liHome').on('click', function () {
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

	// Shows general info about reading
	$('#liInfo').on('click', function () {
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

	// Shows the login screen
	$('#limg').on('click', function () {
		var inputUserName = $('#linput1').val();
		var inputPassword = $('#linput2').val();
		var loginState = false;

		users.forEach(function (element, index) {
			if (element.userName === inputUserName && element.password === inputPassword) {
				$('body').css('background-image', '');
				$('body').css('background-color', '#A8DADC');
				$('#loginn').hide();
				$('#span').show();
				loginState = true;
				currentUser = element.userName;
			}
		});
		if (!loginState) {
			alert('Wrong username or password!');
		}
	});
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

// Push the users to the users array
users.push(user1);
users.push(user2);

//Create three books
createBook('In Search of Lost Time', 'Marcel Proust', 'Modern Literature', '4.3', 1908, 4215, "https://images.gr-assets.com/books/1384932885l/18869288.jpg", "«In Search of Lost Time» is a novel in seven volumes. The novel began to take shape in 1909.");
createBook('Don Quixote', 'Miguel de Cervantes', 'Classics', '3.2', 1615, 1023, "https://images.gr-assets.com/books/1364958765l/3836.jpg", "Don Quixote has become so entranced by reading chivalric romances, that he determines to become a knight-errant himself.");
createBook('Ulysses', 'James Joyce', 'Classics', '3.7', 1922, 730, "https://images.gr-assets.com/books/1428891345l/338798.jpg", "Loosely based on the Odyssey, this landmark of modern literature follows ordinary Dubliners in 1904.");

// Adds a book to a certain user
function addBookToUser(id) {
	var that = this;
	books.forEach(function (element, index) {
		if (element.id === parseInt(id)) {
			that.userBooks.push(element);
		}
	});
}

// Shows the entire bookshelf of a user
function displayMyBooks() {
	var myDiv = "<div id=\'all\' class=\"card-columns mt-3\" id=\"cards\"></div>";
	var result = '\n';
	this.userBooks.forEach(function (element, index) {
		result += "<div class=\" card text-white bg-secondary mb-3 mx-auto\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element.description + "</p></div>";
	});
	return $(myDiv).append(result);
}

// Shows the entire library of books
function displayLibraryBooks() {
	var elDesc;
	$('.displayedAllBooksP').html('');
	var myDiv = "<div id=\'all\' class=\"card-columns mt-3 text-center\" id=\"cards\"></div>";
	var result = '\n';
	books.forEach(function (element, index) {
		elDesc = element.description;
		elDesc += '<em style="color:red" > ID: ' + element.id + '</em>';
		result += "<div class=\"card text-white bg-secondary mb-10 ml-15\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + elDesc + "</p>" + "</div>";
	});
	return $(myDiv).html(result);
}

//Update the current page of a user's book
function updateNumPages(id, currentPage) {
	this.userBooks.forEach(function (element, index) {
		if (element.id === id) {
			element.currentNumPages = currentPage;
		}
	});
}

// Shows all the progress the user has made with their books
function displayProgress() {
	$('#cards').html('');
	var myDiv = "<div id=\'all\' class=\" card-columns mt-3\" id=\"cards\"></div>";
	var result = '\n';
	this.userBooks.forEach(function (element, index) {
		result += "<div class=\"card text-white bg-secondary mb-50 ml-15\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text text-danger\">" + (element.currentNumPages / element.numPages * 100).toFixed(2) + '%' + "</p></div>";
	});
	return $(myDiv).html(result);
}
