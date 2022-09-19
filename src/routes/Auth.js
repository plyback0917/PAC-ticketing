import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authService, firebaseInstance } from "../myBase";
import { GoogleAuthProvider } from "firebase/auth";



const Auth = () =>{
    //initializes the constants that are going to be used in the code.
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccout, setNewAccount] = useState(true);
    const [error, setError] = useState("");
// setting the function onChange in order to grab the value that is written.
    const onChange = (event) => {
        const{target:{name,value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if( name === "password"){
        setPassword (value);
        }
    }

    //function called when submit button is pressed, such that it logs in when the account is already made or signs up the account when the account is new.
    const onSubmit = async(event) => {
        event.preventDefault();    
        try{
            let data;
            if(newAccout){
               data = await authService.createUserWithEmailAndPassword(email, password)
            }
            else{
               data = await authService.signInWithEmailAndPassword(email,password)
            }
            console.log(data);

        } catch(error){
            setError(error.message);
        }
    };

    //another method to sign in --> sign uo using social such as google and github.
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {target: {name}} = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();

        }
        else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();

        }
        await authService.signInWithPopup(provider);
    };
// when auth.js is called it will return this html such that there are basic account setup submission format.
    return ( 
        <div>
            <form onSubmit={onSubmit}>
        
                <input 
                name="email" 
                type = "text" 
                placeholder="Email" 
                required value={email} 
                onChange={onChange}
                />
                <input 
                name="password" 
                type = "password" 
                placeholder="Password" 
                required value={password} 
                onChange={onChange}
                />
                <input type = "submit" value= {newAccout ? "create account" : "Log In"} />
            </form>
            <span onClick = {toggleAccount}> {newAccout ? "Sign in": "Create account"}</span>
            {error}
            <div>
                <button onClick = {onSocialClick} name = "google"> Contunie with google</button>
                <button onClick = {onSocialClick} name = "github"> Contunie with github</button>
        
            </div>
        </div>
        
        );
};


export default Auth;
