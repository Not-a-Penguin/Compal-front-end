import './sidebar-style.css'
import SidebarButton from "../components/sidebar-components/sidebar-buttons.jsx";

export default function Sidebar(props){

    function callback(element){
        props.clicked(element.currentTarget.id)
    }

    return(
        <div className={'sidebar-style'}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                paddingLeft: '0%',
            }}>
                <img src={'src/assets/compal-logo.svg'} alt={"compal-logo"} style={{scale: "50%", transform: "translate(-10%, 10%)"}}/>
                <SidebarButton text={"Validação"} icon={'src/assets/sidebar-icons/ok-symbol.svg'} clicked={callback} id={"sidebar-1"} isCurrentMenu={props.currentMenu}/>
                <SidebarButton text={"Histórico"} icon={'src/assets/sidebar-icons/chart-symbol.svg'} clicked={callback} id={"sidebar-2"} isCurrentMenu={props.currentMenu}/>
                <SidebarButton text={"Cadastros"} icon={'src/assets/sidebar-icons/plus-symbol.svg'} clicked={callback} id={"sidebar-3"} isCurrentMenu={props.currentMenu}/>
                <SidebarButton text={"BID"} icon={'src/assets/sidebar-icons/truck-symbol.svg'} clicked={callback} id={"sidebar-4"} isCurrentMenu={props.currentMenu}/>
            </div>
                <img className={'rosh-logo'} src={'/rosh-logo.png'} alt={'rosh-logo'}/>
        </div>
    )
}