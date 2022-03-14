import useBook from '@/components/book/customHooks'
import BookForm from '@/components/book/form'
import BookList from '@/components/book/list'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { bookSchema } from '@/components/book/schema'

const BookPage = () => {
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
                    console.log(data)
                    handleUpdateBooks(values)
                } else {
                    handleAddBook(values)
                }

                resetForm()
            } catch (error) {
                console.log(error)
            }
        },
    })

    const {
        books,
        bookLoading,
        bookError,
        getBook,
        handleAddBook,
        handleUpdateBooks,
        handleDeleteBook,
    } = useBook(formik)

    if (bookError) return bookError

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
                        <BookList
                            books={books}
                            getBook={getBook}
                            handleDeleteBook={handleDeleteBook}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage
