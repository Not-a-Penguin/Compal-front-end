import '../history-components/history-modal/history-modal-style.css'

import Modal from "@mui/material/Modal";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import HistoryModalInput from "../history-components/history-modal/history-modal-input.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import BidDetailAccordion from "./bid-detail-accordion.jsx";
import BidDetailAccordionTable from "./bid-detail-accordion-table.jsx";

import axios from 'axios';
import ModalDescription from "./modal-description.jsx";
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

export default function BidDetailModal(props) {

    const [dadosBid, setDadosBid] = useState({});

    const [transportadora, setTransportadora] = useState('')
    const [origem, setOrigem] = useState('')
    const [destino, setDestino] = useState('')
    const [modal, setModal] = useState('')

    useEffect(() => {

       axios.get( `/detalhesbid/${props.id}`).then(function(response){

           console.log(response.data)


           setDadosBid(response.data)
           setTransportadora(response.data['bid']['transportadora']['descricao'])
           setOrigem(response.data['bid']['origem']['descricao'])
           setDestino(response.data['bid']['destino']['descricao'])
           setModal(response.data['bid']['tipoModal'])

       })
    },[props.handleOpen])

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
                            Detalhes do BID {props.id}
                        </div>
                    </div>
                    <div className={'modal-valid-body'}>
                        <div className={'modal-valid-body-aligner1'}>
                            <HistoryModalInput title={"Transportadora"} id={'detalhes-transportadora'} value={transportadora}/>
                            <HistoryModalInput title={"Modal"} id={'detalhes-modal'} value={modal}/>
                        </div>
                        <div className={'modal-valid-body-aligner1'}>
                            <HistoryModalInput title={"Origem"} id={'detalhes-origem'} value={origem} />
                            <HistoryModalInput title={"Destino"} id={'detalhes-destino'} value={destino} />
                        </div>
                        <div className={'modal-valid-body-aligner1'}>
                            <HistoryModalInput title={"Modal"} value={modal}/>
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
                                        Seguro Transportadora
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className={'modal-tab-title'}>
                                        Seguro Compal
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className={'modal-tab-title'}>
                                        Outros
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className={'modal-tab-title'}>
                                        Frete Peso
                                    </div>
                                </Tab>
                                {/*<Tab>*/}
                                {/*    <div className={'modal-tab-title'}>*/}
                                {/*        Modal*/}
                                {/*    </div>*/}
                                {/*</Tab>*/}
                            </TabList>
                            <TabPanel>
                                {dadosBid ? <BidDetailAccordionTable data={dadosBid["segurosTransportadora"]}/> : <div></div>}
                            </TabPanel>
                            <TabPanel>
                            {/* Seguro Compal*/}
                                {dadosBid ? <BidDetailAccordionTable data={dadosBid["segurosCompal"]}/> : <div></div>}
                            </TabPanel>
                            <TabPanel>
                                {dadosBid ? <BidDetailAccordionTable data={dadosBid["outros"]}/> : <div></div>}
                            </TabPanel>
                            <TabPanel>
                                {dadosBid ? <BidDetailAccordionTable data={dadosBid["fretes"]} fretes={true}/> : <div></div>}
                            </TabPanel>
                            {/*<TabPanel>*/}
                            {/*    {dadosBid ? <ModalDescription description={dadosBid['bid']['tipoModal']}/> : <div></div>}*/}
                            {/*</TabPanel>*/}
                        </Tabs>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}