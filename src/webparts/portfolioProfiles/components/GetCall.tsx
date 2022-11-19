import * as React from 'react';
import * as $ from 'jquery';
import * as Moment from 'moment';
import { useEffect } from 'react';
function GetData() {

    const  [data, setTaskData] = React.useState([]);
    const  [array, setArray] = React.useState([]);
       

//     var url = "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=Title,Id,Item_x0020_Type,Portfolio_x0020_Type,Component/Id,Component/Title,Services/Id,Services/Title&$expand=Services,Component&$top=4999&$filter=Component/Id";
//     var response:any =[];  // this variable is used for storing list items
//     function GetListItems(){

//         $.ajax({

//             url: url,  

//             method: "GET",  

//             headers: {  

//                 "Accept": "application/json; odata=verbose"  

//             },

//             success: function(data){

//                 response = response.concat(data.d.results.value);

//                 if (data.d.__next) {

//                     url = data.d.__next;

//                     GetListItems();

//                 }else  setTaskData(response);
//                            console.log(response);
//             },

//             error: function(error){
//                  console.log(error);
//                    // error handler code goes here

//             }

//         });

//     }
//     GetListItems();
// },

// []);
useEffect(()=>{
    RetrieveSPData();
},[])
function RetrieveSPData() {

    var spRequest = new XMLHttpRequest();
    var query = "Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type eq 'Component') or (Item_x0020_Type eq 'SubComponent') or (Item_x0020_Type eq 'Feature'))and (Portfolio_x0020_Type eq 'Component')&$top=4999";
    spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=" + query);
    spRequest.setRequestHeader("Accept", "application/json");

    spRequest.onreadystatechange = function () {
        var RootComponentsData: any[] = [];
        var ComponentsData: any = [];
        var SubComponentsData: any = [];
        var FeatureData: any = [];

        if (spRequest.readyState === 4 && spRequest.status === 200) {
            var results = JSON.parse(spRequest.responseText);
            console.log(results)

            $.each(results.value, function (index, result) {
                result.TeamLeaderUser = []
                // result.DueDate = Moment(result.DueDate).format('DD-MM-YYYY')
                if (result.DueDate == 'Invalid date' || '') {
                    result.DueDate = result.DueDate.replaceAll("Invalid date", "")
                }
             

                if (result.ClientCategory != undefined && result.ClientCategory.length > 0) {
                    $.each(result.Team_x0020_Members, function (index, catego) {
                        result.ClientCategory.push(catego);
                    })
                }
                if (result.Item_x0020_Type == 'Root Component') {
                    result['Child'] = [];
                    RootComponentsData.push(result);
                }
                if (result.Item_x0020_Type == 'Component') {
                    result['Child'] = [];
                    ComponentsData.push(result);


                }

                if (result.Item_x0020_Type == 'SubComponent') {
                    result['Child'] = [];
                    SubComponentsData.push(result);


                }
                if (result.Item_x0020_Type == 'Feature') {
                    result['Child'] = [];
                    FeatureData.push(result);
                }
            });

            $.each(SubComponentsData, function (index, subcomp) {
                if (subcomp.Title != undefined) {
                    $.each(FeatureData, function (index, featurecomp) {
                        if (featurecomp.Parent != undefined && subcomp.Id == featurecomp.Parent.Id) {
                            subcomp['Child'].push(featurecomp);;
                        }
                    })
                }
            })

            $.each(ComponentsData, function (index, subcomp) {
                if (subcomp.Title != undefined) {
                    $.each(SubComponentsData, function (index, featurecomp) {
                        if (featurecomp.Parent != undefined && subcomp.Id == featurecomp.Parent.Id) {
                            subcomp['Child'].push(featurecomp);;
                        }
                    })
                }
            })

            setArray(ComponentsData);
           


        }
        else if (spRequest.readyState === 4 && spRequest.status !== 200) {
            console.log('Error Occurred !');
        }

    },
        spRequest.send();
}
return(
    <div>
    <ul>
      {array.map(item => <li>{item.Title} Hi Guys</li>)}
    </ul>
  </div>
)
}

export default GetData;