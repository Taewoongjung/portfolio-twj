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
            techStack: ["AWS Lambda", "SQS", "Kafka", "MongoDB", "Node.js"],
            achievements: ["CPU 사용량 70% 감소", "서버 안정성 향상", "처리량 3배 증가"],
            troubleShootings: [
                {
                    title: "Lambda Reserved Concurrency 기반 알림 처리 안정화",
                    problem: "AWS Lambda 기반 알림 처리 시스템에서 Region 단위 동시 실행 제한(1,000개)으로 인한 문제가 발생했다. 트래픽 급증 시 중요한 알림 처리 Lambda가 다른 비중요 함수들과 동시 실행 한도를 공유하면서 실행 지연 및 실패가 발생했고, 이로 인해 고객에게 중요한 알림(결제 완료, 배송 알림 등)이 누락되는 서비스 신뢰도 저하 문제가 발생했다.",
                    solution: "알림 처리 전용 Lambda에 Reserved Concurrency 300개를 할당하여 다른 함수들의 영향을 받지 않도록 격리했다. 또한 직접 Lambda 호출 방식에서 SQS 기반 비동기 처리 아키텍처로 전환하여 안정성을 확보했다. DLQ(Dead Letter Queue)를 추가하여 처리 실패한 이벤트를 별도 보관하고 재처리할 수 있는 구조를 구축했다.",
                    techDetails: ["AWS Lambda Reserved Concurrency", "Amazon SQS + DLQ", "CloudWatch 모니터링", "Throttling 제어"],
                    result: "알림 이벤트 유실률 0% 달성, 장애 복구 대응 시간 90% 단축, 확장 가능한 아키텍처 구축으로 향후 트래픽 증가에 대한 대응력 확보"
                },
                {
                    title: "이벤트 처리 방식 전환 중 발생한 성능 이슈",
                    problem: "카프카 이벤트 발행 방식으로 변경 후에도 여전히 CPU 부하가 발생했고, 특히 피크 시간대에 이벤트 처리 지연이 누적되면서 전체 시스템 성능에 영향을 미쳤다.",
                    solution: "이벤트 처리 로직을 AWS Lambda로 완전히 분리하여 서버리스 아키텍처로 전환했다. 또한 배치 처리와 실시간 처리를 구분하여 우선순위 기반 큐 시스템을 도입했다.",
                    techDetails: ["AWS Lambda 함수 분리", "SQS 배치 처리", "CloudWatch 모니터링"],
                    image: "/assets/alimtalk-1.png",
                    result: "피크 시간대 처리 성능 300% 향상, 피크 시간대에도 안정적인 알림 처리 보장, 운영 비용 40% 절감"
                }
            ]
        },
        {
            title: "지역별 시공일 시스템 개발",
            role: "백엔드 개발 (회사 내부 전체 배송시공일 담당)",
            problem: "각 부서 간 상이했던 배송일 정보가 상이하여, 배송일 충돌 및 물류 혼선 발생, 운영팀 및 제휴팀 간 커뮤니케이션 비용 증가, 수작업으로 배송일을 수정하거나 조율해야 하는 비효율적인 관리 체계",
            solution: "회사 내부 ID 기반 배송일 관리 체계 → 우편번호 기반 체계로 전면 개편",
            techStack: ["Spring Boot", "MySQL", "Redis"],
            achievements: ["업무효율 극적인 향상", "배송 오류율 70% 개선", "커뮤니케이션 비용 50% 절감"],
            troubleShootings: [
                {
                    title: "멀티서버 환경에서의 실시간 동기화 문제",
                    problem: "배송일 정보 추가 및 수정 시, 네이버·쿠팡 등 외부 고객사에 동기화가 필요한 상황이며, 멀티서버 환경에서는 각각의 인스턴스에서 추가 및 수정 이벤트를 처리하는 환경에서 완벽한 동기화가 요구되는 상황",
                    solution: "추가 및 수정 이벤트 발생 시, 공통 캐시에 플래그 값을 통해 인스턴스 간 추가 및 수정 권한을 제어하여 특정 시간에 온전한 정보를 동기화 시키게 설계",
                    techDetails: ["Redis 분산 락", "이벤트 기반 아키텍처", "동기화 상태 모니터링"],
                    result: "동기화 정확도 99.9% 달성, 외부 API 호출 횟수 60% 감소",
                    image: "/assets/construction_day_troubleshooting-1.png",
                    imageAlt: "지역별 시공일 시스템 동기화 아키텍처"
                },
                {
                    title: "서버 내부 캐시 이슈",
                    problem: "수정 빈도는 적고 사용 빈도는 많은 RDB에서 즉각 조회해서 사용하기 버거운 대량의 데이터를 각 서버 내부에 캐싱을 해두었는데 해당 값들이 갑자기 초기화 되는 버그가 있었음",
                    solution: "캐싱방식을 외부 캐시 방식을 채택하여 서버 메모리를 낮추고 유지보수성을 올렸다",
                    techDetails: ["외부 캐싱"],
                    result: "속도개선, 유지보수성 상승"
                }
            ]
        },
        {
            title: "회사 배송 휴일 시스템 재구축",
            role: "백엔드 리드 개발",
            problem: "배송일 충돌 및 물류 혼선 발생, 여러 개의 휴일 정보 API가 각각 운영되면서 정보 일관성 유지 및 유지보수에 어려움이 있었음",
            solution: "각기 다르게 관리되던 휴일 정보를 하나의 공통 API로 통합하여, 업무 일관성과 효율성을 향상시킴",
            techStack: ["데이터 Aggregation", "API Unification", "API 설계"],
            achievements: ["회사 휴일 정보 API 통일", "휴일 정보 일관성 100% 확보", "배송 오류 90% 감소", "유지보수 시간 80% 단축"],
            troubleShootings: [
                {
                    title: "레거시 API 통합 과정에서의 데이터 정합성 문제",
                    problem: "기존 3개의 서로 다른 휴일 API에서 동일한 날짜에 대해 상이한 정보를 제공하는 고질적인 문제가 있었고, 통합 과정에서 데이터 마이그레이션 시 정합성 검증이 필요했다.",
                    solution: "마스터 데이터 우선순위를 정의하고, 데이터 검증 로직을 구현했다.",
                    result: "휴일 데이터 정합성 100% 달성"
                }
            ]
        },
        {
            title: "기사님 피킹방식 다각화 시스템 개발",
            role: "백엔드 리드 개발",
            problem: "기사 피킹시 실수 및 누락 발생률이 높음, 물류 기사 개인의 숙련도에 따라 피킹 효율 편차가 컸음, 피킹 시간 및 오류 수정으로 인한 물류 처리 지연이 빈번했음",
            solution: "각 물품 단위로 QR 코드 생성 → 모바일 기기로 스캔하여 피킹 확인 처리",
            techStack: ["Spring Boot", "QR Code", ""],
            achievements: ["피킹 처리 시간 15~25% 단축", "오류율 85% 감소", "기사 만족도 95% 향상"],
            troubleShootings: [
                {
                    title: "모바일 환경에서의 QR 코드 인식률 개선",
                    problem: "창고 환경의 조명 조건과 모바일 기기 성능 차이로 인해 QR 코드 인식률이 낮았고, 특히 손상된 라벨이나 먼지가 있는 환경에서 스캔 실패율이 높았다.",
                    solution: "QR 코드 크기 최적화, 오류 정정 레벨 조정, 대체 인식 알고리즘 도입으로 인식률을 개선했다. 또한 수동 입력 백업 시스템을 구축했다.",
                    techDetails: ["QR 코드 오류 정정", "이미지 전처리", "대체 입력 시스템"],
                    result: "QR 코드 인식률 95% → 99.2% 향상, 스캔 실패 복구 시간 90% 단축"
                }
            ]
        },
        {
            title: "고객 문의게시판 시스템 개발",
            role: "백엔드 리드 개발",
            problem: "배송고객이 직접 회사에 문의할 수 있는 채널이 전화 밖에 없어서 고객 소통에 한계가 있었음",
            solution: "기존 해피콜 개인화페이지에 배송고객 문의게시판 추가 후 이를 통해 고객문의 접수 가능하도록 개발",
            techStack: ["Spring Boot", "암호화"],
            achievements: ["정확한 기록 기반 고객 상담", "상담 효율성 40% 향상", "고객 만족도 증가"],
            troubleShootings: [
                {
                    title: "외부 API들에 대한 보안 전략 수립",
                    problem: "고객에게 직접 노출되는 API인 만큼 암호화가 필수적이었다. 특히 일부 API는 DB 생성까지 이어져 보안 취약 시 큰 사고로 연결될 수 있었다. 그러나 과도한 보안 적용은 사용성을 떨어뜨릴 수 있다는 점이 고민이었다.",
                    solution: "최소한의 보안성과 사용성을 균형 있게 유지하기 위해 양방향 암호화를 적용했다. 각 페이지에서 쿼리 파라미터로 전달되는 암호화된 키를 받아 고객 요청 시마다 백엔드에서 이를 검증하도록 설계했다. 또한 동일 계정에서 단기간 과도한 요청이 발생하지 않도록 제어하여 무차별 대입 공격과 같은 위협을 방지했다.",
                    techDetails: ["세션 및 요청 빈도 관리", "AES-256 양방향 암호화"],
                    result: "개인정보 유출 사고 0건을 유지했으며, 불필요한 보안 절차를 줄여 상담 처리 시간을 약 30% 단축"
                }
            ]
        },
        {
            title: "사업 다각화를 위한 최초 B2C 서비스 (조립 서비스) 백엔드 개발",
            role: "백엔드 개발",
            link: "https://assemble.howser.co.kr/",
            problem: "정체한 회사가 새로운 BM으로 서비스를 해야한다는 필요성에 대한 의견이 나옴, IKEA 가구조립 서비스 시장을 노리는 전략이 필요하다는 의견이 있었음",
            solution: "새로운 비즈니스 모델(BM)의 출현에 의의를 두고 있으며, 해당 서비스를 기반으로 투자자 유치 활동을 진행 중인 것으로 파악됨",
            techStack: ["Spring Boot", "B2C 서비스", "결제 시스템"],
            achievements: ["새로운 BM 개발", "투자자 유치 활동", "베타 서비스 런칭"],
            troubleShootings: [
                {
                    title: "아키텍처 결정 과정과 도입",
                    problem: "장기적인 유지보수성과 기능 확장에 유리한 아키텍처가 필요했다. 기존 프로젝트들은 패키지 구조가 복잡해지거나 코드 일관성이 부족해 변경에 많은 비용이 들었다.",
                    solution: "사전에 패키지 구조와 코드 컨벤션을 팀 내에서 충분히 논의한 뒤, 의존성 역전을 통해 도메인 중심으로 설계할 수 있는 헥사고날 아키텍처를 도입했다. 또한 객체지향 원칙을 적극 반영하여 유연하고 확장 가능한 구조를 구현했다.",
                    techDetails: ["Hexagonal Architecture (Ports & Adapters)", "객체지향 설계 원칙(OOP, SOLID)", "패키지 구조 및 코드 컨벤션 수립"],
                    result: "회사 기존 프로젝트 대비 유지보수성과 확장성이 크게 향상되었으며, 새로운 기능 추가와 변경 작업 속도가 눈에 띄게 개선되었다."
                }
            ]
        },
        {
            title: "PR 리뷰 후 머지 방식으로 업무방식 개선",
            role: "팀 문화 개선",
            problem: "각자 맡은 부분만 작성하고 곧바로 머지하는 방식으로 인해 코드 품질이 떨어지는 문제가 있었음, 입사 초기, 팀 내에 협업 문화가 부족하다고 느꼈음",
            solution: "단독 업무가 아닌 경우, 해당 프로젝트에 참여한 팀원들이 리뷰어가 되어 PR 리뷰 후 머지하는 프로세스를 제안하고 적용",
            techStack: ["Git", "Code Review", "Google Style Guide"],
            achievements: ["코드 품질 향상", "협업 효율성 개선", "코드 컨벤션 정립"],
            troubleShootings: [
                {
                    title: "코드 리뷰 프로세스 도입 시 발생한 개발 속도 저하 문제",
                    problem: "PR 리뷰 프로세스를 도입한 초기에 개발 속도가 현저히 떨어지고, 일부 팀원들의 반발이 있었다. 또한 리뷰 품질의 편차가 컸다.",
                    solution: "리뷰 가이드라인을 수립하고, 단계적 도입을 통해 팀원들의 적응을 도왔다. 중요도에 따른 리뷰 레벨을 구분하여 효율성을 높였다.",
                    techDetails: ["GitHub Pull Request 기반 리뷰 프로세스", "코드 리뷰 가이드라인 수립", "리뷰 레벨 분류(중요도 기반)"],
                    result: "코드 품질 지표 40% 향상, 버그 발생률 60% 감소, 팀 만족도 증가"
                }
            ]
        }
    ];

    const personalProjects = [
        {
            title: "호빵 (창호 견적 앱)",
            description: "창호 치수만 입력하면 자동으로 메이저 3사 제품의 견적을 제공하는 창호 견적 앱",
            link: "https://hoppang.store/official?adv_id=24f30636-8195-4de1-87cb-662eb928a011",
            achievements: ["1인 개발", "8개월 만에 매출 6500만원 이상", "유저 650명 이상", "견적 820건 이상"],
            techStack: ["Spring Boot", "React", "MySQL", "Redis", "Docker", "S3", "온프레미스 서버 구축"],
            architecture: "/assets/hoppang-architecture.png",
            blogs: [
                { title: "나만의 서비스로 실제 문의에서 매출까지 이어지고 새로운 BM 발굴기", url: "https://ydontustudy.tistory.com/217" },
                { title: "서비스 시작 후 1달차 회고", url: "https://ydontustudy.tistory.com/215" },
                { title: "출시 후 2주차 회고", url: "https://ydontustudy.tistory.com/211" },
                { title: "프로젝트 버전업 회고 (V1 -> V2)", url: "https://ydontustudy.tistory.com/218" },
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
                    background: '#ffffff',
                    padding: isMobile ? '1.5rem' : '2rem',
                    borderRadius: '16px',
                    boxShadow: isHovered ? '0 12px 24px rgba(102, 126, 234, 0.15)' : '0 4px 6px rgba(0,0,0,0.07)',
                    border: isHovered ? '2px solid #667eea' : '1px solid #e2e8f0',
                    marginBottom: '2rem',
                    transition: 'all 0.4s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor: 'pointer',
                    color: '#1a202c'
                }}
                // @ts-ignore
                onMouseEnter={() => setHoveredCard(`work-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0
                    }}>
                        💼
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                            fontWeight: 'bold',
                            marginBottom: '0.8rem',
                            color: 'inherit',
                            lineHeight: '1.3'
                        }}>
                            {experience.title}
                        </h3>
                        <div style={{
                            fontSize: '0.95rem',
                            opacity: 0.7,
                            marginBottom: '1rem',
                            fontWeight: '600'
                        }}>
                            {experience.role}
                        </div>
                    </div>
                </div>

                {/* Problem & Solution */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: '#fef2f2',
                        padding: '1.2rem',
                        borderRadius: '12px',
                        border: '1px solid #fecaca'
                    }}>
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginBottom: '0.8rem',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            ⚠️ 문제 인식
                        </h4>
                        <p style={{
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            opacity: 0.8,
                            color: 'inherit'
                        }}>
                            {experience.problem}
                        </p>
                    </div>

                    <div style={{
                        background: '#f0fdf4',
                        padding: '1.2rem',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                    }}>
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginBottom: '0.8rem',
                            color: '#059669',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            ✅ 해결 방법
                        </h4>
                        <p style={{
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            opacity: 0.8,
                            color: 'inherit'
                        }}>
                            {experience.solution}
                        </p>
                    </div>
                </div>

                {/* TroubleShootings */}
                {experience.troubleShootings?.map((troubleShooting: { title: React.ReactNode; problem: React.ReactNode; solution: React.ReactNode; techDetails: any[]; result: React.ReactNode; image: string | ((prevState: string) => string) | undefined; imageAlt: string | undefined; }, tsIndex: string) => (
                    <div
                        key={tsIndex}
                        style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginBottom: '2rem',
                            border: '1px solid #e2e8f0'
                        }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: '#1e293b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            🔧 TroubleShooting {experience.troubleShootings.length > 1 ? `${tsIndex + 1}:` : ':'} {troubleShooting.title}
                        </h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '1rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 'bold',
                                    color: '#dc2626',
                                    marginBottom: '0.5rem'
                                }}>
                                    🚨 상세 문제:
                                </div>
                                <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    opacity: 0.85,
                                    marginBottom: '1rem'
                                }}>
                                    {troubleShooting.problem}
                                </p>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 'bold',
                                    color: '#059669',
                                    marginBottom: '0.5rem'
                                }}>
                                    💡 기술적 해결:
                                </div>
                                <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    opacity: 0.85,
                                    marginBottom: '1rem'
                                }}>
                                    {troubleShooting.solution}
                                </p>
                            </div>

                            {/* Technical Details */}
                            {troubleShooting.techDetails && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    {troubleShooting.techDetails.map((detail, detailIndex) => (
                                        <span
                                            key={detailIndex}
                                            style={{
                                                padding: '0.3rem 0.7rem',
                                                background: '#e0e7ff',
                                                color: '#4338ca',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Result */}
                            <div style={{
                                background: '#ecfdf5',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #a7f3d0'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#065f46',
                                    marginBottom: '0.3rem'
                                }}>
                                    📊 결과:
                                </div>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: '#047857'
                                }}>
                                    {troubleShooting.result}
                                </div>
                            </div>

                            {/* Image if exists */}
                            {troubleShooting.image && (
                                <div style={{
                                    marginTop: '1rem',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <img
                                        // @ts-ignore
                                        src={troubleShooting.image}
                                        alt={troubleShooting.imageAlt}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsImageOpen(true);
                                            // @ts-ignore
                                            setOpenedImage(troubleShooting.image);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Tech Stack & Achievements */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '1.5rem'
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            {experience.techStack.map((tech: React.ReactNode, techIndex: string | number | bigint | null | undefined) => (
                                <span
                                    key={techIndex}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        background: '#f1f5f9',
                                        color: '#475569',
                                        borderRadius: '16px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            {experience.achievements.map((achievement: React.ReactNode, achIndex: string | number | bigint | null | undefined) => (
                                <span
                                    key={achIndex}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        background: '#d1fae5',
                                        color: '#065f46',
                                        borderRadius: '16px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    📈 {achievement}
                                </span>
                            ))}
                        </div>
                    </div>

                    {experience.link && (
                        <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: '#667eea',
                                color: '#ffffff',
                                borderRadius: '25px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                border: isHovered ? '1px solid rgba(255,255,255,0.4)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            🔗 서비스 보기
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
                        실무에서 직면한 기술적 문제들과 해결 과정을 상세히 공유합니다<br />
                        각 프로젝트의 트러블슈팅 사례를 통해 문제 해결 능력을 확인해보세요
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
                    💼 실무 경험 & 트러블슈팅
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
                                    // @ts-ignore
                                    onMouseEnter={() => setHoveredCard(`project-${index}`)}
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
                                            🚀
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
                                        <div style={{ marginBottom: '2.5rem' }}>
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
                                    <div style={{ marginBottom: '2rem' }}>
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
                                                        🗃️ 백엔드 아키텍처
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