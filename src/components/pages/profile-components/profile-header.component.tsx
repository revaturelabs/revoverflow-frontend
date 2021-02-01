import React, {useEffect, useState} from 'react'
import { Box, Card, Icon } from '@material-ui/core';
import * as loginRemote from '../../../remotes/login.remote'


export interface ProfileContainerComponentProps{

}

export const ProfileHeaderComponent: React.FC<ProfileContainerComponentProps> = (props) => {

  const {} = props

   const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
   const splitURL = window.location.href.split("/");
   const urlUserId = parseInt(splitURL[splitURL.length - 1]);

   const [user, setUser] = useState({
     firstName: "",
     lastName: "",
     email: ""
   });

    useEffect(()=>{
       getUser();
    },[])

    const getUser = async () => {
        
        try {
          let response;
          if(userId == urlUserId) 
              response = await loginRemote.getProfileById(userId);
          else
              response = await loginRemote.getProfileById(urlUserId);
            setUser(response.data);
          } catch {
            alert('Couldnt retrieve points')
          }
          
          
       };

    return (
        
      <Box mt="2rem" mb="1rem">
        <Card
          className='card-image' id='profile-background'
          style={{
          backgroundColor:
            "rgb(242,105,38)",
          objectFit: "cover"}}>
          <div className='text-white text-center d-flex justify-content-center rgba-black-strong py-5 px-4'>
            <div>
              <h5 id="profile-header">
                <Icon  className="fa fa-plus-circle" />
              </h5>
              <h3 style={{color: "white"}}>
                {user.firstName} {user.lastName}
              </h3>
              <h2 style={{color: "white"}}>
                {user.email}
              </h2>
             
              <div className="row justify-content-center">
              <img
                  src="{profileImg}"
                  alt=""
                  className="rounded-circle avatar-img z-depth-1-half"
                  id="post-prof-img"    
              />
              </div>
            </div> 
          </div>
        </Card>
      </Box> 
        
          
    )
}

