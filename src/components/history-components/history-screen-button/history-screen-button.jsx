import './history-screen-button-style.css'

export default function HistoryScreenButton(props) {
    return(
        <button onClick={props.onClick} type="button" className="history-screen-button">
            <img src={props.icon}/>
            <div className={'history-screen-button-text'}>
                {props.text}
            </div>
        </button>
    )
}