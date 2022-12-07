import * as React from 'react';
// import styles from './PortfolioProfiles.module.scss';
import { IPortfolioProfilesProps } from './IPortfolioProfilesProps';
import { escape } from '@microsoft/sp-lodash-subset';
// import Groupby from './GroupByz';
import GetData from './GetCall';
import MyTable from './Tailwindc';
import Portfoliop from './PortfolioProfile/Portfoliop';
import DatasubComp from './PortfolioProfile/DataSub';
import App from './PortfolioProfile/Arraypass';
import SmartFilter from './PortfolioProfile/SmartFilter';
import Groupby from './GroupBy';
import "bootstrap/dist/css/bootstrap.min.css";
import Portfolio from './PopupOfdata/TestWithDiff/Portfoliop.tsx';
export default class PortfolioProfiles extends React.Component<IPortfolioProfilesProps, {}> {
  public render(): React.ReactElement<IPortfolioProfilesProps> {

    const refreshPage = ()=>{
      window.location.reload();
   }
 
  function getQueryVariable(variable:any)
  {
          var query = window.location.search.substring(1);
          console.log(query)//"app=article&act=news_content&aid=160990"
          var vars = query.split("&");
         
          console.log(vars) 
          for (var i=0;i<vars.length;i++) {
                      var pair = vars[i].split("=");
                      console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
          if(pair[0] == variable){ return pair[1];}
           }
           return(false);
           
           
  }
  

    return (
      <div>     
         {/* <h1>Portfolio Profile</h1> */}
      {/* <App/> */}
      {/* <DatasubComp/> */}
      {/* <SmartFilter/> */}
      {/* <Groupby/> */}
        {/* <PopupOfdata/> */}
        {/* <MyTable/> */}
        {/* <Portfoliop/> */}
        <Portfolio ID={getQueryVariable('taskId')}/>
         
       
        {/* <DatasubComp/> */}
        {/* <Groupby/> */}


        </div>

    );
  }
}
