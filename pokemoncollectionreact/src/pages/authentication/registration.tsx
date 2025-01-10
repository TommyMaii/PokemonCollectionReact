import React from "react";
import "../../css/registration.css"
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import CustomModal from "../../components/modal";

function Registration (){
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const navigate = useNavigate();

    let responseCode = 0;

    const onSubmit = async (values: any) => {
        console.log(values);
        setError("");

        try{
            await axios.post("http://localhost:5112/register", {email, password}).then((response) => responseCode = response.status)
        }catch (err){
            if(err && err instanceof AxiosError) alert('Noe gikk galt, husk passord må være minst 6 bokstaver langt, inneholde minst 1 spesialtegn og 1 tall');
            else if(err && err instanceof Error) setError(err.message)

            console.log("Error: " + error);
        }

        if(responseCode == 200) {
            alert("Registering suksessfull, sender tilbake til login!")
            navigate("/");}

    }

    return (
            <div className={"Body"}>
                <div className="Register-Container">
                    <form className="Register-form">
                        <div>
                            <h3 style={{color:"white"}}>Registrer</h3>
                        </div>
                        <div>
                            <input type="text" name="name" placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <br/>
                        <CustomModal/>
                        <div>
                            <input type="text" name="name" placeholder={'Passord'} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <p></p>
                        <div onClick={onSubmit}>
                            Registrer
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Registration;