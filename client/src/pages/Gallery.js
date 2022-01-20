import { useState, useEffect } from 'react';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  const [ characters, setCharacters ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/characters')
      .then(res => res.json())
      .then(chars => {
        setCharacters(chars);
      });
  }, []);

  let char = characters.map(char => {
    return (
      <SingleGalleryDisplay
        key={char.dna}
        imgUrl={char.image}
        name={char.name}
        price={char.price}
      />
    );
  })

  return (
    <div className="gallery">
      <header className="header">
      <h1>GALLERY</h1>
      <p>1/50 Minted Lisas</p>
      </header>

      <section className='gallery-display-container'>
        {char}
      </section>
    </div>
  );
}
