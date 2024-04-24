
function AdminHome() {
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <img className="w-[500px]" src="assets/admin/home.png" alt="admin home" />
      <div className="flex flex-col gap-5">
        <span className="text-main text-5xl">Hello Admin,</span>
        <p className="text-"> Start by editing or deleting as needed.</p>
      </div>
    </div>
  );
}

export default AdminHome;
