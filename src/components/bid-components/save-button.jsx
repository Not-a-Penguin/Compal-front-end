import './bid-modal-style.css'

export default function SaveButton(props) {
    return(
        <button className={'bid-save-button'} onClick={props.onClick}>
            Salvar
        </button>
    )
}