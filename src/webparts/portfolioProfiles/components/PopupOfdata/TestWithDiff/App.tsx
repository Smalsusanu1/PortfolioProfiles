import * as React from 'react';
import Tabs from "./Tabs"
import Tab from "./Tab"
import './styles.css';
import SelectServices from './SelectServices/SelectServices';
import SelectCategories from "./SelectCategories/SelectCategories";
import Portfolio from './Portfoliop.tsx';

function App() {
  return (
       

        
     


    <Tabs >
      <Tab title="BASIC INFORMATION" >
        <div style={{background:'#f5f5f5',fontSize: "large"}}>
      <div style={{display: "flex"}}>
        
        <span >
        <strong>Title</strong>
        <br></br>
        <input   defaultValue={"Component-Portfolio"}/>
        </span>

       <span className="margin"> 
        <strong>Item Rank</strong>
        <br></br> 
        <select  id="item-Rank">
  <option value="Top">(7) Top Highlights</option>
  <option value="Featured">(6) Featured Item</option>
  <option value="Key">(5) Key Item</option>
  <option value="Relevant" >(4) Relevant Item</option>
  <option value="Featured">(3) Unsure</option>
  <option value="Relevant" >(2) to be verified</option>
  <option value="Featured">(1) Archieve</option>
  <option value="Key">(0) No Show</option>
</select> 
</span>
<span className="margin">
        <strong >Priority</strong>
        <br></br>
        <input  value={"4"}/>
        </span>
        </div> 
       

        <div style={{display: "flex"}}>
       <span >
        <strong>Service Portfolio</strong>
        <br></br>
        <span><input    /><SelectServices/></span>
        </span>
        <span className="margin">
        <strong>Deliverable-Synonyms</strong>
        <br></br>
        <input   value={"Contact Database"} />
        </span>
        <span className="margin">
        <ul >
        <input type="radio" name="site_name" value="High" /><label>High</label>
        <input type="radio" name="site_name" value="Normal"/><label>Normal</label>
        <input type="radio" name="site_name" value="Low"/><label>Low</label>
        </ul>
        </span>

      

       </div>



       <div>
        <button type="button" style={{background:"Green"}}>Integration of Distribution Lists *</button>
       </div>
       <div style={{display: "flex"}}>
       <span >
        <strong>Start Date</strong>
        <br></br>
        <input  type="Date" />
        </span>
        <span className="margin">
        <strong>Due Date</strong>
        <br></br>
        <input  type="Date"  />
        </span>
        <span className="margin">
        <strong>Completion Date</strong>
        <br></br>
        <input  type="Date"  />
        </span>
        <span className="margin">
        <strong>Categories</strong>
        
        <br></br> 
        <span><input  type="text"  /><SelectCategories/></span>
        <ul >
        <input type="checkbox" name="site_name" value="Phone"/><label>Phone</label>
        <input type="checkbox" name="Email " value="Email"/><label>Email Notification</label>
        <input type="checkbox" name="Approval" value="Approval"/><label>Approval</label>
        <input type="checkbox" name="Immediate"  value="Immediate"/><label>Immediate</label>
        </ul>
        </span>
       </div >
        

        <div style={{display: "flex"}}> 
        <span >
        <strong>Synonyms</strong>
        <br></br>
        <input  type="text"  />
        </span>
        <span className="margin">
        <strong>Client Activity</strong>
        <br></br>
         </span>
         <span className="margin">
        <strong>Package</strong>
        <br></br>
        <input  type="text"  />
        </span>
        </div>
        <div style={{display: "flex"}}>
        <span >
        <strong>Status</strong>
        <br></br>
        <input placeholder="status" type="text" style={{width: '37%', height:'45%'}} />
        <ul >
        <input type="radio"  name="site_name"   value="Nots"/><label>Not Started</label>
        <input type="radio"  name="site_name"   value="Inp"/><label>In Preparation</label>
        <input type="radio"  name="site_name"  value="InD"/><label>In Development</label>
        <input type="radio"  name="site_name"   value="Active"/><label>Active</label>
        <input type="radio"  name="site_name"   value="Archived"/><label>Archived</label>
        </ul>
        </span>
        <span className="margin">
        <strong>Task Users</strong>
        <br></br>
        <strong>Time</strong>
        <input placeholder="Time" type="text" style={{width: '45%', height:'45%'}} />
        <ul >
        <input type="radio" name="site_name"  value="VeryQ"/><label>Very Quick</label>
        <input type="radio" name="site_name"  value="Quick"/><label>Quick</label>
        <input type="radio" name="site_name"  value="Medium"/><label>Medium</label>
        <input type="radio" name="site_name" value="Long"/><label>Long</label>
        </ul>

        </span>
        </div>
        <div >
        <input style={{width: '80%', height:'45%',marginTop: "17px"}} type="url" placeholder="URL"/>
        </div>
       </div>
      
      </Tab>
      <Tab title="CONCEPT">CONCEPT<Portfolio/></Tab>
      <Tab title="ARCHITECTURE & TECHNOLOGIES">ARCHITECTURE & TECHNOLOGIES</Tab>
      <Tab title="HELP">HELP</Tab>
      <Tab title="TEST CASES">TEST CASES</Tab>
      <Tab title="IMAGE INFORMATION">IMAGE INFORMATION</Tab>
    </Tabs>
  )
}
export default App;