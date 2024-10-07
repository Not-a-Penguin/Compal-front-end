import './menu-selector-style.css'
import MenuSelectorButton from "./menu-selector-button.jsx";

export default function MenuSelector(props){
    return(
        <div className="product-screen-selector">
            <MenuSelectorButton isCurrentMenu={props.isCurrentMenu} callback={props.callback} id={'submenu-1'} title={"Produto"}/>
            <MenuSelectorButton isCurrentMenu={props.isCurrentMenu} callback={props.callback} id={'submenu-2'} title={"Origem"}/>
            <MenuSelectorButton isCurrentMenu={props.isCurrentMenu} callback={props.callback} id={'submenu-3'} title={"Destino"}/>
            <MenuSelectorButton isCurrentMenu={props.isCurrentMenu} callback={props.callback} id={'submenu-4'} title={"Transportadora"}/>
        </div>
    )
}