import React, { useEffect, useState } from 'react';

interface UrlDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortId: string | null;
}

interface UrlData {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
}

const UrlDetailsModal: React.FC<UrlDetailsModalProps> = ({ isOpen, onClose, shortId }) => {
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch real-time URL statistics when modal opens
  useEffect(() => {
    if (isOpen && shortId) {
      setLoading(true);
      fetch(`/api/url/${shortId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUrlData(data);
          }
        })
        .catch((err) => setError('Failed to fetch URL details'))
        .finally(() => setLoading(false));
    }
  }, [isOpen, shortId]);

  if (!isOpen) return null;

  // Calculate days until URL expiration
  const calculateDaysToExpire = (createdAt: Date) => {
    const now = new Date();
    const expirationDate = new Date(createdAt);
    expirationDate.setDate(expirationDate.getDate() + 30);
    const diffTime = Math.max(expirationDate.getTime() - now.getTime(), 0);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-6">URL Details</h2>
        {loading ? (
          <div className="text-gray-400 mb-4">Loading...</div>
        ) : error ? (
          <div className="text-red-400 mb-4">{error}</div>
        ) : urlData ? (
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <p className="text-gray-400 text-sm mb-1">Original URL</p>
              <p className="text-white text-sm break-all">{urlData.originalUrl}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <p className="text-gray-400 text-sm mb-1">Short URL</p>
              <p className="text-white text-sm break-all">{process.env.NEXT_PUBLIC_BASE_URL}/{shortId}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-gray-800/50 p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                <p className="text-gray-400 text-sm mb-1">Clicks</p>
                <p className="text-white text-lg font-semibold">{urlData.clicks}</p>
              </div>
              <div className="flex-1 bg-gray-800/50 p-4 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                <p className="text-gray-400 text-sm mb-1">Days Left</p>
                <p className="text-white text-lg font-semibold">{calculateDaysToExpire(urlData.createdAt)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 mb-4">No URL details available</div>
        )}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UrlDetailsModal; 