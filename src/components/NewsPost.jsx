import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from "react-spinners";

const NewsPost = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'tesla, google',
                        from: '2024-07-4',
                        sortBy: 'publishedAt',
                        apiKey: '36b7f1cc43e24cf3b6ba8f7bb2446061'
                    }
                });
                setNews(response.data.articles.slice(0, 3));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className='absolute bg-[#0A090F] w-[30vw] h-[200vh] text-white right-0'>
            <nav className="py-6 lg:px-10 px-3 bg-[#0A090F] z-20 fixed border-b border-r border-white w-full lg:w-[50vw] border-opacity-20">
                <h2 className='font-semibold text-2xl'>Latest News</h2>
            </nav>
            {loading && (
                <div className='absolute bg-[#0A090F] w-[30vw] min-h-screen text-white right-0 flex justify-center items-center'>
                    <ClipLoader color='#ffffff' loading={loading} size={35} />
                </div>
            )}
            {!loading && (
                <div className='px-8 mt-32'>
                    <ul className='flex flex-col mt-6 w-[23vw] gap-7'>
                        {news.map((article, index) => (
                            <li key={index} className='border border-white rounded-lg px-5 py-4 border-opacity-20'>
                                {article.urlToImage && (
                                    <img src={article.urlToImage} alt={article.title} className='rounded-md' style={{ maxWidth: '100%', height: 'auto' }} />
                                )}
                                <h3 className='font-semibold mt-3 text-lg'>{article.title}</h3>
                                <p className='mt-3 text-gray-400'>{article.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NewsPost;
