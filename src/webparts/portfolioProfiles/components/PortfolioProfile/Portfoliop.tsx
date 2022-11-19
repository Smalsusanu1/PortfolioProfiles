import * as React from 'react';
import * as $ from 'jquery';
export default function Portfoliop() {
    const [data, setTaskData] = React.useState([]);
    React.useEffect(() => {
        var url = "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('EC34B38F-0669-480A-910C-F84E92E58ADF')/items?$select=Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type%20eq%20%27Component%27)%20or%20(Item_x0020_Type%20eq%20%27SubComponent%27)%20or%20(Item_x0020_Type%20eq%20%27Feature%27))and%20(Portfolio_x0020_Type%20eq%20%27Component%27)and(Id eq 321)&$top=4999";
        var response: any = [];  // this variable is used for storing list items
        function GetListItems() {
            $.ajax({
                url: url,
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                success: function (data) {
                    response = response.concat(data.d.results);
                    if (data.d.__next) {
                        url = data.d.__next;
                        GetListItems();
                    } else setTaskData(response);
                    console.log(response);
                },
                error: function (error) {
                    console.log(error);
                    // error handler code goes here
                }
            });
        }
        GetListItems();
    },
        []);
    return (
        <div>
            <div>
                <h1 >
                    <span>
                        <img style={{ height: "24px", width: "24px", marginTop: "-2px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/component_icon.png" />
                    </span>
                    Contact Database
                </h1>
            </div>
            <div>
                <div >
                    <span className="tmvalue impact-info53" title="due date">
                        <label >Due Date</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.DueDate}</i>)}
                        <span>
                            <i className="fa fa-pencil siteColor" aria-hidden="true"></i>
                        </span>
                    </span>
                    <span className="tmvalue impact-info53" title="Priority">
                        <label >Priority</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.Priority}</i>)}
                        <span>
                            <i className="fa fa-pencil siteColor" ></i>
                        </span>
                    </span>
                </div>
                <div style={{ marginTop: '19px' }}>
                    <span className="tmvalue impact-info53" title="Start date">
                        <label >Start Date</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.StartDate}</i>)}
                        <span>
                            <i className="fa fa-pencil siteColor" aria-hidden="true"></i>
                        </span>
                    </span>
                    <span className="tmvalue impact-info53" title="Priority">
                        <label >Completion Date</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.CompletedDate}</i>)}
                        <span>
                            <i className="fa fa-pencil siteColor" ></i>
                        </span>
                    </span>
                </div>
                <div style={{ marginTop: '19px' }}>
                    <span className="tmvalue impact-info53" title="Start date">
                        <label >Status</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        Not Started
                        {/* 02/12/2019 */}
                        {/* {data.map(item => <i>{item.AdminStatus}</i>)} */}
                    </span>
                    <span className="tmvalue impact-info53" title="Priority">
                        <label >Categories</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.Categories}</i>)}
                    </span>
                </div>
                <div style={{ marginTop: '19px' }}>
                    <span className="tmvalue impact-info53" title="Team Members">
                        <label >Team Members</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        <img className="AssignUserPhoto userimgsize1   " title="Pravesh Kumar" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/PublishingImages/NewUsersImages/PraveshKumar.png" src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/PublishingImages/NewUsersImages/PraveshKumar.png" data-themekey="#" />
                        {/* 02/12/2019 */}
                        {/* {data.map(item => <i>{item.AdminStatus}</i>)} */}
                    </span>
                    <span className="tmvalue impact-info53" title="Priority">
                        <label >% Complete</label>
                    </span>
                    <span className="tlvalue impact-infoII " >
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.PercentComplete}</i>)}
                    </span>
                </div>
                <div style={{ marginTop: '19px' }}>
                    <span className="tmvalue impact-info53" title="Item Rank">
                        <label >Item Rank</label>
                    </span>
                    <span className="tlvalue impact-infoII " style={{ width: "100%" }}>
                        {/* 02/12/2019 */}
                        {data.map(item => <i>{item.ItemRank}</i>)}
                    </span>
                </div>
            </div>
            <div>
                <div>
                    <span ng-show="Task.Portfolio_x0020_Type=='Component'" className="tmvalue impact-info53" title="ServicePortfolio">
                        <label >Service Portfolio</label>
                    </span>
                    <span>
                        <a className="hreflink block ng-binding" target="_blank" ng-href="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/Portfolio-Profile.aspx?taskId=668" href="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/Portfolio-Profile.aspx?taskId=668">Integration of Distribution Lists</a>
                    </span>
                </div>
                <div className="panel-heading profileboxclr" style={{backgroundColor: '#f5f5f5',borderColor: '#ddd', padding: '7px'}}>
                                                    <h3 className="panel-title" style={{textAlign: "inherit"}}>
                                                        <label  className="lbltitleclr">
                                                            Site
                                                            Composition
                                                        </label>
                                                      <a  className="hreflink ng-scope" title="Analyse Site Composition" >
                                                            <img className="wid-20" ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/32/analyze.png" data-themekey="#" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/32/analyze.png"/>
                                                        </a>
                                                        <span className="pull-left">
                                                            <span style={{cursor:"pointer"}}  className="ng-hide">
                                                                <img style={{width:"10px"}} ng-src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/24/right-list-icon.png" data-themekey="#" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                                            </span>
                                                        </span>
                                                    </h3>
                                                </div>
                <div>
                </div>
            </div>
        </div>
    )
}