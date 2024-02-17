import { useParams } from "react-router-dom";
import { countryCodeToFlag } from "../helper";
import styles from "./City.module.css";
import { useCities } from "../hooks/useCitiesContext";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

  useEffect(() => {
    getCity(id);
    setIsLoadingSpinner(false);
  }, [getCity, id]);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading || isLoadingSpinner) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji && countryCodeToFlag(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton>&larr; Back</BackButton>
      </div>
    </div>
  );
}

export default City;
