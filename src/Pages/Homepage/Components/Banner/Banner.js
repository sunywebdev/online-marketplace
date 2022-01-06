import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "../../../../Photos/slider1.png";
import slider2 from "../../../../Photos/slider2.png";
import slider3 from "../../../../Photos/slider3.png";
import slider4 from "../../../../Photos/slider4.png";
import { Box } from "@mui/system";
import useAuth from "../../../../context/useAuth";
SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
	const { user } = useAuth();
	const [singleUser, setSingleUser] = React.useState();
	React.useEffect(() => {
		fetch(
			`https://intense-brushlands-25667.herokuapp.com/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setSingleUser(data);
			});
	}, [user?.email]);
	return (
		<Container sx={{ minWidth: "100%", py: 3 }}>
			<Grid
				container
				spacing={2}
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Grid item md={3} xs={12}>
					<Box
						elevation={3}
						sx={{
							textAlign: "center",
							p: 2,
							height: "100%",
							border: "1px solid #e4e5e7",
							backgroundColor: "#F1F1F1",
						}}>
						<Typography
							variant='h5'
							gutterBottom
							component='div'
							sx={{ color: "#31887D", fontWeight: "bold" }}>
							Dear {singleUser?.userName},
						</Typography>
						<Typography variant='subtitle1' gutterBottom component='div'>
							The key to your success on Online Marketplace is the brand you
							build for yourself through your Online Marketplace reputation.
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					md={9}
					xs={12}
					sx={{
						"& .swiper-slide img": { height: "222px", width: "100%" },
					}}>
					<Swiper
						pagination={true}
						loop={true}
						autoplay={{ delay: 2000 }}
						className='mySwiper'>
						<SwiperSlide>
							<img src={slider1} alt='' />
						</SwiperSlide>
						<SwiperSlide>
							<img src={slider2} alt='' />
						</SwiperSlide>
						<SwiperSlide>
							<img src={slider3} alt='' />
						</SwiperSlide>
						<SwiperSlide>
							<img src={slider4} alt='' />
						</SwiperSlide>
					</Swiper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Banner;
