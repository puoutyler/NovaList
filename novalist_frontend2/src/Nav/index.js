// import React from 'react';
import { NavLink } from 'react-router-dom'

// const MainNav = (props) => {
//   return(
//   <div>
//     <div>
//   <header>
//       <div>
//       <h2>The NavBar</h2>
//       </div>
//       <nav>
//           <ul>
//             <li>
//               <NavLink to ="../form/index.js">Add Book To Reading List</NavLink>
//             </li>

//             <li>
//               <NavLink to ="/about">About</NavLink>
//             </li>
            
//             <li>
//                 <NavLink to =".Search/index.js"> Contact</NavLink>
//             </li>
//           </ul>

//       </nav>
//   </header>
//   </div>
//   </div>
//   )

// }

// export default MainNav;


import React, { Component } from 'react'

class Nav extends Component{
  render (){
    return (
      <div>
        <ul>
        <li>
              <NavLink to ="">Add Book To Reading List</NavLink>
            </li>

            <li>
              <NavLink to ="">About</NavLink>
            </li>
            
            <li>
                <NavLink to =""> Contact</NavLink>
            </li>
            <li>
                <NavLink to =""> Search Books</NavLink>
            </li>

        </ul>
      </div>
    )
  }
}

export default Nav;