import { getCookie } from "../utils/utils";
// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const updateUser = (user) => ({
	type: UPDATE_USER,
	user,
});
const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const csrfToken = getCookie('CSRF-TOKEN');
	const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/`, {
		headers: {
			"Content-Type": "application/json",
			'X-CSRF-TOKEN': csrfToken
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	// const csrfToken = getCookie('CSRF-TOKEN');
	const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// 'X-CSRF-TOKEN': csrfToken
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {
		method: "POST",
		body: formData,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};
export const updateUserImage = (formData, id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}`, {
		method: "PUT",
		body: formData,
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(updateUser(data));
	} else
		return {
			errors: ["Something went wrong, please try again"],
		};
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_USER:
			return { user: action.user };
		default:
			return state;
	}
}
