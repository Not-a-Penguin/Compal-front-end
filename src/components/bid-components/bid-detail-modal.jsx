import '../history-components/history-modal/history-modal-style.css'

import Modal from "@mui/material/Modal";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import HistoryModalInput from "../history-components/history-modal/history-modal-input.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import BidDetailAccordion from "./bid-detail-accordion.jsx";


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

    useEffect(() => {
        setDadosBid(
            {
                    "Seguro Transportadora":
                        [
                            {
                                "nome": "Seguro 1",
                                "seguros": [
                                    {
                                        "descricao": "Seguro 1 Descrição 1",
                                        "porcentagem": "1%"
                                    }
                                ]

                            },
                            {
                                "nome": "Seguro 2",
                                "seguros": [
                                    {
                                        "descricao": "Seguro 2 Descrição 1",
                                        "porcentagem": "3%"
                                    },
                                    {
                                        "descricao": "Seguro 2 Descrição 2",
                                        "porcentagem": "2%"
                                    }
                                ]
                            }
                        ],
                    "Seguro Compal": [
                        {
                            "nome": "Seguro compal 1",
                            "seguros": [
                                {
                                    "descricao": "Seguro compal 1 Descrição 1",
                                    "porcentagem": "3%"
                                },
                                {
                                    "descricao": "Seguro compal 1 Descrição 2",
                                    "porcentagem": "2%"
                                }
                            ]
                        },
                        {
                            "nome": "Seguro compal 2",
                            "seguros": [
                                {
                                    "descricao": "Seguro compal 2 Descrição 1",
                                    "porcentagem": "3%"
                                },
                                {
                                    "descricao": "Seguro compal 2 Descrição 2",
                                    "porcentagem": "2%"
                                }
                            ]
                        }
                    ]
                }
        )
    },[])

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
                            <HistoryModalInput title={"Transportadora"} value={""}/>
                            <HistoryModalInput title={"Modal"} value={"R$"}/>
                        </div>
                        <div className={'modal-valid-body-aligner1'}>
                            <HistoryModalInput title={"Origem"} value={""}/>
                            <HistoryModalInput title={"Destino"} value={""}/>
                        </div>
                        {/*<div className={'modal-valid-body-aligner1'}>*/}
                        {/*    <HistoryModalInput title={"Cliente"} value={"  "}/>*/}
                        {/*    <div style={{visibility: 'hidden'}}>*/}
                        {/*        <HistoryModalInput title={"Invisible"}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                                <Tab>
                                    <div className={'modal-tab-title'}>
                                        Modal
                                    </div>
                                </Tab>
                            </TabList>
                            <TabPanel>
                                {/*Seguro Transportadora*/}
                                {/*{dadosBid ? <HistoryModalAccordion data={dadosBid}/> :*/}
                                {dadosBid ? <BidDetailAccordion data={dadosBid["Seguro Transportadora"]}/> : <div></div>}
                                {/*    <div></div>}*/}
                            </TabPanel>
                            <TabPanel>
                            {/* Seguro Compal*/}
                                {dadosBid ? <BidDetailAccordion data={dadosBid["Seguro Compal"]}/> : <div></div>}
                            </TabPanel>
                            <TabPanel>
                                Outros
                            </TabPanel>
                            <TabPanel>
                                Frete Peso
                            </TabPanel>
                            <TabPanel>
                                Modal
                            </TabPanel>
                        </Tabs>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}