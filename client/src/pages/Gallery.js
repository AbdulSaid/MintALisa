import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  const [characters, setCharacters] = useState([]);
  const [occurance, setOccurance] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minted, setMinted] = useState([]);
  const [available, setAvailable] = useState([]);


  const urlForCharacters = `http://localhost:8080/characters/`;
  const urlForOccurence = `http://localhost:8080/characters/attributes/occurrence/`;

  useEffect(() => {
    Promise.all([axios.get(urlForCharacters), axios.get(urlForOccurence)]).then(
      (res) => {
        const api1 = res[0].data;
        const api2 = res[1].data;
        setCharacters(api1);
        setOccurance(api2);
      },
    );
  }, []);

  const countMintedLisas = () => {
    const unavailable = [];
    const availableTemp = [];
    for (let val of characters) {
      (val.minted) ? unavailable.push(val) : available.push(val);
    }
    setMinted(unavailable);
    setAvailable(availableTemp);
    console.log('minted:', minted)
    console.log('available: ', available)
    console.log('characters: ', characters)
  }

  const sortHandler = val => {
    const charactersSort = [...characters];
    const sortedOccurence = [...occurance];

    if (val === 'price-up') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(firstEl.price) - parseFloat(secondEl.price)));
    } else if (val === 'price-down') {
      return setCharacters(charactersSort.sort((firstEl, secondEl) => parseFloat(secondEl.price) - parseFloat(firstEl.price)));
    } else if (val === 'rarity-up') {
      // COME BACK TO THIS
      const tempOccur = sortedOccurence.sort((firstEl, secondEl) => {
        let sumFirstEl = firstEl.hat_occurance + firstEl.mouth_occurance + firstEl.background_occurance + firstEl.glasses_occurance + firstEl.accessories_occurance;
        let sumSecondEl = secondEl.hat_occurance + secondEl.mouth_occurance + secondEl.background_occurance + secondEl.glasses_occurance + secondEl.accessories_occurance;
        return parseFloat(sumSecondEl) - parseFloat(sumFirstEl);
      });
    } else if (val === 'rarity-down') {
      setOccurance(sortedOccurence.sort((firstEl, secondEl) => {
        let sumFirstEl = firstEl.hat_occurance + firstEl.mouth_occurance + firstEl.background_occurance + firstEl.glasses_occurance + firstEl.accessories_occurance;
        let sumSecondEl = secondEl.hat_occurance + secondEl.mouth_occurance + secondEl.background_occurance + secondEl.glasses_occurance + secondEl.accessories_occurance;
        return parseFloat(sumFirstEl) - parseFloat(sumSecondEl);
      }));
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
    if (val === 'available') {
      return setCharacters(available);
    } else if (val === 'unavailable') {
      return setCharacters(minted);
    }
  }


  return (
    <div className="gallery">
      <header className="header">
        <p>{minted.length}/50 MINTED <img className='diamond' src='images/diamond.svg' alt='gem' /></p>
        <h1>Gallery</h1>
      </header>

      <section className='options-container'>
        <button
          className='filter-btn'
          onClick={(e) => {
            setFilterOpen(!filterOpen)
            e.stopPropagation();
            setSortOpen(false);
          }}><FontAwesomeIcon className='filter-icon' icon={faFilter} /> Filter</button>

        {filterOpen &&
          <ul className='filter-list'>
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
            <li className='sort-option' onClick={() => sortHandler('rarity-up')}>Rarity: low to high</li>
            <li className='sort-option' onClick={() => sortHandler('rarity-down')}>Rarity: high to low</li>
          </ul>
        }
      </section>

      <section className='gallery-display-container'>
        {characters && characters.map((char, index) => <SingleGalleryDisplay
          key={index}
          id={char.dna}
          imgUrl={char.image}
          name={char.name}
          price={char.price}
          minted={char.minted}
        />)}
      </section>
      <section className='none-minted-container'>
        {characters.length === 0 && <h2 className='none-minted-msg'>All Mona Lisas are available!</h2>}
      </section>
    </div>
  );
}
