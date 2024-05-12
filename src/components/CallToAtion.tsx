function CallToAtion() {
    return (
        <div className="flex py-5 container">
            <div className="flex border-4 border-main w-full py-10 px-10 ">
                <div className="left w-1/2 flex flex-col items-center gap-y-2">
                    <div className="text-base sm:text-2xl font-semibold uppercase">Stay</div>
                    <div className="text-xs sm:text-xl uppercase">informed on our</div>
                    <div className="text-xs sm:text-xl font-extralight uppercase">latest news!</div>
                    <input type="text"
                        className="bg-mainWhite rounded-full text-gray-700  w-[80%] ps-5 h-12 outline-none placeholder:sm:text-base placeholder:text-xs"
                        placeholder="Enter your Email" />
                </div>
                <div className="flex flex-col-reverse items-center gap-y-2  w-1/2">
                    <button className="btn !rounded-full !h-12 sm:!w-36 !min-w-10 !bg-mainLightColor font-medium">Send</button>
                    <img className="w-20 sm:w-40" src="/assets/logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CallToAtion