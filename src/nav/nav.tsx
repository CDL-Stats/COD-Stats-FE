import "./navbar.scss";
import "../global.scss";

export default function NavBar() {
  console.log(process.env);
  return (
    <div className='nav-bar-wrapper'>
      <nav>
        <a href='/'>
          <img
            className='nav-logo'
            src={`${process.env.REACT_APP_PHOTO_PREFIX}/cdlwhite.png`}
          />
        </a>
        <ul>
          <li>
            <a className='nav-link'>Players</a>
          </li>
          <li>
            <a className='nav-link'>Teams</a>
          </li>
          <li>
            <a className='nav-link'>Schedule</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
