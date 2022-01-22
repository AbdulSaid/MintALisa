import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  const [characters, setCharacters] = useState([]);
  // const [direction, setDirection] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/characters')
      .then(res => res.json())
      .then(chars => {
        setCharacters(chars);
      });
  }, []);

  const sortHandler = (val) => {
    const charactersSort = [...characters];
    if (val === 'price-up') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(firstEl.price) - parseFloat(secondEl.price)));
    } else if (val === 'price-down') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(secondEl.price) - parseFloat(firstEl.price)));
    }
  }



  return (
    <div className="gallery">
      <header className="header">
        <p>10/50 MINTED <img className='diamond' src='images/diamond.svg' alt='gem'/></p>
        <h1>Gallery</h1>
      </header>

      <section className='options-container'>
        <button
          className='filter-btn'
          onClick={(e) => {
            setFilterOpen(!filterOpen)
            e.stopPropagation();
            setSortOpen(false);
          }}><FontAwesomeIcon className='filter-icon' icon={ faFilter } /> Filter</button>

        {filterOpen &&
            <ul className='filter-list'>
              <li className='filter-option'>Available</li>
              <li className='filter-option'>Minted</li>
            </ul>
        }

        <button
          className='sort-btn'
          onClick={(e) => {
            e.stopPropagation();
            setSortOpen(!sortOpen);
            setFilterOpen(false);
          }}><FontAwesomeIcon className='sort-icon' icon={ faSort } /> Sort</button>

        {sortOpen &&
          <ul className='sort-list'>
            <li className='sort-option' onClick={() => sortHandler('price-up')}>Price: low to high</li>
            <li className='sort-option' onClick={() => sortHandler('price-down')}>Price: high to low</li>
            <li className='sort-option'>Rarity: high to low</li>
            <li className='sort-option'>Rarity: high to low</li>
          </ul>
        }
      </section>

      <section className='gallery-display-container'>
        {characters.map((char, index) => <SingleGalleryDisplay
          key={index}
          id={char.dna}
          imgUrl={char.image}
          name={char.name}
          price={char.price}
          />)}
      </section>
    </div>
  );
}
