import { create } from 'zustand';

export const useLogin = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (flag) => {
        set({ isLoggedIn: flag })
    },
    getUser: async (wixClient) => {
        try {

            const response = await wixClient.members.getCurrentMember()
            return response

        } catch (error) {
            console.log(error);
        }
    }
}))