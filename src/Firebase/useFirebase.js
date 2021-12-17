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

initializeAuth();

const useFirebase = () => {
	const [user, setUser] = useState({});
	const [error, setError] = useState("");
	const [isLoading, setIsloading] = useState(true);
	const [admin, setAdmin] = useState(false);
	const [token, setToken] = useState("");
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	const signInUsingGoogle = (navigate, location, setOpen) => {
		setIsloading(true);
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const user = result?.user;
				saveOrReplaceUserToDb(
					user?.email,
					user?.displayName,
					setOpen,
					navigate,
					location,
				);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
			})
			.finally(() => setIsloading(false));
	};
	const resetPassword = (
		auth,
		email,
		setState,
		setSuccess,
		data,
		navigate,
		location,
		setOpen,
	) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				const successMsg = "Please Check Your Email Inbox";
				setState(data);
				setSuccess(successMsg);
				setOpen(true);
				setTimeout(function () {
					const destination = location?.state?.from || "/login";
					navigate(destination);
				}, 4000);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
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
				setUser(res.user);
				updateProfile(auth.currentUser, {
					displayName: displayName,
				});
				saveUserToDb(email, displayName, navigate, location);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
			})
			.finally(() => setIsloading(false));
	};

	const signInWithEmailPassword = (
		auth,
		email,
		password,
		navigate,
		location,
		setOpen,
	) => {
		setIsloading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setOpen(true);
				setTimeout(function () {
					const destination = location?.state?.from || "/";
					navigate(destination);
				}, 4000);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setError(errorMessage);
			})
			.finally(() => setIsloading(false));
	};

	const saveUserToDb = (email, displayName, navigate, location) => {
		const user = { email, displayName };
		axios
			.post("http://localhost:5000/users", user)
			.then(function (response) {
				setTimeout(function () {
					const destination = location?.state?.from || "/";
					navigate(destination);
				}, 4000);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const saveOrReplaceUserToDb = (
		email,
		displayName,
		navigate,
		location,
	) => {
		const user = { email, displayName };
		axios
			.put("http://localhost:5000/users", user)
			.then(function (response) {
				setTimeout(function () {
					const destination = location?.state?.from || "/";
					navigate(destination);
				}, 4000);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	/*------ to findout user is admin or not---------- */
	useEffect(() => {
		fetch(`http://localhost:5000/users/${user?.email}`)
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
