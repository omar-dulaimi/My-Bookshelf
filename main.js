var books = [];
var users = [];
var currentUser = 'user'
var count = 0;


$(document).ready(function () {
	$('#formAddBook').hide();
	$('#formUpdateProgress').hide();
	$('.displayedBookP').hide();
	$('.displayedAllBooksP').hide();
	$('.displayedAllBooksP').html('');
	$('#all').remove();

	$('#addBook').on('click', function () {
		$('.displayedProgressP').hide();
		$('#formUpdateProgress').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedAllBooksP').html('');
		$('#formAddBook').show();
		$('#all').remove();
		$('#mybook').remove()
	});

	$('#updateProgress').on('click', function () {
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('.displayedAllBooksP').hide();
		$('.displayedBookP').hide();
		$('.displayedAllBooksP').html('');
		$('#formUpdateProgress').show();
		$('#all').remove();
		$('#mybook').remove()
	});

	$('#showMyShelf').on('click', function () {
		var myDiv;
		$('.displayedBookP').html('');
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
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

	$('#showAllBooks').on('click', function () {
		var myDiv;
		$('.displayedAllBooksP').html('');
		$('.displayedProgressP').hide();
		$('#formAddBook').hide();
		$('#formUpdateProgress').hide();
		$('.displayedBookP').hide();
		$('.displayedAllBooksP').html('');
		$('.displayedAllBooksP').show();
		$('#all').remove();
		$('#mybook').remove()

		myDiv = displayLibraryBooks();
		$('body').append(myDiv);
	});

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

	// $('#liProgress').on('click', function () {
	// 	$('.displayedProgressP').html('');
	// 	var myDiv;
	// 	$('#formAddBook').hide();
	// 	$('#formUpdateProgress').hide();
	// 	$('.displayedAllBooksP').hide();
	// 	$('.displayedAllBooksP').html('');
	// 	$('.displayedBookP').hide();
	// 	$('#all').remove();
	// 	$('#mybook').remove();

	// 	users.forEach(function (element, index) {
	// 		if (currentUser === element.userName) {
	// 			myDiv = element.displayProgress();
	// 		}
	// 	});
	// 	$('body').append(myDiv);
	// });

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
	});
});

function generateID() {
	var start = 0;
	return function () {
		return ++start;
	}
}
var countID = generateID();

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

var user1 = User('sa', 'admin', '123', 'eng.admin@gmail.com');
var user2 = User('sartyer', 'user', '1rthyrt23', 'rhhrtn@gmail.com');

users.push(user1);
users.push(user2);

createBook('In Search of Lost Time', 'Marcel Proust', 'Modern Literature', '4.3', 1908, 4215, "https://images.gr-assets.com/books/1384932885l/18869288.jpg", "«In Search of Lost Time» is a novel in seven volumes. The novel began to take shape in 1909.");
createBook('Don Quixote', 'Miguel de Cervantes', 'Classics', '3.2', 1615, 1023, "https://images.gr-assets.com/books/1364958765l/3836.jpg", "Don Quixote has become so entranced by reading chivalric romances, that he determines to become a knight-errant himself.");
createBook('Ulysses', 'James Joyce', 'Classics', '3.7', 1922, 730, "https://images.gr-assets.com/books/1428891345l/338798.jpg", "Loosely based on the Odyssey, this landmark of modern literature follows ordinary Dubliners in 1904.");

function addBookToUser(id) {
	var that = this;
	books.forEach(function (element, index) {
		if (element.id === parseInt(id)) {
			that.userBooks.push(element);
		}
	});
}

function displayMyBooks() {
	//var myDiv = "<div id='mybook'><div class=\" card-columns mt-3\" id=\"cards\"></div></div>";
	var myDiv = "<div id=\'all\' class=\"card-columns mt-3\" id=\"cards\"></div>";
	var result = '\n';
	this.userBooks.forEach(function (element, index) {
		result += "<div class=\" card text-white bg-secondary mb-3 mx-auto\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element.description + "</p></div>";
	});
	return $(myDiv).append(result);
}

function displayLibraryBooks() {
	$('.displayedAllBooksP').html('');
	var myDiv = "<div id=\'all\' class=\"card-columns mt-3 text-center\" id=\"cards\"></div>";
	var result = '\n';
	books.forEach(function (element, index) {
		result += "<div class=\"card text-white bg-secondary mb-10 ml-15\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element.description + "</p></div>";
		//result += "<p class = 'displayedAllBooksP' >" + '[' + element.id + '] ' + element.title + ', ' + element.author + ', ' + element.genre + "</p>";
	});
	return $(myDiv).html(result);
}

function updateNumPages(id, currentPage) {
	this.userBooks.forEach(function (element, index) {
		if (element.id === id) {
			element.currentNumPages = currentPage;
		}
	});
}


function displayProgress() {
	$('#cards').html('');
	var myDiv = "<div id=\'all\' class=\" card-columns mt-3\" id=\"cards\"></div>";
	var result = '\n';
	this.userBooks.forEach(function (element, index) {
		//	result += "<p class = 'displayedProgressP' >" + element.title + ' - ' + element.author + ', ' + element.currentNumPages + '/' + element.numPages + "</p>";
		result += "<div class=\"card text-white bg-secondary mb-10 ml-15\" style=\"max-width: 14rem; max-height: 35rem;\"><img class=\"card-img-top\" src=\"" + element.src + "\"><div class=\"card-body\"><h5 class=\"card-title\">" + element.title + "</h5><p class=\"card-text\">" + element.description + "</p></div>";
	});
	return $(myDiv).html(result);
}


/*

*/