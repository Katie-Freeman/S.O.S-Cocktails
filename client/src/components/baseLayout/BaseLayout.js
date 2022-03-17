import Menu from "../Menu";
import styles from './baseLayout.module.css'
import Footer from "../Footer";

function BaseLayout(props) {
  return (
    <div className={styles.baseLayoutContainer}>
      <Menu />
      {props.children}
      <Footer/>
    </div>
  );
}

export default BaseLayout;
