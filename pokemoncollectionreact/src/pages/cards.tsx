import React, { useEffect, useState} from "react";
import { getAuthState } from "../state/authState"
import '../css/cards.css'
import Pagination from "../components/pagination";
import axios from "axios";
import {getUserState, setUserState} from "../state/userState";

interface Card {
    id: number;
    cardName: string;
    smallCardUrl: string;
    largeCardUrl: string;
}

async function GetCardCollections()  {
    try{
        fetch(`http://localhost:5112/api/PokemonCollection?userId=${getUserState()}`, {
            method: 'GET',
            headers: new Headers({
                Accept: "application/json",
                Authorization: 'Bearer ' + getAuthState()}),
        }).then((response) =>  response.text())
            .then((response) => console.log(response));
    } catch (error){
        console.log("Error: " + error);
    }
}

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

    const handlePagination = (pageNumber:any) => {

        setCurrentPage(pageNumber);

    };

    const AddToCollection = (card:any) => {
        try{
        axios.post(`http://localhost:5112/api/PokemonCardCollection?collectionId=1&cardId=${card.cardId}`).then((response) => {
            console.log(card);
        })
            console.log(card.cardId)
        }
        catch(error){
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
        FetchCards();
    }, [])

    if (error) {
        return <div>{error}</div>;
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <div>
            <div id="cardBody">
                    {currentCards.map((card,index) => {
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

            <button onClick={GetCardCollections}>
                Get Collections
            </button>
            <button onClick={CreateCardCollection}>
                Create Collection
            </button>
        </div>
    )
}

export default Cards;