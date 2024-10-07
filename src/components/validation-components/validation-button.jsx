import './validation-button-style.css'

export default function ValidationButton(props) {
    return(
        <button className={'validation-button'} onClick={props.buttonCallback}>
            <div className={'validation-button-text'}>
                {props.title}
            </div>
        </button>
    )
}
