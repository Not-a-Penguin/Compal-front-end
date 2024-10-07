import ValidationForm from "../../components/validation-components/validation-form/cte-validation-form.jsx";
import ValidationDropdown from "../../components/validation-components/validation-form/validation-dropdown.jsx";
import {useEffect, useState} from "react";
import ValidationButton from "../../components/validation-components/validation-button.jsx";
import axios from "axios";
import ProductRegisterTableRow from "../../components/product-components/product-register-table-row.jsx";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";

export default function TransporterRegister(props) {

    const [transportadora, setTransportadora] = useState("");

    function addTransporterCallback(){
        const config = {
            headers: {'Content-Type': 'application/json'}
        };
        // console.log(document.getElementById("origin_register_cidade").value);
        axios.post('/transportadora',
            {
                "descricao": document.getElementById("register_transportadora").value,
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
        axios.delete(`/transportadora/${id}`).then(function (response) {
            console.log(response);
        })
    }

    const fakeData = [
        {
            "currentPage": 1,
            "totalPages": 2
        },
        {
            'cidade': 'Minas Morgul',
            'centroDist': 'nazgul',
            'id': 1203
        },
        {
            'cidade': 'O condado',
            'centroDist': 'hobbit',
            'id': 12314
        },
        {
            'cidade': 'Mordor',
            'centroDist': 'Cavalo',
            'id': 12314
        }
    ]

    useEffect(() => {
        console.log("Page changed to", currentPage);
        setData(fakeData);
        axios.get(`/transportadora?page=${currentPage}`).then((response) => {
            console.log(response.data[0]);
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
                        <ValidationForm title={"Nome"} placeholder={"Digite o nome da transportadora"}
                                        disabled={false} id={"register_transportadora"} value={transportadora}/>
                    </div>
                </div>
                <ValidationButton title={'Salvar'} buttonCallback={addTransporterCallback}/>
            </div>
            <br/>
            <div className={'menu-selector-subtitle'}>Transportadoras cadastradas</div>
            <div className={'history-screen-border'}>
                <Items currentItems={data['transportadoras']}/>
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