import React, { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import '../assets/styles/registerForm.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    // States:
    // Field 1
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    // Field 2
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    // Field 3
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    // msg
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);

    // To set focus on the first user field
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Validate name field
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);
    
    // Validate password, matchPassword fields
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidName(result);
        const match = (pwd === matchPwd);
        setValidMatch(match);
    }, [pwd, matchPwd]);

    // For error message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    return (
        <section className='center mt-5'>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                {/* Username field */}
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FaCheck />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FaTimes />
                    </span>
                </label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FaInfoCircle />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                {/* Password field */}
                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FaCheck />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FaTimes />
                    </span>
                </label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validName ? "instructions" : "offscreen"}>
                    <FaInfoCircle />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span arial-laber="exclamation mark">!</span>
                </p>
            </form>
        </section>
    )
}

export default Register