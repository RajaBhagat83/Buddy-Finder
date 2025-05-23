import React from 'react'

function Button({
  label,
  type,
  className,
  disabled=false
}) {
  return (
    <div className='pt-5'>
      <button type={type} class={`bg-blue-500  ml-32 mb-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${disabled}`} >
       {label}
      </button>
    </div>
  )
}

export default Button
