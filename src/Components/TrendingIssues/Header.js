import React from 'react';
import "./Header.css";
function Header(){
    return(
        <div>
            <nav className="navbar navbar-expand-md sticky-top w-100">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto"> {/*Here ml-auto means margin left is auto which means your content is aligned to the right hand side*/}
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Desk</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">At glance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Membership</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">News</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Downloads</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
export default Header;