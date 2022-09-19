import { authService, dbService } from "myBase";
import React, { useState, useEffect } from "react";

const Ticketing = () => {
    //initializes the variables that are going to be taken in, initializing the information that will be selected by the user
    const [performance, selectPerformance] = useState("");
    const [seat, selectSeat] = useState("");
    const user = authService.currentUser;
    const userEmail = user.email;
    const [seatEmail, setSeatEmail] = useState("");
    const [Empty, isEmpty] =  useState();
    useEffect(() => {console.log(Empty)},[Empty]);
    useEffect(() => {console.log(seatEmail)},[seatEmail]);

    function seatCheck(){
        setSeatEmail(dbService.collection(performance).doc(seat).get())

    }

    async function checkEmpty() {
        await seatCheck;
        if(seatEmail === ""){
            isEmpty(true);
            console.log("empty true");

        }
        else if(seatEmail !== ""){    
            console.log("empty false");
            isEmpty(false);
        }
        else(
            console.log("error")
        )
    };

    //데이터가 한번씩 밀려서 들어가는듯 setState가 값을 저장하는 방법이 원인인듯.
    async function bookSeat(){
        await checkEmpty();
        if(Empty === true){
            console.log("data submit");
            const ticketingDB = dbService.collection(performance).doc(seat);
            return  ticketingDB.set(
                {email:userEmail}
            )

        }
        else if(Empty === false){
            console.log("not available");
        }

        else{
            console.log("error");
        }
    }



    const onSubmit = async(event) => {
        event.preventDefault();

        seatCheck();
        checkEmpty();
        bookSeat();
    
    } 

    return(
        <div>
             <div onClick={() => selectPerformance("performance-1")}>
                Performance 1
            </div>
            <div onClick={() => selectPerformance("performance-2")}>
                Performance 2
            </div>
            <row>
                <div onClick={() => selectSeat("a1")}>1</div>
                <div onClick={() => selectSeat("a2")}>2</div>
                <div onClick={() => selectSeat("a3")}>3</div>
                <div onClick={() => selectSeat("a4")}>4</div>
            </row>
            <span>{performance}</span>
            <span>{seat}</span>
            <input type="submit" onClick={onSubmit}/>
        </div>

        
        
    )


};
export default Ticketing;