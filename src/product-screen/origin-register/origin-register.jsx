import ValidationForm from "../../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../../components/validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";
import ValidationButton from "../../components/validation-components/validation-button.jsx";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";
import TableRow from "../../components/history-components/table-row.jsx";
import ProductRegisterTableRow from "../../components/product-components/product-register-table-row.jsx";

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.195.40:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function OriginRegister(props) {

    const [cidade, setCidade] = useState("");
    const [centroDistribuicao, setCcentroDistribuicao] = useState("");

    function addOriginCallback(){
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        // console.log(document.getElementById("origin_register_cidade").value);
        axios.post('/origem',
            {
                "descricao": document.getElementById("origin_register_cidade").value,
                // "aereporto": document.getElementById("origin_register_centro_dist").value,
            }, config).then(function (response) {
            console.log(response);
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
        // console.log("Page changed to", currentPage);
        // setData(fakeData);
        axios.get(`/origem?page=${currentPage}`).then((response) => {
            // console.log(response.data[0]);
            setData(response.data[0])
        });
    }, [currentPage]);

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
                            <th>Cidade</th> <th>Ações</th>
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
                                        disabled={false} id={"origin_register_cidade"} value={cidade}/>
                    </div>
                    {/*<div className={'validation-main-card-column'}>*/}
                    {/*    <ValidationForm title={"Centro de distribuição"} placeholder={"Digite o centro de distribuição"}*/}
                    {/*                    disabled={false} id={"origin_register_centro_dist"} value={centroDistribuicao}/>*/}
                    {/*</div>*/}
                </div>
                <ValidationButton title={'Salvar'} buttonCallback={addOriginCallback}/>
            </div>
            <br/>
            <div className={'menu-selector-subtitle'}>Origens cadastradas</div>
            <div className={'history-screen-border'}>
                <Items currentItems={data['origens']}/>
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
        </div>
    )
}