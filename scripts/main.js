let topElem = null;
let footTop = null;
let maxY = null;

let sidebar = document.querySelector(".sidebar") ? document.querySelector(".sidebar") : null;
let footer = document.querySelector(".footer") ? document.querySelector(".footer") : null;



/*
	CALC OFFSET
*/

let offset = (e) => {
    let rect = e.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset
    }
}



/*
	UPDATE PARAM
*/

let updateParam = () => {
    topElem = offset(sidebar).top;
    footTop = offset(footer).top;
    maxY = footTop - sidebar.offsetHeight
}



/*
	ONLOAD PAGE
*/

window.addEventListener("load", () => stickyFunc());



/*
	SLIDER INIT
*/

const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-custom-next',
        prevEl: '.swiper-button-custom-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        }
    }
});



/*
	PROGRESS BAR
*/

let progressBar = () => {
    let y = document.scrollingElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let width = y / height * 100;
    document.querySelector('.progress-bar').style.width = width + '%';
}

if (document.querySelector(".progress-bar")) window.addEventListener('scroll', () => progressBar());



/*
	NAVIGATION
*/

let navigation = (e) => {
    e.preventDefault();
    let key = e.target.getAttribute("to");
    let top = offset(document.querySelector('[key="' + key + '"]')).top;
    let y = document.scrollingElement.scrollTop;
    window.scroll({
        top: top + y,
        left: 0,
        behavior: 'smooth'
    });


    let items = document.querySelectorAll('a.active');
    let itemsKey = document.querySelectorAll('[to="' + key + '"]');

    for (item of items) item.classList.remove('active')

    for (itemKey of itemsKey) itemKey.classList.add('active');

    if (document.querySelector(".m-sidebar").classList.contains("m-sidebar-open")) {
        document.querySelector(".m-sidebar").classList.remove("m-sidebar-open");
        document.querySelector("body").style.overflow = "auto";
    }

    if (document.querySelector(".tablet-sidebar").classList.contains("tablet-sidebar-open")) document.querySelector(".tablet-sidebar").classList.remove("tablet-sidebar-open");
}

if (document.querySelector(".sidebar-nav a")) {
    const link = document.querySelectorAll(".sidebar-nav a");
    link.forEach(item => {
        item.addEventListener('click', (event) => navigation(event));
    })
}

if (document.querySelector(".m-sidebar-nav a")) {
    const link = document.querySelectorAll(".m-sidebar-nav a");
    link.forEach(item => {
        item.addEventListener('click', (event) => navigation(event));
    })
}

if (document.querySelector(".tablet-sidebar-nav a")) {
    const link = document.querySelectorAll(".tablet-sidebar-nav a");
    link.forEach(item => {
        item.addEventListener('click', (event) => navigation(event));
    })
}



/*
	TO HIGHLIGHT ACTIVE LINK
*/

let highlightFunc = () => {
    document.querySelectorAll('[key]').forEach((sec) => {
        let key = sec.getAttribute("key");
        let menuItems = document.querySelectorAll('.sidebar-nav a[to="' + key + '"]').length ? document.querySelectorAll('.sidebar-nav a[to="' + key + '"]') : document.querySelectorAll('.sidebar-nav a[to="' + key[0] + '"]')
        let topSection = offset(sec).top;
        let y = document.scrollingElement.scrollTop;

        if (y >= topSection && y <= topSection + sec.offsetHeight) {
            for (item of menuItems) item.classList.add('active');
        } else {
            for (item of menuItems) item.classList.remove('active');
        }

    });
}

window.addEventListener('scroll', () => highlightFunc());



/*
	SIDEBAR CLOSE/OPEN
*/

let toggleSidebar = (e) => {
    e.preventDefault();
    let btnItem = document.querySelector(".sidebar-btn");
    let sidebarItem = document.querySelector(".sidebar");
    let contentItem = document.querySelector(".content");

    if (!btnItem.classList.contains("close-sidebar")) {
        btnItem.classList.add("close-sidebar");
        btnItem.setAttribute('style', 'right: -' + (btnItem.offsetWidth) + 'px');
        sidebarItem.classList.add("col-lg-1")
        sidebarItem.classList.remove("col-lg-4")
        sidebarItem.classList.add("close-sidebar")
        contentItem.classList.remove("col-lg-8");
        contentItem.classList.add("col-lg-11");
        contentItem.classList.remove("offset-lg-4");
        contentItem.classList.add("offset-lg-1");
    } else {
        btnItem.classList.remove("close-sidebar");
        btnItem.removeAttribute('style');
        sidebarItem.classList.remove("col-lg-1")
        sidebarItem.classList.add("col-lg-4")
        sidebarItem.classList.remove("close-sidebar")
        contentItem.classList.remove("col-lg-11");
        contentItem.classList.add("col-lg-8");
        contentItem.classList.remove("offset-lg-1");
        contentItem.classList.add("offset-lg-4");

    }

}

if (document.querySelector(".sidebar-btn button")) document.querySelector(".sidebar-btn button").addEventListener('click', (event) => toggleSidebar(event));



/*
	MOBILE SIDEBAR CLOSE/OPEN
*/

let toggleMSidebar = (e) => {
    e.preventDefault();
    let sidebarItem = document.querySelector(".m-sidebar");
    let contentItem = document.querySelector(".content");

    if (!sidebarItem.classList.contains("m-sidebar-open")) {
        sidebarItem.classList.add("m-sidebar-open");
        document.querySelector("body").style.overflow = "hidden";
    } else {
        sidebarItem.classList.remove("m-sidebar-open");
        document.querySelector("body").style.overflow = "auto";
    }

}

if (document.querySelector(".m-sidebar-btn button")) document.querySelector(".m-sidebar-btn button").addEventListener('click', (event) => toggleMSidebar(event));
if (document.querySelector(".m-sidebar-open-btn button")) document.querySelector(".m-sidebar-open-btn button").addEventListener('click', (event) => toggleMSidebar(event));



/*
	TABLET SIDEBAR CLOSE/OPEN
*/

let toggleTabletSidebar = (e) => {
    e.preventDefault();
    let btnItem = document.querySelector(".sidebar-btn");
    let sidebarItem = document.querySelector(".tablet-sidebar");
    let contentItem = document.querySelector(".content");

    if (!sidebarItem.classList.contains("tablet-sidebar-open")) {
        sidebarItem.classList.add("tablet-sidebar-open");
    } else {
        sidebarItem.classList.remove("tablet-sidebar-open");

    }

}

if (document.querySelector(".tablet-sidebar-btn button")) document.querySelector(".tablet-sidebar-btn button").addEventListener('click', (event) => toggleTabletSidebar(event));
if (document.querySelector(".tablet-button button")) document.querySelector(".tablet-button button").addEventListener('click', (event) => toggleTabletSidebar(event));



/*
	STICKY SIDEBAR
*/

let stickyFunc = () => {
    updateParam();
    let y = document.scrollingElement.scrollTop;
    if (y < maxY - 24) {
        sidebar.classList.add("fixed")
        sidebar.removeAttribute('style');
    } else {
        sidebar.classList.remove("fixed")
        sidebar.setAttribute('style', 'position: absolute; top: ' + (footTop - sidebar.clientHeight - 24) + 'px');
    }
}

if (sidebar) window.addEventListener("scroll", () => stickyFunc())