import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from 'components/ServiceApi/images';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (query !== '') {
      setIsLoading(prevIsLoading => !prevIsLoading);
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));
          setTotalImages(totalHits);
          return imagesArray;
        })
        .then(imagesArray => {
          if (page === 1) {
            setImages(imagesArray);
          }
          return imagesArray;
        })
        .then(imagesArray => {
          if (page !== 1) {
            setImages(prevImages => [...prevImages, ...imagesArray]);
          }
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(prevIsLoading => !prevIsLoading));
    }
  }, [page, query]);

  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = event => {
    if (event.target.nodeName === 'IMG') {
      setShowModal(prevShowModal => !prevShowModal);
      setCurrentImageUrl(event.target.dataset.large);
      setCurrentImageDescription(event.target.alt);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
      <Searchbar onSubmit={getSearchRequest} />

      {isLoading && <Loader />}

      {images && <ImageGallery images={images} openModal={openModal} />}

      {images && images.length >= 12 && images.length < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}
    </>
  );
};

export default App;
