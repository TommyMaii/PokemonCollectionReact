import React from "react";
import '../../css/login.css'
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import { useAuth } from "../../state/authContext"

function getEmail(data:string){
    let removedFirstPartOfData = data.substring(10);
    let findIndex = removedFirstPartOfData.indexOf('"');
    return removedFirstPartOfData.substring(0,findIndex);
}

function getAccessToken(object:any){
    let objectData = JSON.stringify(object.data)
    let responseResult = JSON.parse(objectData);
    let key = Object.keys(responseResult)[1];
    return responseResult[key];
}

const LoginForm = () => {
    const loginUser = useAuth();
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    let responseCode: any;
    const navigate = useNavigate();

    const onSubmit = async (values: any) => {
        setError("");

        try{
            await axios.post("http://localhost:5112/login", {email, password}).then((response) => responseCode = response);
        }catch (err){
            if(err && err instanceof AxiosError) alert('Bruker eksisterer ikke');
            else if(err && err instanceof Error) setError(err.message);

            console.log("Error: " + error);
        }
        if(responseCode.status === 200){
            console.log(getEmail(responseCode.config.data));
            loginUser.loginUser(getAccessToken(responseCode))

            alert("Log inn suksessfull");
            navigate("/home");}
        }
    return(
    <div className={"Body"}>
        <div className="Login-Container">
            <form className="Login-form">
                <div>
                    <h3 style={{color:"white"}}>Logg inn</h3>
                </div>
                <div>
                    <input type="text" name="name" placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br/>
                <div>
                    <input type="password" name="name" placeholder={'Passord'} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p></p>
                <div onClick={onSubmit}>Logg inn</div>
                <p >Ingen bruker? <li style={{display:"inline"}}><Link to={'/registration'}>Registrer her</Link></li></p>
            </form>
        </div>
    </div>
    )
}

export default LoginForm;