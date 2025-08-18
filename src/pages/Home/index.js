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
import poster1 from '../../assets/f1_poster.jpg';
import promotion1 from '../../assets/banner 1.png';
import promotion2 from '../../assets/banner 2.jpg';
import discount1 from '../../assets/happy day.png';
import discount2 from '../../assets/HAPPY HOUR.png';
import discount3 from '../../assets/u22_2.png';
import Tab from '../../components/Tab';

const Home = () => {
  const banners = [
    <Banner movieName="jurassic world rebirth" imgSource={banner1} />,
    <Banner movieName="lilo & stitch" imgSource={banner2} />,
    <Banner movieName="Demon Slayer: Infinity Castle" imgSource={banner3} />,
  ];

  const movieCards = [
    <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F2 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F3 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F4 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F5 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F6 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F7 The Movie'} imgSource={poster1} />,
    <MovieCard movieName={'F8 The Movie'} imgSource={poster1} />,
  ];

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
        <CategoryTab />
        <ViewAllButton />
      </div>
      <Slider className={styles.movieCardSlider} items={movieCards} numberItemsEachPage={4} />
      <div className={styles.promotions}>
        <Tab>Promotions</Tab>
        <button>All promotions and discounts</button>
      </div>
      <Slider className={styles.movieCardSlider} items={promotionCards} numberItemsEachPage={3} />
    </div>
  );
};

export default Home;
