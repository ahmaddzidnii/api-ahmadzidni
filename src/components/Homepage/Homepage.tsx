import axios from "axios"
import {useEffect, useState} from 'react'

interface UserData {
    name:string,
    email:string
}

interface HomePageProps {
    datas : UserData[]
}

const Homepage:React.FC<HomePageProps> = ({datas}) => {
//     const [datas, setDatas] = useState<UserData[]>([]);


// const getData =async () => {
//    try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//     console.log(response.data)
//     setDatas(response.data)
//    } catch (error) {
//     console.log(error)
//    }
// }
// useEffect(()=>{
//     getData();
// },[])

  return (
    <div  className="min-vh-100">
        {datas && datas.map((d , index) => {
            return (
                <div key={index}>
                    <p>{d.name} - {d.email}</p>
                    <p></p>
                </div>
            )
        })}
    </div>
  )
}

export default Homepage
