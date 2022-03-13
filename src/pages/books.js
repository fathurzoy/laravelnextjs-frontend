import BookForm from '@/components/book/form'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBooks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:8000/api/books')

            setBooks(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

    if (error) return error

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Book
                </h2>
            }>
            <Head>
                <title>Books</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <BookForm handleAddBook={handleAddBook} />
                        <div className="p-6 bg-white border-b border-gray-200">
                            {loading
                                ? 'Loading'
                                : books.map(book => (
                                      <p key={book.id}>
                                          {book.id} || {book.name}
                                      </p>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage
