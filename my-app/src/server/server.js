const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',  // 데이터베이스 호스트를 올바르게 설정합니다.
    user: 'zz0080',  // 데이터베이스 사용자명
    password: 'tkdalsdl135?',  // 데이터베이스 비밀번호
    database: 'test'  // 사용할 데이터베이스 이름
});

app.use(cors());
app.use(express.json());

app.post('/api/message', (req, res) => {
    const { message } = req.body;
    console.log(message); // "하이" 출력
    res.json({ status: '메시지 수신 완료' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 연결 시도
connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err.stack);
        return;
    }
    console.log('데이터베이스에 연결됨:', connection.threadId);
});

// 쿼리 예제
connection.query('SELECT * FROM  test', (error, results) => {
    if (error) throw error;
    console.log('결과:', results);
});

// 연결 종료
// connection.end();  // 서버가 계속 실행되는 동안 연결 종료를 주석 처리합니다.
