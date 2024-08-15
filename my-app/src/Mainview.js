import { Layout, Menu } from 'antd'; // Layout과 Menu 컴포넌트 임포트
import 'antd/dist/antd.min.css';
import React, { useState } from 'react'; // useState 임포트
import { Provider } from 'react-redux';
import store from './store';
import './Mainview.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './actions';

const { Header, Sider, Content } = Layout; // Layout 컴포넌트의 하위 컴포넌트 구조 분해 할당

function Mainview() {
    const [boxes, setBoxes] = useState([]); // 박스를 저장할 상태
    const [isMenu1Active, setIsMenu1Active] = useState(false); // 메뉴 1 활성화 상태

    const handleAddBoxes = () => {
        // 파란색 박스와 회색 박스 3개 추가
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
        setIsMenu1Active(true); // 메뉴 1이 활성화 되었음을 설정
    };

    return (
        <Layout style={{ minHeight: '100vh' }}> {/* 전체 높이를 설정 */}
            <Header style={{ background: '#fff', padding: 0 }}>
                <div className="logo">My App</div>
                {/* 여기서 로고나 제목을 추가할 수 있습니다. */}
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
                        <Menu.Item key="2" onClick={() => setIsMenu1Active(false)}>왼쪽 메뉴 2</Menu.Item>
                        <Menu.Item key="3" onClick={() => setIsMenu1Active(false)}>왼쪽 메뉴 3</Menu.Item>
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
                        {/* 메인 콘텐츠 영역 */}
                        <h2>메인 콘텐츠</h2>
                        <p>여기에 메인 콘텐츠를 추가하세요.</p>
                        
                        {/* 박스들이 여기에 추가됩니다 */}
                        {isMenu1Active && (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {boxes}
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Mainview;
