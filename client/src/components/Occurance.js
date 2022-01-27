import { useEffect, useState } from 'react'

export default function Occurance(props) {
  const [rarityStatus, setRarityStatus] = useState('');

  useEffect(() => checkRarity(props.occurance), [props]);
  const checkRarity = percent => {
    if (percent <= 12) {
      setRarityStatus('super-rare');
    } else if (percent >= 13 && percent <= 19) {
      setRarityStatus('rare');
    } else if (percent > 19) {
      setRarityStatus('common');
    }
  }


  return (
    <article className='rarity-container'>
      <aside className='left'>
        <img className={`rarity-icon ${rarityStatus}`} src={`../images/${rarityStatus}.svg`} alt={rarityStatus} />
        <div className={`rarity-category ${rarityStatus}`}>
          <h3 className='attribute'>{props.attribute}</h3>
          <p className='attribute-name'>{props.name}</p>
        </div>
      </aside>
      <p className='attribute-percent'>{props.occurance}%</p>
    </article>
  );
}
