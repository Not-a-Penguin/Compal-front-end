import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Modal from "@mui/material/Modal";
import HistoryModalInput from "./history-modal-input.jsx";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import HistoryModalAccordion from "./history-modal-accordion-tables/history-modal-accordion.jsx";
import DivergenceTable from "./divergence-table.jsx";

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
        //axios.get .....
        // console.log("Inside use effect")
        // console.log("Inside use effect. Current id = ", props.id)
        if(props.id === 1){
            setDadosNotaInvalido(nota_falsa2[0])
        }

        setDivergencias([
            {
                "divergencia": "Peso cubado",
                "valor_esperado": "2611m³",
                "valor_CTE": "2000m³",
            },
        ]);

    }, [props.id]);

    if(dadosNotaInvalido[0]){
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
                                Detalhes do CTE {dadosNotaInvalido[0].N_cte}
                            </div>
                        </div>
                        <div className={'modal-valid-body'}>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do CTE"} value={dadosNotaInvalido[0].N_cte}/>
                                <HistoryModalInput title={"Valor do frete"} value={dadosNotaInvalido[0].valor_frete_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Número do pedido"} value={dadosNotaInvalido[0].N_pedido}/>
                                <HistoryModalInput title={"Valor total do pedido"} value={dadosNotaInvalido[0].valor_total_pedido}/>
                            </div>
                            <div className={'modal-valid-body-aligner1'}>
                                <HistoryModalInput title={"Cliente"} value={dadosNotaInvalido[0].cliente}/>
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
                                    {dadosNotaInvalido ? <HistoryModalAccordion data={dadosNotaInvalido[0].notas_fiscais}/> : <></>}
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