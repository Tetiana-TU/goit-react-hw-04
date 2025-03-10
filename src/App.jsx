import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "./services/api";
import Modal from "react-modal";
Modal.setAppElement("#root"); // Імпортуємо функцію з api.js

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0); // Загальна кількість сторінок
  const MAX_IMAGES = 50;

  // Функція для завантаження зображень
  const loadImages = async (query, page) => {
    if (images.length >= MAX_IMAGES) return; // Лімітуємо до 50 зображень

    setLoading(true);
    setError(null);

    try {
      const data = await fetchImages(query, page); // Викликаємо функцію з api.js

      // Фільтруємо горизонтальні зображення
      const horizontalImages = data.images.filter(
        (image) => image.width > image.height
      );

      // Додаємо нові зображення, але не перевищуємо ліміт MAX_IMAGES
      setImages((prevImages) => {
        const combinedImages = [...prevImages, ...horizontalImages];
        return combinedImages.length > MAX_IMAGES
          ? combinedImages.slice(0, MAX_IMAGES)
          : combinedImages;
      });

      setTotalPages(data.totalPages); // Оновлюємо кількість сторінок
    } catch (error) {
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  // Обробник пошукового запиту
  const handleSearchSubmit = (query) => {
    if (query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]); // Очищаємо зображення для нового пошуку
    loadImages(query, 1); // Завантажуємо зображення для нового запиту
  };

  // Обробник натискання на кнопку "Load more"
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(query, nextPage); // Завантажуємо зображення для наступної сторінки
  };

  // Відкриття модалки зображення
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Закриття модалки
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Викликаємо функцію для завантаження зображень при зміні запиту
  useEffect(() => {
    if (query) {
      loadImages(query, 1); // Завантажуємо зображення для початкової сторінки
    }
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />

      {loading && <Loader />}

      {/* Кнопка Load More з'являється, якщо є результати і ще є сторінки для завантаження */}
      {!loading && images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      <Toaster />
    </div>
  );
}

export default App;
