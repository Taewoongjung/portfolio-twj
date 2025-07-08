import React, { useState, useEffect } from 'react';

const Main = () => {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const techStack = [
        { name: 'Spring Boot', color: '#6DB33F' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'Redis', color: '#DC382D' },
        { name: 'Docker', color: '#2496ED' },
        { name: 'AWS', color: '#FF9900' },
    ];

    const achievements = [
        { number: '2+', label: '년 실무 경험' },
        { number: '5600만원', label: '개인 서비스 매출' },
        { number: '455+', label: '서비스 유저' },
        { number: '99.5%', label: '개선된 정확도' },
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#fff' }}>
            {/* Hero Section */}
            <section
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, #fff 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, #fff 2px, transparent 2px)
                    `,
                    backgroundSize: '60px 60px'
                }} />

                <div style={{
                    textAlign: 'center',
                    zIndex: 2,
                    maxWidth: '900px',
                    padding: '0 20px'
                }}>
                    <div style={{
                        fontSize: '1.2rem',
                        marginBottom: '1rem',
                        opacity: 0.9,
                        letterSpacing: '0.5px'
                    }}>
                        안녕하세요!
                    </div>

                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, #fff, #e0e7ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        정태웅입니다
                    </h1>

                    <div style={{
                        fontSize: '1.5rem',
                        marginBottom: '2rem',
                        opacity: 0.95,
                        lineHeight: '1.4'
                    }}>
                        Backend Developer · Problem Solver · Innovator
                    </div>

                    <div style={{
                        fontSize: '1.1rem',
                        marginBottom: '3rem',
                        opacity: 0.9,
                        lineHeight: '1.6'
                    }}>
                        단순히 코드를 짜는 개발자가 아닌, <br />
                        <strong>문제를 해결하는 제품 개발자</strong>입니다
                    </div>

                    {/* Achievements */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: window.innerWidth < 768 ? '1rem' : '2rem',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem auto'
                    }}>
                        {achievements.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: 'center',
                                    padding: window.innerWidth < 768 ? '0.8rem 0.5rem' : '1rem',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <div style={{
                                    fontSize: window.innerWidth < 768 ? '1.4rem' : '1.8rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}>
                                    {item.number}
                                </div>
                                <div style={{
                                    fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                                    opacity: 0.9,
                                    lineHeight: '1.3'
                                }}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{
                            fontSize: '1rem',
                            marginBottom: '1rem',
                            opacity: 0.8
                        }}>
                            Tech Stack
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: window.innerWidth < 768 ? '0.7rem' : '1rem'
                        }}>
                            {techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    style={{
                                        padding: window.innerWidth < 768 ? '0.4rem 0.8rem' : '0.5rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '20px',
                                        fontSize: window.innerWidth < 768 ? '0.8rem' : '0.9rem',
                                        fontWeight: '500',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    {/*<div style={{*/}
                    {/*    display: 'flex',*/}
                    {/*    gap: '1rem',*/}
                    {/*    justifyContent: 'center',*/}
                    {/*    flexWrap: 'wrap'*/}
                    {/*}}>*/}
                    {/*    <button*/}
                    {/*        style={{*/}
                    {/*            padding: '1rem 2rem',*/}
                    {/*            background: '#fff',*/}
                    {/*            color: '#667eea',*/}
                    {/*            border: 'none',*/}
                    {/*            borderRadius: '50px',*/}
                    {/*            fontSize: '1rem',*/}
                    {/*            fontWeight: 'bold',*/}
                    {/*            cursor: 'pointer',*/}
                    {/*            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',*/}
                    {/*            transition: 'all 0.3s ease'*/}
                    {/*        }}*/}
                    {/*        onMouseOver={e => {*/}
                    {/*            const target = e.currentTarget as HTMLElement;*/}
                    {/*            target.style.transform = 'translateY(-2px)';*/}
                    {/*            target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';*/}
                    {/*        }}*/}
                    {/*        onMouseOut={e => {*/}
                    {/*            const target = e.currentTarget as HTMLElement;*/}
                    {/*            target.style.transform = 'translateY(0)';*/}
                    {/*            target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';*/}
                    {/*        }}*/}
                    {/*        onClick={() => window.location.href = '/career'}*/}
                    {/*    >*/}
                    {/*        프로젝트 보기 →*/}
                    {/*    </button>*/}

                    {/*    <button*/}
                    {/*        style={{*/}
                    {/*            padding: '1rem 2rem',*/}
                    {/*            background: 'transparent',*/}
                    {/*            color: '#fff',*/}
                    {/*            border: '2px solid rgba(255,255,255,0.5)',*/}
                    {/*            borderRadius: '50px',*/}
                    {/*            fontSize: '1rem',*/}
                    {/*            fontWeight: 'bold',*/}
                    {/*            cursor: 'pointer',*/}
                    {/*            transition: 'all 0.3s ease'*/}
                    {/*        }}*/}
                    {/*        onMouseOver={e => {*/}
                    {/*            const target = e.currentTarget as HTMLElement;*/}
                    {/*            target.style.background = 'rgba(255,255,255,0.1)';*/}
                    {/*            target.style.borderColor = '#fff';*/}
                    {/*        }}*/}
                    {/*        onMouseOut={e => {*/}
                    {/*            const target = e.currentTarget as HTMLElement;*/}
                    {/*            target.style.background = 'transparent';*/}
                    {/*            target.style.borderColor = 'rgba(255,255,255,0.5)';*/}
                    {/*        }}*/}
                    {/*        onClick={() => window.location.href = 'mailto:aipooh8882@naver.com'}*/}
                    {/*    >*/}
                    {/*        📧 연락하기*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'bounce 2s infinite'
                }}>
                    <div style={{
                        width: '2px',
                        height: '30px',
                        background: 'rgba(255,255,255,0.6)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        fontSize: '0.8rem',
                        marginTop: '0.5rem',
                        opacity: 0.7
                    }}>
                        Scroll
                    </div>
                </div>
            </section>

            {/* About Section - 간결하게 */}
            <section style={{
                padding: isMobile ? '3rem 1rem' : '5rem 2rem',
                background: '#f8fafc',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        marginBottom: '2rem',
                        color: '#1e293b'
                    }}>
                        About Me
                    </h2>

                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        lineHeight: '1.8',
                        color: '#475569',
                        marginBottom: '3rem'
                    }}>
                        실제 사용자와 시장을 고려한 실용적 개발을 추구합니다.<br />
                        개인 서비스 개발부터 대규모 시스템 최적화까지,<br />
                        <strong>비즈니스 임팩트를 만드는 개발자</strong>입니다.
                    </p>

                    {/* Quick Timeline */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: isMobile ? '1.5rem' : '2rem',
                        marginTop: '3rem'
                    }}>
                        {[
                            { year: '2022', event: '겜퍼 인턴 시작' },
                            { year: '2023', event: '하우저 백엔드팀 입사' },
                            { year: '2024', event: '"호빵" 서비스 론칭' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: isMobile ? '1.2rem' : '1.5rem',
                                    background: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <div style={{
                                    fontSize: isMobile ? '1.3rem' : '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#667eea',
                                    marginBottom: '0.5rem'
                                }}>
                                    {item.year}
                                </div>
                                <div style={{
                                    color: '#64748b',
                                    fontSize: isMobile ? '0.9rem' : '1rem'
                                }}>
                                    {item.event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Career Preview - 기존 코드 유지하되 스타일 개선 */}
            <section
                style={{
                    padding: isMobile ? '3rem 1rem' : '5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: hovered ? '#e0f7fa' : '#ffffff',
                    transition: 'all 0.3s ease',
                    transform: hovered ? 'scale(1.02)' : 'scale(1)',
                    cursor: 'pointer',
                    borderTop: '1px solid #e2e8f0'
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                }}
                onClick={() => {
                    window.location.href = '/career';
                }}
            >
                <div style={{ maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        color: hovered ? '#00796b' : '#1e293b',
                        transition: 'color 0.3s ease',
                        marginBottom: '1rem'
                    }}>
                        Portfolio & Career
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        color: '#64748b',
                        marginBottom: '2rem'
                    }}>
                        한 줄 한 줄 경험으로 다져진 여정을 확인해보세요
                    </p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        color: hovered ? '#00796b' : '#667eea',
                        fontWeight: 'bold'
                    }}>
                        자세히 보기
                        <span style={{ fontSize: '1.2rem' }}>→</span>
                    </div>
                </div>
            </section>

            <style>
                {`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateX(-50%) translateY(0);
                        }
                        40% {
                            transform: translateX(-50%) translateY(-10px);
                        }
                        60% {
                            transform: translateX(-50%) translateY(-5px);
                        }
                    }
                `}
            </style>
    </main>
    );
};

export default Main;
