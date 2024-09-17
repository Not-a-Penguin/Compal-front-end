import '../history-screen/history-screen.css'
import '../history-screen/pagination.css'
import '/src/components/history-components/table-row-header-style.css'

import HistoryScreenButton from "../components/history-components/history-screen-button/history-screen-button.jsx";

import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";
import BidTableRow from "../components/bid-components/bid-table-row.jsx";
import BidModalFill from "../components/bid-components/bid-modal-fill.jsx";

export default function BidScreen(props) {

    const items = [
        {
            "currentPage": 23,
            "Total Pages": 6
        },
        {   "id": 1,
            "transportadora": 'Sedex',
            "origem": "Manaus amazonas",
            "destino": "Belém Pará"
        },
        {   "id": 2,
            "transportadora": 'Águias',
            "origem": "Gondor",
            "destino": "Mordor"
        },
    ];

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function buttonStatus(id){
        // console.log("Id current = ", id);
        setCurrentId(id);
    }

    const handlePageChange = (selectedPage) => {
        // console.log("Page selected: ", selectedPage.selected);
        setCurrentPage(selectedPage.selected);
    };

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
                            Transportadora
                        </th>
                        <th>
                            Origem
                        </th>
                        {/*<th>*/}
                        {/*    N° da nota fiscal*/}
                        {/*</th>*/}
                        <th>
                            Destino
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, key) => (
                        <BidTableRow key={key} data={item} buttonStatus={function(){
                            console.log("Button pressed")
                            buttonStatus(item.id);
                            handleOpen();
                        }}/>
                        // <div key={item.id}>{item.N_cte}</div>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    function addBidCallback(){
        return 0
    }

    return(
        <>
            <BidModalFill handleClose={handleClose} handleOpen={open} id={currentId}/>
            <div className={'history-screen-header'}>
                <div className={'history-header-text'}>
                    Consultar BIDs cadastrados
                </div>
            </div>

            <div className={'history-screen-border'}>
                <div className={'history-screen-table-header'}>
                    <div className={'history-table-header-title'}>
                        BIDs cadastrados
                    </div>
                    <HistoryScreenButton text={"Adicionar"} icon={'src/assets/sidebar-icons/plus-symbol-green.svg'} onClick={addBidCallback}/>
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