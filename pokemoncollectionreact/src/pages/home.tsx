import React from "react";
import "../css/home.css";

const Home = () => {
    return(
        <div className="Home">
            <div className={"Body"}>
                <div className={"MainAdTextAndImageContainer"}>
                    <div className={"MainAdText"} style={{color:"black"}}>
                        <h3 style={{display: "inline"}} >Is your pokemon collection a mess? Stop waiting</h3>
                        <h3 style={{display: "inline"}}><br/>And fix it!</h3>
                        <div>

                        </div>
                        <div style={{color:"black"}}>
                            <h3> With our cutting edge program</h3>
                            <h3> You can now add all your cards</h3>
                            <h3> To your online collection in matter of seconds!*</h3>
                        </div>
                        <div style={{color:"black"}}>
                            <h3> Search for your card or set</h3>
                            <h3> Then with a few clicks add the card to your collection</h3>
                            <h3> See relevant info to your collection like prices and more</h3>
                        </div>
                    </div>
                </div>
                <div className={"footer"}>
                    <p style={{fontSize: 20, color:"white"}}>Disclaimer: Time is dependent on how many cards you want to add</p>
                </div>
            </div>
        </div>
    );
    }
export default Home;
