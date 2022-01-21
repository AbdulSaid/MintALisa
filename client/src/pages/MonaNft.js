import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    Promise.all([axios.get(urlForCharacter), axios.get(urlForOccurence)]).then(
      (res) => {
        const api1 = res[0].data[0];
        setCharacter((prev) => ({ ...prev, dna: api1.dna }));
        setCharacter((prev) => ({ ...prev, description: api1.description }));
        setCharacter((prev) => ({
          ...prev,
          price: Number(api1.price).toFixed(4),
        }));
        setCharacter((prev) => ({ ...prev, name: api1.name }));
        setCharacter((prev) => ({ ...prev, imgId: api1.image }));

        const api2 = res[1].data;

        for (let mona of api2) {
          if (mona.dna === character.dna) {
            setCharacter((prev) => ({ ...prev, glasses: mona.glasses }));
            setCharacter((prev) => ({ ...prev, hat: mona.hat }));
            setCharacter((prev) => ({ ...prev, mouth: mona.mouth }));
            setCharacter((prev) => ({
              ...prev,
              accessories: mona.accessories,
            }));
            setCharacter((prev) => ({ ...prev, background: mona.background }));

            setOccurance((prev) => ({ ...prev, hat: mona.hat_occurance }));
            setOccurance((prev) => ({ ...prev, mouth: mona.mouth_occurance }));
            setOccurance((prev) => ({
              ...prev,
              background: mona.background_occurance,
            }));
            setOccurance((prev) => ({
              ...prev,
              glasses: mona.glasses_occurance,
            }));
            setOccurance((prev) => ({
              ...prev,
              accessories: mona.accessories_occurance,
            }));
          }
        }
      }
    );
  }, []);

  // useEffect(() => {
  //   fetch(urlForCharacter)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setCharacter(prev => ({...prev, dna: json[0].dna}));
  //       setCharacter(prev => ({...prev, description: json[0].description}));
  //       setCharacter(prev => ({...prev, price: Number(json[0].price).toFixed(4)}));
  //       setCharacter(prev => ({...prev, name: json[0].name}));
  //       setCharacter(prev => ({...prev, imgId: json[0].image}));
  //       console.log("chracter att 37",character)
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(urlForAttributes)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setCharacter(prev => ({...prev, glasses: json[0].glasses}));
  //       setCharacter(prev => ({...prev, hat: json[0].hat}));
  //       setCharacter(prev => ({...prev, mouth: json[0].mouth}));
  //       setCharacter(prev => ({...prev, accessories: json[0].accessories}));
  //       setCharacter(prev => ({...prev, background: json[0].background}));
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(urlForOccurence)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       for (let mona of json) {
  //         if (mona.dna === character.dna) {
  //           setOccurance(prev => ({...prev, hat: mona.hat_occurance}));
  //           setOccurance(prev => ({...prev, mouth: mona.mouth_occurance}));
  //           setOccurance(prev => ({...prev, background: mona.background_occurance}));
  //           setOccurance(prev => ({...prev, glasses: mona.glasses_occurance}));
  //           setOccurance(prev => ({...prev, accessories: mona.accessories_occurance}));
  //         }
  //       }
  //     });
  // }, []);

  const onMintPressed = async () => {
    const { status } = await mintNFT(
      character.imgId,
      character.name,
      character.description
    );
    console.log("What is Stsaatus", status);
    setStatus(status);
    changeMonaStatus();
  };

  const changeMonaStatus = () => {
    axios({
      method: "post",
      url: urlForCharacter,
      data: {
        minted: "true",
        quantity: "0",
      },
    })
      .then((json) => {
        console.log("Got it t0 work", json);
      });
  };

  // console.log("Occubrhgagnce", occurance.hat);

  return (
    <div className="single-mona">
      <section className="top">
        <Link to={"/gallery"}>
          <i className="back-arrow">
            <FontAwesomeIcon icon={faArrowLeft} />
          </i>
        </Link>
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
      <p id="status">
        {status}
      </p>
    </div>
  );
}
