function initPage() {
    // 初始化預設分類
    if (typeof infoDataList !== 'undefined' &&
        Array.isArray(infoDataList) &&
        infoDataList.length > 0) {

        const info = infoDataList[0];
        // document.getElementById('info_name').value = info.name || '';
        document.getElementById('info_ch_name').value = info.ch_name || '';
        document.getElementById('info_en_name').value = info.en_name || '';
        document.getElementById('info_cellphone').value = info.cellphone || '';
        document.getElementById('info_email').value = info.email || '';
        document.getElementById('info_gender').value = info.gender || '';
        document.getElementById('info_birthday').value = info.birthday || '';
        document.getElementById('info_add').value = info.address || '';
    }

    if (typeof jobDataList !== 'undefined' &&
        Array.isArray(jobDataList) &&
        jobDataList.length > 0) {

        const job = jobDataList[0];
        document.getElementById('job_title').value = job.title || '';
        document.getElementById('job_salary').value = job.salary || '';
        document.getElementById('job_character').value = job.character || '';
        document.getElementById('job_place').value = job.place || '';
        document.getElementById('job_working_date').value = job.working_date || '';
    }

    if (typeof eduDataList !== 'undefined' &&
        Array.isArray(eduDataList) &&
        eduDataList.length > 0) {

        eduDataList.forEach(data => addEducation(data));

    } else {
        addEducation();
    }

    if (typeof workDataList !== 'undefined' &&
        Array.isArray(workDataList) &&
        workDataList.length > 0) {

        workDataList.forEach(data => addWork(data));

    } else {
        addWork();
    }

    if (typeof skillDataList !== 'undefined' &&
        Array.isArray(skillDataList) &&
        skillDataList.length > 0) {

        skillDataList.forEach(data => addSkillCategory(data));

    } else {
        addSkillCategory();
    }

    if (typeof langDataList !== 'undefined' &&
        Array.isArray(langDataList) &&
        langDataList.length > 0) {

        langDataList.forEach(data => addLangCategory(data));

    } else {
        addLangCategory();
    }

    if (typeof cerDataList !== 'undefined' &&
        Array.isArray(cerDataList) &&
        cerDataList.length > 0) {

        cerDataList.forEach(data => addCertificationsCategory(data));

    } else {
        addCertificationsCategory();
    }

    if (typeof autoDataList !== 'undefined' &&
        Array.isArray(autoDataList) &&
        autoDataList.length > 0) {

        const bio = autoDataList[0];

        document.getElementById('form_bio_zh').value = bio.chain || '';
        document.getElementById('form_bio_en').value = bio.english || '';

    }
};

/* 上傳照片 */
const photoBox = document.getElementById("photoBox");
const photoInput = document.getElementById("photoInput");
const preview = document.getElementById("photoPreview");
const placeholder = document.getElementById("photoPlaceholder");

photoBox.addEventListener("click", () => {
    photoInput.click();
});

photoInput.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        placeholder.classList.add("d-none");
    };

    reader.readAsDataURL(file);
});

/* 學歷背景 */
function addEducation(data = null) {
    const school = data?.school || '';
    const major = data?.major || '';
    const degree = data?.degree || '';
    const start_date = data?.start_date || '';
    const end_date = data?.end_date || '';

    const html = `
            <div class="item-row">
                <i class="bi bi-x-circle-fill remove-btn" onclick="removeItem(this)"></i>
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label required">學校名稱</label>
                        <input type="text" name="edu_school[]" class="form-control" value="${school}" placeholder="例：國立台灣大學">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label required">系所</label>
                        <input type="text" name="edu_major[]" class="form-control" value="${major}" placeholder="例：資訊管理學系">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">學位</label>
                        <select name="edu_degree[]" class="form-select">
                            <option value="" disabled ${degree ? '' : 'selected'} hidden>學位</option>
                            <option value="大學" ${degree === '大學' ? 'selected' : ''} >大學</option>
                            <option value="碩士" ${degree === '碩士' ? 'selected' : ''} >碩士</option>
                            <option value="博士" ${degree === '博士' ? 'selected' : ''} >博士</option>
                            <option value="高中" ${degree === '高中' ? 'selected' : ''} >高中</option>
                        </select>

                        

                    </div>
                    <div class="col-md-6">
                        <label class="form-label">就讀期間</label>
                        <div class="input-group">
                            <input type="month" class="form-control" value="${start_date}">
                            <span class="input-group-text">至</span>
                            <input type="month" class="form-control" value="${end_date}">
                        </div>
                    </div>
                </div>
            </div>`;
    document.getElementById('educationArea').insertAdjacentHTML('beforeend', html);
}

/* 新增工作經歷 */
function addWork(data = null) {
    const company = data?.company || '';
    const title = data?.title || '';
    const start_date = data?.start_date || '';
    const end_date = data?.end_date || '';
    const content = data?.content || '';

    const html = `
            <div class="item-row">
                <i class="bi bi-x-circle-fill remove-btn" onclick="removeItem(this)"></i>
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label required">公司名稱</label>
                        <input type="text" name="work_company[]" class="form-control" value="${company}">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label required">職稱</label>
                        <input type="text" name="work_title[]" class="form-control" value="${title}">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">期間</label>
                        <div class="input-group">
                            <input type="date" name="work_start[]" class="form-control" value="${start_date}">
                            <span class="input-group-text">至</span>
                            <input type="date" name="work_end[]" class="form-control" value="${end_date}">
                        </div>
                    </div>
                    <div class="col-12">
                        <label class="form-label">工作描述</label>
                        <textarea name="work_content[]" class="form-control" rows="3" placeholder="請條列說明工作職責與具體成就..." >${content}</textarea>
                    </div>
                </div>
            </div>`;
    document.getElementById('workArea').insertAdjacentHTML('beforeend', html);
}

/* 新增技能 */
function addSkillCategory(data = null) {
    const id = 'cat_' + Date.now();
    const title = data?.title || '';
    const skills = data?.skills || [];
    let skillsHtml = skills.map(s => createSkillItemHtml(s.name, s.level)).join('');

    const html = `
                <div class="skill-group mb-4 item-row" id="${id}">
                    <div class="d-flex justify-content-between mb-3">
                        <input type="text" class="form-control w-50 category-title" name="skill_title[]" value="${title}" placeholder="例：前端技術">                        
                        <button type="button" class="btn btn-sm text-danger" onclick="removeItem(this)">移除分類</button>
                    </div>
                    <div class="skill-items">${skillsHtml}</div>
                    <button type="button" class="btn btn-sm btn-link text-decoration-none p-0 mt-2" onclick="addSkillItemToCategory('${id}')">+ 新增項目</button>
                </div>`;
    document.getElementById('skillArea').insertAdjacentHTML('beforeend', html);
}

function createSkillItemHtml(name = '', level = 0) {
    let icons = '';

    for (let i = 5; i >= 1; i--) {
        icons += `
            <i class="bi bi-hand-thumbs-up-fill ${i <= level ? 'active' : ''}"
               data-score="${i}"
               onclick="setRate(this, ${i})"></i>
        `;
    }

    return `
        <div class="row align-items-center mb-2 skill-item">
            <div class="col-6">
                <input type="text" name="skill_name[]"
                       class="form-control form-control-sm skill-name"
                       value="${name}">
            </div>
            <div class="col-5">
                <div class="star-rating">${icons}</div>
                <input type="hidden" class="skill-score" name="skill_score[]" value="${level}">
            </div>
            <div class="col-1 text-end">
                <i class="bi bi-trash text-muted"
                   style="cursor:pointer"
                   onclick="this.closest('.skill-item').remove()"></i>
            </div>
        </div>`;
}

function addSkillItemToCategory(catId) {
    document.querySelector(`#${catId} .skill-items`).insertAdjacentHTML('beforeend', createSkillItemHtml());
}

/* 評分星級 */
function setRate(el, score) {
    const parent = el.parentElement;
    const stars = parent.querySelectorAll('i');
    const hiddenInput = parent.nextElementSibling;
    stars.forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    hiddenInput.value = score;
}

/* 語文能力 */
function addLangCategory(data = null) {
    const id = 'langcat_' + Date.now();

    const lang = data?.lang || '';
    const licenseList = data?.licenses || [];

    // 證照 HTML（只負責「產生」）
    const langHtml = licenseList
        .map(s => createLicenseItemHtml(s.name, s.score))
        .join('');

    const langiLicense = `
    <div class="lang-license ${licenseList.length ? '' : 'd-none'}">
        <label class="form-label">語文證照</label>
        <div class="skill-items">${langHtml}</div>
        <button type="button"
                class="btn btn-sm btn-link text-decoration-none p-0 mt-2"
                onclick="addLicenseItemToCategory('${id}')">
            + 新增證照
        </button>
    </div>`;

    const langDegreeHtml = `
        ${createLangDegreeSelect({ name: 'lang_degree_listen[]', label: '聽', value: data?.listen })}
        ${createLangDegreeSelect({ name: 'lang_degree_speak[]', label: '說', value: data?.speak })}
        ${createLangDegreeSelect({ name: 'lang_degree_read[]', label: '讀', value: data?.read })}
        ${createLangDegreeSelect({ name: 'lang_degree_write[]', label: '寫', value: data?.write })}
    `;

    const html = `
    <div class="skill-group mb-4 item-row" id="${id}">
        <i class="bi bi-x-circle-fill remove-btn" onclick="removeItem(this)"></i>

        <label class="form-label">語文類型</label>
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <select name="lang_cat[]" class="form-select" required onchange="toggleLicense(this)">
                    <option value="" disabled ${lang ? '' : 'selected'} hidden>語文種類</option>
                    <option value="c" ${lang === '中文' ? 'selected' : ''}>中文</option>
                    <option value="e" ${lang === '英文' ? 'selected' : ''}>英文</option>
                    <option value="j" ${lang === '日文' ? 'selected' : ''}>日文</option>
                    <option value="t" ${lang === '台語' ? 'selected' : ''}>台語</option>
                </select>
            </div>

            ${langDegreeHtml}
        </div>

        ${langiLicense}
    </div>`;

    document.getElementById('langArea').insertAdjacentHTML('beforeend', html);
}

/* 聽、說、讀、寫 */
const LANG_LEVELS = ['不會', '略懂', '中等', '精通'];

function createLangDegreeSelect({ name, label, value = '' }) {
    const options = LANG_LEVELS.map(level =>
        `<option value="${level}" ${value === level ? 'selected' : ''}>${level}</option>`
    ).join('');

    return `
    <div class="col-6 col-md-2">
        <select name="${name}" class="form-select">
            <option value="" disabled ${value ? '' : 'selected'} hidden>${label}</option>
            ${options}
        </select>
    </div>`;
}

function toggleLicense(selectEl) {
    const itemRow = selectEl.closest('.item-row');
    const licenseBlock = itemRow.querySelector('.lang-license');
    const skillItems = itemRow.querySelector('.skill-items');

    // 切換一定清空
    skillItems.innerHTML = '';

    if (selectEl.value === 'e' || selectEl.value === 'j') {
        licenseBlock.classList.remove('d-none');

        // 只加一筆空白
        addLicenseItemToCategory(itemRow.id);
    } else {
        licenseBlock.classList.add('d-none');
    }
}

function addLicenseItemToCategory(catId) {
    document.querySelector(`#${catId} .skill-items`).insertAdjacentHTML('beforeend', createLicenseItemHtml());
}

function createLicenseItemHtml(name = '', score = '') {
    return `
        <div class="row align-items-center mb-2 skill-item">
            <div class="col-6">
                <input type="text" name="licenses_name[]"
                       class="form-control form-control-sm skill-name"
                       placeholder="證照名稱"
                       value="${name}">
            </div>
            <div class="col-5">
                <input type="text" name="licenses_score[]"
                       class="form-control form-control-sm skill-name"
                        placeholder="證照分數" value="${score}">
            </div>
            <div class="col-1 text-end">
                <i class="bi bi-trash text-muted"
                   style="cursor:pointer"
                   onclick="this.closest('.skill-item').remove()"></i>
            </div>
        </div>`;
}

/* 專業證照 */
function addCertificationsCategory(data = null) {
    // const id = 'cat_' + Date.now();
    const name = data?.name || '';
    const organization = data?.organization || '';
    const level = data?.level || '';
    const date = data?.date || '';

    // let skillsHtml = skills.map(s => createSkillItemHtml(s.name, s.level)).join('');

    const html = `
            <div class="item-row">
                <i class="bi bi-x-circle-fill remove-btn" onclick="removeItem(this)"></i>
                <div class="row g-3">
                    <div class="col-md-3">
                        <label class="form-label">證照名稱</label>
                        <input type="text" name="cer_title[]" class="form-control" value="${name}" placeholder="例：網頁設計">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">機構</label>
                        <input type="text" name="cer_company[]" class="form-control" value="${organization}" placeholder="例：勞動部技能檢定考試">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">級別</label>
                        <input type="text" name="cer_level[]" class="form-control" value="${level}" placeholder="例：甲級">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">取得⽇期</label>
                        <div class="input-group">
                            <input type="date" name="cer_date[]" class="form-control" value="${date}">
                        </div>
                    </div>
                </div>
            </div>`;
    document.getElementById('certificationsArea').insertAdjacentHTML('beforeend', html);
}

function removeItem(btn) {
    if (confirm('確定要移除此項資料嗎？')) {
        btn.closest('.item-row').remove();
    }
}

/* 即時預覽：專業資深版 */
function showPreview() {
    // 0.取照片資料
    const photoSrc = document.getElementById("photoPreview").src;

    // 1. 取得基本資料 (從 Form 欄位抓取最新值)
    const info = {
        // name: document.getElementById('info_name').value || '未填寫姓名',
        ch_name: document.getElementById('info_ch_name').value || '未填寫姓名',
        en_name: document.getElementById('info_en_name').value,
        title: document.getElementById('job_title').value || '資深軟體工程師',
        phone: document.getElementById('info_cellphone').value,
        email: document.getElementById('info_email').value,
        address: document.getElementById('info_add').value,
        salary: document.getElementById('job_salary').value,
        place: document.getElementById('job_place').value
    };

    // 2. 處理學歷資料
    const eduItems = Array.from(document.querySelectorAll('#educationArea .item-row')).map(row => ({
        school: row.querySelector('[name="edu_school[]"]').value,
        major: row.querySelector('[name="edu_major[]"]').value,
        degree: row.querySelector('[name="edu_degree[]"]').value,
        period: `${row.querySelectorAll('input[type="month"]')[0].value} ~ ${row.querySelectorAll('input[type="month"]')[1].value}`
    }));

    // 3. 處理工作經歷
    const workItems = Array.from(document.querySelectorAll('#workArea .item-row')).map(row => {
        const startDateVal = row.querySelectorAll('input[type="date"]')[0].value;
        const endDateVal = row.querySelectorAll('input[type="date"]')[1].value;

        // 計算年資字串 (例如: "2 年 3 個月")
        const durationText = calculateDuration(startDateVal, endDateVal);

        return {
            company: row.querySelector('[name="work_company[]"]').value,
            title: row.querySelector('[name="work_title[]"]').value,
            period: `${startDateVal} ~ ${endDateVal || '至今'}`,
            duration: durationText, // 新增這行：存入計算後的年資
            content: row.querySelector('textarea').value.replace(/\n/g, '<br>')
        };
    });

    // 4. 處理技能 (關鍵：評分長條圖)
    const skillCategories = Array.from(document.querySelectorAll('#skillArea .skill-group')).map(group => {
        const catTitle = group.querySelector('.category-title').value;
        const skills = Array.from(group.querySelectorAll('.skill-item')).map(item => {
            // 計算亮起的星星數量作為分數 (1-5)
            const activeStars = item.querySelectorAll('.bi-hand-thumbs-up-fill.active').length;
            return {
                name: item.querySelector('.skill-name').value,
                level: (activeStars / 5) * 100 // 轉換為百分比
            };
        });
        return { catTitle, skills };
    });

    // 5. 處理語言
    const langItems = Array.from(document.querySelectorAll('#langArea .item-row')).map(row => {

        const catValue = row.querySelector('[name="lang_cat[]"]').value.trim().toLowerCase();

        const catMap = { e: '英文', j: '日文', c: '中文' };

        const cat = catMap[catValue] || '';
        const langDegree = {
            listen: row.querySelector('[name="lang_degree_listen[]"]').value.trim(),
            speak: row.querySelector('[name="lang_degree_speak[]"]').value.trim(),
            read: row.querySelector('[name="lang_degree_read[]"]').value.trim(),
            write: row.querySelector('[name="lang_degree_write[]"]').value.trim()
        };

        const degreeHtml = Object.entries(langDegree)
            .filter(([key, val]) => val.trim() !== '') // 只留下有值的欄位
            .map(([key, val]) => {
                const keyMap = { listen: '聽', speak: '說', read: '讀', write: '寫' };
                return `${keyMap[key]}-${val}`;
            })
            .join(' | ');

        const licenses = Array.from(row.querySelectorAll('.skill-item')).map(item => {
            const scoreInput = item.querySelector('[name="licenses_score[]"]').value.trim();

            return {
                title: item.querySelector('[name="licenses_name[]"]').value,
                score: scoreInput ? ` - ${scoreInput}分` : ''
            };
        }).filter(l => l.title);
        return { cat, langDegree, licenses, degreeHtml };
    });

    // 6. 證照
    const cerItems = Array.from(document.querySelectorAll('#certificationsArea .item-row')).map(row => ({
        title: row.querySelector('[name="cer_title[]"]').value,
        level: row.querySelector('[name="cer_level[]"]').value,
    }));


    // 7. 關於我
    const bioZh = document.getElementById('form_bio_zh').value.replace(/\n/g, '<br>');
    const bioEn = document.getElementById('form_bio_en').value.replace(/\n/g, '<br>');

    // 8. 構建專業版 HTML 結構
    const previewHTML = `
        <div id="resume-preview" class="resume-preview-wrapper p-4" style="color: #2c3e50; line-height: 1.6;">
            <div class="row align-items-stard mb-5 border-bottom pb-4">                
            ${photoSrc ? `
                <div class="col-md-2 text-center mb-2">
                    <img src="${photoSrc}" class="resume-photo img-fluid">
                </div>
                <div class="col-md-5">` : '<div class="col-md-7">'}                                    
                    <!-- <h1 class="display-5 fw-bold mb-1 text-dark">${info.name}</h1> -->
                    <h1 class="display-5 fw-bold mb-1 text-dark d-inline-block">${info.ch_name}</h1>&ensp;
                    <h4 class="text-muted d-inline-block">${info.en_name}</h4>
                    <h4 class="text-primary mb-3">${info.title}</h4>
                    <div class="d-flex flex-wrap gap-2 text-muted">
                        <span><i class="bi bi-envelope-fill me-1"></i>${info.email}</span>
                        <span><i class="bi bi-telephone-fill me-1"></i>${info.phone}</span>
                        <span class="w-100"><i class="bi bi-geo-alt-fill me-1"></i>${info.address}</span>
                    </div>
                </div>
                <div class="col-md-5 text-md-end text-muted mt-3 mt-md-0 d-flex flex-column justify-content-end">
                    <p class="mb-0 small text-uppercase">期待薪資：${info.salary} NTD</p>
                    <p class="mb-0 small text-uppercase">工作地點：${info.place}</p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 border-end">
                    <section class="resume-section mb-4">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">教育程度</h5>
                        ${eduItems.map(edu => `
                            <div class="mb-3">
                                <div class="fw-bold small">${edu.school}</div>
                                <div class="small text-muted">${edu.degree} - ${edu.major}</div>
                                <div class="text-muted" style="font-size: 0.75rem;">${edu.period}</div>
                            </div>
                        `).join('')}
                    </section>
                    <section class="resume-section mb-4">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">語文能力</h5>
                        ${langItems.map(lang => `
                            <div class="mb-3">
                                ${lang.cat ? `<div class="fw-bold small">${lang.cat}</div>` : ''}
                                ${lang.licenses.map(lic => `<div class="fw-bold small">
                                    ${lic.title}<span class="small text-muted">${lic.score}</span></div>
                                `).join('')}
                                ${lang.degreeHtml ? `<div class="small text-muted">${lang.degreeHtml}</div>` : ''}
                            </div>
                        `).join('')}
                    </section>
                    <section class="resume-section mb-4">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">專業證照</h5>
                        ${cerItems.map(cer => `
                            <div class="fw-bold small">${cer.title} - <span class="small text-muted">${cer.level}</span></div>                         
                        `).join('')}
                    </section>   
                    <section class="resume-section mb-4">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">專業技能</h5>
                        ${skillCategories.map(cat => `
                            <div class="mb-3">
                                <h6 class="text-secondary small fw-bold">${cat.catTitle}</h6>
                                ${cat.skills.map(s => `
                                    <div class="mb-2">
                                        <div class="d-flex justify-content-between small mb-1">
                                            <span>${s.name}</span>
                                        </div>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar bg-primary" style="width: ${s.level}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </section>                     
                </div>

                <div class="col-md-8 ps-md-4">
                    <section class="resume-section mb-5">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-4">工作經歷</h5>
                        ${workItems.map(work => `
                            <div class="mb-4 position-relative ps-3" style="border-left: 1px solid #dee2e6;">
                                <div class="d-flex justify-content-between align-items-start mb-1">
                                    <h6 class="fw-bold mb-0 text-dark">${work.company}</h6>
                                    <span class="text-muted small fw-bold">${work.duration}</span> 
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="text-primary small fw-bold mb-2">${work.title}</div>
                                    <div class="text-muted small">${work.period}</div>
                                </div>
                                <p class="text-muted small">${work.content}</p>
                            </div>
                        `).join('')}
                    </section>

                    <section class="resume-section mb-4">
                        <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">關於我 (Summary)</h5>
                        <div class="p-3 bg-light rounded small text-dark mb-3">
                            ${bioZh}
                        </div>
                        <div class="p-3 bg-light rounded small text-secondary fst-italic">
                            ${bioEn}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;

    // 8. 注入 HTML 並顯示 Modal
    document.getElementById('previewContent').innerHTML = previewHTML;
    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
    previewModal.show();
}

/**
 * 核心函數：計算兩日期間的年與月
 */
function calculateDuration(start, end) {
    if (!start) return "";

    const startDate = new Date(start);
    // 如果沒有結束日期，則預設為今天 (至今)
    const endDate = end ? new Date(end) : new Date();

    if (isNaN(startDate) || isNaN(endDate)) return "";

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    // 如果月份差為負數，表示未滿一年，需向年份借位
    if (months < 0) {
        years--;
        months += 12;
    }

    // 邏輯優化：通常計算年資會包含當月，所以月份 +1
    months += 1;
    if (months >= 12) {
        years++;
        months -= 12;
    }

    // 格式化輸出
    let result = "";
    if (years > 0) result += `${years} 年 `;
    if (months > 0) result += `${months} 個月`;

    return result ? `(共 ${result})` : "";
}
/**
* 一、API 送出主 function（你 navbar 的 saveData()）
*/
function saveData() {
    const payload = collectResumeData();

    console.log('送出履歷資料:', payload);

    fetch('/api/resumes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) throw res;
            return res.json();
        })
        .then(data => {
            alert('履歷已成功儲存！');
            console.log('API response:', data);
        })
        .catch(async err => {
            if (err.json) {
                const errorData = await err.json();
                console.error('API error:', errorData);
                alert(errorData.message || '儲存失敗');
            } else {
                alert('系統錯誤，請稍後再試');
            }
        });
}
/**
*二、核心：收集整份履歷資料（重點）
*/
function collectResumeData() {
    return {
        base_info: getBaseInfo(),
        target_job: getTargetJob(),
        educations: getEducations(),
        works: getWorks(),
        skills: getSkills(),
        languages: getLanguages(),
        certifications: getCertifications(),
        biography: getBiography()
    };
}


/**三、各區塊資料收集 function
*1️⃣ 個人基本資料
*/
function getBaseInfo() {
    return {
        // name: document.getElementById('info_name')?.value || '',
        ch_name: document.getElementById('info_ch_name')?.value || '',
        en_name: document.getElementById('info_en_name')?.value || '',
        phone: document.getElementById('info_cellphone')?.value || '',
        email: document.getElementById('info_email')?.value || '',
        gender: document.getElementById('info_gender')?.value || '',
        birthday: document.getElementById('info_birthday')?.value || '',
        address: document.getElementById('info_add')?.value || ''
    };
}

/**
 * 2️⃣ 求職條件
*/
function getTargetJob() {
    return {
        title: document.getElementById('job_title')?.value || '',
        salary: document.getElementById('job_salary')?.value || '',
        character: document.getElementById('job_character')?.value || '',
        place: document.getElementById('job_place')?.value || '',
        available_date: document.getElementById('job_working_date')?.value || ''
    };
}
/**
 * 3️⃣ 學歷背景（支援動態新增）
假設你每一筆學歷都有 .education-item
*/

function getEducations() {
    const list = [];

    document.querySelectorAll('#educationArea .item-row').forEach(item => {
        list.push({
            school: item.querySelector('[name="edu_school[]"]')?.value || '',
            major: item.querySelector('[name="edu_major[]"]')?.value || '',
            degree: item.querySelector('[name="edu_degree[]"]')?.value || '',
            start_date: item.querySelector('input[type="month"]:nth-of-type(1)')?.value || '',
            end_date: item.querySelector('input[type="month"]:nth-of-type(2)')?.value || ''
        });
    });

    return list;
}

/**
 * 4️⃣ 工作經歷
*/
function getWorks() {
    const list = [];

    document.querySelectorAll('#workArea .item-row').forEach(item => {
        list.push({
            company: item.querySelector('[name="work_company[]"]')?.value || '',
            title: item.querySelector('[name="work_title[]"]')?.value || '',
            start: item.querySelector('[name="work_start[]"]')?.value || '',
            end: item.querySelector('[name="work_end[]"]')?.value || '',
            description: item.querySelector('[name="work_content[]"]')?.value || ''
        });
    });

    return list;
}

/**
 *5️⃣ 專長技能（分類 + 點擊）
*/
function getSkills() {
    const categories = [];

    document.querySelectorAll('#skillArea .skill-group').forEach(group => {
        const categoryTitle =
            group.querySelector('.category-title')?.value.trim() || '';

        if (categoryTitle === '') return;

        const items = [];

        group.querySelectorAll('.skill-item').forEach(item => {
            const name =
                item.querySelector('.skill-name')?.value.trim() || '';

            const level = parseInt(
                item.querySelector('.skill-score')?.value || 0,
                10
            );

            if (name !== '') {
                items.push({
                    name: name,
                    level: level
                });
            }
        });

        categories.push({
            category: categoryTitle,
            items: items
        });
    });

    return categories;
}



function getSkills_1() {
    const categories = [];

    document.querySelectorAll('#skillArea .item-row').forEach(cat => {
        const skills = [];

        cat.querySelectorAll('.skill-item.active').forEach(skill => {
            skills.push(skill.dataset.value);
        });

        categories.push({
            category: cat.dataset.category,
            items: skills
        });
    });

    return categories;
}

/**
 * 6️⃣ 語文能力
*/
function getLanguages() {
    const list = [];

    document.querySelectorAll('#langArea .item-row').forEach(item => {

        // ① 收集證照
        const licenses = [];
        item.querySelectorAll('.lang-license .skill-item').forEach(skill => {
            const name = skill.querySelectorAll('input')[0]?.value || '';
            const score = skill.querySelectorAll('input')[1]?.value || '';

            // 避免空白證照送出
            if (name !== '') {
                licenses.push({
                    name: name,
                    score: score
                });
            }
        });

        // ② 收集語言主資料
        list.push({
            lang_cat: item.querySelector('[name="lang_cat[]"]')?.value || '',
            listen: item.querySelector('[name="lang_degree_listen[]"]')?.value || '',
            speak: item.querySelector('[name="lang_degree_speak[]"]')?.value || '',
            read: item.querySelector('[name="lang_degree_read[]"]')?.value || '',
            write: item.querySelector('[name="lang_degree_write[]"]')?.value || '',
            licenses: licenses
        });
    });

    return list;
}

function getLanguages_1() {
    const list = [];

    document.querySelectorAll('#langArea .item-row').forEach(item => {
        // document.querySelectorAll('#langArea .lang-item').forEach(item => {
        list.push({
            language: item.querySelector('[name="lang_cat[]"]')?.value || '',
            listen: item.querySelector('[name="lang_degree_listen[]"]')?.value || '',
            speak: item.querySelector('[name="lang_degree_speak[]"]')?.value || '',
            read: item.querySelector('[name="lang_degree_read[]"]')?.value || '',
            write: item.querySelector('[name="lang_degree_write[]"]')?.value || '',
            licenses_: item.querySelector('[name="level"]')?.value || ''
        });
    });

    return list;
}

/**
*7️⃣ 專業證照
*/
function getCertifications() {
    const list = [];

    document.querySelectorAll('#certificationsArea .item-row').forEach(item => {
        list.push({
            title: item.querySelector('[name="cer_title[]"]')?.value || '',
            company: item.querySelector('[name="cer_company[]"]')?.value || '',
            level: item.querySelector('[name="cer_level[]"]')?.value || '',
            period: item.querySelector('[name="cer_date[]"]')?.value || '',
        });
    });

    return list;
}

/**
 * 8️⃣ 中英文自傳
*/
function getBiography() {
    return {
        zh: document.getElementById('form_bio_zh')?.value || '',
        en: document.getElementById('form_bio_en')?.value || ''
    };
}





function saveData_1() {
    alert('履歷資料已儲存（此為演示環境，您可以結合資料庫 API 使用）');
}
