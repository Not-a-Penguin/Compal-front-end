import './history-screen.css'
import './pagination.css';
import "react-datepicker/dist/react-datepicker.css";
import '/src/components/history-components/table-row-header-style.css'

import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import {ptBR} from "date-fns/locale/pt-BR";
// import HistoryScreenButton from "../components/history-components/history-screen-button/history-screen-button.jsx";
import TableRow from "../components/history-components/table-row.jsx"
import HistoryModal from "../components/history-components/history-modal/history-modal.jsx";

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.195.197:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

registerLocale('pt-br', ptBR)
setDefaultLocale('pt-br');

export default function HistoryScreen(){

    // const [startDate, setStartDate] = useState(new Date());
    //
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [currentStatus, setCurrentStatus] = useState("Inválido")
    // const [totalPages, setTotalPages] = useState(0);

    // const itemsPerPage = 10;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function buttonStatus(Status, id){
        console.log("Id current = ", id);
        if(Status === "Inválido"){
            console.log("invalid")
            setCurrentStatus("Inválido");
        }
        else{
            console.log("valid")
            setCurrentStatus("Válido");
        }
        setCurrentId(id);
    }

    useEffect(() => {
        console.log("Page changed to", currentPage);
        // console.log("Hi there")
        axios.get(`/validacao?page=${currentPage}`).then((response) => {
            setData(response.data);
            // setTotalPages(data.totalPages);
            // console.log(response)
        });
    }, [currentPage]);

    function Items({ currentItems }) {
        // currentItems = currentItems.slice(1, currentItems.length);

        currentItems = data['validacoes'];
        currentItems = data['validacoes'];
        // console.log("Inside Items")
        // console.log(currentItems);

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
                            <th>N° do pedido</th> <th>N° do CTE</th> <th>Transportadora</th> <th>Qtd. de notas fiscais</th> <th>Valor total do CTE</th>
                            <th>Remetente</th> <th>Destinatário</th> <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, key) => (
                            <TableRow key={key} data={item} buttonStatus={function () {
                                buttonStatus(item.status, item.id);
                                handleOpen();
                            }}/>
                        ))}
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

    return (
        <>
            <HistoryModal handleClose={handleClose} handleOpen={open} id={currentId} status={currentStatus}/>
            <div className={'history-screen-header'}>
                <div className={'history-header-text'}>
                    Histórico
                </div>
            </div>

            <div className={'history-screen-border'}>
                <div className={'history-screen-table-header'}>
                    <div className={'history-table-header-title'}>
                        Histórico de validações
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        {/*<DatePicker*/}
                        {/*    className={'history-datepicker'}*/}
                        {/*    icon={<img src={'src/assets/calendar-icon.svg'} alt={'calendar'}/>}*/}
                        {/*    showIcon*/}
                        {/*    dateFormat={'dd/MM/yyyy'}*/}
                        {/*    onChange={(date) => setStartDate(date)}*/}
                        {/*    placeholderText="Selecione uma data"*/}
                        {/*/>*/}
                        {/*<HistoryScreenButton text={"Filtrar"} icon={'src/assets/filter-icon.svg'}/>*/}
                        {/*<HistoryScreenButton text={"Exportar"} icon={'src/assets/export-icon.svg'}/>*/}
                    </div>
                </div>

                <Items currentItems={data} />

                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
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
                        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 10, width: 15 }} />}
                        // onPageChange={handlePageClick}
                        onPageChange={handlePageChange}
                        forcePage={currentPage}
                        // pageCount={pageCount}
                        pageCount={parseInt(data['totalPages'])}
                        pageClassName={'item pagination-page '}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={{ fontSize: 10, width: 15 }} />}
                    />
                </div>
            </div>
        </>
    )
}