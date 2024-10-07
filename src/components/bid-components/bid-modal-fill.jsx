import '../history-components/history-modal/history-modal-style.css'

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BidModalInputSection from "./bid-modal-input-section.jsx";
import BidModalInput from "./bid-modal-input.jsx";
import SaveButton from "./save-button.jsx";
import ValidationDropdown from "../validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";
import BidOutrosDropdown from "./bid-outros-dropdown.jsx";
import BidModalButton from "./add-outros.jsx";


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

    const [outros, setOutros] = useState([]);
    const [novoCampo, setNovoCampo] = useState(false)

    function saveBid(){

        const data = {
            "seguroTransportadora": {
                "descricao": document.getElementById("seguro-transportadora-descricao").value,
                "percentual": document.getElementById("seguro-transportadora-percentual").value,
            },
            "seguroCompal": {
                "descricao": document.getElementById("seguro-compal-descricao").value,
                "percentual": document.getElementById("seguro-compal-percentual").value,
            },
            "frete": {
                "fretePesoMinimo": document.getElementById("frete-peso-minimo").value,
                "fretePesoMaximo": document.getElementById("frete-peso-maximo").value,
                "operacao": document.getElementById("tipo-operacao"),
            }
        }
    }

    useEffect(() => {
        setOutros([
            {
                "nome": "opção 1",
                "id": 123
            },
            {
                "nome": "opção 2",
                "id": 123
            }
        ])
    }, []);

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
                            Preencher BID {props.id}
                        </div>
                    </div>
                    <div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Seguro Transportadora"}/>
                            <BidModalInput title={"Descrição"} id={'seguro-transportadora-descricao'}/>
                            <BidModalInput title={"Percentual"} id={'seguro-transportadora-percentual'}/>
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Seguro Compal"}/>
                            <BidModalInput title={"Descrição"} id={'seguro-compal-descricao'}/>
                            <BidModalInput title={"Percentual"} id={'seguro-compal-percentual'}/>
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Outros"}/>
                            {/*<ValidationDropdown title={"Descrição"} />*/}
                            {/*<BidOutrosDropdown title={"Descrição"} dropdownData={["1", "2"]}/>*/}
                            {/*<BidModalInput title={"Percentual"}/>*/}
                            {novoCampo ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    <div className={'bid-modal-section-row'}>
                                        <BidModalInput title={"Descrição"}/>
                                        <BidModalInput title={"Percentual"}/>
                                    </div>
                                        <BidModalButton title={"Selecionar"} onClick={() => {
                                            setNovoCampo(false);
                                        }}/>
                                </div>

                                :
                                <div>
                                    <div className={'bid-modal-section-row'}>
                                        <BidOutrosDropdown title={"Descrição"} dropdownData={["1", "2"]}/>
                                        <BidModalInput title={"Percentual"}/>
                                    </div>
                                        <BidModalButton title={"Adicionar outro"} onClick={() => {
                                            setNovoCampo(true)
                                        }}/>
                                </div>
                            }
                        </div>
                        <div className={'bid-modal-section-row'}>
                            <BidModalInputSection sectionTitle={"Frete Peso"}/>
                            <BidModalInput title={"Valor mínimo"} id={'frete-peso-minimo'}/>
                            <BidModalInput title={"Valor máximo"} id={'frete-peso-maximo'}/>
                        </div>
                            <BidModalInput title={"Tipo de operação"} id={'tipo-operacao'}/>
                        <br/>
                        <SaveButton onClick={saveBid}/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}