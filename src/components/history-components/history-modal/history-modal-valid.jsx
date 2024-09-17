import './history-modal-style.css'
import 'react-tabs/style/react-tabs.css';

import {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HistoryModalAccordion from "./history-modal-accordion-tables/history-modal-accordion.jsx";
import HistoryModalInput from "./history-modal-input.jsx";

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

    const nota_falsa = [
        [{
            "id": 1,
            "N_cte": "54681",
            "N_pedido": "MAS2400484",
            "cliente": "SYNCREON SOLUCOES LOGISTICAS LTDA",
            "valor_frete_pedido": "559.615,14 R$",
            "valor_total_pedido": "34.615,14 R$",
            "notas_fiscais": [
                {
                    "n_nota": 761,
                    "items": [
                        {
                            "quantidade": 21,
                            "part_number": "72A15L31415",
                            "descricao": "PLACA MAE IDH50 PN 5710J",
                            "valor_unitario": "1.648,34 R$",
                            "valor_total": "34.615,14 R$"
                        }
                    ]
                },
                {
                    "n_nota": 7444,
                    "items": [
                        {
                            "quantidade": 21,
                            "part_number": "72A15L31415",
                            "descricao": "PLACA MAE IDH50 PN 5710J",
                            "valor_unitario": "1.648,34 R$",
                            "valor_total": "34.615,14 R$"
                        }
                    ]
                },
            ]
        }],
    ]

    useEffect(() => {

        //axios.get .....
        console.log("Inside use effect. Current id = ", props.id)
        if(props.id === 1){
            setDadosNota(nota_falsa[0])
        }
        if(props.id === 2){
            setDadosNota(nota_falsa[1])
        }
        if(props.id === 3){
            setDadosNota(nota_falsa[2])
        }
        if(props.id === 4){
            setDadosNota(nota_falsa[3])
        }
        // console.log(dadosNota)

    },[props.id]);

    if(dadosNota[0]){
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
                                Detalhes do CTE {dadosNota[0].N_cte}
                            </div>
                        </div>
                        <div className={'modal-valid-body'}>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do CTE"} value={dadosNota[0].N_cte}/>
                                <HistoryModalInput title={"Valor do frete"} value={dadosNota[0].valor_frete_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do pedido"} value={dadosNota[0].N_pedido}/>
                                <HistoryModalInput title={"Valor total do pedido"} value={dadosNota[0].valor_total_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Cliente"} value={dadosNota[0].cliente}/>
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
                                    {dadosNota ? <HistoryModalAccordion data={dadosNota[0].notas_fiscais}/> : <div>banana</div>}
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

// setDadosNota(nota_falsa)
// setDadosNota([
//     {
//         "id": 12,
//         "items": [
//             {
//                 "quantidade": 2,
//                 "part_number": "AS2173123",
//                 "descricao": "Pasta de solda",
//                 "valor_unitario": 150.4,
//                 "total": 4560
//             }
//         ]
//     },
//     {
//         "id": 34,
//         "items": [
//             {
//                 "quantidade": 3,
//                 "part_number": "BS2173123",
//                 "descricao": "solda",
//                 "valor_unitario": 250.4,
//                 "total": 5560
//             },
//             {
//
//                 "quantidade": 3,
//                 "part_number": "BS2173123",
//                 "descricao": "solda",
//                 "valor_unitario": 250.4,
//                 "total": 5560
//             }
//         ]
//     },
//     {
//         "id": 56,
//         "items": [
//             {
//                 "nome" : "item 2",
//                 "quantidade": 3,
//                 "part_number": "BS2173123",
//                 "descricao": "solda",
//                 "valor_unitario": 250.4,
//                 "total": 5560
//             },
//             {
//                 "nome": "item 3",
//                 "quantidade": 3,
//                 "part_number": "BS2173123",
//                 "descricao": "solda",
//                 "valor_unitario": 250.4,
//                 "total": 5560
//             }
//         ]
//     }
// ])