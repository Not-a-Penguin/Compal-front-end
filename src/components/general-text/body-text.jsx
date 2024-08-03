import '../form/login.css'

/*manipular textos*/
function BodyText(props){
    return(
        <div className={"signup-link"}>
          <p>{props.text} <a href="#">{props.text2}</a>
          </p> 
          
        </div>
    )
}
export default BodyText;