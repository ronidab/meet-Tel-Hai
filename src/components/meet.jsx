import React, { Component } from "react";
import Datingcards from "../Datingcards/Datingcards"
// import { AuthContext } from "./../contexts/auth";

class Meet extends Component {
    render(){
        return(
            <div className="meet">
                <Datingcards/>
            </div>
        )
    }
}

export default Meet;