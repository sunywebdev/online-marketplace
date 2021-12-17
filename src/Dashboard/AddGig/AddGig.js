import {
	Button,
	CircularProgress,
	Container,
	Grid,
	Input,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../context/useAuth";

const AddGig = () => {
	const [submitting, setSubmitting] = useState(false);
	const [inputImage1, setInputImage1] = useState(null);
	const [inputImage2, setInputImage2] = useState(null);
	const [inputImage3, setInputImage3] = useState(null);
	const [inputImage4, setInputImage4] = useState(null);
	const [imageLink1, setImageLink1] = useState(null);
	const [imageLink2, setImageLink2] = useState(null);
	const [imageLink3, setImageLink3] = useState(null);
	const [imageLink4, setImageLink4] = useState(null);
	const [uploading1, setUploading1] = useState(false);
	const [uploading2, setUploading2] = useState(false);
	const [uploading3, setUploading3] = useState(false);
	const [uploading4, setUploading4] = useState(false);
	const uploadImage1 = (e) => {
		e.preventDefault();
		if (!inputImage1) {
			return;
		}
		setUploading1(true);
		let payload1 = new FormData();
		payload1.append("image", inputImage1);

		axios
			.post(
				`https://api.imgbb.com/1/upload?&key=d1bdc6a614c853bd3d6d11f0b98f43c4`,
				payload1,
			)
			.then((response) => {
				setUploading1(false);
				setImageLink1(response?.data?.data?.url);
				Swal.fire({
					icon: "success",
					title: "Photo Uploaded",
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((error) => {
				setUploading1(false);
				console.log("error", error);
				Swal.fire({
					icon: "error",
					title: "Uploading Failed, Try Again",
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};
	const uploadImage2 = (e) => {
		e.preventDefault();
		if (!inputImage2) {
			return;
		}
		setUploading2(true);
		let payload2 = new FormData();
		payload2.append("image", inputImage2);

		axios
			.post(
				`https://api.imgbb.com/1/upload?&key=d1bdc6a614c853bd3d6d11f0b98f43c4`,
				payload2,
			)
			.then((response) => {
				setUploading2(false);
				setImageLink2(response?.data?.data?.url);
				Swal.fire({
					icon: "success",
					title: "Photo Uploaded",
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((error) => {
				setUploading2(false);
				console.log("error", error);
				Swal.fire({
					icon: "error",
					title: "Uploading Failed, Try Again",
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};
	const uploadImage3 = (e) => {
		e.preventDefault();
		if (!inputImage3) {
			return;
		}
		setUploading3(true);
		let payload3 = new FormData();
		payload3.append("image", inputImage3);

		axios
			.post(
				`https://api.imgbb.com/1/upload?&key=d1bdc6a614c853bd3d6d11f0b98f43c4`,
				payload3,
			)
			.then((response) => {
				setUploading3(false);
				setImageLink3(response?.data?.data?.url);
				Swal.fire({
					icon: "success",
					title: "Photo Uploaded",
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((error) => {
				setUploading3(false);
				console.log("error", error);
				Swal.fire({
					icon: "error",
					title: "Uploading Failed, Try Again",
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};
	const uploadImage4 = (e) => {
		e.preventDefault();
		if (!inputImage4) {
			return;
		}
		setUploading4(true);
		let payload4 = new FormData();
		payload4.append("image", inputImage4);

		axios
			.post(
				`https://api.imgbb.com/1/upload?&key=d1bdc6a614c853bd3d6d11f0b98f43c4`,
				payload4,
			)
			.then((response) => {
				setUploading4(false);
				setImageLink4(response?.data?.data?.url);
				Swal.fire({
					icon: "success",
					title: "Photo Uploaded",
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((error) => {
				setUploading4(false);
				console.log("error", error);
				Swal.fire({
					icon: "error",
					title: "Uploading Failed, Try Again",
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};
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
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		console.log(data);
		const gig = {
			postedBy: singleUser?.userName,
			sellerPhoto: singleUser?.photoURL,
			gigTitle: data?.gigTitle,
			gigPrice: data?.gigPrice,
			daysNeeded: data?.daysNeeded,
			gigDescription: data?.gigDescription,
			gigPhoto1: imageLink1,
			gigPhoto2: imageLink2,
			gigPhoto3: imageLink3,
			gigPhoto4: imageLink4,
		};
		axios
			.post(`http://localhost:5000/gigs`, gig)
			.then(function (response) {
				Swal.fire({
					icon: "success",
					title: "Your Gig Successfully Added",
					showConfirmButton: false,
					timer: 1500,
				});
				/* reset(); */
			})
			.catch(function (error) {
				console.log("error", error);
				console.log(error);
			});
	};

	return (
		<Container>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
				}}>
				<Box>
					<Typography
						variant='h4'
						gutterBottom
						component='div'
						sx={{ fontWeight: "bold" }}>
						Add New Gig
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid
							container
							spacing={2}
							sx={{ width: { md: "50%", xs: "100%" }, mx: "auto" }}>
							<Grid item md={12} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									label='Gig Title'
									variant='outlined'
									{...register("gigTitle", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<TextField
									sx={{ width: "100%" }}
									label='Gig Price'
									variant='outlined'
									{...register("gigPrice", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<TextField
									sx={{ width: "100%" }}
									label='Days Needed'
									variant='outlined'
									{...register("daysNeeded", { required: true })}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									label='Gig Description'
									multiline
									rows={4}
									variant='outlined'
									{...register("gigDescription", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<Box display='flex' flexDirection='column' sx={{ mb: 3 }}>
									<Input
										className='color-theme'
										accept='image/*'
										type='file'
										onChange={(e) => setInputImage1(e.target.files[0])}
									/>

									{!uploading1 ? (
										<>
											{inputImage1 && (
												<>
													<img
														src={URL.createObjectURL(inputImage1)}
														alt=''
														width='250px'
													/>
													<Button
														onClick={uploadImage1}
														variant='contained'
														component='span'
														className='button border'
														sx={{
															my: 1,
															py: 0.5,
															width: "250px",
															backgroundColor: "#31887D",
															"&.MuiButtonBase-root:hover": {
																bgcolor: "#31887D",
															},
														}}>
														Upload Image
													</Button>
												</>
											)}
										</>
									) : (
										<Box sx={{ my: 2 }}>
											<CircularProgress />
										</Box>
									)}
								</Box>
							</Grid>
							<Grid item md={6} xs={12}>
								<Box display='flex' flexDirection='column' sx={{ mb: 3 }}>
									<Input
										className='color-theme'
										accept='image/*'
										type='file'
										onChange={(e) => setInputImage2(e.target.files[0])}
									/>

									{!uploading2 ? (
										<>
											{inputImage2 && (
												<>
													<img
														src={URL.createObjectURL(inputImage2)}
														alt=''
														width='250px'
													/>
													<Button
														onClick={uploadImage2}
														variant='contained'
														component='span'
														className='button border'
														sx={{
															my: 1,
															py: 0.5,
															width: "250px",
															backgroundColor: "#31887D",
															"&.MuiButtonBase-root:hover": {
																bgcolor: "#31887D",
															},
														}}>
														Upload Image
													</Button>
												</>
											)}
										</>
									) : (
										<Box sx={{ my: 2 }}>
											<CircularProgress />
										</Box>
									)}
								</Box>
							</Grid>
							<Grid item md={6} xs={12}>
								<Box display='flex' flexDirection='column' sx={{ mb: 3 }}>
									<Input
										className='color-theme'
										accept='image/*'
										type='file'
										onChange={(e) => setInputImage3(e.target.files[0])}
									/>

									{!uploading3 ? (
										<>
											{inputImage3 && (
												<>
													<img
														src={URL.createObjectURL(inputImage3)}
														alt=''
														width='250px'
													/>
													<Button
														onClick={uploadImage3}
														variant='contained'
														component='span'
														className='button border'
														sx={{
															my: 1,
															py: 0.5,
															width: "250px",
															backgroundColor: "#31887D",
															"&.MuiButtonBase-root:hover": {
																bgcolor: "#31887D",
															},
														}}>
														Upload Image
													</Button>
												</>
											)}
										</>
									) : (
										<Box sx={{ my: 2 }}>
											<CircularProgress />
										</Box>
									)}
								</Box>
							</Grid>
							<Grid item md={6} xs={12}>
								<Box display='flex' flexDirection='column' sx={{ mb: 3 }}>
									<Input
										className='color-theme'
										accept='image/*'
										type='file'
										onChange={(e) => setInputImage4(e.target.files[0])}
									/>

									{!uploading4 ? (
										<>
											{inputImage4 && (
												<>
													<img
														src={URL.createObjectURL(inputImage4)}
														alt=''
														width='250px'
													/>
													<Button
														onClick={uploadImage4}
														variant='contained'
														component='span'
														className='button border'
														sx={{
															my: 1,
															py: 0.5,
															width: "250px",
															backgroundColor: "#31887D",
															"&.MuiButtonBase-root:hover": {
																bgcolor: "#31887D",
															},
														}}>
														Upload Image
													</Button>
												</>
											)}
										</>
									) : (
										<Box sx={{ my: 2 }}>
											<CircularProgress />
										</Box>
									)}
								</Box>
							</Grid>
							<Grid item md={12} xs={12}>
								{singleUser?.userName ? (
									<Button
										sx={{
											width: "100%",
											backgroundColor: "#31887D",
											"&.MuiButtonBase-root:hover": {
												bgcolor: "#31887D",
											},
										}}
										type='submit'
										variant='contained'>
										Add Gig
									</Button>
								) : (
									<Link to='/dashboard' style={{ textDecoration: "none" }}>
										<Button variant='contained' sx={{ mt: 1, width: "100%" }}>
											Complete Profile Before Adding New Gig
										</Button>
									</Link>
								)}
							</Grid>
						</Grid>
					</form>
				</Box>
			</Grid>
		</Container>
	);
};

export default AddGig;
