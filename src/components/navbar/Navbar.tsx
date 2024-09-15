const Navbar = () => {
  return (
    <nav className="px-4 py-2 border-b border-b-[#C7CAD0]">
      <div className="flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          className="cursor-pointer"
        >
          <path
            d="M0 0H18V2H0V0ZM0 7H12V9H0V7ZM0 14H18V16H0V14Z"
            fill="#252931"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="cursor-pointer flex-shrink-0"
        >
          <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
        </svg>

        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.993"
            height="16.13"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M8.03228 0.934937C12.1881 0.934937 15.561 4.13657 15.561 8.08145C15.561 12.0263 12.1881 15.228 8.03228 15.228C3.87645 15.228 0.503601 12.0263 0.503601 8.08145C0.503601 4.13657 3.87645 0.934937 8.03228 0.934937ZM8.03228 13.6398C11.2675 13.6398 13.8879 11.1525 13.8879 8.08145C13.8879 5.01043 11.2675 2.52305 8.03228 2.52305C4.79704 2.52305 2.17664 5.01043 2.17664 8.08145C2.17664 11.1525 4.79704 13.6398 8.03228 13.6398ZM15.1304 13.6963L17.4964 15.9422L16.3134 17.0652L13.9474 14.8193L15.1304 13.6963Z"
              fill="#252931"
            />
          </svg>
          <div className="w-[1px] h-4 bg-[#82868F]"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.801"
            height="18.114"
            viewBox="0 0 14 20"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M0.0993652 19.057C0.0993652 15.2459 3.18888 12.1564 7 12.1564C10.8111 12.1564 13.9006 15.2459 13.9006 19.057H12.1755C12.1755 16.1987 9.85833 13.8816 7 13.8816C4.14166 13.8816 1.82452 16.1987 1.82452 19.057H0.0993652ZM7 11.2938C4.14055 11.2938 1.82452 8.9778 1.82452 6.11835C1.82452 3.2589 4.14055 0.942871 7 0.942871C9.85945 0.942871 12.1755 3.2589 12.1755 6.11835C12.1755 8.9778 9.85945 11.2938 7 11.2938ZM7 9.56866C8.9063 9.56866 10.4503 8.02465 10.4503 6.11835C10.4503 4.21205 8.9063 2.66803 7 2.66803C5.0937 2.66803 3.54968 4.21205 3.54968 6.11835C3.54968 8.02465 5.0937 9.56866 7 9.56866Z"
              fill="#252931"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
