import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    name: string;
    content: string;
};

function AddPage() {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = () => {};
    return (
        <div className="w-full container py-5">
            <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
                <div className="flex justify-between mb-6">
                    <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                        Add Page
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="flex w-full flex-col justify-between gap-x-6"
                >
                    <div className="flex w-full justify-between gap-x-6">
                        <div className="flex flex-col w-full gap-y-4">
                            <label
                                htmlFor="name"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Name
                                <input
                                    {...register('name')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                            <label
                                htmlFor="description"
                                className="text-main font-semibold flex flex-col gap-y-2 w-full"
                            >
                                Content
                                <textarea
                                    {...register('content')}
                                    rows={10}
                                    className="border border-gray-400 w-full rounded-md bg-transparent p-1"
                                ></textarea>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn mt-5 ms-auto my-3 !rounded px-5 "
                    >
                        {' '}
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPage;
