import React from "react";
import classes from "../style/HelpMessage.module.css";

const HelpMessage =({helpMessage="", help})=>{


    return(
        <>
        { helpMessage !== "" && help? 
            <div className={classes.helpmessage_content}><span className={classes.helpmessage}>{helpMessage}</span></div>:null
        
        }
        </>
        

    )
}

export default HelpMessage;
