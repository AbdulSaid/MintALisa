import { useNavigate } from 'react-router-dom';

export default function SingleGalleryDisplay(props) {
  const navigate = useNavigate();
  const { id, imgUrl, name, price } = props;

  return (
    <article className='single-container' onClick={() => navigate(`/mona/${id}`)}>
      <img className='gallery-img' src={`..${imgUrl.slice(7)}`} alt='' />
      <section className='gallery-info-container'>
        {!props.minted && <p className='gallery-name'>{name.slice(9)}</p>}
        {props.minted && <p className='gallery-name minted-gallery'>{name.slice(9)}</p>}
        <div className='gallery-price'>
          {!props.minted &&
            <>
              <img className='eth-logo' src='images/ethereum-logo.svg' alt='eth' />
              <p>{Number(price).toFixed(4)}</p>
            </>}
          {props.minted && <p className='minted-gallery'>MINTED</p>}
        </div>
      </section>
    </article>
  );
}
