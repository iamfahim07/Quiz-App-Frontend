import { Home_Icon, LogOut_Icon, User_Icon } from "../components/SVG-Icons";
import { useAuthContext } from "../context";
import { Link, Navigate } from "../router/CustomRouter";
import Button from "./Button";

export default function Header({
  allProps: { currentTheme, setCurrentTheme, chooseTheme },
}) {
  const { currentUser, logout } = useAuthContext();

  // where to navigate
  const link =
    currentUser?.role === "admin" ? "/admin/quiz_topic_customize" : "/";

  // check whether the url should be replaced based on the condition
  const handleNavigateClick = (to) => {
    if (window.location.pathname === "/gameplay") {
      return Navigate(to, { replace: true });
    } else {
      return Navigate(to);
    }
  };

  return (
    <header>
      <div className="flex justify-between items-center">
        <div
          className="w-8 sm:w-10 h-8 sm:h-10 cursor-pointer z-50"
          onClick={() => handleNavigateClick(link)}
        >
          <Home_Icon />
        </div>

        <div className="flex gap-2 md:gap-6 items-center z-50">
          <div className="flex gap-0">
            <div
              className="w-12 h-12 flex justify-center items-center transition duration-75 ease-in-out lg:hover:bg-gray-100 lg:dark:hover:bg-slate-700 cursor-pointer rounded-full"
              onClick={() => {
                chooseTheme.change(currentTheme);
                setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
              }}
            >
              {currentTheme === "dark" ? (
                <div className="w-6 sm:w-7 h-6 sm:h-7">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                      fill="#F6F7F9"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 sm:w-7 h-6 sm:h-7">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                      fill="#4b5563"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="w-12 h-12 flex justify-center items-center transition duration-75 ease-in-out lg:hover:bg-gray-100 lg:dark:hover:bg-slate-700 rounded-full">
              <a
                href="https://github.com/iamfahim07/Quiz-App-Frontend"
                target="_blank"
              >
                <div className="w-6 sm:w-7 h-6 sm:h-7">
                  <svg
                    enableBackground="new -1163 1657.697 56.693 56.693"
                    id="Layer_1"
                    version="1.1"
                    viewBox="-1163 1657.697 56.693 56.693"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        clipRule="evenodd"
                        d="M-1134.6598,1662.9163c-13.601,0-24.63,11.0267-24.63,24.6299   c0,10.8821,7.0573,20.1144,16.8435,23.3713c1.2308,0.2279,1.6829-0.5345,1.6829-1.1849c0-0.587-0.0227-2.5276-0.0334-4.5857   c-6.8521,1.4901-8.2979-2.906-8.2979-2.906c-1.1205-2.8467-2.7347-3.6039-2.7347-3.6039   c-2.2349-1.5287,0.1685-1.4972,0.1685-1.4972c2.473,0.1737,3.7755,2.5385,3.7755,2.5385c2.1967,3.7651,5.7618,2.6765,7.1675,2.0472   c0.2211-1.5917,0.8591-2.6786,1.5637-3.2936c-5.4707-0.6226-11.2218-2.7347-11.2218-12.1722c0-2.6888,0.9623-4.8861,2.538-6.611   c-0.2557-0.6206-1.0989-3.1255,0.2386-6.5183c0,0,2.0684-0.6616,6.7747,2.525c1.9648-0.5458,4.0719-0.8195,6.165-0.829   c2.093,0.0095,4.2017,0.2832,6.17,0.829c4.7012-3.1866,6.7665-2.525,6.7665-2.525c1.3406,3.3928,0.4974,5.8977,0.2417,6.5183   c1.5793,1.7249,2.5348,3.9221,2.5348,6.611c0,9.4602-5.7618,11.5428-11.2465,12.1527c0.8834,0.7644,1.6704,2.2632,1.6704,4.561   c0,3.2955-0.0282,5.9479-0.0282,6.7592c0,0.6556,0.4432,1.4236,1.6915,1.1818c9.7812-3.2605,16.8296-12.4896,16.8296-23.3682   C-1110.0299,1673.943-1121.0574,1662.9163-1134.6598,1662.9163z"
                        fillRule="evenodd"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1149.9611,1698.2793c-0.0542,0.1227-0.2469,0.1593-0.4222,0.0753c-0.1788-0.0804-0.2788-0.2473-0.2211-0.37   c0.053-0.126,0.2457-0.161,0.4242-0.0769C-1150.0013,1697.9882-1149.8993,1698.1566-1149.9611,1698.2793L-1149.9611,1698.2793z    M-1150.2642,1698.0547"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1148.9634,1699.3922c-0.1174,0.1086-0.3473,0.0581-0.5031-0.1139c-0.1613-0.1718-0.1912-0.4016-0.072-0.5118   c0.1211-0.1088,0.3438-0.0579,0.505,0.1139C-1148.8721,1699.0541-1148.8407,1699.2819-1148.9634,1699.3922L-1148.9634,1699.3922z    M-1149.1984,1699.14"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1147.9922,1700.8105c-0.151,0.1051-0.3979,0.0067-0.5505-0.2123c-0.151-0.2191-0.151-0.4819,0.0035-0.5872   c0.1526-0.1051,0.396-0.0104,0.5505,0.2068C-1147.8381,1700.4406-1147.8381,1700.7034-1147.9922,1700.8105L-1147.9922,1700.8105z    M-1147.9922,1700.8105"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1146.6619,1702.1812c-0.1351,0.1489-0.4227,0.1086-0.6329-0.0945c-0.2155-0.1984-0.2753-0.4803-0.1403-0.6293   c0.1371-0.149,0.4263-0.1072,0.6381,0.0944C-1146.5831,1701.7501-1146.5182,1702.0337-1146.6619,1702.1812L-1146.6619,1702.1812z    M-1146.6619,1702.1812"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1144.8265,1702.9769c-0.0597,0.1927-0.3365,0.2804-0.6154,0.1984c-0.2788-0.0845-0.4608-0.3103-0.4047-0.5051   c0.0577-0.1943,0.3361-0.2855,0.6169-0.1979C-1144.9512,1702.5563-1144.7688,1702.7805-1144.8265,1702.9769L-1144.8265,1702.9769z    M-1144.8265,1702.9769"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1142.8107,1703.1243c0.0067,0.2031-0.2299,0.3716-0.5226,0.3752c-0.2944,0.0067-0.533-0.1577-0.5361-0.3577   c0-0.2052,0.2313-0.3717,0.5258-0.3768C-1143.0509,1702.7594-1142.8107,1702.9227-1142.8107,1703.1243L-1142.8107,1703.1243z    M-1142.8107,1703.1243"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                      <path
                        d="M-1140.9351,1702.8052c0.035,0.198-0.1686,0.4015-0.4594,0.4557c-0.2859,0.0526-0.5504-0.0701-0.587-0.2665   c-0.0354-0.2031,0.1716-0.4066,0.4573-0.4592C-1141.233,1702.4846-1140.9722,1702.6036-1140.9351,1702.8052L-1140.9351,1702.8052z    M-1140.9351,1702.8052"
                        fill={currentTheme === "dark" ? "#F6F7F9" : "#4b5563"}
                      />
                    </g>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <div>
            {Object.keys(currentUser).length > 0 ? (
              <div className="flex justify-center items-center gap-1">
                <div className="w-7 h-7">
                  <User_Icon />
                </div>
                <p className="font-semibold text-lg text-white bg-teal-600 px-2 rounded-sm">
                  {currentUser?.userName}
                </p>
                <Link to="/">
                  <div className="w-7 h-7" onClick={logout}>
                    <LogOut_Icon />
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/introduce_yourself">
                <Button isLogin={true}>LogIn</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
