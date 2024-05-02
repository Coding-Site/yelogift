function Footer() {
  

  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Footer
        </span>
      </div>

      <div className="flex items-end gap-3 w-full">
        <div className="flex flex-col grow">
          <label htmlFor="description " className="text-main mb-4">Description</label>
          <textarea name="description" className="bg-transparent p-2 border border-gray-400 rounded-md outline-none grow" 
          id="description" cols={30} rows={10}></textarea>
        </div>
        <button className="btn py-2  !rounded-md px-5">Save changes</button>
      </div>
    </div>
  );
}

export default Footer;
