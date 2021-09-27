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
  //state for page, we will change then we hit bottom of page
  const [page, setPage] = useState(1);
  //fetch data
  const fetchPhotos = async () => {
    setLoading(true)
    //url for page
    const pageUrl = `&page=${page}`
    const url = `${photosUrl}${clientID}${pageUrl}`
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos(photos => {
        return [...photos, ...data]
      });
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    console.log('page change fetch');
    console.log(page)
    fetchPhotos()
  }, [page])

  //listening for scroll event
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      //scroll logic, checking if we reached bottom of the page
      //also only fetch if we are not loading data atm
      if (!loading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        //then we reached bottom of page, change page to next
        setPage(page => {
          return page + 1
        })
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
        {loading ? <h3 className="loading">Loading...</h3> : null}
      </main>
    </>
  );
}

export default App;
