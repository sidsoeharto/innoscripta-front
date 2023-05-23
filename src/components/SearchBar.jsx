import { useRef } from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchBar = (props) => {
  const {
    handleSubmit,
    keyword,
    setKeyword,
  } = props;
  const clickPoint = useRef();

  const handleFocus = () => {
      clickPoint.current.style.display = "none";
  };
  const handleBlur = () => {
      clickPoint.current.style.display = "block";
  };

  return (
    <form 
      className='w-full flex flex-row mb-4' 
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col w-full gap-y-3'>
        <div className="w-full items-center justify-center bg-neutral-800 border border-neutral-700 p-2 drop-shadow-lg rounded-xl">
          <div className="relative">
            <div 
              className="absolute top-3 left-3 items-center" 
              ref={clickPoint}
            >
              <svg className="w-5 h-5 text-neutral-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                >
                </path>
              </svg>
            </div>
            <input
              type="text"
              className="block shadow-md w-full p-2 pl-10 text-neutral-200 bg-neutral-700 rounded-lg border border-neutral-600 focus:pl-3"
              placeholder="Search Here..."
              value={keyword}
              onChange={setKeyword}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <div className='hidden'>
        <div className="w-full h-full items-center lg:px-4 justify-center">
          <button
            type="submit"
            className="cursor-pointer w-full h-full rounded-lg bg-green-500 py-2 lg:px-12 font-normal uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white shadow-md">
              <HiSearch className='w-4 h-4 lg:w-6 lg:h-6 inline lg:hidden'/>
              <span className='hidden lg:inline'>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
};

export default SearchBar;