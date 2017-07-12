import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class BookSearch extends Component
{
	state = {
		query: '',
		qbooks: []
	}

	updateQuery = (queryTxt) => {
		const { books } = this.props; 
		this.setState({ query: queryTxt.trim() });
		if(queryTxt !== '') {
			BooksAPI.search(queryTxt, 10).then((queryResult) => {
				// performs loop over the query result and assign the correct shelf
				// for exsisting books in the shelf, else assign none
				const qbooks = queryResult.map((book) => {
					let bookIndex = books.findIndex((bookm => bookm.id === book.id));
					if(bookIndex === -1) {
						book.shelf = 'none';
					} else {
						book.shelf = books[bookIndex].shelf;
					}
					return book;
				});

				this.setState({qbooks})
			})
		}
			
	}

	render() {
		const { query, qbooks } = this.state; 
		const { shelf, onMoveShelf } = this.props; 
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	                <input type="text" placeholder="Search by title or author" 
	                	value={query} onChange={(event) => this.updateQuery(event.target.value)}	/>
	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{ qbooks.error !== 'empty query' && (qbooks.map((book) => (
	              		<li key={ book.id }>
	              			<Book book={ book } shelf={ shelf } onMoveShelf={onMoveShelf} />
	              		</li>
	              	))) }
	              </ol>
	            </div>
	        </div>
		)
	}
}

export default BookSearch