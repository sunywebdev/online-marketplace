import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../../../context/useAuth";

export default function NavBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { user, logOut } = useAuth();
	console.log(user);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ backgroundColor: "#31887D" }}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link to='/' style={{ textDecoration: "none", color: "white" }}>
							Online Marketplace
						</Link>
					</Typography>
					{user?.email && (
						<>
							<Avatar onClick={handleClick} alt='' src={user?.photoURL} />
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
										mt: 1.5,
										"& .MuiAvatar-root": {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform: "translateY(-50%) rotate(45deg)",
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: "right", vertical: "top" }}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
								<Link to='/dashboard' style={{ textDecoration: "none" }}>
									<MenuItem>
										<Avatar /> Dashboard
									</MenuItem>
								</Link>
								<MenuItem onClick={logOut}>
									<ListItemIcon>
										<Logout fontSize='small' />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</>
					)}
					{!user?.email && (
						<Link
							to='/login'
							style={{ textDecoration: "none", color: "white" }}>
							<Button color='inherit'>Login</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
