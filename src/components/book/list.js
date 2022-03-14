import React from 'react'
import PropTypes from 'prop-types'
import Button from '../form/button'

const BookList = ({ books = [], getBook }) => {
    const Item = ({ children }) => {
        return (
            <div className="w-full border-gray-200 border-2 px-5 py-5 mb-2 rounded-lg">
                {children}
            </div>
        )
    }

    return books.map((book, index) => (
        <Item key={book.id}>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <p className="mr-2">{index + 1}</p>
                    <p className="mr-2">{book.name}</p>
                    <p>{book.price}</p>
                </div>
                <div>
                    <Button className="mr-2" onClick={() => getBook(book.id)}>
                        Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                </div>
            </div>
        </Item>
    ))
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
}

export default BookList
