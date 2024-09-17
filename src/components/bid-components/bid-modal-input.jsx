import './bid-modal-style.css'

export default function BidModalInput(props) {
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            // width: '100%'
        }}>
            <div className={'bid-modal-input-title'}>{props.title}</div>
            <input onChange={props.onChange} value={props.value} className={'bid-modal-input'}/>
        </div>
    )
}