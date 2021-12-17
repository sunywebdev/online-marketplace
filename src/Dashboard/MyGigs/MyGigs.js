import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Container as div } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Box } from "@mui/system";
import useAuth from "../../context/useAuth";

const MyGigs = () => {
	const { user } = useAuth();
	const [singleUser, setSingleUser] = React.useState();
	React.useEffect(() => {
		fetch(`http://localhost:5000/singleUsers?email=${user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				setSingleUser(data);
				console.log(data);
			});
	}, [user?.email]);

	const [gigs, setGigs] = useState([]);
	useEffect(() => {
		fetch(`http://localhost:5000/sellergigs?postedBy=${singleUser?.userName}`)
			.then((res) => res.json())
			.then((data) => setGigs(data));
	}, [singleUser?.userName]);
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:5000/gigs/${id}`)
					.then(function (response) {
						Swal.fire("Deleted!", "That Gig has been deleted.", "success");
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		});
	};
	let serial = 1;
	return (
		<div>
			<TableContainer
				component={Paper}
				sx={{
					overflow: "auto",
					maxHeight: "80vh",
					width: { md: "auto", xs: "100vw" },
				}}>
				<Table
					style={{ tableLayout: "fixed" }}
					sx={{ minWidth: 650 }}
					size='small'
					aria-label='a dense table'>
					<TableHead sx={{ th: { fontWeight: "bold", color: "#31887D" } }}>
						<TableRow>
							<TableCell align='left'>No</TableCell>
							<TableCell align='left'>GiG Photo</TableCell>
							<TableCell align='left'>Title</TableCell>
							<TableCell align='left'>Price</TableCell>
							<TableCell align='left'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{gigs?.length > 0 ? (
							<>
								{gigs?.map((gig) => (
									<TableRow
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{serial++}
										</TableCell>
										<TableCell align='left'>
											<img
												alt=''
												src={gig?.gigPhoto1}
												width='85px'
												height='55px'
											/>
										</TableCell>
										<TableCell align='left'>{gig?.gigTitle}</TableCell>
										<TableCell align='left'>{gig?.gigPrice} $</TableCell>

										<TableCell align='left' sx={{ display: "flex" }}>
											<Link
												to={`/dashboard/editgig/${gig?._id}`}
												style={{ textDecoration: "none" }}>
												<Button
													color='primary'
													variant='contained'
													sx={{
														mx: 0.5,
														backgroundColor: "#31887D",
														"&.MuiButtonBase-root:hover": {
															bgcolor: "#31887D",
														},
													}}>
													<EditIcon />
												</Button>
											</Link>
											<Button
												onClick={() => handleDelete(gig?._id)}
												color='primary'
												variant='contained'
												sx={{
													backgroundColor: "#31887D",
													"&.MuiButtonBase-root:hover": {
														bgcolor: "#31887D",
													},
												}}>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</>
						) : (
							<TableRow
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
								<TableCell align='left'>N/A</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MyGigs;
