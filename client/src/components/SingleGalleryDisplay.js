import React from 'react';
import { Link } from 'react-router-dom'

export default function SingleGalleryDisplay(props) {
  const { id, imgUrl, name, price } = props;

  return (
    <>
    <Link to={`/mona/${id}`} >
      <div className='single-gallery-display'>
        <img className='gal-img' src={imgUrl} alt='' />
        <p className='name'>{name}</p>
        <p className='price'>{price}</p>
      </div>
    </Link>
    </>
  );
}
