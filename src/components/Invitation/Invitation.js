import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../Layout';
import QRCode from 'qrcode.react';

function Invitation() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [user, setUser] = useState();
  const [invitationLink, setInvitationLink] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const getUser = async () => {
    const { id } = auth.user;
    const token = auth.token;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res && res.data) {
        setUser(res.data);
        generateInvitationLink(res.data.referralCode);
      } else {
        toast.error('Failed to retrieve user profile');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const generateInvitationLink = (referralCode) => {
    const link = `${window.location.origin}/register?referral=${referralCode}`;
    setInvitationLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    setIsLinkCopied(true);
    toast.success('Invitation link copied to clipboard!');

    // Revert the button text after 2 seconds
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout title={'Invite - Hype Drinks'}>
      <ToastContainer />
      <div className="sm:w-2/5 mx-auto p-4 h-[745px] bg-gradient-to-b from-green-400 to-blue-400 text-white">
        <div className="flex justify-between">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <img src={"/images/back.png"} alt="back arrow" className="w-10 h-10" />
          </div>
          <div>Invitation</div>
          <div className="font-bold w-9"></div>
        </div>
        <div className="flex flex-col justify-center items-center text-lg">
          <div>Your Invitation Code</div>
          <div className="font-bold">{user?.referralCode}</div>
        </div>
        <div className="mt-4">
          <div>Dear Members, the following is your Invitation Link</div>
          <div className="flex flex-col justify-center items-center mt-2">
            <div className="w-4/5 border p-2 rounded-lg border-white">
              {invitationLink}
            </div>
            <div className="w-4/5">
              <button
                className={`rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 w-full mt-4 ${isLinkCopied ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={copyToClipboard}
                disabled={isLinkCopied}
              >
                {isLinkCopied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {invitationLink && (
            <div className="h-40 w-40 p-2">
              <QRCode value={invitationLink} size={160} />
            </div>
          )}
        </div>
        <div className="mt-4">
          If you are A, then B, C, and D belong to your team members. The teams provide you with three levels of commission.
        </div>
        <div className="mt-4 flex gap-6">
          <p>B = 10%</p>
          <p>C = 5%</p>
          <p>D = 2%</p>
          <p>E = 1%</p>
          <p>F = 1%</p>
        </div>
      </div>
    </Layout>
  );
}

export default Invitation;
