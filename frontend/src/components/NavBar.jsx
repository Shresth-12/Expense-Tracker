import { useNavigate } from "react-router-dom";
export function NavBar()
{
    const navigate=useNavigate()
    return <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabIndex={0}
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 1</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl"onClick={()=>{navigate("/")}} >Expense<span className="text-blue-600" >Tracker</span></a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><a  onClick={()=>{navigate("/add")}}>Add Expense</a></li>
        <li><a onClick={()=>{navigate("/all")}}>Show All Expenses</a></li>
      </ul>
    </div>
    <div className="navbar-end">
    <div className="avatar">
    <div className="avatar avatar-placeholder">
    <div className="bg-blue-600 text-neutral-content w-10 rounded-full">
    <span className="text-l">S</span>
  </div>
  </div>
</div>
    </div>
  </div>
}