import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const AllOrders = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_SERVER_API}/orders`)
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [orders]);

	const Cancel = (e) => {
		const data = { orderStatus: "Cancelled by Admin", orderId: e };
		axios
			.put(`https://${process.env.REACT_APP_SERVER_API}/orders`, data)
			.then(function (response) {
				Swal.fire("Success!", "This Order Cancelled Successfully.", "success");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	let serial = 1;
	return (
		<div>
			<Typography
				variant='h4'
				gutterBottom
				component='div'
				sx={{ fontWeight: "bold", color: "#31887D" }}>
				All Orders
			</Typography>
			<TableContainer
				component={Paper}
				sx={{
					overflow: "auto",
					maxHeight: "80vh",
					width: { md: "auto", xs: "100vw" },
				}}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead sx={{ th: { fontWeight: "bold", color: "#31887D" } }}>
						<TableRow>
							<TableCell align='left'>No</TableCell>
							<TableCell align='left'>Order ID</TableCell>
							<TableCell align='left'>Ordered by</TableCell>
							<TableCell align='left'>Seller Name</TableCell>
							<TableCell align='left'>Title</TableCell>
							<TableCell align='left'>Cost</TableCell>
							<TableCell align='left'>Needed Tyme</TableCell>
							<TableCell align='left'>Order Status</TableCell>
							<TableCell align='left'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders?.length > 0 ? (
							<>
								{orders?.map((order) => (
									<TableRow
										key={order?._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{serial++}
										</TableCell>
										<TableCell align='left'>{order?.orderId}</TableCell>
										<TableCell align='left'>{order?.orderedBy}</TableCell>
										<TableCell align='left'>{order?.postedBy}</TableCell>
										<TableCell align='left'>{order?.gigTitle}</TableCell>
										<TableCell align='left'>{order?.gigPrice} $</TableCell>
										<TableCell align='left'>{order?.daysNeeded} Days</TableCell>
										<TableCell align='left'>{order?.orderStatus}</TableCell>
										<TableCell align='left'>
											<ButtonGroup disableElevation variant='contained'>
												{order?.orderStatus === "Active" ||
												order?.orderStatus === "OnGoing" ? (
													<Button
														sx={{
															backgroundColor: "#31887D",
															"&.MuiButtonBase-root:hover": {
																bgcolor: "#31887D",
															},
														}}
														onClick={(e) => Cancel(order?.orderId)}>
														Cancel
													</Button>
												) : (
													<>
														{order?.orderStatus === "Cancelled by Admin" ||
														order?.orderStatus === "Cancelled by Buyer" ||
														order?.orderStatus === "Cancelled by Seller" ? (
															<Button disabled>Cancelled</Button>
														) : (
															<Button disabled>Delivered</Button>
														)}
													</>
												)}
											</ButtonGroup>
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

export default AllOrders;
