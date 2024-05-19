function CallToAtion() {
    return (
        <div className="flex py-5 container">
            <div className="flex border-4 border-main w-full py-10 px-10 ">
                <div className="left w-2/3 sm:w-1/2 flex flex-col items-start gap-y-2">
                    <div className="flex w-[60%] text-center flex-col gap-y-2 ps-4 mb-5 sm:mb-0">

                        <div className="text-base sm:text-2xl font-semibold uppercase">Stay</div>
                        <div className="text-xs sm:text-xl uppercase">informed on our</div>
                        <div className="text-xs sm:text-xl font-extralight uppercase">latest news!</div>
                    </div>
                    <input type="text  "
                        className="bg-mainWhite rounded-full text-gray-700  sm:w-[90%] w-[100%] ps-5 h-10  outline-none
                         placeholder:sm:text-base placeholder:!text-xs placeholder:text-gray-600"
                        placeholder="Enter your Email" />
                </div>
                <div className="flex flex-col-reverse items-center gap-y-2 w-1/3 sm:w-1/2">
                    <button className="btn !rounded-full !h-10 w-[80%] px-8  !min-w-10 !bg-mainLightColor font-medium sm:self-start ">Send</button>
                    <img className="w-20 sm:w-40 mb-5 sm:mb-0 sm:hidden flex" src="/assets/logo-action.png" alt="" />
                    <img className="w-20 sm:w-40 mb-5 sm:mb-0 sm:flex hidden" src="/assets/logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CallToAtion