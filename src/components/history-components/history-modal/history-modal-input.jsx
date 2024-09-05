import './history-modal-input-style.css'

export default function HistoryModalInput(props) {
    return(
        <div>
            <div className={'history-modal-input-title'}>
                {props.title}
            </div>
            <input className={'history-modal-input'} disabled value={props.value}></input>
        </div>
    )
}