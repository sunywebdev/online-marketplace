import {
	Button,
	Card,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../context/useAuth";
import Swal from "sweetalert2";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Profile = () => {
	const { user } = useAuth();
	const [inputImage1, setInputImage1] = useState(null);
	const [imageLink1, setImageLink1] = useState(null);
	const [uploading1, setUploading1] = useState(false);
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			address: "",
			contact: "",
			photoURL: "",
		},
	});
	const Input = styled("input")({
		display: "none",
	});
	const onSubmit = (data) => {
		const userProfile = {
			userName: data?.userName,
			email: data?.email,
			displayName: data?.displayName,
			contact: data?.contact,
			address: data?.address,
			photoURL: imageLink1,
		};
		axios
			.put(
				`https://${process.env.REACT_APP_SERVER_API}/users/updateUsers`,
				userProfile,
			)
			.then(function (response) {
				Swal.fire("Success!", "Profile Updated Successfully.", "success");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const [singleUser, setSingleUser] = useState();
	useEffect(() => {
		fetch(
			`https://${process.env.REACT_APP_SERVER_API}/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				reset(data);
				setSingleUser(data);
			});
	}, [reset, user?.email, user?.photoURL]);

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
				`https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_IMGBB_API}`,
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
	return (
		<Container>
			<Grid justifyContent='center' container spacing={3}>
				<Grid item xs={12} sm={12} md={4}>
					<Card
						sx={{
							maxWidth: 345,
							mx: 1.5,
							mb: 1,
							pb: 2,
							minHeight: "250px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							alignContent: "center",
							overflow: "hidden",
						}}>
						{user?.photoURL ? (
							<CardMedia
								component='img'
								className='border'
								style={{
									height: "170px",
								}}
								image={user?.photoURL}
								alt=''
							/>
						) : (
							<CardMedia
								component='img'
								className='border'
								style={{
									height: "170px",
								}}
								image={singleUser?.photoURL}
								alt=''
							/>
						)}
						{user?.photoURL ? (
							<CardMedia
								component='img'
								className='border'
								style={{
									width: "110px",
									height: "110px",
									marginTop: -45,
									borderRadius: "50%",
									border: "1px solid",
								}}
								image={user?.photoURL}
								alt=''
							/>
						) : (
							<CardMedia
								component='img'
								className='border'
								style={{
									width: "110px",
									marginTop: -45,
									borderRadius: "50%",
									border: "5px solid",
								}}
								image={singleUser?.photoURL}
								alt=''
							/>
						)}
						<Typography
							variant='h5'
							component='div'
							sx={{ fontWeight: "bold", mt: 2, color: "#31887D" }}>
							{singleUser?.displayName}
						</Typography>
						<List>
							<ListItem sx={{ pt: 0 }}>
								<ListItemIcon>
									<AccountCircleIcon sx={{ color: "#31887D" }} />
								</ListItemIcon>
								<ListItemText
									sx={{ color: "#31887D" }}
									primary={singleUser?.userName || "N/A"}
								/>
							</ListItem>
							<ListItem sx={{ pt: 0 }}>
								<ListItemIcon>
									<EmailIcon sx={{ color: "#31887D" }} />
								</ListItemIcon>
								<ListItemText
									sx={{ color: "#31887D" }}
									primary={singleUser?.email || "N/A"}
								/>
							</ListItem>
							<ListItem sx={{ pt: 0 }}>
								<ListItemIcon>
									<CallIcon sx={{ color: "#31887D" }} />
								</ListItemIcon>
								<ListItemText
									sx={{ color: "#31887D" }}
									primary={singleUser?.contact || "N/A"}
								/>
							</ListItem>
							<ListItem sx={{ pt: 0 }}>
								<ListItemIcon>
									<AddLocationIcon sx={{ color: "#31887D" }} />
								</ListItemIcon>
								<ListItemText
									sx={{ color: "#31887D" }}
									primary={singleUser?.address || "N/A"}
								/>
							</ListItem>
						</List>
					</Card>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						Update Your Profile
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item md={6} xs={12}>
								{singleUser?.userName ? (
									<TextField
										sx={{ width: "100%" }}
										type='text'
										label='User Name'
										value={singleUser?.userName}
										InputLabelProps={{
											shrink: true,
										}}
										{...register("userName")}
									/>
								) : (
									<TextField
										sx={{ width: "100%" }}
										type='text'
										label='User Name'
										InputLabelProps={{
											shrink: true,
										}}
										{...register("userName")}
									/>
								)}
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									type='text'
									label='Your Name'
									value={user?.displayName}
									InputLabelProps={{
										shrink: true,
									}}
									{...register("displayName")}
								/>
							</Grid>

							<Grid item md={12} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									type='email'
									label='Your Email'
									value={user?.email}
									InputLabelProps={{
										shrink: true,
									}}
									{...register("email")}
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									type='number'
									label='Contact'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("contact")}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									sx={{ width: "100%" }}
									type='text'
									label='location'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("address")}
								/>
							</Grid>
							<Grid
								item
								md={12}
								xs={12}
								sx={{ display: "flex", alignItems: "center" }}>
								{user?.photoURL ? (
									<CardMedia
										component='img'
										className='border'
										style={{
											height: "100px",
											width: "100px",
											border: "1px solid black",
										}}
										image={user?.photoURL}
										alt=''
									/>
								) : (
									<CardMedia
										component='img'
										className='border'
										style={{
											height: "100px",
											width: "100px",
											border: "1px solid black",
										}}
										image={singleUser?.photoURL}
										alt=''
									/>
								)}
								<label htmlFor='icon-button-file'>
									<Input
										accept='image/*'
										id='icon-button-file'
										type='file'
										onChange={(e) => setInputImage1(e.target.files[0])}
									/>
									<IconButton
										color='primary'
										aria-label='upload picture'
										component='span'>
										<AttachFileIcon
											fontSize='large'
											sx={{ fontWeight: "bold", color: "#31887D" }}
										/>
									</IconButton>
								</label>
								<Box>
									{!uploading1 ? (
										<>
											{inputImage1 && (
												<>
													<img
														src={URL.createObjectURL(inputImage1)}
														alt=''
														style={{
															height: "100px",
															width: "100px",
															border: "1px solid black",
														}}
													/>
												</>
											)}
										</>
									) : (
										<Box sx={{ my: 2 }}>
											<CircularProgress />
										</Box>
									)}
								</Box>
								<ArrowForwardIcon
									fontSize='large'
									sx={{ fontWeight: "bold", color: "#31887D" }}
								/>
								{inputImage1 && (
									<Button
										onClick={uploadImage1}
										variant='contained'
										component='span'
										sx={{
											mx: 1,
											height: "100px",
											width: "100px",
											border: "1px solid black",
											backgroundColor: "#31887D",
											"&.MuiButtonBase-root:hover": {
												bgcolor: "#31887D",
											},
										}}>
										Upload Image
									</Button>
								)}
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
									Update Profile
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Profile;
