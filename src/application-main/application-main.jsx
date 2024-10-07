import './application-main.css'

import Sidebar from "./sidebar.jsx";
import ValidationScreen from "../validation-screen/validation-screen.jsx";

import {useState} from "react";
import HistoryScreen from "../history-screen/history-screen.jsx";
import BidScreen from "../bid-screen/bid-screen.jsx";
import ProductMain from "../product-screen/product-main/product-main.jsx";

export default function ApplicationMain(){

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
        else if(menu === 'sidebar-3'){
            return <ProductMain/>
        }
        else if(menu === 'sidebar-4'){
            return <BidScreen/>
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
                top: 0,
                left: '10px',
                right: 0,
                bottom: 0,
                // left: '12vw',
                // width: '100px',
                flex: '0 0 100%',
                paddingLeft: '10vw',
                paddingRight: '1vw',
                paddingBottom: '1vw',
                // marginLeft: '45%',
                // height: '100%',
                overflow: 'auto',
            }}>
            {checkWhichMenu(currentMenu)}
            </div>
        </div>
    )
}

