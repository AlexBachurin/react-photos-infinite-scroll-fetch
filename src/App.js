import Navbar from "./components/Navbar";
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from "react";
import Photo from "./components/Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const photosUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos`
function App() {

  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])

  //fetch data
  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${photosUrl}${clientID}`);
      const data = await res.json();
      console.log(data);
      setPhotos(data);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPhotos()
  }, [])

  //listening for scroll event
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      //scroll logic, checking if we reached bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log('bigger')
      }
    })

    return () => {
      window.removeEventListener('scroll', event)
    }
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
            {photos.map(item => {
              return <Photo key={item.id} {...item} />
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
