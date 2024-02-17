import { createContext, useCallback, useEffect, useReducer } from "react";

const BASE_URL = `https://my-json-server.typicode.com/subarnabsadhukhan/worldwise-react-project`;

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "FETCH_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "GET_CITY":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "ADD_CITY":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "DELETE_CITY":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "LOADING", payload: true });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "FETCH_CITIES", payload: data });
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        dispatch({ type: "LOADING", payload: false });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      try {
        dispatch({ type: "LOADING", payload: true });
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "GET_CITY", payload: data });
      } catch (error) {
        alert("There was an error loading the city...");
      } finally {
        dispatch({ type: "LOADING", payload: false });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: "LOADING", payload: true });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "ADD_CITY", payload: data });
    } catch (error) {
      alert("There was an error adding city...");
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "LOADING", payload: true });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_CITY", payload: id });
    } catch (error) {
      alert("There was an error deleting city...");
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
