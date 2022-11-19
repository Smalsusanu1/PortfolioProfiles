import * as React from 'react';


export default function Books({arr}:any) {
    console.log(arr); 
    $.each(arr, function (child: any, childItem) {
        if (childItem.UserGroupId != undefined && childItem.UserGroupId == arr.Id) {
            return "hello";
          
        }
    });// 👉️ ['A', 'B', 'C', 'D']
    return (
      <div>
        {arr.map((title:any) => {
          return (
          <div>
            
            <table>
                <tbody>
                    <td>{title.Id}</td>
                    <td>{title.Title}</td>
                    <td>{title.TaskListName}</td>
                    <td>{title.PortfolioStructureID}</td>
                    <td>{title.Comments}</td>
                    <td>{title.DueDate}</td>
                </tbody>
            </table>
            
            
            
            </div>
          )
        })}
      </div>
    );
  }
  