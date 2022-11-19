import * as React from 'react';
// import styles from './PortfolioProfiles.module.scss';
import { IPortfolioProfilesProps } from './IPortfolioProfilesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import PopupOfdata from './PopupOfdata/PopupOfdata';
import Portfolio from './PopupOfdata/TestWithDiff/Difff';
// import Groupby from './GroupByz';
import GetData from './GetCall';
import MyTable from './Tailwindc';
import Portfoliop from './PortfolioProfile/Portfoliop';
import DatasubComp from './PortfolioProfile/DataSub';
import App from './PortfolioProfile/Arraypass';
import SmartFilter from './PortfolioProfile/SmartFilter';
import Groupby from './GroupBy';
export default class PortfolioProfiles extends React.Component<IPortfolioProfilesProps, {}> {
  public render(): React.ReactElement<IPortfolioProfilesProps> {
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
        <Portfolio ID={325}/>
         
       
        {/* <DatasubComp/> */}
        {/* <Groupby/> */}


        </div>

    );
  }
}
