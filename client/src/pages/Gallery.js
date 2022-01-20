import { useState, useEffect } from 'react';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  const [characters, setCharacters] = useState([]);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/characters')
      .then(res => res.json())
      .then(chars => {
        setCharacters(chars);
      });
  }, []);

  useEffect(() => {
    setCharacters(characters.sort(sortHandler));
  }, [characters, direction])

  const sortByPrice = (dir) => {
    setDirection(dir);
  }

  const sortHandler = (a, b) => {
    if (direction === 'incr') {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return parseFloat(a.price) - parseFloat(b.price);
  }

  return (
    <div className="gallery">
      <header className="header">
        <h1>GALLERY</h1>
        <p>1/50 Minted Lisas</p>
      </header>

      <button onClick={() => sortByPrice('incr')}>Sort low to high</button>
      <button onClick={() => sortByPrice('decr')}>Sort high to low</button>

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


// const getRarity = () => {
  //   fetch('http://localhost:8080/characters/attributes/occurrence')
  //     .then(res => res.json())
  //     .then(json => {
  //       // console.log(json);
  //       const occurences = [];
  //       json.forEach(val => {
  //         let occurSum = val.accessories_occurance + val.background_occurance + val.glasses_occurance + val.hat_occurance + val.mouth_occurance;
  //         occurences.push(occurSum);
  //       });
  //       console.log(occurences.sort().reverse())
  //     });
  // }



