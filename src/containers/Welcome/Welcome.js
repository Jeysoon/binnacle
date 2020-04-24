import React from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.css';

const welcome = props => {
    return(
        <>
        <section className="main-section"> 
            <div className="background">
                <div className="background__div">
                Real time stock.
                </div>
            </div>
        </section>
        <section className="second-section">
        <div>
                <article className="second-section__article">
                    <p>Article 1</p>
                </article>
                <article className="second-section__article">
                    <p>Article 2</p>
                </article>
                <article className="second-section__article">
                    <p>Article 3</p>
                </article>
            </div>
        </section>
            <section className="third-section">  
                <div className="third-section_colors" >
                        <div className="third-section__purple"></div>
                        <div className="third-section__yellow"></div>
                        <div className="third-section__blue"></div>
                    
                </div>
            </section>
            <footer className="footer">
                <nav>
                    <ul class="footer__links">
                        <li class="footer__link">
                            <a href="#">Support</a>
                        </li>
                        <li class="footer__link">
                            <a href="#">Terms of Use</a>
                        </li>
                    </ul>
                    <p>
                        <article className="main-footer">
                            Jeyson Meza 2020
                        </article>
                    </p>
                </nav>
                </footer>
        </>
    );
};

export default welcome;