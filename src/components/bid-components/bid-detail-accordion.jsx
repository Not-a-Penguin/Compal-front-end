// import HistoryModalAccordionTable from "./history-modal-accordion-table.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import './history-modal-accordion.css'
import BidDetailAccordionTable from "./bid-detail-accordion-table.jsx";

export default function BidDetailAccordion(props) {

    if(props.data){
        return(
            <div>
                {props.data.map( (data, key) => {
                    return(
                        <Accordion key={key}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div className={'history-modal-accordion-title'}>
                                    {data.nome}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/*<HistoryModalAccordionTable data={data.tableData}/>*/}
                                <BidDetailAccordionTable data={data.seguros}/>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        )
    }
    else{
        return(
            <div>
            </div>
        )
    }
}