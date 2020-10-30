import { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';

import ComicModal from '../../components/ComicModal';
import Header from '../../components/Header';
import useFetchComics from '../../hooks/useFetchComics';
import ComicCard from '../../components/ComicCard';

import './styles.css';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
  },
  content: {
    backgroundColor: '#393939',
    color: '#fff',
    borderWidth: 0,
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    marginTop: 50,
    paddingBottom: 50,
  },
};

Modal.setAppElement('#root');
function Comics() {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [comicModal, setComicModal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { comics, hasMore, loading, error, errorMessage } = useFetchComics(
    search,
    offset
  );

  const observer = useRef();
  const lastComicElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const openModal = (comic) => {
    setIsModalVisible(true);
    setComicModal(comic);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    // setHeroModal({});
  };
  return (
    <>
      <Header />
      <div className='App'>
        <div className='input-container'>
          <input
            type='text'
            value={search}
            onChange={(e) => {
              setOffset(0);
              setSearch(e.target.value);
            }}
            placeholder='Pesquisar quadrinho'
          />
        </div>
        <div style={{ width: '100%' }}>
          {error ? (
            <h1>{errorMessage}</h1>
          ) : (
            comics.map((comic, index) => {
              if (comics.length === index + 1) {
                return (
                  <ComicCard
                    key={comic.id}
                    comic={comic}
                    openModal={openModal}
                    scrollRef={lastComicElementRef}
                  />
                );
              } else {
                return (
                  <ComicCard
                    key={comic.id}
                    comic={comic}
                    openModal={openModal}
                  />
                );
              }
            })
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <ComicModal comic={comicModal} />
      </Modal>
    </>
  );
}

export default Comics;
