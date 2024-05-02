
function Navbar() {
  return (
    <div className="h-20 flex items-center justify-between px-6 text-white">
      <div className="text-3xl font-bold">Joboard.</div>
      <a href="https://job-tracker-lake.vercel.app/">
      <button className="w-40 bg-blue-500 text-white font-bold py-3 rounded-md">Add Jobs</button>
      </a>
    </div>
  );
}
export default Navbar;
