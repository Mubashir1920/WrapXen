'use client'
import { useWixClient } from "@/hooks/useWixClient"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const LoginForm = () => {

    const wixClient = useWixClient()
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")




    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault()

        try {
            setLoading(true)
            const res = await wixClient.auth.login({
                email,
                password
            })
            console.log(res);

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

            setError('Invalid Credentials Try Again')


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])

    return (
        <div className=" text-gray-900 antialiased">
            <div className="my-20 px-10 flex flex-col md:flex-row sm:justify-center items-center pt-6 sm:pt-0 ">

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-gray-200 overflow-hidden sm:rounded-xl">
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
                                type="password"
                                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
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
                        <Link className="text-sm text-gray-600 hover:text-gray-900 "
                            href="/Forget-Password">
                            Forgot your password?
                        </Link>
                        <p className="ms-2 text-sm  text-gray-600" >Dont Have Account ?{' '}
                            <Link href='/signup' className="hover:text-blue-400 font-semibold" >
                                Signup
                            </Link>
                        </p>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default LoginForm
