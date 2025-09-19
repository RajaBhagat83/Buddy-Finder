import React from 'react'

function Button({className}) {
  return (
    <div className={`transform -rotate-12 text-white ${className} `}>
       <button  className="border-2 border-white text-lg md:text-xl p-2 md:p-5 rounded-xl bg-green-800 flex active:scale-95 cursor-pointer ">
                <h1 className="w-1 h-1 borer-white border-4 mt-3 mr-2 rounded-full"></h1>{" "}
                Sign In
              </button>
    </div>
  )
}

export default Button
