import styles from './Promotion.module.scss';
import PromotionPoster from '../../components/PromotionPoster';
import discount1 from '../../assets/happy day.png';
import discount2 from '../../assets/HAPPY HOUR.png';
import discount3 from '../../assets/u22_2.png';

const Promotion = () => {
  const promotions = [
    <PromotionPoster
      imgSource={discount1}
      title={'HAPPY MONDAY | FLAT 45K TICKETS'}
      short={'Every Monday, enjoy your favorite movies at CineBook for only 45,000 VND (2D tickets)!'}
      condition={'- 45,000 VND for 2D tickets.\n- 55,000 VND for 3D tickets.'}
      note={'- Not applicable on holidays, special screenings, or sneak previews with distributor surcharges'}
    />,
    <PromotionPoster
      imgSource={discount2}
      title={'HAPPY HOUR | BEFORE 10AM & AFTER 10PM – DISCOUNTED TICKETS FROM 45K'}
      short={'45K for early birds, 49K for night owls!'}
      condition={
        '- 45,000 VND (before 10:00 AM) and 49,000 VND (after 10:00 PM) for 2D tickets.\n- 55,000 VND (before 10:00 AM & after 10:00 PM) for 3D tickets.'
      }
      note={'- Tickets available at box office, app/website, or other platforms.\n- Not applicable on holidays.'}
    />,
    <PromotionPoster
      imgSource={discount3}
      title={'C’SCHOOL – MOVIE DEALS FROM ONLY 45K FOR STUDENTS, U22 & TEACHERS!'}
      short={'Special ticket prices from only 45K for students, youth under 22, and educators all week!'}
      condition={
        '- 45,000 VND (Mondays & before 10:00 AM) for 2D tickets.\n- 49,000 VND (all other showtimes) for 2D tickets.\n55,000 VND (before 10:00 AM & after 10:00 PM) for 3D tickets.'
      }
      note={
        '- Students: Must show school uniform or valid student ID (physical/digital).\n- Under 22: Must present ID (birth year 2003 or later).\n- Teachers: Must show teaching certificate, ID card, or valid proof.\n- Limit: One discounted ticket per person per showtime.\n- Booking: Students/Under 22 may book via CINEBOOK app/website.\n- Restrictions: Early/special screenings subject to distributor rules; not valid on holidays.'
      }
    />,
  ];
  return (
    <div className={styles.background}>
      <div className={styles.backgroundContainer}>
        <h1>PROMOTIONS</h1>
        {promotions.map((promotion) => promotion)}
      </div>
    </div>
  );
};

export default Promotion;
