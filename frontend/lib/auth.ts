// export const isAuthenticated = () => {
//   try {
//     if (typeof window === "undefined") return false; // Prevent SSR errors
//     return !!localStorage.getItem("token");
//   } catch (error) {
//     console.log(error);
//   }
// };


export const isAuthenticated = () => !!localStorage.getItem("token")
