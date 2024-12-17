import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { API_HOST } from '../../config/config';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(() => localStorage.getItem('phone') || '');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(() => localStorage.getItem('isOtpSent') === 'true');
  const [isVerified, setIsVerified] = useState(() => localStorage.getItem('isVerified') === 'true');
  const [error, setError] = useState('');
  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(() => parseInt(localStorage.getItem('timer')) || 60);
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    let interval;
    if (timer > 0 && isOtpSent) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
    } else {
      setResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  useEffect(() => {
    localStorage.setItem('isOtpSent', isOtpSent ? 'true' : 'false');
    localStorage.setItem('isVerified', isVerified ? 'true' : 'false');
    localStorage.setItem('phone', phone);
    if (isOtpSent && !isVerified) {
      let rOtp = getOTPFromDevice();
      if (rOtp) {
        const otpArray = rOtp.split('');
        otpArray.forEach((digit, index) => {
          document.getElementById(`otp-${index}`).value = digit;
        });
      }
    }
  }, [isOtpSent, isVerified, phone]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      window.location.reload(); // Force page reload after login
    }
  }, [isAuthenticated, navigate]);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${API_HOST}/sendotp`, { phone });
      if (response.status === 200) {
        setIsOtpSent(true);
        setTimer(60);
        setError('');
        if (response.data?.otp) {
          alert(`Your OTP is : ${response.data.otp}`);
        }
        if (response.data.isNewUser) {
          setIsNewUser(true);
        }
      } else {
        setIsOtpSent(false);
        setError(response.data.message || 'Error sending OTP');
      }
    } catch (error) {
      setIsOtpSent(false);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      const payload = {
        phone,
        otp,
        ...(isNewUser && { name, email })
      };

      const response = await axios.post(`${API_HOST}/verifyotp`, payload);

      if (response.data.success) {
        const token = response.data.token;
        const newUrl = `/?token=${encodeURIComponent(token)}`;
        
        setIsVerified(true);
        setIsAuthenticated(true);
        localStorage.setItem('isVerified', 'true');
        localStorage.setItem('token', token);
        navigate(newUrl);
        window.location.reload();
      } else {
        localStorage.setItem('isVerified', 'false');
        setError('Invalid OTP');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = otp.split('');
      newOtp[index] = value;
      setOtp(newOtp.join(''));

      if (value !== '' && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const getOTPFromDevice = () => {
    return '';
  }

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
            {!isOtpSent && (
              <>
                <div className="text-start px-4">
                  <h5 className="mb-1 text-white">Phone Verification</h5>
                  <p className="mb-4 text-white">We will send you an OTP on this phone number.</p>
                </div>
                <div className="otp-form mt-5 mx-4">
                  <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} className='mb-4'>
                    <div className="mb-4 d-flex">
                      <select className="form-select" aria-label="Default select example">
                        <option value="">+91</option>
                      </select>
                      <input
                        className="form-control ps-0"
                        id="phone_number"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {error && <span id="errmsg">{error}</span>}
                    <button className="btn btn-warning btn-lg w-100" type="submit">Send OTP</button>
                  </form>
                  <span>OR</span>
                  <button onClick={() => navigate('/')} className="btn btn-secondary btn-lg w-100">Continue Browsing</button>
                </div>
                <div className="login-meta-data px-4">
                  <p className="mt-3 mb-0">
                    By providing my phone number, I hereby agree the
                    <a className="mx-1" href="/terms-conditions">Term of Services</a>
                    and
                    <a className="mx-1" href="/privacy-policy">Privacy Policy.</a>
                  </p>
                </div>
              </>
            )}

            {isOtpSent && !isVerified && (
              <>
                <div className="text-start px-4">
                  <h5 className="mb-1 text-white">Verify Phone Number</h5>
                  <p className="mb-4 text-white">Enter the OTP code sent to <strong className="ms-1">{phone}</strong></p>
                </div>
                <div className="otp-verify-form mt-5 px-4">
                  <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
                    <div className="d-flex justify-content-between mb-5">
                      {[...Array(4)].map((_, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          className="form-control"
                          type="number"
                          maxLength="1"
                          value={otp[index] || ''}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          autoComplete="one-time-code"
                          placeholder="-"
                        />
                      ))}
                    </div>

                    {isNewUser && (
                      <>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="neu-data"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="neu-data"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                          />
                        </div>
                      </>
                    )}

                    <button className="btn btn-warning btn-lg w-100" type="submit">Verify & Proceed</button>
                  </form>
                </div>
                <div className="login-meta-data px-4">
                  <p className="mt-3 mb-0">
                    Didn't receive the OTP?
                    {resendOtp ? (
                      <span className="otp-sec ms-1 text-white" onClick={sendOtp}>Resend OTP</span>
                    ) : (
                      <span className="otp-sec ms-1 text-white">Resend in {timer} seconds</span>
                    )}
                  </p>
                </div>
              </>
            )}

            {isOtpSent && isVerified && (
              <div className="text-start px-4">
                <h5 className="mb-1 text-white">Login Successful</h5>
                <p className="mb-4 text-white">You have successfully logged in.</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
