import {
	Container,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
	return (
		<>
			<Divider />
			<Container sx={{ pt: 3 }}>
				<Grid container spacing={2}>
					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							sx={{ pl: 2, fontWeight: "bold" }}>
							Categories
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Graphics & Design' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Digital Marketing' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Writing & Translation' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Video & Animation' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Music & Audio' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Programming & Tech' />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							sx={{ pl: 2, fontWeight: "bold" }}>
							About
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Careers' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Press & News' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Partnerships' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Privacy Policy' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Terms of Service' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Intellectual Property Claims' />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							sx={{ pl: 2, fontWeight: "bold" }}>
							Support
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Help & Support' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Trust & Safety' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Selling on Marketplace' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Buying on Marketplace' />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							sx={{ pl: 2, fontWeight: "bold" }}>
							More From Marketplace
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Marketplace Pro' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Marketplace Studios' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Marketplace Logo Maker' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Marketplace Guides' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Marketplace Workspace' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Working Not Working' />
							</ListItemButton>
						</List>
					</Grid>
				</Grid>
			</Container>
			<Divider />
			<Typography
				variant='subtitle'
				gutterBottom
				component='div'
				sx={{ textAlign: "center", py: 2 }}>
				&copy; All Rights Reserved By SUNY
			</Typography>
		</>
	);
};

export default Footer;
