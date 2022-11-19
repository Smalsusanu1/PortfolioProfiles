import { useState, useEffect } from "react";
import * as $ from 'jquery';
import * as Moment from 'moment';
// import './foundation.scss'
import './PopupOfdata/TestWithDiff/foundation.scss';
import { Modal } from 'office-ui-fabric-react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { FaAngleDown, FaAngleUp, FaPrint, FaFileExcel, FaPaintBrush, FaEdit, FaSearch } from 'react-icons/fa';
import { MdDelete, MdAdd } from 'react-icons/Md';
import * as React from "react";
import Tooltip from "./popup";
import PopupOfdata from "./PopupOfdata/PopupOfdata";
function Groupby(props:any) {
    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [child, setChild] = useState(false);
    const [search, setSearch]: [string, (search: string) => void] = React.useState("");
    const [array, setArray] = useState([])
    const [Title, setTitle] = useState()
    const [itemType, setitemType] = useState()
    const [ComponentsData, setComponentsData] = useState([])
    const [SubComponentsData, setSubComponentsData] = useState([])
    const [FeatureData, setFeatureData] = useState([])
    const [table, setTable] = useState(array);
    const [Task, setTask] = useState<any[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Editpopup, setEditpopup] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [secondSearch, setSecondSearch] = useState("")
    const handleOpen = (item: any) => {
        setIsActive(current => !current);
        setIsActive(true);
        item.show = item.show = item.show == true ? false : true;
        setArray(array => ([...array]));
    };
    const addModal = () => {
        setAddModalOpen(true)
    }
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }
    //  useEffect(() => {
    //  RetrieveSPData();
    //       TaskUserItems();
    //     },[])
    useEffect(() => {
        function TaskUserItems() {
            var Response: any = []
            var url = "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('b318ba84-e21d-4876-8851-88b94b9dc300')/items?$top=1000";
            async function GetListItems() {
                $.ajax({
                    url: url,
                    method: "GET",
                    headers: {
                        "Accept": "application/json; odata=verbose"
                    },
                    success: function (data) {
                        Response = Response.concat(data.d.results);
                        if (data.d.__next) {
                            url = data.d.__next;
                            GetListItems();
                        }
                        else setTask(Response);
                    },
                    error: function (error) {
                        // error handler code goes here
                    }
                });
            }
            GetListItems();
        }
        TaskUserItems();
    }, [])
    const sortBy = () => {
        const copy = array
        copy.sort((a, b) => (a.Title > b.Title) ? 1 : -1);
        setTable(copy)
    }
    const sortByDng = () => {
        const copy = array
        copy.sort((a, b) => (a.Title > b.Title) ? -1 : 1);
        setTable(copy)
    }
    const sortDate = () => {
        const copy = array
        copy.sort((a, b) => (a.DueDate > b.DueDate) ? 1 : -1);
        setTable(copy)
    }
    const sortPortfolioStructureID = () => {
        const copy = array
        copy.sort((a: any, b: any) => (a.PortfolioStructureID > b.PortfolioStructureID) ? -1 : 1);
        setTable(copy)
    }
    const sortPortfolioStructureIDD = () => {
        const copy = array
        copy.sort((a: any, b: any) => (a.PortfolioStructureID > b.PortfolioStructureID) ? 1 : -1);
        setTable(copy)
    }
    let handleChange = (e: { target: { value: string; }; }) => {
        // setSearch(e.target.value.toLowerCase());
        setSecondSearch(e.target.value.toLowerCase());
    };
    useEffect(() => {
        function RetrieveSPData() {
            var spRequest = new XMLHttpRequest();
            var query = "Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type eq 'Component') or (Item_x0020_Type eq 'SubComponent') or (Item_x0020_Type eq 'Feature'))and (Portfolio_x0020_Type eq 'Component')&$top=4999";
            spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=" + query);
            spRequest.setRequestHeader("Accept", "application/json");
            spRequest.onreadystatechange = function () {
                var RootComponentsData: any[] = [];
                var Components: any[] = [];
                // var ComponentsData: any = [];
                // var SubComponentsData: any = [];
                // var FeatureData: any = [];
                if (spRequest.readyState === 4 && spRequest.status === 200) {
                    var results = JSON.parse(spRequest.responseText);
                    console.log(results)
                    $.each(results.value, function (index, result) {
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
                            $.each(result.AssignedTo, function (index, Assig) {
                                if (Assig.Id != undefined) {
                                    // $.each(Task, function (index, users) {
                                    //     if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                    //         users.ItemCover = users.Item_x0020_Cover;
                                    //         result.TeamLeaderUser.push(users);
                                    //     }
                                    // })
                                    var users = Assig.Title.slice(0, 2).toUpperCase();
                                    result.TeamLeaderUser.push(users);
                                }
                            })
                        }
                        if (result.Team_x0020_Members != undefined && result.Team_x0020_Members.length > 0) {
                            $.each(result.Team_x0020_Members, function (index, Assig) {
                                if (Assig.Id != undefined) {
                                    $.each(Task, function (index, users) {
                                        if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                            users.ItemCover = users.Item_x0020_Cover;
                                            result.TeamLeaderUser.push(users);
                                        }
                                    })
                                }
                            })
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
                    {ComponentsData.map(Match=>(
                        {}
                    ))}
                    Components.push(ComponentsData[3])
                    setArray(Components);
                    console.log(Components);
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
        for (i = 0; i < array.length; i += 1) {
            csvData.push([`${array[i].Title}`]);
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
    // const EditData = (e: any, Id: any) => {
    //     var spRequest = new XMLHttpRequest();
    //     spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/web/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=Id,Title&$filter= Id eq '" + Id + "'", true);
    //     spRequest.setRequestHeader("Accept", "application/json");
    //     spRequest.onreadystatechange = function () {
    //         if (spRequest.readyState === 4 && spRequest.status === 200) {
    //             var result = JSON.parse(spRequest.responseText);
    //             // setTitle(result.value[0].Title)
    //         }
    //         else if (spRequest.readyState === 4 && spRequest.status !== 200) {
    //             console.log('Error Occurred !');
    //         }
    //         openModal();
    //         AddItem();
    //     };
    //     spRequest.send();
    // }
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
            success: function (contextData) {
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
                    success: function (data) {
                        alert('success');
                        setModalIsOpenToFalse();
                        window.location.reload();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('error');
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('error');
            }
        });
    }
    return (
        <div className="componet-portfoliblues">
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
                                                <div
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
                                                            id="txtSharewebComponent"
                                                        /><span role="status" aria-live="polite"
                                                            className="ui-helper-hidden-accessible"></span>
                                                    </div>
                                                    <div className="col-sm-1 no-padding">
                                                        <label className="full_width">&nbsp;</label>
                                                        <img src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/32/edititem.gif"
                                                        />
                                                    </div>
                                                </div>
                                                <div
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
                                                            id="txtServiceSharewebComponent"
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
                                                /><span
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
            {/* <div className="smartFilter">
<SmartFilter/>
    </div> */}
            <div className="tbl-headings">
                <span className="leftsec w65">
                    <label>
                        <span>
                            <img style={{ height: "24px", width: "24px", marginTop: "-2px" }}
                                src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/component_icon.png" />
                        </span>
                        <span>
                            {/* {data.map(item => <a>{item.Title}</a>)} */}
                            {/* <a>Contact Database</a> */}
                            <a>{props.title}</a>
                        </span>
                    </label>
                    <span className="g-search tdcolm_relative">
                        <input type="text" className="searchbox_height full_width" id="globalSearch" placeholder="Search in all relevant fields" />
                        <span className="gsearch-btn" ><i><FaSearch /></i></span>
                    </span>
                </span>
                <span className="toolbox mx-auto">
                    <button type="button" className="btn btn-primary"
                        ng-disabled="(isOwner!=true) || ( SelectedTasks.length > 0 || compareComponents[0].Item_x0020_Type =='Feature') "
                        onClick={addModal} title=" Add Structure">
                        Add Structure
                    </button>
                    <button type="button"
                        className="btn btn-primary"
                    >
                        <MdAdd />
                        Add Activity-Task
                    </button>
                    <button type="button"
                        className="btn {{(compareComponents.length==0 && SelectedTasks.length==0)?'btn-grey':'btn-primary'}}"
                        disabled={true}>
                        Restructure
                    </button>
                    <button type="button"
                        className="btn {{(compareComponents.length==0 && SelectedTasks.length==0)?'btn-grey':'btn-primary'}}"
                        disabled={true}>
                        Compare
                    </button>
                    <a>
                        <Tooltip />
                    </a>
                    {/* <span>
                       <ExpandTable/>
                    </span> */}
                </span>
            </div>
            <section className="TableContentSection">
                <div className="container-fluid">
                    <section className="TableSection componet-portfoliblue">
                        <div className="container">
                            <div className="Alltable mt-10">
                                <table className='table table-hover' id="EmpTable">
                                    <thead>
                                        <div>
                                            <li className="for-lis">
                                                <div style={{ width: "2%" }} className="padLR">
                                                    <div style={{ width: "80%" }} >
                                                        <a className="hreflink" title="Tap to expand the childs">
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Service_Icons/Rightarrowicon-green.png" className="ng-hide" data-themekey="#" />
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Event_Icons/Rightarrowicon-orange.png" className="ng-hide" data-themekey="#" />
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/24/right-list-icon.png" className="" data-themekey="#" />
                                                        </a>
                                                        <a className="hreflink ng-hide" title="Tap to Shrink the childs">
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Service_Icons/Downarrowicon-green.png" className="ng-hide" data-themekey="#" />
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Event_Icons/Downarrowicon-orange.png" className="ng-hide" data-themekey="#" />
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/24/list-icon.png" className="" data-themekey="#" />
                                                        </a>
                                                        <a className="hreflink" title="Tap to Collpase the childs">
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/sub_icon.png" className="" data-themekey="#" />
                                                            <img style={{ width: "10px" }} src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Service_Icons/sub_icon.png" className="ng-hide" data-themekey="#" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div style={{ width: "3%" }} className="padLR">
                                                    <div style={{ width: "80%" }}>
                                                    </div>
                                                </div>
                                                <div style={{ width: "3%" }} className="padLR">
                                                </div>
                                                <div style={{ width: "7%" }} className="">
                                                    <div style={{ width: "97%" }} className="colm-relative">
                                                        <input id="searchTaskId" type="search" placeholder="TaskID" title="TaskID" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide">X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0" onClick={sortPortfolioStructureID}>
                                                                <i className="fa fa-angle-up hreflink footerUsercolor" ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "30%" }} className="">
                                                    <div style={{ width: "99%" }} className="colm-relative">
                                                        <input id="searchTitle" type="search" placeholder="Title" onChange={handleChange} title="Title" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide">X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "7%" }} className="">
                                                    <div style={{ width: "100%" }} className="colm-relative">
                                                        <input id="searchClientCategory" type="search" placeholder="Client Category" title="Client Category" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide" >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "7%" }} className="">
                                                    <div style={{ width: "82%" }} className="colm-relative">
                                                        <input id="searchPercentComplete" type="search" placeholder="%" title="Percent" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide" >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil" >
                                                                <i title="Site" className="fa fa-filter hreflink " ></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide"></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "7%" }} className="">
                                                    <div style={{ width: "75%" }} className="colm-relative">
                                                        <input id="searchItemRank" type="search" placeholder="ItemRank" title="ItemRank" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide">X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil" >
                                                                <i title="Site" className="fa fa-filter hreflink " ></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide" ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "10%" }} className="">
                                                    <div style={{ width: "82%" }} className="colm-relative">
                                                        <input id="searchTeamMember" type="search" placeholder="Team" title="Team" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide"  >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink "></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil" >
                                                                <i title="Site" className="fa fa-filter hreflink " ></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide" ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "9%" }} className="">
                                                    <div style={{ width: "82%" }} className=" colm-relative">
                                                        <input id="searchEarliestDate" type="search" placeholder="Due Date" title="Due Date" className="full_width  ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide" >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil"  >
                                                                <i title="Site" className="fa fa-filter hreflink "></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide"></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "9%" }} className="">
                                                    <div style={{ width: "86%" }} className="colm-relative">
                                                        <input id="searchCreatedDate" type="search" placeholder="Created Date" title="Created Date" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide"  >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil" >
                                                                <i title="Site" className="fa fa-filter hreflink " ></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide" ></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "7%" }} className="">
                                                    <div style={{ width: "73%" }} className="colm-relative">
                                                        <input id="searchTime" type="search" placeholder="Smart Time" title="Smart Time" className="full_width ng-pristine ng-untouched ng-valid ng-empty" />
                                                        <span className="searchclear-bg ng-hide" >X</span>
                                                        <span className="sortingfilter">
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-up hreflink " ></i>
                                                            </span>
                                                            <span className="ml0">
                                                                <i className="fa fa-angle-down hreflink " ></i>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown filer-icons">
                                                            <span className="filter-iconfil" >
                                                                <i title="Site" className="fa fa-filter hreflink " ></i>
                                                                <i title="Site" className="fa fa-filter hreflink  glyphicon_active ng-hide"></i>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ width: "2%" }} className="padLR">
                                                    <div></div>
                                                </div>
                                                <div style={{ width: "2%" }} className="padLR mt-5">
                                                    <a className="hreflink ng-hide" title="Restructuring Tool" data-toggle="modal" target="_blank">
                                                        <img className="icon-sites-img ng-hide" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Service_Icons/Restructuring_Tool.png" data-themekey="#" />
                                                        <img className="icon-sites-img ng-hide" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Event_Icons/Restructuring_Tool.png" data-themekey="#" />
                                                        <img className="icon-sites-img" src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/Restructuring_Tool.png" data-themekey="#" />
                                                    </a>
                                                </div>
                                                <div style={{ width: "2%" }} className="padLR">
                                                    <div style={{ width: "80%" }}>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </thead>
                                    <tbody>
                                        {array.map(function (item: any, index: any) {
                                            return (
                                                <>
                                                    {item.Child.map(function (childitem: any) {
                                                        // if (search == "" || childitem.Title.toLowerCase().includes(search.toLowerCase())) {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className="pad0" colSpan={9}>
                                                                        <table style={{ width: "100%" }}>
                                                                            <tr style={{ background: "#FAFAFA" }}>
                                                                                {/* style={{ background: "#E7E3E3" }} */} <td style={{ width: "2%" }}>
                                                                                    <div className="accordian-header" onClick={() => handleOpen(childitem)}>
                                                                                        {childitem.Child.length > 0 &&
                                                                                            <a className='hreflink' onClick={(e) => this.EditData(e, item)}
                                                                                                title="Tap to expand the childs">
                                                                                                <div className="sign">{childitem.show ? <img src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/list-icon.png" />
                                                                                                    : <img src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/right-list-icon.png" />}
                                                                                                </div>
                                                                                            </a>
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <input ng-if="isOwner==true" type="checkbox" className="mt--2 ng-pristine ng-untouched ng-valid ng-scope ng-empty" />
                                                                                </td>
                                                                                {/* <td style={{ width: "2%" }}></td> */}
                                                                                <td style={{ width: "7%" }}>  <div className="d-flex">
                                                                                    <span>
                                                                                        <a className="hreflink" title="Show All Child" data-toggle="modal">
                                                                                            <img className="icon-sites-img"
                                                                                                src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/SubComponent_icon.png" />
                                                                                        </a>
                                                                                    </span>
                                                                                    <span className="ml-2" >{childitem.PortfolioStructureID}</span>
                                                                                </div>
                                                                                </td>
                                                                                <td style={{ width: "20%" }}>
                                                                                    <a className="hreflink serviceColor_Active" target="_blank"
                                                                                        href={"https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/Portfolio-Profile.aspx?taskId=" + childitem.Id}
                                                                                    >
                                                                                        {childitem.Title}</a>
                                                                                    {childitem.Child.length > 0 &&
                                                                                        <span>({childitem.Child.length})</span>
                                                                                    }
                                                                                    {childitem.Short_x0020_Description_x0020_On != null &&
                                                                                        <span className="project-tool"><img
                                                                                            src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/infoIcon.png" /><span className="tooltipte">
                                                                                                <span className="tooltiptext">
                                                                                                    <div className="tooltip_Desc">
                                                                                                        <span>{childitem.Short_x0020_Description_x0020_On}</span>
                                                                                                    </div>
                                                                                                </span>
                                                                                            </span>
                                                                                        </span>
                                                                                    }
                                                                                </td>
                                                                                <td style={{ width: "18%" }}>
                                                                                    <div>
                                                                                        {childitem.ClientCategory.map(function (client: { Title: string; }) {
                                                                                            return (
                                                                                                <span className="ClientCategory-Usericon"
                                                                                                    title={client.Title}>
                                                                                                    <a>{client.Title.slice(0, 2).toUpperCase()}</a>
                                                                                                </span>
                                                                                            )
                                                                                        })}</div>
                                                                                </td>
                                                                                <td style={{ width: "20%" }}>
                                                                                    <div>{childitem.TeamLeaderUser.map(function (client1: { Title: string; }) {
                                                                                        return (
                                                                                            <div className="ClientCategory-Usericon"
                                                                                            >
                                                                                                <a>{client1}</a>
                                                                                            </div>
                                                                                        )
                                                                                    })}</div></td>
                                                                                <td style={{ width: "10%" }}>{childitem.PercentComplete}</td>
                                                                                <td style={{ width: "10%" }}>{childitem.ItemRank}</td>
                                                                                <td style={{ width: "10%" }}>{childitem.DueDate}</td>
                                                                                <td style={{ width: "3%" }}><a onClick={setModalIsOpenToTrue}><PopupOfdata /></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                {childitem.show && (
                                                                    <>
                                                                        {childitem.Child.map(function (childinew: any) {
                                                                            if (secondSearch == "" || childinew.Title.toLowerCase().includes(secondSearch.toLowerCase())) {
                                                                                return (
                                                                                    <tr style={{ background: "#E7E3E3" }}>
                                                                                        <td className="pad0" colSpan={10}>
                                                                                            <table style={{ width: "100%" }}>
                                                                                                <tr className="serviceColor_Active">
                                                                                                    <td style={{ width: "2%" }}>
                                                                                                        {/* <div className="accordian-header" onClick={() => handleOpen(childinew)}>
                                                                                                            <a className='hreflink' onClick={(e) => this.EditData(e, item)}
                                                                                                                title="Tap to expand the childs">
                                                                                                                <div className="sign">{show ? <img src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/list-icon.png" />
                                                                                                                    : <img src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/right-list-icon.png" />}
                                                                                                                </div>
                                                                                                            </a>
                                                                                                        </div> */}
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <input ng-if="isOwner==true" type="checkbox" className="mt--2 ng-pristine ng-untouched ng-valid ng-scope ng-empty" />
                                                                                                    </td>
                                                                                                    <td style={{ width: "7%" }}> <div className="d-flex">
                                                                                                        <span>
                                                                                                            <a className="hreflink" title="Show All Child" data-toggle="modal">
                                                                                                                <img className="icon-sites-img"
                                                                                                                    src="https://hhhhteams.sharepoint.com/sites/HHHH/SiteCollectionImages/ICONS/Shareweb/feature_icon.png" />
                                                                                                            </a>
                                                                                                        </span>
                                                                                                        <span className="ml-2">{childinew.PortfolioStructureID}</span>
                                                                                                    </div>
                                                                                                    </td>
                                                                                                    <td style={{ width: "20%" }}>
                                                                                                        <a className="hreflink serviceColor_Active" target="_blank"
                                                                                                            href={"https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/Portfolio-Profile.aspx?taskId=" + childinew.Id}
                                                                                                        > {childinew.Title}</a>
                                                                                                        {childinew.Short_x0020_Description_x0020_On != null &&
                                                                                                            <span className="project-tool"><img
                                                                                                                src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/infoIcon.png" /><span className="tooltipte">
                                                                                                                    <span className="tooltiptext">
                                                                                                                        <div className="tooltip_Desc">
                                                                                                                            <span>{childinew.Short_x0020_Description_x0020_On}</span>
                                                                                                                        </div>
                                                                                                                    </span>
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        }
                                                                                                    </td>
                                                                                                    <td style={{ width: "18%" }}>
                                                                                                        <div>
                                                                                                            {childinew.ClientCategory.map(function (client: { Title: string; }) {
                                                                                                                return (
                                                                                                                    <span className="ClientCategory-Usericon"
                                                                                                                        title="{client.ParentClientCategoryStructure}">
                                                                                                                        <a>{client.Title.slice(0, 2).toUpperCase()}</a>
                                                                                                                    </span>
                                                                                                                )
                                                                                                            })}</div>
                                                                                                    </td>
                                                                                                    <td style={{ width: "20%" }}>
                                                                                                        <div>{childinew.TeamLeaderUser.map(function (client1: { Title: string; }) {
                                                                                                            return (
                                                                                                                <span className="ClientCategory-Usericon"
                                                                                                                >
                                                                                                                    <a>{client1}</a>
                                                                                                                </span>
                                                                                                            )
                                                                                                        })}</div></td>
                                                                                                    <td style={{ width: "10%" }}>{childinew.PercentComplete}</td>
                                                                                                    <td style={{ width: "10%" }}>{childinew.ItemRank}</td>
                                                                                                    <td style={{ width: "10%" }}>{childinew.DueDate}</td>
                                                                                                    <td style={{ width: "3%" }}><a onClick={setModalIsOpenToTrue}><PopupOfdata /></a></td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            }
                                                                        })}</>
                                                                )}</>
                                                        )
                                                    }
                                                    )}
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div></div></section>
                </div></section>
        </div>
    );
}
export default Groupby;
function RetrieveSPData() {
    throw new Error("Function not implemented.");
}
// function TaskUserItems() {
//     throw new Error("Function not implemented.");
// }
function openModal(): React.MouseEventHandler<HTMLAnchorElement> {
    throw new Error("Function not implemented.");
}
