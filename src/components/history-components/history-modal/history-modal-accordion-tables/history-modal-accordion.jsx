import HistoryModalAccordionTable from "./history-modal-accordion-table.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import './history-modal-accordion.css'

export default function HistoryModalAccordion(props) {

    if(props.data){
        const notasFiscais = [];
        props.data.forEach((element) => {
            notasFiscais.push(element);
        });

        return(
            <div>
                {notasFiscais.map( (nota, key) => {
                    return(
                        <Accordion key={key}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <div className={'history-modal-accordion-title'}>
                                Dados da nota {nota.n_nota}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <HistoryModalAccordionTable data={nota.items} transportadora={props.transportadora}/>
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