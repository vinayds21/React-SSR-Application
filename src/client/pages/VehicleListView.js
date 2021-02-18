/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const VehicleListView = ({ launchYear, successfulLaunch, vehicleList }) => {
  const getMissionId = (missionIdArr) => {
    if (missionIdArr.length) {
      return missionIdArr.map((ids) => <span key={ids}>{ids}</span>);
    }
    return 'None';
  };

  // const getLaunchDate = (utcDateString) => {
  //   const launchDateUtc = new Date(utcDateString);
  //   return launchDateUtc.toString();
  // };
  const getTruncatedValue = (vehicleName) => {
    const valueLength = vehicleName.length;
    if (valueLength > 10) {
      const myTruncatedString = vehicleName.substring(0, 13);
      return (
        <span>
          {myTruncatedString}
          ...
        </span>
      );
    }
    return vehicleName;
  };

  const getVehicleData = (article) => (
    <div key={article.flight_number} className="col s12 m6 l4 xl3">
      <div className="card">
        <div className="card-image">
          <LazyLoadImage alt={article.mission_name} src={article.links.mission_patch_small} />
        </div>
        <div className="card-content">
          <h6>{getTruncatedValue(article.mission_name)}</h6>
          <p>#{article.flight_number}</p>
          <p>
            <b>Mission ID(s): &nbsp;</b>
            {getMissionId(article.mission_id)}
          </p>
          <p>
            <b>Launch Year: &nbsp;</b>
            {article.launch_year}
          </p>
          <p>
            <b>Succesfull Launch: &nbsp;</b>
            {article.launch_success ? 'YES' : 'NO'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => {
    return vehicleList.map((article) => {
      if (launchYear === article.launch_year) {
        return getVehicleData(article);
      }
      if (successfulLaunch === article.launch_success) {
        return getVehicleData(article);
      }
      return getVehicleData(article);
    });
  };

  return <div className="row">{renderArticles()}</div>;
};

VehicleListView.propTypes = {
  vehicleList: PropTypes.arrayOf(PropTypes.any).isRequired,
  launchYear: PropTypes.string.isRequired,
  successfulLaunch: PropTypes.bool.isRequired,
};

export default {
  component: connect(VehicleListView),
};
