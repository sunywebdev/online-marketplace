import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import AddGig from "./Dashboard/AddGig/AddGig";
import AllGigs from "./Dashboard/AllGigs/AllGigs";
import AllOrders from "./Dashboard/AllOrders/AllOrders";
import ClientOrders from "./Dashboard/ClientOrders/ClientOrders";
import DashboardHome from "./Dashboard/DashboardHome";
import EditGig from "./Dashboard/EditGig/EditGig";
import MyGigs from "./Dashboard/MyGigs/MyGigs";
import MyOrders from "./Dashboard/MyOrders/MyOrders";
import PageRols from "./Dashboard/PageRols/PageRols";
import Profile from "./Dashboard/Profile/Profile";
import Homepage from "./Pages/Homepage/Homepage";
import SignIn from "./Pages/Login/Login";
import ResetPass from "./Pages/ResetPass/ResetPass";
import SignUp from "./Pages/SignUp/SignUp";
import SingleGig from "./Pages/SingleGig/SingleGig";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route exact path='/' element={<Homepage />} />
						<Route
							path='/gigs/:id'
							element={
								<PrivateRoute>
									<SingleGig />
								</PrivateRoute>
							}
						/>
						<Route path='/login' element={<SignIn />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/resetpass' element={<ResetPass />} />
						<Route
							exact
							path='/dashboard'
							element={
								<PrivateRoute>
									<DashboardHome />
								</PrivateRoute>
							}>
							<Route path='/dashboard' element={<Profile />} />
							<Route path='/dashboard/addgig' element={<AddGig />} />
							<Route path='/dashboard/editgig/:id' element={<EditGig />} />
							<Route path='/dashboard/gigs' element={<AllGigs />} />
							<Route path='/dashboard/mygigs' element={<MyGigs />} />
							<Route path='/dashboard/orders' element={<AllOrders />} />
							<Route path='/dashboard/pagerols' element={<PageRols />} />
							<Route
								path='/dashboard/clientorders'
								element={<ClientOrders />}
							/>
							<Route path='/dashboard/myorders' element={<MyOrders />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
