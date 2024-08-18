import { Layout, Menu, Input, Button } from 'antd'; // Input과 Button 추가 임포트
import 'antd/dist/antd.min.css';
import React, { useState } from 'react'; 
import { Provider } from 'react-redux';
import store from './store';
import './Mainview.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './actions';

const { Header, Sider, Content } = Layout;

function Mainview() {
    const [boxes, setBoxes] = useState([]);
    const [isMenu1Active, setIsMenu1Active] = useState(false);
    const [isMenu2Active, setIsMenu2Active] = useState(false);
    const [isBoardActive, setIsBoardActive] = useState(false);
    
    // 게시판 상태 추가
    const [posts, setPosts] = useState([]); // 게시글 목록
    const [title, setTitle] = useState(''); // 게시글 제목
    const [content, setContent] = useState(''); // 게시글 내용

    const handleAddBoxes = () => {
        const newBoxes = [
            <div key="blueBox" className="box" style={{ background: 'blue', color: 'white', padding: '20px', margin: '10px' }}>
                파란색 박스
            </div>
        ];

        for (let i = 0; i < 3; i++) {
            newBoxes.push(
                <div key={`grayBox${i}`} className="box" style={{ background: 'gray', color: 'white', padding: '20px', margin: '10px' }}>
                    회색 박스 {i + 1}
                </div>
            );
        }

        setBoxes(newBoxes);
        setIsMenu1Active(true);
        setIsMenu2Active(false);
        setIsBoardActive(false);
    };

    const handleShowCircle = () => {
        setIsMenu1Active(false);
        setIsMenu2Active(true);
        setIsBoardActive(false);
    };

    const handleShowBoard = () => {
        setIsMenu1Active(false);
        setIsMenu2Active(false);
        setIsBoardActive(true);
    };

    const handlePostSubmit = () => {
        if (title && content) {
            const newPost = { title, content };
            setPosts([...posts, newPost]); // 새 게시글 추가
            
            // 입력 필드 초기화
            setTitle('');
            setContent('');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <div className="logo">My App</div>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">홈</Menu.Item>
                    <Menu.Item key="2">설정</Menu.Item>
                    <Menu.Item key="3">정보</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                        <Menu.Item key="1" onClick={handleAddBoxes}>왼쪽 메뉴 1</Menu.Item>
                        <Menu.Item key="2" onClick={handleShowCircle}>왼쪽 메뉴 2</Menu.Item>
                        <Menu.Item key="3" onClick={handleShowBoard}>왼쪽 메뉴 3</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                        }}
                    >
                        <h2>메인 콘텐츠</h2>
                        <p>여기에 메인 콘텐츠를 추가하세요.</p>
                        
                        {isMenu1Active && (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {boxes}
                            </div>
                        )}
                        
                        {isMenu2Active && (
                            <div style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: 'red',
                                margin: '20px auto'
                            }}>
                            </div>
                        )}

                        {isBoardActive && (
                            <div>
                                <h3>게시판</h3>
                                <div>
                                    <Input
                                        placeholder="제목"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Input.TextArea
                                        placeholder="내용"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Button type="primary" onClick={handlePostSubmit}>게시글 작성</Button>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    {posts.map((post, index) => (
                                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                            <h4>{post.title}</h4>
                                            <p>{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Mainview;
