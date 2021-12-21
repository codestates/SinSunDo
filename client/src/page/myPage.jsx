import React, { useState, useEffect } from 'react';
import style from './myPage.module.css';
import Toggle from '../components/toggle';
import WithdrawModal from '../components/withdrawModal';
import MyPageCorrection from './myPageCorrection';

const MyPage = () => {
    //accessToken을 props로 받는 것으로 가정한 코드
    const [img, setImg] = useState("");
    const [nickName, setNickName] = useState("");
    const [isWithdrawModal, setIsWithdrawModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    // const userInfoHandler = async (accessToken) => {
    //     await axios
    //         .get(`${process.env.REACT_APP_SERVER_URL}/users/mypage`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true
    //         })
    //         .then((res) => {
    //             const { img, nickName } = res.data.data.userInfo; //데이터 불러오는 것은 server 확인 필요
    //             setImg(img), setNickName(nickName);
    //         })
    //         .catch((err) => console.log(err));
    // }

    const withModalHandler = () => {
        setIsWithdrawModal(!isWithdrawModal);
    };

    const userinfoEditHandler = () => {
        setIsEditModal(!isEditModal);
    }

    // 회원 정보를 가져오기 위해
    // useEffect(() => {
    //     userInfoHandler();
    // }, [])


    return (
        <>
            <div className={style.container} >
                <div className={style.box}>
                    <img className={style.img} src={'/avocado.png'} alt="ProfilePic" />
                    <p className={style.nickname}>닉네임</p>
                    <button
                        className={style.settingBtn}
                        onClick={userinfoEditHandler}
                    >회원정보 수정</button>
                    <hr className={style.underline} />
                    <p className={style.toggleText}>유통기한 알림 설정</p>
                    <Toggle />
                    {isEditModal ?
                        <MyPageCorrection userinfoEditHandler={userinfoEditHandler} /> : null
                    }
                </div>
                <button
                    className={style.leaveBtn}
                    onClick={withModalHandler}
                >회원탈퇴</button>
                {isWithdrawModal ?
                    <WithdrawModal withModalHandler={withModalHandler} /> : null}
            </div >
        </>
    );
};

export default MyPage;