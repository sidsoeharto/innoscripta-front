import { useEffect, useState } from 'react';

import { useActions } from '../hooks/useActions';
import { categories, sources } from '../constants';
import SearchFilter from '../components/SearchFilter';
import Article from '../components/Article';
import viteLogo from '/vite.svg';

const Home = () => {
  const { fetchNews, getPreferences, addToCollection } = useActions();
  const [category, setCategory] = useState({ name: 'All Categories', value: 'all' });
  const [source, setSource] = useState({ name: 'All News', value: 'all' });
  const [keyword, setKeyword] = useState("");
  const [news, setNews] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onHandleSubmit = (event) => {
    event.preventDefault();

    handleFetchNews();
  }

  const handleKeyword = (event) => {
    return setKeyword(event.target.value)
  }

  const handleFetchNews = () => {
    const payload = {
      keyword, startDate, endDate, category, source
    };

    fetchNews({
      setErrors: console.error,
      setSuccessResponse: setNews,
      payload,
      handleLoading: setLoadingArticle
    });
  };

  const handleGetPreferences = () => {
    const setSuccessResponse = (data) => {
      setCategory(categories.find(element => element.value === data.category));
      setSource(sources.find(element => element.value === data.source));
    }
    
    getPreferences({
      setSuccessResponse,
      setErrors: console.error
    })
  }

  const handleAddToCollection = (payload) => {
    addToCollection({
      setErrors: console.error,
      payload
    })
  }

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    handleFetchNews();
  }, [
    category,
    startDate,
    endDate,
    source
  ]); 

  useEffect(() => {
    handleGetPreferences()
  }, []);

  return (
    <>
      <div>
        <a href={window.location.origin} target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className='mb-8'>
        <div className='mb-4 border-b-8 border-indigo-600'>
          <h1 className='uppercase tracking-tight font-bold text-gray-100 mb-1'>
            <div>Get Informed</div>
            <div>Get Inspired</div>
          </h1>
        </div>
        <h2 className='text-xl text-gray-200 font-semibold'>News Curated For You</h2>
      </div>
      <SearchFilter 
        handleSubmit={onHandleSubmit}
        keyword={keyword}
        setKeyword={handleKeyword}
        categories={categories}
        category={category}
        setCategory={setCategory}
        sources={sources}
        source={source}
        setSource={setSource}
        startDate={startDate}
        endDate={endDate}
        handleChangeDate={onChangeDate}
      />
      {
        loadingArticle ? (
          <div className='container my-16'>
            loading...
          </div>
        ) :
        (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {
              news.map((newsItem, index) => 
                <Article content={newsItem} key={index} handleAdd={handleAddToCollection}/>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default Home;