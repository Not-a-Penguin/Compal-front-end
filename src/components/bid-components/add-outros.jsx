import './bid-outros-dropdown-style.css'

export default function AddOutros(props) {
    return(
        <button onClick={props.onClick} className={'bid-outros-add-button'}>
            {props.title}
        </button>
    )
}