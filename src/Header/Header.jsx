import React, { Component } from "react";
import "./header.css"
import PersonIcon from "@material-ui/icons/Person"
import { IconButton } from "@material-ui/core"
import ForumIcon from "@material-ui/icons/Forum"

const Header = () => {
    console.log("here at header")
    return (
        <div className="meet">
            <IconButton>
                <PersonIcon fontSize="large" className="header_icon"/>
            </IconButton>
            <IconButton>
                <ForumIcon fontSize="large" className="header_icon" />
            </IconButton>
        </div>
    )
}

export default Header;