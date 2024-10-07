import './menu-selector-style.css'

export default function MenuSelectorButton(props) {

    if(props.isCurrentMenu === props.id){
        return (
            <button className={'product-screen-button-selector-active'} onClick={() => {
                props.callback(props.id)
            }}>{props.title}</button>
        )
    }
    else{
        return (
            <button className={'product-screen-button-selector'} onClick={() => {
                props.callback(props.id)
            }}>{props.title}</button>
        )
    }
}