import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './Mainpage.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './actions';
import { Calendar, Modal } from 'antd';

function Mainpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', { email, password });
    };

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement());
    };

    const handleReset = () => {
        dispatch(reset());
    };

    const fetchEvent = () => {
        fetch('http://localhost:5000/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: '하이' }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }
            return response.json();
        })
        .then(data => {
            console.log('성공:', data);
        })
        .catch((error) => {
            console.error('실패:', error);
        });
    };

    const onDateClick = (date) => {
        const formattedDate = date.format('YYYY년 MM월 DD일'); // 날짜 포맷
        Modal.info({
            title: '선택한 날짜',
            content: (
                <div>
                    <p>{formattedDate}를 선택했습니다.</p>
                </div>
            ),
            onOk() {},
        });
    };

    return (
        <div className="container">     
            <div className="item" onClick={handleIncrement}>아이템 1 (증가): {count}</div>
            <div className="item" onClick={handleDecrement}>아이템 2 (감소): {count}</div>
            <div className="item" onClick={handleReset}>아이템 3 (초기화): {count}</div>

            <div className="login-container">
                <h2>로그인</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ padding: '20px' }}>
                        <Calendar 
                            onPanelChange={onPanelChange} 
                            onSelect={onDateClick} // 날짜 클릭 시 호출되는 함수 
                            style={{ width: '300px', height: '300px' }} // 사이즈 조절
                        />
                    </div>

                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Mainpage;
