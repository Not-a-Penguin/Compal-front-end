import HistoryModalAccordionTable from "./history-modal-accordion-table.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import './history-modal-accordion.css'

export default function HistoryModalAccordion(props) {


    // console.log(props.data)

    if(props.data){
        // console.log("Hello");
        // console.log(props.data);
        const notasFiscais = [];
        props.data.forEach((element) => {
            notasFiscais.push(element);
        });
        // console.log(pedidos);

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
                            <HistoryModalAccordionTable data={nota.items}/>
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