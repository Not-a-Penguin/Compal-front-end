import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Modal from "@mui/material/Modal";
import HistoryModalInput from "./history-modal-input.jsx";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import HistoryModalAccordion from "./history-modal-accordion-tables/history-modal-accordion.jsx";
import DivergenceTable from "./divergence-table.jsx";
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


export default function HistoryModalInvalid(props){
    //TODO: fazer get pelo id para recuperar as notas associadas ao CTE

    // console.log("Inside invalid")

    const [dadosNotaInvalido, setDadosNotaInvalido] = useState([]);
    const [divergencias, setDivergencias] = useState([])

    const nota_falsa2 = [
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

        axios.get(`/validacao/${props.id}`).then((response) => {
            // console.log(response.data)
            setDadosNotaInvalido(response.data[0])
            // console.log(response)
        });

        axios.get(`/divergencias/validacao/${props.id}`).then((response) => {
            // console.log(response.data)
            setDivergencias(response.data)
            // console.log(response)
        });

    },[props.id]);


    if(dadosNotaInvalido){
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
                            <img src={'/src/assets/box-invalid.svg'}/>
                            <div>
                                Detalhes do CTE {dadosNotaInvalido.N_cte}
                            </div>
                        </div>
                        <div className={'modal-valid-body'}>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do CTE"} value={dadosNotaInvalido.N_cte}/>
                                <HistoryModalInput title={"Valor do frete"} value={dadosNotaInvalido.valor_frete_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do pedido"} value={dadosNotaInvalido.N_pedido}/>
                                <HistoryModalInput title={"Valor total do pedido"} value={dadosNotaInvalido.valor_total_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Cliente"} value={dadosNotaInvalido.cliente}/>
                                <div style={{visibility: 'hidden'}}>
                                    <HistoryModalInput title={"Invisible"}/>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop: '20px', height: '50vh', overflowY: 'auto'}}>
                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <div className={'modal-tab-title-invalid'}>
                                            Detalhes
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className={'modal-tab-title-invalid'}>
                                            Divergências
                                        </div>
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    {dadosNotaInvalido ? <HistoryModalAccordion data={dadosNotaInvalido.notas_fiscais} transportadora = {dadosNotaInvalido.transportadora}/> : <></>}
                                </TabPanel>
                                <TabPanel>
                                    <DivergenceTable divergencias={divergencias}/>
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