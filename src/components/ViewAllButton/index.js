import styles from './ViewAllButton.module.scss';

const ViewAllButton = () => {
  const handleRouteChange = () => {
    window.scrollTo(0, 0);
  };
  return (
    <h2 className={styles.viewAllButton} onClick={handleRouteChange}>
      View All
    </h2>
  );
};

export default ViewAllButton;
