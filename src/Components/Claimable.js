import Button from "@material-ui/core/Button";
import { useState } from "react";
import { ABIWithdraw } from "./ABI";
import { ClaimableAddress } from "./Addresses";
import { observer } from "mobx-react";
import "../App.css";

const handleClaimableWithdraw = (props, userInput) => {
  //checking if web3 is undefined
  if (props.store.web3 && props.store.accounts) {
    const contract = new props.store.web3.eth.Contract(
      ABIWithdraw,
      ClaimableAddress
    );
    console.log(contract.methods);
    contract.methods.withdraw(props.store.web3.utils.toWei(userInput)).send({
      from: props.store.accounts["0"],
    });
  } else {
    alert("Please connect to web3");
  }
};

const handleClaimRewards = (props) => {
  if (props.store.web3 && props.store.accounts) {
    const contract = new props.store.web3.eth.Contract(
      ABIWithdraw,
      ClaimableAddress
    );
    console.log("Claiming Rewards...");
    contract.methods.getReward();
  } else {
    alert("Please connect to web3");
  }
};

const handleExit = (props) => {

    if (props.store.web3 && props.store.accounts) {
        const contract = new props.store.web3.eth.Contract(
          ABIWithdraw,
          ClaimableAddress
        );
        console.log("exiting...");
        contract.methods.exit();
      } else {
        alert("Please connect to web3");
      }
};

const Claimable = observer((props) => {
  const [amount, setAmount] = useState("0");

  return (
    <form>
      <div className="form-group mt-3">
        <input
          id="amount"
          type="text"
          className="form-control"
          placeholder="Enter Amount"
          required
          onChange={(e) => setAmount(e.currentTarget.value)}
        ></input>
      </div>

      <div className="redButton">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleClaimableWithdraw(props, amount)}
        >
          Withdraw
        </Button>
      </div>

      <div className="redButton">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleClaimRewards(props)}
        >
          Claim Rewards
        </Button>
      </div>

      <div className="redButton">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleExit(props)}
        >
          Exit
        </Button>
      </div>
    </form>
  );
});

export default Claimable;
