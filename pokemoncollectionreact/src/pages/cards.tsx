import React, { useEffect, useState} from "react";
import { getAuthState } from "../state/authState"
import '../css/cards.css'
import Pagination from "../components/pagination";
import axios from "axios";
import {getCollectionState, getUserState, setCollectionState, setUserState} from "../state/userState";
import Modal from "react-modal";

interface Card {
    cardId: number;
    cardName: string;
    smallCardUrl: string;
    largeCardUrl: string;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

async function CreateCardCollection()  {
    try{
        fetch(`http://localhost:5112/api/PokemonCollection?userId=${getUserState()}`, {
            method: 'POST',
            headers: new Headers({
                Accept: "application/json",
                Authorization: 'Bearer ' + getAuthState()}),
        }).then((response) =>  response.text())
            .then((response) => console.log(response));
    } catch (error){
        console.log("Error: " + error);
    }
}



function Cards() {
    const [error, setError] = useState();
    const [cards, setCards] = React.useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(14);
    const [tempData, setTempData] = useState<string>();
    const [collectionIds, setCollectionIds] = useState<string[]>();
    // const [collectionId, setCollectionId] = useState<string>();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let collectionId = "null";

    const handlePagination = (pageNumber:any) => {

        setCurrentPage(pageNumber);

    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function setCID(id:any){
        collectionId = id;
        closeModal();
    }

    //UNDEFINED OG DELAY PÅ COLLECTIONID
    //Endre på addtocollection so den velger collection id og gjør post request i samme slengen
    const AddToCollection = (card:any) => {
        try{
            if(collectionIds == null){return}
            if(collectionIds?.length > 1){
                openModal();
            }
            if(collectionId != "null"){
                console.log(collectionId)
                axios.post(`http://localhost:5112/api/PokemonCardCollection?collectionId=${collectionId}&cardId=${card.cardId}`).then((response) => {
                    console.log(response);
                })
            }
        }catch(error){
            return error;
        }
    }

    useEffect(() => {
        const FetchCards = async () => {
            try {
                fetch('http://localhost:5112/api/PokemonCard', {
                    method: 'GET',
                    headers: new Headers({
                        Accept: "application/json",
                        Authorization: 'Bearer ' + getAuthState()}),
                })
                    .then((response) => response.json())
                    .then((data) => setCards(data));
            } catch (e: any) {
                setError(e);
                alert("Feil med autorisering! Vennligst logg inn igjen.")
            }

        }

            const GetCardCollections = () => {
                const regexOpenBracket = /\[/g;
                const regexCloseBracket = /]/g;
                try {
                    fetch(`http://localhost:5112/api/PokemonCollection?userId=${getUserState()}`, {
                        method: 'GET',
                        headers: new Headers({
                            Accept: "application/json",
                            Authorization: 'Bearer ' + getAuthState()}),
                    }).then((response) =>  response.text())
                        .then((response) => response.replace(regexOpenBracket, "").replace(regexCloseBracket, "").split(",")).
                    then((response) => setCollectionIds(response));
                } catch (error){
                    console.log("Error: " + error);
                }
            }
            FetchCards();
            GetCardCollections();
        },

        [])

    if (error) {
        return <div>{error}</div>;
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    return (


    <div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Choose Your Collection"
            style={customStyles}
        >
            <div>
                <h1>
                    You own multiple collections choose which collection you want to add the card to.
                </h1>
                {collectionIds?.map((collectionid, index) => {
                    return <div>
                        <button onClick={() => setCID(collectionid)} style={{width:100,height:30, marginTop:40}}>Collection {collectionid}</button>
                    </div>
                })}
            </div>
            <button onClick={closeModal} style={{width:100,height:30, marginTop:40}}>close</button>
        </Modal>

        <div id="cardBody">
            {currentCards.map((card, index) => {
                return <div>
                    <li key={index} id="ItemBody" onClick={() => AddToCollection(card)}>
                        <p><span style={{whiteSpace: "nowrap"}}>{card.cardName}</span></p>
                                 <img src={card.smallCardUrl}/></li>
                                </div>

                        // <li key={card.id} style={{listStyle: "none"}}>{card.cardName}
                        //     <img src={card.smallCardUrl}/></li>
                    })}
            </div>
            <Pagination

                length={cards.length}

                postsPerPage={cardsPerPage}

                handlePagination={handlePagination}

            />

            <button onClick={CreateCardCollection}>
                Create Collection
            </button>
        </div>
    )
}

export default Cards;