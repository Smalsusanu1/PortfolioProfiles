import * as React from 'react';
import * as $ from 'jquery';
import * as Moment from 'moment';
// import './foundation.scss'
import '../components/PopupOfdata/TestWithDiff/foundation.scss';
import { Modal } from 'office-ui-fabric-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleDown, FaAngleUp, FaPrint, FaFileExcel, FaPaintBrush, FaEdit, FaSearch } from 'react-icons/fa';
import {MdAdd } from 'react-icons/Md';
import SmartFilter from './PortfolioProfile/SmartFilter';





function Groupby() {

    // console.log(arr)
    const [show, setShow] = React.useState(false);
    //const [passData, setPassData] = React.useState([]);
    const [child, setChild] = React.useState(false);
    const [search, setSearch]: [string, (search: string) => void] = React.useState("");
    const [data, setData] = React.useState([])
    const [Title, setTitle] = React.useState()
    const [itemType, setitemType] = React.useState()
    const [ComponentsData, setComponentsData] = React.useState([])
    const [SubComponentsData, setSubComponentsData] = React.useState([])
    const [FeatureData, setFeatureData] = React.useState([])
    const [table, setTable] = React.useState(data);
    const [Task, setTask] = React.useState([])
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [Editpopup, setEditpopup] = React.useState(false);
    const [addModalOpen, setAddModalOpen] = React.useState(false);



    const handleOpen = (item: any) => {

        item.show = item.show = item.show == true ? false : true;
        setData(data => ([...data]));

    };

     function Datas({arr}:any){
        $.each(arr, function (child: any, childItem) {
            if (childItem.UserGroupId != undefined && childItem.UserGroupId == arr.Id) {
                return "hello";
              
            }
        });
      
    }
   // var Team: any = [];
    // if (arr != undefined && arr.length > 0) {
    //     $.each(arr, function (index: any, Assig: any) {
    //         if (Assig.Id != undefined) {
    //             $.each(Response, function (index: any, users: any) {

    //                 if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
    //                     users.ItemCover = users.Item_x0020_Cover;
    //                     Team.push(users);
    //                 }

    //             })
    //         }
    //     })
    // }

    const addModal = () => {
        setAddModalOpen(true)
    }
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }


    const sortBy = () => {

        const copy = data

        copy.sort((a, b) => (a.Title > b.Title) ? 1 : -1);

        setTable(copy)

    }
    const sortByDng = () => {

        const copy = data

        copy.sort((a, b) => (a.Title > b.Title) ? -1 : 1);

        setTable(copy)

    }
    let handleChange = (e: { target: { value: string; }; }) => {
        setSearch(e.target.value.toLowerCase());
    };
    React.useEffect(() => {
        function RetrieveSPData() {
            //--------------------------task user--------------------------------------------------------------------------------------------------
            var Response: any = []
            var url = "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('b318ba84-e21d-4876-8851-88b94b9dc300')/items?$top=1000";

            $.ajax({

                url: url,

                method: "GET",

                headers: {

                    "Accept": "application/json; odata=verbose"

                },

                success: function (data) {

                    Response = Response.concat(data.d.results);
                    console.log(Response);

                    if (data.d.__next) {

                        url = data.d.__next;



                    }
                    else setTask(Response);


                },

                error: function (error) {


                }

            });

            //-----------------------------------end taskuser data--------------------------------------------------------------------------------------------

            var spRequest = new XMLHttpRequest();
            var query = "Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type eq 'Component') or (Item_x0020_Type eq 'SubComponent') or (Item_x0020_Type eq 'Feature'))and (Portfolio_x0020_Type eq 'Component')&$top=4999";
            spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=" + query);
            spRequest.setRequestHeader("Accept", "application/json");

            spRequest.onreadystatechange = function () {
                var RootComponentsData: any[] = [];
                // var ComponentsData: any = [];
                // var SubComponentsData: any = [];
                // var FeatureData: any = [];

                if (spRequest.readyState === 4 && spRequest.status === 200) {
                    var results = JSON.parse(spRequest.responseText);
                    console.log(results)

                    $.each(results.value, function (index: any, result: any) {
                        result.TeamLeaderUser = []
                        result.DueDate = Moment(result.DueDate).format('DD/MM/YYYY')

                        if (result.DueDate == 'Invalid date' || '') {
                            result.DueDate = result.DueDate.replaceAll("Invalid date", "")
                        }
                        result.PercentComplete = (result.PercentComplete * 100).toFixed(0);

                        if (result.Short_x0020_Description_x0020_On != undefined) {
                            result.Short_x0020_Description_x0020_On = result.Short_x0020_Description_x0020_On.replace(/(<([^>]+)>)/ig, '');
                        }

                        if (result.AssignedTo != undefined && result.AssignedTo.length > 0) {
                            $.each(result.AssignedTo, function (index: any, Assig: any) {
                                if (Assig.Id != undefined) {
                                    $.each(Response, function (index: any, users: any) {

                                        if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                            users.ItemCover = users.Item_x0020_Cover;
                                            result.TeamLeaderUser.push(users);
                                        }

                                    })
                                }
                            })
                        }
                        if (result.Team_x0020_Members != undefined && result.Team_x0020_Members.length > 0) {
                            $.each(result.Team_x0020_Members, function (index: any, Assig: any) {
                                if (Assig.Id != undefined) {
                                    $.each(Response, function (index: any, users: any) {
                                        if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                            users.ItemCover = users.Item_x0020_Cover;
                                            result.TeamLeaderUser.push(users);
                                        }

                                    })
                                }
                            })
                        }

                        if (result.ClientCategory != undefined && result.ClientCategory.length > 0) {
                            $.each(result.Team_x0020_Members, function (index: any, catego: any) {
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

                    $.each(SubComponentsData, function (index: any, subcomp: any) {
                        if (subcomp.Title != undefined) {
                            $.each(FeatureData, function (index: any, featurecomp: any) {
                                if (featurecomp.Parent != undefined && subcomp.Id == featurecomp.Parent.Id) {
                                    subcomp['Child'].push(featurecomp);;
                                }
                            })
                        }
                    })

                    $.each(ComponentsData, function (index: any, subcomp: any) {
                        if (subcomp.Title != undefined) {
                            $.each(SubComponentsData, function (index: any, featurecomp: any) {
                                if (featurecomp.Parent != undefined && subcomp.Id == featurecomp.Parent.Id) {
                                    subcomp['Child'].push(featurecomp);;
                                }
                            })
                        }
                    })

                    setData(ComponentsData);


                }
                else if (spRequest.readyState === 4 && spRequest.status !== 200) {
                    console.log('Error Occurred !');
                }

            },
                spRequest.send();
        }
        RetrieveSPData();
    }, [])
    function Buttonclick(e: any) {
        e.preventDefault();
        this.setState({ callchildcomponent: true });

    }
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    const closeModal = () => {
        setAddModalOpen(false)
    }


    const Prints = () => {
        window.print();
    }
    // ---------------------Export to Excel-------------------------------------------------------------------------------------

    const getCsvData = () => {
        const csvData = [['Title']];
        let i;
        for (i = 0; i < data.length; i += 1) {
            csvData.push([`${data[i].Title}`]);
        }
        return csvData;
    };
    const clearSearch = () => {
        setSearch('')

    }

    const openEditPopup = () => {
        setEditpopup(true)
    }
    const EditpopupClose = () => {
        setEditpopup(false)
    }

    //------------------Edit Data----------------------------------------------------------------------------------------------------------------------------

    const EditData = (e: any, Id: any) => {
        var spRequest = new XMLHttpRequest();
        spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=Id,Title&$filter= Id eq '" + Id + "'", true);
        spRequest.setRequestHeader("Accept", "application/json");

        spRequest.onreadystatechange = function () {

            if (spRequest.readyState === 4 && spRequest.status === 200) {
                var result = JSON.parse(spRequest.responseText);

                // setTitle(result.value[0].Title)


            }
            else if (spRequest.readyState === 4 && spRequest.status !== 200) {
                console.log('Error Occurred !');
            }
            openModal();
            AddItem();
        };
        spRequest.send();
    }



    const handleTitle = (e: any) => {
        setTitle(e.target.value)

    };
    function AddItem() {
        var MyData = JSON.stringify({
            '__metadata': {
                'type': 'SP.Data.Master_x0020_TasksListItem'
            },
            "Title": Title,
            "Item_x0020_Type": itemType,
            "Portfolio_x0020_Type": 'Component'
        })
        $.ajax({
            url: "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/contextinfo",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose"
            },
            success: function (contextData: any) {
                $.ajax({
                    url: "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items",
                    method: "POST",
                    contentType: "application/json;odata=verbose",
                    data: MyData,
                    async: false,
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": contextData.d.GetContextWebInformation.FormDigestValue,
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "POST"
                    },
                    success: function (data: any) {
                        alert('success');
                        setModalIsOpenToFalse();
                        window.location.reload();
                    },
                    error: function (jqXHR: any, textStatus: any, errorThrown: any) {
                        alert('error');
                    }
                });
            },
            error: function (jqXHR: any, textStatus: any, errorThrown: any) {
                alert('error');
            }
        });


    }


    // React.useEffect(()=>{
    //     eventBus.on("Successful", (data:any) =>
    //     setPassData({data:selected2)
    //   );
    // },[])
    return (
        <div className="app">
        {/* {arr.map(function(item:any){
            return(
                <>
                <h4>{item.Group}</h4>
                </>
            )
        })} */}
            {/* ---------------------------------------Editpopup------------------------------------------------------------------------------------------------------- */}
            <Modal
                isOpen={modalIsOpen}
                onDismiss={setModalIsOpenToFalse}
                isBlocking={false} >
                <div className='modal-dialog modal-lg'>
                    <form>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'><span>Add Item</span></h5>
                                <button type="button" className='btn btn-danger pull-right' onClick={setModalIsOpenToFalse}>Cancel</button>
                            </div>
                            <div className='modal-body clearfix bg-f5f5'>
                                <div className="col-sm-12 tab-content">
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-sm-4 mb-10 pad0" title="Task Name">
                                                <label>Title</label>
                                                <input type="text" className="form-control" placeholder="Task Name"
                                                    value={Title} onChange={handleTitle} />
                                            </div>
                                            <div className="col-sm-4 mb-10 Doc-align padR0">
                                                <label className="full_width">ItemRank
                                                </label>
                                                <select className="form-control" value="2">
                                                    <option value="">Select Item Rank</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>


                                            </div>
                                            <div className="col-4 mb-10">
                                                <label>Item Type</label>
                                                <select value={itemType} onChange={(e: any) => setitemType(e.target.value)}>
                                                    <option>Component</option>
                                                    <option>Feature</option>
                                                    <option>SubComponent</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-sm-6 pad0">
                                                <div ng-show="Item.Portfolio_x0020_Type=='Service'"
                                                    className="col-sm-12 mb-10 Doc-align padL-0">
                                                    <div className="col-sm-11 PadR0 Doc-align">
                                                        <label>
                                                            Component Portfolio
                                                            <span data-toggle="popover" data-placement="right"
                                                                data-trigger="hover"
                                                                data-content="Click to activate auto suggest for components/services"
                                                                data-original-title="Click to activate auto suggest for components/services"
                                                                title="Click to activate auto suggest for components/services">

                                                            </span>

                                                        </label>
                                                        <input type="text" className="form-control ui-autocomplete-input"
                                                            id="txtSharewebComponent" ng-model="SearchComponent"
                                                        /><span role="status" aria-live="polite"
                                                            className="ui-helper-hidden-accessible"></span>
                                                    </div>
                                                    <div className="col-sm-1 no-padding">
                                                        <label className="full_width">&nbsp;</label>
                                                        <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/32/edititem.gif"
                                                            ng-click="EditComponent('Components',item)" />
                                                    </div>

                                                </div>
                                                <div ng-show="Item.Portfolio_x0020_Type=='Component'"
                                                    className="col-sm-12 padL-0">
                                                    <div className="col-sm-11 pad0 Doc-align">

                                                        <label>
                                                            Service Portfolio
                                                            <span data-toggle="popover" data-placement="right"
                                                                data-trigger="hover"
                                                                data-content="Click to activate auto suggest for components/services"
                                                                data-original-title="Click to activate auto suggest for components/services"
                                                                title="Click to activate auto suggest for components/services">

                                                            </span>

                                                        </label>
                                                        <input type="text" className="form-control ui-autocomplete-input"
                                                            id="txtServiceSharewebComponent" ng-model="SearchService"
                                                        /><span role="status" aria-live="polite"
                                                            className="ui-helper-hidden-accessible"></span>
                                                    </div>
                                                    <div className="col-sm-1 no-padding">
                                                        <label className="full_width">&nbsp;</label>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-sm-6 padR0">
                                                <label>Deliverable-Synonyms </label>
                                                <input type="text" className="form-control ui-autocomplete-input"
                                                    id="txtDeliverable_x002d_Synonyms"
                                                    ng-model="Item.Deliverable_x002d_Synonyms" /><span
                                                        role="status" aria-live="polite"
                                                        className="ui-helper-hidden-accessible"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='modal-footer mt-3'>
                    <button type="button" className="btn btn-primary m-2" onClick={AddItem}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={setModalIsOpenToFalse}>Cancel</button>
                </div>
            </Modal>
            {/* ------------------------Add Popup------------------------------------------------------------------------------------------------------------------------------ */}

            <Modal
                isOpen={addModalOpen}
                onDismiss={closeModal}
                isBlocking={false}>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-header'>
                        <h5 className='modal-title'><span>Add Component</span></h5>
                        <button type="button" className='btn btn-danger pull-right' onClick={closeModal}>Cancel</button>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 mb-10" title="Task Name">
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Task Name"
                                ng-required="true" />
                        </div>
                    </div>
                </div>
                <div className='modal-footer mt-3'>
                    <button type="button" className="btn btn-primary m-2" disabled={true}> Create & Open Popup</button>
                    <button type="button" className="btn btn-primary" disabled={true} onClick={closeModal}>Create</button>
                </div>
            </Modal>
            {/* -----------------------------------------end-------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="col-sm-12 padL-0 PadR0">
                <h2 className="alignmentitle ng-binding">
                    Component Portfolio
                    <span className="icontype display_hide padLR">
                    </span>

                </h2>
            </div>
            <div className="col-sm-12 padL-0 PadR0">
            <SmartFilter />
            </div>
            {/* <div className="smartFilter">
<SmartFilter/>
    </div> */}


            <section className="TableContentSection">
                <div className="container-fluid">
                    <section className="TableSection">
                        <div className="container">
                            <div className="Alltable mt-10">
                                <div className="tbl-headings">
                                    <span className="leftsec w65">
                                        <label>
                                            Showing {ComponentsData.length} of {ComponentsData.length} Components
                                        </label>
                                        <label> | </label>
                                        <label>
                                            {SubComponentsData.length} of {SubComponentsData.length} SubComponents
                                        </label>
                                        <label> | </label>
                                        <label>
                                            {FeatureData.length} of {FeatureData.length} Features
                                        </label>
                                        <span className="g-search">
                                            <input type="text" className="searchbox_height full_width" id="globalSearch" placeholder="search all" />
                                            <span className="gsearch-btn" ><i><FaSearch /></i></span>
                                        </span>
                                        <span>
                                            <select className="ml2 searchbox_height">
                                                <option value="All Words">All Words</option>
                                                <option value="Any Words">Any Words</option>
                                                <option value="Exact Phrase">Exact Phrase</option>

                                            </select>
                                        </span>
                                    </span>
                                    <span className="toolbox mx-auto">
                                        <button type="button" className="btn btn-primary"
                                            ng-disabled="(isOwner!=true) || ( SelectedTasks.length > 0 || compareComponents[0].Item_x0020_Type =='Feature') "
                                            onClick={addModal} title=" Add Structure">
                                            Add Structure
                                        </button>

                                        <button type="button"
                                            className="btn {{(compareComponents.length==0 && SelectedTasks.length==0)?'btn-grey':'btn-primary'}}"
                                            ng-click="openActivity()"
                                            disabled={true}>

                                            <MdAdd />
                                            Add Activity-Task
                                        </button>


                                        <button type="button"
                                            className="btn {{(compareComponents.length==0 && SelectedTasks.length==0)?'btn-grey':'btn-primary'}}"
                                            ng-click="openRestructure()"
                                            disabled={true}>
                                            Restructure
                                        </button>
                                        <a onClick={Prints}>
                                            <i className="print"><FaPrint /></i>
                                        </a>
                                        <a>
                                            {/* <CSVLink data={getCsvData()} >
                                                <i className="excal"><FaFileExcel /></i>
                                            </CSVLink> */}
                                        </a>
                                        <a onClick={clearSearch}>
                                            <i className="brush"><FaPaintBrush /></i>
                                        </a>
                                        {/* <span>
                                        <ExpandTable/>
                                        </span> */}
                                    </span>
                                </div>
                             {/* Test something new */}
                             <div className="col-sm-12 padL-0 PadR0 fortablee">
                        <div className="section-event pt-0">
                            <ul className="SAP-Project table table-hover">
                                <li className="for-lis">
                                    <div style={{width: "2%"}} className="padLR">
                                        <div style={{width: "80%"}}>
                                            <a className="hreflink" ng-show="!expand_collapse"
                                               ng-click="filterExpanded(allFamilyStructureOfItem)"
                                               title="Tap to expand the childs">
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Service'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Events'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Component'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                            </a>
                                            <a className="hreflink" ng-show="expand_collapse"
                                               ng-click="filterCollapsed(allFamilyStructureOfItem)"
                                               title="Tap to Shrink the childs">
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Service'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Events'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Component'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                            </a>
                                            <a className="hreflink" ng-click="openselectCollapseAllPopup()"
                                               title="Tap to Collpase the childs">
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Component'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Shareweb/sub_icon.png"/>
                                                <img ng-show="ProfileItem.Portfolio_x0020_Type=='Service'"
                                                     style={{width: "10px"}}
                                                     ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/sub_icon.png"/>
                                            </a>
                                        </div>
                                    </div>

                                    <div style={{width: "3%"}} className="padLR">
                                        <div style={{width: "80%"}}>
                                        </div>
                                    </div>
                                    <div style={{width: "3%"}} className="padLR">
                                    </div>
                                    <div style={{width: "7%"}} className="">
                                        <div style={{width: "97%"}} className="colm-relative">
                                            <input id="searchTaskId" type="search" placeholder="TaskID" title="TaskID"
                                                   className="full_width" ng-model="globalItem.searchTaskId"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchTaskId.length>0"
                                                  ng-click="clearControl('searchTaskId')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='Shareweb_x0020_ID'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Shareweb_x0020_ID', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='Shareweb_x0020_ID'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Shareweb_x0020_ID', true)"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: "30%"}} className="">
                                        <div style={{width: "99%"}} className="colm-relative">
                                            <input id="searchTitle" type="search" placeholder="Title" title="Title"
                                                   className="full_width" ng-model="globalItem.searchTitle"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchTitle.length>0"
                                                  ng-click="clearControl('searchTitle')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='Title'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Title', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='Title'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Title', true)"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: "7%"}} className="">
                                        <div style={{width: "100%"}} className="colm-relative">
                                            <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                   title="Client Category" className="full_width"
                                                   ng-model="globalItem.searchClientCategory"/>
                                            <span className="searchclear-bg"
                                                  ng-show="globalItem.searchClientCategory.length>0"
                                                  ng-click="clearControl('searchClientCategory')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','ClientCategoryTitle', true)"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: "7%"}} className="">
                                        <div style={{width: "78%"}} className="colm-relative">
                                            <input id="searchPercentComplete" type="search" placeholder="%"
                                                   title="Percent" className="full_width"
                                                   ng-model="globalItem.searchPercentComplete"/>
                                            <span className="searchclear-bg"
                                                  ng-show="globalItem.searchPercentComplete.length>0"
                                                  ng-click="clearControl('searchPercentComplete')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='PercentComplete'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','PercentComplete', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='PercentComplete'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','PercentComplete', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','PercentComplete')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="StatusFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!StatusFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <span ng-if="PercentCompleteflag">
                                            <div id="myDropdown1" className="dropdown-content">
                                                
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Status <span title="Close popup" className="pull-right hreflink"
                                                                    ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-sm-12 padL-0 ml5">
                                                    <div className="checkbox mb0 ml15 f-500">
                                                        <input ng-model="selectAll" type="checkbox"
                                                               name="PercentComplete1"
                                                               ng-click="SelectAll(selectAll,'PercentComplete')"/><span className="">
                                                            Select All
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 PadR0 ml5">
                                                    <div className="col-sm-12 padL-0 PadR0 checkbox mb0 ml15"
                                                         ng-if="obj.TaxType =='PercentComplete'"
                                                         ng-repeat="obj in AllItems">
                                                        <input ng-model="obj.Selected" type="checkbox"
                                                               name="PercentComplete"/><span className="">
                                                                {/* {{obj.Title}}% */}
                                                                </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 padL-0 PadR0 text-center mb-10 mt-10">
                                                    <button type="button" ng-click="FilterData('PercentComplete')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('PercentComplete')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div style={{width: "7%"}} className="">
                                        <div style={{width: "75%"}} className="colm-relative">
                                            <input id="searchItemRank" type="search" placeholder="ItemRank"
                                                   title="ItemRank" className="full_width"
                                                   ng-model=" globalItem.searchItemRank"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchItemRank.length>0"
                                                  ng-click="clearControl('searchItemRank')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ItemRank'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','ItemRank', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='ItemRank'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','ItemRank', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','ItemRank')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="ItemRankFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!ItemRankFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <span ng-if="ItemRankflag">
                                            <div id="myDropdown1" className="dropdown-content">
                                                
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Item Rank <span title="Close popup" className="pull-right hreflink"
                                                                    ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-sm-12 padL-0 ml5" >
                                                    <div className="checkbox mb0 ml15">
                                                        <input ng-model="selectAll" type="checkbox" name="ItemRank1"
                                                               ng-click="SelectAll(selectAll,'ItemRank')"/><span className="f-500">Select All</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 PadR0 ml5">
                                                    <div className="col-sm-12 padL-0 PadR0 checkbox mb0 ml15"
                                                         ng-if="obj.TaxType =='ItemRank'" ng-repeat="obj in AllItems">
                                                        <input ng-model="obj.Selected" type="checkbox"
                                                               name="ItemRank"/><span className="">
                                                                {/* {{obj.Title}} */}
                                                                </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 padL-0 text-center PadR0 mb-10 mt-10">
                                                    <button type="button" ng-click="FilterData('ItemRank')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('ItemRank')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div style={{width: "10%"}} className="">
                                        <div style={{width: "82%"}} className="colm-relative">
                                            <input id="searchTeamMember" type="search" placeholder="Team" title="Team"
                                                   className="full_width" ng-model="globalItem.searchTeamMember"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchTeamMember.length>0"
                                                  ng-click="clearControl('searchTeamMember')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='AllTeamName'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','AllTeamName', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='AllTeamName'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','AllTeamName', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','Team Members')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="ResponsibilityFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!ResponsibilityFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <span ng-if="Responsibilityflag">
                                            <div id="myDropdown1" className="dropdown-content">
                                              
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Team Members <span title="Close popup" className="pull-right hreflink"
                                                                       ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-sm-12 padL-0 ml5">
                                                    <div className="checkbox mb0 ml15">
                                                        <input ng-model="selectAll" type="checkbox"
                                                               name="Responsibility1"
                                                               ng-click="SelectAll(selectAll,'Team Members')"/><span className=" f-500">
                                                            Select All
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 PadR0 ml5">
                                                    <ul ng-if="filterItem.TaxType=='Team Members'" className=""
                                                        ng-repeat="filterItem in AllItems" style={{maxWidth: "96%"}}>
                                                        <li className="for-lis padding-0">
                                                            <div className="" style={{width: "8%"}}>
                                                                <span className="hreflink "
                                                                      ng-show="filterItem.childs.length>0 && !filterItem.expanded"
                                                                      ng-click="loadMoreFiltersColumn(filterItem);">
                                                                    <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/32/right-list-icon.png"/>
                                                                </span>
                                                                <span className="hreflink "
                                                                      ng-show="filterItem.childs.length>0 && filterItem.expanded"
                                                                      ng-click="loadMoreFiltersColumn(filterItem);">
                                                                    <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/32/list-icon.png"/>
                                                                </span>
                                                            </div>
                                                            <div className="" style={{width: "8%"}}>
                                                                <input type="checkbox"
                                                                       className="icon-input mt--2 ml0"
                                                                       ng-model="filterItem.Selected"
                                                                       ng-click="SelectFilterFunction(filterItem.TaxType,AllItems)" />
                                                            </div>
                                                            <div className="no-padding" style={{width: "84%"}}>
                                                                {/* {{filterItem.Title}} */}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <ul id="columnId_{{filterItem.Id}}"
                                                                ng-show="filterItem.childs.length>0&&filterItem.expanded"
                                                                className="ml5" style={{maxWidth:"95%"}}>
                                                                <li className="for-lis ml5 padding-0"
                                                                    ng-repeat="child1 in filterItem.childs">
                                                                    <div className="" style={{width: "8%"}}>
                                                                        <span className="hreflink "
                                                                              ng-show="child1.childs.length>0 && !child1.expanded"
                                                                              ng-click="loadMoreFiltersColumn(child1);">
                                                                            <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/32/right-list-icon.png"/>
                                                                        </span>
                                                                        <span className="hreflink "
                                                                              ng-show="child1.childs.length>0 && child1.expanded"
                                                                              ng-click="loadMoreFiltersColumn(child1);">
                                                                            <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/32/list-icon.png"/>
                                                                        </span>
                                                                    </div>
                                                                    <div className="" style={{width: "8%"}}>
                                                                        <input type="checkbox" className="icon-input mt--2 ml0"
                                                                               ng-model="child1.Selected"
                                                                               ng-click="SelectFilterFunction(child1.TaxType,filterItem.childs)" />
                                                                    </div>
                                                                    <div className="no-padding" style={{width: "84%"}}>
                                                                    child1
                                                                        {/* {{child1.Title}} */}
                                                                    </div>
                                                                </li>

                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-12 text-center padL-0 PadR0 mb-10 mt-10">
                                                    <button type="button" ng-click="FilterData('Team Members')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('Team Members')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div style={{width: "9%"}} className="">
                                        <div style={{width: "82%"}} className=" colm-relative">
                                            <input id="searchEarliestDate" type="search" placeholder="Due Date"
                                                   title="Due Date" className="full_width "
                                                   ng-model="globalItem.searchEarliestDate"/>
                                            <span className="searchclear-bg"
                                                  ng-show="globalItem.searchEarliestDate.length>0"
                                                  ng-click="clearControl('searchEarliestDate')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='NewestDueDate'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','NewestDueDate', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='NewestDueDate'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','NewestDueDate', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','NewestDueDate')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="DueDateFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!DueDateFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div ng-if="DueDateflag">
                                            <div id="myDropdown1" className="dropdown-content">
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Due Date <span title="Close popup" className="pull-right hreflink"
                                                                   ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-md-12 mb-10 mt-10">
                                                    <select id="selectDuedateValue" className="form-control"
                                                            ng-change="valuechange(ValueTitle);" ng-model="ValueTitle">
                                                        <option value="">Select</option>
                                                        <option value="Equal to">Equal to</option>
                                                        <option value="Greater than">Greater than</option>
                                                        <option value="Less than">Less than</option>
                                                        <option value="Not equal to">Not equal to</option>
                                                        <option value="In Between">In Between</option>
                                                        <option value="Presets">Presets</option>
                                                    </select>
                                                </div>
                                                <div ng-show="ValueTitle=='In Between'" className="ml5">
                                                    <label>
                                                        From
                                                        Date
                                                    </label>
                                                </div>
                                                <div ng-show="ValueTitle!='Presets'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy"
                                                           className="form-control date-picker" id="txtDate"
                                                           ng-model="DueDateValue" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"10px"}}></i>
                                                </div>
                                                <div ng-show="ValueTitle=='In Between'" className="ml5">
                                                    <label>
                                                        To
                                                        Date
                                                    </label>
                                                </div>
                                                <div ng-show="ValueTitle=='In Between'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy" className="form-control"
                                                           id="txtDate1" ng-model="Item1" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"6px"}}></i>
                                                </div>
                                                <div ng-show="ValueTitle=='Presets'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy"
                                                           className="form-control date-picker" id="txtDate2" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"6px"}}></i>
                                                </div>
                                                <div className="col-md-12 PadR0 mb-10 mt-10 text-center">
                                                    <button type="button" ng-click="FilterData('NewestDueDate')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('NewestDueDate')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width: "9%"}} className="">
                                        <div style={{width: "86%"}} className="colm-relative">
                                            <input id="searchCreatedDate" type="search" placeholder="Created Date"
                                                   title="Created Date" className="full_width"
                                                   ng-model="globalItem.searchCreatedDate"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchCreatedDate.length>0"
                                                  ng-click="clearControl('searchCreatedDate')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='CreatedDate'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','CreatedDate', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='CreatedDate'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','CreatedDate', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','CreatedDate')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="CreatedDateFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!CreatedDateFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div ng-if="CreatedDateflag">
                                            <div id="myDropdown4" className="dropdown-content">
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Created Date <span title="Close popup" className="pull-right hreflink"
                                                                       ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-md-12 mb-10 mt-10">
                                                    <select id="selectCreatedValue" className="form-control"
                                                            ng-change="valuechange1(ValueTitle1);" ng-model="ValueTitle1">
                                                        <option value="">Select</option>
                                                        <option value="Equal to">Equal to</option>
                                                        <option value="Greater than">Greater than</option>
                                                        <option value="Less than">Less than</option>
                                                        <option value="Not equal to">Not equal to</option>
                                                        <option value="In Between">In Between</option>
                                                        <option value="Presets">Presets</option>
                                                    </select>
                                                </div>
                                                <div ng-show="ValueTitle1=='In Between'" className="ml5">
                                                    <label>
                                                        From
                                                        Date
                                                    </label>
                                                </div>
                                                <div ng-show="ValueTitle1!='Presets'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy"
                                                           className="form-control date-picker" id="txtDate4"
                                                           ng-model="CreatedDateValue" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"10px"}}></i>
                                                </div>
                                                <div ng-show="ValueTitle1=='In Between'" className="ml5">
                                                    <label>
                                                        To
                                                        Date
                                                    </label>
                                                </div>
                                                <div ng-show="ValueTitle1=='In Between'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy" className="form-control"
                                                           id="txtDate5" ng-model="Item2" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"6px"}}></i>
                                                </div>
                                                <div ng-show="ValueTitle1=='Presets'"
                                                     className="col-md-12 mb-10 mt-10 has-feedback has-feedback">
                                                    <input type="text" placeholder="dd/mm/yyyy"
                                                           className="form-control date-picker" id="txtDate4" />
                                                    <i className="fa fa-calendar form-control-feedback mt-10"
                                                      style={{marginRight:"6px"}}></i>
                                                </div>
                                                <div className="col-md-12 text-center PadR0 mb-10 mt-10">
                                                    <button type="button" ng-click="FilterData('CreatedDate')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('CreatedDate')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{width: "7%"}} className="">
                                        <div style={{width: "73%"}} className="colm-relative">
                                            <input id="searchTime" type="search" placeholder="Smart Time"
                                                   title="Smart Time" className="full_width" ng-model="globalItem.searchTime"/>
                                            <span className="searchclear-bg" ng-show="globalItem.searchTime.length>0"
                                                  ng-click="clearControl('searchTime')">X</span>
                                            <span className="sortingfilter">
                                                <span className="ml0">
                                                    <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='Effort'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Effort', false)"></i>
                                                </span>
                                                <span className="ml0">
                                                    <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='Effort'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                       ng-click="sortBy('orderComponent','Effort', true)"></i>
                                                </span>
                                            </span>
                                            <span className="dropdown filer-icons">
                                                <span className="filter-iconfil" 
                                                // ref="#myDropdown1"
                                                      ng-click="myFunction('myDropdown1','SmartTime')">
                                                    <i title="Site" className="fa fa-filter hreflink "
                                                       ng-show="SmartTimeFilterGrey"></i>
                                                    <i title="Site"
                                                       className="fa fa-filter hreflink  {{TaskIDflag!=true ? 'glyphicon_active': ''}}"
                                                       ng-show="!SmartTimeFilterGrey"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <span ng-if="SmartTimeflag">
                                            <div id="myDropdown1" className="col-sm-12 pad0 dropdown-content">
                                                <h4 className="col-sm-12 siteColor quickheader">
                                                    Smart Time <span title="Close popup" className="pull-right hreflink"
                                                                     ng-click="cancelColumnFilter()">
                                                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                    </span>
                                                </h4>
                                                <div className="col-md-12 mb-10 mt-10">
                                                    <select className="form-control" ng-change="valuechange(ValueTitle);"
                                                            ng-model="ValueTitle">
                                                        <option value="">Select</option>
                                                        <option value="Equal to">Equal to</option>
                                                        <option value="Greater than">Greater than</option>
                                                        <option value="Less than">Less than</option>
                                                        <option value="Not equal to">Not equal to</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-12 mb-10 mt-10">
                                                    <input type="text" placeholder="Effort"
                                                           ng-change="clickInteger(Item3)" className="form-control full-width"
                                                           id="txtSmartTime" ng-model="Item3" />
                                                </div>
                                                <div className="col-md-12 padL-0 text-center PadR0 mb-10 mt-10">
                                                    <button type="button" ng-click="FilterData('SmartTime')"
                                                            className="btn btn-primary">
                                                        Apply
                                                    </button>
                                                    <button type="button" className="btn btn-default blocks"
                                                            ng-click="Filtercancel('SmartTime')">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div style={{width: "2%"}} className="padLR">
                                       <div></div>
                                    </div>
                                    <div style={{width: "2%"}} className="padLR mt-5">
                                        <a className="hreflink" title="Restructuring Tool" data-toggle="modal"
                                           ng-show="IsRestructureActive" target="_blank"
                                           ng-click="openRestructuringPopup()">
                                            <img className="icon-sites-img"
                                                 ng-show="ProfileItem.Portfolio_x0020_Type =='Service'"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                            <img className="icon-sites-img"
                                                 ng-show="ProfileItem.Portfolio_x0020_Type =='Events'"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                            <img className="icon-sites-img"
                                                 ng-show="ProfileItem.Portfolio_x0020_Type =='Component'"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                        </a>
                                    </div>
                                    <div style={{width: "2%"}} className="padLR">
                                        <div style={{width: "80%"}}>

                                        </div>
                                    </div>
                                </li>
                                <div>
                                    <li ng-if="item.flag==true && allFamilyStructureOfItem.length>0"
                                        ng-repeat-start="item in filteredItems =(allFamilyStructureOfItem)"
                                        className="for-lis tdrows {{item.siteType =='Master Tasks'?'project_active':''}}">
                                        <div style={{width: "2%"}} className="padLR">
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&!item.expanded && item.Portfolio_x0020_Type=='Component'"
                                               ng-click="item.expanded=true"
                                               title="Tap to expand the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                            </a>
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&!item.expanded  && item.Portfolio_x0020_Type=='Service'"
                                               ng-click="item.expanded=true"
                                               title="Tap to expand the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                            </a>
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&!item.expanded  && item.Portfolio_x0020_Type=='Events'"
                                               ng-click="item.expanded=true"
                                               title="Tap to expand the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                            </a>
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&item.expanded && item.Portfolio_x0020_Type=='Component'"
                                               ng-click="item.expanded=false"
                                               title="Tap to Shrink the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                            </a>
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&item.expanded && item.Portfolio_x0020_Type=='Service'"
                                               ng-click="item.expanded=false"
                                               title="Tap to Shrink the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                            </a>
                                            <a className="hreflink"
                                               ng-show="item.childs.length>0&&item.expanded && item.Portfolio_x0020_Type=='Events'"
                                               ng-click="item.expanded=false"
                                               title="Tap to Shrink the {{item.newTitle}} childs">
                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                            </a>
                                        </div>

                                        <div style={{width: "3%"}} className="padLR">
                                            <div  ng-show="item.Item_x0020_Type!='Others'">
                                                <div ng-show="item.siteType =='Master Tasks'">
                                                    <input ng-if="isOwner==true" type="checkbox" className="mt--2"
                                                        ng-click="setCompareComponents(item,item.select);"
                                                        ng-model="item.select"/>
                                                </div>
                                                <div ng-show="item.siteType !='Master Tasks'">
                                                    <input type="checkbox" ng-click="setSelectTasks(item,item.select);"
                                                        ng-model="item.select"
                                                        className="ng-pristine ng-untouched ng-valid ng-empty mt--2"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{width: "3%"}} className="padLR">
                                            <div ng-show="item.Item_x0020_Type!='Others'">
                                            <img ng-if="item.siteType =='Gruene'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/logo-gruene.png"/>
                                            <img ng-if="item.siteType =='Gender'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_gender.png"/>
                                            <img ng-if="item.siteType =='DE'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_de.png" />
                                            <img ng-if="item.siteType =='DRR'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_drr.png"/>
                                            <img ng-if="item.siteType =='Education'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_education.png"/>
                                            <img ng-if="item.siteType =='EI'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_ei.png"/>
                                            <img ng-if="item.siteType =='EPS'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_eps.png"/>
                                            <img ng-if="item.siteType =='Health'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_health.png"/>
                                            <img ng-if="item.siteType =='QA'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_qa.png"/>
                                            <img ng-if="item.siteType =='Shareweb'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_shareweb.png"/>
                                            <img ng-if="item.siteType =='Offshore Tasks'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/offshore_Tasks.png"/>
                                            <img ng-if="item.siteType =='HHHH'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/icon_hhhh.png"/>
                                            <img ng-if="item.siteType =='Migration'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_migration.png"/>
                                            <img ng-if="item.siteType =='Small Projects'" className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/small_project.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Component'&&item.Portfolio_x0020_Type =='Component'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/component_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Component'&&item.Portfolio_x0020_Type =='Service'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/component_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Component'&&item.Portfolio_x0020_Type =='Events'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/component_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='SubComponent'&&item.Portfolio_x0020_Type =='Component'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/SubComponent_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='SubComponent' &&item.Portfolio_x0020_Type =='Service'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/SubComponent_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='SubComponent' &&item.Portfolio_x0020_Type =='Events'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/SubComponent_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Feature' &&item.Portfolio_x0020_Type =='Component'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/feature_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Feature'&&item.Portfolio_x0020_Type =='Service'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/feature_icon.png"/>
                                            <img ng-if="item.Item_x0020_Type =='Feature'&&item.Portfolio_x0020_Type =='Events'"
                                                 className="button-icon ml-8"
                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/feature_icon.png"/>
                                            <span className="no-padding">
                                                <a className="hreflink" title="Show All Child" data-toggle="modal"
                                                   ng-show="item.childs.length>0 && item.isSearch && !item.isShowActive"
                                                   ng-click="showChilds(item)">
                                                    <img className="wid14"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Add-New-Grey.png"/>
                                                </a>
                                                <a className="hreflink" title="Hide All Child" data-toggle="modal"
                                                   ng-show="item.childs.length>0 && item.isSearch && item.isShowActive"
                                                   ng-click="undoChilds(item)">
                                                    <img className="wid14"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Minus-Gray.png"/>
                                                </a>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="hreflink colm-relative" title="{{item.Shareweb_x0020_IDTooltip}}" style={{width: "7%"}}>
                                            <div ng-show="item.Item_x0020_Type!='Others'">
                                            childs
                                                {/* {{item.Shareweb_x0020_ID}} */}
                                                </div>
                                        </div>
                                        <div style={{width: "30%"}} className="colm-relative" ng-if="item.Item_x0020_Type=='Others'">
                                            <a className="hreflink" ng-bind-html="item.Title"></a>
                                            <span ng-if="item.childs.length!=0 && item.Item_x0020_Type=='Others'">
                                            childs
                                                {/* ({{item.childs.length}}) */}
                                            </span>
                                        </div>
                                        <div style={{width: "30%"}} className="colm-relative" ng-if="item.Item_x0020_Type !='Others'">
                                            <span>
                                                <a ng-show="item.siteType =='Master Tasks' && item.Item_x0020_Type!='Others'"
                                                   target="_blank"
                                                   ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Portfolio-Profile.aspx?taskId={{item.Id}}"
                                                   ng-bind-html="item.Title | trustedHTML">
                                                </a>
                                                <a ng-show="item.siteType !='Master Tasks' && item.Item_x0020_Type!='Others'"
                                                   className="hreflink" target="_blank"
                                                   ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Task-Profile.aspx?taskId={{item.Id}}&Site={{item.siteType}}"
                                                  ng-bind-html="item.Title | trustedHTML">
                                                </a>
                                                <img className="icon-sites-img" ng-show="item.isNewItem"
                                                     title="This item tagged with draft"
                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/NewItemIcon-green.png" />
                                                <a className="hreflink serviceColor_Active"
                                                   ng-show="item.Item_x0020_Type!='Others'"
                                                   ng-click="showChilds(item)">
                                                    <span ng-if="item.childs.length!=0">
                                                    childs
                                                        {/* ({{item.childs.length}}) */}
                                                    </span>
                                                </a>
                                                <span ng-show="item.siteType !='Master Tasks' && item.DescriptionFields.length>0 && item.DescriptionFields[0].Title!=undefined && item.DescriptionFields[0].Title!=''"
                                                      className="project-tool">
                                                    <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/24/infoIcon.png" />
                                                    <span className="tooltipte">
                                                        <span className="tooltiptext">
                                                            <div className="bdrbox pad10 bg-white clearfix">
                                                                <div className="Description desboxulli  PadR0">
                                                                    <div ng-repeat-start='item in item.DescriptionFields track by $index'
                                                                         className="col-sm-12  padL-0 PadR0 "
                                                                         style={{width: "100%"}}>
                                                                        <div className="col-sm-12 padL-0 PadR0"
                                                                             style={{width: "100%",display:"flex"}} >
                                                                            <div className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                <span>
                                                                                    {/* {{$index+1}}. */}
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                <span ng-bind-html="item.Title | trustedHTML"></span>
                                                                            </div>
                                                                        </div>
                                                                        <div ng-repeat='child in item.Subtext track by $index'
                                                                             className="col-sm-12 padL-0 PadR0"
                                                                             style={{width: "100%"}}>
                                                                            <div className="col-sm-12 padL-0 PadR0"
                                                                                 style={{width: "100%",display:"flex"}} >
                                                                                <div style={{flexBasis:"31px"}}
                                                                                     className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                    <span>
                                                                                        {/* {{$parent.$index+1}}.{{$index+1}} */}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                    <span ng-bind-html="child.Title | trustedHTML"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div ng-repeat-end>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                        <div style={{width: "7%"}} className="colm-relative ClientCategoryusers ">
                                            <div className="team-Members-Item">
                                                <div className="user-Member-img"
                                                     ng-repeat="client in item.ClientCategory.results">
                                                    <div className="ClientCategory-Usericon"
                                                         title="{{client.ParentClientCategoryStructure}}">
                                                        {/* {{client.Title.slice(0, 2).toUpperCase()}} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{width: "7%"}} className="colm-relative">
                                            <span>PercentComplete
                                                {/* {{item.PercentComplete}} */}
                                                </span>
                                        </div>
                                        <div style={{width: "7%"}} className="colm-relative">
                                            <span>ItemRank
                                                {/* {{item.ItemRank}} */}
                                                </span>
                                        </div>

                                        <div style={{width: "10%"}} className="colm-relative">
                                            <span ng-if="item.Item_x0020_Type!='Others'">
                                                controller
                                                {/* <show-task-team sentid="item.Id" sentitem="item"
                                                                webpartid="'ShowTaskTeamController'"></show-task-team> */}
                                            </span>

                                        </div>
                                        <div style={{width: "9%"}} className="colm-relative">
                                            {/* {{item.EarliestDate }} */}
                                            EarliestDate
                                        </div>
                                        <div style={{width: "9%"}} className="colm-relative">
                                            {/* {{item.DateCreated }} */}
                                            DateCreated
                                            <img ng-if="item.autherimage==null && item.Item_x0020_Type!='Others'" 
                                            // Title={{item.Author}}
                                                 className="AssignUserPhoto userimgsize1"
                                                 src="{{baseUrl}}/PublishingImages/Portraits/icon_user.jpg"/>
                                            <img ng-if="item.autherimage!=null" 
                                            // Title={{item.Author}}
                                                 className="AssignUserPhoto userimgsize1" src="{{item.autherimage}}"/>
                                        </div>
                                        <div style={{width: "7%"}} className="colm-relative">
                                            <span ng-show="item.Item_x0020_Type=='Task'">
                                            Effort
                                                {/* {{item.Effort}} */}
                                            </span>
                                        </div>
                                        <div style={{width: "2%"}} className="padLR">
                                            {/* <!--<a className="hreflink" title="Add Time" data-toggle="modal"
                                            ng-show="item.Item_x0020_Type=='Task'"
                                            ng-click="EditTask(item,'TimeTabActive')">--> */}
                                            <span className="tasktimtooltip"
                                                  ng-show="item.siteType!=undefined && item.siteType!='Master Tasks'&&item.siteType!='Others'&&item.Title!='Tasks'">
                                                {/* <task-time-overview itemtype="item.Portfolio_x0020_Type"
                                                                    showtime="false" sitetype="item.siteType" id="item.Id"
                                                                    sitetitle="item.Title" item="item" taskuser="" sentitem=""
                                                                    webpartid="'TaskTimeOverviewController'">
                                                </task-time-overview> */}
                                                task-time-overview
                                            </span>
                                           
                                        </div>
                                        <div style={{width: "2%"}} className="padLR">
                                            <a className="hreflink" title="Restructuring Tool" data-toggle="modal"
                                               ng-show="item.isRestructureActive && item.Item_x0020_Type!='Others'"
                                               target="_blank" ng-click="openRestructuringPopup(item)">
                                                <img className="icon-sites-img"
                                                     ng-show="item.Portfolio_x0020_Type =='Service'"
                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                                <img className="icon-sites-img"
                                                     ng-show="item.Portfolio_x0020_Type =='Events'"
                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                                <img className="icon-sites-img"
                                                     ng-show="item.Portfolio_x0020_Type =='Component'"
                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                            </a>
                                        </div>
                                        <div style={{width: "2%"}} className="padLR">
                                            <a className="hreflink" ng-if="isOwner && item.Item_x0020_Type!='Others'"
                                               title="Edit {{item.newTitle}}" data-toggle="modal"
                                               ng-click="EditTask(item)">
                                                <img className="img-focus" ng-src="/_layouts/images/edititem.gif"/>
                                            </a>
                                        </div>
                                    </li>
                                    <li ng-if="item.expanded " className="active" ng-repeat-end>
                                        <ul className="table">
                                            <li ng-if="item.childs.length >0 && child.flag ==true"
                                                ng-repeat-start="child in filterComponent=(item.childs)"
                                                lvl-drop-target="true" on-drop="dropped(dragSrc,child)"
                                                className="{{child.siteType =='Master Tasks'?'for-c0l':''}} for-lis tdrows">
                                                <div style={{width: "2%"}} className="padLR">
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&!child.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                       ng-click="child.expanded=true"
                                                       title="Tap to expand the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                                    </a>
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&!child.expanded  && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                       ng-click="child.expanded=true"
                                                       title="Tap to expand the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                                    </a>
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&!child.expanded  && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                       ng-click="child.expanded=true"
                                                       title="Tap to expand the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                                    </a>
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&child.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                       ng-click="child.expanded=false"
                                                       title="Tap to Shrink the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                                    </a>
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&child.expanded && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                       ng-click="child.expanded=false"
                                                       title="Tap to Shrink the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                                    </a>
                                                    <a className="hreflink"
                                                       ng-show="child.childs.length>0&&child.expanded && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                       ng-click="child.expanded=false"
                                                       title="Tap to Shrink the {{child.newTitle}} childs">
                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                                    </a>
                                                </div>

                                                <div style={{width: "3%"}} className="padLR">
                                                    <div ng-show="child.siteType =='Master Tasks' && child.Item_x0020_Type!='Others'">
                                                        <input ng-if="isOwner==true" type="checkbox" className="mt--2"
                                                               ng-click="setCompareComponents(child,child.select);"
                                                               ng-model="child.select"/>
                                                    </div>
                                                    <div ng-show="child.siteType !='Master Tasks'  && child.Item_x0020_Type!='Others'">
                                                        <input type="checkbox"
                                                               ng-click="setSelectTasks(child,child.select);"
                                                               ng-model="child.select"
                                                               className="mt--2 ng-pristine ng-untouched ng-valid ng-empty"/>
                                                    </div>
                                                </div>
                                                <div style={{width: "3%"}} className="padLR">
                                                    <img ng-if="child.siteType =='Gruene'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/logo-gruene.png"/>
                                                    <img ng-if="child.siteType =='Gender'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_gender.png"/>
                                                    <img ng-if="child.siteType =='DE'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_de.png" />
                                                    <img ng-if="child.siteType =='DRR'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_drr.png"/>
                                                    <img ng-if="child.siteType =='Education'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_education.png"/>
                                                    <img ng-if="child.siteType =='EI'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_ei.png"/>
                                                    <img ng-if="child.siteType =='EPS'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_eps.png"/>
                                                    <img ng-if="child.siteType =='Health'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_health.png"/>
                                                    <img ng-if="child.siteType =='QA'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_qa.png"/>
                                                    <img ng-if="child.siteType =='Shareweb'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_shareweb.png"/>
                                                    <img ng-if="item.siteType =='Offshore Tasks'" className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/offshore_Tasks.png"/>
                                                    <img ng-if="child.siteType =='HHHH'" className="button-icon ml-8  "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/icon_hhhh.png"/>
                                                    <img ng-if="child.siteType =='Migration'" className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_migration.png"/>
                                                    <img ng-if="child.siteType =='Small Projects'" className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/small_project.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Component'&&child.Portfolio_x0020_Type =='Component'"
                                                         className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/component_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Component'&&child.Portfolio_x0020_Type =='Service'"
                                                         className="button-icon  ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/component_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Component'&&child.Portfolio_x0020_Type =='Events'"
                                                         className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/component_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='SubComponent'&&child.Portfolio_x0020_Type =='Component'"
                                                         className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/SubComponent_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='SubComponent' &&child.Portfolio_x0020_Type =='Service'"
                                                         className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/SubComponent_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='SubComponent' &&child.Portfolio_x0020_Type =='Events'"
                                                         className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/SubComponent_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Feature' &&child.Portfolio_x0020_Type =='Component'"
                                                         className="button-icon  ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/feature_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Feature'&&child.Portfolio_x0020_Type =='Service'"
                                                         className="button-icon ml-8 "
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/feature_icon.png"/>
                                                    <img ng-if="child.Item_x0020_Type =='Feature'&&child.Portfolio_x0020_Type =='Events'"
                                                         className="button-icon ml-8"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/feature_icon.png"/>
                                                    <div className="no-padding">
                                                        <a className="hreflink" title="Show All Child" data-toggle="modal"
                                                           ng-show="child.childs.length>0 && child.isSearch && !child.isShowActive"
                                                           ng-click="showChilds(child)">
                                                            <img className="wid14"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Add-New-Grey.png"/>
                                                        </a>
                                                        <a className="hreflink" title="Hide All Child" data-toggle="modal"
                                                           ng-show="child.childs.length>0 && child.isSearch && child.isShowActive"
                                                           ng-click="undoChilds(child)">
                                                            <img className="wid14"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Minus-Gray.png"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="hreflink colm-relative" title="{{child.Shareweb_x0020_IDTooltip}}"
                                                     style={{width: "7%"}}>
                                                        Shareweb_x0020_ID
                                                    {/* {{child.Shareweb_x0020_ID}} */}
                                                </div>
                                                <div style={{width: "30%"}} className="colm-relative">
                                                    <a target="_blank"
                                                       ng-if="child.siteType =='Master Tasks'  && child.Item_x0020_Type!='Others'"
                                                       ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Portfolio-Profile.aspx?taskId={{child.Id}}"
                                                       >
                                                        {/* {{child.Title}} */}
                                                        </a>
                                                    <a target="_blank"
                                                       ng-if="child.siteType !='Master Tasks'  && child.Item_x0020_Type!='Others'"
                                                       ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Task-Profile.aspx?taskId={{child.Id}}&Site={{child.siteType}}"
                                                       >
                                                        {/* {{child.Title}} */}
                                                        </a>
                                                    <a ng-if="hild.Item_x0020_Type=='Others'"
                                                       >
                                                        {/* {{child.Title}} */}
                                                        </a>
                                                    <img className="icon-sites-img" ng-show="child.isNewItem"
                                                         title="This item tagged with draft"
                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/NewItemIcon-green.png" />
                                                    <a className="hreflink serviceColor_Active"
                                                       ng-show="child.Item_x0020_Type!='Others'"
                                                       ng-click="showChilds(child)">
                                                        <span ng-if="child.childs.length!=0">
                                                            {/* ({{child.childs.length}}) */}
                                                        </span>
                                                    </a>
                                                    <span ng-show="child.Item_x0020_Type=='Others' && child.childs.length!=0">
                                                        {/* ({{child.childs.length}}) */}
                                                    </span>
                                                    <span ng-show="child.siteType !='Master Tasks' && child.DescriptionFields.length>0 && child.DescriptionFields[0].Title!=undefined && child.DescriptionFields[0].Title!=''"
                                                          className="project-tool">
                                                        <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/24/infoIcon.png" />
                                                        <span className="tooltipte">
                                                            <span className="tooltiptext">
                                                                <div className="bdrbox pad10 bg-white clearfix">
                                                                    <div className="Description desboxulli  PadR0">
                                                                        <div ng-repeat-start='item in child.DescriptionFields track by $index'
                                                                             className="col-sm-12  padL-0 PadR0 "
                                                                             style={{width: "100%"}}>
                                                                            <div className="col-sm-12 padL-0 PadR0"
                                                                                 style={{width: "100%",display:"flex"}} >
                                                                                <div className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                    <span>
                                                                                        {/* {{$index+1}}. */}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                    <span ng-bind-html="item.Title | trustedHTML"></span>
                                                                                </div>
                                                                            </div>
                                                                            <div ng-repeat='child in item.Subtext track by $index'
                                                                                 className="col-sm-12 padL-0 PadR0"
                                                                                 style={{width: "100%"}}>
                                                                                <div className="col-sm-12 padL-0 PadR0"
                                                                                     style={{width: "100%",display:"flex"}} >
                                                                                    <div style={{flexBasis:"31px"}}
                                                                                         className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                        <span>
                                                                                            parent index
                                                                                            {/* {{$parent.$index+1}}.{{$index+1}} */}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                        <span ng-bind-html="child.Title | trustedHTML"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="clearfix"></div>
                                                                            </div>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                        <div ng-repeat-end>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                                <div style={{width: "7%"}} className="colm-relative">
                                                    <div className="team-Members-Item">
                                                        <div className="user-Member-img"
                                                             ng-repeat="client in child.ClientCategory.results">
                                                            <div className="ClientCategory-Usericon"
                                                                 title="{{client.ParentClientCategoryStructure}}">
                                                                    client
                                                                {/* {{client.Title.slice(0, 2).toUpperCase()}} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{width: "7%"}} className="colm-relative">
                                                    <span>PercentComplete
                                                        {/* {{child.PercentComplete}} */}
                                                        </span>
                                                </div>
                                                <div style={{width: "7%"}} className="colm-relative">
                                                    <span>
                                                    ItemRank
                                                        {/* {{child.ItemRank}} */}
                                                        </span>
                                                </div>
                                                <div style={{width: "10%"}} className="colm-relative">
                                                    child
                                                    {/* <show-task-team sentid="child.Id" sentitem="child"
                                                                    webpartid="'ShowTaskTeamController'"></show-task-team> */}
                                                </div>
                                                <div style={{width: "9%"}} className="colm-relative">
                                                EarliestDate
                                                    {/* {{child.EarliestDate }} */}
                                                </div>
                                                <div style={{width: "9%"}} className="colm-relative">
                                                DateCreated
                                                    {/* {{child.DateCreated }} */}
                                                    <img ng-if="child.autherimage==null" 
                                                    // Title={{child.Author}}
                                                         className="AssignUserPhoto userimgsize1"
                                                         src="{{baseUrl}}/PublishingImages/Portraits/icon_user.jpg"/>
                                                    <img ng-if="child.autherimage!=null"
                                                    //  Title={{child.Author}}
                                                         className="AssignUserPhoto userimgsize1" src="{{child.autherimage}}"/>
                                                </div>
                                                <div style={{width: "7%"}} className="colm-relative">
                                                    <span ng-show="child.Item_x0020_Type=='Task'">
                                                        {/* {{child.Effort}} */}
                                                    </span>
                                                </div>
                                                <div style={{width: "2%"}} className="padLR">
                                                    <span className="tasktimtooltip"
                                                          ng-show="child.siteType!=undefined && child.siteType!='Master Tasks'">
                                                            task-time-overview
                                                        {/* <task-time-overview itemtype="child.Portfolio_x0020_Type"
                                                                            showtime="false" sitetype="child.siteType" id="child.Id"
                                                                            sitetitle="child.Title" item="child" taskuser="" sentitem=""
                                                                            webpartid="'TaskTimeOverviewController'">
                                                        </task-time-overview> */}
                                                    </span>
                                                </div>
                                                <div style={{width: "2%"}} className="padLR">
                                                    <a className="hreflink" title="Restructuring Tool" data-toggle="modal"
                                                       ng-show="child.isRestructureActive && child.Item_x0020_Type!='Others'"
                                                       ng-click="openRestructuringPopup(child)">
                                                        <img className="icon-sites-img"
                                                             ng-show="child.Portfolio_x0020_Type =='Service'"
                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                                        <img className="icon-sites-img"
                                                             ng-show="child.Portfolio_x0020_Type =='Events'"
                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                                        <img className="icon-sites-img"
                                                             ng-show="child.Portfolio_x0020_Type =='Component'"
                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                                    </a>
                                                </div>
                                                <div style={{width: "2%"}} className="padLR">
                                                    <a className="hreflink"
                                                       ng-if="isOwner && child.Item_x0020_Type!='Others'"
                                                       title="Edit {{child.newTitle}}" data-toggle="modal"
                                                       ng-click="EditTask(child)">
                                                        <img className="img-focus" ng-src="/_layouts/images/edititem.gif"/>
                                                    </a>
                                                </div>
                                            </li>
                                            <li ng-if="child.expanded " className=" active" ng-repeat-end>
                                                <ul className="table">
                                                    <li ng-if="subchild.flag==true"
                                                        ng-repeat-start="subchild in filterComponent=(child.childs)"
                                                        lvl-drop-target="true" on-drop="dropped(dragSrc,subchild)"
                                                        className="for-lis {{subchild.siteType =='Master Tasks'?'for-c02':''}}  tdrows">
                                                        <div style={{width: "2%"}} className="padLR">
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&!subchild.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                               ng-click="subchild.expanded=true"
                                                               title="Tap to expand the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                                            </a>
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&!subchild.expanded  && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                               ng-click="subchild.expanded=true"
                                                               title="Tap to expand the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                                            </a>
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&!subchild.expanded  && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                               ng-click="subchild.expanded=true"
                                                               title="Tap to expand the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                                            </a>
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&subchild.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                               ng-click="subchild.expanded=false"
                                                               title="Tap to Shrink the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                                            </a>
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&subchild.expanded && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                               ng-click="subchild.expanded=false"
                                                               title="Tap to Shrink the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                                            </a>
                                                            <a className="hreflink"
                                                               ng-show="subchild.childs.length>0&&subchild.expanded && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                               ng-click="subchild.expanded=false"
                                                               title="Tap to Shrink the {{subchild.newTitle}} childs">
                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                                            </a>
                                                        </div>

                                                        <div style={{width: "3%"}} className="padLR">
                                                            <div ng-show="subchild.siteType =='Master Tasks'">
                                                                <input ng-if="isOwner==true" type="checkbox"
                                                                       className="mt--2"
                                                                       ng-click="setCompareComponents(subchild,subchild.select);"
                                                                       ng-model="subchild.select"/>
                                                            </div>
                                                            <div ng-show="subchild.siteType !='Master Tasks'">
                                                                <input type="checkbox"
                                                                       ng-click="setSelectTasks(subchild,subchild.select);"
                                                                       ng-model="subchild.select"
                                                                       className="mt--2 ng-pristine ng-untouched ng-valid ng-empty"/>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "3%"}} className="padLR">
                                                            <img ng-if="subchild.siteType =='Gruene'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/logo-gruene.png"/>
                                                            <img ng-if="subchild.siteType =='Gender'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_gender.png"/>
                                                            <img ng-if="subchild.siteType =='DE'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_de.png" />
                                                            <img ng-if="subchild.siteType =='DRR'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_drr.png"/>
                                                            <img ng-if="subchild.siteType =='Education'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_education.png"/>
                                                            <img ng-if="subchild.siteType =='EI'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_ei.png"/>
                                                            <img ng-if="subchild.siteType =='EPS'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_eps.png"/>
                                                            <img ng-if="subchild.siteType =='Health'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_health.png"/>
                                                            <img ng-if="subchild.siteType =='QA'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_qa.png"/>
                                                            <img ng-if="subchild.siteType =='Shareweb'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_shareweb.png"/>
                                                            <img ng-if="item.siteType =='Offshore Tasks'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/offshore_Tasks.png"/>
                                                            <img ng-if="subchild.siteType =='HHHH'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/icon_hhhh.png"/>
                                                            <img ng-if="subchild.siteType =='Migration'" className="button-icon ml-8"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_migration.png"/>
                                                            <img ng-if="subchild.siteType =='Small Projects'"
                                                                 className="button-icon ml-5"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/small_project.png"/>
                                                            <span className="no-padding">
                                                                <a className="hreflink" title="Show All Child"
                                                                   data-toggle="modal"
                                                                   ng-show="subchild.childs.length>0 && subchild.isSearch && !subchild.isShowActive"
                                                                   ng-click="showChilds(subchild)">
                                                                    <img className="wid14"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Add-New-Grey.png"/>
                                                                </a>
                                                                <a className="hreflink" title="Hide All Child"
                                                                   data-toggle="modal"
                                                                   ng-show="subchild.childs.length>0 && subchild.isSearch && subchild.isShowActive"
                                                                   ng-click="undoChilds(subchild)">
                                                                    <img className="wid14"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Minus-Gray.png"/>

                                                                </a>
                                                            </span>

                                                        </div>
                                                        
                                                        <div className="hreflink colm-relative"
                                                             title="{{subchild.Shareweb_x0020_IDTooltip}}"
                                                             style={{width: "7%"}}>
                                                                 subchild
                                                            {/* {{subchild.Shareweb_x0020_ID}} */}
                                                        </div>
                                                        <div style={{width: "30%"}} className="colm-relative">
                                                            <a target="_blank"
                                                               ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Task-Profile.aspx?taskId={{subchild.Id}}&Site={{subchild.siteType}}"
                                                               >subchild
                                                                {/* {{subchild.Title}} */}
                                                                </a>
                                                            <a className="hreflink serviceColor_Active"
                                                               ng-click="showChilds(subchild)">
                                                                <span ng-if="subchild.childs.length!=0">
                                                                subchild
                                                                    {/* ({{subchild.childs.length}}) */}
                                                                </span>
                                                            </a>
                                                            <img className="icon-sites-img" ng-show="subchild.isNewItem"
                                                                 title="This item tagged with draft"
                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/NewItemIcon-green.png" />
                                                            <span ng-show="subchild.siteType !='Master Tasks' && subchild.DescriptionFields.length>0 && subchild.DescriptionFields[0].Title!=undefined && subchild.DescriptionFields[0].Title!=''"
                                                                  className="project-tool">
                                                                <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/24/infoIcon.png" />
                                                                <span className="tooltipte">
                                                                    <span className="tooltiptext">
                                                                        <div className="bdrbox pad10 bg-white clearfix">
                                                                            <div className="Description desboxulli  PadR0">
                                                                                <div ng-repeat-start='item in subchild.DescriptionFields track by $index'
                                                                                     className="col-sm-12  padL-0 PadR0 "
                                                                                     style={{width: "100%"}}>
                                                                                    <div className="col-sm-12 padL-0 PadR0"
                                                                                         style={{width: "100%",display:"flex"}} >
                                                                                        <div className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                            <span>
                                                                                                index
                                                                                                {/* {{$index+1}}. */}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                            <span ng-bind-html="item.Title | trustedHTML"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div ng-repeat='child in item.Subtext track by $index'
                                                                                         className="col-sm-12 padL-0 PadR0"
                                                                                         style={{width: "100%"}}>
                                                                                        <div className="col-sm-12 padL-0 PadR0"
                                                                                             style={{width: "100%",display:"flex"}} >
                                                                                            <div style={{flexBasis:"31px"}}
                                                                                                 className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                                <span>
                                                                                                    parent
                                                                                                    {/* {{$parent.$index+1}}.{{$index+1}} */}
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                                <span ng-bind-html="child.Title | trustedHTML"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="clearfix"></div>
                                                                                    </div>
                                                                                    <div className="clearfix"></div>
                                                                                </div>
                                                                                <div ng-repeat-end>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div style={{width: "7%"}} className="colm-relative">
                                                            <div className="team-Members-Item">
                                                                <div className="user-Member-img"
                                                                     ng-repeat="client in subchild.ClientCategory.results">
                                                                    <div className="ClientCategory-Usericon"
                                                                         title="{{client.ParentClientCategoryStructure}}">
                                                                            client
                                                                        {/* {{client.Title.slice(0, 2).toUpperCase()}} */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "7%"}} className="colm-relative">
                                                            <span>
                                                            PercentComplete
                                                                {/* {{subchild.PercentComplete}} */}
                                                                </span>
                                                        </div>
                                                        <div style={{width: "7%"}} className="colm-relative">
                                                            <span>
                                                            ItemRank
                                                                {/* {{subchild.ItemRank}} */}
                                                                </span>
                                                        </div>

                                                        <div style={{width: "10%"}} className="colm-relative">
                                                            {/* <show-task-team sentid="subchild.Id" sentitem="subchild"
                                                                            webpartid="'ShowTaskTeamController'"></show-task-team> */}
                                                        </div>
                                                        <div style={{width: "9%"}} className="colm-relative">
                                                            {/* {{subchild.EarliestDate }} */}
                                                            EarliestDate
                                                        </div>
                                                        <div style={{width: "9%"}} className="colm-relative">
                                                            {/* {{subchild.DateCreated }} */}DateCreated
                                                            <img ng-if="subchild.autherimage==null" 
                                                            // Title={{subchild.Author}}
                                                                 className="AssignUserPhoto userimgsize1"
                                                                 src="{{baseUrl}}/PublishingImages/Portraits/icon_user.jpg"/>
                                                            <img ng-if="subchild.autherimage!=null" 
                                                            // Title={{subchild.Author}}
                                                                 className="AssignUserPhoto userimgsize1" src="{{subchild.autherimage}}"/>
                                                        </div>
                                                        <div style={{width: "7%"}} className="colm-relative">
                                                            <span ng-show="subchild.Item_x0020_Type=='Task'">
                                                                {/* {{subchild.Effort}} */}Effort

                                                            </span>
                                                        </div>
                                                        <div style={{width: "2%"}} className="padLR">
                                                            <span className="tasktimtooltip"
                                                                  ng-show="subchild.siteType!=undefined && subchild.siteType!='Master Tasks'">
                                                                {/* <task-time-overview itemtype="subchild.Portfolio_x0020_Type"
                                                                                    showtime="false" sitetype="subchild.siteType"
                                                                                    id="subchild.Id" sitetitle="subchild.Title"
                                                                                    item="subchild" taskuser="" sentitem=""
                                                                                    webpartid="'TaskTimeOverviewController'">
                                                                </task-time-overview> */}
                                                            </span>
                                                        </div>
                                                        <div style={{width: "2%"}} className="padLR">
                                                            <a className="hreflink" title="Restructuring Tool"
                                                               data-toggle="modal"
                                                               ng-show="subchild.isRestructureActive"
                                                               ng-click="openRestructuringPopup(subchild)">
                                                                <img className="icon-sites-img"
                                                                     ng-show="subchild.Portfolio_x0020_Type =='Service'"
                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                                                <img className="icon-sites-img"
                                                                     ng-show="subchild.Portfolio_x0020_Type =='Events'"
                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                                                <img className="icon-sites-img"
                                                                     ng-show="subchild.Portfolio_x0020_Type =='Component'"
                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                                            </a>
                                                        </div>
                                                        <div style={{width: "2%"}} className="padLR">
                                                            <a className="hreflink" title="Edit {{subchild.newTitle}}"
                                                               data-toggle="modal" ng-click="EditTask(subchild)">
                                                                <img className="img-focus"
                                                                     ng-src="/_layouts/images/edititem.gif"/>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li ng-if="subchild.expanded" className="active" ng-repeat-end>
                                                        <ul className="table">
                                                            <li ng-if="featurechilds.flag==true"
                                                                ng-repeat-start="featurechilds in filterComponent=(subchild.childs)"
                                                                lvl-drop-target="true"
                                                                on-drop="dropped(dragSrc,featurechilds)"
                                                                className="for-lis  {{featurechilds.siteType =='Master Tasks'?'for-c03':''}} tdrows">
                                                                <div style={{width: "2%"}} className="padLR">
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&!featurechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                                       ng-click="featurechilds.expanded=true"
                                                                       title="Tap to expand the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                                                    </a>
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&!featurechilds.expanded  && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                                       ng-click="featurechilds.expanded=true"
                                                                       title="Tap to expand the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                                                    </a>
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&!featurechilds.expanded  && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                                       ng-click="featurechilds.expanded=true"
                                                                       title="Tap to expand the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                                                    </a>
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&featurechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                                       ng-click="featurechilds.expanded=false"
                                                                       title="Tap to Shrink the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                                                    </a>
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&featurechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                                       ng-click="featurechilds.expanded=false"
                                                                       title="Tap to Shrink the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                                                    </a>
                                                                    <a className="hreflink"
                                                                       ng-show="featurechilds.childs.length>0&&featurechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                                       ng-click="featurechilds.expanded=false"
                                                                       title="Tap to Shrink the {{featurechilds.newTitle}} childs">
                                                                        <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                                                    </a>
                                                                </div>

                                                                <div style={{width: "3%"}} className="padLR">
                                                                    <div ng-show="featurechilds.siteType =='Master Tasks'">
                                                                        <input ng-if="isOwner==true" className="mt--2"
                                                                               type="checkbox"
                                                                               ng-click="setCompareComponents(featurechilds,featurechilds.select);"
                                                                               ng-model="featurechilds.select"/>
                                                                    </div>
                                                                    <div ng-show="featurechilds.siteType !='Master Tasks'">
                                                                        <input type="checkbox"
                                                                               ng-click="setSelectTasks(featurechilds,featurechilds.select);"
                                                                               ng-model="featurechilds.select"
                                                                               className="mt--2 ng-pristine ng-untouched ng-valid ng-empty"/>
                                                                    </div>
                                                                </div>
                                                                <div style={{width: "3%"}} className="padLR">
                                                                    <img ng-if="featurechilds.siteType =='Gruene'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/logo-gruene.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Gender'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_gender.png"/>
                                                                    <img ng-if="featurechilds.siteType =='DE'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_de.png" />
                                                                    <img ng-if="featurechilds.siteType =='DRR'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_drr.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Education'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_education.png"/>
                                                                    <img ng-if="featurechilds.siteType =='EI'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_ei.png"/>
                                                                    <img ng-if="featurechilds.siteType =='EPS'"
                                                                         className="button-icon ml-5"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_eps.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Health'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_health.png"/>
                                                                    <img ng-if="featurechilds.siteType =='QA'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_qa.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Shareweb'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_shareweb.png"/>
                                                                    <img ng-if="item.siteType =='Offshore Tasks'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/offshore_Tasks.png"/>
                                                                    <img ng-if="featurechilds.siteType =='HHHH'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/icon_hhhh.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Migration'" className="button-icon ml-8"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_migration.png"/>
                                                                    <img ng-if="featurechilds.siteType =='Small Projects'"
                                                                         className="button-icon ml-10"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/small_project.png"/>
                                                                    <span className="no-padding">
                                                                        <a className="hreflink" title="Show All Child"
                                                                           data-toggle="modal"
                                                                           ng-show="featurechilds.childs.length>0 && featurechilds.isSearch && !featurechilds.isShowActive"
                                                                           ng-click="showChilds(featurechilds)">
                                                                            <img className="wid14"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Add-New-Grey.png"/>
                                                                        </a>
                                                                        <a className="hreflink" title="Hide All Child"
                                                                           data-toggle="modal"
                                                                           ng-show="featurechilds.childs.length>0 && featurechilds.isSearch && featurechilds.isShowActive"
                                                                           ng-click="undoChilds(featurechilds)">
                                                                            <img className="wid14"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Minus-Gray.png"/>

                                                                        </a>
                                                                    </span>
                                                                </div>
                                                                
                                                                <div className="hreflink colm-relative"
                                                                     title="{{featurechilds.Shareweb_x0020_IDTooltip}}"
                                                                     style={{width: "7%"}}>
                                                                        Shareweb_x0020_ID
                                                                    {/* {{featurechilds.Shareweb_x0020_ID}} */}
                                                                </div>
                                                                <div style={{width: "30%"}} className="colm-relative">
                                                                    <a target="_blank"
                                                                       ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Task-Profile.aspx?taskId={{featurechilds.Id}}&Site={{featurechilds.siteType}}"
                                                                       >
                                                                        {/* {{featurechilds.Title}} */}
                                                                        featurechilds
                                                                        </a>
                                                                    <a className="hreflink serviceColor_Active"
                                                                       ng-click="showChilds(featurechilds)">
                                                                        <span ng-if="featurechilds.childs.length!=0">
                                                                            {/* ({{featurechilds.childs.length}}) */}
                                                                            featurechilds length
                                                                        </span>
                                                                    </a>
                                                                    <img className="icon-sites-img"
                                                                         ng-show="featurechilds.isNewItem"
                                                                         title="This item tagged with draft"
                                                                         ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/NewItemIcon-green.png" />
                                                                    <span ng-show="featurechilds.siteType !='Master Tasks' && featurechilds.DescriptionFields.length>0 && featurechilds.DescriptionFields[0].Title!=undefined && featurechilds.DescriptionFields[0].Title!=''"
                                                                          className="project-tool">
                                                                        <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/24/infoIcon.png" />
                                                                        <span className="tooltipte">
                                                                            <span className="tooltiptext">
                                                                                <div className="bdrbox pad10 bg-white clearfix">
                                                                                    <div className="Description desboxulli  PadR0">
                                                                                        <div ng-repeat-start='item in featurechilds.DescriptionFields track by $index'
                                                                                             className="col-sm-12  padL-0 PadR0 "
                                                                                             style={{width: "100%"}}>
                                                                                            <div className="col-sm-12 padL-0 PadR0"
                                                                                                 style={{width: "100%",display:"flex"}} >
                                                                                                <div className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                                    <span>
                                                                                                        {/* {{$index+1}}. */}
                                                                                                        index
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                                    <span ng-bind-html="item.Title | trustedHTML"></span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div ng-repeat='child in item.Subtext track by $index'
                                                                                                 className="col-sm-12 padL-0 PadR0"
                                                                                                 style={{width: "100%"}}>
                                                                                                <div className="col-sm-12 padL-0 PadR0"
                                                                                                     style={{width: "100%",display:"flex"}} >
                                                                                                    <div style={{flexBasis:"31px"}}
                                                                                                         className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                                        <span>
                                                                                                            {/* {{$parent.$index+1}}.{{$index+1}} */}
                                                                                                            index+1
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                                        <span ng-bind-html="child.Title | trustedHTML"></span>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="clearfix">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="clearfix"></div>
                                                                                        </div>
                                                                                        <div ng-repeat-end>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div style={{width: "7%"}} className="colm-relative">
                                                                    <div className="team-Members-Item">
                                                                        <div className="user-Member-img"
                                                                             ng-repeat="client in featurechilds.ClientCategory.results">
                                                                            <div className="ClientCategory-Usericon"
                                                                                 title="{{client.ParentClientCategoryStructure}}">
                                                                                {/* {{
                                                                                    client.Title.slice(0,
                                                                                2).toUpperCase()
                                                                                }} */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div style={{width: "7%"}} className="colm-relative">
                                                                    <span>
                                                                        {/* {{featurechilds.PercentComplete}} */}PercentComplete
                                                                        </span>
                                                                </div>
                                                                <div style={{width: "7%"}} className="colm-relative">
                                                                    <span>
                                                                        {/* {{featurechilds.ItemRank}} */}
                                                                        ItemRank
                                                                        </span>
                                                                </div>
                                                                <div style={{width: "10%"}} className="colm-relative">
                                                                task
                                                                    {/* <show-task-team sentid="featurechilds.Id"
                                                                                    sentitem="featurechilds"
                                                                                    webpartid="'ShowTaskTeamController'">
                                                                    </show-task-team> */}
                                                                </div>
                                                                <div style={{width: "9%"}} className="colm-relative">
                                                                    {/* {{featurechilds.EarliestDate }} */}EarliestDate
                                                                </div>
                                                                <div style={{width: "9%"}} className="colm-relative">
                                                                    {/* {{featurechilds.DateCreated }} */}DateCreated
                                                                    <img ng-if="featurechilds.autherimage==null" 
                                                                    // Title={{featurechilds.Author}}
                                                                         className="AssignUserPhoto userimgsize1"
                                                                         src="{{baseUrl}}/PublishingImages/Portraits/icon_user.jpg"/>
                                                                    <img ng-if="featurechilds.autherimage!=null" 
                                                                    // Title={{featurechilds.Author}}
                                                                         className="AssignUserPhoto userimgsize1" src="{{featurechilds.autherimage}}"/>
                                                                </div>
                                                                <div style={{width: "7%"}} className="colm-relative">
                                                                    <span ng-show="featurechilds.Item_x0020_Type=='Task'">
                                                                        {/* {{featurechilds.Effort}} */}

                                                                    </span>
                                                                </div>
                                                                <div style={{width: "2%"}} className="padLR">
                                                                    <span className="tasktimtooltip"
                                                                          ng-show="featurechilds.siteType!=undefined && featurechilds.siteType!='Master Tasks'">
                                                                        {/* <task-time-overview itemtype="featurechilds.Portfolio_x0020_Type"
                                                                                            showtime="false"
                                                                                            sitetype="featurechilds.siteType"
                                                                                            id="featurechilds.Id"
                                                                                            sitetitle="featurechilds.Title"
                                                                                            item="featurechilds" taskuser="" sentitem=""
                                                                                            webpartid="'TaskTimeOverviewController'">
                                                                        </task-time-overview> */}
                                                                    </span>
                                                                </div>
                                                                <div style={{width: "2%"}} className="padLR">
                                                                    <a className="hreflink" title="Restructuring Tool"
                                                                       data-toggle="modal"
                                                                       ng-show="featurechilds.isRestructureActive"
                                                                       ng-click="openRestructuringPopup(featurechilds)">
                                                                        <img className="icon-sites-img"
                                                                             ng-show="featurechilds.Portfolio_x0020_Type =='Service'"
                                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                                                        <img className="icon-sites-img"
                                                                             ng-show="featurechilds.Portfolio_x0020_Type =='Events'"
                                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                                                        <img className="icon-sites-img"
                                                                             ng-show="featurechilds.Portfolio_x0020_Type =='Component'"
                                                                             ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                                                    </a>

                                                                </div>
                                                                <div style={{width: "2%"}} className="padLR">
                                                                    <a className="hreflink"
                                                                       title="Edit {{featurechilds.newTitle}}"
                                                                       data-toggle="modal"
                                                                       ng-click="EditTask(featurechilds)">
                                                                        <img className="img-focus"
                                                                             ng-src="/_layouts/images/edititem.gif"/>
                                                                    </a>
                                                                </div>
                                                            </li>
                                                            <li ng-if="featurechilds.expanded" className="active"
                                                                ng-repeat-end>
                                                                <ul className="table">
                                                                    <li ng-if="nextfeaturechilds.flag==true"
                                                                        ng-repeat="nextfeaturechilds in filterComponent=(featurechilds.childs)"
                                                                        lvl-drop-target="true"
                                                                        on-drop="dropped(dragSrc,featurechilds)"
                                                                        className="for-lis {{nextfeaturechilds.siteType =='Master Tasks'?'for-c03':''}} tdrows">
                                                                        <div style={{width: "2%"}} className="padLR">
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&!nextfeaturechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                                               ng-click="nextfeaturechilds.expanded=true"
                                                                               title="Tap to expand the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/right-list-icon.png"/>
                                                                            </a>
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&!nextfeaturechilds.expanded  && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                                               ng-click="nextfeaturechilds.expanded=true"
                                                                               title="Tap to expand the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png"/>
                                                                            </a>
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&!featurechilds.expanded  && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                                               ng-click="nextfeaturechilds.expanded=true"
                                                                               title="Tap to expand the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png"/>
                                                                            </a>
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&nextfeaturechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Component'"
                                                                               ng-click="nextfeaturechilds.expanded=false"
                                                                               title="Tap to Shrink the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/24/list-icon.png"/>
                                                                            </a>
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&nextfeaturechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Service'"
                                                                               ng-click="nextfeaturechilds.expanded=false"
                                                                               title="Tap to Shrink the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png"/>
                                                                            </a>
                                                                            <a className="hreflink"
                                                                               ng-show="nextfeaturechilds.childs.length>0&&nextfeaturechilds.expanded && ProfileItem.Portfolio_x0020_Type=='Events'"
                                                                               ng-click="nextfeaturechilds.expanded=false"
                                                                               title="Tap to Shrink the {{nextfeaturechilds.newTitle}} childs">
                                                                                <img ng-src="{{newbaseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png"/>
                                                                            </a>
                                                                        </div>

                                                                        <div style={{width: "3%"}} className="padLR">
                                                                            <div ng-show="nextfeaturechilds.siteType =='Master Tasks'">
                                                                                <input ng-if="isOwner==true"
                                                                                       className="mt--2" type="checkbox"
                                                                                       ng-click="setCompareComponents(nextfeaturechilds,nextfeaturechilds.select);"
                                                                                       ng-model="nextfeaturechilds.select"/>
                                                                            </div>
                                                                            <div ng-show="nextfeaturechilds.siteType !='Master Tasks'">
                                                                                <input type="checkbox"
                                                                                       ng-click="setSelectTasks(nextfeaturechilds,nextfeaturechilds.select);"
                                                                                       ng-model="nextfeaturechilds.select"
                                                                                       className="mt--2 ng-pristine ng-untouched ng-valid ng-empty"/>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{width: "3%"}} className="padLR">
                                                                            <img ng-if="nextfeaturechilds.siteType =='Gruene'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/logo-gruene.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Gender'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_gender.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='DE'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_de.png" />
                                                                            <img ng-if="nextfeaturechilds.siteType =='DRR'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_drr.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Education'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_education.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='EI'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_ei.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='EPS'"
                                                                                 className="button-icon ml-5"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_eps.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Health'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_health.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='QA'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_qa.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Shareweb'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_shareweb.png"/>
                                                                            <img ng-if="item.siteType =='Offshore Tasks'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/offshore_Tasks.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='HHHH'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Foundation/icon_hhhh.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Migration'" className="button-icon ml-8"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/site_migration.png"/>
                                                                            <img ng-if="nextfeaturechilds.siteType =='Small Projects'"
                                                                                 className="button-icon ml35"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/small_project.png"/>

                                                                        </div>
                                                                        
                                                                        <div className="hreflink colm-relative"
                                                                             title="{{nextfeaturechilds.Shareweb_x0020_IDTooltip}}"
                                                                             style={{width: "7%"}}>nextfeaturechilds
                                                                            {/* {{nextfeaturechilds.Shareweb_x0020_ID}} */}
                                                                        </div>
                                                                        <div style={{width: "30%"}} className="colm-relative">
                                                                            <a target="_blank"
                                                                               ng-href="{{pageContextInfo.webAbsoluteUrl}}/SitePages/Task-Profile.aspx?taskId={{nextfeaturechilds.Id}}&Site={{nextfeaturechilds.siteType}}"
                                                                               >nextfeaturechilds
                                                                                {/* {{nextfeaturechilds.Title}} */}
                                                                                </a>
                                                                            <a className="hreflink serviceColor_Active"
                                                                               ng-click="d">
                                                                                <span ng-if="nextfeaturechilds.childs.length!=0">
                                                                                nextfeaturechilds
                                                                                    {/* ({{nextfeaturechilds.childs.length}}) */}
                                                                                </span>
                                                                            </a>
                                                                            <img className="icon-sites-img"
                                                                                 ng-show="nextfeaturechilds.isNewItem"
                                                                                 title="This item tagged with draft"
                                                                                 ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/NewItemIcon-green.png" />
                                                                            <span ng-show="nextfeaturechilds.siteType !='Master Tasks' && nextfeaturechilds.DescriptionFields.length>0 && nextfeaturechilds.DescriptionFields[0].Title!=undefined && nextfeaturechilds.DescriptionFields[0].Title!=''"
                                                                                  className="project-tool">
                                                                                <img ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/24/infoIcon.png" />
                                                                                <span className="tooltipte">
                                                                                    <span className="tooltiptext">
                                                                                        <div className="bdrbox pad10 bg-white clearfix">
                                                                                            <div className="Description desboxulli  PadR0">
                                                                                                <div ng-repeat-start='item in nextfeaturechilds.DescriptionFields track by $index'
                                                                                                     className="col-sm-12  padL-0 PadR0 "
                                                                                                     style={{width: "100%"}}>
                                                                                                    <div className="col-sm-12 padL-0 PadR0"
                                                                                                         style={{width: "100%",display:"flex"}} >
                                                                                                        <div className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                                            <span>
                                                                                                                {/* {{$index+1}}. */}
                                                                                                                index
                                                                                                            </span>
                                                                                                        </div>
                                                                                                        <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                                            <span ng-bind-html="item.Title | trustedHTML"></span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div ng-repeat='child in item.Subtext track by $index'
                                                                                                         className="col-sm-12 padL-0 PadR0"
                                                                                                         style={{width: "100%"}}>
                                                                                                        <div className="col-sm-12 padL-0 PadR0"
                                                                                                             style={{width: "100%",display:"flex"}} >
                                                                                                            <div style={{flexBasis:"31px"}}
                                                                                                                 className="col-sm-1 mb-5 tmvalue impact-info5 no-padding bdrbox back-fb">
                                                                                                                <span>
                                                                                                                    {/* {{$parent.$index+1}}.{{$index+1}} */}
                                                                                                                    index + 1
                                                                                                                </span>
                                                                                                            </div>
                                                                                                            <div className="col-sm-12 mb-5 ml2 tmvalue impact-info95 padLR bdrbox">
                                                                                                                <span ng-bind-html="child.Title | trustedHTML"></span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="clearfix">
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="clearfix">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div ng-repeat-end>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div style={{width: "7%"}} className="colm-relative">
                                                                            <div className="team-Members-Item">
                                                                                <div className="user-Member-img"
                                                                                     ng-repeat="client in nextfeaturechilds.ClientCategory.results">
                                                                                    <div className="ClientCategory-Usericon"
                                                                                         title="{{client.ParentClientCategoryStructure}}">
                                                                                        {/* {{
                                                                                            client.Title.slice(0,
                                                                                        2).toUpperCase()
                                                                                        }} */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{width: "7%"}} className="colm-relative">
                                                                            <span>PercentComplete
                                                                                {/* {{nextfeaturechilds.PercentComplete}} */}
                                                                                </span>
                                                                        </div>
                                                                        <div style={{width: "7%"}} className="colm-relative">
                                                                            <span>
                                                                                {/* {{nextfeaturechilds.ItemRank}} */}ItemRank
                                                                                </span>
                                                                        </div>

                                                                        <div style={{width: "10%"}} className="colm-relative">
                                                                            {/* <show-task-team sentid="nextfeaturechilds.Id"
                                                                                            sentitem="nextfeaturechilds"
                                                                                            webpartid="'ShowTaskTeamController'">
                                                                            </show-task-team> */}
                                                                        </div>
                                                                        <div style={{width: "9%"}} className="colm-relative">
                                                                            {/* {{nextfeaturechilds.EarliestDate }} */}
                                                                        </div>
                                                                        <div style={{width: "9%"}} className="colm-relative">
                                                                            {/* {{nextfeaturechilds.DateCreated}} */}
                                                                            <img ng-if="nextfeaturechilds.autherimage==null" 
                                                                            // Title={{nextfeaturechilds.Author}}
                                                                                 className="AssignUserPhoto userimgsize1"
                                                                                 src="{{baseUrl}}/PublishingImages/Portraits/icon_user.jpg"/>
                                                                            <img ng-if="nextfeaturechilds.autherimage!=null" 
                                                                            // Title={{nextfeaturechilds.Author}}
                                                                                 className="AssignUserPhoto userimgsize1" src="{{nextfeaturechilds.autherimage}}"/>
                                                                        </div>
                                                                        <div style={{width: "7%"}} className="colm-relative">
                                                                            <span ng-show="nextfeaturechilds.Item_x0020_Type=='Task'">
                                                                                {/* {{nextfeaturechilds.Effort}} */}

                                                                            </span>
                                                                        </div>
                                                                        <div style={{width: "2%"}} className="padLR">
                                                                            <span className="tasktimtooltip"
                                                                                  ng-show="nextfeaturechilds.siteType!=undefined && nextfeaturechilds.siteType!='Master Tasks'">
                                                                                {/* <task-time-overview itemtype="nextfeaturechilds.Portfolio_x0020_Type"
                                                                                                    showtime="false"
                                                                                                    sitetype="nextfeaturechilds.siteType"
                                                                                                    id="nextfeaturechilds.Id"
                                                                                                    sitetitle="nextfeaturechilds.Title"
                                                                                                    item="nextfeaturechilds" taskuser=""
                                                                                                    sentitem=""
                                                                                                    webpartid="'TaskTimeOverviewController'">
                                                                                </task-time-overview> */}
                                                                            </span>
                                                                        </div>
                                                                        <div style={{width: "2%"}} className="padLR">
                                                                            <a className="hreflink"
                                                                               title="Restructuring Tool"
                                                                               data-toggle="modal"
                                                                               ng-show="nextfeaturechilds.isRestructureActive"
                                                                               ng-click="openRestructuringPopup(nextfeaturechilds)">
                                                                                <img className="icon-sites-img"
                                                                                     ng-show="nextfeaturechilds.Portfolio_x0020_Type =='Service'"
                                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png"/>
                                                                                <img className="icon-sites-img"
                                                                                     ng-show="nextfeaturechilds.Portfolio_x0020_Type =='Events'"
                                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png"/>
                                                                                <img className="icon-sites-img"
                                                                                     ng-show="nextfeaturechilds.Portfolio_x0020_Type =='Component'"
                                                                                     ng-src="{{baseUrl}}/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png"/>
                                                                            </a>
                                                                        </div>
                                                                        <div style={{width: "2%"}} className="padLR">
                                                                            <a className="hreflink"
                                                                               title="Edit {{nextfeaturechilds.newTitle}}"
                                                                               data-toggle="modal"
                                                                               ng-click="EditTask(nextfeaturechilds)">
                                                                                <img className="img-focus"
                                                                                     ng-src="/_layouts/images/edititem.gif"/>
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>


                             {/* Test something new end here */}



                            </div>
                        </div></section>
                </div></section>
        </div>
    );
}
export default Groupby;
function RetrieveSPData() {
    throw new Error("Function not implemented.");
}

function TaskUserItems() {
    throw new Error("Function not implemented.");
}

function openModal(): React.MouseEventHandler<HTMLAnchorElement> {
    throw new Error("Function not implemented.");
}

