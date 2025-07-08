import React, { useState, useEffect } from 'react';

const Career = () => {
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [openedImage, setOpenedImage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const workExperiences = [
        {
            title: "대량의 알림톡 발송으로 인한 서버 과부하 개선",
            role: "백엔드 리드 개발",
            problem: "기존에 Delivery 서버에서 Notify 서버로 알림톡 발송 요청을 하고, 다시 Delivery 서버로 콜백하는 방식으로 운영되고 있었다. N번의 알림톡 발송 요청이 발생하면 Delivery 서버는 N번의 콜백 요청을 즉시 처리했는데, 이로 인해 트래픽 증가와 CPU 사용량이 순간적으로 급증했다.",
            solution: "Delivery 서버에서 콜백을 받아 바로 처리하는 대신, 카프카에 이벤트를 발행하는 방식으로 변경했다. 그러나 이 방법도 CPU 부하가 발생했다. 그래서 카프카 이벤트 발행을 AWS Lambda로 처리하는 방안을 제안하게 되었고, 이것을 시작으로 여러 방법론을 도출하여 해당 이슈를 해결해 보았다.",
            techStack: ["AWS Lambda", "Kafka", "Node.js"],
            achievements: ["CPU 사용량 최적화", "서버 안정성 향상"]
        },
        {
            title: "회사 배송 휴일 시스템 재구축",
            role: "백엔드 리드 개발",
            problem: "배송일 충돌 및 물류 혼선 발생, 여러 개의 휴일 정보 API가 각각 운영되면서 정보 일관성 유지 및 유지보수에 어려움이 있었음",
            solution: "각기 다르게 관리되던 휴일 정보를 하나의 공통 API로 통합하여, 업무 일관성과 효율성을 향상시킴",
            techStack: ["Spring Boot", "MySQL", "API 설계"],
            achievements: ["정보 일관성 확보", "유지보수성 향상"]
        },
        {
            title: "지역별 시공일 시스템 개발",
            role: "백엔드 개발 (회사 내부 전체 배송시공일 담당)",
            problem: "각 부서 간 상이했던 배송일 정보가 상이하여, 배송일 충돌 및 물류 혼선 발생, 운영팀 및 제휴팀 간 커뮤니케이션 비용 증가, 수작업으로 배송일을 수정하거나 조율해야 하는 비효율적인 관리 체계",
            solution: "기존 권역 ID 기반 배송일 관리 체계 → 우편번호 기반 체계로 전면 개편",
            techStack: ["Spring Boot", "MySQL", "Redis"],
            achievements: ["피킹 오류율 91% → 99.5%", "평균 응답시간 2.3초 → 0.8초"],
            troubleShooting: {
                problem: "배송일 정보 수정 시, 네이버·쿠팡 등 외부 고객사에 동기화가 필요하며, 멀티서버 환경에서는 단일 인스턴스에서만 수정 가능하도록 제어가 필요한 상황 발생",
                solution: "수정 이벤트 발생 시, 공통 캐시 DB의 플래그 값을 통해 인스턴스 간 수정 권한을 제어하고, 처리 후 원복하도록 설계"
            }
        },
        {
            title: "기사님 피킹방식 다각화 시스템 개발",
            role: "백엔드 리드 개발",
            problem: "기사 피킹시 실수 및 누락 발생률이 높음, 물류 기사 개인의 숙련도에 따라 피킹 효율 편차가 컸음, 피킹 시간 및 오류 수정으로 인한 물류 처리 지연이 빈번했음",
            solution: "각 물품 단위로 QR 코드 생성 → 모바일 기기로 스캔하여 피킹 확인 처리",
            techStack: ["Spring Boot", "QR Code", "Mobile API"],
            achievements: ["피킹 처리 시간 15~25% 단축", "높은 피드백 만족도"]
        },
        {
            title: "고객 문의게시판 시스템 개발",
            role: "백엔드 리드 개발",
            problem: "배송고객이 직접 하우저에 문의할 수 있는 채널이 전화 밖에 없어서 고객 소통에 한계가 있었음",
            solution: "기존 해피콜 개인화페이지에 배송고객 문의게시판 추가 후 이를 통해 고객문의 접수 가능하도록 개발",
            techStack: ["Spring Boot", "AES 암호화", "OOP 설계"],
            achievements: ["정확한 기록 기반 고객 상담", "상담 효율성 향상"]
        },
        {
            title: "사업 다각화를 위한 최초 B2C 서비스 (조립 서비스) 백엔드 개발",
            role: "백엔드 개발",
            link: "https://assemble.howser.co.kr/",
            problem: "정체한 회사가 새로운 BM으로 서비스를 해야한다는 필요성에 대한 의견이 나옴, IKEA 가구조립 서비스 시장을 노리는 전략이 필요하다는 의견이 있었음",
            solution: "새로운 비즈니스 모델(BM)의 출현에 의의를 두고 있으며, 해당 서비스를 기반으로 투자자 유치 활동을 진행 중인 것으로 파악됨",
            techStack: ["Spring Boot", "B2C 서비스"],
            achievements: ["새로운 BM 개발", "투자자 유치 활동"]
        },
        {
            title: "PR 리뷰 후 머지 방식으로 업무방식 개선",
            role: "팀 문화 개선",
            problem: "각자 맡은 부분만 작성하고 곧바로 머지하는 방식으로 인해 코드 품질이 떨어지는 문제가 있었음, 입사 초기, 팀 내에 협업 문화가 부족하다고 느꼈음",
            solution: "단독 업무가 아닌 경우, 해당 프로젝트에 참여한 팀원들이 리뷰어가 되어 PR 리뷰 후 머지하는 프로세스를 제안하고 적용",
            techStack: ["Git", "Code Review", "Google Style Guide"],
            achievements: ["코드 품질 향상", "협업 효율성 개선", "코드 컨벤션 정립"]
        }
    ];

    const personalProjects = [
        {
            title: "호빵 (샷시 견적 앱)",
            description: "샷시 치수만 입력하면 자동으로 메이저 3사 제품의 견적을 제공하는 창호 견적 앱",
            link: "https://hoppang.store/official?adv_id=24f30636-8195-4de1-87cb-662eb928a011",
            achievements: ["2개월 만에 매출 3000만원 이상", "유저 275명 이상", "견적 350건 이상"],
            techStack: ["Spring Boot", "React", "MySQL", "Redis", "Docker", "AWS"],
            architecture: "/assets/hoppang-architecture.png",
            blogs: [
                { title: "나만의 서비스로 실제 문의에서 매출까지 이어지고 새로운 BM 발굴기", url: "https://ydontustudy.tistory.com/217" },
                { title: "서비스 시작 후 1달차 회고", url: "https://ydontustudy.tistory.com/215" },
                { title: "출시 후 2주차 회고", url: "https://ydontustudy.tistory.com/211" }
            ]
        },
        {
            title: "SKKA (스터디 카페 운영 서비스)",
            description: "F-Lab 개발자 멘토링 교육에서 수행한 프로젝트",
            githubLink: "https://github.com/f-lab-edu/SSKA?tab=readme-ov-file",
            techStack: ["Spring Boot", "MySQL", "H2", "Hibernate", "Flyway", "JUnit5", "NCP", "React"],
            architecture: "/assets/skka-architecture.png",
            achievements: ["네이버 클라우드 플랫폼 공식 블로그 게재"],
            resources: [
                { title: "네이버 클라우드 플랫폼 공식 블로그에 게재되다", url: "https://github.com/f-lab-edu/SSKA/wiki/09.-%F0%9F%93%AE-Good-News" },
                { title: "트러블 슈팅", url: "https://github.com/f-lab-edu/SSKA/wiki/04.-Trouble-Shooting" },
                { title: "인프라 구성기", url: "https://github.com/f-lab-edu/SSKA/wiki/06.-Infrastructure-building" },
                { title: "API 문서", url: "https://taewoongjung.github.io/SKKA_RestDocs.github.io/" }
            ]
        }
    ];

    // @ts-ignore
    const ExperienceCard = ({ experience, index }) => {
        const isHovered = hoveredCard === `work-${index}`;

        return (
            <div
                style={{
                    background: isHovered ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ffffff',
                    padding: isMobile ? '1.5rem' : '2rem',
                    borderRadius: '16px',
                    boxShadow: isHovered ? '0 20px 40px rgba(102, 126, 234, 0.3)' : '0 4px 6px rgba(0,0,0,0.07)',
                    border: isHovered ? 'none' : '1px solid #e2e8f0',
                    marginBottom: '2rem',
                    transition: 'all 0.4s ease',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    cursor: 'pointer',
                    color: isHovered ? '#ffffff' : '#1a202c'
                }}
                // onMouseEnter={() => setHoveredCard(`work-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: isHovered ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        flexShrink: 0
                    }}>
                        🚀
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            color: 'inherit'
                        }}>
                            {experience.title}
                        </h3>
                        <div style={{
                            fontSize: '0.9rem',
                            opacity: isHovered ? 0.9 : 0.7,
                            marginBottom: '1rem'
                        }}>
                            {experience.role}
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.8rem',
                        color: isHovered ? '#e0e7ff' : '#4a5568'
                    }}>
                        문제 인식
                    </h4>
                    <p style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        opacity: isHovered ? 0.9 : 0.8
                    }}>
                        {experience.problem}
                    </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.8rem',
                        color: isHovered ? '#e0e7ff' : '#4a5568'
                    }}>
                        해결 방법
                    </h4>
                    <p style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        opacity: isHovered ? 0.9 : 0.8
                    }}>
                        {experience.solution}
                    </p>
                </div>

                {experience.troubleShooting && (
                    <div style={{
                        background: isHovered ? 'rgba(255,255,255,0.1)' : '#f7fafc',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: isHovered ? '1px solid rgba(255,255,255,0.2)' : '1px solid #e2e8f0'
                    }}>
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginBottom: '0.8rem',
                            color: isHovered ? '#fef5e7' : '#2d3748'
                        }}>
                            🔧 트러블슈팅
                        </h4>
                        <div style={{ marginBottom: '0.8rem' }}>
                            <strong style={{ color: isHovered ? '#fed7aa' : '#e53e3e' }}>문제 상황:</strong>
                            <p style={{
                                fontSize: '0.85rem',
                                lineHeight: '1.5',
                                marginTop: '0.3rem',
                                opacity: isHovered ? 0.9 : 0.8
                            }}>
                                {experience.troubleShooting.problem}
                            </p>
                        </div>
                        <div>
                            <strong style={{ color: isHovered ? '#bbf7d0' : '#38a169' }}>해결 방법:</strong>
                            <p style={{
                                fontSize: '0.85rem',
                                lineHeight: '1.5',
                                marginTop: '0.3rem',
                                opacity: isHovered ? 0.9 : 0.8
                            }}>
                                {experience.troubleShooting.solution}
                            </p>
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '0.8rem'
                        }}>
                            {experience.techStack.map((tech: React.ReactNode, techIndex: string | number | bigint | null | undefined) => (
                                <span
                                    key={techIndex}
                                    style={{
                                        padding: '0.3rem 0.8rem',
                                        background: isHovered ? 'rgba(255,255,255,0.2)' : '#edf2f7',
                                        color: isHovered ? '#ffffff' : '#4a5568',
                                        borderRadius: '16px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {experience.achievements && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                {experience.achievements.map((achievement: React.ReactNode, achIndex: string | number | bigint | null | undefined) => (
                                    <span
                                        key={achIndex}
                                        style={{
                                            padding: '0.3rem 0.8rem',
                                            background: isHovered ? 'rgba(16, 185, 129, 0.3)' : '#d4edda',
                                            color: isHovered ? '#a7f3d0' : '#155724',
                                            borderRadius: '16px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        ✅ {achievement}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {experience.link && (
                        <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: isHovered ? 'rgba(255,255,255,0.2)' : '#667eea',
                                color: isHovered ? '#ffffff' : '#ffffff',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                border: isHovered ? '1px solid rgba(255,255,255,0.4)' : 'none'
                            }}
                        >
                            서비스 보기 →
                        </a>
                    )}
                </div>
            </div>
        );
    };

    return (
        <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
            {/* Header */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: isMobile ? '3rem 1rem' : '4rem 2rem',
                textAlign: 'center',
                position: 'relative'
            }}>
                {/* Close Button */}
                <button
                    onClick={() => {window.location.href = '/me';}}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '1.5rem',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    ×
                </button>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        Portfolio & Career
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        opacity: 0.9,
                        lineHeight: '1.6'
                    }}>
                        한 줄 한 줄 경험으로 다져진 여정입니다<br />
                        실무에서 만난 문제들과 그 해결 과정을 공유합니다
                    </p>
                </div>
            </section>

            {/* Work Experience */}
            <section style={{
                padding: isMobile ? '3rem 1rem' : '4rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    color: '#1a202c'
                }}>
                    💼 실무 경험
                </h2>

                {workExperiences.map((experience, index) => (
                    <ExperienceCard key={index} experience={experience} index={index} />
                ))}
            </section>

            {/* Personal Projects */}
            <section style={{
                padding: isMobile ? '3rem 1rem' : '4rem 2rem',
                background: '#ffffff',
                borderTop: '1px solid #e2e8f0'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        color: '#1a202c'
                    }}>
                        🚀 개인 프로젝트
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
                        gap: '2rem'
                    }}>
                        {personalProjects.map((project, index) => {
                            const isExpanded = index === 0 ? isExpanded1 : isExpanded2;
                            const setExpanded = index === 0 ? setIsExpanded1 : setIsExpanded2;
                            const isHovered = hoveredCard === `project-${index}`;

                            return (
                                <div
                                    key={index}
                                    style={{
                                        background: isExpanded ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : (isHovered ? '#f7fafc' : '#ffffff'),
                                        padding: isMobile ? '1.5rem' : '2rem',
                                        borderRadius: '16px',
                                        boxShadow: isExpanded ? '0 20px 40px rgba(102, 126, 234, 0.3)' : (isHovered ? '0 8px 25px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.07)'),
                                        border: isExpanded ? 'none' : '1px solid #e2e8f0',
                                        transition: 'all 0.4s ease',
                                        transform: isExpanded ? 'scale(1.02)' : (isHovered ? 'translateY(-4px)' : 'translateY(0)'),
                                        color: isExpanded ? '#ffffff' : '#1a202c'
                                    }}
                                    // onMouseEnter={() => setHoveredCard(`project-${index}`)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: isExpanded ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            flexShrink: 0
                                        }}>
                                            {index === 0 ? '🏠' : '📚'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: isMobile ? '1.3rem' : '1.5rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem',
                                                color: 'inherit'
                                            }}>
                                                {project.title}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                opacity: isExpanded ? 0.9 : 0.8,
                                                marginBottom: '1rem'
                                            }}>
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Service Link */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    padding: '0.6rem 1.2rem',
                                                    background: isExpanded ? 'rgba(255,255,255,0.2)' : '#10b981',
                                                    color: '#ffffff',
                                                    borderRadius: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                서비스 링크 →
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    padding: '0.6rem 1.2rem',
                                                    background: isExpanded ? 'rgba(255,255,255,0.2)' : '#374151',
                                                    color: '#ffffff',
                                                    borderRadius: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                GitHub →
                                            </a>
                                        )}
                                    </div>

                                    {/* Achievements */}
                                    {project.achievements && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h4 style={{
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.8rem',
                                                color: isExpanded ? '#e0e7ff' : '#4a5568'
                                            }}>
                                                주요 성과
                                            </h4>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '0.5rem'
                                            }}>
                                                {project.achievements.map((achievement, achIndex) => (
                                                    <span
                                                        key={achIndex}
                                                        style={{
                                                            padding: '0.4rem 0.8rem',
                                                            background: isExpanded ? 'rgba(16, 185, 129, 0.3)' : '#dcfce7',
                                                            color: isExpanded ? '#a7f3d0' : '#166534',
                                                            borderRadius: '16px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        🎯 {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            marginBottom: '0.8rem',
                                            color: isExpanded ? '#e0e7ff' : '#4a5568'
                                        }}>
                                            Tech Stack
                                        </h4>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '0.5rem'
                                        }}>
                                            {project.techStack.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        background: isExpanded ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                                                        color: isExpanded ? '#ffffff' : '#475569',
                                                        borderRadius: '16px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expand Button */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: isExpanded ? '2rem' : '0'
                                    }}>
                                        <button
                                            onClick={() => setExpanded(!isExpanded)}
                                            style={{
                                                padding: '0.8rem 1.5rem',
                                                background: isExpanded ? 'rgba(255,255,255,0.2)' : 'transparent',
                                                color: isExpanded ? '#ffffff' : '#667eea',
                                                border: isExpanded ? '1px solid rgba(255,255,255,0.3)' : '2px solid #667eea',
                                                borderRadius: '25px',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {isExpanded ? '접기' : '자세히 보기'}
                                            <span>{isExpanded ? '▲' : '▼'}</span>
                                        </button>
                                    </div>

                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            padding: '1.5rem',
                                            borderRadius: '12px',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}>
                                            {/* Architecture */}
                                            {project.architecture && (
                                                <div style={{ marginBottom: '2rem' }}>
                                                    <h4 style={{
                                                        fontSize: '1.1rem',
                                                        fontWeight: 'bold',
                                                        marginBottom: '1rem',
                                                        color: '#ffffff'
                                                    }}>
                                                        🏗️ 백엔드 아키텍처
                                                    </h4>
                                                    <div style={{
                                                        background: 'rgba(255, 255, 255, 0.9)',
                                                        borderRadius: '12px',
                                                        padding: '1rem',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <img
                                                            src={project.architecture}
                                                            alt="아키텍처 다이어그램"
                                                            style={{
                                                                width: '100%',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                setIsImageOpen(true);
                                                                setOpenedImage(project.architecture);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Resources */}
                                            {(project.blogs || project.resources) && (
                                                <div>
                                                    <h4 style={{
                                                        fontSize: '1.1rem',
                                                        fontWeight: 'bold',
                                                        marginBottom: '1rem',
                                                        color: '#ffffff'
                                                    }}>
                                                        📚 관련 자료
                                                    </h4>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.8rem'
                                                    }}>
                                                        {(project.blogs || project.resources).map((resource, resIndex) => (
                                                            <a
                                                                key={resIndex}
                                                                href={resource.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: 'block',
                                                                    padding: '1rem',
                                                                    background: 'rgba(255, 255, 255, 0.15)',
                                                                    borderRadius: '8px',
                                                                    textDecoration: 'none',
                                                                    color: '#ffffff',
                                                                    fontWeight: '500',
                                                                    transition: 'all 0.3s ease',
                                                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                                                }}
                                                            >
                                                                {resource.title} →
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {openedImage && isImageOpen && (
                <div
                    onClick={() => setIsImageOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        cursor: 'zoom-out',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        maxWidth: '90%',
                        maxHeight: '90%'
                    }}>
                        <img
                            src={openedImage}
                            alt="아키텍처 확대"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 0 50px rgba(255,255,255,0.1)'
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageOpen(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                color: '#fff',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Footer CTA */}
            <section style={{
                background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                color: '#fff',
                padding: isMobile ? '3rem 1rem' : '4rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>
                        함께 일하고 싶으시다면
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        opacity: 0.9,
                        marginBottom: '2rem',
                        lineHeight: '1.6'
                    }}>
                        새로운 도전과 협업의 기회를 기다리고 있습니다.<br />
                        언제든 연락주세요!
                    </p>
                    <a
                        href="mailto:aipooh8882@naver.com"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#ffffff',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                        }}
                    >
                        📧 aipooh8882@naver.com
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Career;
