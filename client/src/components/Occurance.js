import { React, useEffect, useRef, useState } from 'react'

export default function Occurance(props) {
  const [rarityStatus, setRarityStatus] = useState('');

  useEffect(() => checkRarity(occurancePercentage), [props]);

  const occurancePercentage = Number((props.occurance * 100) / 50).toFixed(0);

  const checkRarity = percent => {
    if (percent <= 14) {
      setRarityStatus('super-rare');
    } else if (percent >= 15 && percent <= 22) {
      setRarityStatus('rare');
    } else if (percent > 23) {
      setRarityStatus('common');
    }
  }


  return (
    <article className='rarity-container'>
      <aside className='left'>
        <img className='rarity-icon' src={`../images/${rarityStatus}.png`} alt={rarityStatus} />
        <div className="rarity-category">
          <h3 className='attribute'>{props.attribute}</h3>
          <p className='attribute-name'>{props.name}</p>
        </div>
      </aside>
      <p className='attribute-percent'>{occurancePercentage}%</p>
    </article>
  );
}
