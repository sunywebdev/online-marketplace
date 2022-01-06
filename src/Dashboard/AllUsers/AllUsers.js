import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Typography } from "@mui/material";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch(`https://intense-brushlands-25667.herokuapp.com/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	let serial = 1;
	return (
		<div>
			<Typography
				variant='h4'
				gutterBottom
				component='div'
				sx={{ fontWeight: "bold", color: "#31887D" }}>
				All Users
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
							<TableCell align='left'>User Photo</TableCell>
							<TableCell align='left'>User Name</TableCell>
							<TableCell align='left'>Email</TableCell>
							<TableCell align='left'>Full Name</TableCell>
							<TableCell align='left'>Contact</TableCell>
							<TableCell align='left'>Location</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users?.length > 0 ? (
							<>
								{users?.map((user) => (
									<TableRow
										key={user?._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component='th' scope='row'>
											{serial++}
										</TableCell>
										<TableCell align='center'>
											<Box sx={{ mr: 1 }}>
												<Avatar alt='' src={user?.photoURL} />
											</Box>
										</TableCell>
										<TableCell align='left'>{user?.userName}</TableCell>
										<TableCell align='left'>{user?.email}</TableCell>
										<TableCell align='left'>{user?.displayName}</TableCell>
										<TableCell align='left'>{user?.contact}</TableCell>
										<TableCell align='left'>{user?.address}</TableCell>
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

export default AllUsers;
