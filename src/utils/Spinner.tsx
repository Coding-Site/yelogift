function Spinner() {
    return (
        <div
            className=" flex items-center w-full justify-center min-h-max"
            style={{ height: '100vh' }}
        >
            <img src="/assets/loadingicon.gif" alt="loading..." />
        </div>
    );
}

export default Spinner;
