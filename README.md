# BookStoreProject
Final project for CanCode Communities' JavaScript Frameworks class.

## Overview of Project: 
This is a front end web development project utilizing HTML, CSS, REACT, and TYPESCRIPT to create a functioning bookshelf app, that works with a backend of book data. 
When the user first enters the site, they will be directed to a login screen. Where a correct username and password must be entered to login and access the rest of the site. 

### How to login: 

To login successfully, use the username “hermione” and password “granger” 
The user will be authenticated successfully and get a jwt token, allowing them to access the site. 
The site will then navigate to the bookshelf page. 
If an incorrect username or password is entered, the user will be given an error message with that information.  
I’m any other errors occur, a general error message will appear. 

### Bookshelf App Overview: 
This site features three pages, at the top of each is a navbar. At the footer of each page there is an option to logout. 
If logged out, the jwt token will clear and the user will be redirected to the login page. 

### Navbar: 
Two functions can be found in the nav bar: on the left, the user can click on “my bookshelf” to navigate to the Bookshelf page.  On the right side, there is a search bar where a user can search up books by title.  This will then navigate to the Search Results page which will display appropriate results. 

### Bookshelf: 
The first page, the user’s Bookshelf, will be navigated to once the user has logged in successfully. Here they will see a list of books saved to their bookshelf under one of three categories: Want to Read, Currently Reading and Read. 

On this page, the user can change a book’s location between the three shelf categories, delete a book from the bookshelf, or click on either a book’s thumbnail image or title, which will navigate to the Book Details page tha contains more details about the selected book. 


### Book Details: 
The second page is Book Details. This can be accessed when clicking on a book’s thumbnail image or title, at either the User’s Bookshelf or from the Search results. 
On this page further information if given about a book: an image of the book cover, the title, author, a description of the book, the publisher and published date. 
A feature of this page is that the book can be added to the user’s Bookshelf by selecting the desired shelf category from the selector to place it in. 


### Search Results: 
The last page is the search results page. 
This page displays the results of a book title search taken from the users input from the search bar on the Navbar . Any search that received results will display a list of books with a thumbnail image, it’s title, and it’s author.  If the user clicks on a book, they will be directed to the Book Details page for that book. 
