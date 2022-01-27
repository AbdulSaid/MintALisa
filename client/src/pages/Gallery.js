import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  const [characters, setCharacters] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minted, setMinted] = useState([]);
  const [available, setAvailable] = useState([]);


  const urlForCharacters = `http://localhost:8080/characters/`;


  useEffect(() => {
    Promise.all([axios.get(urlForCharacters)]).then(
      (res) => {
        const api1 = res[0].data;
        const unavailable = [];
        const availableTemp = [];
        setCharacters(api1);

        for (let val of api1) {
          (val.minted) ? unavailable.push(val) : available.push(val);
        }
        setAvailable(availableTemp);
        setMinted(unavailable);
      },
    );
  }, []);


  const sortHandler = val => {
    const charactersSort = [...characters];
    setSortOpen(false);
    if (val === 'price-up') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(firstEl.price) - parseFloat(secondEl.price)));
    } else if (val === 'price-down') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(secondEl.price) - parseFloat(firstEl.price)));
    }
  }

  const filterHandler = val => {
    const unavailable = [];
    const availableTemp = [];
    fetch('http://localhost:8080/characters/')
      .then(res => res.json())
      .then(json => {
        for (let val of json) {
          (val.minted) ? unavailable.push(val) : available.push(val);
        }
        setAvailable(availableTemp);
        setMinted(unavailable);
      });
    setFilterOpen(false);
    if (val === 'available') {
      return setCharacters(available);
    } else if (val === 'unavailable') {
      return setCharacters(minted);
    }
  }

  

  return (
    <div className="gallery">
      <header className="header">
        <h1>Gallery</h1>
      </header>

      <section className='options-container'>
        <aside className='left'>
        <p>{minted.length}/100 MINTED <img className='diamond' src='images/diamond.svg' alt='diamond' /></p>
        </aside>

        <aside className='right'>

        <button
          className='filter-btn'
          onClick={(e) => {
            setFilterOpen(!filterOpen)
            e.stopPropagation();
            setSortOpen(false);
          }}><FontAwesomeIcon className='filter-icon' icon={faFilter} /> Filter</button>

        {filterOpen &&
          <ul className='filter-list'>
            {/* <li className='filter-option' onClick={() => filterHandler('all')}>All</li> */}
            <li className='filter-option' onClick={() => filterHandler('available')}>Available</li>
            <li className='filter-option' onClick={() => filterHandler('unavailable')}>Minted</li>
          </ul>
        }

        <button
          className='sort-btn'
          onClick={(e) => {
            e.stopPropagation();
            setSortOpen(!sortOpen);
            setFilterOpen(false);
          }}><FontAwesomeIcon className='sort-icon' icon={faSort} /> Sort</button>

        {sortOpen &&
          <ul className='sort-list'>
            <li className='sort-option' onClick={() => sortHandler('price-up')}>Price: low to high</li>
            <li className='sort-option' onClick={() => sortHandler('price-down')}>Price: high to low</li>
          </ul>
        }
        </aside>
      </section>

      <section className='gallery-display-container'>
        {characters && characters.map((char, index) => <SingleGalleryDisplay
          key={index}
          id={char.dna}
          imgUrl={char.local_image}
          name={char.name}
          price={char.price}
          minted={char.minted}
        />)}
      </section>
    </div>
  );
}
