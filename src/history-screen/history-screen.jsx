import './history-screen.css'
import './pagination.css';
import "react-datepicker/dist/react-datepicker.css";
import '/src/components/history-components/table-row-header-style.css'

import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import {ptBR} from "date-fns/locale/pt-BR";
import HistoryScreenButton from "../components/history-components/history-screen-button/history-screen-button.jsx";
import TableRow from "../components/history-components/table-row.jsx"
import HistoryModal from "../components/history-components/history-modal/history-modal.jsx";

import axios from "axios";
registerLocale('pt-br', ptBR)
setDefaultLocale('pt-br');

export default function HistoryScreen(){

    const [startDate, setStartDate] = useState(new Date());

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [currentStatus, setCurrentStatus] = useState("Inválido")
    // const [totalPages, setTotalPages] = useState(0);

    // const itemsPerPage = 10;

    const items = [
        {
            "currentPage": 23,
            "Total Pages": 6
        },
        {   "id": 1,
            "N_pedido": "MAS2400484",
            "N_cte": "54681",
            "N_nota_fiscal": "-",
            "Valor_total_cte": "559,07 R$",
            "Local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA\n" +
                "AV. EMANCIPACAO,5000, 0\n" +
                "PARQUE DOS PINHEIROS\n" +
                "HORTOLÂNDIA - SP",
            "Local_destino": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI, 1.055\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "Status": "Válido"
        },
        {
            "id": 2,
            "N_pedido": "MAS2401025",
            "N_cte": "56558",
            "N_nota_fiscal": "91011",
            "Valor_total_cte": "7.388,65 R$",
            "Local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA\n" +
                "AV. EMANCIPACAO,5000, 0\n" +
                "PARQUE DOS PINHEIROS\n" +
                "HORTOLÂNDIA - SP",
            "Local_destino": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI, 1.055\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "Status": "Válido"
        },
        {
            "id": 3,
            "N_pedido": "MCC2300206",
            "N_cte": "56557",
            "N_nota_fiscal": "91011",
            "Valor_total_cte": "19.733,81 R$",
            "Local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA\n" +
                "AV. EMANCIPACAO,5000, 0\n" +
                "PARQUE DOS PINHEIROS\n" +
                "HORTOLÂNDIA - SP",
            "Local_destino": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI, 1.055\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "Status": "Válido"
        },
        {
            "id": 4,
            "N_pedido": "MAS2401026",
            "N_cte": "56570",
            "N_nota_fiscal": "91011",
            "Valor_total_cte": "5.927,85 R$",
            "Local_coleta": "SYNCREON SOLUCOES LOGISTICAS LTDA\n" +
                "AV. EMANCIPACAO,5000, 0\n" +
                "PARQUE DOS PINHEIROS\n" +
                "HORTOLÂNDIA - SP",
            "Local_destino": "COMPALEAD ELETRONICA DO BRASIL INDUSTRIA E COMERCIO LTDA\n" +
                "JAVARI, 1.055\n" +
                "DISTRITO INDUSTRIAL\n" +
                "MANAUS - AM",
            "Status": "Inválido"
        },
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function buttonStatus(Status, id){
        // console.log("Id current = ", id);
        if(Status === "Inválido"){
            setCurrentStatus("Inválido");
        }
        else{
            setCurrentStatus("Válido");
        }
        setCurrentId(id);
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
            // setData(response.data);
            // console.log(response.data)
            console.log("updating data")
            setData(items);
            // console.log("Items: ")
            // console.log(items);
            // setTotalPages(Math.ceil(items.data.length / itemsPerPage));
        });
    }, [currentPage]);

    function Items({ currentItems }) {
        currentItems = currentItems.slice(1, currentItems.length);
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'normal',
                justifyContent: 'space-evenly'
            }}>
                <table>
                    <thead>
                    <tr className={'table-row-header'}>
                        <th>
                            N° do pedido
                        </th>
                        <th>
                            N° do CTE
                        </th>
                        {/*<th>*/}
                        {/*    N° da nota fiscal*/}
                        {/*</th>*/}
                        <th>
                            Valor total do CTE
                        </th>
                        <th>
                            Local de origem
                        </th>
                        <th>
                            Local de destino
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, key) => (
                            <TableRow key={key} data={item} buttonStatus={function(){
                                buttonStatus(item.Status, item.id);
                                handleOpen();
                            }}/>
                            // <div key={item.id}>{item.N_cte}</div>
                        ))}
                    </tbody>
                </table>
            </div>
        )
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
                        <DatePicker
                            className={'history-datepicker'}
                            icon={<img src={'src/assets/calendar-icon.svg'} alt={'calendar'}/>}
                            showIcon
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Selecione uma data"
                        />
                        <HistoryScreenButton text={"Filtrar"} icon={'src/assets/filter-icon.svg'}/>
                        <HistoryScreenButton text={"Exportar"} icon={'src/assets/export-icon.svg'}/>
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
                        pageCount={items[0]['Total Pages']}
                        pageClassName={'item pagination-page '}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={{ fontSize: 10, width: 15 }} />}
                    />
                </div>
            </div>
        </>
    )
}