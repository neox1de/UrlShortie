'use client';

import { useState, useEffect } from 'react';
import UrlDetailsModal from './components/UrlDetailsModal';

interface UrlData {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  shortId: string;
}

export default function Home() {
  // State management for URL shortening and user interaction
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [urlDataList, setUrlDataList] = useState<UrlData[]>([]);
  const [selectedShortId, setSelectedShortId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // allow users to keep track of their shortened URLs by reading the stored urlDataList in the browser's local storage
  useEffect(() => {
    const storedData = localStorage.getItem('urlDataList');
    if (storedData) {
      setUrlDataList(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('urlDataList', JSON.stringify(urlDataList));
  }, [urlDataList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
      const newUrlData = { originalUrl: url, shortUrl: data.shortUrl, clicks: 0, createdAt: new Date(), shortId: data.shortId };
      setUrlDataList((prev) => [...prev, newUrlData]); // Add the new generated short URL to the urlDataList state
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => { // copy the short url to the clipboard
    navigator.clipboard.writeText(shortUrl);
    alert('short url has been Copied to clipboard');
  };

  const openModal = (shortId: string) => { // open the modal with the short url id
    setSelectedShortId(shortId);
    setIsModalOpen(true);
  };

  const closeModal = () => { // close the modal
    setIsModalOpen(false);
    setSelectedShortId(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          URL Shortener
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here"
              className="w-full px-6 py-4 rounded-xl border border-gray-800 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition duration-200"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition duration-300 disabled:opacity-50 shadow-[0_2px_4px_rgba(0,0,0,0.3)] disabled:cursor-not-allowed"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-400 text-center">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <p className="text-gray-400 text-sm mb-2">Shortened URL:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {urlDataList.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Your URLs</h2>
            <ul className="space-y-3">
              {urlDataList.map((data, index) => (
                <li
                  key={index}
                  onClick={() => openModal(data.shortId)}
                  className="bg-gray-800/50 p-4 rounded-xl cursor-pointer hover:bg-gray-800 transition duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] group"
                >
                  <p className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    {data.shortUrl}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <UrlDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        shortId={selectedShortId}
      />
    </main>
  );
}
