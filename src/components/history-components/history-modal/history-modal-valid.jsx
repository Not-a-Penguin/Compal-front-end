import './history-modal-style.css'
import 'react-tabs/style/react-tabs.css';

import {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HistoryModalAccordion from "./history-modal-accordion-tables/history-modal-accordion.jsx";
import HistoryModalInput from "./history-modal-input.jsx";
import axios from "axios";

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

export default function HistoryModalValid(props){

    const [dadosNota, setDadosNota] = useState([]);

    useEffect(() => {

        axios.get(`/validacao/${props.id}`).then((response) => {
            // console.log(response.data)
            setDadosNota(response.data[0])
            // console.log(response)
        });

    },[props.id]);

    if(dadosNota){
        return(
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
                                Detalhes do CTE {dadosNota.N_cte}
                            </div>
                        </div>
                        <div className={'modal-valid-body'}>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do CTE"} value={dadosNota.N_cte}/>
                                <HistoryModalInput title={"Valor do frete"} value={dadosNota.valor_frete_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do pedido"} value={dadosNota.N_pedido}/>
                                <HistoryModalInput title={"Valor total do pedido"} value={dadosNota.valor_total_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Cliente"} value={dadosNota.cliente}/>
                                <div style={{visibility: 'hidden'}}>
                                    <HistoryModalInput title={"Invisible"}/>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop: '20px', height: '50vh', overflowY: 'auto'}}>
                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <div className={'modal-tab-title'}>
                                            Detalhes
                                        </div>
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    {dadosNota ? <HistoryModalAccordion data={dadosNota.notas_fiscais} transportadora = {dadosNota.transportadora}/> : <div></div>}
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    }
    else{
        return(
            <></>
        )
    }
}

// const nota_falsa = [
//     [{
//         "id": 1,
//         "N_cte": "54681",
//         "N_pedido": "MAS2400484",
//         "cliente": "SYNCREON SOLUCOES LOGISTICAS LTDA",
//         "valor_frete_pedido": "559.615,14 R$",
//         "valor_total_pedido": "34.615,14 R$",
//         "notas_fiscais": [
//             {
//                 "n_nota": 761,
//                 "items": [
//                     {
//                         "quantidade": 21,
//                         "part_number": "72A15L31415",
//                         "descricao": "PLACA MAE IDH50 PN 5710J",
//                         "valor_unitario": "1.648,34 R$",
//                         "valor_total": "34.615,14 R$"
//                     }
//                 ]
//             },
//             {
//                 "n_nota": 7444,
//                 "items": [
//                     {
//                         "quantidade": 21,
//                         "part_number": "72A15L31415",
//                         "descricao": "PLACA MAE IDH50 PN 5710J",
//                         "valor_unitario": "1.648,34 R$",
//                         "valor_total": "34.615,14 R$"
//                     }
//                 ]
//             },
//         ]
//     }],
// ]