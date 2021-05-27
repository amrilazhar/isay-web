import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import "./style/InputActivity.css";

import { userService } from "../../redux/services/user.service";
import { alertActions } from "../../redux/actions/alert.actions";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputActivityData } from "../../redux/actions";
import { firstProfileData } from "../../redux/reducers/first.profile.reducer";
import { firstProfileConstant } from "../../redux/type";

const InputActivity = ({ ...props }) => {
  const {
    setShowInterest,
    setShowActivity,
    createFirstProfile,
    setCreateFirstProfile,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const inputActivityUpdate = useSelector((state) => state.inputActivityData);
  const firstProfileUpdate = useSelector((state) => state.firstProfileData);
  console.log("ini", inputActivityUpdate);
  console.log("createFirstProfile", createFirstProfile);

  const { location, activity, interest } = createFirstProfile;

  useEffect(() => {
    dispatch(inputActivityData.getInputActivity());
  }, []);

  //handle checkbox
  const handleChangeActivity = (event) => {
    console.log("event", event);
    const index = createFirstProfile[event.target.name].indexOf(
      event.target.value
    );
    console.log("index", index);

    if (event.target.checked && index === -1) {
      return setCreateFirstProfile({
        ...createFirstProfile,
        [event.target.name]: [
          ...createFirstProfile.activity,
          event.target.value,
        ],
      });
    }

    if (!event.target.checked && index !== -1) {
      const newActivity = [...createFirstProfile.activity];

      newActivity.splice(index, 1);
      return setCreateFirstProfile({
        ...createFirstProfile,
        [event.target.name]: [...newActivity],
      });
    }
  };

  //post data activity
  function handleSubmit() {
    if (location && activity && interest) {
      dispatch(request());

      userService.firstCreate(location, activity, interest)
      .then(
        (answer) => {
          dispatch(success(answer));
          setShowActivity(false);
          history.push("/avatar");
          dispatch(alertActions.success("Registration successful"));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );

      function request() {
        return { type: firstProfileConstant.FIRST_PROFILE_REQUEST };
      }
      function success(answer) {
        return { type: firstProfileConstant.FIRST_PROFILE_SUCCESS, payload:answer.data };
      }
      function failure(error) {
        return { type: firstProfileConstant.FIRST_PROFILE_FAILURE, error };
      }
    }
  }

  //set display for checkbox
  const displayActivityCheckBox = () => {
    if (inputActivityUpdate.loading === true) {
      return <h1>loading...</h1>;
    } else {
      return (
        <>
          {inputActivityUpdate.activity.data.map((input, activity) => (
            <div>
              <FormControlLabel
                name="activity"
                key={activity}
                control={<Checkbox />}
                value={input["_id"]}
                label={input.interest}
                onChange={handleChangeActivity}
                checked={createFirstProfile.activity.some(
                  (value) => value === input["_id"]
                )}
              />
            </div>
            // console.log('input', input)
          ))}
        </>
      );
    }
  };

  return (
    <div className="background-activity">
      <div className="activity-wrapper">
        <div className="activity-sub-container">
          <div className="activity-sub-wrapper">
            <h2>One more step to enter the room.....</h2>
            <h3>What activity do you always do in a week?</h3>
            <p>
              Avatar that you will get will be choosen based on your answer some
              of short question below
            </p>
            <div className="checklist-activity">
              {displayActivityCheckBox()}
            </div>
            <div className="information">
              <p className="information-sign">i</p>
              <p className="information-content">
                You can choose as much as you want
              </p>
              <div>
                <button
                  className="btn-activity-next"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Next
                </button>
                <button
                  className="btn-activity-back"
                  onClick={() => {
                    setShowInterest(true);
                    setShowActivity(false);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputActivity;
