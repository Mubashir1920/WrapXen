'use client'

import { useWixClient } from '@/hooks/useWixClient'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const SignupForm = () => {

    const wixClient = useWixClient()
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()

    const [showVerification, setShowVerification] = useState(false)
    const [emailCode, setEmailCode] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)



    //  Handle Sign Up Form
    const handleSubmitChange = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await wixClient.auth.register({
                email,
                password,
                profile: { nickname: username }
            })

            if (res.loginState === "EMAIL_VERIFICATION_REQUIRED") {
                toast.success('Email Verification Link Sent !')
                setShowVerification(true)
            }
            if (res.loginState === 'FAILURE' || res.errorCode === 'emailAlreadyExists') {
                setError('Email Already Exists')
            }

        } catch (error) {
            console.log(error);
            setError('Something Went Wrong')
        } finally {
            setLoading(false)
        }

        setEmail('')
        setPassword('')
        setUsername('')
    }


    // Handle Account Verification
    const handleVerification = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await wixClient.auth.processVerification({
                verificationCode: emailCode
            })
            if (res.loginState && res.loginState === 'SUCCESS') {
                toast.success('Verification Successfull')
                router.push('/login')
            }

        } catch (error) {
            setError('Invalid Verification Code')
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

        <div className="flex  mb-20 mt-32 items-center justify-center">
            {!showVerification && <div className="relative flex flex-col rounded-xl border border-gray-200 px-6 py-4 bg-transparent bg-clip-border text-gray-700 shadow-none">
                <h4 className="text-2xl text-center uppercase text-black tracking-tight font-extrabold">
                    Sign Up
                </h4>
                <form onSubmit={handleSubmitChange} className="mt-8 mb-2 w-[340px] max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                required
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete='on'
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Name
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='on'
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
                    </div>
                    {error && <p className="text-red-600 text-sm" > {error} </p>}
                    <button
                        className="mt-6 block w-full select-none rounded-lg bg-black py-3 px-6 text-center text-sm font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        data-ripple-light="true"
                        disabled={loading}
                    >
                        {loading ? (<AiOutlineLoading size={22} className='inline-block text-center animate-spin ' />) : ('Register')}

                    </button>
                    <p className="mt-4 block text-center text-sm    text-gray-700 ">
                        Already have an account?
                        <Link
                            className={`font-semibold text-black transition-colors hover:text-blue-400 ${loading ? 'pointer-events-none' : ''}`}
                            href="/login"
                        >
                            {' '}Login
                        </Link>
                    </p>
                    <p onClick={() => setShowVerification(true)} className={`${loading ? 'pointer-events-none' : ''}cursor-pointer hover:text-gray-900 text-gray-600 text-xs font-semibold my-2  text-center`} >Verify Account ? </p>
                </form>
            </div>}
            {showVerification && <div className="relative flex flex-col rounded-xl border border-gray-200 p-5 bg-transparent bg-clip-border text-gray-700 shadow-none">
                <button onClick={() => setShowVerification(false)}   ><IoMdArrowRoundBack className='text-black mb-5' size={18} />  </button>
                <h4 className="text-md  uppercase text-black tracking-tight font-extrabold">
                    Verify Code
                </h4>
                <p className='text-gray-600 text-sm mb-5 ' >We Have Sent A  Verification Code to You Email. </p>
                <form onSubmit={handleVerification}>
                    <div className="">
                        <input
                            type='text'
                            className=" w-full rounded-md border border-gray-200 bg-transparent px-3 py-3  text-sm  text-blue-gray-700 outline outline-0 transition-colors   focus:border-2 focus:border-gray-900  focus:outline-0 "
                            placeholder=" "
                            required
                            value={emailCode}
                            onChange={(e) => setEmailCode(e.target.value)}
                            autoComplete='on'
                        />
                        <button
                            type='submit'
                            className='my-2 w-full bg-black text-white py-2 px-4 rounded-lg '
                        >
                            {loading ? (<AiOutlineLoading size={22} className='inline-block text-center animate-spin ' />) : ('Verify')}
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-600 text-sm" > {error} </p>}
            </div>}



        </div>
    )
}

export default SignupForm
