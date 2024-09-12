import React, { useEffect, useRef, useState } from 'react';

function MainSubPage() {
    const [messages, setMessages] = useState([]);  // 메시지 배열 상태
    const [input, setInput] = useState('');         // 입력 상태
    const messagesEndRef = useRef(null);            // 메시지 끝을 가리키기 위한 ref

    const handleSend = (e) => {
        e.preventDefault();  // 기본 폼 제출 동작 방지
        if (input.trim() !== '') {
            const userMessage = input;
            setMessages((prevMessages) => [...prevMessages, userMessage]); // 사용자 메시지 추가
            setInput('');  // 입력 필드 초기화
            
            // AI 응답 추가
            const aiResponse = getAIResponse(userMessage);
            setMessages((prevMessages) => [...prevMessages, aiResponse]); // AI 응답 추가

            scrollToBottom();  // 메시지 끝으로 스크롤
        }
    };

    const getAIResponse = (userMessage) => {
        // 여기서 AI 응답 로직을 정의합니다. 예를 들어 단순한 정적 응답.
        if (userMessage.toLowerCase().includes('안녕하세요')) {
            return '안녕하세요! 무엇을 도와드릴까요?';
        } else if (userMessage.toLowerCase().includes('잘 지내세요?')) {
            return '네, 잘 지내고 있습니다! 당신은요?';
        } else {
            return '죄송하지만, 그에 대한 답변을 찾을 수 없습니다.';
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #ccc' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        {msg}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* 메시지 끝을 위한 ref */}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} // 입력 변경 시 상태 업데이트
                    placeholder="메시지를 입력하세요"
                    style={{ flex: 1, padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>전송</button>
            </form>
        </div>
    );
}

export default MainSubPage;
