import React, { useState } from "react";
import Card from "../../../components/UI/Card/Card";
// import Button from "../../../components/UI/Button/Button";
import LoadingIndicator from "../../../components/UI/LoadingIndicator/LoadingIndicator";
import classes from "./ItemForm.css";

const ItemForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const submitHandler = event => {
    event.preventDefault();
    props.onAddItem({ item: enteredTitle, amount: enteredAmount });
  };

  return (
    <section>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.formControl}>
            <label htmlFor="item">Item</label>
            <input
              type="text"
              id="item"
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Item</button>
          </div>
        </form>
        {props.loading && <LoadingIndicator />}
      </Card>
    </section>
  );
});

export default ItemForm;
