import { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';

import HeroCard from './components/HeroCard';
import logo from './assets/marvel.svg';

import './App.css';
import useFetchHeores from './hooks/useFetchHeores';
import HeroModal from './components/HeroModal';
import api from './services/api';
import { getMd5Hash } from './utils';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
  },
  content: {
    backgroundColor: '#2e2e2e',
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
function App() {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [heroModal, setHeroModal] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [heroModalComics, setHeroModalComics] = useState([]);

  const { heroes, hasMore, loading, error, errorMessage } = useFetchHeores(
    search,
    offset
  );

  const observer = useRef();
  const lastHeroElementRef = useCallback(
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

  const openModal = (hero) => {
    setIsModalVisible(true);
    setHeroModal(hero);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    // setHeroModal({});
    setHeroModalComics([]);
  };

  const fetchHeroComics = async () => {
    const { hash, ts } = getMd5Hash();

    try {
      const { data } = await api.get(
        `/characters/${heroModal.id}/comics?ts=${ts}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`
      );

      setHeroModalComics(data.data.results);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className='header'>
        <img src={logo} alt='marvel' width={200} />
        <h4>HEROES</h4>
      </div>
      <div className='App'>
        <div className='input-container'>
          <input
            type='text'
            value={search}
            onChange={(e) => {
              setOffset(0);
              setSearch(e.target.value);
            }}
            placeholder='Pesquisar herói'
          />
        </div>
        <div style={{ width: '100%' }}>
          {error ? (
            <h1>{errorMessage}</h1>
          ) : (
            heroes.map((hero, index) => {
              if (heroes.length === index + 1) {
                return (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    openModal={openModal}
                    scrollRef={lastHeroElementRef}
                  />
                );
              } else {
                return (
                  <HeroCard key={hero.id} hero={hero} openModal={openModal} />
                );
              }
            })
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        onAfterOpen={() => fetchHeroComics()}
        style={modalStyle}
      >
        <HeroModal hero={heroModal} comics={heroModalComics} />
      </Modal>
    </>
  );
}

export default App;
