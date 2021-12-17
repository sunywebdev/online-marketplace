import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Input,
	Rating,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../context/useAuth";

import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EditGig = () => {
	const { id } = useParams();
	console.log(id);
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
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			postedBy: "",
			gigTitle: "",
			gigPrice: "",
			daysNeeded: "",
			gigDescription: "",
			gigPhoto1: "",
			gigPhoto2: "",
			gigPhoto3: "",
			gigPhoto4: "",
		},
	});
	const [data, setData] = useState();
	useEffect(() => {
		axios.get(`http://localhost:5000/gigs/${id}`).then((res) => {
			console.log(res.data);
			reset(res.data);
			setData(res.data);
		});
	}, [id, reset]);
	const onSubmit = (
		postedBy,
		gigTitle,
		gigPrice,
		daysNeeded,
		gigDescription,
		gigPhoto1,
		gigPhoto2,
		gigPhoto3,
		gigPhoto4,
	) => {
		console.log(data);
		const gig = {
			postedBy,
			gigTitle,
			gigPrice,
			daysNeeded,
			gigDescription,
			gigPhoto1: imageLink1 || gigPhoto1,
			gigPhoto2: imageLink2 || gigPhoto2,
			gigPhoto3: imageLink3 || gigPhoto3,
			gigPhoto4: imageLink4 || gigPhoto4,
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
					alignItems: "center",
					minHeight: "100vh",
				}}>
				<Box>
					<Typography
						variant='h4'
						gutterBottom
						component='div'
						sx={{ fontWeight: "bold", mb: 3 }}>
						Update Gig
					</Typography>

					<Grid
						container
						spacing={2}
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}>
						<Grid item md={5} xs={12}>
							<Card sx={{ textAlign: "left", border: "1px solid #e4e5e7" }}>
								<img
									style={{ width: "50%" }}
									component='img'
									alt=''
									src={data?.gigPhoto1}
								/>
								<img
									style={{ width: "50%" }}
									component='img'
									alt=''
									src={data?.gigPhoto2}
								/>
								<img
									style={{ width: "50%" }}
									component='img'
									alt=''
									src={data?.gigPhoto3}
								/>
								<img
									style={{ width: "50%" }}
									component='img'
									alt=''
									src={data?.gigPhoto4}
								/>
								<CardHeader
									sx={{ pt: 1, pl: 1.5, pb: 0.3 }}
									avatar={
										<Avatar
											sx={{ bgcolor: "red", m: 0 }}
											aria-label='recipe'
											src={data?.sellerPhoto}
										/>
									}
									titleTypographyProps={{
										variant: "body1",
										fontWeight: "bold",
									}}
									subheaderTypographyProps={{
										variant: "body2",
										fontWeight: "bold",
									}}
									title='suny1234'
									subheader='New Seller'
								/>
								<CardContent sx={{ py: 1, px: 1.5 }}>
									<Typography
										gutterBottom
										variant='body'
										component='div'
										sx={{ fontWeight: 600 }}>
										{data?.gigTitle}
									</Typography>
									<Typography gutterBottom variant='body2' component='div'>
										{data?.gigDescription}
									</Typography>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}>
										<Rating
											name='half-rating'
											sx={{ fontSize: 19 }}
											defaultValue={4.5}
											readOnly
										/>
										<Box sx={{ ml: 0.5 }}>
											<Typography
												variant='body'
												sx={{ fontWeight: "bold", color: "#FCC84F" }}>
												5
											</Typography>
										</Box>
										<Box sx={{ ml: 0.5 }}>
											<Typography
												variant='body'
												sx={{
													fontWeight: "bold",
													color: "#C7C8CB",
													fontSize: "20",
												}}>
												(500)
											</Typography>
										</Box>
									</Box>
								</CardContent>
								<Divider />
								<CardActions
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-around",
									}}>
									<Box>
										<FormatAlignJustifyIcon
											sx={{ fontSize: 20, mr: 0.3, color: "#7a7d85" }}
										/>
										<FavoriteIcon sx={{ fontSize: 20, color: "#7a7d85" }} />
									</Box>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}>
										<Typography
											variant='caption'
											sx={{
												fontWeight: "bold",
												fontSize: 11,
												color: "#7a7d85",
											}}>
											STARTING AT
										</Typography>
										<Typography
											sx={{
												fontWeight: "bold",
												fontSize: 19,
												ml: 0.3,
												color: "#404145",
											}}>
											US${data?.gigPrice}
										</Typography>
									</Box>
								</CardActions>
							</Card>
						</Grid>
						<Grid item md={6} xs={12}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid container spacing={2}>
									<Grid item md={12} xs={12}>
										<TextField
											sx={{ width: "100%" }}
											label='Gig Title'
											variant='outlined'
											InputLabelProps={{
												shrink: true,
											}}
											{...register("gigTitle", { required: true })}
										/>
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField
											sx={{ width: "100%" }}
											label='Gig Price'
											variant='outlined'
											InputLabelProps={{
												shrink: true,
											}}
											{...register("gigPrice", { required: true })}
										/>
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField
											sx={{ width: "100%" }}
											label='Days Needed'
											variant='outlined'
											InputLabelProps={{
												shrink: true,
											}}
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
											InputLabelProps={{
												shrink: true,
											}}
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
													{inputImage1 ? (
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
													) : (
														<img src={data?.gigPhoto1} alt='' width='250px' />
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
													{inputImage2 ? (
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
													) : (
														<img src={data?.gigPhoto2} alt='' width='250px' />
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
													{inputImage3 ? (
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
													) : (
														<img src={data?.gigPhoto3} alt='' width='250px' />
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
													{inputImage4 ? (
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
													) : (
														<img src={data?.gigPhoto4} alt='' width='250px' />
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
											Update Gig
										</Button>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Container>
	);
};

export default EditGig;
