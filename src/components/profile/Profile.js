import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ProfileImg from './ProfileImg'
import ProDetails from './ProDetails'
import { get } from '../../services/api'
import { AGECNY_INFO, ADMIN_INFO } from '../../config/url'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Profile = () => {
  let token; let url;

  const authRole = localStorage.getItem("authRole");
  if (authRole === '1') {
    token = localStorage.getItem("token");
    url = AGECNY_INFO;
  } else if (authRole === '2') {
    token = localStorage.getItem("token");
    url = ADMIN_INFO;
  } else if (authRole === '0') {
    token = localStorage.getItem("applicantToken");
  }

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const completeURL = `${url}?token=${token}`;
    get(completeURL, setData, setIsLoading)
  }, []);

  useEffect(() => {
    if (data?.saved) {
      console.log(data, ">>>>>>>>>>>>>>>>>");
    } else if (data?.errorCode === 404 || data?.status === 404) {
      toast.error("User not found");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else if (data?.status === 400) {
      toast.error("Invalid Token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  }, [data]);

  
  return (
    <Container className='pt-4'>
      <div className="panel mt-4">
        <div className="panel_center-sec">
          <ProfileImg fname={data?.info?.name} lname={data?.info?.l_name} imgURL={data?.info?.selfie_pic} token={token} />
          <ProDetails info={data?.info} token={token} />
        </div>
      </div>
    </Container>
  )
}

export default Profile