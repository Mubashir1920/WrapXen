'use client'
import Link from "next/link"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const LoginForm = () => {
    const [clickedSingIn, setClickedSignIn] = useState(false)
    return (
        <div className=" text-gray-900 antialiased">
            <div className="h-[calc(100vh-80px)] px-10 flex flex-col md:flex-row sm:justify-center items-center pt-6 sm:pt-0 ">

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-gray-200 overflow-hidden sm:rounded-xl">
                    <form method="POST" action="{{ route('login') }}">

                        <div className="py-8">
                            <center>
                                <span className="text-2xl uppercase tracking-tight font-extrabold">LogIn</span>
                            </center>
                        </div>

                        <div class="relative h-11 mb-4 w-full min-w-[200px]">
                            <input
                                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeHolder=" "
                            />
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                        </div>
                        <div class="relative h-11 mb-8 w-full min-w-[200px]">
                            <input
                                type="password"
                                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeHolder=" "
                            />
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                        </div>
                        <div className="flex justify-between my-4">
                            <label htmlFor="remember_me" className="flex items-center">
                                <input type="checkbox" id="remember_me" name="remember" className='rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500' />
                                <span className="ms-2 text-sm text-gray-600">Remember Me</span>
                            </label>
                            <p className="ms-2 text-sm text-gray-600" >Dont Have Account ?{' '}
                                <Link href='/signup' className="hover:text-blue-700 font-semibold" >
                                    Signup
                                </Link>
                            </p>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <a className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('password.request') }}">
                                htmlForgot your password?
                            </a>

                            <button onClick={() => setClickedSignIn(prev => !prev)} className='ms-4 inline-flex items-center px-4 py-2 bg-black border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-950 focus:bg-gray-700 active:bg-gray-900   transition ease-in-out duration-150'    >
                                {clickedSingIn ? ('Signing In...') :
                                    ('Sign In')}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default LoginForm
