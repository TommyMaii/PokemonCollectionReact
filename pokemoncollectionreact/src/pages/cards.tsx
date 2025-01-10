import React, { useEffect, useState} from "react";
import { getAuthState } from "../state/authState"
import '../css/cards.css'
import Pagination from "../components/pagination";
import axios from "axios";

interface Card {
    id: number;
    cardName: string;
    smallCardUrl: string;
    largeCardUrl: string;
}

function Cards() {
    const [error, setError] = useState();
    const [cards, setCards] = React.useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(14);
    const [userId, setUserId] = useState<string>();
    const handlePagination = (pageNumber:any) => {

        setCurrentPage(pageNumber);

    };

    const AddToCollection = (card:any) => {
        try{
        axios.post(`http://localhost:5112/api/PokemonCardCollection?collectionId=${userId}&cardId=${card.id}`).then((response) => {
            console.log(response.data);
        })}
        catch(error){
        }
    }

    const test = async () => {
        try{
            fetch("http://localhost:5112/api/Auth", {
                method: 'GET',
                headers: new Headers({Authorization: 'Bearer ' + getAuthState()}),
            }).then((response) =>  response)
                .then((data) => console.log(data))
        } catch (error){
                console.log("Error: " + error);
            }

    }

    useEffect(() => {
        const FetchCards = async () => {
            try {
                fetch('http://localhost:5112/api/PokemonCard', {
                    method: 'GET',
                    headers: new Headers({Authorization: 'Bearer ' + getAuthState()}),
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

            <button onClick={test}>

            </button>

        </div>
    )
}

export default Cards;