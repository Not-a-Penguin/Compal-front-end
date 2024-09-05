import './validation-main.css'

import Sidebar from "./sidebar.jsx";
import ValidationScreen from "../validation-screen/validation-screen.jsx";

import {useState} from "react";
import HistoryScreen from "../history-screen/history-screen.jsx";

export default function ValidationMain(){

    const [currentMenu, setCurrentMenu] = useState('sidebar-1');

    function updateMenu(screen){
        setCurrentMenu(screen)
    }

    function checkWhichMenu(menu){
        console.log(menu);
        if(menu === 'sidebar-1'){
            return <ValidationScreen />
        }
        else if(menu === 'sidebar-2'){
            return <HistoryScreen/>
        }
        else{
            return <div>Erro</div>
        }

    }

    return(
        <div className={'validation-main'}>
            <Sidebar clicked={updateMenu} currentMenu={currentMenu}/>
            <div style={{
                position: 'fixed',
                left: '12vw',
                paddingLeft: '10px',
                paddingRight: '10px',
                marginLeft: '5px',
                height: '100%',
                overflow: 'auto',
            }}>
            {checkWhichMenu(currentMenu)}
            </div>
        </div>
    )
}

