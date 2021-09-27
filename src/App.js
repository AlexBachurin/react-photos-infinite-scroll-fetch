import Navbar from "./components/Navbar";
import { FaSearch } from 'react-icons/fa'

function App() {
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
