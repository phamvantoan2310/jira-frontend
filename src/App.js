import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';



function App() {

  // useEffect(()=>{
  //   fetchapi();
  // },[])

  // console.log("process.env.REACT_API_BACKEND", process.env.REACT_APP_API_KEY)

  // const fetchapi = async() =>{
  //   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/user/getalluser`); 
  //   return res.data;
  // }

  // // Queries
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchapi })
  // console.log(query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route path={route.path} element={
                <route.page />
              } key={route.path}></Route>
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
