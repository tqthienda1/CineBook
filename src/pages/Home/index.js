import styles from './Home.module.scss';
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import SearchBar from '../../components/SearchBar';
import CategoryTab from '../../components/CategoryTab';
import ViewAllButton from '../../components/ViewAllButton';
import MovieCard from '../../components/MovieCard';
import PromotionCard from '../../components/PromotionCard';
import banner1 from '../../assets/jurassic_backdrop.jpg';
import banner2 from '../../assets/lilostitch.jpg';
import banner3 from '../../assets/DemonSlayer.jpg';
import poster1 from '../../assets/f1_poster_02.jpg';
import promotion1 from '../../assets/banner 1.png';
import promotion2 from '../../assets/banner 2.jpg';
import discount1 from '../../assets/happy day.png';
import discount2 from '../../assets/HAPPY HOUR.png';
import discount3 from '../../assets/u22_2.png';
import Tab from '../../components/Tab';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const banners = [
    <Banner movieName="jurassic world rebirth" imgSource={banner1} />,
    <Banner movieName="lilo & stitch" imgSource={banner2} />,
    <Banner movieName="Demon Slayer: Infinity Castle" imgSource={banner3} />,
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:5003/user/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Lỗi khi lấy danh sách phim');
        }
        console.log(res);

        const data = await res.json();
        console.log(data);
        setMovies(data);
      } catch (err) {
        console.error('Fetch movies error:', err);
      }
    };

    fetchMovies();
  }, []);

  const today = new Date();
  const [activeTab, setActiveTab] = useState('showing');

  const showingMovies = movies
    .filter((film) => film.releaseDay && new Date(film.releaseDay) < today)
    .sort((a, b) => new Date(b.releaseDay) - new Date(a.releaseDay))
    .map((film) => <MovieCard key={film.movieID} movieName={film.name} imgSource={`/assets/${film.posterURL}`} />);
  const comingMovies = movies
    .filter((film) => film.releaseDay && new Date(film.releaseDay) >= today)
    .sort((a, b) => new Date(a.releaseDay) - new Date(b.releaseDay)) // sớm nhất → muộn nhất
    .map((film) => <MovieCard key={film.movieID} movieName={film.name} imgSource={`/assets/${film.posterURL}`} />);

  const promotionCards = [
    <PromotionCard imgSource={discount1} />,
    <PromotionCard imgSource={discount2} />,
    <PromotionCard imgSource={discount3} />,
    <PromotionCard imgSource={discount1} />,
    <PromotionCard imgSource={discount2} />,
    <PromotionCard imgSource={discount3} />,
  ];

  return (
    <div className={styles.container}>
      <Slider items={banners} numberItemsEachPage={1} floatArrow={true} />
      <SearchBar />
      <div className={styles.tabWrapper}>
        <CategoryTab active={activeTab} onChange={setActiveTab} />
        <Link to={'/movies'}>
          <ViewAllButton />
        </Link>
      </div>
      {activeTab === 'showing' && (
        <Slider className={styles.movieCardSlider} items={showingMovies} numberItemsEachPage={4} />
      )}

      {activeTab === 'coming' && (
        <Slider className={styles.movieCardSlider} items={comingMovies} numberItemsEachPage={4} />
      )}
      <div className={styles.promotions}>
        <Tab>Promotions</Tab>
        <Link to={'/promotions'}>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            All promotions and discounts
          </button>
        </Link>
      </div>
      <Slider className={styles.movieCardSlider} items={promotionCards} numberItemsEachPage={3} />
    </div>
  );
};

export default Home;
