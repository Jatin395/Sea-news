import React, { useEffect, useState } from 'react';

function App() {
  const [inp, setinp] = useState('india');
  const [news, setnews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      let response = await fetch(`https://newsapi.org/v2/everything?q=${inp}&apiKey=668ec97e98b94cd7b7b7b2d8b750e2c4`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      setnews(data.articles);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching the news:', error);
    } finally {
      setLoading(false);
    }
  }

  const Searchhandle = () => {
    if (inp.trim() === '') {
      alert('Please write something');
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <nav>
        <div className="flex flex-col md:flex-row p-4 md:p-4 bg-slate-400 justify-around items-center">
          <h2 className='font-bold text-xl cursor-pointer text-slate-200 hover:text-slate-300'>SeaNews</h2>
          <ul className='flex flex-wrap gap-4 cursor-pointer m-2 justify-center md:justify-start'>
            {['Headlines', 'Gaming', 'Finance', 'Education', 'Technology'].map((category) => (
              <li
                key={category}
                onClick={() => { setinp(category); fetchData(); }}
                className='hover:text-slate-200 text-center'
              >
                {category}
              </li>
            ))}
          </ul>
          <div className="flex items-center mt-4 md:mt-0">
            <input
              type='text'
              className='w-52 rounded-xl h-10 p-3 mr-3'
              value={inp}
              onChange={(e) => setinp(e.target.value)}
            />
            <button className='bg-blue-500 text-white w-32 h-10 rounded-md hover:bg-indigo-500' onClick={Searchhandle}>Search</button>
          </div>
        </div>
      </nav>


      <div className='mt-10'>
        {loading && <div className='flex justify-center items-center h-full'><p className='font-bold text-3xl'>Loading</p> </div>}
        {error && <div className="flex justify-center items-center"><p>{error}</p></div>}
        {news.length > 0 && !loading && (
          <div className="flex justify-center items-center flex-wrap gap-8">


            {news.map((article, index) => (
              article.urlToImage && (
                <div className="w-72 h-auto max-w-xs shadow-xl rounded-lg border-black overflow-hidden flex justify-center gap-4 flex-col items-center" key={index}>
                  <img
                    className='w-full h-32 object-cover hover:scale-105'
                    src={article.urlToImage}
                    alt={article.title || 'News image'}
                  />
                  <h2 className='text-lg font-bold hover:underline cursor-pointer' onClick={() => {
                    window.open(article.url);
                  }}>
                    {article.title ? article.title.replace(/removed/i, 'Not available') : 'Not available'}
                  </h2>
                  <p className='text-[12px] line-clamp-3'>
                    {article.description ? article.description.replace(/removed/i, 'Not available') : 'Not available'}
                  </p>
                  <button className='mt-2 p-2 mb-4 bg-gray-400 hover:scale-105 hover:text-gray-100  rounded-xl'>
                    <a href={article.url} target='_blank' rel='noopener noreferrer'>Read more</a>
                  </button>
                </div>
              )
            ))}



          </div>
        )}
        {news.length === 0 && !loading && !error && (
          <div className="flex justify-center items-center">
            <p>No news found. Try again.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
