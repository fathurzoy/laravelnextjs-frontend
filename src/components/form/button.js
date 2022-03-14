import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
    children,
    variant,
    type = 'button',
    className,
    ...props
}) => {
    const bgVariant = {
        danger: 'bg-red-600',
        primary: 'bg-indigo-600',
        warning: 'bg-yellow-400',
        success: 'bg-green-500',
    }
    console.log('form', props.disabled)

    return (
        <button
            className={`${
                props.disabled
                    ? 'bg-gray-600'
                    : variant
                    ? `${bgVariant[variant]} hover:opacity-80`
                    : 'bg-indigo-600 hover:opacity-80'
            }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                className || ''
            }`}
            type={type}
            {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {}

export default Button
