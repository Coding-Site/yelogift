export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-mainLightBlack p-6">
            <div className="bg-mainBlack shadow-md rounded-lg px-28 py-14 min-w-lg text-center max-w-[75%] ">
                <h1 className="text-3xl font-bold mb-4 text-mainLightColor">
                    YELO GLOBAL LTD
                </h1>
                <p className="text-mainWhite mb-4">
                    Easiest solution to purchase all digital cards, you can
                    search the best products with ease and anywhere, anytime.
                </p>
                <p className="text-mainWhite">
                    Officially registered in{' '}
                    <span className="text-mainLightColor">
                        London, United Kingdom
                    </span>{' '}
                    with Company number 15620500.
                </p>
            </div>
        </div>
    );
}
