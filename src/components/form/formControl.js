import React from 'react'

const FormControl = ({ children, label, id }) => {
    return (
        <div className="mb-4 w-full">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}>
                {label}
            </label>
            {children}
        </div>
    )
}

export default FormControl
