// IdIcon 컴포넌트
export const IdIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="30px"
    viewBox="80 50 800 800"
    width="30px"
    fill="#ffffff"
    {...props}
  >
    <path d="M234 684q51-39 114-61.5T480 600q69 0 132 22.5T726 684q35-41 54.5-93T800 480q0-133-93.5-226.5T480 160q-133 0-226.5 93.5T160 480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340 380q0-59 40.5-99.5T480 240q59 0 99.5 40.5T620 380q0 59-40.5 99.5T480 520Zm0 360q-83 0-156-31.5T197 757q-54-54-85.5-127T80 480q0-83 31.5-156T197 197q54-54 127-85.5T480 80q83 0 156 31.5T763 197q54 54 85.5 127T880 480q0 83-31.5 156T763 763q-54 54-127 85.5T480 880Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480 680q-53 0-100 15.5T294 740q39 29 86 44.5T480 800Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
  </svg>
);

// EmailIcon 컴포넌트
export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    width="27px"
    height="27px"
    viewBox="0 0 612 612"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <g id="_x37__2_">
        <g fill="#ffffff">
          <path d="M535.5,76.5h-459C34.253,76.5,0,110.753,0,153v306c0,42.247,34.253,76.5,76.5,76.5h459c42.247,0,76.5-34.253,76.5-76.5 V153C612,110.753,577.747,76.5,535.5,76.5z M554.625,114.75L306,306L57.375,114.75H554.625z M38.25,459V153l172.125,133.875 L40.067,470.055C38.996,466.535,38.25,462.883,38.25,459z M67.989,496.236L240.592,312.33L306,361.749l62.596-49.744 l175.415,184.212C541.257,496.849,70.743,496.849,67.989,496.236z M571.934,470.073L401.625,286.875L573.75,153v306 C573.75,462.883,573.004,466.535,571.934,470.073z" />
        </g>
      </g>
    </g>
  </svg>
);

// PasswordIcon 컴포넌트
export const PasswordIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    width="27px"
    height="27px"
    viewBox="0 0 26 26"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path
        d="M21.1 25H5C3.3 25 1.89999 23.6 1.89999 21.9V13C1.89999 11.3 3.3 9.90002 5 9.90002H21.1C22.8 9.90002 24.2 11.3 24.2 13V21.9C24.2 23.6 22.8 25 21.1 25Z"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M16.6 9.79999H9.29999C8.69999 9.79999 8.10001 9.30001 8.10001 8.60001V5.5C8.10001 3 10.1 1 12.6 1H13.2C15.7 1 17.7 3 17.7 5.5V8.60001C17.8 9.30001 17.3 9.79999 16.6 9.79999Z"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M13 21C12.1 21 11.4 20.3 11.4 19.4V15.4C11.4 14.5 12.1 13.8 13 13.8C13.9 13.8 14.6 14.5 14.6 15.4V19.4C14.6 20.3 13.9 21 13 21Z"
        fill="#ffffff"
      />
    </g>
  </svg>
);

// 방 만들기 icon
export const RoomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="11 0 65 64"
    width="40"
    height="24"
    fill="#ffffff"
    {...props}
  >
    <rect
      x="16"
      y="2"
      width="45"
      height="60"
      rx="2"
      ry="2"
      stroke="#ffffff"
      strokeWidth="4"
      fill="none"
    />
    <circle cx="50" cy="32" r="4" fill="#ffffff" />
  </svg>
);

// 언어 아이콘
export const LanguageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#ffffff"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10c-2.5-3-4-7-4-10s1.5-7 4-10z"
      stroke="#ffffff"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

export default LanguageIcon;
