import * as React from 'react';
import * as $ from 'jquery';
import { MdAdd } from 'react-icons/Md';
// import Books from './Arraypass';
export default function DatasubComp() {
    const  [data, setTaskData] = React.useState([]);
   
    

    React.useEffect(() => {
        // and(Id eq 321)
    var url = "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('EC34B38F-0669-480A-910C-F84E92E58ADF')/items?$select=Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type%20eq%20%27Component%27)%20or%20(Item_x0020_Type%20eq%20%27SubComponent%27)%20or%20(Item_x0020_Type%20eq%20%27Feature%27))and%20(Portfolio_x0020_Type%20eq%20%27Component%27)&$top=4999";
    var response:any =[];  // this variable is used for storing list items
    function GetListItems(){

        $.ajax({

            url: url,  

            method: "GET",  

            headers: {  

                "Accept": "application/json; odata=verbose"  

            },

            success: function(data){

                response = response.concat(data.d.results);

                if (data.d.__next) {

                    url = data.d.__next;

                    GetListItems();

                }else  setTaskData(response);
                           console.log(response);
            },

            error: function(error){
                 console.log(error);
                   // error handler code goes here
            }

        });

    }
    GetListItems();
},

[]);


return(
    <div>
    <h1>Subcomponent</h1>
    {/* <Books arr={data} /> */}
     {/* <div>
     <div className="task-title mb-10" style={{verticalAlign:"top"}}>
                            <h1 className="mb-5">
                                <span>
                                    <img style={{height: "24px", width:"24px",marginTop: "-2px"}}
                                         src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/component_icon.png"/>
                                </span>
                                <span>
                                {data.map(item => <a>{item.Title}</a>)}
                                </span>
                                <span className="p-relative">
                                <input type="text" style={{width: "166px"}} className="searchbox_height form-control ml5 search-all mt-2 ng-pristine ng-untouched ng-valid ng-empty" id="globalSearch" placeholder="Search in all relevant fields" ng-model="globalItem.searchGloble"/>
                                <span ng-show="globalItem.searchGloble.length>0" className="g-searchclear ng-hide" ng-click="cancelGlobal()">X</span>

                                <button type="button" className="fa-search-butn" ng-click="WatchGroup()">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                            <span className="pull-right">
                                <span className="ml2 pull-right">
                                    <button type="button" className="btn mt--2 btn-grey" ng-disabled="(compareComponents.length<2 &amp;&amp; SelectedTasks.length<2)" ng-click="openCompareComponents()">
                                            <img className="button-icon mt--2" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/32/Compare_T_Icon.png" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/32/Compare_T_Icon.png" data-themekey="#"/>
                                        Compare
                                      
                                    </button>
                                </span>
                                <span className="no-padding pull-right ml-3"><button ng-if="allFamilyStructureOfItem.length>1" type="button" className="btn mt--2 btn-grey" ng-click="openRestructure()" ng-disabled="(compareComponents.length==0 &amp;&amp; SelectedTasks.length==0)" >
                                        Restructure
                                    </button>
                                </span>
                                <span className="ml2 pull-right">
                                    <button  type="button" className="btn mt--2 btn-primary ng-hide"  title="Add Activity/Workstream/Task">
                                            <img className="button-icon mt--2" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" data-themekey="#"/>
                                        Add Activity-Task
                                       
                                    </button>
                                    <button  type="button" className="btn mt--2 btn-primary ng-hide"  title="Add Activity/Workstream/Task">
                                            <img className="button-icon mt--2" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" data-themekey="#"/>
                                        Add Activity-Task
                                       
                                    </button>
                                </span><span className="pull-right ng-scope" >
                                    <button ng-disabled="isOwner!=true ||(compareComponents[0].Item_x0020_Type=='Feature' ||ProfileItem.Item_x0020_Type=='Feature' ||SelectedTasks.length>0)" type="button" className="btn btn-primary mt--2" ng-click="openComponentPopup()" title="Add Child Portfolio Structure">
                                            <img className="button-icon mt--2" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/CreateComponentIcon.png" data-themekey="#"/>
                                        Add Structure
                                    
                                    </button>
                                </span>
                            </span>
                            </h1>
           
                        </div>
                    
     </div>
         */}
    </div>

)
    
}
