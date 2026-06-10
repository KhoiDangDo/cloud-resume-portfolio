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
    // 2. NÂNG CẤP HỆ THỐNG TÌM KIẾM THÔNG MINH TOÀN CỤC
    // ==========================================
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase().trim();
        const searchableItems = document.querySelectorAll('.project, .skill-category');
        const allHeadings = document.querySelectorAll('.tab-content h2');
        const tabs = document.querySelectorAll('.tab-content');
        const navButtons = document.querySelectorAll('.nav-btn');

        if (!term) {
            // Nếu thanh tìm kiếm trống, khôi phục lại trạng thái hiển thị mặc định
            searchableItems.forEach(item => item.style.display = '');
            allHeadings.forEach(h => h.style.display = '');
            
            // Quay về hiển thị theo tab đang được kích hoạt ở Sidebar
            const activeBtn = document.querySelector('.nav-btn.active');
            if (activeBtn) {
                const targetId = activeBtn.getAttribute('data-target');
                tabContents.forEach(t => t.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
            }
            return;
        }

        let firstMatchedTabId = null;

        // Bước 2.1: Lọc tất cả các ô nội dung (Project / Skill)
        searchableItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            if (text.includes(term)) {
                item.style.display = ''; // Xóa style inline để khôi phục định dạng CSS gốc (Sửa Bug 1)
                
                // Ghi nhận Tab đầu tiên chứa kết quả trùng khớp
                const parentTab = item.closest('.tab-content');
                if (parentTab && !firstMatchedTabId) {
                    firstMatchedTabId = parentTab.id;
                }
            } else {
                item.style.display = 'none'; // An nội dung nếu không khớp
            }
        });

        // Bước 2.2: Lọc và ẩn các tiêu đề h2 nếu toàn bộ nội dung bên dưới nó bị ẩn (Sửa Bug 2)
        allHeadings.forEach(heading => {
            let sibling = heading.nextElementSibling;
            let hasVisibleContent = false;

            // Vòng lặp kiểm tra các phần tử liền kề bên dưới cho đến khi gặp h2 tiếp theo hoặc hết tab
            while (sibling && sibling.tagName !== 'H2') {
                if (sibling.classList.contains('project') || sibling.classList.contains('skill-category')) {
                    if (sibling.style.display !== 'none') hasVisibleContent = true;
                }
                // Hỗ trợ quét sâu vào trong các cấu trúc Grid (Dự án / Kỹ năng)
                if (sibling.classList.contains('skills-grid') || sibling.classList.contains('projects-grid')) {
                    const children = sibling.querySelectorAll('.project, .skill-category');
                    children.forEach(child => {
                        if (child.style.display !== 'none') hasVisibleContent = true;
                    });
                }
                sibling = sibling.nextElementSibling;
            }
            // Nếu không có nội dung nào hiển thị, ẩn luôn tiêu đề h2 này đi
            heading.style.display = hasVisibleContent ? '' : 'none';
        });

        // Bước 2.3: Tự động chuyển tab thông minh đến nơi có kết quả tìm thấy (Sửa Bug 2)
        if (firstMatchedTabId) {
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-target') === firstMatchedTabId) {
                    navButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
            tabContents.forEach(tab => {
                if (tab.id === firstMatchedTabId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
    });

    // ==========================================
    // 3. TÍNH NĂNG ĐA NGÔN NGỮ (MULTILINGUAL EN/VN)
    // ==========================================
    const translations = {
        "en": {
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

            "title_intro": "Introduction",
            "intro_p1": "Welcome to my professional cloud-hosted portfolio. I am Do Dang Khoi, an undergraduate engineering student enrolled in the Faculty of Electronics and Telecommunications (FETEL) at the Ho Chi Minh City University of Science (HCMUS). My academic foundation is built upon a rigorous curriculum dedicated to advancing modern technological infrastructures.",
            "intro_p2": "My primary research and technical expertise lie at the specialized intersection of Serverless Cloud Computing, Applied Artificial Intelligence architectures, and Advanced Embedded Systems. I am deeply engaged in designing high-throughput hardware accelerators on SoC FPGAs, training robust deep learning models, and engineering scalable cloud solutions on Amazon Web Services (AWS) using S3, Lambda, DynamoDB, and API Gateway.",
            "intro_p3": "Driven by academic curiosity and engineering discipline, this platform serves as a comprehensive demonstration of my graduation project, utilizing automated CI/CD deployment pipelines. My objective is to bridge the gap between low-level hardware design and modern serverless paradigms to solve complex, real-world computational challenges.",
            
            "title_edu": "Education",
            "edu_uni": "Ho Chi Minh City University of Science (HCMUS)",
            "edu_faculty": "Faculty of Electronics and Telecommunications (FETEL)",
            "edu_major": "Major: Embedded Systems, Applied AI, and Cloud Computing.",
            
            "title_work": "Work Experience",
            "work_title": "Artificial Intelligence & Computer Vision Intern",
            "work_company": "Viettel Telecom (02/2026 - 04/2026)",
            "work_desc1": "Researched and implemented advanced Deep Learning architectures and Machine Learning algorithms for computer vision tasks.",
            "work_desc2": "Optimized object detection, image classification, and tracking models to improve inference speed and accuracy.",
            "work_desc3": "Collaborated with team members to simulate and deploy AI pipelines on cloud infrastructure.",

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

            "title_projects": "Personal Projects",
            "proj1_desc1": "A terminal-based AWS cost and resource dashboard built with Python and the Rich library.",
            "proj1_desc2": "5000+ downloads on PyPI.",
            "proj1_desc3": "600+ stars on GitHub, and 180+ forks.",
            "proj2_desc1": "An MCP server that brings powerful AWS FinOps capabilities directly into your AI assistant.",
            "proj3_desc1": "A web application that helps users assess their AWS certification exam readiness.",
            "proj3_desc2": "700+ tests taken.",

            "title_research_proj": "National and International Research Projects",
            "coord_title": "Coordination of Funded Projects",
            "coord_1": "General PI of “A taxonomy Biomolecular, Biosources and Bioactivities to unleash the potential of Biodiversity through a Web-based platform (B4Web)‘’. Grant received: 800k euros.",
            "coord_2": "local PI of “Forgetfulness, between rights, duties and technological possibilities” project, PRIN. Grant received: 51.8k euros.",
            "coord_3": "Co-PI of “Network analysis for anomaly detection” project. Grant received: 80k euros.",
            "coord_4": "PI of “Analysis and Monitoring of Artificial Intelligence Systems” project. Grant received: 30.5k euros.",
            "coord_5": "PI of “Innovation in Advanced Analytics: analyisis of banking transactions networks” project. Grant received: 150k euros.",
            "coord_6": "PI of the Computer Science Department research unit of “Big Data and Internet of Things, financial and insurance fields”. Grant received: 35k euros.",
            "part_title": "Participation to Research Projects",
            "part_1": "“AI Aware” project, co-financed by University of Turin.",
            "part_2": "“Be Positive: Understanding and tackling online hate speech in Italy” project, financed by Google.org.",
            "part_3": "“M.EMO.RAI”, financed by RAI - Radiotelevisione Italiana. Grant received: 40k euros.",
            "part_4": "“Hate Speech & Social Media”, financed by Fondazione CRT. Grant received: 30k euros.",
            "part_5": "“IhatePrejudice: Immigrants, Hate and Prejudice in Social Media”, financed by Compagnia di San Paolo. Grant received: 77k euro.",
            "part_6": "“Gestione sicura ed affidabile del livello applicativo per la distribuzione peer-topeer di contenuti”, Co-financed by MIUR.",

            "title_patents": "Patents",
            "patent_1": "Learning and reasoning from web projections with Eric Horvitz and Susan Dumais.",
            "patent_2": "Resource browser sessions search with Ralph Sommerer, Robert Tucker, and Natasa Milic-Frayling. No. 7225407.",
            "patent_3": "Navigating a resource browser session Patents with Ralph Sommerer, Robert Tucker, and Natasa Milic-Frayling.",
            "patent_4": "“System and Method for Prediction of Self-Similar Signal,” United States Provisional Patent Application (File No: 61/592,352).",

            "title_research_exp": "Research Experience",
            "exp_1": "<strong>Yahoo Research, Santa Clara, CA:</strong> Worked with Ravi Kumar, Andrew Tomkins on evolution and modeling of social networks. And with Michael Mahoney and Kevin Land on community structure in large networks.",
            "exp_2": "<strong>Microsoft Research, Redmond, WA:</strong> Worked with Eric Horvitz and Susan Dumais on web search query modeling, and the dynamics of a instant messenger network of 240 million people.",
            "exp_3": "<strong>Hewlett Packard Laboratories:</strong> Worked with Bernardo Huberman and Lada Adamic on the dynamics of person-to-person product recommendations in a large social network.",
            "exp_4": "<strong>Carnegie Mellon University:</strong> Worked with Christos Faloutsos on problems posed by large graphs.",
            "exp_5": "<strong>Royal Holloway University of London:</strong> With John ShaweTaylor on text classification on uneven training datasets.",
            "exp_6": "<strong>Jozef Stefan Institute, Slovenia:</strong> With Marko Grobelnik and Dunja Mladenic. Projects on machine learning, mining documents and graphs, document summarization, text to speech synthesis.",

            "title_sci_community": "Scientific Community Activities",
            "talk_title": "Talks and Tutorials",
            "talk_1": "Invited talk at Joint Statistical Meeting on Analysis of Online Communities",
            "talk_2": "Accepted full day tutorial to WWW (International conference on World Wide Web)",
            "talk_3": "Invited talk at High Performance Computing on Large Graphs, SIAM Conference",
            "talk_4": "Tutorial on Mining and Modeling Large Networks at ECML/PKDD",
            "talk_5": "Tutorial on Diffusion and Cascading Behavior in Social Networks, NATO",
            "comm_title": "Program Committee Member & Reviewer",
            "comm_1": "<strong>Committees:</strong> ICML, KDD, WWW, WSDM, ICWSM, PKDD/ECML, NESCAI.",
            "comm_2": "<strong>Reviewer for:</strong> JACM, JEA, ACM TKDD, MLJ, IEEE TKDE, Data Mining and Knowledge Discovery, NIPS.",
            "comm_3": "<strong>External Reviewer:</strong> CIKM, AAAI, SIGIR, ECIR, ICDE, ECAI, IJCAI, SIAM DM.",

            "title_editorial": "Program Committees and Editorial Activities",
            "edit_1": "Associate Editor of “EPJ Data Science” journal.",
            "edit_2": "Lightning Co-Chair “COMPLEX NETWORKS - The 11th International Conference on Complex Networks and their Applications”.",
            "edit_3": "Editor: “Special Issue on Network analysis and computational social science\", Future Internet, MDPI.",
            "edit_4": "General Co-Chair of ACM Conference on Hypertext and Hypermedia.",

            "title_services": "Services & Academic Roles",
            "serv_1": "Associate Editor: Enterprise Information System, International Journal of Industrial Engineering.",
            "serv_2": "Conference Co-chair of Korea-Canada Conference (Vancouver, Niagara Falls, Kanaskis).",
            "serv_3": "Associate Chair of Undergraduate & Graduate Studies, Department of Mechanical and Industrial Engineering, University of Toronto.",

            "title_advisor": "Scientific Advisor & Industrial Collaboration",
            "adv_title": "Public and Private Institutions",
            "adv_1": "Member of the Advisory Board of CINI’s “National Big Data laboratory”.",
            "adv_2": "Scientific Advisor of the “Innovation in advanced analytics\", on behalf of Intesa Sanpaolo Innovation Center.",
            "adv_3": "Vice Head of “SIPLab - Social Information Processing” laboratory, on behalf of CSP Scarl.",
            "ind_title": "Industrial Consulting",
            "ind_1": "Facebook, LinkedIn, Amazon, Sprint, AOL.",
            "ind_2": "Birmingham Midshires bank, UK.",
            "ind_3": "Microsoft Live Labs, Yahoo Research, HP Labs.",

            "title_honors": "Academic Honors, Awards & Funding",
            "aw_title": "Awards",
            "aw_1": "Best student paper award at 13th ACM SIGKDD International Conference.",
            "aw_2": "Microsoft Graduate Research Fellowship.",
            "aw_3": "Winner of the KDD Cup on estimating the download rate of scientific articles on Arxiv.",
            "aw_4": "Govorec, a Slovenia text to speech system, awarded as best innovation for disabled of the year.",
            "aw_5": "Canadian Foundation for Innovation Researcher.",
            "fund_title": "Funding Obtained",
            "fund_1": "$4,000 donation from Yahoo Research to record and publish CMU Machine Learning Lunch seminar talks.",
            "fund_2": "$75,000 Yahoo Research Alliance gift titled \"ShatterPlots: A New Tool for Graph Mining\".",
            "fund_3": "$337,000 for NSF project \"Finding Patterns and Anomalies in Large Time-Evolving Graphs\".",

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

            "title_intro": "Giới thiệu",
            "intro_p1": "Chào mừng bạn đến với hồ sơ năng lực chuyên nghiệp được lưu trữ trên nền tảng đám mây của tôi. Tôi là Đỗ Đăng Khôi, sinh viên kỹ thuật thuộc Khoa Điện tử Viễn thông (FETEL), Trường Đại học Khoa học Tự nhiên - ĐHQG TP.HCM (HCMUS). Nền tảng học thuật của tôi được xây dựng trên một chương trình đào tạo nghiêm ngặt nhằm phát triển các cơ sở hạ tầng công nghệ hiện đại.",
            "intro_p2": "Chuyên môn kỹ thuật và định hướng nghiên cứu chính của tôi nằm ở sự giao thoa chuyên sâu giữa Điện toán đám mây Serverless, các kiến trúc Trí tuệ nhân tạo ứng dụng và Hệ thống nhúng nâng cao. Tôi đặc biệt tập trung vào việc thiết kế các bộ tăng tốc phần cứng hiệu năng cao trên SoC FPGA, huấn luyện các mô hình học sâu mạnh mẽ và kiến trúc các giải pháp đám mây có khả năng mở rộng linh hoạt trên Amazon Web Services (AWS) sử dụng S3, Lambda, DynamoDB và API Gateway.",
            "intro_p3": "Được thúc đẩy bởi niềm đam mê khoa học và kỷ luật kỹ thuật, nền tảng này đóng vai trò là một minh chứng toàn diện cho dự án tốt nghiệp của tôi, áp dụng các luồng triển khai tự động CI/CD. Mục tiêu của tôi là thu hẹp khoảng cách giữa thiết kế phần cứng cấp thấp và các mô hình serverless hiện đại nhằm giải quyết các thách thức tính toán phức tạp trong thực tế.",
            
            "title_edu": "Học vấn",
            "edu_uni": "Trường Đại học Khoa học Tự nhiên TP.HCM (HCMUS)",
            "edu_faculty": "Khoa Điện tử Viễn thông (FETEL)",
            "edu_major": "Chuyên ngành: Hệ thống Nhúng, AI Ứng dụng và Điện toán Đám mây.",
            
            "title_work": "Kinh nghiệm Làm việc",
            "work_title": "Thực tập sinh Trí tuệ Nhân tạo & Thị giác Máy tính",
            "work_company": "Viettel Telecom (02/2026 - 04/2026)",
            "work_desc1": "Nghiên cứu và triển khai các kiến trúc Học sâu nâng cao và thuật toán Học máy cho các bài toán thị giác máy tính.",
            "work_desc2": "Tối ưu hóa các mô hình phát hiện đối tượng, phân loại hình ảnh và theo dõi để cải thiện tốc độ suy luận cũng như độ chính xác.",
            "work_desc3": "Phối hợp với các thành viên trong đội ngũ để mô phỏng và triển khai các luồng xử lý AI trên hạ tầng điện toán đám mây.",

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

            "title_projects": "Dự án Cá nhân",
            "proj1_desc1": "Bảng điều khiển tài nguyên AWS trên Terminal, viết bằng Python và thư viện Rich.",
            "proj1_desc2": "Hơn 5000 lượt tải xuống trên PyPI.",
            "proj1_desc3": "Hơn 600 stars trên GitHub và 180+ forks.",
            "proj2_desc1": "Một MCP server mang các tính năng AWS FinOps mạnh mẽ trực tiếp vào trợ lý AI của bạn.",
            "proj3_desc1": "Ứng dụng web giúp người dùng đánh giá mức độ sẵn sàng cho kỳ thi chứng chỉ AWS.",
            "proj3_desc2": "Hơn 700 bài kiểm tra đã được thực hiện.",

            // Research Projects
            "title_research_proj": "Dự án Nghiên cứu Trong nước và Quốc tế",
            "coord_title": "Điều phối các Dự án được Tài trợ",
            "coord_1": "Chủ nhiệm Tổng quát (PI) dự án “Phân loại Sinh học phân tử, Nguồn sinh học và Hoạt tính sinh học nhằm khai thác tiềm năng Đa dạng sinh học thông qua nền tảng Web (B4Web)‘’. Nhận tài trợ: 800.000 euro.",
            "coord_2": "Chủ nhiệm địa phương dự án “Forgetfulness, between rights, duties and technological possibilities”, PRIN. Nhận tài trợ: 51.800 euro.",
            "coord_3": "Đồng Chủ nhiệm dự án “Phân tích mạng lưới để phát hiện bất thường”. Nhận tài trợ: 80.000 euro.",
            "coord_4": "Chủ nhiệm dự án “Phân tích và Giám sát Hệ thống Trí tuệ Nhân tạo”. Nhận tài trợ: 30.500 euro.",
            "coord_5": "Chủ nhiệm dự án “Đổi mới trong Phân tích Nâng cao: phân tích mạng lưới giao dịch ngân hàng”. Nhận tài trợ: 150.000 euro.",
            "coord_6": "Chủ nhiệm đơn vị nghiên cứu Khoa học Máy tính về “Dữ liệu lớn và Internet Vạn vật trong lĩnh vực tài chính, bảo hiểm”. Nhận tài trợ: 35.000 euro.",
            "part_title": "Tham gia các Dự án Nghiên cứu",
            "part_1": "Dự án “AI Aware”, đồng tài trợ bởi Đại học Turin.",
            "part_2": "Dự án “Be Positive: Hiểu và giải quyết ngôn từ kích động thù địch trực tuyến tại Ý”, tài trợ bởi Google.org.",
            "part_3": "“M.EMO.RAI”, tài trợ bởi RAI - Đài truyền hình Ý. Nhận tài trợ: 40.000 euro.",
            "part_4": "“Hate Speech & Social Media”, tài trợ bởi Fondazione CRT. Nhận tài trợ: 30.000 euro.",
            "part_5": "“IhatePrejudice: Nhập cư, Thù ghét và Định kiến trên Mạng xã hội”, tài trợ bởi Compagnia di San Paolo. Nhận tài trợ: 77.000 euro.",
            "part_6": "Dự án “Quản lý an toàn và tin cậy tầng ứng dụng để phân phối nội dung peer-to-peer”, đồng tài trợ bởi MIUR.",

            // Patents
            "title_patents": "Bằng Sáng chế (Patents)",
            "patent_1": "Học máy và suy luận từ dữ liệu phân chiếu web (cùng Eric Horvitz và Susan Dumais).",
            "patent_2": "Tìm kiếm phiên trình duyệt tài nguyên (cùng Ralph Sommerer, Robert Tucker, và Natasa Milic-Frayling). Số hiệu: 7225407.",
            "patent_3": "Bằng sáng chế: Điều hướng phiên trình duyệt tài nguyên (cùng Ralph Sommerer, Robert Tucker, và Natasa Milic-Frayling).",
            "patent_4": "“Hệ thống và Phương pháp Dự đoán Tín hiệu Tự tương đồng,” Đơn xin Cấp bằng Sáng chế Tạm thời Hoa Kỳ (Số hồ sơ: 61/592,352).",

            // Research Experience
            "title_research_exp": "Kinh nghiệm Nghiên cứu",
            "exp_1": "<strong>Yahoo Research, Santa Clara, CA:</strong> Làm việc cùng Ravi Kumar, Andrew Tomkins về mô hình hóa và sự tiến hóa của mạng xã hội. Hợp tác với Michael Mahoney và Kevin Land về cấu trúc cộng đồng trong mạng lưới quy mô lớn.",
            "exp_2": "<strong>Microsoft Research, Redmond, WA:</strong> Làm việc cùng Eric Horvitz và Susan Dumais về mô hình hóa truy vấn tìm kiếm web, và động lực học mạng lưới tin nhắn tức thời với 240 million người dùng.",
            "exp_3": "<strong>Hewlett Packard Laboratories:</strong> Hợp tác với Bernardo Huberman và Lada Adamic nghiên cứu động lực học của hệ thống gợi ý sản phẩm giữa người với người trong một mạng xã hội lớn.",
            "exp_4": "<strong>Carnegie Mellon University:</strong> Làm việc cùng Christos Faloutsos giải quyết các vấn đề đặt ra bởi đồ thị quy mô lớn.",
            "exp_5": "<strong>Royal Holloway University of London:</strong> Cùng John ShaweTaylor phân loại văn bản trên tập dữ liệu huấn luyện không đồng đều.",
            "exp_6": "<strong>Jozef Stefan Institute, Slovenia:</strong> Làm việc cùng Marko Grobelnik và Dunja Mladenic trong các dự án học máy, khai phá tài liệu và đồ thị, tóm tắt văn bản, và tổng hợp giọng nói từ văn bản.",

            "title_sci_community": "Hoạt động Cộng đồng Khoa học",
            "talk_title": "Báo cáo và Hướng dẫn (Talks and Tutorials)",
            "talk_1": "Báo cáo khách mời tại Joint Statistical Meeting về Phân tích Cộng đồng Trực tuyến.",
            "talk_2": "Hướng dẫn chuyên đề cả ngày tại Hội nghị WWW (World Wide Web).",
            "talk_3": "Báo cáo khách mời về Điện toán Hiệu năng Cao trên Đồ thị Lớn, Hội nghị SIAM.",
            "talk_4": "Hướng dẫn Khai phá và Mô hình hóa Mạng lưới Lớn tại ECML/PKDD.",
            "talk_5": "Hướng dẫn về Hành vi Khuếch tán và Phân tầng trong Mạng xã hội, NATO.",
            "comm_title": "Thành viên Hội đồng & Phản biện",
            "comm_1": "<strong>Hội đồng:</strong> ICML, KDD, WWW, WSDM, ICWSM, PKDD/ECML, NESCAI.",
            "comm_2": "<strong>Phản biện cho:</strong> JACM, JEA, ACM TKDD, MLJ, IEEE TKDE, Data Mining and Knowledge Discovery, NIPS.",
            "comm_3": "<strong>Phản biện bên ngoài:</strong> CIKM, AAAI, SIGIR, ECIR, ICDE, ECAI, IJCAI, SIAM DM.",

            "title_editorial": "Hội đồng Chuyên môn và Biên tập",
            "edit_1": "Phó Biên tập viên tạp chí “EPJ Data Science”.",
            "edit_2": "Đồng Chủ tọa sự kiện “COMPLEX NETWORKS - Hội nghị Quốc tế lần thứ 11 về Mạng phức hợp”.",
            "edit_3": "Biên tập viên: “Số Đặc biệt về Phân tích mạng lưới và khoa học xã hội máy tính\", Future Internet, MDPI.",
            "edit_4": "Đồng Chủ tọa Tổng quát tại Hội nghị ACM về Hypertext và Hypermedia.",

            "title_services": "Vai trò và Dịch vụ Học thuật",
            "serv_1": "Phó Biên tập: Enterprise Information System, International Journal of Industrial Engineering.",
            "serv_2": "Đồng Chủ tọa Hội nghị Hàn Quốc-Canada (Vancouver, Niagara Falls, Kanaskis).",
            "serv_3": "Phó Trưởng khoa Đào tạo Đại học & Sau Đại học, Khoa Cơ khí và Kỹ thuật Công nghiệp, Đại học Toronto.",

            "title_advisor": "Cố vấn Khoa học và Hợp tác Doanh nghiệp",
            "adv_title": "Các Cơ quan Nhà nước và Tư nhân",
            "adv_1": "Thành viên Ban cố vấn của “Phòng thí nghiệm Dữ liệu Lớn Quốc gia” thuộc CINI.",
            "adv_2": "Cố vấn Khoa học về “Đổi mới trong phân tích nâng cao\", đại diện cho Trung tâm Đổi mới Intesa Sanpaolo.",
            "adv_3": "Phó Giám đốc phòng thí nghiệm “SIPLab - Xử lý Thông tin Xã hội”, đại diện cho CSP Scarl.",
            "ind_title": "Cố vấn Doanh nghiệp",
            "ind_1": "Facebook, LinkedIn, Amazon, Sprint, AOL.",
            "ind_2": "Ngân hàng Birmingham Midshires, Vương quốc Anh.",
            "ind_3": "Microsoft Live Labs, Yahoo Research, HP Labs.",

            "title_honors": "Giải thưởng, Vinh danh và Quỹ Tài trợ",
            "aw_title": "Giải thưởng (Awards)",
            "aw_1": "Giải thưởng bài báo sinh viên xuất sắc nhất tại Hội nghị Quốc tế ACM SIGKDD lần thứ 13.",
            "aw_2": "Học bổng Nghiên cứu Sau đại học của Microsoft.",
            "aw_3": "Quán quân KDD Cup về ước tính tốc độ tải xuống của các bài báo khoa học trên Arxiv.",
            "aw_4": "Govorec, hệ thống chuyển văn bản thành giọng nói tiếng Slovenia, được bình chọn là sáng tạo xuất sắc nhất trong năm dành cho người khuyết tật.",
            "aw_5": "Nhà nghiên cứu Quỹ Đổi mới Canada.",
            "fund_title": "Quỹ Tài trợ Nhận được",
            "fund_1": "Nhận 4.000 USD từ Yahoo Research để ghi hình và xuất bản các buổi hội thảo CMU Machine Learning Lunch.",
            "fund_2": "Nhận 75.000 USD từ Yahoo Research Alliance cho dự án \"ShatterPlots: Công cụ mới cho Khai phá Đồ thị\".",
            "fund_3": "Nhận 337.000 USD cho dự án NSF \"Tìm kiếm Cấu trúc và Bất thường trong Đồ thị Tiến hóa Thời gian Quy mô lớn\".",

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
        langToggleBtn.innerHTML = window.currentLang === 'en' 
            ? '<img src="https://flagcdn.com/w20/vn.png" width="16" alt="VN Flag" style="vertical-align: middle; border-radius: 2px;"> VN' 
            : '<img src="https://flagcdn.com/w20/gb.png" width="16" alt="UK Flag" style="vertical-align: middle; border-radius: 2px;"> EN';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[window.currentLang][key]) {
                el.innerHTML = translations[window.currentLang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if(translations[window.currentLang][key]) {
                el.placeholder = translations[window.currentLang][key];
            }
        });

        if (window.totalVisitorCount !== undefined) {
            let footerText = translations[window.currentLang]["footer_stats"].replace("{count}", window.totalVisitorCount);
            document.querySelector('#footer').innerHTML = footerText;
        }

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
    // 4. CHỨC NĂNG DARK MODE TỔNG THỂ
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