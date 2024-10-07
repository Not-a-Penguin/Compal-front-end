import '../history-screen/history-screen.css'
import '../history-screen/pagination.css'
import '/src/components/history-components/table-row-header-style.css'

import HistoryScreenButton from "../components/history-components/history-screen-button/history-screen-button.jsx";

import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";
import BidTableRow from "../components/bid-components/bid-table-row.jsx";
import BidModalFill from "../components/bid-components/bid-modal-fill.jsx";
import BidDetailModal from "../components/bid-components/bid-detail-modal.jsx";
import AddBidModal from "../components/bid-components/add-bid-modal.jsx";

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.195.40:3333';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function BidScreen(props) {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(0);

    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openAddBid, setOpenAddBid] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleOpenDetail = () => setOpenDetail(true);
    const handleOpenAddBid = () => setOpenAddBid(true);

    const handleClose = () => setOpen(false);
    const handleCloseDetail = () => setOpenDetail(false)
    const handleCloseAddBid = ()=> setOpenAddBid(false)

    function buttonStatus(id){
        console.log("Id current = ", id);
        setCurrentId(id);
    }

    const handlePageChange = (selectedPage) => {
        console.log("Page selected: ", selectedPage.selected);
        setCurrentPage(selectedPage.selected);
    };

    useEffect(() => {
        axios.get(`/bid?page=${currentPage}`).then((response) => {
            console.log(response.data);
            setData(response.data[0]);
        });
    }, [currentPage]);

    function Items({ currentItems }) {
        // console.log(currentItems)

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
                        <BidTableRow key={key} data={item} fillBidButton={function(){
                            console.log("Fill Button pressed")
                            buttonStatus(item.id);
                            handleOpen();
                        }} detailBidButton={function(){
                            console.log("Detail Bid pressed");
                            buttonStatus(item.id);
                            handleOpenDetail();
                        }}/>
                        // <div key={item.id}>{item.N_cte}</div>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    function addBidCallback(){
        handleOpenAddBid();
    }

    return(
        <>
            <AddBidModal handleClose={handleCloseAddBid} handleOpen={openAddBid}/>
            <BidModalFill handleClose={handleClose} handleOpen={open} id={currentId}/>
            <BidDetailModal handleClose={handleCloseDetail} handleOpen={openDetail} id={currentId}/>

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

                {data['bids'] ? <Items currentItems={data['bids']} /> : <div/>}

                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginRight: '20px',
                }}>
                    <ReactPaginate
                        activeClassName={'item active'}
                        breakClassName={'item break-me'}
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
                        pageCount={data['totalPages']}
                        pageClassName={'item pagination-page '}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={{ fontSize: 10, width: 15 }} />}
                    />
                </div>
            </div>
        </>
    )
}