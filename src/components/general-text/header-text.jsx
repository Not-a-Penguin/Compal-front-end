/*import './text.css'*/
import '../form/login.css'

function HeaderText(props){
    return(    
        <div>
            <h1 className={"container"}>
            {props.text}
            </h1>
        </div>
    )   
}
export default HeaderText;
