'use client'
import { useWixClient } from "@/hooks/useWixClient"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { toast } from "react-toastify"


const LoginForm = () => {

    const wixClient = useWixClient()
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()

    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    // Handle Login Submit
    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault()

        try {
            setLoading(true)
            const res = await wixClient.auth.login({
                email,
                password
            })

            if (res.loginState === 'SUCCESS') {
                const tokens = await wixClient.auth.getMemberTokensForDirectLogin(res.data.sessionToken)
                console.log(tokens);
                Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), {
                    expires: 3
                })
                wixClient.auth.setTokens(tokens)
                router.push('/')
            }
            if (res.loginState === 'FAILURE') {
                setError('Invalid email or password')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    // Handle Forgot Password 
    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
            await wixClient.auth.sendPasswordResetEmail(
                email,
                "http://localhost:3000/login",
            );
            toast.success('Reset Password Link Sent')
            router.push('/')
        } catch (error) {
            setError('Invalid Email Address')
        }

    }

    // Check If User is Logged In 
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])

    return (
        <div className=" text-gray-900 antialiased">
            <div className="my-20 px-10  flex flex-col md:flex-row sm:justify-center items-center pt-6 sm:pt-0 ">
                {/* Conditionally Show Login Form and Forgot Password Form */}
                {!showForgotPassword ?
                    (<div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-gray-200 overflow-hidden rounded-xl">
                        <form onSubmit={handleSubmit}>

                            <div className="py-8">
                                <center>
                                    <span className="text-2xl uppercase tracking-tight font-extrabold">LogIn</span>
                                </center>
                            </div>

                            <div className="relative h-11 mb-4 w-full min-w-[200px]">
                                <input
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    required
                                    type="email"
                                    autoComplete=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Email
                                </label>
                            </div>
                            <div className="relative h-11 mb-4 w-full min-w-[200px]">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Password
                                </label>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <IoEyeOffOutline size={20} className="text-blue-gray-700" />
                                    ) : (
                                        <IoEyeOutline size={20} className="text-blue-gray-700" />
                                    )}
                                </div>
                            </div>
                            {error && <p className="text-red-600 text-sm" > {error} </p>}

                            <div className="flex items-center justify-end">
                                <button className='  w-full  px-4 py-2 bg-black  rounded-md font-semibold text-sm text-white  tracking-widest hover:bg-gray-900    transition ease-in-out duration-150'
                                    type="submit" disabled={loading}
                                >
                                    {loading ? (<AiOutlineLoading size={22} className='inline-block text-center animate-spin ' />) : ('SignIn')}

                                </button>
                            </div>
                        </form>
                        <div className=" mt-6  flex flex-col items-center gap-3 ">
                            <button onClick={() => setShowForgotPassword(true)} className="text-sm text-gray-600 hover:text-gray-900 "
                            >
                                Forgot your password?
                            </button>
                            <p className="ms-2 text-sm  text-gray-600" >Dont Have Account ?{' '}
                                <Link href='/signup' className="hover:text-blue-400 font-semibold" >
                                    Signup
                                </Link>
                            </p>

                        </div>

                    </div>) : (
                        // Forgot Password Form
                        <div className="relative flex flex-col my-10 rounded-xl border border-gray-200 p-5 bg-transparent bg-clip-border text-gray-700 shadow-none">
                            <button onClick={() => setShowForgotPassword(false)}   ><IoMdArrowRoundBack className='text-black mb-5' size={18} />  </button>
                            <h4 className="text-md  uppercase text-black tracking-tight font-extrabold">
                                Reset Password
                            </h4>
                            <p className='text-gray-600 text-sm mb-5 ' >Enter Your Email W'll Send a Password Reset Link to your Email </p>
                            <form onSubmit={handleForgotPassword}>
                                <div className="">
                                    <input
                                        type='email'
                                        className=" w-full rounded-md border border-gray-200 bg-transparent px-3 py-3  text-sm  text-blue-gray-700 outline outline-0 transition-colors   focus:border-2 focus:border-gray-900  focus:outline-0 "
                                        placeholder=" "
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete='on'
                                    />
                                    {error && <p className="text-red-600 text-sm my-1" > {error} </p>}
                                    <button type='submit' className='my-2 w-full bg-black text-white py-1 px-4 rounded-xl '>Send</button>
                                </div>
                            </form>

                        </div>
                    )}
            </div >
        </div >
    )
}

export default LoginForm
