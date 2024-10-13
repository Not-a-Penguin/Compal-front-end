import ValidationForm from "../../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../../components/validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";
import ValidationButton from "../../components/validation-components/validation-button.jsx";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";
import axios from "axios";
import ProductRegisterTableRow from "../../components/product-components/product-register-table-row.jsx";
import {Bounce, toast, ToastContainer} from "react-toastify";

export default function ProductRegister(props) {

    const [partNumberCompal, setPartNumberCompal] = useState("");
    const [partNumberCliente, setPartNumberCliente] = useState("");
    const [pesoUnitario, setPesoUnitario] = useState("");
    const [dimensaoCaixa, setDimensaoCaixa] = useState("");
    const [quantidadeCaixas, setQuantidadeCaixas] = useState("");

    const embalagemData = ['tipo 1', 'tipo 2', 'tipo 3', 'tipo 4'];

    function addProductCallback(){
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        // console.log(document.getElementById("origin_register_cidade").value);
        axios.post('/produto',
            {
                "partNumber": document.getElementById("partNumber").value,
                "dimensaoCaixa": document.getElementById("dimensaoCaixa").value,
                "standard": document.getElementById("standard").value,
                "upper": document.getElementById("upper").value,
                "lower": document.getElementById("lower").value,
                "quantidadeMax": document.getElementById("quantidadeMax").value,
            }, config).then(function (response) {
                console.log(response);
                if(response.status === 201){
                    toast.success(
                        <div style={{textAlign: 'left'}}>
                            <div>
                                <div> </div>
                                Salvo com sucesso. <br /><br />
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
                }
            }).catch(function(err){
            toast.error(
                <div style={{textAlign: 'left'}}>
                    <div>
                        <div> </div>
                        Operação falhou.. <br /><br />
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

    // -----------------------------------------------------------------------------------------------------------------

    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [currentStatus, setCurrentStatus] = useState("Inválido")
    const [data, setData] = useState([{'totalPages': 0}])

    // function deleteButtonCallback(id){
    //     alert(`Deleting data row of id = ${id}`)
    // }

    useEffect(() => {
        // console.log("Inside use effect add product")
        axios.get(`/produto?page=${currentPage}`).then((response) => {
            setData(response.data[0])
            // console.log(response.data[0])
        });
    }, [currentPage]);

    function Items({ currentItems }) {

        // let items = currentItems.slice(1, currentItems.length);

        if(currentItems){
            return(
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // // alignItems: 'stretch',
                    // justifyContent: 'space-evenly'
                }}>
                    <table className={'history-table'}>
                        <thead>
                        <tr className={'table-row-header'}>
                            <th>Partnumber</th> <th>Dimensão da caixa</th> <th> Peso Standard</th> <th>Peso Upper</th> <th>Peso Lower</th>
                            <th>Qtd. máxima de caixas</th>
                            {/*<th>Ações</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, key) => {
                            const columns = [item['partNumber'], item['dimensaoCaixa'], item['standard'], item['upper'], item['lower'], item['quantidadeMax']];
                            return(<ProductRegisterTableRow key={key} data={item} columns={columns} noDelete={1}
                                 buttonStatus={function () {
                                     deleteButtonCallback(item.id);
                                     //     handleOpen();
                                 }}/>
                            )})}
                        </tbody>
                    </table>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    const handlePageChange = (selectedPage) => {
        // console.log("Page selected: ", selectedPage.selected);
        setCurrentPage(selectedPage.selected);
    };

    return(
        <div>
            <div className={'menu-selector-subtitle'}>
                {props.subtitle}
            </div>
            <div className={'history-screen-border'}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <div className={'validation-main-card-column'}>
                        <ValidationForm title={"Partnumber"} placeholder={"Digite o partnumber"} disabled={false} id={"partNumber"} value={partNumberCompal}/>
                        <ValidationForm title={"Peso Upper"} placeholder={"Digite a dimensão da caixa"} disabled={false} id={"upper"} value={dimensaoCaixa}/>
                    </div>
                    <div className={'validation-main-card-column'}>
                        <ValidationForm title={"Dimensão da caixa"} placeholder={"Digite o partnumber"}
                                        disabled={false} id={"dimensaoCaixa"} value={partNumberCliente}/>
                        <ValidationForm disabled={false} placeholder={"Digite o lower"} title={"Peso Lower"} dropdownData={embalagemData} id={"lower"}/>
                    </div>
                    <div className={'validation-main-card-column'}>
                        <ValidationForm title={"Peso Standard"} placeholder={"Digite o peso unitário"}
                                        disabled={false} id={"standard"} value={pesoUnitario}/>
                        <ValidationForm title={"Qtd. máxima por caixa"} placeholder={"Digite a quantidade."}
                                        disabled={false} id={"quantidadeMax"} value={quantidadeCaixas}/>
                    </div>
                </div>
                <ValidationButton title={'Salvar'} buttonCallback={addProductCallback}/>
            </div>
            <br/>
            <div className={'menu-selector-subtitle'}>Produtos cadastrados</div>
            <div className={'history-screen-border'}>
                <Items currentItems={data['produtos']}/>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '20px',
                }}>
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        nextClassName={"item next "}
                        nextLabel={<ArrowForwardIosIcon style={{fontSize: 10, width: 15}}/>}
                        // onPageChange={handlePageClick}
                        onPageChange={handlePageChange}
                        forcePage={currentPage}
                        // pageCount={pageCount}
                        pageCount={parseInt(data['totalPages'])}
                        pageClassName={'item pagination-page '}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={{fontSize: 10, width: 15}}/>}
                    />
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