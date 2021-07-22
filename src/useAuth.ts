import createGlobalHook from './createGlobalHook';

export type User = {
	username: string;
	firstName: string;
	token: string;
};

export type AuthStore = {
	loggedIn: boolean;
	user?: User;
};

const useAuth = createGlobalHook<AuthStore>({
	storeName: 'authStore',
	initialData: {
		loggedIn: false
	},
	actions: {
		logout: async () => {
			return {
				loggedIn: false,
				user: undefined
			};
		},
		login: async (user: User) => {
			console.log('login', user);
			return {
				loggedIn: true,
				user: user
			};
		}
	}
});
export default useAuth;
