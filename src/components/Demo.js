import React from 'react'

const demo = () => {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <noscript>
                &lt;iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTTC2JM"
                height="0" width="0"
                style="display:none;visibility:hidden"&gt;&lt;/iframe&gt;
            </noscript>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">
                <div
                    style={{
                        width: "calc(100vw - 250px)",
                        left: 250,
                        position: "relative",
                        minHeight: "100vh",
                        maxHeight: "fit-content",
                        background: "rgb(255, 255, 255)"
                    }}
                >
                    <div className="infinite-scroll-component__outerdiv">
                        <div
                            className="infinite-scroll-component "
                            style={{ height: "auto", overflow: "auto" }}
                        >
                            <div className="ant-spin-nested-loading">
                                <div className="ant-spin-container">
                                    <section className="ant-layout" style={{ height: "100%" }}>
                                        <section
                                            className="ant-layout"
                                            style={{ minHeight: "calc(100vh - 45px)", height: "100%" }}
                                        >
                                            <section className="ant-layout">
                                                <main
                                                    className="ant-layout-content site-layout-background attendance"
                                                    style={{
                                                        padding: 15,
                                                        margin: 0,
                                                        overflow: "auto",
                                                        minHeight: "100vh"
                                                    }}
                                                >
                                                    <div
                                                        id="parent"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            marginBottom: 21
                                                        }}
                                                    >
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ margin: 3 }}>
                                                                <div>Branch</div>
                                                                <div
                                                                    className="ant-select ant-select-single ant-select-show-arrow"
                                                                    style={{ width: 200 }}
                                                                >
                                                                    <div className="ant-select-selector">
                                                                        <span className="ant-select-selection-search">
                                                                            <input
                                                                                type="search"
                                                                                autoComplete="off"
                                                                                className="ant-select-selection-search-input"
                                                                                role="combobox"
                                                                                aria-haspopup="listbox"
                                                                                aria-owns="rc_select_3_list"
                                                                                aria-autocomplete="list"
                                                                                aria-controls="rc_select_3_list"
                                                                                aria-activedescendant="rc_select_3_list_0"
                                                                                readOnly=""
                                                                                unselectable="on"
                                                                                defaultValue=""
                                                                                id="rc_select_3"
                                                                                style={{ opacity: 0 }}
                                                                            />
                                                                        </span>
                                                                        <span
                                                                            className="ant-select-selection-item"
                                                                            title="All Branches"
                                                                        >
                                                                            All Branches
                                                                        </span>
                                                                    </div>
                                                                    <span
                                                                        className="ant-select-arrow"
                                                                        unselectable="on"
                                                                        aria-hidden="true"
                                                                        style={{ userSelect: "none" }}
                                                                    >
                                                                        <span
                                                                            role="img"
                                                                            aria-label="down"
                                                                            className="anticon anticon-down ant-select-suffix"
                                                                        >
                                                                            <svg
                                                                                viewBox="64 64 896 896"
                                                                                focusable="false"
                                                                                data-icon="down"
                                                                                width="1em"
                                                                                height="1em"
                                                                                fill="currentColor"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div style={{ margin: 3 }}>
                                                                <div className="filter-label">Date</div>
                                                                <div className="ant-picker">
                                                                    <div className="ant-picker-input">
                                                                        <input
                                                                            readOnly=""
                                                                            placeholder="Select date"
                                                                            title="26/10/2023"
                                                                            size={12}
                                                                            autoComplete="off"
                                                                            defaultValue="26/10/2023"
                                                                        />
                                                                        <span className="ant-picker-suffix">
                                                                            <span
                                                                                role="img"
                                                                                aria-label="calendar"
                                                                                className="anticon anticon-calendar"
                                                                            >
                                                                                <svg
                                                                                    viewBox="64 64 896 896"
                                                                                    focusable="false"
                                                                                    data-icon="calendar"
                                                                                    width="1em"
                                                                                    height="1em"
                                                                                    fill="currentColor"
                                                                                    aria-hidden="true"
                                                                                >
                                                                                    <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ marginTop: 21 }}>
                                                            <button
                                                                type="button"
                                                                className="ant-btn ant-btn-default"
                                                                style={{ margin: 3 }}
                                                            >
                                                                <span>Mark All Absent As Present</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="ant-btn ant-btn-primary"
                                                                style={{ margin: 3 }}
                                                            >
                                                                <span
                                                                    role="img"
                                                                    aria-label="download"
                                                                    className="anticon anticon-download"
                                                                >
                                                                    <svg
                                                                        viewBox="64 64 896 896"
                                                                        focusable="false"
                                                                        data-icon="download"
                                                                        width="1em"
                                                                        height="1em"
                                                                        fill="currentColor"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                                                                    </svg>
                                                                </span>
                                                                <span>Daily Report</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{ backgroundColor: "white", marginTop: 10 }}
                                                    >
                                                        <div className="attendance-top-bar">
                                                            <div
                                                                className="kpi-div"
                                                                style={{ cursor: "pointer", opacity: 1 }}
                                                            >
                                                                <div className="kpi-number">0</div>
                                                                <div className="kpi-text">
                                                                    <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                                                        <span
                                                                            className="ant-badge-status-dot"
                                                                            style={{ background: "rgb(112, 200, 136)" }}
                                                                        />
                                                                        <span className="ant-badge-status-text">
                                                                            Present
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="kpi-div"
                                                                style={{
                                                                    borderLeft: "2px solid rgb(241, 241, 241)",
                                                                    cursor: "pointer",
                                                                    opacity: 1
                                                                }}
                                                            >
                                                                <div className="kpi-number">0</div>
                                                                <div className="kpi-text">
                                                                    <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                                                        <span
                                                                            className="ant-badge-status-dot"
                                                                            style={{ background: "rgb(234, 51, 35)" }}
                                                                        />
                                                                        <span className="ant-badge-status-text">
                                                                            Absent
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="kpi-div"
                                                                style={{
                                                                    borderLeft: "2px solid rgb(241, 241, 241)",
                                                                    cursor: "pointer",
                                                                    opacity: 1
                                                                }}
                                                            >
                                                                <div className="kpi-number">0</div>
                                                                <div className="kpi-text">
                                                                    <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                                                        <span
                                                                            className="ant-badge-status-dot"
                                                                            style={{ background: "rgb(112, 200, 136)" }}
                                                                        />
                                                                        <span className="ant-badge-status-text">
                                                                            Late
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="kpi-div"
                                                                style={{
                                                                    borderLeft: "2px solid rgb(241, 241, 241)",
                                                                    cursor: "pointer",
                                                                    opacity: 1
                                                                }}
                                                            >
                                                                <div className="kpi-number">0</div>
                                                                <div className="kpi-text">
                                                                    <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                                                        <span
                                                                            className="ant-badge-status-dot"
                                                                            style={{ background: "rgb(234, 196, 96)" }}
                                                                        />
                                                                        <span className="ant-badge-status-text">
                                                                            Half Day
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="kpi-div"
                                                                style={{
                                                                    borderLeft: "2px solid rgb(241, 241, 241)",
                                                                    cursor: "pointer",
                                                                    opacity: 1
                                                                }}
                                                            >
                                                                <div className="kpi-number">0</div>
                                                                <div className="kpi-text">
                                                                    <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                                                        <span
                                                                            className="ant-badge-status-dot"
                                                                            style={{ background: "rgb(214, 130, 222)" }}
                                                                        />
                                                                        <span className="ant-badge-status-text">
                                                                            Paid Leave
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between"
                                                        }}
                                                    >
                                                        <div style={{ width: "50%", marginTop: 20 }}>
                                                            <span
                                                                className="ant-input-group-wrapper ant-input-search ant-input-search-with-button"
                                                                style={{ width: "calc(100% - 200px)" }}
                                                            >
                                                                <span className="ant-input-wrapper ant-input-group">
                                                                    <span className="ant-input-affix-wrapper">
                                                                        <span className="ant-input-prefix">
                                                                            <span
                                                                                role="img"
                                                                                aria-label="search"
                                                                                className="anticon anticon-search"
                                                                            >
                                                                                <svg
                                                                                    viewBox="64 64 896 896"
                                                                                    focusable="false"
                                                                                    data-icon="search"
                                                                                    width="1em"
                                                                                    height="1em"
                                                                                    fill="currentColor"
                                                                                    aria-hidden="true"
                                                                                >
                                                                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </span>
                                                                        <input
                                                                            placeholder="Search name of employee"
                                                                            className="ant-input"
                                                                            type="text"
                                                                            defaultValue=""
                                                                        />
                                                                    </span>
                                                                    <span className="ant-input-group-addon">
                                                                        <button
                                                                            type="button"
                                                                            className="ant-btn ant-btn-primary ant-input-search-button"
                                                                        >
                                                                            <span>Search</span>
                                                                        </button>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="ant-table-wrapper"
                                                            style={{ paddingBottom: 5, paddingTop: 10 }}
                                                        >
                                                            <div className="ant-spin-nested-loading">
                                                                <div className="ant-spin-container">
                                                                    <div className="ant-table">
                                                                        <div className="ant-table-container">
                                                                            <div className="ant-table-content">
                                                                                <table style={{ tableLayout: "auto" }}>
                                                                                    <colgroup>
                                                                                        <col style={{ width: "5%" }} />
                                                                                        <col style={{ width: "30%" }} />
                                                                                        <col style={{ width: 280 }} />
                                                                                        <col style={{ width: 280 }} />
                                                                                    </colgroup>
                                                                                    <thead className="ant-table-thead">
                                                                                        <tr>
                                                                                            <th className="ant-table-cell" />
                                                                                            <th
                                                                                                className="ant-table-cell ant-table-column-has-sorters"
                                                                                                tabIndex={0}
                                                                                            >
                                                                                                <div className="ant-table-column-sorters">
                                                                                                    <span className="ant-table-column-title">
                                                                                                        Name
                                                                                                    </span>
                                                                                                    <span className="ant-table-column-sorter ant-table-column-sorter-full">
                                                                                                        <span className="ant-table-column-sorter-inner">
                                                                                                            <span
                                                                                                                role="img"
                                                                                                                aria-label="caret-up"
                                                                                                                className="anticon anticon-caret-up ant-table-column-sorter-up"
                                                                                                            >
                                                                                                                <svg
                                                                                                                    viewBox="0 0 1024 1024"
                                                                                                                    focusable="false"
                                                                                                                    data-icon="caret-up"
                                                                                                                    width="1em"
                                                                                                                    height="1em"
                                                                                                                    fill="currentColor"
                                                                                                                    aria-hidden="true"
                                                                                                                >
                                                                                                                    <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                                                                                                                </svg>
                                                                                                            </span>
                                                                                                            <span
                                                                                                                role="img"
                                                                                                                aria-label="caret-down"
                                                                                                                className="anticon anticon-caret-down ant-table-column-sorter-down"
                                                                                                            >
                                                                                                                <svg
                                                                                                                    viewBox="0 0 1024 1024"
                                                                                                                    focusable="false"
                                                                                                                    data-icon="caret-down"
                                                                                                                    width="1em"
                                                                                                                    height="1em"
                                                                                                                    fill="currentColor"
                                                                                                                    aria-hidden="true"
                                                                                                                >
                                                                                                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                                                                                                </svg>
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </th>
                                                                                            <th className="ant-table-cell">
                                                                                                Punch-In
                                                                                            </th>
                                                                                            <th className="ant-table-cell">
                                                                                                Punch-Out
                                                                                            </th>
                                                                                            <th className="ant-table-cell">
                                                                                                Status
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="ant-table-tbody">
                                                                                        <tr className="ant-table-row ant-table-row-level-0">
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    style={{ cursor: "pointer" }}
                                                                                                >
                                                                                                    <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                                                                                                        <img src="https://salarybox-company-business.salaryboxapp.com/profile_picture/bdecde3a-c584-4a14-82bd-980ebf4f42bc.jpg" />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    style={{ cursor: "pointer" }}
                                                                                                >
                                                                                                    dhruvii
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    className="ant-picker"
                                                                                                    style={{ margin: 3 }}
                                                                                                >
                                                                                                    <div className="ant-picker-input">
                                                                                                        <input
                                                                                                            readOnly=""
                                                                                                            placeholder="+ Punch In"
                                                                                                            title=""
                                                                                                            size={12}
                                                                                                            autoComplete="off"
                                                                                                            defaultValue=""
                                                                                                        />
                                                                                                        <span className="ant-picker-suffix">
                                                                                                            <span
                                                                                                                role="img"
                                                                                                                aria-label="clock-circle"
                                                                                                                className="anticon anticon-clock-circle"
                                                                                                            >
                                                                                                                <svg
                                                                                                                    viewBox="64 64 896 896"
                                                                                                                    focusable="false"
                                                                                                                    data-icon="clock-circle"
                                                                                                                    width="1em"
                                                                                                                    height="1em"
                                                                                                                    fill="currentColor"
                                                                                                                    aria-hidden="true"
                                                                                                                >
                                                                                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                                                                                                                    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                                                                                                                </svg>
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell" />
                                                                                            <td className="ant-table-cell">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="ant-btn ant-btn-round ant-btn-default ant-btn-sm"
                                                                                                    style={{
                                                                                                        border: "none",
                                                                                                        color: "white",
                                                                                                        background:
                                                                                                            "rgb(139, 139, 139)"
                                                                                                    }}
                                                                                                >
                                                                                                    <span>Week Off</span>
                                                                                                    <span
                                                                                                        role="img"
                                                                                                        aria-label="down"
                                                                                                        className="anticon anticon-down"
                                                                                                    >
                                                                                                        <svg
                                                                                                            viewBox="64 64 896 896"
                                                                                                            focusable="false"
                                                                                                            data-icon="down"
                                                                                                            width="1em"
                                                                                                            height="1em"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                        >
                                                                                                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                                                                        </svg>
                                                                                                    </span>
                                                                                                </button>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="ant-table-row ant-table-row-level-0">
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    style={{ cursor: "pointer" }}
                                                                                                >
                                                                                                    <span
                                                                                                        className="ant-avatar ant-avatar-circle"
                                                                                                        style={{
                                                                                                            color: "white",
                                                                                                            backgroundColor:
                                                                                                                "rgb(245, 106, 0)"
                                                                                                        }}
                                                                                                    >
                                                                                                        <span
                                                                                                            className="ant-avatar-string"
                                                                                                            style={{
                                                                                                                transform:
                                                                                                                    "scale(1) translateX(-50%)"
                                                                                                            }}
                                                                                                        >
                                                                                                            K
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    style={{ cursor: "pointer" }}
                                                                                                >
                                                                                                    khushi
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell">
                                                                                                <div
                                                                                                    className="ant-picker"
                                                                                                    style={{ margin: 3 }}
                                                                                                >
                                                                                                    <div className="ant-picker-input">
                                                                                                        <input
                                                                                                            readOnly=""
                                                                                                            placeholder="+ Punch In"
                                                                                                            title=""
                                                                                                            size={12}
                                                                                                            autoComplete="off"
                                                                                                            defaultValue=""
                                                                                                        />
                                                                                                        <span className="ant-picker-suffix">
                                                                                                            <span
                                                                                                                role="img"
                                                                                                                aria-label="clock-circle"
                                                                                                                className="anticon anticon-clock-circle"
                                                                                                            >
                                                                                                                <svg
                                                                                                                    viewBox="64 64 896 896"
                                                                                                                    focusable="false"
                                                                                                                    data-icon="clock-circle"
                                                                                                                    width="1em"
                                                                                                                    height="1em"
                                                                                                                    fill="currentColor"
                                                                                                                    aria-hidden="true"
                                                                                                                >
                                                                                                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                                                                                                                    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                                                                                                                </svg>
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="ant-table-cell" />
                                                                                            <td className="ant-table-cell">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="ant-btn ant-btn-round ant-btn-default ant-btn-sm"
                                                                                                    style={{
                                                                                                        border: "none",
                                                                                                        color: "white",
                                                                                                        background:
                                                                                                            "rgb(139, 139, 139)"
                                                                                                    }}
                                                                                                >
                                                                                                    <span>Week Off</span>
                                                                                                    <span
                                                                                                        role="img"
                                                                                                        aria-label="down"
                                                                                                        className="anticon anticon-down"
                                                                                                    >
                                                                                                        <svg
                                                                                                            viewBox="64 64 896 896"
                                                                                                            focusable="false"
                                                                                                            data-icon="down"
                                                                                                            width="1em"
                                                                                                            height="1em"
                                                                                                            fill="currentColor"
                                                                                                            aria-hidden="true"
                                                                                                        >
                                                                                                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                                                                        </svg>
                                                                                                    </span>
                                                                                                </button>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </main>
                                            </section>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="razorpay-container"
                style={{
                    zIndex: 2147483647,
                    position: "fixed",
                    top: 0,
                    display: "none",
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backfaceVisibility: "hidden",
                    overflowY: "visible"
                }}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n            @keyframes rzp-rot {\n                to {\n                    transform: rotate(360deg);\n                }\n            }\n\n            @-webkit-keyframes rzp-rot {\n                to {\n                    -webkit-transform: rotate(360deg);\n                }\n            }\n\n            .razorpay-container>iframe {\n                min-height: 100% !important;\n            }\n        "
                    }}
                />
                <div
                    className="razorpay-backdrop"
                    style={{
                        minHeight: "100%",
                        transition: "all 0.3s ease-out 0s",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <span
                        style={{
                            textDecoration: "none",
                            background: "rgb(214, 68, 68)",
                            border: "1px dashed white",
                            padding: 3,
                            opacity: 0,
                            transform: "rotate(45deg)",
                            transition: "opacity 0.3s ease-in 0s",
                            fontFamily: "lato, ubuntu, helvetica, sans-serif",
                            color: "white",
                            position: "absolute",
                            width: 200,
                            textAlign: "center",
                            right: "-50px",
                            top: 50
                        }}
                    >
                        Test Mode
                    </span>
                </div>
                <iframe
                    style={{
                        opacity: 1,
                        height: "100%",
                        position: "relative",
                        background: "none",
                        display: "block",
                        border: "0 none transparent",
                        margin: 0,
                        padding: 0,
                        zIndex: 2
                    }}
                    allowTransparency="true"
                    frameBorder={0}
                    width="100%"
                    height="100%"
                    src="https://api.razorpay.com/v1/checkout/public?traffic_env=production&build=3568d6b227bc69fcf6b9aba4cb0e7c3ee35e207a&modern=1&unified_lite=1"
                    className="razorpay-checkout-frame"
                    allow="otp-credentials"
                />
            </div>
            <style
                data-rc-order="append"
                rc-util-key="antd-wave"
                dangerouslySetInnerHTML={{
                    __html:
                        "\n        [ant-click-animating-without-extra-node='true']::after,\n        .ant-click-animating-node {\n            --antd-wave-shadow-color: rgb(61, 126, 172);\n        }\n    "
                }}
            />
            <div>
                <div
                    className="ant-notification ant-notification-topRight"
                    style={{ right: 0, top: 24, bottom: "auto" }}
                >
                    <div />
                </div>
            </div>
        </>

    )
}

export default demo
