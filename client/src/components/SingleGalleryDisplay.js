import React from 'react';

export default function SingleGalleryDisplay(props) {
  const { name, price } = props;

  return (
    <>
      <div className='single-gallery-display'>
        <img className='gal-img' src={props.imgUrl} alt='' />
        <p className='name'>{name}</p>
        <p className='price'>{price}</p>
      </div>
    </>
  );
}
