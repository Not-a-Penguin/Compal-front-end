import '../button-primary/button-style.css';

function ButtonPrimary(props){
  return(
    <button className='button-primary' onClick={props.action}>
      <div className='button-text'>{props.text}</div>
    </button>
  )
}
export default ButtonPrimary;