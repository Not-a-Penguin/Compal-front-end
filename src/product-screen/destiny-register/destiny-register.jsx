import ValidationForm from "../../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../../components/validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";
import ValidationButton from "../../components/validation-components/validation-button.jsx";
import ReactPaginate from "react-paginate";
import ProductRegisterTableRow from "../../components/product-components/product-register-table-row.jsx";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Bounce, toast, ToastContainer} from "react-toastify";
axios.defaults.baseURL = 'http://192.168.195.40:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function DestinyRegister(props) {

    const [cidade, setCidade] = useState("");
    const [centroDistribuicao, setCcentroDistribuicao] = useState("");
    const [updateTable, setUpdateTable] = useState(false)

    function addDestinyCallback(){
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        // console.log(document.getElementById("origin_register_cidade").value);
        axios.post('/destino',
            {
                "descricao": document.getElementById("destiny_register_cidade").value,
                // "aereporto": document.getElementById("origin_register_centro_dist").value,
            }, config).then(function (response) {
            if(response.status === 201){
                setUpdateTable(!updateTable)
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
    const [data, setData] = useState([])

    function deleteButtonCallback(id){
        alert(`Deleting data row of id = ${id}`)
        axios.delete(`/origem/${id}`).then(function (response) {
            console.log(response);
        })
    }

    useEffect(() => {
        console.log("Page changed to", currentPage);
        // setData(fakeData);
        axios.get(`/destino?page=${currentPage}`).then((response) => {
            console.log(response.data[0]);
            setData(response.data[0])
        });
    }, [currentPage, updateTable]);

    function Items({ currentItems }) {
        // currentItems = currentItems.slice(1, currentItems.length);
        if(currentItems){
            return(
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <table className={'history-table'}>
                        <thead>
                        <tr className={'table-row-header'}>
                            <th>Cidade</th>
                            {/*<th>Ações</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, key) => {
                            const columns = [item.descricao];
                            return(<ProductRegisterTableRow key={key} data={item} columns={columns}
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
                        <ValidationForm title={"Cidade"} placeholder={"Digite o nome da cidade"}
                                        disabled={false} id={"destiny_register_cidade"} value={cidade}/>
                    </div>
                    {/*<div className={'validation-main-card-column'}>*/}
                    {/*    <ValidationForm title={"Centro de distribuição"} placeholder={"Digite o centro de distribuição"}*/}
                    {/*                    disabled={false} id={"destiny_register_cidade"} value={centroDistribuicao}/>*/}
                    {/*</div>*/}
                </div>
                <ValidationButton title={'Salvar'} buttonCallback={addDestinyCallback}/>
            </div>
            <br/>
            <div className={'menu-selector-subtitle'}>Destinos cadastrados</div>
            <div className={'history-screen-border'}>
                <Items currentItems={data['destinos']}/>
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