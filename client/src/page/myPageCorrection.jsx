import React, { useState, useRef, useEffect, useCallback } from 'react';
import style from './myPageCorrection.module.css'
import axios from 'axios';

const MyPageCorrection = ({ userinfoEditHandler, history }) => {
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordcheck, setPasswordCheck] = useState("");
    const [message, setMessage] = useState(false);
    const [img, setImg] = useState("");

    //토큰 확인 후 정보 가져오기
    // const userInfoHandler = async () => {
    //     const accessToken = localStorage.getItem('token'); //웹스토리지에 토큰을 저장
    //     await axios
    //         .get(`${process.env.REACT_APP_SERVER_URL}/users/mypage`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true
    //         })
    //         .then((res) => {
    //             const { email, nickName } = res.data.data.userInfo; //데이터 불러오는 것은 server 확인 필요
    //             setEmail(email), setNickName(nickName);
    //         })
    //         .catch((err) => console.log(err));
    // }

    //회원 정보 업데이트
    const handleSignUp = () => {
        if (password === passwordcheck) {
            const userinfo = { nickName, password, img };
            axios
                .post(`${process.env.REACT_APP_SERVER_URL}/users/mypage`,
                    userinfo,
                    { withCredentials: true })
                .then((res) => {
                    if (res.message === "이미 존재하는 닉네임입니다.") {
                        alert("중복된 닉네임이 있습니다.");
                    } else if (res.message === "회원정보가 수정되었습니다") {
                        alert("회원정보가 수정되었습니다");
                        axios
                            .patch(`${process.env.REACT_APP_SERVER_URL}/users/update`,
                                { nickName: nickName.value, password: password.value },
                                { withCredentials: true })
                            .then((res) => {
                                history.push("/MyPage");
                            })
                            .catch((err) => { console.log(err) })
                    }
                })
        }
    }

    // 프로필 사진 업로드를 위한 구현
    const fileInput = useRef();
    //버튼 클릭 설정
    const onButtonClick = (e) => {
        e.preventDefault();
        fileInput.current.click();
    }
    //업로드 사진 보내기
    const onFileChange = (e) => {
        console.log(e.target.files[0]); // 사진을 가져오는 것 확인
        // if (e.target.files) {
        //     const uploadFile = e.target.files[0]
        //     console.log(uploadFile)
        // const formData = new FormData()
        // formData.append('files', uploadFile)

        // await axios({
        //     method: 'post',
        //     url: '/api/files/images',
        //     data: formData,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        // }
    }


    const onChangenickName = (e) => {
        setNickName(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
        setMessage(e.target.value !== password);
    };

    //이메일 유효성 검사
    const checkPassword = (upw) => {
        if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
            setMessage(
                "비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."
            );
            return false;
        }
        var chk_num = upw.search(/[0-9]/g);
        var chk_eng = upw.search(/[a-z]/gi);
        if (chk_num < 0 || chk_eng < 0) {
            setMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
            return false;
        } else return true;
    };

    const handleClick = useCallback(() => {
        if (nickName === "") {
            setMessage("닉네임을 입력해주세요.");
            return;
        }
        if (password === "") {
            setMessage("비밀번호를 입력해주세요.");
        } else if (checkPassword(password)) {
            if (passwordcheck === "") {
                setMessage("비밀번호가 일치하지 않습니다.");
                return;
            } else if (password === passwordcheck) {
                setMessage("");
                setNickName("");
                setPassword("");
            } else {
                setMessage("비밀번호를 정확하게 입력해주세요.");
                setPasswordCheck("");
                return;
            }
        }
        if (checkPassword(password)) {
            handleSignUp(password, nickName);
            return;
        }
    }, [nickName, password, passwordcheck, message, img]);

    // 회원 정보를 가져오기 위해
    // useEffect(() => {
    //     userInfoHandler();
    // }, [])

    return (
        <div className={style.modalContainer}>
            <div className={style.modalBox}>
                <div className={style.imgBox}>
                    <input
                        className={style.imgFile}
                        type="file"
                        accept='image/*'
                        onChange={onFileChange}
                        ref={fileInput}
                    />
                </div>
                <div>
                    <button
                        className={style.imgBtn}
                        onClick={onButtonClick}
                    >변경</button>
                </div>
                <div className={style.textBox}>
                    <div className={style.box}>
                        <p className={style.p}>이메일</p>
                        <p className={style.p}>{email}</p>
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>닉네임</p>
                        <input
                            className={style.input}
                            type='text'
                            value={nickName}
                            onChange={onChangenickName}
                        />
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>비밀번호</p>
                        <input
                            className={style.input}
                            type='password'
                            onChange={onChangePassword}
                            value={password}
                        />
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>비밀번호 확인</p>
                        <input
                            className={style.input}
                            type='password'
                            onChange={onChangePasswordCheck}
                            value={passwordcheck}
                        />
                    </div>
                </div>
                <button
                    className={style.correctBtn}
                    onClick={() => handleClick()}
                >수정 완료</button>
                <button
                    className={style.backBtn}
                    onClick={userinfoEditHandler}
                >돌아가기</button>
                <span className={style.message}>{message}</span>
            </div>
        </div>
    );
};

export default MyPageCorrection;