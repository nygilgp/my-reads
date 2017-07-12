import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import BookSearch from './BookSearch'
import './App.css'
import { Route, Link } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    books: [],
    shelf: [
      {title: 'Currently Reading', slug: 'currentlyReading'},
      {title: 'Want To Read', slug: 'wantToRead'},
      {title: 'Read', slug: 'read'},
      {title: 'None', slug: 'none'}
    ]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      //console.log(books);
      this.setState({books});
    })
  }
  updateShelf = (book, shelfSlug) => {
    BooksAPI.update(book, shelfSlug).then((updateShelfData) => {
      //console.log(updateShelfData);
      let { books } = this.state;
      let bookIndex = books.findIndex((bookm => bookm.id === book.id));
      if(bookIndex === -1) {
        book.shelf = shelfSlug;
        this.setState((state) => ({ books: state.books.concat(book) }));
      } else {
        books[bookIndex].shelf = shelfSlug;
        this.setState({books})
      }
    });
  }

  render() {
    const { books, shelf } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={({history}) => (
          <BookSearch 
            shelf={ shelf } 
            books={ books }
            onMoveShelf={this.updateShelf}  />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { shelf.filter((row) => row.slug !== 'none').map((row) => (
                  <Shelf 
                    key={row.slug} 
                    categoryTitle={row.title} 
                    categorySlug={row.slug} 
                    onMoveShelf={this.updateShelf}
                    books={books}
                    shelf={shelf} /> 
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
