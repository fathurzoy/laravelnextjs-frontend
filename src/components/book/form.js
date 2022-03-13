import FormControl from '@/components/form/formControl'
import Input from '@/components/form/input'
import Button from '@/components/form/button'
import React, { useEffect, useState } from 'react'

import * as Yup from 'yup'

import axios from '@/lib/axios'
import { useFormik } from 'formik'

const Form = ({ handleAddBook }) => {
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
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2))
            handleSubmit(values, resetForm)
        },
    })

    const handleSubmit = async (values, resetForm) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                values,
            )

            handleAddBook({
                book: data.data,
            })

            resetForm()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="w-full mb-2">
            <form
                class="w-full shadow-md rounded"
                onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="Input Book Name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />

                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input Book Description"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input Book Price"
                        id="price"
                        type="number"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['price']}
                        </label>
                    )}
                </FormControl>
                <Button type="submit" disabled={!formik.isValid}>
                    Submit
                </Button>
            </form>

            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </div>
    )
}

export default Form
