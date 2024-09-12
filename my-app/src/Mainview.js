import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, Modal } from 'antd';
import 'antd/dist/antd.min.css';
import './Mainview.css';

const { Header, Sider, Content } = Layout;

function Mainview() {
    const [boxes, setBoxes] = useState([]);
    const [isMenu1Active, setIsMenu1Active] = useState(false);
    const [isMenu2Active, setIsMenu2Active] = useState(false);
    const [isBoardActive, setIsBoardActive] = useState(false);

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPostIndex, setEditingPostIndex] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const [circleColor, setCircleColor] = useState('red');
    const [intervalId, setIntervalId] = useState(null);

    const handleAddBoxes = () => {
        const newBoxes = [
            <div key="blueBox" className="box" style={{ background: 'blue', color: 'white', padding: '20px', margin: '10px' }} onClick={handleCalculatorToggle}>
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
        setIsCalculatorVisible(true);
    };

    const handleCalculatorToggle = () => {
        setIsCalculatorVisible(!isCalculatorVisible);
    };

    const handleCalculate = () => {
        try {
            const evalResult = eval(inputValue);
            setResult(evalResult);
        } catch (error) {
            setResult('계산 오류');
        }
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
            setPosts([...posts, newPost]);
            setTitle('');
            setContent('');
        }
    };

    const handleEditPost = (index) => {
        setEditingPostIndex(index);
        setTitle(posts[index].title);
        setContent(posts[index].content);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        const updatedPosts = [...posts];
        updatedPosts[editingPostIndex] = { title, content };
        setPosts(updatedPosts);
        setIsModalVisible(false);
        setTitle('');
        setContent('');
        setEditingPostIndex(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setTitle('');
        setContent('');
        setEditingPostIndex(null);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleCircleClick = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        const id = setInterval(() => {
            setCircleColor(getRandomColor());
        }, 5000);
        
        setIntervalId(id);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

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
                            <div
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    background: circleColor,
                                    margin: '20px auto',
                                    cursor: 'pointer'
                                }}
                                onClick={handleCircleClick}
                            >
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
                                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} onClick={() => handleEditPost(index)}>
                                            <h4>{post.title}</h4>
                                            <p>{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isMenu1Active && isCalculatorVisible && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>계산기</h3>
                                <Input
                                    placeholder="수식 입력 (예: 2+2)"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <Button type="primary" onClick={handleCalculate}>계산하기</Button>
                                <div style={{ marginTop: '10px' }}>
                                    <strong>결과: {result}</strong>
                                </div>
                            </div>
                        )}

                        <Modal
                            title="게시글 수정"
                            visible={isModalVisible}
                            onOk={handleModalOk}
                            onCancel={handleModalCancel}
                        >
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
                            />
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Mainview;
