import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
const ACCESS_KEY = 'v2vQTrXbyDzcqvEXTKuO8vc6HDjsQov7FkTdJF-pWrE';

function App() {
  const [images, setImages] = useState([]);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (query, page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query,
          page,
          per_page: 12,
          client_id: ACCESS_KEY,
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };
  const handleSearchSubmit = (query) => {
    if (query.trim() === '') {
      toast.error('Please enter a search term!'); 
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]);
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, 1);
    }
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />
      
      {loading && <Loader />} {/* Індикатор завантаження під галереєю */}
      
      {!loading && images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      
      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      <Toaster />
    </div>
  );
}

export default App;