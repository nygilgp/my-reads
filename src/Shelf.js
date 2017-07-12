import React from 'react'; 
import Book from './Book'

function Shelf (props) {
	const { categoryTitle, categorySlug, books, onMoveShelf, shelf } = props;
	return (
		<div className="bookshelf">
          <h2 className="bookshelf-title">{ categoryTitle }</h2>
          <div className="bookshelf-books">
          	<ol className="books-grid">
          	{ books.filter(book => book.shelf === categorySlug).map((book) => (
				<li key={ book.id }>
                	<Book book={ book } shelf={ shelf } onMoveShelf={onMoveShelf} />
              	</li>
			)) }
        	</ol>
          </div>
        </div>
    )
}


export default Shelf;