import { Link } from 'react-router-dom';
import '../form/login.css'

/*manipular textos*/
function BodyText(props){
    return(
        <div className={"signup-link"}>
          <p>{props.text} <Link>{props.text2}</Link>
          </p> 
          
        </div>
    )
}
export default BodyText;