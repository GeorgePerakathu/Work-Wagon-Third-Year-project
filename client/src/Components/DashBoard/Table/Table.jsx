import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
    <div className="Table">
      <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
      <TableContainer
        component={Paper}
        className="shadow-md"
        style={{ borderColor: 'aliceblue' }}
      >
        <Table className="min-w-full border border-white">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold" align="left">Work</TableCell>
              <TableCell className="font-bold" align="left">Tracking ID</TableCell>
              <TableCell className="font-bold" align="left">Date</TableCell>
              <TableCell className="font-bold" align="left">Status</TableCell>
              <TableCell className="font-bold" align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="text-white">
            {rows.map((row) => (
              <TableRow
                key={row.name}
                className="last:row-border-0"
              >
                <TableCell className="font-medium px-4 py-2" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="px-4 py-2" align="left">{row.trackingId}</TableCell>
                <TableCell className="px-4 py-2" align="left">{row.date}</TableCell>
                <TableCell className="px-4 py-2" align="left">
                  <span
                    className={`status px-2 py-1 rounded ${
                      row.status === "Approved"
                        ? "bg-green-300 text-green-700"
                        : row.status === "Pending"
                        ? "bg-red-200 text-red-700"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="Details px-4 py-2 text-blue-500 cursor-pointer" align="left">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

