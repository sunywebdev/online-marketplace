import { useEffect, useState } from "react";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	sendPasswordResetEmail,
	getIdToken,
} from "firebase/auth";
import initializeAuth from "./firebase.init";
import axios from "axios";
import Swal from "sweetalert2";

initializeAuth();

const useFirebase = () => {
	const [user, setUser] = useState({});
	const [error, setError] = useState("");
	const [isLoading, setIsloading] = useState(true);
	const [admin, setAdmin] = useState(false);
	const [token, setToken] = useState("");
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	const signInUsingGoogle = (navigate, location) => {
		setIsloading(true);
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const user = result?.user;
				Swal.fire("Success!", "SignIn Successful.", "success");
				saveOrReplaceUserToDb(
					user?.email,
					user?.displayName,
					navigate,
					location,
				);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
				Swal.fire("Error!", `${errorMessage}`, "error");
			})
			.finally(() => setIsloading(false));
	};
	const resetPassword = (auth, email, navigate, location) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				Swal.fire(
					"Success!",
					"Password Reset Successful. Check Email inbox and follow the steps.",
					"success",
				);
				const destination = location?.state?.from || "/login";
				navigate(destination);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
				Swal.fire("Error!", `${errorMessage}`, "error");
			})
			.finally(() => setIsloading(false));
	};

	const createNewUserUsingEmailPassword = (
		auth,
		email,
		password,
		displayName,
		navigate,
		location,
	) => {
		setIsloading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				Swal.fire("Success!", "New User Created Successfully.", "success");
				setUser(res.user);
				updateProfile(auth.currentUser, {
					displayName: displayName,
				});
				saveUserToDb(email, displayName, navigate, location);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
				Swal.fire("Error!", `${errorMessage}`, "error");
			})
			.finally(() => setIsloading(false));
	};

	const signInWithEmailPassword = (
		auth,
		email,
		password,
		navigate,
		location,
	) => {
		setIsloading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				Swal.fire("Success!", "SignIn Successful.", "success");
				const destination = location?.state?.from || "/";
				navigate(destination);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
				Swal.fire("Error!", `${errorMessage}`, "error");
			})
			.finally(() => setIsloading(false));
	};

	const saveUserToDb = (email, displayName, navigate, location) => {
		const user = { email, displayName };
		axios
			.post(`https://intense-brushlands-25667.herokuapp.com/users`, user)
			.then(function (response) {
				const destination = location?.state?.from || "/";
				navigate(destination);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const saveOrReplaceUserToDb = (email, displayName, navigate, location) => {
		const user = { email, displayName };
		axios
			.put(`https://intense-brushlands-25667.herokuapp.com/users`, user)
			.then(function (response) {
				const destination = location?.state?.from || "/";
				navigate(destination);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	/*------ to findout user is admin or not---------- */
	useEffect(() => {
		fetch(`https://intense-brushlands-25667.herokuapp.com/users/${user?.email}`)
			.then((res) => res.json())
			.then((data) => setAdmin(data?.admin));
	}, [user?.email]);

	const logOut = () => {
		setIsloading(true);
		signOut(auth)
			.then(() => {
				setUser({});
			})
			.catch((error) => {})
			.finally(() => setIsloading(false));
	};
	useEffect(() => {
		const unSubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setError("");
				getIdToken(user).then((idToken) => setToken(idToken));
			} else {
				setUser({});
			}
			setIsloading(false);
		});
		return () => unSubscribed;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		auth,
		user,
		error,
		signInUsingGoogle,
		createNewUserUsingEmailPassword,
		signInWithEmailPassword,
		logOut,
		isLoading,
		resetPassword,
		admin,
		token,
	};
};

export default useFirebase;
