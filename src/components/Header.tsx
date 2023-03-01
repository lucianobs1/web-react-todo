import logoImg from '../assets/rocket.svg';

import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.container}>
      <img src={logoImg} alt="rocket logo" />
      <div className={styles.description}>
        <p>
          to<span>do</span>
        </p>
      </div>
    </header>
  );
}
