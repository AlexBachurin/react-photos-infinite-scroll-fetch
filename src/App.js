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
  const [page, setPage] = useState(0);
  //state for searchTerm
  const [term, setTerm] = useState('');
  //fetch data
  const fetchPhotos = async () => {
    setLoading(true)
    //url for search
    const termUrl = `&query=${term}`
    //url for page
    const pageUrl = `&page=${page}`
    //main url
    let mainUrl = ``
    //check if we have term, we fetch using search url, else we do normal fetch
    if (term) {
      mainUrl = `${searchUrl}${clientID}${pageUrl}${termUrl}`
    } else {
      mainUrl = `${photosUrl}${clientID}${pageUrl}`
    }

    try {
      const res = await fetch(mainUrl);
      const data = await res.json();
      setPhotos(photos => {
        //change here aswell bcz we get different data if we using search 
        //also check if we on page 1 then we clear old photos
        if (term && page === 1) {
          return [...data.results]
        }
        else if (term) {
          const searchRes = data.results;
          return [...photos, ...searchRes]
        } else {
          return [...photos, ...data]
        }
      });
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPhotos()
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [])

  //SEARCH
  //change term on input changes
  const handleTerm = (e) => {
    setTerm(e.target.value)
  }

  //
  const handleSearch = (e) => {
    e.preventDefault();
    //set page to 1 on submit
    setPage(1)
    fetchPhotos();
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="search">
          <form className="search-form">
            <input onChange={handleTerm} type="text" placeholder="search" className="form-input" value={term} />
            <button onClick={handleSearch} type="submit" className="submit-btn">
              <FaSearch />
            </button>
          </form>
        </section>
        <section className="photos">
          <div className="photos-center">
            {photos.map((item, index) => {
              return <Photo key={index} {...item} />
            })}
          </div>
        </section>
        {loading ? <h3 className="loading">Loading...</h3> : null}
      </main>
    </>
  );
}

export default App;
