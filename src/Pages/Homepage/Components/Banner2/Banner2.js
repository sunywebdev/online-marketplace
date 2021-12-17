import React from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import slider5 from "../../../../Photos/slider5.png";
import slider6 from "../../../../Photos/slider6.png";
import slider7 from "../../../../Photos/slider7.png";
import slider8 from "../../../../Photos/slider8.png";
import { Box, Container } from "@mui/material";
SwiperCore.use([Autoplay, Pagination]);

const Banner2 = () => {
	return (
		<Container sx={{ minWidth: "100%", py: 3 }}>
			<Box
				sx={{
					"& .swiper-slide img": { height: "230px", width: "100%" },
				}}>
				<Swiper
					pagination={true}
					loop={true}
					autoplay={{ delay: 2000 }}
					className='mySwiper'>
					<SwiperSlide>
						<img src={slider5} alt='' />
					</SwiperSlide>
					<SwiperSlide>
						<img src={slider6} alt='' />
					</SwiperSlide>
					<SwiperSlide>
						<img src={slider7} alt='' />
					</SwiperSlide>
					<SwiperSlide>
						<img src={slider8} alt='' />
					</SwiperSlide>
				</Swiper>
			</Box>
		</Container>
	);
};

export default Banner2;
