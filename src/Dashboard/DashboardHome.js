import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../context/useAuth";
import { CardMedia } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const drawerWidth = 222;

function DashboardHome(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { user, logOut } = useAuth();
	const [singleUser, setSingleUser] = React.useState();
	React.useEffect(() => {
		fetch(
			`https://${process.env.REACT_APP_SERVER_API}/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setSingleUser(data);
			});
	}, [user?.email, user?.photoURL]);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const drawer = (
		<div>
			{user?.photoURL ? (
				<CardMedia
					component='img'
					sx={{ minHeight: "180px" }}
					image={user?.photoURL}
					alt=''
				/>
			) : (
				<CardMedia
					component='img'
					sx={{ minHeight: "180px" }}
					image={singleUser?.photoURL}
					alt=''
				/>
			)}
			<Typography
				variant='h5'
				display='block'
				gutterBottom
				sx={{
					backgroundColor: "#31887D",
					color: "white",
					textAlign: "center",
				}}>
				{singleUser?.userName || "UserName N/A"}
			</Typography>

			<List>
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
						color: "#31887D",
					}}
					to='/dashboard'>
					<ListItem button>
						<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary={"Profile"} />
					</ListItem>
				</Link>
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
						color: "#31887D",
					}}
					to='addgig'>
					<ListItem button>
						<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
							<AddBoxIcon />
						</ListItemIcon>
						<ListItemText primary={"Add New Gig"} />
					</ListItem>
				</Link>
				{singleUser?.userRole === "Admin" && (
					<>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
								color: "#31887D",
							}}
							to='gigs'>
							<ListItem button>
								<ListItemIcon
									sx={{ justifyContent: "center", color: "#31887D" }}>
									<Inventory2Icon />
								</ListItemIcon>
								<ListItemText primary={"All Gigs"} />
							</ListItem>
						</Link>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
								color: "#31887D",
							}}
							to='pagerols'>
							<ListItem button>
								<ListItemIcon
									sx={{ justifyContent: "center", color: "#31887D" }}>
									<AdminPanelSettingsIcon />
								</ListItemIcon>
								<ListItemText primary={"Change Roles"} />
							</ListItem>
						</Link>
					</>
				)}
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
						color: "#31887D",
					}}
					to='mygigs'>
					<ListItem button>
						<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
							<Inventory2Icon />
						</ListItemIcon>
						<ListItemText primary={"My Gigs"} />
					</ListItem>
				</Link>
				{singleUser?.userRole === "Admin" && (
					<Link
						style={{
							textDecoration: "none",
							fontWeight: "bold",
							fontSize: "15px",
							color: "#31887D",
						}}
						to='orders'>
						<ListItem button>
							<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
								<ShoppingCartIcon />
							</ListItemIcon>
							<ListItemText primary={"All Orders"} />
						</ListItem>
					</Link>
				)}
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
						color: "#31887D",
					}}
					to='clientorders'>
					<ListItem button>
						<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
							<ShoppingCartIcon />
						</ListItemIcon>
						<ListItemText primary={"Client Orders"} />
					</ListItem>
				</Link>
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
						color: "#31887D",
					}}
					to='myorders'>
					<ListItem button>
						<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
							<ShoppingCartIcon />
						</ListItemIcon>
						<ListItemText primary={"My Orders"} />
					</ListItem>
				</Link>

				<ListItem button onClick={logOut} sx={{ color: "#31887D" }}>
					<ListItemIcon sx={{ justifyContent: "center", color: "#31887D" }}>
						<Logout />
					</ListItemIcon>
					<ListItemText primary={"LogOut"} />
				</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "#31887D",
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						ADMIN DASHBOARD
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				<Outlet></Outlet>
			</Box>
		</Box>
	);
}

DashboardHome.propTypes = {
	window: PropTypes.func,
};

export default DashboardHome;
