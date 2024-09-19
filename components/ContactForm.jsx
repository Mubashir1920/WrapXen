import MyMapLocation from "./MyMapLocation"

const ContactForm = () => {
    return (
        <section className="px-8 py-8 lg:py-16">
            <div className="container mx-auto text-center">
                <p className="mb-4 !text-base lg:!text-2xl">
                    Customer Care
                </p>
                <p className="mb-4 !text-3xl lg:!text-5xl">
                    We&apos;re Here to Help
                </p>
                <p className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
                    Whether it&apos;s a question about our services, a request for
                    technical assistance, or suggestions for improvement, our team is
                    eager to hear from you.
                </p>
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
                    <MyMapLocation />
                    <form className="flex flex-col gap-4 rounded-xl bg-gray-100 px-10 py-10 lg:max-w-sm">
                        <p className="text-left font-semibold text-gray-600">
                            Select Options for Business Engagement
                        </p>
                        <div className="flex gap-4">
                            <button className="max-w-fit border border-gray-400 px-3 py-1 rounded-md hover:bg-gray-100">
                                General inquiry
                            </button>
                            <button className="max-w-fit border border-gray-400 px-3 py-1 rounded-md hover:bg-gray-100">
                                Product Support
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="mb-2 text-left font-medium text-gray-900">First Name</p>
                                <input
                                    placeholder="First Name"
                                    name="first-name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                                />
                            </div>
                            <div>
                                <p className="mb-2 text-left font-medium text-gray-900">Last Name</p>
                                <input
                                    placeholder="Last Name"
                                    name="last-name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 text-left font-medium text-gray-900">Your Email</p>
                            <input
                                placeholder="name@email.com"
                                name="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                            />
                        </div>
                        <div>
                            <p className="mb-2 text-left font-medium text-gray-900">Your Message</p>
                            <textarea
                                placeholder="Message"
                                name="message"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                            />
                        </div>
                        <button className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all">
                            Send message
                        </button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default ContactForm
