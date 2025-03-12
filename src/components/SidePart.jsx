const SideBar = ()=>{
    return(
        <>
        <div className="w-1/4 h-screen bg-gray-700 rounded-lg">
            <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h1 className="font-bold text-white text-3xl underline">Whats your next Action?</h1>
              <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">Export Graph</button>
              <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">Edit Graph</button>
              <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">Duplicate Graph</button>
              <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">Save for later</button>
            </div>
        </div>
        </>
    )
}

export default SideBar;