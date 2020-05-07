import React from "react";
import classes from "./Welcome.css";

const welcome = props => {
  return (
    <>
      <section className={classes.main__section}>
        <div className={classes.background}>
          <div className={classes.background__div}>Real time stock.</div>
        </div>
      </section>
      <section className={classes.second__section}>
        <div className={classes.second__section__article__container}>
          <article className={classes.second__section__article}>
            <p>Article 1</p>
          </article>
          <article className={classes.second__section__article}>
            <p>Article 2</p>
          </article>
          <article className={classes.second__section__article}>
            <p>Article 3</p>
          </article>
        </div>
      </section>
      <section className={classes.third__section}>
        <div className={classes.third__section_colors}>
          <div className={classes.third__section__purple}></div>
          <div className={classes.third__section__yellow}></div>
          <div className={classes.third__section__blue}></div>
        </div>
      </section>
    </>
  );
};

export default welcome;
