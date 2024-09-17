import './history-modal-style.css'
import HistoryModalValid from "./history-modal-valid.jsx";
import HistoryModalInvalid from "./history-modal-invalid.jsx";

export default function HistoryModal(props) {
    // console.log("inside history modal id = ", props.id)
    // console.log("Status = ", props.status)
    return(
        <div>
            {props.status === "Válido" ? <HistoryModalValid handleOpen={props.handleOpen} handleClose={props.handleClose} id={props.id} />
                : <HistoryModalInvalid  handleOpen={props.handleOpen} handleClose={props.handleClose} id={props.id}/>}
        </div>
    )
}