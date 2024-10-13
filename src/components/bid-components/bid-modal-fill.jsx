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

import {Bounce, toast, ToastContainer} from "react-toastify";
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

export default function BidModalFill(props) {

    const [outros, setOutros] = useState([]);
    const [outrosValor, setOutrosValor] = useState([])
    const [novoCampo, setNovoCampo] = useState(false)
    const [descricaoOutrosChanged, setDescricaoOutrosChanged] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [tipoOperacaoChanged, setTipoOperacaoChanged] = useState(false)
    const [currentOperacaoIndex, setCurrentOperacaoIndex ] = useState(0)

    const [operacaoValueMin, setOperacaoValueMin] = useState([])
    const [operacaoValueMax, setOperacaoValueMax] = useState([])
    const [operacaoNames, setOperacaoNames] = useState([])

    const tipoOperacaoData = ["D+1", "D+2", "D+3", "D+4", "D+5", "D+6"]

    function saveBid(){

        let data = {}
        if(novoCampo){
            data = {
                "bidId": props.id,
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
                    "operacao": document.getElementById("tipo-operacao").value,
                },
                "outros": {
                    "descricao": document.getElementById("novo-outros-descricao").value,
                    "percentual": document.getElementById("novo-outros-percentual").value
                }
            }
        }else{
            data = {
                "bidId": props.id,
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
                    "operacao": document.getElementById("tipo-operacao").value,
                },
                "outros": {
                    "descricao": document.getElementById("outros-descricao").value,
                    "percentual": document.getElementById("outros-percentual").value
                }
            }
        }

        console.log(data)

        const config = {
            headers: {'Content-Type': 'application/json'}
        };

        axios.post('/valorbid', data, config).then(function (response) {
            // console.log(response)
            if (response.status === 201) {
                toast.success(
                    <div style={{textAlign: 'left'}}>
                        <div>
                            <div></div>
                            Salvo com sucesso. <br/><br/>
                        </div>
                        <div>
                            {response.data.message}
                        </div>
                    </div>, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    })
            } else {
                toast.error(
                    <div style={{textAlign: 'left'}}>
                        <div>
                            <div></div>
                            Falha. <br/><br/>
                        </div>
                        <div>
                            Problema de comunicação com o servidor.
                        </div>
                    </div>, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    })
            }
        }).catch(function(err){
            toast.error(
                <div style={{textAlign: 'left'}}>
                    <div>
                        <div> </div>
                        Operação falhou. <br /><br />
                    </div>
                    <div>
                        Erro de comunicação com o servidor.
                    </div>
                </div>, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                })
        })
    }

    useEffect(() => {

        setOutros([])
        setOutrosValor([])
        setNovoCampo(false)
        setOperacaoValueMax([])
        setOperacaoValueMin([])
        setOperacaoNames([])
        setCurrentOperacaoIndex(0)
        setTipoOperacaoChanged(false)

        axios.get( `/segurosbid/${props.id}`).then(function(response){

            let outrosDropdown = []
            let outrosValorDropdownValue = []

            let operacaoNameAux = []
            let operacaoMinAux = []
            let operacaoMaxAux = []

            response.data['outros'].map((outro) => {
                outrosDropdown.push(outro['descricao'])
                outrosValorDropdownValue.push(outro['valor'])
            })

            response.data['fretes'].map((frete) => {
                operacaoNameAux.push(frete['descricao'])
                operacaoMaxAux.push(frete['valorKg'])
                operacaoMinAux.push(frete['valorMinimo'])
            })

            if(response.data['segurosTransportadora'][0]){

                document.getElementById('seguro-transportadora-descricao').value = response.data['segurosTransportadora'][0]['descricao'];
                document.getElementById('seguro-transportadora-percentual').value = response.data['segurosTransportadora'][0]['valor'];

                document.getElementById('seguro-compal-descricao').value = response.data['segurosCompal'][0]['descricao'];
                document.getElementById('seguro-compal-percentual').value = response.data['segurosCompal'][0]['valor'];

                document.getElementById('frete-peso-minimo').value = response.data['fretes'][0]['valorMinimo'];
                document.getElementById('frete-peso-maximo').value = response.data['fretes'][0]['valorKg'];
                document.getElementById('tipo-operacao').value = response.data['fretes'][0]['descricao'];

                setOutrosValor(outrosValorDropdownValue)
                setOutros(outrosDropdown)
                setOperacaoNames(operacaoNameAux)
                setOperacaoValueMin(operacaoMinAux)
                setOperacaoValueMax(operacaoMaxAux)
            }
        })

    }, [props.handleOpen])

    useEffect(() => {
        for(let index = 0; index <= outros.length-1; index++){
            if(document.getElementById("outros-descricao").value === outros[index]){
                document.getElementById('outros-percentual').value = outrosValor[index]
                setCurrentIndex(index)
            }
        }
    }, [descricaoOutrosChanged]);

    useEffect(() => {
        let foundIndex = false;

        for(let index = 0; index <= operacaoNames.length-1; index++){
            if(document.getElementById("tipo-operacao").value === operacaoNames[index]) {
                document.getElementById('frete-peso-minimo').value = operacaoValueMin[index]
                document.getElementById('frete-peso-maximo').value = operacaoValueMax[index]
                setCurrentOperacaoIndex(index)
                foundIndex = true;
            }
        }

        if(operacaoNames.length > 0){
            if(foundIndex === false){
                document.getElementById('frete-peso-minimo').value = "0";
                document.getElementById('frete-peso-maximo').value = "0";
            }
        }

    }, [tipoOperacaoChanged]);

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
                                        <BidModalInput title={"Descrição"} id={'novo-outros-descricao'}/>
                                        <BidModalInput title={"Percentual"} id={'novo-outros-percentual'}/>
                                    </div>
                                        <BidModalButton title={"Selecionar"} onClick={() => {
                                            setNovoCampo(false);
                                        }}/>
                                </div>

                                :
                                <div>
                                    <div className={'bid-modal-section-row'}>
                                        <BidOutrosDropdown title={"Descrição"} dropdownData={outros} id={'outros-descricao'} onChangeCallback={function () {setDescricaoOutrosChanged(!descricaoOutrosChanged)}}/>
                                        <BidModalInput title={"Percentual"} id={'outros-percentual'} />
                                    </div>
                                        <BidModalButton title={"Adicionar outro"} onClick={() => {
                                            document.getElementById('outros-percentual').value = ""
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
                            <BidOutrosDropdown title={"Tipo de operação"} id={'tipo-operacao'} dropdownData={tipoOperacaoData} onChangeCallback={function(){setTipoOperacaoChanged(!tipoOperacaoChanged)}}/>
                        <br/>
                        <SaveButton onClick={saveBid}/>
                    </div>
                </Box>
            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="colored"
                transition: Bounce
            />
        </div>
    )
}