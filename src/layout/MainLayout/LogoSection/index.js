import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import logo from '../../../assets/images/auth/Repair_Notification-removebg-preview.png'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    // <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        
         <image src={logo}  width="100"/>
    // </ButtonBase>
);

export default LogoSection;
