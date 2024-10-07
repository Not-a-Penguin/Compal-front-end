import '../history-components/history-modal/history-modal-style.css'

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BidModalInputSection from "./bid-modal-input-section.jsx";
import BidModalInput from "./bid-modal-input.jsx";
import SaveButton from "./save-button.jsx";
import ValidationDropdown from "../validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.195.40:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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

export default function AddBidModal(props){

    const [destinoData, setDestinoData] = useState([]);
    const [origemData, setOrigemData] = useState([]);
    const [transportadoraData, setTransportadoraData] = useState([])
    const modalData = ["Aéreo", "Rodoviário", "Multimodal"]

    useEffect(() => {
        axios.get('/selectdestino').then((response) => {
            setDestinoData(response.data)
        });
        axios.get('/selectorigem').then((response) => {
            setOrigemData(response.data)
        });
        axios.get('/selecttransportadora').then((response) => {
            setTransportadoraData(response.data)
        });
    }, []);

    function saveButton(){
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        // console.log(document.getElementById("origin_register_cidade").value);
        axios.post('/criarbid',
            {
                "destino": document.getElementById("add-bid-destino").value,
                "origem": document.getElementById("add-bid-origem").value,
                "transportadora": document.getElementById("add-bid-transportadora").value,
                "modal": document.getElementById("add-bid-modal").value,
            }, config).then(function (response){
            console.log(response);
        })
    }

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
                            Editar BID
                        </div>
                    </div>
                    <div>
                        <ValidationDropdown title={"Transportadora"} dropdownData={transportadoraData} id={'add-bid-transportadora'}/>
                        <ValidationDropdown title={"Origem"} dropdownData={origemData} id={'add-bid-origem'}/>
                        <ValidationDropdown title={"Destino"} dropdownData={destinoData} id={'add-bid-destino'}/>
                        <ValidationDropdown title={"Modal"} dropdownData={modalData} id={'add-bid-modal'}/>
                        <SaveButton onClick={saveButton}/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}