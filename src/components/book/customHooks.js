import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const useBook = formik => {
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

    const getBook = async id => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/books/${id}`,
            )

            const book = data.data

            formik.setFieldValue('name', book.name)
            formik.setFieldValue('description', book.description)
            formik.setFieldValue('price', book.price)
            formik.setFieldValue('id', book.id)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddBook = async values => {
        const { data } = await axios.post(
            'http://localhost:8000/api/books',
            values,
        )
        const book = data.data
        setBooks(prev => [...prev, book])
    }

    const handleUpdateBooks = async values => {
        const { data } = await axios.put(
            `http://localhost:8000/api/books/${values.id}`,
            values,
        )
        const book = data.data

        const updateBooks = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updateBooks)
    }

    const handleDeleteBook = async id => {
        const isOK = confirm('Are you sure want to delete this data?')
        if (isOK) {
            try {
                await axios.delete(`http://localhost:8000/api/books/${id}`)
                const filteredBooks = books.filter(item => item.id !== id)

                setBooks(filteredBooks)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        books,
        bookLoading: loading,
        bookError: error,
        getBook,
        handleAddBook,
        handleUpdateBooks,
        handleDeleteBook,
    }
}

export default useBook
