import {useEffect, useState} from "react";
import MenuSelector from "../../components/product-components/menu-selector.jsx";
import ProductRegister from "../product-register/product-register.jsx";
import OriginRegister from "../origin-register/origin-register.jsx";
import DestinyRegister from "../destiny-register/destiny-register.jsx";
import TransporterRegister from "../transporter-register/transporter-register.jsx";

export default function ProductMain() {

    const [currentScreen, setCurrentScreen] = useState('submenu-1');
    const [currentSubtitle, setCurrentSubtitle] = useState("Adicionar produtos");

    function renderMenu(subtitle){
        if(currentScreen === 'submenu-1'){
            return <ProductRegister subtitle={currentSubtitle}/>
        }
        else if(currentScreen === 'submenu-2'){
            return <OriginRegister subtitle={currentSubtitle}/>
        }
        else if(currentScreen === 'submenu-3'){
            return <DestinyRegister subtitle={currentSubtitle}/>
        }
        else if(currentScreen === 'submenu-4'){
            return <TransporterRegister subtitle={currentSubtitle}/>
        }
        else{
            return(
                <div>Erro ao renderizar submenu</div>
            )
        }
    }

    function selectMenu(currentMenu){
        setCurrentScreen(currentMenu)
        if(currentMenu === 'submenu-1'){
            setCurrentSubtitle("Adicionar produtos")
        }
        else if(currentMenu === 'submenu-2'){
            setCurrentSubtitle("Adicionar origem")
        }
        else if(currentMenu === 'submenu-3'){
            setCurrentSubtitle("Adicionar destino")
        }
        else if(currentMenu === 'submenu-4'){
            setCurrentSubtitle("Adicionar transportadora")
        }
    }

    return(
        <div>
            <div className={'history-screen-header'}>
                <div className={'history-header-text'}>
                    Cadastro
                </div>
            </div>
            <MenuSelector callback={selectMenu} isCurrentMenu={currentScreen}/>
            {/*<div className={'menu-selector-subtitle'}>*/}
            {/*    {currentSubtitle}*/}
            {/*</div>*/}
            {/*<div  className={'history-screen-border'}>*/}
            {renderMenu(currentSubtitle)}
            {/*</div>*/}

        </div>
    )
}