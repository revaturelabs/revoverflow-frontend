import React, {useEffect} from 'react'
import { makeStyles, Box, Container, Button, Card, CardHeader, createMuiTheme, ThemeProvider, Icon } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import * as loginRemote from '../../../remotes/login.remote'
import { getUserById } from '../../../remotes/login.remote';

export interface ProfileContainerComponentProps{

}

export const ProfileHeaderComponent: React.FC<ProfileContainerComponentProps> = (props) => {

    const {} = props

   const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));

    // useEffect(()=>{
    //    getUser();
    // })

    // const getUser = async () => {

    //     console.log("inside getUser function")
    //       try {
    //         const response = await loginRemote.getUserById(userId);
    //         console.log(response);
    //         console.log(response.data);
    //       } catch {
    //         alert('Couldnt retrieve points')
    //       }
          
        
    //    };

    return (
        
            <Box mt="2rem" mb="1rem">
             <Card
          className='card-image' id='profile-background'
          style={{
            backgroundColor:
              "rgb(242,105,38)",
            objectFit: "cover"
          }}
        >
          <div className='text-white text-center d-flex justify-content-center rgba-black-strong py-5 px-4'>
            <div>
              <h5 id="profile-header">
              <Icon  className="fa fa-plus-circle" /> UserName
              </h5>
              <h3>
                firstname lastname
                email
                </h3>
             
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

