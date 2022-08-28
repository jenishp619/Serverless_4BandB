import React, { useState } from 'react'
import { CognitoUser, AuthenticationDetails, CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'bootstrap';

export const Login = () => {
  let history = useNavigate();

  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const poolData = {
    UserPoolId: 'us-east-1_Xd40ya3SL',
    ClientId: '3th9vpb2dqtje2igk5jarqspg7'
  };
  const UserPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_Xd40ya3SL',
    ClientId: '3th9vpb2dqtje2igk5jarqspg7'
  });

  const validSubmit = (event) => {

    event.preventDefault();
    localStorage.setItem("cust_id", Email);
    const user = new CognitoUser({
      Username: Email,
      Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password: Password
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {

        console.log("onSuccess:", data);
        if (Email === "meetrpatelank@gmail.com") {
          history('admin/home');
        }
        else {
          history('/securitycheck');
        }
      },

      onFailure: err => {
        console.error("onFailure:", err);
        history('/register');
        alert(err)
      },

      newPasswordRequired: data => {
        console.log("newPasswordRequired:", data);
      }
    });
  }
  const validPassword = (e) => {
    const pas = e.target.value;

    setPassword(pas);
    console.log(Password)
  }
  const validEmail = (e) => {
    const mail = e.target.value;

    setEmail(mail);
    console.log(Email)
  }
  return (


    <>
      <div className="container">

        <div className='row d-flex justify-content-center'>
          <div className='col-lg-5'>
            <div className='card'>
              <div>
                <label className='mt-2'>Email :  </label>
                <input required type='text' onChange={validEmail} />

              </div>
              <br></br>
              <div>
                <label className='mt-2'>Password :  </label>
                <input required type='password' onChange={validPassword} />
                <br>
                </br>
              </div>
              <br>
              </br>
              <button type='submit' onClick={validSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
