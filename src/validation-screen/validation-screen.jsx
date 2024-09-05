import './validation-screen-style.css'
import CteValidationForm from "../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../components/validation-components/validation-form/validation-dropdown.jsx";
import ValidationButton from "../components/validation-components/validation-button.jsx";
import {useState} from "react";


export default function ValidationScreen() {

    const dadosValidacao = [
        {
            "n_pedido": "MAS2400484",
            "CTE": "54681",
            "transportadora": "Supersonic Logistica e Transportes LTDA",
            "seguro": "NA",
            "notal_fiscal": "761",
            "peso_bruto": "24.5Kg",
            "peso_cubado": "90.18m³",
            "local_envio": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA - " + "JAVARI, 1.055 - " + "DISTRITO INDUSTRIAL - " + "MANAUS - AM",
            "local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA - " + "AV. EMANCIPACAO,5000, 0 - " + "PARQUE DOS PINHEIROS - " + "HORTOLÂNDIA - SP"
        },
        {
            "n_pedido": "MAS2401025",
            "CTE": "56558",
            "transportadora": "Supersonic Logistica e Transportes LTDA",
            "seguro": "NA",
            "notal_fiscal": "1969",
            "peso_bruto": "560Kg",
            "peso_cubado": "3353m³",
            "local_envio": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA - " + "JAVARI,1055 - LOTE 2.47 ECV" + "DISTRITO INDUSTRIAL" + "MANAUS - AM",
            "local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA - " + "AV. EMANCIPACAO, 5000,0 - " + "PARQUE DOS PINHEIROS - " + "HORTOLANDIA - SP"
        },
        {
            "n_pedido": "MCC2300206",
            "CTE": "56557",
            "transportadora": "Supersonic Logistica e Transportes LTDA",
            "seguro": "NA",
            "notal_fiscal": "1968",
            "peso_bruto": "2612Kg",
            "peso_cubado": "15641m³",
            "local_envio": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI,1055 - LOTE 2.47 ECV\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "local_coleta": "COMPAL TECNOLOGIA DO BRASIL LTDA - " + "KANEBO,175 - GALPAOC4 C5 C6 E C12 - " + "DISTRITO INDUSTRIAL - " + "JUNDIAI - SP"
        },
        {
            "n_pedido": "MAS2401026",
            "CTE": "56570",
            "transportadora": "Supersonic Logistica e Transportes LTDA",
            "seguro": "NA",
            "notal_fiscal": "1968",
            "peso_bruto": "436Kg",
            "peso_cubado": "2.611m³",
            "local_envio": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI,1055 - LOTE 2.47 ECV\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA\n" +
                "AV. EMANCIPACAO,5000,0\n" +
                "PARQUE DOS PINHEIROS\n" +
                " HORTOLANDIA - SP"
        },

    ]


    const transportadoras = ['Supersonic Logística e transportes LTDA', 'Brinks', 'EALE', 'IBL'];
    const tipoTransporte = ['Aéreo', 'Rodoviário', 'Multimodal'];
    const tipoSeguro = ['NA', "DDR - Compal", "DDR - Transportadora"];

    const [notaFiscal, setNotaFiscal] = useState("")
    const [altura, setAltura] = useState("")
    const [largura, setLargura] = useState("")
    const [comprimento, setComprimento] = useState("")
    const [pesoBruto, setPesoBruto] = useState("")
    const [pesoCubado, setPesoCubado] = useState("")
    const [localEnvio, setLocalEnvio] = useState("")
    const [localColeta, setLocalColeta] = useState("")

    function buttonCallback(){


        console.log(document.getElementById("N_pedido").value)

        const n_pedido = document.getElementById("N_pedido").value;

        if(n_pedido === "MAS2400484"){
            setNotaFiscal(dadosValidacao[0].notal_fiscal)
            // setAltura("1.2m")
            // setLargura("4m")
            // setComprimento("12m")
            setPesoBruto(dadosValidacao[0].peso_bruto)
            setPesoCubado(dadosValidacao[0].peso_cubado)
            setLocalEnvio(dadosValidacao[0].local_envio)
            setLocalColeta(dadosValidacao[0].local_coleta)
            alert("CTE válido")
        }

        if(n_pedido === "MAS2401025"){
            setNotaFiscal(dadosValidacao[1].notal_fiscal)
            // setAltura("1.2m")
            // setLargura("4m")
            // setComprimento("12m")
            setPesoBruto(dadosValidacao[1].peso_bruto)
            setPesoCubado(dadosValidacao[1].peso_cubado)
            setLocalEnvio(dadosValidacao[1].local_envio)
            setLocalColeta(dadosValidacao[1].local_coleta)
            alert("CTE válido")
        }

        if(n_pedido === "MCC2300206"){
            setNotaFiscal(dadosValidacao[2].notal_fiscal)
            // setAltura("1.2m")
            // setLargura("4m")
            // setComprimento("12m")
            setPesoBruto(dadosValidacao[2].peso_bruto)
            setPesoCubado(dadosValidacao[2].peso_cubado)
            setLocalEnvio(dadosValidacao[2].local_envio)
            setLocalColeta(dadosValidacao[2].local_coleta)
            alert("CTE válido")
        }

        if(n_pedido === "MAS2401026"){
            setNotaFiscal(dadosValidacao[3].notal_fiscal)
            setPesoBruto(dadosValidacao[3].peso_bruto)
            setPesoCubado(dadosValidacao[3].peso_cubado)
            setLocalEnvio(dadosValidacao[3].local_envio)
            setLocalColeta(dadosValidacao[3].local_coleta)
            alert("CTE inválido")
        }


        // console.log(document.getElementById("nota_fiscal"))
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
                <div className={'validation-main-card'}>
                    <CteValidationForm title={"Número do pedido"} placeholder={"Digite o número do pedido"} disabled={false} id={"N_pedido"}/>
                    <CteValidationForm title={"CTE"} placeholder={"Selecione um arquivo"} disabled={false} inputType={"file"} id={"N_CTE"}/>
                </div>
                <div className={'validation-main-card'}>
                    <ValidationDropdown title={"Transportadora"} dropdownData={transportadoras} id={"id_transportadora"}/>
                    <ValidationDropdown title={"Tipo de Transporte"} dropdownData={tipoTransporte} id={"id_tipo_transportadora"}/>
                    <ValidationDropdown title={"Tipo de Seguro"} dropdownData={tipoSeguro} id={"tipo_seguro"}/>
                </div>

                <div className={'validation-autofilled-div'}>
                    <div className={'form-title-text'}>
                        Informações auto-preenchidas
                    </div>
                    <div className={'validation-autofilled-card'}>
                            <CteValidationForm title={"Nota Fiscal"} placeholder={"-"} disabled={true} id={'nota_fiscal'} value={notaFiscal}/>
                            {/*<CteValidationForm title={"Altura"} placeholder={"-"} disabled={true} value={altura}/>*/}
                            {/*<CteValidationForm title={"Largura"} placeholder={"-"} disabled={true} value={largura}/>*/}
                            {/*<CteValidationForm title={"Comprimento"} placeholder={"-"} disabled={true} value={comprimento}/>*/}
                            <CteValidationForm title={"Peso bruto"} placeholder={"-"} disabled={true} value={pesoBruto}/>
                            <CteValidationForm title={"Peso cubado"} placeholder={"-"} disabled={true} value={pesoCubado}/>
                            <CteValidationForm title={"Local de envio"} placeholder={"-"} disabled={true} value={localEnvio}/>
                            <CteValidationForm title={"Local de coleta"} placeholder={"-"} disabled={true} value={localColeta}/>
                    </div>
                </div>
                <ValidationButton buttonCallback={buttonCallback}/>
            </div>
        </div>
    )
}