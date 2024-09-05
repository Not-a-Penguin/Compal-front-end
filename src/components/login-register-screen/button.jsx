import './button-style.css'

export default function Button(props){
    return(
        <button className={'button-general'} onClick={props.onClick}>
            {props.text}
        </button>
    )
}