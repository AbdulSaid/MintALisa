import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import Occurance from "../components/Occurance";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../utils/interact";

export default function MonaNft() {
  let { id } = useParams();
  const [status, setStatus] = useState("");

  const [character, setCharacter] = useState({});
  const [occurance, setOccurance] = useState({});

  const urlForCharacter = `http://localhost:8080/characters/${id}`;
  const urlForOccurence = `http://localhost:8080/characters/attributes/occurrence/${id}`;

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

        const api2 = res[1].data[0];
        console.log('api2',api2)
        setCharacter((prev) => ({ ...prev, glasses: api2.glasses }));
        setCharacter((prev) => ({ ...prev, hat: api2.hat }));
        setCharacter((prev) => ({ ...prev, mouth: api2.mouth }));
        setCharacter((prev) => ({
          ...prev,
          accessories: api2.accessories,
        }));
        setCharacter((prev) => ({ ...prev, background: api2.background }));

        setOccurance((prev) => ({ ...prev, hat: api2.hat_occurance }));
        setOccurance((prev) => ({ ...prev, mouth: api2.mouth_occurance }));
        setOccurance((prev) => ({
          ...prev,
          background: api2.background_occurance,
        }));
        setOccurance((prev) => ({
          ...prev,
          glasses: api2.glasses_occurance,
        }));
        setOccurance((prev) => ({
          ...prev,
          accessories: api2.accessories_occurance,
        }));
      }
    );
  }, []);

  const onMintPressed = async () => {
    const { status } = await mintNFT(
      character.imgId,
      character.name,
      character.description
    );
    console.log("Status", status);
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
    }).then((json) => {
      console.log("Got it t0 work", json);
    });
  };

  return (
    <div className="single-mona">
      <section className="top">
        <Link to={"/gallery"} className="back-arrow">
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <img
          className="single-mona-img"
          src={`${character.imgId}`}
          alt=''
        />
        <h3 className="single-mona-name">{character.name}</h3>
      </section>

      <section className="rarity-view-container">
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

      <section className="buy-container">
        <aside className="single-price">
          <img className="eth-logo" src='../images/ethereum-logo.png' alt='eth'/>
          <p>{character.price}</p>
        </aside>
        <button className="btn primary buy" onClick={onMintPressed}>Buy</button>
      </section>
      {/* <p id="status">{status}</p> */}
    </div>
  );
}
