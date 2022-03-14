import BookForm from '@/components/book/form'
import BookList from '@/components/book/list'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const bookSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Minimal 4 character!')
            .max(254, 'Maximum 254 character!')
            .required('Name is required'),
        description: Yup.string()
            .min(10, 'Minimal 10 character!')
            .max(300, 'Maximal 300 character!')
            .required('Description is required'),
        price: Yup.number().required('Price is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
        validationSchema: bookSchema,
        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2))
            // handleSubmit(values, resetForm)
            try {
                if (values.id) {
                    const { data } = await axios.put(
                        `http://localhost:8000/api/books/${values.id}`,
                        values,
                    )

                    console.log(data)
                    handleUpdateBooks({
                        book: data.data,
                    })
                } else {
                    const { data } = await axios.post(
                        'http://localhost:8000/api/books',
                        values,
                    )
                    handleAddBook({
                        book: data.data,
                    })
                }

                resetForm()
            } catch (error) {
                console.log(error)
            }
        },
    })

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

    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

    const handleUpdateBooks = ({ book }) => {
        const updateBooks = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updateBooks)
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
                        <BookForm
                            handleAddBook={handleAddBook}
                            formik={formik}
                        />
                        <BookList books={books} getBook={getBook} />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage
