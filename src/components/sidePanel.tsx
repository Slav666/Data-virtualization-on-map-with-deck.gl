const SidePanel = () => {
  return (
    <div
      className="sidebar left-[-300px] flex min-h-screen 
    overflow-y-auto bg-gray-900 p-2 text-center shadow duration-1000 lg:left-0"
    >
      <div className="text-xl text-gray-100">
        <div className="mt-1 flex items-center rounded-md p-2.5 ">
          <i className="bi bi-app-indicator rounded-md bg-blue-600 px-2 py-1"></i>
          <h1 className="ml-3  text-xl font-bold text-gray-200">Slav's Map App</h1>
          <i className="bi bi-x ml-20 cursor-pointer lg:hidden"></i>
        </div>

        <div>
          <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300  hover:bg-blue-600">
            <i className="bi bi-house-door-fill"></i>
            <span className="ml-4 text-[15px] text-gray-200">First Layer</span>
          </div>
          <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300  hover:bg-blue-600">
            <i className="bi bi-bookmark-fill"></i>
            <span className="ml-4 text-[15px] text-gray-200">Second Layer</span>
          </div>
          <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 duration-300  hover:bg-blue-600">
            <i className="bi bi-envelope-fill"></i>
            <span className="ml-4 text-[15px] text-gray-200">Third Layer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidePanel;
