import React from 'react'

export default function FormUser() {
  return (
    <div className='block w-full '>
     
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 className="dark:text-white text-sm mt-3 mb-6 font-bold uppercase px-1 md:px-4">
          User Information
        </h6>
        <div className='w-full md:w-4/12 my-4 px-1 md:px-4 '>
             <div className='mb-2 w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] border-4 dark:border-white' >
              </div>

            
            <div className=''>
                <input className='text-sm lg:text-md dark:text-white' type="file" name="" id="" />
                <label className='dark:text-white' htmlFor="avatar_Image">Télècharger une image de profil</label>
            </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-xs font-bold mb-2 dark:text-white" htmlfor="grid-password">
                Username
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="lucky.jesse" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                Email address
              </label>
              <input type="email" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="jesse@example.com" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                First Name
              </label>
              <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Lucky" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                Last Name
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Jesse" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                First Name
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Lucky" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 ">
            <div className="relative w-full mb-3 ">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                Last Name
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Jesse" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                First Name
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Lucky" 
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase dark:text-white text-xs font-bold mb-2" htmlfor="grid-password">
                Last Name
              </label>
              <input type="text" 
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                      value="Jesse" 
              />
            </div>
          </div>
        </div>
                    
        <button type="submit" className="max-w-[100px] ml-4 text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Envoyer</button>
        </form>
    </div>
    </div>
  )
}
