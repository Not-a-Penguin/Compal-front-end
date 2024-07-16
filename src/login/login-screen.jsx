import GeneralText from '../components/general-text/general-text.jsx';
import SecondText from '../components/general-text/second-text.jsx';
import Logo from '../components/logo/logo.jsx';
import Field from '../components/fields/field.jsx';
import IconC from '../components/logo/icon.jsx';

function InitialLogin(){
    
    return(
        <div>
            <Logo/>
            <IconC/>
            <GeneralText/>
            <SecondText/>
            <Field/>
            
        </div>      
    )
}
export default InitialLogin;

