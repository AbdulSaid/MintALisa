import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleGalleryDisplay(props) {
  const { id, imgUrl, name, price } = props;

  return (
    <Link to={`/mona/${id}`}>
      <article className='single-container'>
        <img className='gallery-img' src={imgUrl} alt='' />

        <section className='gallery-info-container'>
        <p className='gallery-name'>{name.slice(9)}</p>
        <div className='gallery-price'><img src='images/ethereum-logo.png' alt='eth'/><p>{Number(price).toFixed(4)}</p></div>
        </section>
      </article>
    </Link>
  );
}
