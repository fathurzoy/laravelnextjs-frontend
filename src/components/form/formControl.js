import React from 'react'

const FormControl = ({ children, label, id }) => {
    return (
        <div class="mb-4 w-full">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}>
                {label}
            </label>
            {children}
        </div>
    )
}

export default FormControl
