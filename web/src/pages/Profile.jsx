import { useSelector } from "react-redux";
import NewsKeywordsManagement from "../component/profile/keywordsManagement";
import CryptoSelection from "../component/profile/cryptosManagement";
import ArticleNumberButton from "../component/ArticleNumberButton";
import { useState, useEffect } from "react";
import requests from "../api/Requests";
import axios from "axios";

function UserCryptoManagement({userData}) {    
    return (
        <div className="h-full w-full flex flex-col items-center pt-5">
            <p className="text-gray-100 text-2xl font-bold mb-5">Your cryptos</p>
            <CryptoSelection profile={true} userData={userData}/>
        </div>
    )
}

export default function Profile({}) {
    const userData = useSelector((state) => state.userReducer);
    const [count, setCount] = useState(undefined)

    useEffect(() => {
        if (userData._id) {
            const request = requests.GetConfigCount
            .replace('{id}', userData._id)
            axios.get(request)
            .then((response) => {
                setCount(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [userData])

    const onSaveNumber = () => {
        const request = requests.UpdateConfigCount
        .replace('{id}', userData._id)
        axios.post(request, { 
            configCount: count,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div className="min-h-screen w-full relative flex items-center justify-center z-20">
            <div className="bg-[#3A3A3A] h-[650px] w-[1200px] z-20 rounded-lg shadow-2xl drop-shadow-xl p-[25px] flex flex-col justify-center">
                <div className="bg-[#2E2E2E] w-full h-[110px] rounded-xl flex justify-between p-2">
                    <div className="flex items-center">
                        <img src="./men.png" className="w-[100px] h-[100px] mr-2"></img>
                        <div>
                            <p className="text-gray-200 text-2xl font-bold mb-1">{userData.username}</p>
                            <p className="text-[#868686] text-xl font-bold">{userData.email}</p>
                        </div>
                    </div>
                    <svg className="m-3 hover:scale-105 hover:cursor-pointer" width="35px" height="35px" stroke-width="2.0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="red"><path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#C65151" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div className="w-full h-full flex justify-center p-2">
                    <UserCryptoManagement userData={userData}/>
                    <div className="w-[2px] bg-[#525252] h-[70%]"></div>
                    <NewsKeywordsManagement user={userData}/>
                    <div className="w-[2px] bg-[#525252] h-[70%]"></div>
                    <div className="flex flex-col items-center p-5 bg-[#3A3A3A] rounded-xl ml-10">
                        <h1 className="text-gray-300 text-3xl mb-10">Configuration</h1>
                        <div className="w-full px-5">
                            <div className="flex flex-col justify-between items-center">
                                <p className="text-xl text-gray-300 mb-3">News to display</p>
                               {count && <ArticleNumberButton onChange={(number) => setCount(number)} count={count}/>}
                            </div>
                            <button className="h-fit bg-[#686868] hover:opacity-50 mt-5 text-white font-bold w-full px-10 py-2 rounded-lg"
                                onClick={() => onSaveNumber()}>Save</button>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full h-full z-10 flex justify-end">
                <img src="./illu2.png" className="w-[900px] opacity-20 h-[800px]"/>
            </div>
        </div>
    )
}