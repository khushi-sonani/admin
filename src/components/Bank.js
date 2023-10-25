import React ,{ useState } from 'react'
import  ReactDOM  from 'react'
import './bank.css'
import Sidebar from './Sidebar'
import { Link } from "react-router-dom"; 
import { Button } from '@mui/material';




function Pdetail() {
    const [rows, setRows] = useState([
        { name: 'khuhsi', accountnumber: '79844565', ifsccode:'4511',bankname:'sbi',editing: false },
        { name: 'dhruvi',accountnumber: '79844565', ifsccode:'4511', bankname:'sbi',editing: false },
        { name: 'krisha', accountnumber: '79844565', ifsccode:'4511',bankname:'sbi', editing: false },
        { name: 'mansi', accountnumber: '79844565',ifsccode:'4511',bankname:'sbi', editing: false },
       
    ]);

    const editRow = (row) => {
        const updatedRows = rows.map((r) => {
            if (r === row) {
                return { ...r, editing: true };
            }
            return r;
        });
        setRows(updatedRows);
    };

    const saveRow = (row) => {
        const updatedRows = rows.map((r) => {
            if (r === row) {
                return { ...r, editing: false };
            }
            return r;
        });
        setRows(updatedRows);
    };

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const addRow = () => {
        const newRows = [...rows, { name: '', accountnumber: '',ifsccode:'', bankname:'',editing: true }];
        setRows(newRows);
    };
    
  return (
    <div>
  <Sidebar />
   
   <div className='containe'>
    
                <h1>Bank Details</h1>
                <div>
                    <Button variant="contained" size="large" style={{ marginBottom:'10px', marginLeft:'700px'}}>add </Button>
                </div>
                    <table>
                        <thead>
                            <tr>
                           
                                <th>Name</th>
                                <th>accountnumber</th>
                                <th>ifsccode</th>
                                <th>bankname</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                 
                                    {!row.editing && <td>{row.name}</td>}
                                    {!row.editing && <td>{row.accountnumber}</td>}
                                    {!row.editing && <td>{row.ifsccode}</td>}
                                    {!row.editing && <td>{row.bankname}</td>}
                                    
                                    {row.editing && <td><input type="text" value={row.name} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].name = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    {row.editing && <td><input type="text" value={row.accountnumber} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].accountnumber = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                      {row.editing && <td><input type="number" value={row.ifsccode} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].ifsccode = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    {row.editing && <td><input type="text" value={row.bankname} onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].bankname = e.target.value;
                                        setRows(updatedRows);
                                    }} /></td>}
                                    
                                    <td>
                                        {!row.editing && <button className="edit-button" onClick={() => editRow(row)}>Edit</button>}
                                        {row.editing && <button className="save-button" onClick={() => saveRow(row)}>Save</button>}
                                        <button className="delete-button" onClick={() => deleteRow(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-button" onClick={addRow}>Add Row</button>
                </div>
    </div>
    
    
  )
 
}

export default Pdetail;
