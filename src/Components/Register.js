import React, { useState } from 'react'
import { CognitoUserPool, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const Register = () => {

  let history = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [securityAnswer1, setsecurityAnswer1] = useState("");
  const [securityAnswer2, setsecurityAnswer2] = useState("");



  const UserPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_Xd40ya3SL',
    ClientId: '3th9vpb2dqtje2igk5jarqspg7'
  });

  const validuser = (e) => {
    const user = e.target.value;

    setName(user);
    console.log(name)
  }
  const validpassword = (e) => {
    const pas = e.target.value;

    setPassword(pas);
    console.log(password)
  }
  const validphone = (e) => {
    const Number = e.target.value;

    setPhone(Number);
    console.log(phone)
  }
  const validemail = (e) => {
    const mail = e.target.value;

    setEmail(mail);
    console.log(email)
  }

  const validsecurityAnswer1 = (e) =>{
    const securityAnswer1 = e.target.value;
    setsecurityAnswer1(securityAnswer1);
    console.log(securityAnswer1);
  }

  const validsecurityAnswer2 = (e) =>{
    const securityAnswer2 = e.target.value;
    setsecurityAnswer2(securityAnswer2);
    console.log(securityAnswer2);
  }


  const handleSubmit = event => {
    event.preventDefault();


    


    alert("hello")
    let userData = {
      Username: email,
      Pool: UserPool
    };
    console.log("name here" + name)
    console.log("phone" + phone)
    console.log("emil" + email)

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error("error here" + err);
        alert(err)
      }
      console.log(data);
      if (data) {
        let id = uuidv4();
        localStorage.setItem("cust_id", email);
        console.log(email);
        history("/Confirmation?query=" + email)
      }
    });

    console.log("email", email);
    console.log("password", password);

  }
  

  return (
    <div>
      <div className="container">

        <div className='row d-flex justify-content-center'>
          <div className='col-lg-5'>
            <div className='card'>
              <h1>Registration</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className='mt-2'>Username:  </label>
                  <input required id='username' type='text' onChange={validuser} />
                </div>
                <div>
                  <label className='mt-4'>Password:  </label>
                  <input required id='password' type='password' onChange={validpassword} />
                </div>
                <div>
                  <label className='mt-4'>Phone Number:  </label>
                  <input required id='phone_number' type='text' onChange={validphone} />
                </div>
                <div>
                  <label className='mt-4'>Email:  </label>
                  <input required id='email' type='text' onChange={validemail} />
                </div>
                <br></br>
                <br></br>
                
                <button type='submit'>Sign up</button>
              </form>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

