

const loading = () => {
    return (
        <div class="flex justify-center items-center h-screen">
            <div class="relative inline-flex">
                <div class="w-8 h-8 bg-gray-500 rounded-full"></div>
                <div class="w-8 h-8 bg-black rounded-full absolute top-0 left-0 animate-ping"></div>
                <div class="w-8 h-8 bg-gray-700 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
        </div>
    )
}

export default loading
