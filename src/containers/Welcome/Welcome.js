import React from "react";
import "./Welcome.css";

const welcome = props => {
  return (
    <>
      <section className="main-section">
        <div className="background">
          <div className="background__div">Real time stock.</div>
        </div>
      </section>
      <section className="second-section">
        <div className="second-section__article-container">
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
        <div className="third-section_colors">
          <div className="third-section__purple"></div>
          <div className="third-section__yellow"></div>
          <div className="third-section__blue"></div>
        </div>
      </section>
    </>
  );
};

export default welcome;
