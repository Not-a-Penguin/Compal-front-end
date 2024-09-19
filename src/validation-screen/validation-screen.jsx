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

    const [numeroPedido, setNumeroPedido] = useState("")
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
        // console.log(document.getElementById('CTE').files[0])

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

                const retorno = response.data;
                setNotaFiscal(retorno.data.cteArquivo.chaveAcesso)
                setPesoBruto(retorno.data.cteArquivo.valorPesoBruto + "Kg")
                setPesoCubado(retorno.data.cteArquivo.valorPesoCubado + "m³")
                setNumeroPedido(retorno.data.cteArquivo.numeroPedido)

                setEnderecoRemetente(retorno.data.remetenteArquivo.logradouro + ", " + retorno.data.remetenteArquivo.numero + ", " +  retorno.data.remetenteArquivo.municipio + " - " + retorno.data.remetenteArquivo.estado)
                setDestinatarioEndereco(retorno.data.destinatarioArquivo.logradouro + ", " + retorno.data.destinatarioArquivo.numero + ", " +  retorno.data.destinatarioArquivo.municipio + " - " + retorno.data.destinatarioArquivo.estado)

                setRemetenteComplemento(retorno.data.remetenteArquivo.complemento)
                setDestinatarioComplemento(retorno.data.destinatarioArquivo.complemento)

                setRemetenteBairro(retorno.data.remetenteArquivo.bairro)
                setDestinatarioBairro(retorno.data.destinatarioArquivo.bairro)

                setRemetenteCep(retorno.data.remetenteArquivo.cep)
                setDestinatarioCep(retorno.data.destinatarioArquivo.cep)

                if(retorno.status === "Válido"){
                    toast.success(
                        <div style={{textAlign: 'left'}}>
                            <div>
                                <div> </div>
                                Salvo com sucesso. <br /><br />
                            </div>
                            <div>
                                {retorno.message}
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
                }else{
                    toast.error(
                        <div style={{textAlign: 'left'}}>
                            <div>
                                Algo está errado.<br /><br />
                            </div>
                            <div>
                                {retorno.message}
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

        // const retorno = {
        //     "status": "Válido",
        //     "message": "CT-e e dados relacionados inseridos com sucesso.",
        //     "data": {
        //         "cteArquivo": {
        //             "id": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e",
        //             "chaveAcesso": "13240847705660000565570020000565721000565721",
        //             "modalCte": "Multimodal",
        //             "numeroCte": "56572",
        //             "numeroPedido": "2401027",
        //             "chaveNFE": "13240810142624000369550010000019841240957518",
        //             "nomeMotorista": "AGUARDANDO MOTORISTA",
        //             "cpfMotorista": "234.167.398-84",
        //             "placaMotorista": "TST0000",
        //             "emissao": "2024-08-12T11:35:00.000Z",
        //             "valorRecebido": "2958.83",
        //             "valorFretePeso": "1569.93",
        //             "valorfrete": "10",
        //             "valorTaxa": "355.06",
        //             "valorCarga": "981208.08",
        //             "valorPesoBruto": "216",
        //             "valorVolumes": "18",
        //             "valorPesoCubado": "1.29",
        //             "createdAt": "2024-09-18T15:04:08.842Z"
        //         },
        //         "emitenteArquivo": {
        //             "id": "9210eaf3-200b-496b-97d2-27e8fd2c1732",
        //             "cnpj": "47705660000565",
        //             "inscricaoEstadual": "042155630",
        //             "nome": "SUPERSONIC LOGISTICA E TRANSPORTES LTDA",
        //             "nomeFantasia": "SUPERSONIC MANAUS",
        //             "logradouro": "RUA MATRINXA, 300 C",
        //             "numero": "0",
        //             "complemento": "RUA MATRINXA, 300 C",
        //             "bairro": "DIST. INDUSTRIAL",
        //             "municipio": "MANAUS",
        //             "codMunicipio": "1302603",
        //             "cep": "69075150",
        //             "estado": "AM",
        //             "telefone": "09231822949",
        //             "cteId": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e"
        //         },
        //         "remetenteArquivo": {
        //             "id": "9724f858-1568-4e9f-9842-a0ecd251cf1a",
        //             "cnpj": "10142624000369",
        //             "inscricaoEstadual": "063010658",
        //             "nome": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA",
        //             "nomeFantasia": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCI",
        //             "logradouro": "JAVARI",
        //             "numero": "1055",
        //             "complemento": "JAVARI",
        //             "bairro": "DISTRITO INDUSTRIAL",
        //             "municipio": "MANAUS",
        //             "codMunicipio": "1302603",
        //             "cep": "69075110",
        //             "estado": "AM",
        //             "telefone": null,
        //             "cteId": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e"
        //         },
        //         "destinatarioArquivo": {
        //             "id": "06725b7c-285c-48e2-b7f9-3ac647757859",
        //             "cnpj": "04809335000378",
        //             "inscricaoEstadual": "748083817115",
        //             "nome": "SYNCREON SOLUCOES LOGISTICAS LTDA",
        //             "fone": "00000000000",
        //             "logradouro": "AV. EMANCIPACAO,5000",
        //             "numero": "0",
        //             "complemento": "AV. EMANCIPACAO,5000",
        //             "bairro": "PARQUE DOS PINHEIROS",
        //             "municipio": "HORTOLANDIA",
        //             "codMunicipio": "3519071",
        //             "cep": "13186903",
        //             "estado": "SP",
        //             "cteId": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e"
        //         },
        //         "impostoArquivo": {
        //             "id": "7e84dc73-3b8f-4b3d-8f7e-818823915f2a",
        //             "valorBaseCalculo": "2958.83",
        //             "valorPercentualCalculo": "12.00",
        //             "valorIcms": "355.06",
        //             "cteId": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e"
        //         },
        //         "nfe": {
        //             "id": "8fe405b5-1a9b-497c-b7d6-be287bc8a597",
        //             "chave": "13240810142624000369550010000019841240957518",
        //             "partNumber": "72A10V31369",
        //             "quantidade": 648,
        //             "valorUnitario": 1514.21,
        //             "valortotal": 981208.08,
        //             "descricao": "PLACA MAE HDL50 PN TRFM3",
        //             "cteId": "a6f2a923-06ef-4bdc-bb2e-bca6ce6d3e6e"
        //         }
        //     }
        // }
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
                        <CteValidationForm title={"Número do pedido"} placeholder={"Informação auto-preenchida"} disabled={true} id={"N_pedido"} value={numeroPedido}/>
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