import * as React from 'react';
import {FaRegEdit, FaTimes} from  'react-icons/fa';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Tooltip from '../popup';
import './PopUpofdata.css';
// import TabGroup from './Pop';
// import App from './Test/App';
import App from './TestWithDiff/App';
function PopupOfdata() {

    return(
    <div>
        <Popup
        trigger={ <FaRegEdit/> }
        modal
        nested
        contentStyle={{ width: '90%' , height:'100%',top: "0%"}}
      >
            {(close: React.MouseEventHandler<HTMLButtonElement>) => (
        <div>
           <div>
            <div style={{fontSize: "x-large"}}>
            <strong>Team-Portfolio Contact Database</strong>
            <div style={{position:"absolute",top:"7px"}}>
                   <div style={{position: 'fixed',left: '79%'}} ><Tooltip/></div>
        
        <button type='button'  style={{ position: 'fixed', left: '85%',fontSize: "15px",background: "none",border: "none"}} onClick={close}><FaTimes/>
        </button>
                   </div>
                   </div>
                   <div>
                
                    {/* <TabGroup/> */}
                    <App/>
  
                   </div>
                   <div style={{fontSize: "large"}}>
      <div  style={{position: 'absolute',top: '80%'}}>
        <p>Created 16/09/2022 by <a href="#">Anubhav Shukla</a></p>
        <p>Last Modified --- by <a href="#">....</a></p>
        <p><FaTimes/><a href="#">Delete this item</a></p>
      </div>
      <div    style={{ position: 'absolute',left: '44%',top: '80%'}}>
        <span><a href="#">Go to the profile page||</a></span>
        <span><a href="#">Share this task ||</a></span>
        <span><a href="#">Open out-of-the-box form</a></span>
        <span><button type='button' >Save</button></span>
        <span><button type="button" onClick={close}>Cancel</button></span>
      </div>
     </div>
                   </div>
                   </div>
         
  )}
         </Popup>    
         </div>


        )}

export default PopupOfdata;