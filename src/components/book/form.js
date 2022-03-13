import FormControl from '@/components/form/formControl'
import Input from '@/components/form/input'
import Button from '@/components/form/button'
import React, { useEffect, useState } from 'react'

import axios from '@/lib/axios'

const initialValue = {
    name: '',
    description: '',
    price: 0,
}

const Form = ({ handleAddBook }) => {
    const [form, setForm] = useState(initialValue)
    const { name, description, price } = form

    const handleChangeInput = e => {
        // return console.log(e)

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const resetForm = () => {
        setForm(initialValue)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        // alert(JSON.stringify(form))
        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                form,
            )

            handleAddBook({
                book: data.data,
            })

            resetForm()
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="w-full max-w-xs">
            <form class="w-full shadow-md rounded" onSubmit={handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="Input Book Name"
                        id="name"
                        name="name"
                        onChange={handleChangeInput}
                        value={name}
                    />
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input Book Description"
                        id="description"
                        name="description"
                        onChange={handleChangeInput}
                        value={description}
                    />
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input Book Price"
                        id="price"
                        type="number"
                        name="price"
                        onChange={handleChangeInput}
                        value={price}
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>

            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </div>
    )
}

export default Form
