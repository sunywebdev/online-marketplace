import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "../../../../Photos/slider1.png";
import slider2 from "../../../../Photos/slider2.png";
import slider3 from "../../../../Photos/slider3.png";
import slider4 from "../../../../Photos/slider4.png";
import { Box } from "@mui/system";
SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
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
							Dear SUNY,
						</Typography>
						<Typography variant='h6' gutterBottom component='div'>
							Get offers from sellers for your project
						</Typography>
						<Button
							variant='contained'
							sx={{
								mt: 2,
								backgroundColor: "#31887D",
								"&.MuiButtonBase-root:hover": {
									bgcolor: "#31887D",
								},
							}}>
							Post A Request
						</Button>
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
