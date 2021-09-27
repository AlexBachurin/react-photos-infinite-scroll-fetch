import Navbar from "./components/Navbar";
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from "react";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const photosUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos`
function App() {

  const [loading, setLoading] = useState(false)

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${photosUrl}${clientID}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPhotos()

  }, [])
  return (
    <>
      <Navbar />
      <main>
        <section className="search">
          <form className="search-form">
            <input type="text" placeholder="search" className="form-input" value />
            <button type="submit" className="submit-btn">
              <FaSearch />
            </button>
          </form>
        </section>
        <section className="photos">
          <div className="photos-center">
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
