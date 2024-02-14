import { countryCodeToFlag } from "../helper";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{countryCodeToFlag(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
