import PageContainer from "../containers/PageContainer";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LandingPage from "./LandingPage";
import RegistrySelectionPage from './RegistrySelectionPage';
import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {setAuthToken} from "../reducers/appSlice";
import RegistryPage from "./RegistryPage";
import PublicPageContainer from "../containers/PublicPageContainer";


interface HomePageProps {
}


const HomePage:React.FC<HomePageProps> = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch()

    Auth.currentSession().then((session: CognitoUserSession) => {
        setLoggedIn(true)
        let token = session.getIdToken().getJwtToken()
        dispatch(setAuthToken(token))
    }).catch((err)=> {

    })

    return (
        <>
            {loggedIn && (
                <PublicPageContainer>
                    <RegistrySelectionPage />
                </PublicPageContainer>

            )}
            {!loggedIn && (
                <PublicPageContainer>
                    <LandingPage />
                </PublicPageContainer>
            )}
        </>
    )
}

export default HomePage