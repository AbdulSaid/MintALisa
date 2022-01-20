// import { axios } from 'axios'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../utils/interact";
import "../index.css";
import Occurance from "../components/Occurance";

export default function MonaNft() {
  let { id } = useParams();
  const [status, setStatus] = useState("");

  const [character, setCharacter] = useState({});
  const [occurance, setOccurance] = useState({});


  const urlForCharacter = `http://localhost:8080/characters/${id}`;
  const urlForAttributes = `http://localhost:8080/characters/attributes/${id}`;
  const urlForOccurence = `http://localhost:8080/characters/attributes/occurrence`;

  useEffect(() => {
    fetch(urlForCharacter)
      .then((res) => res.json())
      .then((json) => {
        setCharacter(prev => ({...prev, dna: json[0].dna}));
        setCharacter(prev => ({...prev, description: json[0].description}));
        setCharacter(prev => ({...prev, price: Number(json[0].price).toFixed(4)}));
        setCharacter(prev => ({...prev, name: json[0].name}));
        setCharacter(prev => ({...prev, imgId: json[0].image}));
        console.log("chracter att 37",character)
      });
  }, []);

  useEffect(() => {
    fetch(urlForAttributes)
      .then((res) => res.json())
      .then((json) => {
        setCharacter(prev => ({...prev, glasses: json[0].glasses}));
        setCharacter(prev => ({...prev, hat: json[0].hat}));
        setCharacter(prev => ({...prev, mouth: json[0].mouth}));
        setCharacter(prev => ({...prev, accessories: json[0].accessories}));
        setCharacter(prev => ({...prev, background: json[0].background}));
      });
  }, []);

  useEffect(() => {
    fetch(urlForOccurence)
      .then((res) => res.json())
      .then((json) => {
        for (let mona of json) {
          if (mona.dna === character.dna) {
            setOccurance(prev => ({...prev, hat: mona.hat_occurance}));
            setOccurance(prev => ({...prev, mouth: mona.mouth_occurance}));
            setOccurance(prev => ({...prev, background: mona.background_occurance}));
            setOccurance(prev => ({...prev, glasses: mona.glasses_occurance}));
            setOccurance(prev => ({...prev, accessories: mona.accessories_occurance}));
          }
        }
      });
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/characters/0412f9915477eee85b677f5ff83bdc6ed17fa1b8')
  // .then(response => {
  //   console.log(response.data);
  // }, error => {
  //   console.log(error);
  // });
  // }, []);

  const onMintPressed = async () => {
    const { status } = await mintNFT(
      character.imgId,
      character.name,
      character.description
    );
    console.log("What is Status", status);
    setStatus(status);
    changeMonaStatus();
  };

  const changeMonaStatus = () => {
    fetch(urlForCharacter, {
      method: "POST",
      body: JSON.stringify({
        minted: "true",
        quantity: "0",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Got it to work", json);
      });
  };

  console.log("Occujhbjbjkjjhrance", occurance.hat);

  return (
    <div className="single-mona">
      <section className="top">
        <i className="back-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </i>
        <img
          className="single-mona-img"
          src={`${character.imgId}`}
          alt={`${character.name}`}
        />
      </section>

      <section className="info">
        <h3>{character.name}</h3>
        <p>{character.price}</p>
      </section>

      <section>
        <Occurance
          attribute="Hat"
          name={character.hat}
          occurance={occurance.hat}
        />
        <Occurance
          attribute="Mouth"
          name={character.mouth}
          occurance={occurance.mouth}
        />
        <Occurance
          attribute="Background"
          name={character.background}
          occurance={occurance.background}
        />
        <Occurance
          attribute="Glasses"
          name={character.glasses}
          occurance={occurance.glasses}
        />
        <Occurance
          attribute="Accessories"
          name={character.accessories}
          occurance={occurance.accessories}
        />
      </section>
      <button className="btn primary" onClick={onMintPressed}>
        Buy
      </button>
    </div>
  );
}
