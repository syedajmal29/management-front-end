import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit2, Eye, Maximize, Minimize, Trash2 } from 'lucide-react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Branch = () => {
  const [rows, setRows] = useState([]);  // State for storing fetched branch data
  const [open, setOpen] = useState(false);  // State for dialog visibility
  const [selectedBranch, setSelectedBranch] = useState(null);  // State for selected branch details
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [isFullScreen, setIsFullScreen] = useState(false);  // State for full-screen mode

  const getdetails = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("https://management-backend-b1uo.onrender.com/branch/branches",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const transformedData = res.data.map((branch, index) => ({
        _id:branch._id,
        id: index + 1, // Unique ID for DataGrid
        branchcode: branch.branchdetails.branchcode,
        branchname: branch.branchdetails.branchname,
        branchshortname: branch.branchdetails.branchshortname,
        doorflatno: branch.branchdetails.doorflatno,
        street: branch.branchdetails.street,
        pincode: branch.branchdetails.pincode,
        locality: branch.branchdetails.locality,
        city: branch.branchdetails.city,
        state: branch.branchdetails.state,
        panNo: branch.branchdetails.panNo,
        gstin: branch.branchdetails.gstin,
        branchType: branch.branchdetails.branchType,
        vehicleType: branch.branchdetails.vehicleType.join(", "), // Joining array into a string
        contactno: branch.branchcontactdetails.contactno,
        alternatecontactno: branch.branchcontactdetails.alternatecontactno,
        whatsappno:branch.branchcontactdetails.whatsappno,
        emailid: branch.branchcontactdetails.emailid,
        contactno1: branch.branchinchargedetails.contactno,
        alternatecontactno1: branch.branchinchargedetails.alternatecontactno,
        whatsappno1:branch.branchinchargedetails.whatsappno,
        emailid1: branch.branchinchargedetails.emailid,

        contactno2: branch.contactpersondetails.contactno,
        alternatecontactno2: branch.contactpersondetails.alternatecontactno,
        whatsappno2:branch.contactpersondetails.whatsappno,
        emailid2: branch.contactpersondetails.emailid,
        branchinchargename: branch.branchinchargedetails.branchinchargename,
        contactpersonname: branch.contactpersondetails.contactpersonname,
        openingbalance: branch.openingdetails.openingbalance,
        openingdate: branch.openingdetails.openingdate,
        minimumamount: branch.advancerequestdetails.minimumamount,
        maximumamount: branch.advancerequestdetails.maximumamount,
        monthlymaximumamount:branch.advancerequestdetails.monthlymaximumamount,
        maximumunallocatedamount:branch.advancerequestdetails.maximumunallocatedamount,
        effectivedate: branch.advancerequestdetails.effectivedate,
        accountnumber:branch.bankdetails.accountnumber,
        bankdetail:branch.bankdetails,
        bankdetails: branch.bankdetails.map(
          (bank) => `${bank.bankname} (${bank.accountnumber})`
        ).join(", "), // Combine bank details into a string
        status: branch.status ? 'Active' : 'Inactive', // Display status as string
      }));
      setRows(transformedData); // Set the fetched data into rows state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdetails();
  }, []); // Empty dependency array ensures this runs once when the component mounts

 

  const handleView = (id) => {
    const selectedBranch = rows.find(row => row.id === id);
    if (selectedBranch) {
      setSelectedBranch(selectedBranch);
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setSelectedBranch(null);
    setOpen(false);
  };

  const handleEdit = (id) => {
    // Handle the edit logic here, such as opening a form to edit the branch
    console.log("Editing branch with id:", id);
  };

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token")
    const res = confirm("Are Your Sure You want to Delete??")
   if(res){
    await axios.delete(`https://management-backend-b1uo.onrender.com/branch/branches${id}`,{
      headers:{
          Authorization:`$Bearer ${token}`
      }
  })
    toast.success("Successfully Deleted")
 
   }
    
  } catch (error) {
    console.log(error)
    toast.error("Cannot Delete")
  }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows?.filter((row) => {
    return Object?.values(row)?.some((val) =>
      val?.toString().toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);  
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'branchcode', headerName: 'Branch Code', width: 130 },
    { field: 'branchname', headerName: 'Branch Name', width: 200 },
    { field: 'branchshortname', headerName: 'Short Name', width: 150 },
    { field: 'doorflatno', headerName: 'Door/Flat No.', width: 130 },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'pincode', headerName: 'Pincode', width: 120 },
    { field: 'locality', headerName: 'Locality', width: 150 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'panNo', headerName: 'PAN No.', width: 130 },
    { field: 'gstin', headerName: 'GSTIN', width: 160 },
    { field: 'branchType', headerName: 'Branch Type', width: 130 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 180 },
    { field: 'contactno', headerName: 'Contact No.', width: 150 },
    { field: 'emailid', headerName: 'Email ID', width: 180 },
    { field: 'branchinchargename', headerName: 'Branch Incharge', width: 180 },
    { field: 'contactpersonname', headerName: 'Contact Person', width: 180 },
    { field: 'openingbalance', headerName: 'Opening Balance', width: 150 },
    { field: 'openingdate', headerName: 'Opening Date', valueGetter: (params) => {
      const dateString = params;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    }, width: 130 },
    { field: 'minimumamount', headerName: 'Min Amount', width: 130 },
    { field: 'maximumamount', headerName: 'Max Amount', width: 130 },
    { field: 'effectivedate', headerName: 'Effective Date', valueGetter: (params) => {
      const dateString = params;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    }, width: 150 },
    { field: 'bankdetails', headerName: 'Bank Details', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const isActive = params.value === 'Active';
        return (
          <span
            style={{
              color: isActive ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: 'actions', 
      headerName: 'Actions', 
      renderCell: (params) => (
        <div className='flex justify-center gap-4'>
          <Link to={`/branch/${params.row._id}`} state={params.row} className='flex items-center bg-red-600 text-white px-4 rounded-lg'>
           <Edit2 size={20} /> Edit
          </Link>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Trash2 />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<Eye />}
            onClick={() => handleView(params.row.id)}
          >
            View
          </Button>
        </div>
      ), 
      width: 400 
    }
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className='mx-10'>
      <div>
      </div>

      <div>
        <h1>Branch</h1>
      </div>


      <Dialog open={open} onClose={handleCloseDialog} PaperProps={{ style: { width: '60%' } }}>
  <DialogTitle>Branch Details</DialogTitle>
  <DialogContent>
    {selectedBranch ? (
      <div>
        <p><strong>Branch Code:</strong> {selectedBranch.branchcode}</p>
        <p><strong>Branch Name:</strong> {selectedBranch.branchname}</p>
        <p><strong>Branch Short Name:</strong> {selectedBranch.branchshortname}</p>
        <p><strong>Door/Flat No.:</strong> {selectedBranch.doorflatno}</p>
        <p><strong>Street:</strong> {selectedBranch.street}</p>
        <p><strong>Pincode:</strong> {selectedBranch.pincode}</p>
        <p><strong>Locality:</strong> {selectedBranch.locality}</p>
        <p><strong>City:</strong> {selectedBranch.city}</p>
        <p><strong>State:</strong> {selectedBranch.state}</p>
        <p><strong>PAN No.:</strong> {selectedBranch.panNo}</p>
        <p><strong>GSTIN:</strong> {selectedBranch.gstin}</p>
        <p><strong>Branch Type:</strong> {selectedBranch.branchType}</p>
        <p><strong>Vehicle Type:</strong> {selectedBranch.vehicleType}</p>
        <p><strong>Contact No.:</strong> {selectedBranch.contactno}</p>
        <p><strong>Email ID:</strong> {selectedBranch.emailid}</p>
        <p><strong>Branch Incharge:</strong> {selectedBranch.branchinchargename}</p>
        <p><strong>Contact Person:</strong> {selectedBranch.contactpersonname}</p>
        <p><strong>Opening Balance:</strong> {selectedBranch.openingbalance}</p>
        <p><strong>Opening Date:</strong> {new Date(selectedBranch.openingdate).toLocaleDateString()}</p>
        <p><strong>Min Amount:</strong> {selectedBranch.minimumamount}</p>
        <p><strong>Max Amount:</strong> {selectedBranch.maximumamount}</p>
        <p><strong>Effective Date:</strong> {new Date(selectedBranch.effectivedate).toLocaleDateString()}</p>
        <p><strong>Bank Details:</strong> {selectedBranch.bankdetails}</p>
        <p><strong>Status:</strong> {selectedBranch.status}</p>
      </div>
    ) : null}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">Close</Button>
  </DialogActions>
</Dialog>

      {/* Search Bar */}
      <div className="my-4 flex justify-between items-center">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          style={{width:"200px"}}
        />
       <div className='flex items-center justify-center gap-4'>
       <Link to={"/branchform"} className='bg-purple-800 text-white  px-6 py-4 rounded-xl'>Add</Link>
          {/* Full-Screen Toggle Button */}
          
          
      <Button
        variant="contained"
        color="default"
        onClick={toggleFullScreen}
      >
        {isFullScreen ? <Minimize /> : <Maximize />}
      </Button>
       </div>
      </div>

    

      {/* Table */}
      <div className='flex justify-center'>
        <Paper sx={{ height: 400, width: '1200px' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>

      
    </div>
  );
};

export default Branch;