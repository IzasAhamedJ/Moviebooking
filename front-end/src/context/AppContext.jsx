import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppProvider = ({ children }) => {


    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favouriteMovie, setFavouriteMovie] = useState([])
    

    const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();




    const fetchIsAdmin = async () => {
        try {
            const token = await getToken();
            console.log('token',token)
            const { data } = await axios.get('/api/admin/isAdmin', {headers: {Authorization: `Bearer ${await getToken()}`}});
            console.log('admin',data,token)

            setIsAdmin(data.isAdmin);

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('You are Not Authorized to access admin dashboard')
            }


        } catch (error) {
            toast.error(error)
        }
    }

    const fetchShows=async()=>{
        try {
             const {data}=await axios.get('/api/shows/allShow');

             if(data.success){
                setShows(data.shows)
             }
             else{
                toast.error(data.message)
             }
        } catch (error) {
              toast.error(error)
        }
    }

const fetchFavMovie = async () => {
  if (!user) return;

  try {
    const token = await getToken();
    const { data } = await axios.get('/api/user/getFavourites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success) {
      setFavouriteMovie(data.favouriteMovies);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to fetch favourite movies");
    console.error(error);
  }
};


    useEffect(() => {
        if (user) {
            console.log('fetch',user)
            fetchFavMovie();
        }
    }, [user])

    useEffect(() => {
        if (user) {
            console.log('fruser',user)
            fetchIsAdmin();
            

        }
    }, [user])



    useEffect(()=>{
        fetchShows();
    },[]);


    const value = {
        axios,
        fetchIsAdmin,
        fetchFavMovie,

        user,
        getToken,
        navigate,
        
        isAdmin,
        shows,
        favouriteMovie,
        image_base_url

    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)