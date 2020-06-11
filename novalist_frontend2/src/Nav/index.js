import React from 'react';
import { NavLink } from 'react-router-dom'

const MainNav = (props) => {
    <>
  <header>
      <div>
      <h2>The NavBar</h2>
      </div>
      <nav>
          <ul>
            <li>
              <NavLink to ="../form/index.js">Add Book To Reading List</NavLink>
            </li>

            <li>
              <NavLink to ="/about">About</NavLink>
            </li>
            
            <li>
                <NavLink to ="/contact"> Contact</NavLink>
            </li>
          </ul>

      </nav>
  </header>
  </>


}

export default MainNav;