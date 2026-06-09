document.addEventListener('DOMContentLoaded', function(){
    
    // ==========================================
    // 1. LOGIC CHUYỂN ĐỔI TAB (MENU NAVIGATION)
    // ==========================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ==========================================
    // 2. TÍNH NĂNG TÌM KIẾM (SEARCH PORTFOLIO)
    // ==========================================
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        // Tìm trong tất cả các thẻ dự án và kỹ năng
        const searchableItems = document.querySelectorAll('.project, .skill-category');
        
        searchableItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(term) ? 'block' : 'none';
        });
    });

    // ==========================================
    // 3. TÍNH NĂNG ĐA NGÔN NGỮ (MULTILINGUAL EN/VN)
    // ==========================================
    const translations = {
        "en": {
            // Sidebar
            "location": "Vietnam",
            "search_placeholder": "🔍 Search portfolio...",
            "btn_cv": "Get CV",
            "nav_home": "Home",
            "nav_about": "About me",
            "nav_projects": "Projects",
            "nav_academic": "Academic Profile",
            "nav_stats": "Visitor statistics",
            "nav_contact": "Contact",
            "btn_theme": "Dark mode",
            "btn_theme_light": "Light mode",

            // Home & About
            "title_intro": "Introduction",
            "intro_p1": "Hello! I am Do Dang Khoi, a passionate engineering student at the Faculty of Electronics and Telecommunications (FETEL), Ho Chi Minh City University of Science (HCMUS).",
            "intro_p2": "My core expertise lies at the intersection of Cloud Computing, Applied Artificial Intelligence, and Embedded Systems. I enjoy architecting scalable serverless solutions on AWS, training machine learning models, and bringing hardware designs to life on SoC FPGAs. Welcome to my cloud-hosted portfolio!",
            "title_edu": "Education",
            "edu_uni": "Ho Chi Minh City University of Science (HCMUS)",
            "edu_faculty": "Faculty of Electronics and Telecommunications (FETEL)",
            "edu_major": "Major: Embedded Systems, Applied AI, and Cloud Computing.",
            "title_skills": "Technical Skills",
            "skill_ai": "AI & Machine Learning",
            "skill_ai_1": "Models: Linear/Logistic Regression, CNN, RNN (LSTM, GRU).",
            "skill_ai_2": "Frameworks: Python, AI Model Simulation.",
            "skill_embedded": "Embedded Systems",
            "skill_embedded_1": "Platform: Intel SoC FPGA Board.",
            "skill_embedded_2": "Techniques: RTL Design (Verilog/VHDL), Linux Kernel Modules.",
            "skill_cloud": "Cloud Computing",
            "skill_cloud_1": "AWS: S3, API Gateway, Lambda, DynamoDB.",
            "skill_cloud_2": "Tools: Terraform, GitHub Actions.",

            // Projects
            "title_projects": "Personal Projects",
            "proj1_desc1": "A terminal-based AWS cost and resource dashboard built with Python and the Rich library.",
            "proj1_desc2": "5000+ downloads on PyPI.",
            "proj1_desc3": "600+ stars on GitHub, and 180+ forks.",
            "proj2_desc1": "An MCP server that brings powerful AWS FinOps capabilities directly into your AI assistant.",
            "proj3_desc1": "A web application that helps users assess their AWS certification exam readiness.",
            "proj3_desc2": "700+ tests taken.",

            // New Word Document Titles (English)
            "title_research_proj": "National and International Research Projects",
            "title_patents": "Patents",
            "title_research_exp": "Research Experience",
            "title_sci_community": "Scientific Community Activities",
            "title_editorial": "Program Committees and Editorial Activities",
            "title_services": "Services & Academic Roles",
            "title_advisor": "Scientific Advisor & Industrial Collaboration",
            "title_honors": "Academic Honors, Awards & Funding",

            // Statistics & Contact
            "title_stats": "Analytics Dashboard",
            "stat_os": "Operating System",
            "stat_browser": "Browser",
            "stat_location": "Locations",
            "footer_stats": "This resume caught the eye of {count} curious minds!",
            "title_contact": "Contact Me",
            "contact_name": "Your Name",
            "contact_email": "Your Email",
            "contact_message": "Your Message",
            "contact_btn": "Send Message 🚀",
            "contact_sending": "Sending... ⏳",
            "contact_success": "✅ Message sent successfully! Thank you.",
            "contact_error": "❌ An error occurred. Please try again later."
        },
        "vn": {
            // Sidebar
            "location": "Việt Nam",
            "search_placeholder": "🔍 Tìm kiếm...",
            "btn_cv": "Tải CV",
            "nav_home": "Trang chủ",
            "nav_about": "Về mình",
            "nav_projects": "Dự án",
            "nav_academic": "Hồ sơ Học thuật",
            "nav_stats": "Thống kê",
            "nav_contact": "Liên hệ",
            "btn_theme": "Giao diện tối",
            "btn_theme_light": "Giao diện sáng",

            // Home & About
            "title_intro": "Giới thiệu",
            "intro_p1": "Xin chào! Mình là Đỗ Đăng Khôi, một sinh viên kỹ thuật đầy nhiệt huyết tại Khoa Điện tử Viễn thông (FETEL), Trường Đại học Khoa học Tự nhiên TP.HCM (HCMUS).",
            "intro_p2": "Chuyên môn cốt lõi của mình là sự giao thoa giữa Điện toán Đám mây, Trí tuệ Nhân tạo Ứng dụng và Hệ thống Nhúng. Mình đam mê thiết kế các giải pháp serverless mở rộng trên AWS, huấn luyện các mô hình học máy và hiện thực hóa các thiết kế phần cứng trên SoC FPGA. Chào mừng bạn đến với trang web của mình!",
            "title_edu": "Học vấn",
            "edu_uni": "Trường Đại học Khoa học Tự nhiên TP.HCM (HCMUS)",
            "edu_faculty": "Khoa Điện tử Viễn thông (FETEL)",
            "edu_major": "Chuyên ngành: Hệ thống Nhúng, AI Ứng dụng và Điện toán Đám mây.",
            "title_skills": "Kỹ năng Công nghệ",
            "skill_ai": "AI & Học máy",
            "skill_ai_1": "Mô hình: Hồi quy Tuyến tính/Logistic, CNN, RNN (LSTM, GRU).",
            "skill_ai_2": "Công cụ: Python, Mô phỏng Mô hình AI.",
            "skill_embedded": "Hệ thống Nhúng",
            "skill_embedded_1": "Nền tảng: Board mạch Intel SoC FPGA.",
            "skill_embedded_2": "Kỹ thuật: Thiết kế RTL (Verilog/VHDL), Linux Kernel Modules.",
            "skill_cloud": "Điện toán Đám mây",
            "skill_cloud_1": "AWS: S3, API Gateway, Lambda, DynamoDB.",
            "skill_cloud_2": "Công cụ: Terraform, GitHub Actions.",

            // Projects
            "title_projects": "Dự án Cá nhân",
            "proj1_desc1": "Bảng điều khiển tài nguyên AWS trên Terminal, viết bằng Python và thư viện Rich.",
            "proj1_desc2": "Hơn 5000 lượt tải xuống trên PyPI.",
            "proj1_desc3": "Hơn 600 stars trên GitHub và 180+ forks.",
            "proj2_desc1": "Một MCP server mang các tính năng AWS FinOps mạnh mẽ trực tiếp vào trợ lý AI của bạn.",
            "proj3_desc1": "Ứng dụng web giúp người dùng đánh giá mức độ sẵn sàng cho kỳ thi chứng chỉ AWS.",
            "proj3_desc2": "Hơn 700 bài kiểm tra đã được thực hiện.",

            // New Word Document Titles (Vietnamese)
            "title_research_proj": "Dự án Nghiên cứu Trong nước và Quốc tế",
            "title_patents": "Bằng Sáng chế",
            "title_research_exp": "Kinh nghiệm Nghiên cứu",
            "title_sci_community": "Hoạt động Cộng đồng Khoa học",
            "title_editorial": "Hội đồng Chuyên môn và Biên tập",
            "title_services": "Vai trò và Dịch vụ Học thuật",
            "title_advisor": "Cố vấn Khoa học và Hợp tác Doanh nghiệp",
            "title_honors": "Giải thưởng, Vinh danh và Quỹ Tài trợ",

            // Statistics & Contact
            "title_stats": "Bảng thống kê truy cập",
            "stat_os": "Hệ điều hành",
            "stat_browser": "Trình duyệt",
            "stat_location": "Vị trí",
            "footer_stats": "Trang web này đã thu hút sự chú ý của {count} người!",
            "title_contact": "Liên hệ với mình",
            "contact_name": "Tên của bạn",
            "contact_email": "Email của bạn",
            "contact_message": "Nội dung tin nhắn",
            "contact_btn": "Gửi tin nhắn 🚀",
            "contact_sending": "Đang gửi... ⏳",
            "contact_success": "✅ Gửi tin nhắn thành công! Cảm ơn bạn.",
            "contact_error": "❌ Có lỗi xảy ra. Vui lòng thử lại sau."
        }
    };

    window.currentLang = 'en'; 
    const langToggleBtn = document.getElementById('lang-toggle');

    function updateLanguage() {
        langToggleBtn.innerHTML = window.currentLang === 'en' ? '🇻🇳 VN' : '🇬🇧 EN';

        // Cập nhật văn bản thường
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[window.currentLang][key]) {
                el.innerHTML = translations[window.currentLang][key];
            }
        });

        // Cập nhật Placeholder cho form và search
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if(translations[window.currentLang][key]) {
                el.placeholder = translations[window.currentLang][key];
            }
        });

        // Cập nhật dòng chữ thống kê ở dưới cùng
        if (window.totalVisitorCount !== undefined) {
            let footerText = translations[window.currentLang]["footer_stats"].replace("{count}", window.totalVisitorCount);
            document.querySelector('#footer').innerHTML = footerText;
        }

        // Cập nhật nút Dark Mode/Light Mode
        const themeText = document.getElementById('theme-text');
        if (themeText) {
             const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
             themeText.innerText = isDark ? translations[window.currentLang]["btn_theme_light"] : translations[window.currentLang]["btn_theme"];
        }
    }

    langToggleBtn.addEventListener('click', () => {
        window.currentLang = window.currentLang === 'en' ? 'vn' : 'en';
        updateLanguage();
    });

    // ==========================================
    // 4. CHỨC NĂNG DARK MODE (CHỈ ÁP DỤNG SIDEBAR)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').innerText = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-icon').innerText = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-icon').innerText = '☀️';
        }
        updateLanguage(); 
    });

    // ==========================================
    // 5. FORM LIÊN HỆ GỬI EMAIL
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const API_URL = 'https://acbmvejaef.execute-api.ap-southeast-2.amazonaws.com/prod/contact'; 
            const data = {
                name: document.getElementById('sender-name').value,
                email: document.getElementById('sender-email').value,
                message: document.getElementById('sender-message').value
            };

            submitBtn.innerText = translations[window.currentLang]["contact_sending"];
            submitBtn.disabled = true;

            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                if(response.ok) {
                    formStatus.innerText = translations[window.currentLang]["contact_success"];
                    formStatus.style.color = '#000'; 
                    contactForm.reset(); 
                } else { throw new Error('Network error'); }
            })
            .catch(error => {
                formStatus.innerText = translations[window.currentLang]["contact_error"];
                formStatus.style.color = '#ff0000';
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.innerText = translations[window.currentLang]["contact_btn"];
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 6. BIỂU ĐỒ THỐNG KÊ & TỔNG LƯỢT TRUY CẬP
    // ==========================================
    const LOG_API_URL = 'https://acbmvejaef.execute-api.ap-southeast-2.amazonaws.com/prod/log';
    const STATS_API_URL = 'https://acbmvejaef.execute-api.ap-southeast-2.amazonaws.com/prod/stats';

    fetch(LOG_API_URL, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(() => fetch(STATS_API_URL))
    .then(response => response.json())
    .then(data => {
        const osData = data.os_data || {};
        const browserData = data.browser_data || {};
        const countryData = data.country_data || {}; 
        
        window.totalVisitorCount = data.total_count || 0;
        updateLanguage();

        const osCanvas = document.getElementById('osChart');
        if (osCanvas && Object.keys(osData).length > 0) {
            new Chart(osCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(osData), 
                    datasets: [{
                        data: Object.values(osData), 
                        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
                        borderWidth: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }

        const browserCanvas = document.getElementById('browserChart');
        if (browserCanvas && Object.keys(browserData).length > 0) {
            new Chart(browserCanvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: Object.keys(browserData), 
                    datasets: [{
                        label: 'Visits', 
                        data: Object.values(browserData), 
                        backgroundColor: '#4e73df',
                        borderRadius: 5
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }, 
                    plugins: { legend: { display: false } } 
                }
            });
        }

        const countryCanvas = document.getElementById('countryChart');
        if (countryCanvas && Object.keys(countryData).length > 0) {
            new Chart(countryCanvas.getContext('2d'), {
                type: 'bar', 
                data: {
                    labels: Object.keys(countryData), 
                    datasets: [{
                        label: 'Visits', 
                        data: Object.values(countryData), 
                        backgroundColor: '#1cc88a',
                        borderRadius: 5
                    }]
                },
                options: { 
                    indexAxis: 'y', 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } }, 
                    plugins: { legend: { display: false } } 
                }
            });
        }
    })
    .catch(error => console.error("Statistics system error:", error));

    // ==========================================
    // 7. AI CHATBOT LOGIC
    // ==========================================
    const CHAT_API_URL = 'https://acbmvejaef.execute-api.ap-southeast-2.amazonaws.com/prod/chat';
    
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('open');
    });

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, true); 
        chatInput.value = '';
        addMessage('Thinking...', false); 

        fetch(CHAT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        })
        .then(res => res.json())
        .then(data => {
            chatMessages.lastChild.remove(); 
            if (data.error) {
                addMessage("🚨 ERROR: " + data.error);
                console.error("Error details:", data.error);
            } else {
                addMessage(data.reply || "No response from the server.");
            }
        })
        .catch(err => {
            chatMessages.lastChild.remove();
            addMessage("🚨 Network error or API Gateway connection failed.");
            console.error(err);
        });
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    updateLanguage();
});