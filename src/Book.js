import React, { Component } from 'react';

class Book extends Component
{
	handleShelfChange = (e) => {
		const { book, onMoveShelf} = this.props; 
		onMoveShelf(book, e.target.value);
	}

	render() {
		const { book, shelf } = this.props;
		return (
			<div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 
                	`url(${ book.imageLinks.thumbnail })` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.handleShelfChange} value={ book.shelf } >
                    <option value="move" disabled>Move to...</option>
                    { shelf.map((row) => (
                    	<option key={row.slug} value={ row.slug } >{ row.title }</option>
                    )) }
                  </select>
                </div>
              </div>
              <div className="book-title">{ book.title }</div>
              <div className="book-authors">{ typeof book.authors === 'object' ? book.authors.join(', ') : '' }</div>
            </div>
		)
	}
}

export default Book;