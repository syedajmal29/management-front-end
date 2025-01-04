import axios from 'axios';
import { useFormik } from 'formik';
import { FieldArray } from 'formik';
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BranchEditing = () => {
const {state} = useLocation();
const {id} = useParams();
    const [allChecked, setAllChecked] = useState(false);
    const [vehicleTypes, setVehicleTypes] = useState({
      truck: false,
      car: false,
      convoy: false,
    });
    const navigate = useNavigate()
    
    // Handle "All" checkbox change
    const handleCheckAll = () => {
      setAllChecked(!allChecked);
      const newVehicleTypes = {
        truck: !allChecked,
        car: !allChecked,
        convoy: !allChecked,
      };
      setVehicleTypes(newVehicleTypes);
    
      // Update Formik field value for nested vehicleType
      formik.setFieldValue("branchdetails.vehicleType", Object.keys(newVehicleTypes).filter(key => newVehicleTypes[key]));
    };
    
    // Handle individual checkbox change
    const handleCheckboxChange = (e) => {
      const { id, checked } = e.target;
      setVehicleTypes((prevState) => {
        const updatedTypes = { ...prevState, [id]: checked };
    
        // Set allChecked if all checkboxes are checked
        setAllChecked(Object.values(updatedTypes).every(Boolean));
    
        // Update Formik field value for nested vehicleType
        formik.setFieldValue("branchdetails.vehicleType", Object.keys(updatedTypes).filter(key => updatedTypes[key]));
        
        return updatedTypes;
      });
    };
    
    
    const toggleStatus = (e) => {
        const isChecked = e.target.checked; // true if checked, false if not
    formik.setFieldValue("status",isChecked)
    };
    
    // Use the formik hook with validation
    const formik = useFormik({
      initialValues: {
        branchdetails: {
          branchcode: state?.branchcode,
          branchname: state?.branchname,
          branchshortname: state?.branchshortname,
          doorflatno: state?.doorflatno,
          street: state?.street,
          pincode: state?.pincode,
          locality: state?.locality,
          city:state?.city,
          state: state?.state,
          panNo: state?.panNo,
          gstin: state?.gstin,
          branchType: state?.branchType,
          vehicleType: [],
        },
        branchcontactdetails: {
          contactno: state?.contactno,
          alternatecontactno: state?.alternatecontactno,
          whatsappno: state?.whatsappno,
          emailid: state?.emailid,
        },
        branchinchargedetails: {
          branchinchargename: state?.branchinchargename,
          contactno: state?.contactno1,
          alternatecontactno: state?.alternatecontactno1,
          whatsappno: state?.whatsappno1,
          emailid: state?.emailid1,
        },
        contactpersondetails: {
          contactpersonname: state?.contactpersonname,
          contactno: state?.contactno2,
          alternatecontactno: state?.alternatecontactno2,
          whatsappno: state?.whatsappno2,
          emailid: state?.emailid2,
        },
        openingdetails: {
          openingbalance: state?.openingbalance,
          openingdate: state?.openingdate,
        },
        advancerequestdetails: {
          minimumamount: state?.minimumamount,
          maximumamount: state?.maximumamount,
          monthlymaximumamount: state?.monthlymaximumamount,
          maximumunallocatedamount: state?.maximumunallocatedamount,
          effectivedate: state?.effectivedate,
        },
        bankdetails: [
          {
            accountnumber: state?.bankdetail[0]?.accountnumber,
            accountholdername: state?.bankdetail[0]?.accountholdername,
            ifsccode: state?.bankdetail[0]?.ifsccode,
            bankname: state?.bankdetail[0]?.bankname,
            branchname: state?.bankdetail[0]?.branchname,
          },
        ],
        
        status:state?.status,
      },
      
    
      
      onSubmit: async (values) => {
       try {
        console.log(values);
        const token = localStorage.getItem("token")
        await axios.put(`https://management-backend-b1uo.onrender.com/branch/branches/${id}`,values,{
            
          headers:{
              Authorization:`$Bearer ${token}`
          }
      })
        toast.success("Updated Successfully")
        navigate("/branch")
       } catch (error) {
        toast.error("Cannot add there is error")
       }
      },
    });

   
      
  return (
    <div className='overflowhidden'>
     
     <form onSubmit={formik.handleSubmit}>
     <div className='overflow-y-scroll h-screen'>
     <div className='flex justify-end m-12'>
       <span className='bg-indigo-800 px-4 py-2 cursor-pointer rounded-lg text-white' onClick={()=>{navigate(-1)}}>Back</span>
       </div>
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">1. Branch Details</h1>

      {/* Branch Details Form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="branchCode" className="block text-sm font-semibold text-gray-700">Branch Code*</label>
          <input
            type="text"
            id="branchCode"
            name='branchdetails.branchcode'
            value={formik.values.branchdetails?.branchcode || ''}
            onChange={formik.handleChange}
            placeholder="Branch Code*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
               {formik.touched.branchdetails?.branchcode && formik.errors.branchdetails?.branchcode && (
      <div className="text-sm text-red-600">{formik.errors.branchdetails.branchcode}</div>
    )}
        </div>

        <div className="space-y-2">
  <label htmlFor="branchName" className="block text-sm font-semibold text-gray-700">Branch Name*</label>
  <input
    type="text"
    id="branchName"
    name="branchdetails.branchname"
    value={formik.values.branchdetails?.branchname || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Branch Name*"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.branchname && formik.errors.branchdetails?.branchname && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.branchname}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="branchShortName" className="block text-sm font-semibold text-gray-700">Branch Short Name*</label>
  <input
    type="text"
    id="branchShortName"
    name="branchdetails.branchshortname"
    value={formik.values.branchdetails?.branchshortname || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Branch Short Name*"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.branchshortname && formik.errors.branchdetails?.branchshortname && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.branchshortname}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="flat" className="block text-sm font-semibold text-gray-700">Flat*</label>
  <input
    type="text"
    id="flat"
    name="branchdetails.doorflatno"
    value={formik.values.branchdetails?.doorflatno || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Flat*"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.doorflatno && formik.errors.branchdetails?.doorflatno && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.doorflatno}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="street" className="block text-sm font-semibold text-gray-700">Street*</label>
  <input
    type="text"
    id="street"
    name="branchdetails.street"

    onChange={formik.handleChange}
value={formik.values.branchdetails?.street || ''}

    onBlur={formik.handleBlur}
    placeholder="Street*"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.street && formik.errors.branchdetails?.street && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.street}</div>
  )}
</div>

{/* Pincode and Locality */}
<div className="space-y-2">
  <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700">Pincode</label>
  <input
    type="number"
    id="pincode"
    name="branchdetails.pincode"
    value={formik.values.branchdetails?.pincode || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Pincode"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.pincode && formik.errors.branchdetails?.pincode && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.pincode}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="locality" className="block text-sm font-semibold text-gray-700">Locality</label>
  <input
    type="text"
    name="branchdetails.locality"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.branchdetails?.locality || ''}
    id="locality"
    placeholder="Locality"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.locality && formik.errors.branchdetails?.locality && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.locality}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
  <input
    type="text"
    name="branchdetails.city"
    value={formik.values.branchdetails?.city || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    id="city"
    placeholder="City"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.city && formik.errors.branchdetails?.city && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.city}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="state" className="block text-sm font-semibold text-gray-700">State</label>
  <input
    type="text"
    name="branchdetails.state"
    value={formik.values.branchdetails?.state || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    id="state"
    placeholder="State"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.state && formik.errors.branchdetails?.state && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.state}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="panNo" className="block text-sm font-semibold text-gray-700">PAN No.</label>
  <input
    type="text"
    id="panNo"
    name="branchdetails.panNo"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.branchdetails?.panNo || ''}
    placeholder="PAN No."
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.panNo && formik.errors.branchdetails?.panNo && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.panNo}</div>
  )}
</div>

<div className="space-y-2">
  <label htmlFor="gstin" className="block text-sm font-semibold text-gray-700">GST Number</label>
  <input
    type="text"
    id="gstin"
    name="branchdetails.gstin"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.branchdetails?.gstin || ''}
    placeholder="Enter GST number"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {formik.touched.branchdetails?.gstin && formik.errors.branchdetails?.gstin && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.gstin}</div>
  )}
</div>

{/* Branch Type */}
<div className="space-y-2">
  <label htmlFor="branchType" className="block text-sm font-semibold text-gray-700">Branch Type</label>
  <select
    id="branchType"
    name="branchdetails.branchType"
    value={formik.values.branchdetails?.branchType || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option>Head Quarters</option>
    <option>Corporate Office</option>
    <option>Branch</option>
  </select>
  {formik.touched.branchdetails?.branchType && formik.errors.branchdetails?.branchType && (
    <div className="text-sm text-red-600">{formik.errors.branchdetails.branchType}</div>
  )}
</div>

{/* Vehicle Type */}
<div className="space-y-2">
  <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-700">Vehicle Type</label>
  <div className="flex gap-4 flex-col">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="all"
        checked={allChecked}
        onChange={handleCheckAll}
        className="mr-2"
      />
      <label htmlFor="all">All</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="truck"
        checked={vehicleTypes.truck}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="truck">Truck</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="car"
        checked={vehicleTypes.car}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="car">Car</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="convoy"
        checked={vehicleTypes.convoy}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="convoy">Convoy</label>
    </div>
  </div>
  
</div>

   

        {/* Add more sections similarly */}
        
        <div className="space-y-2 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">2. Branch Contact Details</h2>
  
  <div>
    <input
      type="number"
      placeholder="Contact Number"
      name="branchcontactdetails.contactno"
      value={formik.values.branchcontactdetails?.contactno || ''}
      onChange={formik.handleChange}
    
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchcontactdetails?.contactno && formik.touched.branchcontactdetails?.contactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchcontactdetails.contactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="branchcontactdetails.alternatecontactno"
      onChange={formik.handleChange}
      value={formik.values.branchcontactdetails.alternatecontactno}
      placeholder="Alternate Contact Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchcontactdetails?.alternatecontactno && formik.touched.branchcontactdetails?.alternatecontactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchcontactdetails.alternatecontactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      placeholder="Whatsapp Number"
      name="branchcontactdetails.whatsappno"
      onChange={formik.handleChange}
      value={formik.values.branchcontactdetails.whatsappno}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchcontactdetails?.whatsappno && formik.touched.branchcontactdetails?.whatsappno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchcontactdetails.whatsappno}</div>
    )}
  </div>

  <div>
    <input
      type="email"
      placeholder="Email ID"
      name="branchcontactdetails.emailid"
      onChange={formik.handleChange}
      value={formik.values.branchcontactdetails.emailid}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchcontactdetails?.emailid && formik.touched.branchcontactdetails?.emailid && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchcontactdetails.emailid}</div>
    )}
  </div>
</div>


        {/* Branch Incharge Details */}
        <div className="space-y-2 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">3. Branch Incharge Details</h2>

  <div>
    <input
      type="text"
      placeholder="Branch Incharge Name"
      name="branchinchargedetails.branchinchargename"
      onChange={formik.handleChange}
      value={formik.values.branchinchargedetails.branchinchargename}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchinchargedetails?.branchinchargename && formik.touched.branchinchargedetails?.branchinchargename && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchinchargedetails.branchinchargename}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="branchinchargedetails.contactno"
      onChange={formik.handleChange}
      value={formik.values.branchinchargedetails.contactno}
      placeholder="Contact Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchinchargedetails?.contactno && formik.touched.branchinchargedetails?.contactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchinchargedetails.contactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      placeholder="Alternate Contact Number"
      name="branchinchargedetails.alternatecontactno"
      onChange={formik.handleChange}
      value={formik.values.branchinchargedetails.alternatecontactno}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchinchargedetails?.alternatecontactno && formik.touched.branchinchargedetails?.alternatecontactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchinchargedetails.alternatecontactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      placeholder="Whatsapp Number"
      name="branchinchargedetails.whatsappno"
      onChange={formik.handleChange}
      value={formik.values.branchinchargedetails.whatsappno}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchinchargedetails?.whatsappno && formik.touched.branchinchargedetails?.whatsappno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchinchargedetails.whatsappno}</div>
    )}
  </div>

  <div>
    <input
      type="email"
      name="branchinchargedetails.emailid"
      onChange={formik.handleChange}
      value={formik.values.branchinchargedetails.emailid}
      placeholder="Email ID"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.branchinchargedetails?.emailid && formik.touched.branchinchargedetails?.emailid && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.branchinchargedetails.emailid}</div>
    )}
  </div>
</div>


        {/* Contact Person Details */}
        <div className="space-y-2 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">4. Contact Person Details</h2>

  <div>
    <input
      type="text"
      placeholder="Contact Person Name"
      name="contactpersondetails.contactpersonname"
      onChange={formik.handleChange}
      value={formik.values.contactpersondetails.contactpersonname}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.contactpersondetails?.contactpersonname && formik.touched.contactpersondetails?.contactpersonname && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactpersondetails.contactpersonname}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="contactpersondetails.contactno"
      onChange={formik.handleChange}
      value={formik.values.contactpersondetails.contactno}
      placeholder="Contact Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.contactpersondetails?.contactno && formik.touched.contactpersondetails?.contactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactpersondetails.contactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="contactpersondetails.alternatecontactno"
      onChange={formik.handleChange}
      value={formik.values.contactpersondetails.alternatecontactno}
      placeholder="Alternate Contact Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.contactpersondetails?.alternatecontactno && formik.touched.contactpersondetails?.alternatecontactno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactpersondetails.alternatecontactno}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="contactpersondetails.whatsappno"
      onChange={formik.handleChange}
      value={formik.values.contactpersondetails.whatsappno}
      placeholder="Whatsapp Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.contactpersondetails?.whatsappno && formik.touched.contactpersondetails?.whatsappno && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactpersondetails.whatsappno}</div>
    )}
  </div>

  <div>
    <input
      type="email"
      name="contactpersondetails.emailid"
      onChange={formik.handleChange}
      value={formik.values.contactpersondetails.emailid}
      placeholder="Email ID"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.contactpersondetails?.emailid && formik.touched.contactpersondetails?.emailid && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.contactpersondetails.emailid}</div>
    )}
  </div>
</div>



        {/* opening details */}
     {/* Opening Details */}
     <div className="space-y-4 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">5. Opening Details</h2>

  <div>
    <input
      type="number"
      name="openingdetails.openingbalance"
      onChange={formik.handleChange}
      value={formik.values.openingdetails.openingbalance}
      placeholder="Opening Balance"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.openingdetails?.openingbalance && formik.touched.openingdetails?.openingbalance && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.openingdetails.openingbalance}</div>
    )}
  </div>

  <div>
    <input
      type="date"
      name="openingdetails.openingdate"
      onChange={formik.handleChange}
      value={formik.values.openingdetails.openingdate}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.values.openingdetails.openingdate}
    {formik.errors.openingdetails?.openingdate && formik.touched.openingdetails?.openingdate && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.openingdetails.openingdate}</div>
    )}
  </div>
</div>


{/* Advance Request Details */}
<div className="space-y-4 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">6. Advance Request Details</h2>

  <div>
    <input
      type="number"
      name="advancerequestdetails.minimumamount"
      onChange={formik.handleChange}
      value={formik.values.advancerequestdetails.minimumamount}
      placeholder="Enter Minimum Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.advancerequestdetails?.minimumamount && formik.touched.advancerequestdetails?.minimumamount && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.advancerequestdetails.minimumamount}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="advancerequestdetails.maximumamount"
      onChange={formik.handleChange}
      value={formik.values.advancerequestdetails.maximumamount}
      placeholder="Enter Maximum Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.advancerequestdetails?.maximumamount && formik.touched.advancerequestdetails?.maximumamount && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.advancerequestdetails.maximumamount}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="advancerequestdetails.monthlymaximumamount"
      onChange={formik.handleChange}
      value={formik.values.advancerequestdetails.monthlymaximumamount}
      placeholder="Monthly Maximum Amount"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.advancerequestdetails?.monthlymaximumamount && formik.touched.advancerequestdetails?.monthlymaximumamount && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.advancerequestdetails.monthlymaximumamount}</div>
    )}
  </div>

  <div>
    <input
      type="number"
      name="advancerequestdetails.maximumunallocatedamount"
      onChange={formik.handleChange}
      value={formik.values.advancerequestdetails.maximumunallocatedamount}
      placeholder="Maximum Unallocated Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.advancerequestdetails?.maximumunallocatedamount && formik.touched.advancerequestdetails?.maximumunallocatedamount && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.advancerequestdetails.maximumunallocatedamount}</div>
    )}
  </div>

  <div>
    <input
      type="date"
      name="advancerequestdetails.effectivedate"
      onChange={formik.handleChange}
      value={formik.values.advancerequestdetails.effectivedate}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.values.advancerequestdetails.effectivedate}
    {formik.errors.advancerequestdetails?.effectivedate && formik.touched.advancerequestdetails?.effectivedate && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.advancerequestdetails.effectivedate}</div>
    )}
  </div>
</div>


{/* Bank Details */}
<div className="space-y-4 mt-6">
  <h2 className="text-xl font-semibold text-gray-800">7. Bank Details</h2>

  <div>
    <input
      type="number"
      name="bankdetails[0].accountnumber"
      onChange={formik.handleChange}
      value={formik.values.bankdetails[0]?.accountnumber}
      placeholder="Enter Account Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.bankdetails?.[0]?.accountnumber && formik.touched.bankdetails?.[0]?.accountnumber && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.bankdetails[0]?.accountnumber}</div>
    )}
  </div>

  <div>
    <input
      type="text"
      name="bankdetails[0].accountholdername"
      onChange={formik.handleChange}
      value={formik.values.bankdetails[0]?.accountholdername}
      placeholder="Enter Account Holder"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.bankdetails?.[0]?.accountholdername && formik.touched.bankdetails?.[0]?.accountholdername && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.bankdetails[0].accountholdername}</div>
    )}
  </div>

  <div>
    <input
      type="text"
      name="bankdetails[0].ifsccode"
      onChange={formik.handleChange}
      value={formik.values.bankdetails[0]?.ifsccode}
      placeholder="IFSC Code"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.bankdetails?.[0]?.ifsccode && formik.touched.bankdetails?.[0]?.ifsccode && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.bankdetails[0].ifsccode}</div>
    )}
  </div>

  <div>
    <input
      type="text"
      name="bankdetails[0].bankname"
      onChange={formik.handleChange}
      value={formik.values.bankdetails[0]?.bankname}
      placeholder="Enter Bank Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.bankdetails?.[0]?.bankname && formik.touched.bankdetails?.[0]?.bankname && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.bankdetails[0].bankname}</div>
    )}
  </div>

  <div>
    <input
      type="text"
      name="bankdetails[0].branchname"
      onChange={formik.handleChange}
      value={formik.values.bankdetails[0]?.branchname}
      placeholder="Enter Branch Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {formik.errors.bankdetails?.[0]?.branchname && formik.touched.bankdetails?.[0]?.branchname && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.bankdetails[0].branchname}</div>
    )}
  </div>
</div>




<div className=" mt-5">
    <label>Status</label>
  <label className="switch">
    <input 
      type="checkbox"  
      id="toggle" 
      value={formik.values.status}
      onChange={(e) => toggleStatus(e)} 
    />
    <span className="slider"></span>
  </label>
</div>





<div>
    <input type='submit' value={"Update"} className='bg-purple-900 text-white px-4 py-2 rounded-lg cursor-pointer' />
</div>

      </div>
    </div>
    </div>

     </form>
    </div>
  )
}

export default BranchEditing;
