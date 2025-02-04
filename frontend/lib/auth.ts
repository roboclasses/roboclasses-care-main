export const isAuthenticated = ()=> 
{
    try {
        return !!localStorage.getItem("token")          
    } catch (error) {
        console.log(error);    
    }
}
    
