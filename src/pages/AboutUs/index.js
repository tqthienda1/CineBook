import styles from "./AboutUs.module.scss"
import headerImg from "../../assets/cinema-interior-red-seats.png"
import ourStoryImg from "../../assets/modern-cinema-lobby.png"
import { TbUsers } from "react-icons/tb";
import { PiFilmReelBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { FiAward, FiFilm, FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

const AboutUs = () => {
    return (
        <div className={styles.background}>
            <div className={styles.headerContainer}>
                <img
                    src={headerImg}
                />
                <div className={styles.overlayText}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <h1>ABOUT</h1>
                        <h1 style={{ color: 'red' }}>CINEBOOK</h1>
                    </div>
                    <div>
                        <h2>Bringing you the ultimate cinematic experience.</h2>
                    </div>
                </div>
            </div>
            
            <div className={styles.ourStoryContainer}>
                <div>
                    <div style={{ color: 'white', display: 'flex', gap: '10px' }}>
                        <h1>Our</h1>
                        <h1 style={{ color: 'red' }}>Story</h1>
                    </div>
                    <div className={styles.ourStory}>
                        <h2>
                            CINEBOX was founded with a simple mission:
                            to create an extraordinary movie-watching experience that goes beyond just entertainment.
                            We believe that cinema is more than just watching a film – it's about creating memories,
                            sharing emotions, and bringing communities together.
                        </h2>
                        <h2>
                            Since our establishment in 2010,
                            we have been committed to providing state-of-the-art technology,
                            premium comfort, and exceptional service to movie lovers across the region.
                        </h2>
                    </div>
                    <button className={styles.button}>
                        Learn More
                    </button>
                </div>
                <div>
                    <img
                        src={ourStoryImg}
                    />
                </div>
            </div>
            
            <div className={styles.bar}>
                <div className={styles.barItem}>
                    <TbUsers className={styles.icon} />
                    <h1>2M+</h1>
                    <h2>Happy users</h2>
                </div>
                <div className={styles.barItem}>
                    <PiFilmReelBold className={styles.icon} />
                    <h1>15K+</h1>
                    <h2>Movie screened</h2>
                </div>
                <div className={styles.barItem}>
                    <IoLocationOutline className={styles.icon} />
                    <h1>2</h1>
                    <h2>Locations</h2>
                </div>
                <div className={styles.barItem}>
                    <FiAward className={styles.icon} />
                    <h1>50+</h1>
                    <h2>Awards won</h2>
                </div>
            </div>

            <div className={styles.missionVisionContainer}>
                <div className={styles.MVBox}>
                    <h1>Our Mission</h1>
                    <h2>To provide an unparalleled cinematic experience through cutting-edge technology,
                        exceptional service, and a passion for storytelling that
                        brings people together and creates lasting memories.
                    </h2>
                </div>
                <div className={styles.MVBox}>
                    <h1>Our Vision</h1>
                    <h2>To be the leading cinema chain that sets the standard for movie entertainment,
                        continuously innovating to exceed customer expectations and foster
                        a love for cinema in every community we serve.
                    </h2>
                </div>
            </div>

            <div className={styles.whyContainer}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <h1>Why Choose</h1>
                    <h1 style={{color: 'red'}}>CINEBOOK</h1>
                </div>
                <div className={styles.whyBar}>
                    <div className={styles.whyItem}>
                        <FiFilm className={styles.icon2} />
                        <h1>Premium Technology</h1>
                        <h2>State-of-the-art projection systems, Dolby Atmos sound,
                            and IMAX screens for the ultimate viewing experience.
                        </h2>
                    </div>
                    <div className={styles.whyItem}>
                        <TbUsers className={styles.icon2} />
                        <h1>Luxury Comfort</h1>
                        <h2>Spacious reclining seats, premium materials,
                            and climate-controlled environments for maximum comfort.
                        </h2>
                    </div>
                    <div className={styles.whyItem}>
                        <FiAward className={styles.icon2} />
                        <h1>Exceptional Service</h1>
                        <h2>Friendly staff, gourmet concessions,
                            and personalized service to make every visit memorable.
                        </h2>
                    </div>
                </div>
            </div>

            <div className={styles.getInTouch}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <h1>Get In</h1>
                    <h1 style={{color: 'red'}}>Touch</h1>
                </div>
                <div className={styles.getInTouchBar}>
                    <div className={styles.getInTouchItem}>
                        <IoLocationOutline className={styles.icon} />
                        <div>
                            <h2>Address</h2>
                            <h3>123 Cinema Street, Movie District</h3>
                        </div>
                    </div>
                    <div className={styles.getInTouchItem}>
                        <FiPhone className={styles.icon} />
                        <div>
                            <h2>Phone</h2>
                            <h3>+1(555) 123-4567</h3>
                        </div>
                    </div>
                    <div className={styles.getInTouchItem}>
                        <MdOutlineMailOutline className={styles.icon} />
                        <div>
                            <h2>Email</h2>
                            <h3>info@cinebox.com</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;
