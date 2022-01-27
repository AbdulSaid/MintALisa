import { useEffect, useState } from 'react'

export default function Occurance(props) {
  const [rarityStatus, setRarityStatus] = useState('');

  useEffect(() => checkRarity(occurancePercentage), [props]);

  const occurancePercentage = Number((props.occurance * 100) / 100).toFixed(0);

  const checkRarity = percent => {
    if (percent <= 14) {
      setRarityStatus('super-rare');
    } else if (percent >= 15 && percent <= 20) {
      setRarityStatus('rare');
    } else if (percent > 21) {
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
      <p className='attribute-percent'>{occurancePercentage}%</p>
    </article>
  );
}
