const BOOK = [
  {label:"序章", title:"先建立你的「治理坐标系」", items:[
    {id:"ch0", no:"序", title:"先建立你的「治理坐标系」", file:"ch0.html"}
  ]},
  {label:"第一卷", title:"历史的基因：制度从哪里来", items:[
    {id:"ch1", no:1, title:"制度是长出来的：为什么要先读历史", file:"ch1.html"},
    {id:"ch2", no:2, title:"大一统的奠基：从封建到郡县", file:"ch2.html"},
    {id:"ch3", no:3, title:"制度的成熟：科举、三省六部与中央集权", file:"ch3.html"},
    {id:"ch4", no:4, title:"巨变与再造：帝制终结到新中国", file:"ch4.html"}
  ]},
  {label:"第二卷", title:"当代的骨架：读懂今天的政治格局", items:[
    {id:"ch5", no:5, title:"根本法：国体、政体与单一制国家", file:"ch5.html"},
    {id:"ch6", no:6, title:"党的领导：理解中国政治的「总开关」", file:"ch6.html"},
    {id:"ch7", no:7, title:"权力结构分析：一套权责清单", file:"ch7.html"},
    {id:"ch8", no:8, title:"纵向治理：中央与地方、五级政府与「条块」", file:"ch8.html"},
    {id:"ch9", no:9, title:"组织架构范例：从中央到乡镇", file:"ch9.html"},
    {id:"ch10", no:10, title:"干部人事：选人、用人、考核、晋升", file:"ch10.html"}
  ]},
  {label:"第三卷", title:"比较的视角：国外政治体系速览", items:[
    {id:"ch11", no:11, title:"西方政治体系的总框架", file:"ch11.html"},
    {id:"ch12", no:12, title:"主要国家的政治体系", file:"ch12.html"},
    {id:"ch13", no:13, title:"中外对比：四个维度看懂差异", file:"ch13.html"}
  ]},
  {label:"第四卷", title:"治理的技艺：公共政策如何运转", items:[
    {id:"ch14", no:14, title:"公共政策是什么：一个政策的生命周期", file:"ch14.html"},
    {id:"ch15", no:15, title:"议程与决策：问题怎么被「看见」", file:"ch15.html"},
    {id:"ch16", no:16, title:"政策执行：从文件到落地", file:"ch16.html"},
    {id:"ch17", no:17, title:"治理工具箱：规划、考核、试点、数字治理", file:"ch17.html"},
    {id:"ch18", no:18, title:"财政的逻辑：钱从哪里来、怎么分、怎么花", file:"ch18.html"}
  ]},
  {label:"第五卷", title:"治理的现场：议题与挑战", items:[
    {id:"ch19", no:19, title:"民生之重：教育、医疗、养老、住房", file:"ch19.html"},
    {id:"ch20", no:20, title:"政府与市场：宏观调控、产业政策与营商环境", file:"ch20.html"},
    {id:"ch21", no:21, title:"社会之治：基层治理、信访、应急与安全", file:"ch21.html"},
    {id:"ch22", no:22, title:"法治之轨：依法行政与法治政府", file:"ch22.html"}
  ]},
  {label:"第六卷", title:"考场的转化：申论与面试方法论", items:[
    {id:"ch23", no:23, title:"申论到底考什么：透过现象看本质", file:"ch23.html"},
    {id:"ch24", no:24, title:"读懂材料：概括、归纳与提炼", file:"ch24.html"},
    {id:"ch25", no:25, title:"提出对策：从认知框架到「有的放矢」", file:"ch25.html"},
    {id:"ch26", no:26, title:"写出深度：一篇文章的结构与论证", file:"ch26.html"},
    {id:"ch27", no:27, title:"面试的思维：四大题型框架", file:"ch27.html"},
    {id:"ch28", no:28, title:"话语体系：如何说「体制内的话」", file:"ch28.html"}
  ]},
  {label:"结语", title:"从认知到实践，成为「内行」", items:[
    {id:"ch29", no:"结", title:"从认知到实践，成为「内行」", file:"ch29.html"}
  ]}
];

const FLAT = BOOK.flatMap(v => v.items);

function getCurrentId() {
  return document.body.getAttribute('data-current') || null;
}

function renderToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;
  const current = getCurrentId();
  BOOK.forEach(vol => {
    const li = document.createElement('li');
    li.className = 'vol';
    const head = document.createElement('button');
    head.className = 'vol-head';
    head.innerHTML = '<span class="label">' + vol.label + '</span><span>' + vol.title + '</span><span class="arrow">▼</span>';
    head.onclick = () => li.classList.toggle('collapsed');
    const ul = document.createElement('ul');
    ul.className = 'chapters';
    vol.items.forEach(ch => {
      const c = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'chapter-link' + (ch.id === current ? ' active' : '');
      a.href = ch.file;
      a.innerHTML = '<span class="no">' + ch.no + '</span><span>' + ch.title + '</span>';
      c.appendChild(a);
      ul.appendChild(c);
    });
    li.appendChild(head);
    li.appendChild(ul);
    toc.appendChild(li);
  });
}

function renderNav() {
  const nav = document.getElementById('chapterNav');
  if (!nav) return;
  const current = getCurrentId();
  const idx = FLAT.findIndex(c => c.id === current);
  if (idx < 0) { nav.innerHTML = ''; return; }
  let html = '';
  if (idx > 0) {
    const p = FLAT[idx - 1];
    html += '<a href="' + p.file + '" class="prev"><span class="dir">上一章</span><span class="tt">' + p.no + ' · ' + p.title + '</span></a>';
  } else {
    html += '<a href="index.html" class="prev"><span class="dir">返回</span><span class="tt">封面</span></a>';
  }
  if (idx < FLAT.length - 1) {
    const n = FLAT[idx + 1];
    html += '<a href="' + n.file + '" class="next"><span class="dir">下一章</span><span class="tt">' + n.no + ' · ' + n.title + '</span></a>';
  } else {
    html += '<a href="index.html" class="next"><span class="dir">结束</span><span class="tt">返回封面</span></a>';
  }
  nav.innerHTML = html;
}

function renderVolGuide() {
  const vg = document.getElementById('volGuide');
  if (!vg) return;
  const descMap = {
    '历史的基因：制度从哪里来': '为什么今天的制度长这样',
    '当代的骨架：读懂今天的政治格局': '谁在决策、谁在执行',
    '比较的视角：国外政治体系速览': '以他者为镜，看懂差异',
    '治理的技艺：公共政策如何运转': '一份政策如何落地',
    '治理的现场：议题与挑战': '教育、医疗、房价怎么治',
    '考场的转化：申论与面试方法论': '把认知变成得分'
  };
  BOOK.slice(1, 7).forEach(vol => {
    const row = document.createElement('div');
    row.className = 'vol-row';
    row.innerHTML = '<span class="vlabel">' + vol.label + '</span><span class="vtitle">' + vol.title + '</span><span class="vdesc">· ' + (descMap[vol.title] || '') + '</span>';
    vg.appendChild(row);
  });
}

// 初始化
renderToc();
renderNav();
renderVolGuide();

// 阅读进度
const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  prog.style.width = (p * 100) + '%';
  document.getElementById('backTop').classList.toggle('show', h.scrollTop > 600);
}, {passive: true});

// 回到顶部
document.getElementById('backTop').onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// 移动端
const sidebar = document.getElementById('sidebar');
document.getElementById('menuBtn').onclick = () => {
  sidebar.classList.add('open');
  document.getElementById('overlay').classList.add('show');
};
document.getElementById('overlay').onclick = () => {
  sidebar.classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
};
document.querySelectorAll('.chapter-link').forEach(l => {
  l.onclick = () => {
    sidebar.classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  };
});
