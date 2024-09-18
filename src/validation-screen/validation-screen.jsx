import './validation-screen-style.css'
import CteValidationForm from "../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../components/validation-components/validation-form/validation-dropdown.jsx";
import ValidationButton from "../components/validation-components/validation-button.jsx";
import {useEffect, useState} from "react";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.195.197:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function ValidationScreen() {

    // const transportadoras = ['Supersonic Logística e transportes LTDA', 'Brinks', 'EALE', 'IBL'];
    const tipoTransporte = ['Aéreo', 'Rodoviário', 'Multimodal'];
    const operacao = ['D+1', 'D+2', 'D+3', 'D+4', 'D+5', 'D+6'];
    // const tipoSeguro = ['NA', "DDR - Compal", "DDR - Transportadora"];

    const [pesoBruto, setPesoBruto] = useState("")
    const [pesoCubado, setPesoCubado] = useState("")
    const [notaFiscal, setNotaFiscal] = useState("")

    const [enderecoRemetente, setEnderecoRemetente] = useState("")
    const [remetenteComplemento, setRemetenteComplemento] = useState("")
    const [remetenteBairro, setRemetenteBairro] = useState("")
    const [remetenteCep, setRemetenteCep] = useState("")

    const [destinatarioEndereco, setDestinatarioEndereco] = useState("")
    const [destinatarioComplemento, setDestinatarioComplemento] = useState("")
    const [destinatarioBairro, setDestinatarioBairro] = useState("")
    const [destinatarioCep, setDestinatarioCep] = useState("")

    const [transportadoras, setTransportadoras] = useState([]);
    const [tipoSeguro, setTipoSeguro] = useState([]);
    const [aeroportos, setAeroportos] = useState([])

    useEffect(() => {
        axios.get('/selecttransportadora').then((response) => {
                // handle success
                setTransportadoras(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    useEffect(() => {
        axios.get('/selectseguros').then((response) => {
            // handle success
            // console.log(response.data)
            setTipoSeguro(response.data)
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    useEffect(() => {
        axios.get('/selectdestino').then((response) => {
            // handle success
            setAeroportos(response.data)
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    function buttonCallback(){

        const cteInput = document.getElementById('CTE').files[0];

        // const cteText = new DOMParser().parseFromString(cteInput, 'text/xml')

        // var XMLParser = require('react-xml-parser')
        // var xml = new XMLParser().parseFromString(cteInput);    // Assume xmlText contains the example XML
        // console.log(xml);
        // console.log(xml.getElementsByTagName('Name'));

        // console.log("CTE text")
        console.log(document.getElementById('CTE').files[0])

        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };

        axios.post('/dadosvalidacao',
            {
                operacao: document.getElementById("operacao").value,
                aeroportoDestino: document.getElementById("aeroporto_destino").value,
                seguro: document.getElementById("tipo_seguro").value,
                tipoTransporte: document.getElementById("tipo_transportadora").value,
                transportadora: document.getElementById("transportadora").value,
                cte: document.getElementById("CTE").files[0],
            }, config).then(function (response) {
                console.log(response);
             })
            .catch(function (error) {
                console.log(error);
            });

        // axios.post('/bid').then(function (response) {
        //         console.log(response);
        //      })
        //     .catch(function (error) {
        //         console.log(error);
        //     });


        // if(n_pedido === "MAS2400484"){
            // setNotaFiscal(dadosValidacao[0].notal_fiscal)
            // setAltura("1.2m")
            // setLargura("4m")
            // setComprimento("12m")
            // setPesoBruto(dadosValidacao[0].peso_bruto)
            // setPesoCubado(dadosValidacao[0].peso_cubado)
            // setLocalEnvio(dadosValidacao[0].local_envio)
            // setLocalColeta(dadosValidacao[0].local_coleta)
            // alert("CTE válido")
        // }

        toast.success(
            <div style={{textAlign: 'left'}}>
                <div>
                    <div> </div>
                    Salvo com sucesso. <br /><br />
                </div>
                <div>
                    Sua requisição foi salva e você pode verificar na página de histórico.
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

        toast.error(
            <div style={{textAlign: 'left'}}>
                <div>
                    Algo está errado.<br /><br />
                </div>
                <div>
                    Verifique seus dados e tente novamente.
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

    return(
        <div>
            <div className={'validation-screen-header'}>
                <div className={'header-text'}>
                    Validação
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'start',
                border: "1px solid #64A70B",
                borderRadius: "10px",
            }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div className={'validation-main-card-column'}>
                        <CteValidationForm title={"Número do pedido"} placeholder={"Informação auto-preenchida"} disabled={true} id={"N_pedido"}/>
                        <ValidationDropdown title={"Transportadora"} dropdownData={transportadoras} id={"transportadora"}/>
                    </div>

                    <div className={'validation-main-card-column'}>
                        <CteValidationForm title={"CTE"} placeholder={"Selecione um arquivo"} disabled={false} inputType={"file"} id={"CTE"}/>
                        <ValidationDropdown title={"Tipo de Transporte"} dropdownData={tipoTransporte} id={"tipo_transportadora"}/>
                    </div>
                    <div className={'validation-main-card-column'}>
                        <ValidationDropdown title={"Tipo de operação (D+)"} dropdownData={operacao} id={"operacao"}/>
                        <ValidationDropdown title={"Tipo de Seguro"} dropdownData={tipoSeguro} id={"tipo_seguro"}/>
                    </div>
                </div>
                    <ValidationDropdown title={"Aeroporto de destino"} dropdownData={aeroportos} id={"aeroporto_destino"}/>
            </div>

            <ValidationButton buttonCallback={buttonCallback}/>

            <div className={'validation-autofilled-div'}>
                <div className={'form-title-text'}>
                    Informações auto-preenchidas
                </div>
                <div className={'validation-autofilled-card'}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <CteValidationForm title={"Nota Fiscal"} placeholder={"-"} disabled={true} id={'nota_fiscal'} value={notaFiscal}/>
                        <CteValidationForm title={"Peso bruto"} placeholder={"-"} disabled={true} value={pesoBruto}/>
                        <CteValidationForm title={"Peso cubado"} placeholder={"-"} disabled={true} value={pesoCubado}/>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: "row",
                        // alignItems: 'stretch'
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <CteValidationForm title={"Endereço de remetente"} placeholder={'-'} disabled={true} id={'endereco_remetente'} value={enderecoRemetente}/>
                            <CteValidationForm title={"Complemento"} placeholder={"-"} disabled={true} id={'complemento_remetente'} value={remetenteComplemento}/>
                            <CteValidationForm title={"Bairro"} placeholder={"-"} disabled={true} id={'bairro_remetente'} value={remetenteBairro}/>
                            <CteValidationForm title={"CEP"} placeholder={"-"} disabled={true} id={'cep_remetente'} value={remetenteCep}/>
                        </div>
                        <div>
                            <CteValidationForm title={"Endereço de destinatário"} placeholder={'-'} disabled={true} id={'endereco_destinatario'} value={destinatarioEndereco}/>
                            <CteValidationForm title={"Complemento"} placeholder={"-"} disabled={true} id={'complemento_remetente'} value={destinatarioComplemento}/>
                            <CteValidationForm title={"Bairro"} placeholder={"-"} disabled={true} id={'bairro_remetente'} value={destinatarioBairro}/>
                            <CteValidationForm title={"CEP"} placeholder={"-"} disabled={true} id={'cep_remetente'} value={destinatarioCep}/>
                        </div>
                    </div>
                </div>
            </div>

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