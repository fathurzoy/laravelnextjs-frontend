import React from 'react'

const Input = ({ placeholder, id, type = 'text', name, onChange, value }) => {
    return (
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={id}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
        />
    )
}

export default Input
