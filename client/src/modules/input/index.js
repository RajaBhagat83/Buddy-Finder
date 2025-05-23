import React from 'react'

function Input({
  label="",
  name="",
  type="text",
  placeholder="",
  className="",
  inputClassname="",
  isRequired=false,
  value,
  onChange
}) {
  return (
    <div className={`p-4 w-1/2 ${className}`}>
            <label for={name} className="block mb-2 ml-3 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type}id={name} className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-4 w-full text-xl ${inputClassname} 
           `} placeholder={placeholder} required={ isRequired} onChange={onChange} value= {value}  />
    </div>
  )
}
export default Input
