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

    const [dadosNotaInvalido, setDadosNotaInvalido] = useState([]);
    const [divergencias, setDivergencias] = useState([])

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
                                <HistoryModalInput title={"Valor do frete"} value={"R$" + dadosNotaInvalido.valor_frete_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do pedido"} value={dadosNotaInvalido.N_pedido}/>
                                <HistoryModalInput title={"Valor total do pedido"} value={"R$" + dadosNotaInvalido.valor_total_pedido}/>
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