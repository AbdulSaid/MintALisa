import { useEffect } from 'react';
import SingleGalleryDisplay from "../components/SingleGalleryDisplay";

export default function Gallery() {
  useEffect(() => {
    fetch('http://localhost:8080/characters')
      .then(res => res.json())
      .then(json => console.log(json));
  }, []);
  

  return (
    <div className="gallery">
      <header className="header">
      <h1>GALLERY</h1>
      <p>1/50 Minted Lisas</p>
      </header>

      <section>
        <SingleGalleryDisplay />
      </section>
    </div>
  );
}
