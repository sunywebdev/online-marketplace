import React from "react";
import {
	Container,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

const Categories = () => {
	return (
		<Container sx={{ minWidth: "100%", pb: 3 }}>
			<Divider />
			<List sx={{ display: "flex", py: 0 }}>
				<Grid container spacing={0}>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Graphics & Design' />
						</ListItemButton>
					</Grid>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Digital Marketing' />
						</ListItemButton>
					</Grid>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Writing & Translation' />
						</ListItemButton>
					</Grid>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Video & Animation' />
						</ListItemButton>
					</Grid>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Music & Audio' />
						</ListItemButton>
					</Grid>
					<Grid item md={2} xs={6}>
						<ListItemButton>
							<ListItemText primary='Programming & Tech' />
						</ListItemButton>
					</Grid>
				</Grid>
			</List>
			<Divider />
		</Container>
	);
};

export default Categories;
