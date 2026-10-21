// ==========================================================
// 대한민국 보건복지부 안내 웹 앱 스크립트
// ==========================================================

// 1. 주요 업무 탭 전환 함수
function switchTab(tabId) {
    // 모든 탭 버튼 비활성화
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 모든 탭 패널 숨기기
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // 선택된 탭 활성화
    const targetPanel = document.getElementById('tab-' + tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    // 클릭된 버튼 스타일 활성화
    event.currentTarget.classList.add('active');
}

// 부드러운 스크롤 이동 함수
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. 스마트 복지 혜택 데이터베이스
const benefitsData = [
    {
        id: 1,
        title: "부모급여 및 첫만남이용권",
        category: "출산·육아",
        lifecycle: "infant",
        need: "living",
        desc: "0~1세 영아를 양육하는 부모에게 매월 현금 지급(만 0세 월 100만 원, 만 1세 월 50만 원) 및 출생아당 200만 원 이상 첫만남이용권 바우처를 제공합니다.",
        link: "https://www.bokjiro.go.kr",
        tag: "현금/바우처 지원"
    },
    {
        id: 2,
        title: "임신사전건강관리 및 난임부부 시술비",
        category: "임신·출산",
        lifecycle: "infant",
        need: "health",
        desc: "필수 가임력 검사비(난소나이검사, 정액검사 등)를 전액 지원하고, 사실혼 부부 및 소득기준과 무관하게 난임 시술비를 전폭 지원합니다.",
        link: "https://www.mohw.go.kr",
        tag: "의료비 지원"
    },
    {
        id: 3,
        title: "청년내일저축계좌",
        category: "청년 복지",
        lifecycle: "youth",
        need: "living",
        desc: "일하는 저소득 청년이 매월 10만 원을 저축하면 정부가 매월 10~30만 원을 추가 매칭 적립하여 3년 만기 시 목돈을 마련하도록 돕습니다.",
        link: "https://www.bokjiro.go.kr",
        tag: "자산 형성"
    },
    {
        id: 4,
        title: "국민건강보험 20~30대 국가건강검진",
        category: "보건의료",
        lifecycle: "youth",
        need: "health",
        desc: "20세 이상 대한민국 청년 누구나 2년마다 일반건강검진(신체계측, 혈액검사, 우울증 선별검사 등)을 본인부담금 0원으로 무료 수검합니다.",
        link: "https://www.nhis.or.kr",
        tag: "예방 의료"
    },
    {
        id: 5,
        title: "기초연금 지원 제도",
        category: "어르신 노후",
        lifecycle: "senior",
        need: "living",
        desc: "만 65세 이상 어르신 중 소득인정액이 선정기준액 이하인 분들께 매월 안정적인 기초연금을 지급하여 노후 빈곤을 완화합니다.",
        link: "https://www.nps.or.kr",
        tag: "노후 소득"
    },
    {
        id: 6,
        title: "의료·요양·돌봄 통합재택의료 서비스",
        category: "돌봄·요양",
        lifecycle: "senior",
        need: "care",
        desc: "거동이 불편한 어르신 가정으로 의사·간호사·사회복지사가 직접 방문하여 맞춤형 진료, 간호, 복지 서비스를 종합 연계합니다.",
        link: "https://www.mohw.go.kr",
        tag: "방문 돌봄"
    },
    {
        id: 7,
        title: "노인일자리 및 사회활동 지원",
        category: "일자리·활동",
        lifecycle: "senior",
        need: "job",
        desc: "어르신이 활기차고 건강한 노후생활을 영위할 수 있도록 공익활동, 사회서비스형, 시장형 등 맞춤형 일자리를 100만 개 이상 제공합니다.",
        link: "https://www.bokjiro.go.kr",
        tag: "일자리 지원"
    },
    {
        id: 8,
        title: "국민기초생활보장 생계급여",
        category: "기초생활",
        lifecycle: "vulnerable",
        need: "living",
        desc: "생활이 어려운 가구에 일상생활에 필요한 최저생활비를 현금 급여로 지급하여 인간다운 최저생활을 보장합니다.",
        link: "https://www.bokjiro.go.kr",
        tag: "최저생활 보장"
    },
    {
        id: 9,
        title: "긴급복지지원 (국번없이 129)",
        category: "위기가구 지원",
        lifecycle: "vulnerable",
        need: "living",
        desc: "갑작스러운 실직, 중한 질병, 부상, 화재 등으로 생계유지가 곤란해진 위기 가구에 신속하게 생계·의료·주거비를 선지원합니다.",
        link: "https://www.mohw.go.kr",
        tag: "긴급 구호"
    },
    {
        id: 10,
        title: "재난적 의료비 지원사업",
        category: "의료비 안전망",
        lifecycle: "vulnerable",
        need: "health",
        desc: "과도한 의료비 발생으로 경제적 어려움을 겪는 가구에 본인부담 의료비의 최대 80%까지 연간 5,000만 원 한도로 지원합니다.",
        link: "https://www.nhis.or.kr",
        tag: "의료비 경감"
    },
    {
        id: 11,
        title: "장애인 활동지원 서비스",
        category: "장애인 복지",
        lifecycle: "disability",
        need: "care",
        desc: "신체적·정신적 이유로 일상생활 및 사회생활을 혼자 하기 어려운 중증 장애인에게 활동보조 인력을 지원하여 자립을 돕습니다.",
        link: "https://www.bokjiro.go.kr",
        tag: "활동 보조"
    },
    {
        id: 12,
        title: "최중증 발달장애인 24시간 돌봄",
        category: "장애인 복지",
        lifecycle: "disability",
        need: "care",
        desc: "도전적 행동으로 기존 서비스 이용이 어려웠던 최중증 발달장애인에게 전문인력의 1:1 주간 및 24시간 맞춤형 돌봄을 지원합니다.",
        link: "https://www.mohw.go.kr",
        tag: "전문 통합돌봄"
    }
];

// 3. 복지 혜택 필터링 렌더러
function filterBenefits() {
    const lifecycle = document.getElementById('lifecycleSelect').value;
    const need = document.getElementById('needSelect').value;
    const keyword = document.getElementById('keywordInput').value.trim().toLowerCase();
    const container = document.getElementById('benefitResults');

    const filtered = benefitsData.filter(item => {
        // 생애주기 조건
        const matchLifecycle = (lifecycle === 'all' || item.lifecycle === lifecycle);
        // 필요분야 조건
        const matchNeed = (need === 'all' || item.need === need);
        // 키워드 검색 조건
        const matchKeyword = !keyword || 
            item.title.toLowerCase().includes(keyword) || 
            item.desc.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword) ||
            item.tag.toLowerCase().includes(keyword);

        return matchLifecycle && matchNeed && matchKeyword;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>🔍 검색 조건에 맞는 복지 서비스가 없습니다.</p>
                <small>필터 조건을 변경하거나 검색어를 비우고 다시 확인해 보세요.</small>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="benefit-card">
            <div>
                <span class="b-category">${item.category}</span>
                <h4 class="b-title">${item.title}</h4>
                <p class="b-desc">${item.desc}</p>
            </div>
            <div class="b-action">
                <span class="b-tag">${item.tag}</span>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="b-link">상세 보기 ↗</a>
            </div>
        </div>
    `).join('');
}

// ==========================================================
// 4. "나는 어떤 도움을 받을 수 있을까?" 체크리스트 & 설문 로직
// ==========================================================

let currentSurveyStep = 1;
const totalSurveySteps = 4;

const stepTitles = [
    "단계 1 / 4 : 대상 및 가구 특성",
    "단계 2 / 4 : 건강 및 의료비 상황",
    "단계 3 / 4 : 일상 돌봄 및 요양 필요도",
    "단계 4 / 4 : 생활 안정 및 긴급 지원"
];

// 설문 단계 전환
function navigateSurvey(direction) {
    const nextStep = currentSurveyStep + direction;
    if (nextStep < 1 || nextStep > totalSurveySteps) return;

    // 현재 단계 숨기기
    const currentPanel = document.getElementById(`surveyStep${currentSurveyStep}`);
    if (currentPanel) currentPanel.classList.remove('active');

    // 다음 단계 표시
    currentSurveyStep = nextStep;
    const nextPanel = document.getElementById(`surveyStep${currentSurveyStep}`);
    if (nextPanel) nextPanel.classList.add('active');

    // UI 갱신 (프로그레스 바, 인디케이터, 버튼)
    updateSurveyNavControls();
}

function updateSurveyNavControls() {
    // 프로그레스 바
    const percent = (currentSurveyStep / totalSurveySteps) * 100;
    const progressBar = document.getElementById('surveyProgressBar');
    if (progressBar) progressBar.style.width = `${percent}%`;

    // 텍스트 인디케이터
    const stepText = document.getElementById('stepIndicatorText');
    if (stepText) stepText.innerText = stepTitles[currentSurveyStep - 1];

    // 버튼 표시/숨김
    const prevBtn = document.getElementById('btnSurveyPrev');
    const nextBtn = document.getElementById('btnSurveyNext');
    const submitBtn = document.getElementById('btnSurveySubmit');

    if (prevBtn) prevBtn.style.display = currentSurveyStep > 1 ? 'inline-block' : 'none';
    if (nextBtn) nextBtn.style.display = currentSurveyStep < totalSurveySteps ? 'inline-block' : 'none';
    if (submitBtn) submitBtn.style.display = currentSurveyStep === totalSurveySteps ? 'inline-block' : 'none';
}

function updateSurveyUI() {
    // 체크박스 클릭 반응용 (스타일 CSS :checked 처리됨)
}

// 종합 진단 매칭 데이터베이스
const surveyKnowledgeBase = [
    {
        id: "EMERGENCY_SUPPORT",
        title: "긴급복지지원제도 (즉시 생계·의료·주거비)",
        agency: "보건복지부 긴급지원팀",
        badge: "긴급 생계 구호",
        isEmergency: true,
        desc: "실직, 중한 질병, 부상, 주소득자 사망 등 갑작스러운 위기로 생계 유지가 곤란한 가구에 선지원 후심사 방식으로 신속하게 현금 생계비 및 의료비(최대 300만 원)를 즉각 지원합니다.",
        link: "https://www.mohw.go.kr",
        channelHint: "📞 국번없이 129 (24시간 즉시 상담 접수)",
        matchCondition: (ans) => ans.economic.includes("emergency")
    },
    {
        id: "BASIC_LIVELIHOOD",
        title: "국민기초생활보장 (생계·의료·주거급여)",
        agency: "보건복지부 기초생활보장과",
        badge: "기초생활 안전망",
        desc: "기준중위소득 상향 및 의료급여 부양비 기준 완화로 문턱이 대폭 낮아졌습니다. 소득인정액 기준에 부합할 경우 4인 가구 기준 월 최대 208만 원 상당의 생계급여 및 병원비 의료급여를 매월 지원합니다.",
        link: "https://www.bokjiro.go.kr",
        channelHint: "주소지 읍면동 행정복지센터 방문 신청 또는 복지로",
        matchCondition: (ans) => ans.economic.includes("low_income")
    },
    {
        id: "CATASTROPHIC_MED",
        title: "재난적 의료비 지원 제도",
        agency: "국민건강보험공단",
        badge: "과도한 병원비 경감",
        desc: "중증질환, 수술 등으로 인해 연간 소득 대비 과도한 본인부담 의료비가 발생했을 때 최대 80%, 연간 5,000만 원 한도 내에서 병원비를 정부가 직접 지원합니다.",
        link: "https://www.nhis.or.kr",
        channelHint: "국민건강보험공단 지사 방문 또는 콜센터 1577-1000",
        matchCondition: (ans) => ans.health.includes("high_medical")
    },
    {
        id: "PARENT_BENEFIT",
        title: "부모급여 및 첫만남이용권 바우처",
        agency: "보건복지부 출산정책과",
        badge: "영유아 양육비 지원",
        desc: "만 0세 영아 월 100만 원, 만 1세 영아 월 50만 원의 부모급여를 통장으로 직접 현금 지급하며, 출생아당 첫만남이용권 200만 원 이상(둘째 이상 300만 원) 국민행복카드 바우처를 지급합니다.",
        link: "https://www.bokjiro.go.kr",
        channelHint: "정부24 행복출산 원스톱 또는 복지로 온라인 신청",
        matchCondition: (ans) => ans.stage.includes("infant") || ans.care.includes("child_care")
    },
    {
        id: "INFERTILITY_SUPPORT",
        title: "임신 사전건강관리 및 난임부부 시술비",
        agency: "보건복지부 출산정책과",
        badge: "가임력·난임 시술 지원",
        desc: "결혼 여부나 소득 기준 없이 난임 시술(인공수정, 체외수정) 비용을 전액 지원하며, 임신을 준비하는 남녀 모두에게 가임력 필수 검사(난소나이 검사, 정액 검사 등) 비용을 지원합니다.",
        link: "https://www.mohw.go.kr",
        channelHint: "e보건소 공공보건포털 또는 관할 보건소 모자보건실",
        matchCondition: (ans) => ans.health.includes("infertility")
    },
    {
        id: "BASIC_PENSION",
        title: "어르신 기초연금 (만 65세 이상)",
        agency: "국민연금공단 / 보건복지부",
        badge: "노후 소득 보장",
        desc: "만 65세 이상 어르신 중 소득하위 70% 가구에 매월 최대 약 33~40만 원의 기초연금을 지급하여 안정적인 노후생활을 돕습니다.",
        link: "https://www.nps.or.kr",
        channelHint: "국민연금공단 지사(1355) 또는 행정복지센터",
        matchCondition: (ans) => ans.stage.includes("senior")
    },
    {
        id: "HOME_INTEGRATED_CARE",
        title: "의료·요양·돌봄 통합재택의료 (2026 전국확대)",
        agency: "보건복지부 통합돌봄추진단",
        badge: "살던 집에서 받는 돌봄",
        desc: "거동이 불편한 어르신을 위해 의사·간호사·사회복지사가 직접 가정으로 방문하여 방문진료, 만성질환 관리, 맞춤형 재가요양 및 주거환경 개선을 통합 제공합니다.",
        link: "https://www.mohw.go.kr",
        channelHint: "시·군·구청 통합돌봄 전담팀 및 관할 주민센터",
        matchCondition: (ans) => ans.care.includes("home_care") || (ans.stage.includes("senior") && ans.health.includes("high_medical"))
    },
    {
        id: "DEMENTIA_CENTER",
        title: "치매안심센터 무료 선별검진 및 치료비 지원",
        agency: "중앙치매센터 / 보건복지부",
        badge: "치매 국가책임제",
        desc: "가까운 보건소 치매안심센터에서 무료 인지선별검사를 제공하며, 치매 약제비 지원(월 3만 원), 배회감지기 무상 보급 및 가족 쉼터 프로그램을 운영합니다.",
        link: "https://www.mohw.go.kr",
        channelHint: "치매상담콜센터 1899-9988 (연중무휴)",
        matchCondition: (ans) => ans.health.includes("dementia")
    },
    {
        id: "SENIOR_JOB",
        title: "맞춤형 노인 일자리 및 사회활동 지원",
        agency: "한국노인인력개발원",
        badge: "어르신 활력 일자리",
        desc: "어르신의 경력과 건강 상태에 맞춰 공익활동형(환경지킴이 등), 사회서비스형(보육교사 보조 등), 민간형 일자리를 100만 개 이상 연계 지원합니다.",
        link: "https://www.bokjiro.go.kr",
        channelHint: "노인일자리여기(seniorro.or.kr) 또는 시니어클럽",
        matchCondition: (ans) => ans.economic.includes("senior_job") || (ans.stage.includes("senior") && ans.economic.includes("stable"))
    },
    {
        id: "DISABILITY_ACT",
        title: "장애인 활동지원 및 최중증 발달장애 24시간 돌봄",
        agency: "보건복지부 장애인서비스과",
        badge: "장애인 자립 & 일상돌봄",
        desc: "일상생활이 어려운 등록 장애인에게 전문 활동지원사를 파견하여 신체활동, 가사, 이동을 보조하며, 최중증 발달장애인을 위한 1:1 주야간 24시간 돌봄을 전폭 지원합니다.",
        link: "https://www.bokjiro.go.kr",
        channelHint: "국민연금공단 지사 또는 주민센터 장애인복지 담당",
        matchCondition: (ans) => ans.stage.includes("disability") || ans.care.includes("disability_care")
    },
    {
        id: "YOUTH_SAVINGS",
        title: "청년내일저축계좌 (정부 매칭 목돈 지원)",
        agency: "보건복지부 청년정책팀",
        badge: "청년 자산 형성",
        desc: "일하는 저소득 청년이 매월 10만 원을 저축하면 소득 요건에 따라 정부가 10~30만 원을 매월 추가 지원하여 3년 만기 시 최대 1,440만 원의 종잣돈을 만들어 드립니다.",
        link: "https://www.bokjiro.go.kr",
        channelHint: "복지로 웹사이트 매년 5월 정기 공고 접수",
        matchCondition: (ans) => ans.stage.includes("youth")
    },
    {
        id: "MENTAL_HEALTH",
        title: "전국민 마음투자 심리상담 지원 바우처",
        agency: "보건복지부 정신건강정책과",
        badge: "심리상담 바우처 지원",
        desc: "우울·불안 등 정서적 어려움을 겪는 국민에게 전문 심리상담 서비스를 총 8회(회당 7~8만 원 상당) 받을 수 있는 이용 바우처를 제공합니다.",
        link: "https://www.mohw.go.kr",
        channelHint: "정신건강복지센터, 보건소 또는 행정복지센터 신청",
        matchCondition: (ans) => ans.health.includes("mental")
    },
    {
        id: "UNIVERSAL_CHECKUP",
        title: "국민건강보험 전 국민 국가건강검진",
        agency: "국민건강보험공단",
        badge: "보편 예방의료 혜택",
        desc: "20세 이상 대한민국 국민 누구나 2년 주기로 본인부담금 0원으로 암 검진, 심뇌혈관 질환, 혈액 검사 등 기본 종합건강검진을 무료 수검할 수 있습니다.",
        link: "https://www.nhis.or.kr",
        channelHint: "국민건강보험 'The건강보험' 모바일 앱 또는 병원 예약",
        matchCondition: (ans) => true // 모든 국민 기본 혜택
    }
];

// 설문 제출 및 결과 진단 실행
function submitSurvey() {
    // 폼 값 수집
    const getCheckedValues = (name) => {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
    };

    const userAnswers = {
        stage: getCheckedValues('stage'),
        health: getCheckedValues('health'),
        care: getCheckedValues('care'),
        economic: getCheckedValues('economic')
    };

    // 아무것도 선택하지 않았을 경우 기본 매칭 방지 안내
    const totalChecks = userAnswers.stage.length + userAnswers.health.length + userAnswers.care.length + userAnswers.economic.length;
    if (totalChecks === 0) {
        alert("최소 하나 이상의 항목을 선택해 주셔야 정확한 맞춤 진단이 가능합니다.");
        return;
    }

    // 조건 매칭 수행
    const matched = surveyKnowledgeBase.filter(item => {
        return item.matchCondition(userAnswers);
    });

    // 설문 폼 숨기고 결과 창 표시
    const formEl = document.getElementById('welfareSurveyForm');
    const resultContainer = document.getElementById('surveyResultContainer');
    const resultSummaryText = document.getElementById('resultSummaryText');
    const matchedList = document.getElementById('matchedBenefitsList');

    if (formEl) formEl.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    if (resultSummaryText) {
        resultSummaryText.innerText = `선택하신 상황을 종합 분석한 결과, 총 ${matched.length}건의 복지·보건의료 지원 제도가 매칭되었습니다.`;
    }

    // 긴급제도가 있을 경우 상단 우선 배치
    matched.sort((a, b) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0));

    // 카드 렌더링
    matchedList.innerHTML = matched.map(item => `
        <div class="matched-card ${item.isEmergency ? 'emergency-card' : ''}">
            <div>
                <div class="m-tags">
                    <span class="m-badge ${item.isEmergency ? 'red-badge' : ''}">${item.badge}</span>
                    <span class="m-agency">${item.agency}</span>
                </div>
                <h4 class="m-title">${item.title}</h4>
                <p class="m-desc">${item.desc}</p>
            </div>
            <div class="m-actions">
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-apply-direct ${item.isEmergency ? 'emergency-btn' : ''}">
                    ${item.isEmergency ? '🚨 129 긴급 지원 연결' : '신청 및 상세안내 ↗'}
                </a>
                <span class="m-channel-hint">${item.channelHint}</span>
            </div>
        </div>
    `).join('');

    // 결과 위치로 부드럽게 스크롤
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// 다시 설문하기
function restartSurvey() {
    const formEl = document.getElementById('welfareSurveyForm');
    const resultContainer = document.getElementById('surveyResultContainer');
    
    // 폼 초기화
    if (formEl) {
        formEl.reset();
        formEl.style.display = 'block';
    }
    if (resultContainer) resultContainer.style.display = 'none';

    // 1단계로 복귀
    for (let i = 1; i <= totalSurveySteps; i++) {
        const step = document.getElementById(`surveyStep${i}`);
        if (step) step.classList.remove('active');
    }
    currentSurveyStep = 1;
    const step1 = document.getElementById('surveyStep1');
    if (step1) step1.classList.add('active');

    updateSurveyNavControls();
    scrollToSection('survey-section');
}

// 문서 로드 시 초기 렌더링
document.addEventListener('DOMContentLoaded', () => {
    filterBenefits();
    updateSurveyNavControls();
});
