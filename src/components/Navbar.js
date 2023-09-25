import { NavLink } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import { ReactComponent as InfoIcon } from '../assets/svg/infoIcon.svg'


function Navbar() {
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <NavLink to='/'>
              {({ isActive }) => (
                <>
                  <ExploreIcon
                    fill={isActive ? '#58816f' : '#8f8f8f'}
                    width='56px'
                    height='36px'
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                  >
                    Explore
                  </p>
                </>
              )}
            </NavLink>
          </li>
          <li className='navbarListItem'>
            <NavLink to='/offers'>
              {({ isActive }) => (
                <>
                  <OfferIcon
                    fill={isActive ? '#58816f' : '#8f8f8f'}
                    width='45px'
                    height='36px'
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                  >
                    Offers
                  </p>
                </>
              )}
            </NavLink>
          </li>
          <li className='navbarListItem'>
            <NavLink to='/profile'>
              {({ isActive }) => (
                <>
                  <PersonOutlineIcon
                    fill={isActive ? '#58816f' : '#8f8f8f'}
                    width='48px'
                    height='37px'
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                  >
                    Profile
                  </p>
                </>
              )}
            </NavLink>
          </li>
          <li className='navbarListItem'>
            <NavLink to='/about'>
              {({ isActive }) => (
                <>
                  <InfoIcon
                    fill={isActive ? '#58816f' : '#8f8f8f'}
                    width='46px'
                    height='35px'
                  />
                  <p
                    className={
                      isActive
                        ? 'navbarListItemNameActive'
                        : 'navbarListItemName'
                    }
                  >
                    About
                  </p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar