import {
	Autocomplete,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../context/useAuth";

const PageRols = () => {
	const { token } = useAuth();
	const [allUsers, setAllUsers] = useState([]);
	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_SERVER_API}/users`)
			.then((res) => res.json())
			.then((data) => setAllUsers(data));
	}, []);

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		axios
			.put(`https://${process.env.REACT_APP_SERVER_API}/users/pageRole`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				Swal.fire("Success!", "User Role Changed Successfully.", "success");
			})
			.catch(function (error) {
				Swal.fire("Error!", "You don't have access to change role.", "error");
			});
	};

	return (
		<Container>
			<Typography
				variant='h4'
				gutterBottom
				component='div'
				sx={{ fontWeight: "bold", color: "#31887D" }}>
				Change or Add Page Role
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ textAlign: "left", mx: "auto", my: { xs: 5 } }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							"& > :not(style)": { m: 1 },
						}}>
						<Autocomplete
							freeSolo
							id='free-solo-2-demo'
							disableClearable
							options={allUsers?.map((user) => user?.email)}
							renderInput={(params) => (
								<TextField
									{...register("email", { required: true })}
									{...params}
									label='Search Users'
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
						<FormControl>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Roles
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								id='demo-simple-select-autowidth'
								autoWidth
								label='Roles'
								{...register("userRole", { required: true })}>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='User'>User</MenuItem>
							</Select>
						</FormControl>
						<Button
							type='submit'
							variant='contained'
							sx={{
								backgroundColor: "#31887D",
								"&.MuiButtonBase-root:hover": {
									bgcolor: "#31887D",
								},
							}}>
							Change Role
						</Button>
					</Box>
				</Grid>
			</form>
		</Container>
	);
};

export default PageRols;
