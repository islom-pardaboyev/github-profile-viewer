import { LOGOS_API, LOGOS_API_TOKEN } from "../../hook/useEnv";

function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 w-full">
      <div className="container py-3 flex items-center gap-3 justify-end">
        <a href="https://github.com/islom-pardaboyev" target="_blank">
          <img
            className="size-7 rounded-full"
            src={`${LOGOS_API}github.com${LOGOS_API_TOKEN}`}
            alt=""
          />
        </a>
        <a href="https://t.me/islom_ipm" target="_blank">
          <img
            className="size-7 rounded-full"
            src={`${LOGOS_API}t.me${LOGOS_API_TOKEN}`}
            alt=""
          />
        </a>
      </div>
    </header>
  );
}

export default Header;
