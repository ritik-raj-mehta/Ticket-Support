type PageType ={
    totalPosts : number
    postsPerPage : number
    setCurrentPage : React.Dispatch<React.SetStateAction<number>>
    currentPage : number
}

const Paginations = ({totalPosts, postsPerPage, setCurrentPage, currentPage}:PageType) => {
    let pages = [];
    for(let i= 1 ; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }
  return (
    <div className="text-center space-x-4">
        {
            pages.map((page,index) => (
                <button className={`${page == currentPage ? 'bg-orange-500' : ''} border border-white dark:border-black md:py-2 md:px-3 px-2 font-bold my-4 `} key={index} onClick={() => setCurrentPage(page)} >{page} </button>
            ))
        }
    </div>
  )
}

export default Paginations