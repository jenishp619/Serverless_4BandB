import React, { useState } from 'react'
import { CognitoUserPool, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Login } from './Login';

export const Confirmation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let history = useNavigate();
    console.log("searchParams.query: ", searchParams.get("query"))
    let email = searchParams.get('query')
    const poolData = {
        UserPoolId: 'us-east-1_Xd40ya3SL',
        ClientId: '3th9vpb2dqtje2igk5jarqspg7'
    };


    const [code, setcode] = useState("");
    const validcode = (e) => {
        const code = e.target.value;

        setcode(code);
        console.log(code)
    }
    const validsubmit = () => {
        console.log();
        const UserPool = new CognitoUserPool({
            UserPoolId: 'us-east-1_Xd40ya3SL',
            ClientId: '3th9vpb2dqtje2igk5jarqspg7'
        });
        var userData = {
            Username: email,
            Pool: UserPool
        };

        var validateUser = new CognitoUser(userData)
        validateUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                console.log("hello herr " + err);
                return;
            }
            console.log('call result: ' + result);
            if (result) {
                history('/caesarregister')
            }
        })
    }
    var cust_id = localStorage.getItem("cust_id");
    console.log(cust_id);

    return cust_id === null ? <Login /> :
        (


            <>
                <div className="container">

                    <div className='row d-flex justify-content-center'>
                        <div className='col-lg-5'>
                            <div className='card'>
                                <div>
                                    <label className='mt-2'>Conformation code :  </label>
                                    <input required type='text' onChange={validcode} />
                                    <button onClick={validsubmit}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}
