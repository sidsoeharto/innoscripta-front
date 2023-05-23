
import DateRangePicker from './DateRangePicker';
import FilterDropdown from './FilterDropdown';
import SearchBar from './SearchBar';

const SearchFilter = (props) => {
  const {
    handleSubmit,
    keyword,
    setKeyword,
    categories,
    category,
    setCategory,
    sources,
    source,
    setSource,
    startDate,
    endDate,
    handleChangeDate
  } = props;

  return (
    <>
      <SearchBar 
        handleSubmit={handleSubmit}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <div className="flex flex-col lg:flex-row w-full items-center bg-neutral-800 border border-neutral-700 p-2 drop-shadow-lg rounded-xl gap-3">
        <FilterDropdown 
          categories={categories} 
          category={category} 
          setCategory={setCategory}
        />
        <DateRangePicker 
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeDate}
        />
        <FilterDropdown 
          categories={sources} 
          category={source} 
          setCategory={setSource}
        />
      </div>
    </>
  );
};

export default SearchFilter;