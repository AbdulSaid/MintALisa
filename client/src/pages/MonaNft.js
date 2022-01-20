// import { axios } from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../index.css';

export default function MonaNft() {
  let { id } = useParams();
  const [ price, setPrice ] = useState('');
  const [ name, setName ] = useState('');
  const [ imgID, setImgID ] = useState('');
  const [ dna, setDna ] = useState('');

  const url = `http://localhost:8080/characters/${id}`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setPrice(Number(json[0].price).toFixed(4));
        setName(json[0].name)
        setImgID(json[0].image);
        setDna(json[0].dna);
        // console.log(json[0]);
        });
  }, [url]);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/characters/0412f9915477eee85b677f5ff83bdc6ed17fa1b8')
  // .then(response => {
  //   console.log(response.data);
  // }, error => {
  //   console.log(error);
  // });
  // }, []);

  return (
    <div className='single-mona'>
      <section className='top'>
        <i className='back-arrow'><FontAwesomeIcon icon={ faArrowLeft } /></i>
        <img className='single-mona-img' src={`${imgID}`} alt='' />
      </section>

      <section className='info'>
        <h3>{name}</h3>
        <p>{price}</p>
      </section>

      <button className='btn primary'>Buy</button>
    </div>
  );
}
