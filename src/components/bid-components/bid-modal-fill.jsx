import '../history-components/history-modal/history-modal-style.css'

import Modal from "@mui/material/Modal";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import HistoryModalInput from "../history-components/history-modal/history-modal-input.jsx";
import BidModalInputSection from "./bid-modal-input-section.jsx";
import BidModalInput from "./bid-modal-input.jsx";
import SaveButton from "./save-button.jsx";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 'auto',
    bgcolor: '#FFFFFF',
    border: '0px solid #000',
    borderRadius: '12px',
    boxShadow: 5,
    p: 4,
};

export default function BidModalFill(props) {
    return (
        <div>
            <Modal
                open={props.handleOpen}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={'modal-valid-header'}>
                        <img src={'/src/assets/box.svg'}/>
                        <div>
                            Preencher BID
                        </div>
                    </div>
                    <div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Seguro Transportadora"}/>
                            <BidModalInput title={"Descrição"}/>
                            <BidModalInput title={"Percentual"}/>
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Seguro Compal"}/>
                            <BidModalInput title={"Descrição"}/>
                            <BidModalInput title={"Percentual"}/>
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Outros"}/>
                            <BidModalInput title={"Descrição"}/>
                            <BidModalInput title={"Percentual"}/>
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Frete Peso"}/>
                            <BidModalInput title={"Descrição"}/>
                            <BidModalInput title={"Valor mínimo"}/>
                            <BidModalInput title={"Valor máximo"}/>
                        </div>
                        <SaveButton/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}