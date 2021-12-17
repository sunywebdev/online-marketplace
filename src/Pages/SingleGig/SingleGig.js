import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Container, Grid, Rating } from "@mui/material";
import SwiperCore, { Pagination, Navigation } from "swiper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../context/useAuth";
import Swal from "sweetalert2";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

SwiperCore.use([Pagination, Navigation]);

const SingleGig = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [gig, setGig] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://${process.env.REACT_APP_SERVER_API}/gigs/${id}`)
			.then((res) => res.json())
			.then((data) => setGig(data));
	}, [id]);
	const [singleUser, setSingleUser] = React.useState();
	React.useEffect(() => {
		fetch(
			`https://${process.env.REACT_APP_SERVER_API}/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setSingleUser(data);
			});
	}, [user?.email]);
	const orderNow = () => {
		const orderInfo = {
			orderedBy: singleUser?.userName,
			postedBy: gig?.postedBy,
			gigTitle: gig?.gigTitle,
			daysNeeded: gig?.daysNeeded,
			gigPrice: gig?.gigPrice,
			orderStatus: "Active",
			orderId: `${Math.random().toString(36).substring(2, 7)}`,
		};
		axios
			.post(`https://${process.env.REACT_APP_SERVER_API}/orders`, orderInfo)
			.then(function (response) {
				Swal.fire("Success!", "New Order Placed Successfully.", "success");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<>
			<NavBar />
			<Container sx={{ my: 4 }}>
				<Grid
					container
					spacing={2}
					sx={{
						display: "flex",
						flexDirection: "row",
					}}>
					<Grid item md={11} xs={12}>
						<Typography
							gutterBottom
							variant='h4'
							component='div'
							sx={{ fontWeight: 600, textAlign: "left", color: "#31887D" }}>
							{gig?.gigTitle}
						</Typography>
						<Grid
							container
							spacing={2}
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Grid
								item
								md={3}
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Avatar
									sx={{ bgcolor: "red", mx: 0.5 }}
									aria-label='recipe'
									src={gig?.sellerPhoto}>
									R
								</Avatar>
								<Typography
									gutterBottom
									variant='body1'
									component='div'
									sx={{ fontWeight: 600, textAlign: "left", mx: 0.5 }}>
									{gig?.postedBy}
								</Typography>
								<Typography
									gutterBottom
									variant='body2'
									component='div'
									sx={{ fontWeight: 600, textAlign: "left", mx: 0.5 }}>
									New Seller
								</Typography>
							</Grid>
							<Grid
								md={3}
								xs={12}
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									pt: 1,
									ml: { md: -2, xs: 3 },
								}}>
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
									<Box sx={{ mx: 0.5 }}>
										<Typography
											variant='body'
											sx={{ fontWeight: "bold", color: "#FCC84F" }}>
											5
										</Typography>
									</Box>
									<Box sx={{ mx: 0.5 }}>
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
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						md={7}
						xs={12}
						sx={{
							"& .swiper-slide img": { height: "100%", width: "100%" },
						}}>
						<Swiper
							pagination={{
								type: "fraction",
							}}
							navigation={true}
							loop={true}
							className='mySwiper'>
							<SwiperSlide>
								<img src={gig?.gigPhoto1} alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src={gig?.gigPhoto2} alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src={gig?.gigPhoto3} alt='' />
							</SwiperSlide>
							<SwiperSlide>
								<img src={gig?.gigPhoto4} alt='' />
							</SwiperSlide>
						</Swiper>
					</Grid>
					<Grid item md={5} xs={12}>
						<Typography
							gutterBottom
							variant='h4'
							component='div'
							sx={{ fontWeight: 600, textAlign: "left", color: "#31887D" }}>
							About This Gig
						</Typography>
						<Typography
							gutterBottom
							variant='body2'
							component='div'
							sx={{ textAlign: "left" }}>
							{gig?.gigDescription}
						</Typography>
						<List>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<CalendarTodayIcon />
									</ListItemIcon>
									<ListItemIcon>
										<ListItemText
											sx={{ color: "black" }}
											primary='Days Needed : &nbsp;'
										/>
									</ListItemIcon>
									<ListItemText primary={gig?.daysNeeded} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<AttachMoneyIcon />
									</ListItemIcon>
									<ListItemIcon>
										<ListItemText
											sx={{ color: "black" }}
											primary='Total Cost : &nbsp; $'
										/>
									</ListItemIcon>
									<ListItemText primary={gig?.gigPrice} />
								</ListItemButton>
							</ListItem>
						</List>
						{singleUser?.userName ? (
							<Button
								variant='contained'
								sx={{
									mt: 1,
									width: "100%",
									backgroundColor: "#31887D",
									"&.MuiButtonBase-root:hover": {
										bgcolor: "#31887D",
									},
								}}
								onClick={orderNow}>
								Continue Order
							</Button>
						) : (
							<Link to='/dashboard' style={{ textDecoration: "none" }}>
								<Button
									variant='contained'
									sx={{
										mt: 1,
										width: "100%",
										backgroundColor: "#31887D",
										"&.MuiButtonBase-root:hover": {
											bgcolor: "#31887D",
										},
									}}>
									Complete Profile Before Continue Order
								</Button>
							</Link>
						)}
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
};

export default SingleGig;
