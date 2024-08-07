import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllLaboratory = () => {
    const [laboratory, setLaboratory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLaboratory, setFilteredLaboratory] = useState([]);

    // --- Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-laboratories`);
            const reverseData = res.data.data.reverse();
            setLaboratory(reverseData);
        } catch (error) {
            console.error('There was an error fetching the laboratories!', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        setFilteredLaboratory(
            laboratory.filter((lab) =>
                lab.LabName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, laboratory]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(
                        `${process.env.REACT_APP_BACKEND_URL}/delete-laboratory/${id}`
                    );
                    console.log(res.data);
                    toast.success('Laboratory Deleted');
                    handleFetch();

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your laboratory has been deleted.',
                        icon: 'success'
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message);
                }
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // --- Pagination ---
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredLaboratory.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Laboratory List </h4>
                </div>
                <div className="links">
                    <Link
                        to="/add-laboratory"
                        className="add-new"
                    >
                        Add New{' '}
                        <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label>{' '}
                    &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <section className="main-table ">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Owner Name</th>
                            <th scope="col">Lab Name</th>
                            <th scope="col">Email Id</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Pin Code</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((lab, index) => (
                            <tr key={lab._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{lab.RepresentedName}</td>
                                <td>{lab.LabName}</td>
                                <td>{lab.email}</td>
                                <td>
                                    {lab.PhoneNumber}
                                    {lab.SecondPhoneNumber &&
                                        `, ${lab.SecondPhoneNumber}`}
                                </td>
                                <td>{lab.address}</td>
                                <td>{lab.city}</td>
                                <td>{lab.state}</td>
                                <td>{lab.pinCode}</td>
                                <td>{lab.Longitude}</td>
                                <td>{lab.Latitude}</td>
                                <td>
                                    <Link
                                        to={`/edit-lab/${lab._id}`}
                                        className="bt edit"
                                    >
                                        Edit{' '}
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        onClick={() => {
                                            handleDelete(lab._id);
                                        }}
                                        className="bt delete"
                                    >
                                        Delete{' '}
                                        <i className="fa-solid fa-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from(
                            {
                                length: Math.ceil(
                                    filteredLaboratory.length / itemPerPage
                                )
                            },
                            (_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${
                                        currentPage === i + 1 ? 'active' : ''
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            handlePageChange(i + 1)
                                        }
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
            </section>
        </>
    );
};

export default AllLaboratory;
